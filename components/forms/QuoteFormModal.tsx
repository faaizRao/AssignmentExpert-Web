'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import QuoteForm from './QuoteForm';

interface QuoteFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteFormModal({ isOpen, onClose }: QuoteFormModalProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSuccess = () => {
    setFormSubmitted(true);
    // Close modal after 2 seconds
    setTimeout(() => {
      onClose();
      setFormSubmitted(false);
    }, 2000);
  };

  const handleClose = () => {
    onClose();
    // Reset form submitted state after modal closes
    setTimeout(() => {
      setFormSubmitted(false);
    }, 300);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Request a Quote"
      size="lg"
    >
      {formSubmitted ? (
        <div className="text-center py-8">
          <div className="text-green-600 text-xl font-semibold mb-2">
            ✓ Quote Request Submitted!
          </div>
          <p className="text-gray-600">
            We&apos;ll get back to you shortly with a personalized quote.
          </p>
        </div>
      ) : (
        <QuoteForm onSuccess={handleSuccess} />
      )}
    </Modal>
  );
}
