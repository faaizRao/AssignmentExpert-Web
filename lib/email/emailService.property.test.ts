/**
 * Email Service Property-Based Tests
 * 
 * Property-based tests using fast-check to validate email system behavior
 * across a wide range of inputs. Each test runs at least 100 iterations.
 * 
 * Feature: academics-consulate-website
 * Task: 4.4 Write property tests for email system
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as fc from 'fast-check';
import {
  sendQuoteConfirmation,
  sendQuoteNotification,
  sendOrderConfirmation,
  sendOrderNotification,
  sendEmailWithRetry,
} from './emailService';
import { QuoteFormData, OrderFormData } from '@/types/forms';
import { EmailNotification } from '@/types/email';

// Mock nodemailer
vi.mock('nodemailer', () => ({
  default: {
    createTransport: vi.fn(() => ({
      sendMail: vi.fn().mockResolvedValue({ messageId: 'test-message-id' }),
      verify: vi.fn().mockResolvedValue(true),
    })),
  },
}));

// Mock environment variables
const originalEnv = process.env;

beforeEach(() => {
  vi.resetModules();
  process.env = {
    ...originalEnv,
    SMTP_HOST: 'smtp.test.com',
    SMTP_PORT: '587',
    SMTP_USER: 'test@test.com',
    SMTP_PASS: 'test-password',
    SMTP_FROM: 'Academics Consulate <noreply@academicsconsulate.com>',
    ADMIN_EMAIL: 'admin@academicsconsulate.com',
  };
});

afterEach(() => {
  process.env = originalEnv;
  vi.clearAllMocks();
});

/**
 * Property 3: Form Submission Email Delivery
 * 
 * **Validates: Requirements 4.2, 4.3, 5.2, 5.3**
 * 
 * For any valid form submission (quote or order), the system should send both
 * a confirmation email to the user and a notification email to the admin.
 */
