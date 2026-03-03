'use client';

import React, { useState } from 'react';
import { quoteFormSchema } from '@/lib/validation/formSchemas';
import { getAllServices } from '@/lib/services/serviceData';
import FormField from './FormField';
import Button from '../ui/Button';

interface QuoteFormProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

interface FormData {
  name: string;
  email: string;
  serviceType: string;
  projectDetails: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  serviceType?: string;
  projectDetails?: string;
}

export default function QuoteForm({ onSuccess, onError }: QuoteFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    serviceType: '',
    projectDetails: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const services = getAllServices();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    // Clear submit status when user modifies form
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
      setErrorMessage('');
    }
  };

  const validateForm = (): boolean => {
    const result = quoteFormSchema.safeParse(formData);
    
    if (result.success) {
      setErrors({});
      return true;
    }
    
    // result.success is false, so result.error exists
    const fieldErrors: FormErrors = {};
    if (result.error && result.error.issues) {
      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof FormErrors;
        if (!fieldErrors[field]) {
          fieldErrors[field] = err.message;
        }
      });
    }
    
    setErrors(fieldErrors);
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form synchronously
    const isValid = validateForm();
    
    if (!isValid) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit quote request');
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        serviceType: '',
        projectDetails: '',
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Quote submission error:', error);
      setSubmitStatus('error');
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'An error occurred while submitting your request. Please try again.'
      );

      if (onError && error instanceof Error) {
        onError(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto" noValidate>
      {submitStatus === 'success' && (
        <div
          className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
          role="alert"
          aria-live="polite"
        >
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-600 flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-green-800 font-medium">
              Quote request submitted successfully! We'll get back to you within 24 hours.
            </p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div
          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
          role="alert"
          aria-live="assertive"
        >
          <div className="flex items-start gap-2">
            <svg
              className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                clipRule="evenodd"
              />
            </svg>
            <div className="flex-1">
              <p className="text-red-800 font-medium">Error submitting quote request</p>
              <p className="text-red-700 text-sm mt-1">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}

      <FormField
        label="Full Name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        {...(errors.name && { error: errors.name })}
        placeholder="Enter your full name"
        required
      />

      <FormField
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        {...(errors.email && { error: errors.email })}
        placeholder="your.email@example.com"
        required
      />

      <FormField
        label="Service Type"
        name="serviceType"
        type="select"
        value={formData.serviceType}
        onChange={handleChange}
        {...(errors.serviceType && { error: errors.serviceType })}
        required
        options={services.map((service) => ({
          value: service.id,
          label: service.name,
        }))}
      />

      <FormField
        label="Project Details"
        name="projectDetails"
        type="textarea"
        value={formData.projectDetails}
        onChange={handleChange}
        {...(errors.projectDetails && { error: errors.projectDetails })}
        placeholder="Please describe your project requirements, academic level, deadline, and any specific instructions..."
        required
        rows={6}
      />

      <div className="mt-6">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isSubmitting}
          disabled={isSubmitting}
          className="w-full text-black "
        >
          {isSubmitting ? 'Submitting...' : 'Request Quote'}
        </Button>
      </div>

      <p className="mt-4 text-sm text-neutral-600 text-center">
        We'll review your request and respond within 24 hours with a detailed quote.
      </p>
    </form>
  );
}
