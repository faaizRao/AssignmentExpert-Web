/**
 * Form Validation Property-Based Tests
 * 
 * Property-based tests using fast-check to validate form validation behavior
 * across a wide range of inputs. Each test runs at least 100 iterations.
 * 
 * Feature: academics-consulate-website
 * Task: 3.3 Write property tests for form validation
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { quoteFormSchema, orderFormSchema } from './formSchemas';

/**
 * Property 22: Form Validation Error Display
 * 
 * **Validates: Requirements 13.1**
 * 
 * For any invalid form input, the website should display a field-specific
 * error message indicating what needs to be corrected.
 */
describe('Property 22: Form Validation Error Display', () => {
  it('should display field-specific error messages for invalid inputs', () => {
    fc.assert(
      fc.property(
        fc.record({
          name: fc.oneof(
            fc.constant(''), // Empty name
            fc.constant('J'), // Too short
            fc.string({ minLength: 101, maxLength: 150 }), // Too long
            fc.string().filter(s => /[0-9!@#$%^&*()]/.test(s)) // Invalid characters
          ),
          email: fc.oneof(
            fc.constant(''), // Empty email
            fc.constant('invalid'), // No @ symbol
            fc.constant('invalid@'), // No domain
            fc.constant('@example.com'), // No local part
            fc.constant('invalid@.com'), // Invalid domain
            fc.constant('invalid @example.com') // Space in email
          ),
          serviceType: fc.oneof(
            fc.constant(''), // Empty service type
            fc.constant('invalid-service'), // Non-existent service
            fc.string().filter(s => s !== '' && !s.includes('writing') && !s.includes('editing'))
          ),
          projectDetails: fc.oneof(
            fc.constant(''), // Empty details
            fc.string({ maxLength: 9 }), // Too short
            fc.string({ minLength: 2001, maxLength: 3000 }) // Too long
          )
        }),
        (invalidData) => {
          const result = quoteFormSchema.safeParse(invalidData);
          
          // Should fail validation
          expect(result.success).toBe(false);
          
          if (!result.success) {
            // Should have at least one error
            expect(result.error.issues.length).toBeGreaterThan(0);
            
            // Each error should have a field path and message
            result.error.issues.forEach(issue => {
              expect(issue.path).toBeDefined();
              expect(issue.path.length).toBeGreaterThan(0);
              expect(issue.message).toBeDefined();
              expect(typeof issue.message).toBe('string');
              expect(issue.message.length).toBeGreaterThan(0);
            });
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should provide specific error messages for order form invalid inputs', () => {
    fc.assert(
      fc.property(
        fc.record({
          name: fc.string({ maxLength: 1 }), // Invalid name
          email: fc.constant('invalid-email'), // Invalid email
          serviceType: fc.constant(''), // Empty service
          deadline: fc.oneof(
            fc.constant(''), // Empty deadline
            fc.constant('not-a-date'), // Invalid format
            fc.date({ max: new Date(Date.now() - 86400000) }).map(d => d.toISOString().split('T')[0]) // Past date
          ),
          requirements: fc.string({ maxLength: 19 }) // Too short
        }),
        (invalidData) => {
          const result = orderFormSchema.safeParse(invalidData);
          
          expect(result.success).toBe(false);
          
          if (!result.success) {
            expect(result.error.issues.length).toBeGreaterThan(0);
            
            // Verify error messages are descriptive
            result.error.issues.forEach(issue => {
              expect(issue.message).toBeDefined();
              expect(issue.message.length).toBeGreaterThan(5); // Not just "Error"
            });
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});

/**
 * Property 23: Email Format Validation
 * 
 * **Validates: Requirements 13.2**
 * 
 * For any email input field, the validation should accept valid email formats
 * and reject invalid formats according to RFC 5322 standards.
 */
describe('Property 23: Email Format Validation', () => {
  it('should accept valid email formats', () => {
    fc.assert(
      fc.property(
        // Generate valid email local parts (no leading/trailing dots or special chars)
        fc.string({ minLength: 1, maxLength: 20 })
          .filter(s => /^[a-zA-Z0-9][a-zA-Z0-9._+-]*[a-zA-Z0-9]$/.test(s) || /^[a-zA-Z0-9]$/.test(s)),
        // Generate valid domain names (no leading/trailing hyphens or dots)
        fc.string({ minLength: 1, maxLength: 20 })
          .filter(s => /^[a-zA-Z0-9][a-zA-Z0-9.-]*[a-zA-Z0-9]$/.test(s) || /^[a-zA-Z0-9]$/.test(s)),
        fc.constantFrom('com', 'org', 'net', 'edu', 'co.uk'),
        // Generate valid names (no leading/trailing whitespace, at least 2 non-space chars)
        fc.string({ minLength: 2, maxLength: 50 })
          .filter(s => /^[a-zA-Z][a-zA-Z\s'-]*[a-zA-Z]$/.test(s) || /^[a-zA-Z]{2,}$/.test(s)),
        fc.constantFrom('assignment-writing', 'essay-writing', 'dissertation-writing', 'proofreading', 'cv-writing'),
        // Generate valid project details (at least 10 non-whitespace chars)
        fc.string({ minLength: 10, maxLength: 500 })
          .filter(s => s.replace(/\s/g, '').length >= 10),
        (localPart, domain, tld, name, serviceType, projectDetails) => {
          const email = `${localPart}@${domain}.${tld}`;
          const data = {
            name,
            email,
            serviceType,
            projectDetails
          };
          
          const result = quoteFormSchema.safeParse(data);
          
          // Valid email should pass (or fail for other reasons, but not email)
          if (!result.success) {
            const emailErrors = result.error.issues.filter(issue => 
              issue.path.includes('email')
            );
            // Should not have email-specific errors for valid emails
            expect(emailErrors.length).toBe(0);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should reject invalid email formats', () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.constant('plaintext'),
          fc.constant('missing@domain'),
          fc.constant('@nodomain.com'),
          fc.constant('spaces in@email.com'),
          fc.constant('double@@domain.com'),
          fc.constant('nodomain@'),
          fc.constant('no-tld@domain'),
          fc.string().filter(s => !s.includes('@') && s.length > 0)
        ),
        (invalidEmail) => {
          const data = {
            name: 'John Doe',
            email: invalidEmail,
            serviceType: 'assignment-writing',
            projectDetails: 'Valid project details with enough characters.'
          };
          
          const result = quoteFormSchema.safeParse(data);
          
          expect(result.success).toBe(false);
          
          if (!result.success) {
            const emailErrors = result.error.issues.filter(issue => 
              issue.path.includes('email')
            );
            expect(emailErrors.length).toBeGreaterThan(0);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should validate email format in order forms', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 20 })
          .filter(s => /^[a-zA-Z0-9][a-zA-Z0-9._+-]*[a-zA-Z0-9]$/.test(s) || /^[a-zA-Z0-9]$/.test(s)),
        fc.string({ minLength: 1, maxLength: 20 })
          .filter(s => /^[a-zA-Z0-9][a-zA-Z0-9.-]*[a-zA-Z0-9]$/.test(s) || /^[a-zA-Z0-9]$/.test(s)),
        fc.constantFrom('com', 'org', 'net', 'edu'),
        (localPart, domain, tld) => {
          const email = `${localPart}@${domain}.${tld}`;
          const futureDate = new Date();
          futureDate.setDate(futureDate.getDate() + 7);
          
          const data = {
            name: 'Jane Smith',
            email,
            serviceType: 'dissertation-writing',
            deadline: futureDate.toISOString().split('T')[0],
            requirements: 'Valid requirements with enough characters to meet minimum.'
          };
          
          const result = orderFormSchema.safeParse(data);
          
          // Valid email should not cause email validation errors
          if (!result.success) {
            const emailErrors = result.error.issues.filter(issue => 
              issue.path.includes('email')
            );
            expect(emailErrors.length).toBe(0);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});

/**
 * Property 24: Required Field Enforcement
 * 
 * **Validates: Requirements 13.3**
 * 
 * For any form with empty required fields, the submit button should be disabled
 * until all required fields are filled.
 */
describe('Property 24: Required Field Enforcement', () => {
  it('should reject quote forms with any empty required field', () => {
    fc.assert(
      fc.property(
        fc.record({
          name: fc.option(fc.string({ minLength: 2, maxLength: 50 }), { nil: '' }),
          email: fc.option(fc.emailAddress(), { nil: '' }),
          serviceType: fc.option(fc.constantFrom('assignment-writing', 'essay-writing'), { nil: '' }),
          projectDetails: fc.option(fc.string({ minLength: 10, maxLength: 500 }), { nil: '' })
        }).filter(data => 
          // At least one field must be empty
          data.name === '' || data.email === '' || data.serviceType === '' || data.projectDetails === ''
        ),
        (dataWithEmptyField) => {
          const result = quoteFormSchema.safeParse(dataWithEmptyField);
          
          // Should fail validation when any required field is empty
          expect(result.success).toBe(false);
          
          if (!result.success) {
            // Should have error for the empty field(s)
            const emptyFieldErrors = result.error.issues.filter(issue => 
              issue.message.toLowerCase().includes('required')
            );
            expect(emptyFieldErrors.length).toBeGreaterThan(0);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should reject order forms with any empty required field', () => {
    fc.assert(
      fc.property(
        fc.record({
          name: fc.option(fc.string({ minLength: 2, maxLength: 50 }), { nil: '' }),
          email: fc.option(
            fc.string({ minLength: 1, maxLength: 20 })
              .filter(s => /^[a-zA-Z0-9._+-]+$/.test(s))
              .map(s => `${s}@example.com`),
            { nil: '' }
          ),
          serviceType: fc.option(fc.constantFrom('assignment-writing', 'dissertation-writing'), { nil: '' }),
          deadline: fc.option(
            fc.integer({ min: 1, max: 365 }).map(days => {
              const date = new Date();
              date.setDate(date.getDate() + days);
              return date.toISOString().split('T')[0];
            }),
            { nil: '' }
          ),
          requirements: fc.option(fc.string({ minLength: 20, maxLength: 500 }), { nil: '' })
        }).filter(data => 
          // At least one field must be empty
          data.name === '' || data.email === '' || data.serviceType === '' || 
          data.deadline === '' || data.requirements === ''
        ),
        (dataWithEmptyField) => {
          const result = orderFormSchema.safeParse(dataWithEmptyField);
          
          expect(result.success).toBe(false);
          
          if (!result.success) {
            const emptyFieldErrors = result.error.issues.filter(issue => 
              issue.message.toLowerCase().includes('required')
            );
            expect(emptyFieldErrors.length).toBeGreaterThan(0);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should accept forms when all required fields are filled with valid data', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 2, maxLength: 50 })
          .filter(s => /^[a-zA-Z][a-zA-Z\s'-]*[a-zA-Z]$/.test(s) || /^[a-zA-Z]{2,}$/.test(s)),
        fc.string({ minLength: 1, maxLength: 20 })
          .filter(s => /^[a-zA-Z0-9][a-zA-Z0-9._+-]*[a-zA-Z0-9]$/.test(s) || /^[a-zA-Z0-9]$/.test(s))
          .map(s => `${s}@example.com`),
        fc.constantFrom('assignment-writing', 'essay-writing', 'dissertation-writing', 'proofreading', 'cv-writing'),
        fc.string({ minLength: 10, maxLength: 500 })
          .filter(s => s.replace(/\s/g, '').length >= 10),
        (name, email, serviceType, projectDetails) => {
          const data = {
            name,
            email,
            serviceType,
            projectDetails
          };
          
          const result = quoteFormSchema.safeParse(data);
          
          // Should pass validation when all required fields are filled
          expect(result.success).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });
});

/**
 * Property 25: Error Message Clearing
 * 
 * **Validates: Requirements 13.4**
 * 
 * For any form field with a validation error, correcting the input should
 * immediately remove the error message.
 */
describe('Property 25: Error Message Clearing', () => {
  it('should clear name errors when corrected', () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.constant(''), // Empty
          fc.constant('J'), // Too short
          fc.string({ minLength: 101, maxLength: 150 }), // Too long
          fc.string().filter(s => /[0-9]/.test(s)) // Invalid chars
        ),
        fc.string({ minLength: 2, maxLength: 50 }).filter(s => /^[a-zA-Z\s'-]+$/.test(s)),
        (invalidName, validName) => {
          // First validation with invalid name
          const invalidData = {
            name: invalidName,
            email: 'test@example.com',
            serviceType: 'assignment-writing',
            projectDetails: 'Valid project details here.'
          };
          
          const invalidResult = quoteFormSchema.safeParse(invalidData);
          expect(invalidResult.success).toBe(false);
          
          if (!invalidResult.success) {
            const nameErrors = invalidResult.error.issues.filter(issue => 
              issue.path.includes('name')
            );
            expect(nameErrors.length).toBeGreaterThan(0);
          }
          
          // Second validation with corrected name
          const validData = {
            ...invalidData,
            name: validName
          };
          
          const validResult = quoteFormSchema.safeParse(validData);
          
          // Should not have name errors after correction
          if (!validResult.success) {
            const nameErrors = validResult.error.issues.filter(issue => 
              issue.path.includes('name')
            );
            expect(nameErrors.length).toBe(0);
          } else {
            expect(validResult.success).toBe(true);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should clear email errors when corrected', () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.constant('invalid'),
          fc.constant('no-at-sign.com'),
          fc.constant('@nodomain.com')
        ),
        fc.string({ minLength: 1, maxLength: 20 })
          .filter(s => /^[a-zA-Z0-9][a-zA-Z0-9._+-]*[a-zA-Z0-9]$/.test(s) || /^[a-zA-Z0-9]$/.test(s))
          .map(s => `${s}@example.com`),
        (invalidEmail, validEmail) => {
          // First validation with invalid email
          const invalidData = {
            name: 'John Doe',
            email: invalidEmail,
            serviceType: 'assignment-writing',
            projectDetails: 'Valid project details here.'
          };
          
          const invalidResult = quoteFormSchema.safeParse(invalidData);
          expect(invalidResult.success).toBe(false);
          
          // Second validation with corrected email
          const validData = {
            ...invalidData,
            email: validEmail
          };
          
          const validResult = quoteFormSchema.safeParse(validData);
          
          // Should not have email errors after correction
          if (!validResult.success) {
            const emailErrors = validResult.error.issues.filter(issue => 
              issue.path.includes('email')
            );
            expect(emailErrors.length).toBe(0);
          } else {
            expect(validResult.success).toBe(true);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should clear deadline errors when corrected in order form', () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.constant(''), // Empty
          fc.constant('invalid-date'), // Invalid format
          fc.integer({ min: 1, max: 365 }).map(days => {
            const date = new Date();
            date.setDate(date.getDate() - days);
            return date.toISOString().split('T')[0];
          }) // Past date
        ),
        fc.integer({ min: 1, max: 365 }).map(days => {
          const date = new Date();
          date.setDate(date.getDate() + days);
          return date.toISOString().split('T')[0];
        }),
        (invalidDeadline, validDeadline) => {
          // First validation with invalid deadline
          const invalidData = {
            name: 'Jane Smith',
            email: 'jane@example.com',
            serviceType: 'dissertation-writing',
            deadline: invalidDeadline,
            requirements: 'Valid requirements with enough characters.'
          };
          
          const invalidResult = orderFormSchema.safeParse(invalidData);
          expect(invalidResult.success).toBe(false);
          
          // Second validation with corrected deadline
          const validData = {
            ...invalidData,
            deadline: validDeadline
          };
          
          const validResult = orderFormSchema.safeParse(validData);
          
          // Should not have deadline errors after correction
          if (!validResult.success) {
            const deadlineErrors = validResult.error.issues.filter(issue => 
              issue.path.includes('deadline')
            );
            expect(deadlineErrors.length).toBe(0);
          } else {
            expect(validResult.success).toBe(true);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should clear multiple field errors when all are corrected', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 2, maxLength: 50 })
          .filter(s => /^[a-zA-Z][a-zA-Z\s'-]*[a-zA-Z]$/.test(s) || /^[a-zA-Z]{2,}$/.test(s)),
        fc.string({ minLength: 1, maxLength: 20 })
          .filter(s => /^[a-zA-Z0-9][a-zA-Z0-9._+-]*[a-zA-Z0-9]$/.test(s) || /^[a-zA-Z0-9]$/.test(s))
          .map(s => `${s}@example.com`),
        fc.constantFrom('assignment-writing', 'essay-writing', 'dissertation-writing'),
        fc.string({ minLength: 10, maxLength: 500 })
          .filter(s => s.replace(/\s/g, '').length >= 10),
        (validName, validEmail, validService, validDetails) => {
          // First validation with multiple invalid fields
          const invalidData = {
            name: '', // Invalid
            email: 'invalid', // Invalid
            serviceType: '', // Invalid
            projectDetails: 'short' // Invalid
          };
          
          const invalidResult = quoteFormSchema.safeParse(invalidData);
          expect(invalidResult.success).toBe(false);
          
          if (!invalidResult.success) {
            expect(invalidResult.error.issues.length).toBeGreaterThan(1);
          }
          
          // Second validation with all fields corrected
          const validData = {
            name: validName,
            email: validEmail,
            serviceType: validService,
            projectDetails: validDetails
          };
          
          const validResult = quoteFormSchema.safeParse(validData);
          
          // Should pass validation after all corrections
          expect(validResult.success).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });
});