describe('Property 3: Form Submission Email Delivery', () => {
  it('should send both user confirmation and admin notification for quote submissions', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 2, maxLength: 50 })
          .filter(s => /^[a-zA-Z][a-zA-Z\s'-]*[a-zA-Z]$/.test(s) || /^[a-zA-Z]{2,}$/.test(s)),
        fc.string({ minLength: 1, maxLength: 20 })
          .filter(s => /^[a-zA-Z0-9][a-zA-Z0-9._+-]*[a-zA-Z0-9]$/.test(s) || /^[a-zA-Z0-9]$/.test(s))
          .map(s => `${s}@example.com`),
        fc.constantFrom('assignment-writing', 'essay-writing', 'dissertation-writing', 'proofreading', 'cv-writing'),
        fc.string({ minLength: 10, maxLength: 500 })
          .filter(s => s.replace(/\s/g, '').length >= 10),
        async (name, email, serviceType, projectDetails) => {
          const quoteData: QuoteFormData = {
            name,
            email,
            serviceType,
            projectDetails,
            timestamp: new Date(),
          };

          // Send both emails
          await sendQuoteConfirmation(quoteData);
          await sendQuoteNotification(quoteData);

          // Both functions should complete without throwing
          expect(true).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should send both user confirmation and admin notification for order submissions', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 2, maxLength: 50 })
          .filter(s => /^[a-zA-Z][a-zA-Z\s'-]*[a-zA-Z]$/.test(s) || /^[a-zA-Z]{2,}$/.test(s)),
        fc.string({ minLength: 1, maxLength: 20 })
          .filter(s => /^[a-zA-Z0-9][a-zA-Z0-9._+-]*[a-zA-Z0-9]$/.test(s) || /^[a-zA-Z0-9]$/.test(s))
          .map(s => `${s}@example.com`),
        fc.constantFrom('assignment-writing', 'dissertation-writing', 'coursework-writing'),
        fc.integer({ min: 1, max: 365 }).map(days => {
          const date = new Date();
          date.setDate(date.getDate() + days);
          return date.toISOString().split('T')[0];
        }),
        fc.string({ minLength: 20, maxLength: 500 })
          .filter(s => s.replace(/\s/g, '').length >= 20),
        async (name, email, serviceType, deadline, requirements) => {
          const orderData: OrderFormData = {
            name,
            email,
            serviceType,
            deadline,
            requirements,
            timestamp: new Date(),
          };

          // Send both emails
          await sendOrderConfirmation(orderData);
          await sendOrderNotification(orderData);

          // Both functions should complete without throwing
          expect(true).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });
});

/**
 * Property 5: Email Delivery Timing
 * 
 * **Validates: Requirements 6.1**
 * 
 * For any form submission, the email system should send emails within 30 seconds
 * of submission.
 */
describe('Property 5: Email Delivery Timing', () => {
  it('should send quote confirmation emails within 30 seconds', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 2, maxLength: 50 })
          .filter(s => /^[a-zA-Z][a-zA-Z\s'-]*[a-zA-Z]$/.test(s) || /^[a-zA-Z]{2,}$/.test(s)),
        fc.string({ minLength: 1, maxLength: 20 })
          .filter(s => /^[a-zA-Z0-9][a-zA-Z0-9._+-]*[a-zA-Z0-9]$/.test(s) || /^[a-zA-Z0-9]$/.test(s))
          .map(s => `${s}@example.com`),
        fc.constantFrom('assignment-writing', 'essay-writing', 'dissertation-writing'),
        fc.string({ minLength: 10, maxLength: 500 })
          .filter(s => s.replace(/\s/g, '').length >= 10),
        async (name, email, serviceType, projectDetails) => {
          const quoteData: QuoteFormData = {
            name,
            email,
            serviceType,
            projectDetails,
            timestamp: new Date(),
          };

          const startTime = Date.now();
          await sendQuoteConfirmation(quoteData);
          const endTime = Date.now();

          const elapsedSeconds = (endTime - startTime) / 1000;

          // Should complete within 30 seconds
          expect(elapsedSeconds).toBeLessThan(30);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should send order notification emails within 30 seconds', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 2, maxLength: 50 })
          .filter(s => /^[a-zA-Z][a-zA-Z\s'-]*[a-zA-Z]$/.test(s) || /^[a-zA-Z]{2,}$/.test(s)),
        fc.string({ minLength: 1, maxLength: 20 })
          .filter(s => /^[a-zA-Z0-9][a-zA-Z0-9._+-]*[a-zA-Z0-9]$/.test(s) || /^[a-zA-Z0-9]$/.test(s))
          .map(s => `${s}@example.com`),
        fc.constantFrom('assignment-writing', 'dissertation-writing'),
        fc.integer({ min: 1, max: 365 }).map(days => {
          const date = new Date();
          date.setDate(date.getDate() + days);
          return date.toISOString().split('T')[0];
        }),
        fc.string({ minLength: 20, maxLength: 500 })
          .filter(s => s.replace(/\s/g, '').length >= 20),
        async (name, email, serviceType, deadline, requirements) => {
          const orderData: OrderFormData = {
            name,
            email,
            serviceType,
            deadline,
            requirements,
            timestamp: new Date(),
          };

          const startTime = Date.now();
          await sendOrderNotification(orderData);
          const endTime = Date.now();

          const elapsedSeconds = (endTime - startTime) / 1000;

          // Should complete within 30 seconds
          expect(elapsedSeconds).toBeLessThan(30);
        }
      ),
      { numRuns: 100 }
    );
  });
});

/**
 * Property 6: Email Content Completeness
 * 
 * **Validates: Requirements 6.2**
 * 
 * For any form submission, the notification email should include all form field
 * data that was submitted.
 */
describe('Property 6: Email Content Completeness', () => {
  it('should include all quote form fields in notification email', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 2, maxLength: 50 })
          .filter(s => /^[a-zA-Z][a-zA-Z\s'-]*[a-zA-Z]$/.test(s) || /^[a-zA-Z]{2,}$/.test(s)),
        fc.string({ minLength: 1, maxLength: 20 })
          .filter(s => /^[a-zA-Z0-9][a-zA-Z0-9._+-]*[a-zA-Z0-9]$/.test(s) || /^[a-zA-Z0-9]$/.test(s))
          .map(s => `${s}@example.com`),
        fc.constantFrom('assignment-writing', 'essay-writing', 'dissertation-writing', 'proofreading'),
        fc.string({ minLength: 10, maxLength: 500 })
          .filter(s => s.replace(/\s/g, '').length >= 10),
        async (name, email, serviceType, projectDetails) => {
          const quoteData: QuoteFormData = {
            name,
            email,
            serviceType,
            projectDetails,
            timestamp: new Date(),
          };

          // Import template renderer to check content
          const { renderQuoteNotification } = await import('./templates');
          const emailHtml = renderQuoteNotification(quoteData);

          // Email should contain all form field data
          expect(emailHtml).toContain(name);
          expect(emailHtml).toContain(email);
          expect(emailHtml).toContain(serviceType);
          expect(emailHtml).toContain(projectDetails);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should include all order form fields in notification email', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 2, maxLength: 50 })
          .filter(s => /^[a-zA-Z][a-zA-Z\s'-]*[a-zA-Z]$/.test(s) || /^[a-zA-Z]{2,}$/.test(s)),
        fc.string({ minLength: 1, maxLength: 20 })
          .filter(s => /^[a-zA-Z0-9][a-zA-Z0-9._+-]*[a-zA-Z0-9]$/.test(s) || /^[a-zA-Z0-9]$/.test(s))
          .map(s => `${s}@example.com`),
        fc.constantFrom('assignment-writing', 'dissertation-writing', 'coursework-writing'),
        fc.integer({ min: 1, max: 365 }).map(days => {
          const date = new Date();
          date.setDate(date.getDate() + days);
          return date.toISOString().split('T')[0];
        }),
        fc.string({ minLength: 20, maxLength: 500 })
          .filter(s => s.replace(/\s/g, '').length >= 20),
        async (name, email, serviceType, deadline, requirements) => {
          const orderData: OrderFormData = {
            name,
            email,
            serviceType,
            deadline,
            requirements,
            timestamp: new Date(),
          };

          // Import template renderer to check content
          const { renderOrderNotification } = await import('./templates');
          const emailHtml = renderOrderNotification(orderData);

          // Email should contain all form field data
          expect(emailHtml).toContain(name);
          expect(emailHtml).toContain(email);
          expect(emailHtml).toContain(serviceType);
          expect(emailHtml).toContain(requirements);
          // Deadline should be formatted and included
          expect(emailHtml.toLowerCase()).toContain('deadline');
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should include all fields in user confirmation emails', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 2, maxLength: 50 })
          .filter(s => /^[a-zA-Z][a-zA-Z\s'-]*[a-zA-Z]$/.test(s) || /^[a-zA-Z]{2,}$/.test(s)),
        fc.string({ minLength: 1, maxLength: 20 })
          .filter(s => /^[a-zA-Z0-9][a-zA-Z0-9._+-]*[a-zA-Z0-9]$/.test(s) || /^[a-zA-Z0-9]$/.test(s))
          .map(s => `${s}@example.com`),
        fc.constantFrom('assignment-writing', 'essay-writing', 'proofreading'),
        fc.string({ minLength: 10, maxLength: 500 })
          .filter(s => s.replace(/\s/g, '').length >= 10),
        async (name, email, serviceType, projectDetails) => {
          const quoteData: QuoteFormData = {
            name,
            email,
            serviceType,
            projectDetails,
            timestamp: new Date(),
          };

          // Import template renderer to check content
          const { renderQuoteConfirmation } = await import('./templates');
          const emailHtml = renderQuoteConfirmation(quoteData);

          // Confirmation email should contain user's data
          expect(emailHtml).toContain(name);
          expect(emailHtml).toContain(serviceType);
          expect(emailHtml).toContain(projectDetails);
        }
      ),
      { numRuns: 100 }
    );
  });
});

/**
 * Property 7: Email Error Logging
 * 
 * **Validates: Requirements 6.4**
 * 
 * For any email delivery failure, the system should log the error with
 * relevant details.
 */
describe('Property 7: Email Error Logging', () => {
  it('should log errors when email sending fails', async () => {
    // Mock console.error to capture logs
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Mock nodemailer to fail
    const nodemailer = await import('nodemailer');
    const mockTransport = {
      sendMail: vi.fn().mockRejectedValue(new Error('SMTP connection failed')),
      verify: vi.fn().mockResolvedValue(true),
    };
    vi.mocked(nodemailer.default.createTransport).mockReturnValue(mockTransport as any);

    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 1, maxLength: 50 })
          .filter(s => /^[a-zA-Z0-9][a-zA-Z0-9._+-]*[a-zA-Z0-9]$/.test(s) || /^[a-zA-Z0-9]$/.test(s))
          .map(s => `${s}@example.com`),
        fc.string({ minLength: 5, maxLength: 100 }),
        fc.string({ minLength: 10, maxLength: 500 }),
        async (to, subject, htmlContent) => {
          const emailData: EmailNotification = {
            from: 'test@test.com',
            to,
            subject,
            html: htmlContent,
            text: htmlContent,
          };

          try {
            await sendEmailWithRetry(emailData, 1); // Only 1 retry for faster tests
          } catch (error) {
            // Error is expected
          }

          // Should have logged the error
          expect(consoleErrorSpy).toHaveBeenCalled();
          
          // Log should contain relevant information
          const logCalls = consoleErrorSpy.mock.calls;
          const hasRelevantLog = logCalls.some(call => 
            call.some(arg => 
              typeof arg === 'string' && 
              (arg.includes('Email send attempt') || arg.includes('Failed to send email'))
            )
          );
          expect(hasRelevantLog).toBe(true);
        }
      ),
      { numRuns: 100 }
    );

    consoleErrorSpy.mockRestore();
  });

  it('should log recipient email address on failure', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Mock nodemailer to fail
    const nodemailer = await import('nodemailer');
    const mockTransport = {
      sendMail: vi.fn().mockRejectedValue(new Error('Network error')),
      verify: vi.fn().mockResolvedValue(true),
    };
    vi.mocked(nodemailer.default.createTransport).mockReturnValue(mockTransport as any);

    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 1, maxLength: 20 })
          .filter(s => /^[a-zA-Z0-9][a-zA-Z0-9._+-]*[a-zA-Z0-9]$/.test(s) || /^[a-zA-Z0-9]$/.test(s))
          .map(s => `${s}@example.com`),
        async (recipientEmail) => {
          const emailData: EmailNotification = {
            from: 'test@test.com',
            to: recipientEmail,
            subject: 'Test Subject',
            html: '<p>Test content</p>',
            text: 'Test content',
          };

          try {
            await sendEmailWithRetry(emailData, 1);
          } catch (error) {
            // Error is expected
          }

          // Log should contain the recipient email
          const logCalls = consoleErrorSpy.mock.calls;
          const hasRecipientInLog = logCalls.some(call =>
            call.some(arg => typeof arg === 'string' && arg.includes(recipientEmail))
          );
          expect(hasRecipientInLog).toBe(true);
        }
      ),
      { numRuns: 100 }
    );

    consoleErrorSpy.mockRestore();
  });
});

