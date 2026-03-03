/**
 * Email Interfaces
 * 
 * Type definitions for email notification system and SMTP configuration.
 * These interfaces define the structure of email data and configuration.
 */

import { QuoteFormData, OrderFormData } from './forms';

/**
 * Email Notification Structure
 * 
 * Base interface for email messages sent through the system.
 */
export interface EmailNotification {
  /** Recipient email address */
  to: string;
  
  /** Sender email address */
  from: string;
  
  /** Email subject line */
  subject: string;
  
  /** HTML email body */
  html: string;
  
  /** Plain text fallback */
  text: string;
  
  /** Optional reply-to address */
  replyTo?: string;
}

/**
 * User Confirmation Email
 * 
 * Email sent to users confirming their form submission.
 * Extends base EmailNotification with user-specific data.
 */
export interface UserConfirmationEmail extends EmailNotification {
  /** User's name from the form */
  userName: string;
  
  /** Type of form submitted */
  formType: 'quote' | 'order';
  
  /** Complete form submission data */
  submissionDetails: QuoteFormData | OrderFormData;
}

/**
 * Admin Notification Email
 * 
 * Email sent to admin when a form is submitted.
 * Contains all submission data for admin review.
 */
export interface AdminNotificationEmail extends EmailNotification {
  /** Type of form submitted */
  formType: 'quote' | 'order';
  
  /** Complete form submission data */
  submissionData: QuoteFormData | OrderFormData;
  
  /** User's email address for follow-up */
  userEmail: string;
  
  /** Timestamp of submission */
  submissionTime: Date;
}

/**
 * SMTP Configuration
 * 
 * Configuration for SMTP email service.
 * Loaded from environment variables.
 */
export interface SMTPConfig {
  /** SMTP server hostname */
  host: string;
  
  /** SMTP server port (587 for TLS, 465 for SSL) */
  port: number;
  
  /** Use SSL/TLS flag */
  secure: boolean;
  
  /** SMTP authentication credentials */
  auth: {
    /** SMTP username */
    user: string;
    
    /** SMTP password */
    pass: string;
  };
  
  /** Default sender address */
  from: string;
  
  /** Admin notification recipient */
  adminEmail: string;
}
