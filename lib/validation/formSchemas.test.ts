/**
 * Form Validation Schema Tests
 * 
 * Unit tests for Zod validation schemas to ensure proper validation
 * of quote and order form data.
 */

import { describe, it, expect } from 'vitest';
import { quoteFormSchema, orderFormSchema } from './formSchemas';

describe('Quote Form Schema', () => {
  describe('name validation', () => {
    it('should accept valid names', () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        serviceType: 'assignment-writing',
        projectDetails: 'This is a valid project description with enough characters.',
      };
      
      const result = quoteFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject names that are too short', () => {
      const invalidData = {
        name: 'J',
        email: 'john@example.com',
        serviceType: 'assignment-writing',
        projectDetails: 'This is a valid project description.',
      };
      
      const result = quoteFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(0);
        expect(result.error.issues[0]?.message).toContain('at least 2 characters');
      }
    });

    it('should reject names that are too long', () => {
      const invalidData = {
        name: 'A'.repeat(101),
        email: 'john@example.com',
        serviceType: 'assignment-writing',
        projectDetails: 'This is a valid project description.',
      };
      
      const result = quoteFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(0);
        expect(result.error.issues[0]?.message).toContain('not exceed 100 characters');
      }
    });

    it('should reject names with invalid characters', () => {
      const invalidData = {
        name: 'John123',
        email: 'john@example.com',
        serviceType: 'assignment-writing',
        projectDetails: 'This is a valid project description.',
      };
      
      const result = quoteFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should accept names with hyphens and apostrophes', () => {
      const validData = {
        name: "Mary-Jane O'Connor",
        email: 'mary@example.com',
        serviceType: 'assignment-writing',
        projectDetails: 'This is a valid project description with enough characters.',
      };
      
      const result = quoteFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  describe('email validation', () => {
    it('should accept valid email addresses', () => {
      const validEmails = [
        'user@example.com',
        'user.name@example.com',
        'user+tag@example.co.uk',
        'user_name@example-domain.com',
      ];

      validEmails.forEach((email) => {
        const data = {
          name: 'John Doe',
          email,
          serviceType: 'assignment-writing',
          projectDetails: 'This is a valid project description.',
        };
        
        const result = quoteFormSchema.safeParse(data);
        expect(result.success).toBe(true);
      });
    });

    it('should reject invalid email addresses', () => {
      const invalidEmails = [
        'invalid',
        'invalid@',
        '@example.com',
        'invalid@.com',
        'invalid@domain',
        'invalid @example.com',
      ];

      invalidEmails.forEach((email) => {
        const data = {
          name: 'John Doe',
          email,
          serviceType: 'assignment-writing',
          projectDetails: 'This is a valid project description.',
        };
        
        const result = quoteFormSchema.safeParse(data);
        expect(result.success).toBe(false);
      });
    });

    it('should reject empty email', () => {
      const data = {
        name: 'John Doe',
        email: '',
        serviceType: 'assignment-writing',
        projectDetails: 'This is a valid project description.',
      };
      
      const result = quoteFormSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(0);
        expect(result.error.issues[0]?.message).toContain('required');
      }
    });
  });

  describe('serviceType validation', () => {
    it('should accept valid service types', () => {
      const validServiceTypes = [
        'assignment-writing',
        'essay-writing',
        'dissertation-writing',
        'proofreading',
        'cv-writing',
      ];

      validServiceTypes.forEach((serviceType) => {
        const data = {
          name: 'John Doe',
          email: 'john@example.com',
          serviceType,
          projectDetails: 'This is a valid project description.',
        };
        
        const result = quoteFormSchema.safeParse(data);
        expect(result.success).toBe(true);
      });
    });

    it('should reject invalid service types', () => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        serviceType: 'invalid-service',
        projectDetails: 'This is a valid project description.',
      };
      
      const result = quoteFormSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(0);
        expect(result.error.issues[0]?.message).toContain('valid service type');
      }
    });

    it('should reject empty service type', () => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        serviceType: '',
        projectDetails: 'This is a valid project description.',
      };
      
      const result = quoteFormSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('projectDetails validation', () => {
    it('should accept valid project details', () => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        serviceType: 'assignment-writing',
        projectDetails: 'This is a valid project description with enough characters to meet the minimum requirement.',
      };
      
      const result = quoteFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should reject project details that are too short', () => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        serviceType: 'assignment-writing',
        projectDetails: 'Too short',
      };
      
      const result = quoteFormSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(0);
        expect(result.error.issues[0]?.message).toContain('at least 10 characters');
      }
    });

    it('should reject project details that are too long', () => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        serviceType: 'assignment-writing',
        projectDetails: 'A'.repeat(2001),
      };
      
      const result = quoteFormSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(0);
        expect(result.error.issues[0]?.message).toContain('not exceed 2000 characters');
      }
    });

    it('should reject empty project details', () => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        serviceType: 'assignment-writing',
        projectDetails: '',
      };
      
      const result = quoteFormSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });
});

