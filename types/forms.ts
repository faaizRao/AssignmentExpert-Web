/**
 * Form Data Interfaces
 * 
 * Type definitions for form data structures used throughout the application.
 * These interfaces define the shape of data collected from quote and order forms.
 */

/**
 * Quote Form Data
 * 
 * Data structure for quote request submissions.
 * Used when users request pricing information for services.
 */
export interface QuoteFormData {
  /** User's full name (required, 2-100 characters, letters and spaces only) */
  name: string;
  
  /** User's email address (required, valid email format per RFC 5322) */
  email: string;
  
  /** Selected service type (required, must match available service IDs) */
  serviceType: string;
  
  /** Project description (required, 10-2000 characters) */
  projectDetails: string;
  
  /** Submission timestamp (auto-generated) */
  timestamp: Date;
}

/**
 * Order Form Data
 * 
 * Data structure for order placement submissions.
 * Used when users place orders for academic services.
 */
export interface OrderFormData {
  /** User's full name (required, 2-100 characters, letters and spaces only) */
  name: string;
  
  /** User's email address (required, valid email format per RFC 5322) */
  email: string;
  
  /** Selected service type (required, must match available service IDs) */
  serviceType: string;
  
  /** ISO 8601 date string (required, must be future date) */
  deadline: string;
  
  /** Detailed project requirements (required, 20-5000 characters) */
  requirements: string;
  
  /** Submission timestamp (auto-generated) */
  timestamp: Date;
}

/**
 * Form State
 * 
 * Generic form state management interface for tracking form data,
 * validation errors, and submission status.
 */
export interface FormState<T> {
  /** Form field values */
  data: T;
  
  /** Field-specific validation errors */
  errors: Partial<Record<keyof T, string>>;
  
  /** Submission in progress flag */
  isSubmitting: boolean;
  
  /** Successful submission flag */
  isSuccess: boolean;
  
  /** Submission error occurred flag */
  isError: boolean;
  
  /** General error message */
  errorMessage?: string;
}
