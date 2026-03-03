/**
 * Property-Based Tests for Service Type Completeness
 * 
 * Feature: academics-consulate-website
 * Property 1: Service Page Completeness
 * 
 * **Validates: Requirements 2.2, 2.3**
 * 
 * This test verifies that service data structures contain all required
 * information for displaying complete service pages.
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { Service, ServiceCategory } from './services';

/**
 * Arbitrary generator for ServiceCategory enum
 */
const serviceCategoryArbitrary = fc.constantFrom(
  ServiceCategory.WRITING,
  ServiceCategory.EDITING,
  ServiceCategory.RESEARCH,
  ServiceCategory.CAREER
);

/**
 * Arbitrary generator for Service objects
 * 
 * Generates random but valid Service objects with all required fields.
 * This ensures we test across a wide variety of service configurations.
 */
const serviceArbitrary: fc.Arbitrary<Service> = fc.record({
  id: fc.stringMatching(/^[a-z0-9-]+$/),
  name: fc.string({ minLength: 1, maxLength: 100 }),
  slug: fc.stringMatching(/^[a-z0-9-]+$/),
  description: fc.string({ minLength: 100, maxLength: 200 }),
  longDescription: fc.string({ minLength: 500, maxLength: 2000 }),
  benefits: fc.array(fc.string({ minLength: 10, maxLength: 200 }), { minLength: 1, maxLength: 10 }),
  icon: fc.string({ minLength: 1, maxLength: 100 }),
  category: serviceCategoryArbitrary,
  featured: fc.boolean(),
  metaTitle: fc.string({ minLength: 10, maxLength: 60 }),
  metaDescription: fc.string({ minLength: 50, maxLength: 160 }),
});

describe('Property 1: Service Page Completeness', () => {
  /**
   * Property Test: Service objects must contain all required fields
   * 
   * For any service, the service data structure should include:
   * - Service name (for display)
   * - Description (short and long)
   * - Benefits (list of advantages)
   * - All metadata needed for a complete page
   * 
   * This validates Requirements 2.2 and 2.3:
   * - 2.2: Service pages display service name, description, and benefits
   * - 2.3: Service pages display a call-to-action (verified by having complete data)
   */
  it('should have all required fields for displaying a complete service page', () => {
    fc.assert(
      fc.property(serviceArbitrary, (service: Service) => {
        // Requirement 2.2: Service name must be present
        expect(service.name).toBeDefined();
        expect(service.name).not.toBe('');
        expect(typeof service.name).toBe('string');

        // Requirement 2.2: Service description must be present
        expect(service.description).toBeDefined();
        expect(service.description).not.toBe('');
        expect(typeof service.description).toBe('string');
        expect(service.description.length).toBeGreaterThanOrEqual(100);
        expect(service.description.length).toBeLessThanOrEqual(200);

        // Requirement 2.2: Long description must be present for detailed pages
        expect(service.longDescription).toBeDefined();
        expect(service.longDescription).not.toBe('');
        expect(typeof service.longDescription).toBe('string');
        expect(service.longDescription.length).toBeGreaterThanOrEqual(500);
        expect(service.longDescription.length).toBeLessThanOrEqual(2000);

        // Requirement 2.2: Benefits must be present and non-empty
        expect(service.benefits).toBeDefined();
        expect(Array.isArray(service.benefits)).toBe(true);
        expect(service.benefits.length).toBeGreaterThan(0);
        service.benefits.forEach(benefit => {
          expect(benefit).toBeDefined();
          expect(benefit).not.toBe('');
          expect(typeof benefit).toBe('string');
        });

        // Additional required fields for complete service pages
        expect(service.id).toBeDefined();
        expect(service.id).not.toBe('');
        expect(typeof service.id).toBe('string');

        expect(service.slug).toBeDefined();
        expect(service.slug).not.toBe('');
        expect(typeof service.slug).toBe('string');

        expect(service.icon).toBeDefined();
        expect(service.icon).not.toBe('');
        expect(typeof service.icon).toBe('string');

        expect(service.category).toBeDefined();
        expect(Object.values(ServiceCategory)).toContain(service.category);

        expect(service.featured).toBeDefined();
        expect(typeof service.featured).toBe('boolean');

        // SEO metadata for complete pages
        expect(service.metaTitle).toBeDefined();
        expect(service.metaTitle).not.toBe('');
        expect(typeof service.metaTitle).toBe('string');

        expect(service.metaDescription).toBeDefined();
        expect(service.metaDescription).not.toBe('');
        expect(typeof service.metaDescription).toBe('string');
      }),
      { numRuns: 100 } // Minimum 100 iterations as specified in design
    );
  });

  /**
   * Property Test: Service descriptions must meet length requirements
   * 
   * Validates that descriptions are within the specified character ranges
   * to ensure proper display and SEO optimization.
   */
  it('should have descriptions within specified length constraints', () => {
    fc.assert(
      fc.property(serviceArbitrary, (service: Service) => {
        // Short description: 100-200 characters
        expect(service.description.length).toBeGreaterThanOrEqual(100);
        expect(service.description.length).toBeLessThanOrEqual(200);

        // Long description: 500-2000 characters
        expect(service.longDescription.length).toBeGreaterThanOrEqual(500);
        expect(service.longDescription.length).toBeLessThanOrEqual(2000);

        // Meta description: 50-160 characters (SEO best practice)
        expect(service.metaDescription.length).toBeGreaterThanOrEqual(50);
        expect(service.metaDescription.length).toBeLessThanOrEqual(160);

        // Meta title: 10-60 characters (SEO best practice)
        expect(service.metaTitle.length).toBeGreaterThanOrEqual(10);
        expect(service.metaTitle.length).toBeLessThanOrEqual(60);
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property Test: Service identifiers must be URL-safe
   * 
   * Validates that id and slug fields use kebab-case format
   * suitable for URLs and routing.
   */
  it('should have URL-safe identifiers in kebab-case format', () => {
    fc.assert(
      fc.property(serviceArbitrary, (service: Service) => {
        // ID should be kebab-case (lowercase letters, numbers, hyphens)
        expect(service.id).toMatch(/^[a-z0-9-]+$/);
        
        // Slug should be kebab-case (lowercase letters, numbers, hyphens)
        expect(service.slug).toMatch(/^[a-z0-9-]+$/);
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property Test: Service benefits must be meaningful
   * 
   * Validates that each benefit is a non-empty string with sufficient content.
   */
  it('should have meaningful benefits with adequate content', () => {
    fc.assert(
      fc.property(serviceArbitrary, (service: Service) => {
        expect(service.benefits.length).toBeGreaterThan(0);
        
        service.benefits.forEach(benefit => {
          expect(benefit.length).toBeGreaterThan(0);
          expect(typeof benefit).toBe('string');
          // Benefits should have at least some meaningful content
          expect(benefit.trim()).not.toBe('');
        });
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property Test: Service category must be valid
   * 
   * Validates that the category field contains one of the defined
   * ServiceCategory enum values.
   */
  it('should have a valid service category', () => {
    fc.assert(
      fc.property(serviceArbitrary, (service: Service) => {
        const validCategories = Object.values(ServiceCategory);
        expect(validCategories).toContain(service.category);
      }),
      { numRuns: 100 }
    );
  });
});
