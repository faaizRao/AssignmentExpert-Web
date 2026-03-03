/**
 * Form Validation Schemas
 * 
 * Zod validation schemas for quote and order forms with custom validators
 * for email format and date validation.
 * 
 * Requirements: 13.1, 13.2, 13.3
 */

import { z } from 'zod';
import { getAllServices } from '@/lib/services/serviceData';

/**
 * Custom email validator using RFC 5322 compliant pattern
 * 
 * Validates email addresses according to standard email format patterns.
 * Requirements: 13.2
 */
const emailValidator = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address')
  .regex(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    'Please enter a valid email address'
  );

/**
 * Custom date validator for future dates
 * 
 * Validates that the provided date is in ISO 8601 format and is a future date.
 * Requirements: 13.2
 */
const futureDateValidator = z
  .string()
  .min(1, 'Deadline is required')
  .refine(
    (dateString) => {
      try {
        const date = new Date(dateString);
        return !isNaN(date.getTime());
      } catch {
        return false;
      }
    },
    { message: 'Please enter a valid date' }
  )
  .refine(
    (dateString) => {
      // Parse the date string and compare at the date level (not time)
      const inputDate = new Date(dateString);
      const today = new Date();
      
      // Set both dates to start of day in local timezone for fair comparison
      inputDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      
      return inputDate >= today;
    },
    { message: 'Deadline must be a future date' }
  );

/**
 * Service type validator
 * 
 * Validates that the selected service type matches an available service ID.
 * Requirements: 13.3
 */
const serviceTypeValidator = z
  .string()
  .min(1, 'Service type is required')
  .refine(
    (serviceType) => {
      const services = getAllServices();
      return services.some((service) => service.id === serviceType);
    },
    { message: 'Please select a valid service type' }
  );

/**
 * Name validator
 * 
 * Validates user's full name (2-100 characters, letters and spaces only).
 * Requirements: 13.1, 13.3
 */
const nameValidator = z
  .string()
  .min(1, 'Name is required')
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name must not exceed 100 characters')
  .regex(
    /^[a-zA-Z\s'-]+$/,
    'Name can only contain letters, spaces, hyphens, and apostrophes'
  );

/**
 * Quote Form Validation Schema
 * 
 * Validates quote request form data including name, email, service type,
 * and project details.
 * 
 * Requirements: 13.1, 13.2, 13.3
 */
export const quoteFormSchema = z.object({
  name: nameValidator,
  email: emailValidator,
  serviceType: serviceTypeValidator,
  projectDetails: z
    .string()
    .min(1, 'Project details are required')
    .min(10, 'Project details must be at least 10 characters')
    .max(2000, 'Project details must not exceed 2000 characters'),
});

/**
 * Order Form Validation Schema
 * 
 * Validates order placement form data including name, email, service type,
 * deadline, and requirements.
 * 
 * Requirements: 13.1, 13.2, 13.3
 */
export const orderFormSchema = z.object({
  name: nameValidator,
  email: emailValidator,
  serviceType: serviceTypeValidator,
  deadline: futureDateValidator,
  requirements: z
    .string()
    .min(1, 'Requirements are required')
    .min(20, 'Requirements must be at least 20 characters')
    .max(5000, 'Requirements must not exceed 5000 characters'),
});

/**
 * Type inference for validated quote form data
 */
export type QuoteFormInput = z.infer<typeof quoteFormSchema>;

/**
 * Type inference for validated order form data
 */
export type OrderFormInput = z.infer<typeof orderFormSchema>;