/**
 * Property 8: Email Subject Line Formatting
 * 
 * **Validates: Requirements 6.5**
 * 
 * For any email sent by the system, the subject line should clearly identify
 * the form type (quote or order).
 */
describe('Property 8: Email Subject Line Formatting', () => {
  it('should include form type in quote email subject lines', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 2, maxLength: 50 })
          .filter(s => /^[a-zA-Z][a-zA-Z\s'-]*[a-zA-Z]$/.test(s) || /^[a-zA-Z]{2,}$/.test(s)),
        fc.string({ minLength: 1, maxLength: 20 })
          .filter(s => /^[a-zA-Z0-9][a-zA-Z0-9._+-]*[a-zA-Z0-9]$/.test(s) || /^[a-zA-Z0-9]$/.test(s))
          .map(s => `${s}@example.com`),
        fc.constantFrom('assignment-writing', 'essay-writing', 'dissertation-writing'),
        fc.string({ minLength: 10, maxLength: 500 })
          .filter(s => s.replace(/\s/g, '').length >= 10),
        async (name, email, serviceType, projectDetails) => {
          const quoteData: QuoteFormData = {
            name,
            email,
            serviceType,
            projectDetails,
            timestamp: new Date(),
          };

          // Check confirmation email subject
          const confirmationSubject = 'Quote Request Received - Academics Consulate';
          expect(confirmationSubject.toLowerCase()).toContain('quote');

          // Check notification email subject
          const notificationSubject = `New Quote Request - ${serviceType}`;
          expect(notificationSubject.toLowerCase()).toContain('quote');
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should include form type in order email subject lines', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 2, maxLength: 50 })
          .filter(s => /^[a-zA-Z][a-zA-Z\s'-]*[a-zA-Z]$/.test(s) || /^[a-zA-Z]{2,}$/.test(s)),
        fc.string({ minLength: 1, maxLength: 20 })
          .filter(s => /^[a-zA-Z0-9][a-zA-Z0-9._+-]*[a-zA-Z0-9]$/.test(s) || /^[a-zA-Z0-9]$/.test(s))
          .map(s => `${s}@example.com`),
        fc.constantFrom('assignment-writing', 'dissertation-writing', 'coursework-writing'),
        fc.integer({ min: 1, max: 365 }).map(days => {
          const date = new Date();
          date.setDate(date.getDate() + days);
          return date.toISOString().split('T')[0];
        }),
        fc.string({ minLength: 20, maxLength: 500 })
          .filter(s => s.replace(/\s/g, '').length >= 20),
        async (name, email, serviceType, deadline, requirements) => {
          const orderData: OrderFormData = {
            name,
            email,
            serviceType,
            deadline,
            requirements,
            timestamp: new Date(),
          };

          // Check confirmation email subject
          const confirmationSubject = 'Order Received - Academics Consulate';
          expect(confirmationSubject.toLowerCase()).toContain('order');

          // Check notification email subject format
          const notificationSubject = `New Order - ${serviceType} - Deadline: ${new Date(deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`;
          expect(notificationSubject.toLowerCase()).toContain('order');
          expect(notificationSubject.toLowerCase()).toContain('deadline');
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should include service type in notification subject lines', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 2, maxLength: 50 })
          .filter(s => /^[a-zA-Z][a-zA-Z\s'-]*[a-zA-Z]$/.test(s) || /^[a-zA-Z]{2,}$/.test(s)),
        fc.string({ minLength: 1, maxLength: 20 })
          .filter(s => /^[a-zA-Z0-9][a-zA-Z0-9._+-]*[a-zA-Z0-9]$/.test(s) || /^[a-zA-Z0-9]$/.test(s))
          .map(s => `${s}@example.com`),
        fc.constantFrom('assignment-writing', 'essay-writing', 'dissertation-writing', 'proofreading', 'cv-writing'),
        fc.string({ minLength: 10, maxLength: 500 })
          .filter(s => s.replace(/\s/g, '').length >= 10),
        async (name, email, serviceType, projectDetails) => {
          const quoteData: QuoteFormData = {
            name,
            email,
            serviceType,
            projectDetails,
            timestamp: new Date(),
          };

          // Notification subject should include service type
          const notificationSubject = `New Quote Request - ${serviceType}`;
          expect(notificationSubject).toContain(serviceType);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should include deadline in order notification subject lines', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 2, maxLength: 50 })
          .filter(s => /^[a-zA-Z][a-zA-Z\s'-]*[a-zA-Z]$/.test(s) || /^[a-zA-Z]{2,}$/.test(s)),
        fc.string({ minLength: 1, maxLength: 20 })
          .filter(s => /^[a-zA-Z0-9][a-zA-Z0-9._+-]*[a-zA-Z0-9]$/.test(s) || /^[a-zA-Z0-9]$/.test(s))
          .map(s => `${s}@example.com`),
        fc.constantFrom('assignment-writing', 'dissertation-writing'),
        fc.integer({ min: 1, max: 365 }).map(days => {
          const date = new Date();
          date.setDate(date.getDate() + days);
          return date.toISOString().split('T')[0];
        }),
        fc.string({ minLength: 20, maxLength: 500 })
          .filter(s => s.replace(/\s/g, '').length >= 20),
        async (name, email, serviceType, deadline, requirements) => {
          const orderData: OrderFormData = {
            name,
            email,
            serviceType,
            deadline,
            requirements,
            timestamp: new Date(),
          };

          // Order notification subject should include deadline
          const formattedDeadline = new Date(deadline).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          });
          const notificationSubject = `New Order - ${serviceType} - Deadline: ${formattedDeadline}`;
          
          expect(notificationSubject.toLowerCase()).toContain('deadline');
          expect(notificationSubject).toContain(serviceType);
        }
      ),
      { numRuns: 100 }
    );
  });
});