describe('Order Form Schema', () => {
  describe('deadline validation', () => {
    it('should accept future dates', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 7);
      
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        serviceType: 'assignment-writing',
        deadline: futureDate.toISOString().split('T')[0],
        requirements: 'These are detailed requirements with enough characters to meet the minimum.',
      };
      
      const result = orderFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should accept today as a valid deadline', () => {
      // Create today's date in local timezone format (YYYY-MM-DD)
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const todayString = `${year}-${month}-${day}`;
      
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        serviceType: 'assignment-writing',
        deadline: todayString,
        requirements: 'These are detailed requirements with enough characters to meet the minimum.',
      };
      
      const result = orderFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should reject past dates', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 7);
      
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        serviceType: 'assignment-writing',
        deadline: pastDate.toISOString().split('T')[0],
        requirements: 'These are detailed requirements with enough characters.',
      };
      
      const result = orderFormSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(0);
        expect(result.error.issues[0]?.message).toContain('future date');
      }
    });

    it('should reject invalid date formats', () => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        serviceType: 'assignment-writing',
        deadline: 'not-a-date',
        requirements: 'These are detailed requirements with enough characters.',
      };
      
      const result = orderFormSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(0);
        expect(result.error.issues[0]?.message).toContain('valid date');
      }
    });

    it('should reject empty deadline', () => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        serviceType: 'assignment-writing',
        deadline: '',
        requirements: 'These are detailed requirements with enough characters.',
      };
      
      const result = orderFormSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('requirements validation', () => {
    it('should accept valid requirements', () => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        serviceType: 'assignment-writing',
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        requirements: 'These are detailed requirements with enough characters to meet the minimum requirement of 20 characters.',
      };
      
      const result = orderFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should reject requirements that are too short', () => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        serviceType: 'assignment-writing',
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        requirements: 'Too short',
      };
      
      const result = orderFormSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(0);
        expect(result.error.issues[0]?.message).toContain('at least 20 characters');
      }
    });

    it('should reject requirements that are too long', () => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        serviceType: 'assignment-writing',
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        requirements: 'A'.repeat(5001),
      };
      
      const result = orderFormSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(0);
        expect(result.error.issues[0]?.message).toContain('not exceed 5000 characters');
      }
    });

    it('should reject empty requirements', () => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        serviceType: 'assignment-writing',
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        requirements: '',
      };
      
      const result = orderFormSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('complete order form validation', () => {
    it('should accept completely valid order form data', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 14);
      
      const data = {
        name: 'Jane Smith',
        email: 'jane.smith@university.edu',
        serviceType: 'dissertation-writing',
        deadline: futureDate.toISOString().split('T')[0],
        requirements: 'I need help with my dissertation on machine learning applications in healthcare. The dissertation should be approximately 15,000 words and include a comprehensive literature review, methodology section, and data analysis.',
      };
      
      const result = orderFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should report multiple validation errors', () => {
      const data = {
        name: 'J',
        email: 'invalid-email',
        serviceType: 'invalid-service',
        deadline: 'not-a-date',
        requirements: 'Short',
      };
      
      const result = orderFormSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(1);
      }
    });
  });
});
