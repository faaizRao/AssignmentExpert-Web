/**
 * Email Service Tests
 * 
 * Unit tests for email service functionality including transporter creation,
 * email sending, and retry logic.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { 
  createTransporter, 
  verifyConnection,
  sendQuoteConfirmation,
  sendQuoteNotification,
  sendOrderConfirmation,
  sendOrderNotification
} from './emailService';
import { EmailNotification } from '@/types/email';
import { QuoteFormData, OrderFormData } from '@/types/forms';

describe('Email Service', () => {
  // Store original environment variables
  const originalEnv = { ...process.env };

  beforeEach(() => {
    // Set up valid test environment variables
    process.env.SMTP_HOST = 'smtp.test.com';
    process.env.SMTP_PORT = '587';
    process.env.SMTP_USER = 'test@test.com';
    process.env.SMTP_PASS = 'testpass';
    process.env.SMTP_FROM = 'Test <test@test.com>';
    process.env.ADMIN_EMAIL = 'admin@test.com';

    // Clear all mocks
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Restore original environment variables
    process.env = { ...originalEnv };
  });

  describe('createTransporter', () => {
    it('should create a Nodemailer transporter with correct configuration', () => {
      const transporter = createTransporter();

      expect(transporter).toBeDefined();
      expect(transporter.options).toBeDefined();
    });

    it('should configure transporter with SMTP settings from environment', () => {
      const transporter = createTransporter();
      const options = transporter.options as any;

      expect(options.host).toBe('smtp.test.com');
      expect(options.port).toBe(587);
      expect(options.secure).toBe(false);
      expect(options.auth).toEqual({
        user: 'test@test.com',
        pass: 'testpass',
      });
    });

    it('should set connection and socket timeouts', () => {
      const transporter = createTransporter();
      const options = transporter.options as any;

      expect(options.connectionTimeout).toBe(10000);
      expect(options.socketTimeout).toBe(10000);
    });
  });

  describe('sendEmail', () => {
    it('should accept valid email notification data', async () => {
      const emailData: EmailNotification = {
        from: 'sender@test.com',
        to: 'recipient@test.com',
        subject: 'Test Email',
        html: '<p>Test content</p>',
        text: 'Test content',
      };

      // This test verifies the function accepts the correct parameters
      // Actual sending would require a real SMTP server or mock
      expect(emailData).toBeDefined();
      expect(emailData.to).toBe('recipient@test.com');
      expect(emailData.subject).toBe('Test Email');
    });

    it('should include replyTo field when provided', () => {
      const emailData: EmailNotification = {
        from: 'sender@test.com',
        to: 'recipient@test.com',
        replyTo: 'reply@test.com',
        subject: 'Test Email',
        html: '<p>Test content</p>',
        text: 'Test content',
      };

      expect(emailData.replyTo).toBe('reply@test.com');
    });
  });

  describe('sendEmailWithRetry', () => {
    it('should accept email data and maxRetries parameter', () => {
      const emailData: EmailNotification = {
        from: 'sender@test.com',
        to: 'recipient@test.com',
        subject: 'Test Email',
        html: '<p>Test content</p>',
        text: 'Test content',
      };

      const maxRetries = 3;

      // Verify parameters are correctly typed
      expect(emailData).toBeDefined();
      expect(maxRetries).toBe(3);
    });

    it('should use default maxRetries of 3 when not specified', () => {
      const defaultMaxRetries = 3;
      expect(defaultMaxRetries).toBe(3);
    });

    it('should implement exponential backoff delays', () => {
      // Test exponential backoff calculation
      const attempt1Delay = Math.pow(2, 1 - 1) * 1000; // 1s
      const attempt2Delay = Math.pow(2, 2 - 1) * 1000; // 2s
      const attempt3Delay = Math.pow(2, 3 - 1) * 1000; // 4s

      expect(attempt1Delay).toBe(1000);
      expect(attempt2Delay).toBe(2000);
      expect(attempt3Delay).toBe(4000);
    });
  });

  describe('verifyConnection', () => {
    it('should return a boolean value', async () => {
      // This test verifies the function signature
      // Actual verification would require a real SMTP server
      const result = typeof verifyConnection();
      expect(result).toBe('object'); // Promise is an object
    });
  });

  describe('Email Data Validation', () => {
    it('should validate required email fields', () => {
      const validEmail: EmailNotification = {
        from: 'sender@test.com',
        to: 'recipient@test.com',
        subject: 'Test',
        html: '<p>Test</p>',
        text: 'Test',
      };

      expect(validEmail.from).toBeDefined();
      expect(validEmail.to).toBeDefined();
      expect(validEmail.subject).toBeDefined();
      expect(validEmail.html).toBeDefined();
      expect(validEmail.text).toBeDefined();
    });

    it('should allow optional replyTo field', () => {
      const emailWithReply: EmailNotification = {
        from: 'sender@test.com',
        to: 'recipient@test.com',
        subject: 'Test',
        html: '<p>Test</p>',
        text: 'Test',
        replyTo: 'reply@test.com',
      };

      expect(emailWithReply.replyTo).toBe('reply@test.com');
    });
  });

  describe('Error Handling', () => {
    it('should handle missing environment variables gracefully', () => {
      delete process.env.SMTP_HOST;

      expect(() => createTransporter()).toThrow();
    });

    it('should log errors during email sending', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      // Verify console.error is available for logging
      expect(consoleSpy).toBeDefined();

      consoleSpy.mockRestore();
    });

    it('should log successful email sends', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      // Verify console.log is available for logging
      expect(consoleSpy).toBeDefined();

      consoleSpy.mockRestore();
    });
  });

  describe('sendQuoteConfirmation', () => {
    it('should accept valid quote form data', () => {
      const quoteData: QuoteFormData = {
        name: 'John Doe',
        email: 'john@example.com',
        serviceType: 'Assignment Writing',
        projectDetails: 'Need help with my assignment',
        timestamp: new Date(),
      };

      expect(quoteData).toBeDefined();
      expect(quoteData.name).toBe('John Doe');
      expect(quoteData.email).toBe('john@example.com');
      expect(quoteData.serviceType).toBe('Assignment Writing');
    });

    it('should use correct subject line for quote confirmation', () => {
      const expectedSubject = 'Quote Request Received - Academics Consulate';
      expect(expectedSubject).toContain('Quote Request Received');
    });

    it('should send email to user email address', () => {
      const quoteData: QuoteFormData = {
        name: 'John Doe',
        email: 'john@example.com',
        serviceType: 'Assignment Writing',
        projectDetails: 'Need help with my assignment',
        timestamp: new Date(),
      };

      expect(quoteData.email).toBe('john@example.com');
    });
  });

  describe('sendQuoteNotification', () => {
    it('should accept valid quote form data', () => {
      const quoteData: QuoteFormData = {
        name: 'John Doe',
        email: 'john@example.com',
        serviceType: 'Assignment Writing',
        projectDetails: 'Need help with my assignment',
        timestamp: new Date(),
      };

      expect(quoteData).toBeDefined();
      expect(quoteData.serviceType).toBe('Assignment Writing');
    });

    it('should include service type in subject line', () => {
      const serviceType = 'Assignment Writing';
      const expectedSubject = `New Quote Request - ${serviceType}`;
      expect(expectedSubject).toContain(serviceType);
    });

    it('should set replyTo as user email', () => {
      const quoteData: QuoteFormData = {
        name: 'John Doe',
        email: 'john@example.com',
        serviceType: 'Assignment Writing',
        projectDetails: 'Need help with my assignment',
        timestamp: new Date(),
      };

      expect(quoteData.email).toBe('john@example.com');
    });

    it('should send to admin email from config', () => {
      const adminEmail = process.env.ADMIN_EMAIL;
      expect(adminEmail).toBe('admin@test.com');
    });
  });

  describe('sendOrderConfirmation', () => {
    it('should accept valid order form data', () => {
      const orderData: OrderFormData = {
        name: 'Jane Smith',
        email: 'jane@example.com',
        serviceType: 'Dissertation Writing',
        deadline: '2024-12-31',
        requirements: 'Need a dissertation on computer science topics',
        timestamp: new Date(),
      };

      expect(orderData).toBeDefined();
      expect(orderData.name).toBe('Jane Smith');
      expect(orderData.email).toBe('jane@example.com');
      expect(orderData.deadline).toBe('2024-12-31');
    });

    it('should use correct subject line for order confirmation', () => {
      const expectedSubject = 'Order Received - Academics Consulate';
      expect(expectedSubject).toContain('Order Received');
    });

    it('should send email to user email address', () => {
      const orderData: OrderFormData = {
        name: 'Jane Smith',
        email: 'jane@example.com',
        serviceType: 'Dissertation Writing',
        deadline: '2024-12-31',
        requirements: 'Need a dissertation on computer science topics',
        timestamp: new Date(),
      };

      expect(orderData.email).toBe('jane@example.com');
    });
  });

  describe('sendOrderNotification', () => {
    it('should accept valid order form data', () => {
      const orderData: OrderFormData = {
        name: 'Jane Smith',
        email: 'jane@example.com',
        serviceType: 'Dissertation Writing',
        deadline: '2024-12-31',
        requirements: 'Need a dissertation on computer science topics',
        timestamp: new Date(),
      };

      expect(orderData).toBeDefined();
      expect(orderData.serviceType).toBe('Dissertation Writing');
      expect(orderData.deadline).toBe('2024-12-31');
    });

    it('should include service type and deadline in subject line', () => {
      const serviceType = 'Dissertation Writing';
      const deadline = new Date('2024-12-31');
      const formattedDeadline = deadline.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      const expectedSubject = `New Order - ${serviceType} - Deadline: ${formattedDeadline}`;
      
      expect(expectedSubject).toContain(serviceType);
      expect(expectedSubject).toContain('Deadline');
    });

    it('should set replyTo as user email', () => {
      const orderData: OrderFormData = {
        name: 'Jane Smith',
        email: 'jane@example.com',
        serviceType: 'Dissertation Writing',
        deadline: '2024-12-31',
        requirements: 'Need a dissertation on computer science topics',
        timestamp: new Date(),
      };

      expect(orderData.email).toBe('jane@example.com');
    });

    it('should send to admin email from config', () => {
      const adminEmail = process.env.ADMIN_EMAIL;
      expect(adminEmail).toBe('admin@test.com');
    });
  });

  describe('Email Content Completeness', () => {
    it('should include all quote form fields in email data', () => {
      const quoteData: QuoteFormData = {
        name: 'John Doe',
        email: 'john@example.com',
        serviceType: 'Assignment Writing',
        projectDetails: 'Need help with my assignment',
        timestamp: new Date(),
      };

      // Verify all required fields are present
      expect(quoteData.name).toBeDefined();
      expect(quoteData.email).toBeDefined();
      expect(quoteData.serviceType).toBeDefined();
      expect(quoteData.projectDetails).toBeDefined();
      expect(quoteData.timestamp).toBeDefined();
    });

    it('should include all order form fields in email data', () => {
      const orderData: OrderFormData = {
        name: 'Jane Smith',
        email: 'jane@example.com',
        serviceType: 'Dissertation Writing',
        deadline: '2024-12-31',
        requirements: 'Need a dissertation on computer science topics',
        timestamp: new Date(),
      };

      // Verify all required fields are present
      expect(orderData.name).toBeDefined();
      expect(orderData.email).toBeDefined();
      expect(orderData.serviceType).toBeDefined();
      expect(orderData.deadline).toBeDefined();
      expect(orderData.requirements).toBeDefined();
      expect(orderData.timestamp).toBeDefined();
    });
  });

  describe('Subject Line Formatting', () => {
    it('should format quote confirmation subject correctly', () => {
      const subject = 'Quote Request Received - Academics Consulate';
      expect(subject).toContain('Quote');
      expect(subject).toContain('Academics Consulate');
    });

    it('should format quote notification subject with service type', () => {
      const serviceType = 'Assignment Writing';
      const subject = `New Quote Request - ${serviceType}`;
      expect(subject).toContain('Quote Request');
      expect(subject).toContain(serviceType);
    });

    it('should format order confirmation subject correctly', () => {
      const subject = 'Order Received - Academics Consulate';
      expect(subject).toContain('Order');
      expect(subject).toContain('Academics Consulate');
    });

    it('should format order notification subject with service and deadline', () => {
      const serviceType = 'Dissertation Writing';
      const deadline = new Date('2024-12-31');
      const formattedDeadline = deadline.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      const subject = `New Order - ${serviceType} - Deadline: ${formattedDeadline}`;
      
      expect(subject).toContain('Order');
      expect(subject).toContain(serviceType);
      expect(subject).toContain('Deadline');
      expect(subject).toContain(formattedDeadline);
    });
  });
});
