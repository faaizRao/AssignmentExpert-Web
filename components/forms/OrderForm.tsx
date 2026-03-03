'use client';

import React, { useState, useEffect } from 'react';
import { orderFormSchema } from '@/lib/validation/formSchemas';
import { getAllServices } from '@/lib/services/serviceData';
import FormField from './FormField';
import Button from '../ui/Button';

interface OrderFormProps {
  preselectedService?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

interface FormData {
  name: string;
  email: string;
  serviceType: string;
  deadline: string;
  requirements: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  serviceType?: string;
  deadline?: string;
  requirements?: string;
}

export default function OrderForm({
  preselectedService,
  onSuccess,
  onError,
}: OrderFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    serviceType: preselectedService || '',
    deadline: '',
    requirements: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const services = getAllServices();

  // Update service type if preselectedService changes
  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, serviceType: preselectedService }));
    }
  }, [preselectedService]);

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
    const result = orderFormSchema.safeParse(formData);
    
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
      const response = await fetch('/api/order', {
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
        throw new Error(data.error || 'Failed to submit order');
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        serviceType: preselectedService || '',
        deadline: '',
        requirements: '',
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Order submission error:', error);
      setSubmitStatus('error');
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'An error occurred while submitting your order. Please try again.'
      );

      if (onError && error instanceof Error) {
        onError(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get minimum date (today) in YYYY-MM-DD format for date input
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
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
              Order submitted successfully! We'll contact you shortly to confirm details.
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
              <p className="text-red-800 font-medium">Error submitting order</p>
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

      <div className="mb-4">
        <label
          htmlFor="deadline"
          className="block text-sm font-medium text-black mb-2"
        >
          Deadline
          <span className="text-red-500 ml-1" aria-label="required">
            *
          </span>
        </label>
        <input
          type="date"
          id="deadline"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          min={getMinDate()}
          required
          className={`w-full px-4 py-2 border rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
            errors.deadline ? 'border-red-500 focus:ring-red-500' : 'border-neutral-300'
          }`}
          aria-invalid={!!errors.deadline}
          aria-describedby={errors.deadline ? 'deadline-error' : undefined}
        />
        {errors.deadline && (
          <p
            id="deadline-error"
            className="mt-1 text-sm text-red-600 flex items-center gap-1"
            role="alert"
          >
            <svg
              className="w-4 h-4 flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            {errors.deadline}
          </p>
        )}
      </div>

      <FormField
        label="Project Requirements"
        name="requirements"
        type="textarea"
        value={formData.requirements}
        onChange={handleChange}
        {...(errors.requirements && { error: errors.requirements })}
        placeholder="Please provide detailed requirements including academic level, word count, formatting style, specific instructions, and any additional information..."
        required
        rows={8}
      />

      <div className="mt-6">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isSubmitting}
          disabled={isSubmitting}
          className="w-full text-black"
        >
          {isSubmitting ? 'Submitting...' : 'Place Order'}
        </Button>
      </div>

      <p className="mt-4 text-sm text-neutral-600 text-center">
        We'll contact you shortly to confirm order details and discuss payment options.
      </p>
    </form>
  );
}
