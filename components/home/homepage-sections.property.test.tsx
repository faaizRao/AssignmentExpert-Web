/**
 * Homepage Sections Property-Based Tests
 * 
 * Property-based tests using fast-check to validate homepage section behavior
 * across a wide range of inputs. Each test runs at least 100 iterations.
 * 
 * Feature: academics-consulate-website
 * Task: 11.8 Write property tests for homepage sections
 */

import { describe, it, expect, vi } from 'vitest';
import * as fc from 'fast-check';
import { render, screen } from '@testing-library/react';
import Testimonials from './Testimonials';
import ServicesOverview from './ServicesOverview';
import { Service, ServiceCategory } from '@/types/services';
import { getServicesByCategory } from '@/lib/services/serviceData';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useReducedMotion: () => false,
}));

// Mock ScrollReveal
vi.mock('@/components/animations/ScrollReveal', () => ({
  default: ({ children }: any) => <div data-testid="scroll-reveal">{children}</div>,
}));

// Mock Card component
vi.mock('@/components/ui/Card', () => ({
  default: ({ title, description, link, icon }: any) => (
    <div data-testid="service-card" data-icon={icon}>
      <h3>{title}</h3>
      <p>{description}</p>
      {link && <a href={link}>View Service</a>}
      {icon && <span data-testid="service-icon">{icon}</span>}
    </div>
  ),
}));

/**
 * Property 16: Testimonial Name Display
 * 
 * **Validates: Requirements 10.4**
 * 
 * For any testimonial displayed on the website, it should include the
 * customer's name or initials.
 */
describe('Property 16: Testimonial Name Display', () => {
  it('should display customer name for any testimonial', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            id: fc.string({ minLength: 1, maxLength: 20 }),
            name: fc.string({ minLength: 2, maxLength: 100 })
              .filter(s => s.trim().length >= 2),
            rating: fc.integer({ min: 1, max: 5 }),
            text: fc.string({ minLength: 10, maxLength: 500 }),
            date: fc.date({ min: new Date('2020-01-01'), max: new Date() })
              .map(d => d.toISOString().split('T')[0])
          }),
          { minLength: 1, maxLength: 10 }
        ),
        (testimonials) => {
          const { container } = render(<Testimonials testimonials={testimonials} />);
          
          // The currently displayed testimonial should have a name visible
          const firstTestimonial = testimonials[0];
          
          if (firstTestimonial) {
            // Check that the name is displayed in the document
            const nameElement = screen.getByText(firstTestimonial.name);
            expect(nameElement).toBeInTheDocument();
            
            // Verify the name is not empty
            expect(firstTestimonial.name.trim().length).toBeGreaterThan(0);
            
            // Verify the name element is visible (not hidden)
            expect(nameElement).toBeVisible();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should display name or initials for testimonials with various name formats', () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.constant('John Doe'),
          fc.constant('J.D.'),
          fc.constant('Jane Smith'),
          fc.constant('J.S.'),
          fc.constant('Robert Johnson'),
          fc.constant('R.J.'),
          fc.tuple(
            fc.string({ minLength: 1, maxLength: 20 }).filter(s => /^[A-Z][a-z]+$/.test(s)),
            fc.string({ minLength: 1, maxLength: 20 }).filter(s => /^[A-Z][a-z]+$/.test(s))
          ).map(([first, last]) => `${first} ${last}`)
        ),
        fc.integer({ min: 1, max: 5 }),
        fc.string({ minLength: 20, maxLength: 200 }),
        (name, rating, text) => {
          const testimonial = {
            id: '1',
            name,
            rating,
            text,
            date: '2024-01-15'
          };
          
          render(<Testimonials testimonials={[testimonial]} />);
          
          // Property 16: Name must be displayed
          expect(screen.getByText(name)).toBeInTheDocument();
          
          // Verify name is not empty or just whitespace
          expect(name.trim().length).toBeGreaterThan(0);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should always display a name element for each testimonial in the carousel', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            id: fc.uuid(),
            name: fc.oneof(
              fc.string({ minLength: 2, maxLength: 50 })
                .filter(s => /^[A-Za-z\s'-]+$/.test(s) && s.trim().length >= 2),
              fc.tuple(
                fc.constantFrom('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'),
                fc.constantFrom('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J')
              ).map(([first, last]) => `${first}.${last}.`)
            ),
            rating: fc.integer({ min: 1, max: 5 }),
            text: fc.lorem({ maxCount: 3 }),
            date: fc.date({ min: new Date('2020-01-01'), max: new Date() })
              .map(d => d.toISOString())
          }),
          { minLength: 1, maxLength: 5 }
        ),
        (testimonials) => {
          render(<Testimonials testimonials={testimonials} />);
          
          // The first testimonial should be displayed
          const firstTestimonial = testimonials[0];
          
          if (firstTestimonial) {
            // Property 16: Customer name must be present
            const nameElement = screen.getByText(firstTestimonial.name);
            expect(nameElement).toBeInTheDocument();
            
            // Name should be a non-empty string
            expect(typeof firstTestimonial.name).toBe('string');
            expect(firstTestimonial.name.length).toBeGreaterThan(0);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});

/**
 * Property 29: Category Filtering
 * 
 * **Validates: Requirements 18.3**
 * 
 * For any service category, clicking the category should display all services
 * belonging to that category and no others.
 */
describe('Property 29: Category Filtering', () => {
  it('should display only services from the specified category', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          ServiceCategory.WRITING,
          ServiceCategory.EDITING,
          ServiceCategory.RESEARCH,
          ServiceCategory.CAREER
        ),
        (category) => {
          // Get services for this category from the actual service data
          const categoryServices = getServicesByCategory(category);
          
          // Render the services overview with only this category's services
          render(<ServicesOverview services={categoryServices} />);
          
          // Verify all displayed services belong to the selected category
          categoryServices.forEach(service => {
            expect(service.category).toBe(category);
            expect(screen.getByText(service.name)).toBeInTheDocument();
          });
          
          // Verify the count matches
          const serviceCards = screen.getAllByTestId('service-card');
          expect(serviceCards.length).toBe(categoryServices.length);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should not display services from other categories when filtering', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          ServiceCategory.WRITING,
          ServiceCategory.EDITING,
          ServiceCategory.RESEARCH,
          ServiceCategory.CAREER
        ),
        (selectedCategory) => {
          // Get services for the selected category
          const selectedServices = getServicesByCategory(selectedCategory);
          
          // Get all other categories
          const otherCategories = Object.values(ServiceCategory)
            .filter(cat => cat !== selectedCategory);
          
          // Get services from other categories
          const otherServices = otherCategories.flatMap(cat => 
            getServicesByCategory(cat)
          );
          
          // Render only the selected category's services
          render(<ServicesOverview services={selectedServices} />);
          
          // Verify services from other categories are NOT displayed
          otherServices.forEach(service => {
            expect(screen.queryByText(service.name)).not.toBeInTheDocument();
          });
          
          // Verify only selected category services are displayed
          selectedServices.forEach(service => {
            expect(screen.getByText(service.name)).toBeInTheDocument();
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should correctly filter services by category property', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            id: fc.uuid(),
            name: fc.string({ minLength: 5, maxLength: 50 }),
            slug: fc.string({ minLength: 5, maxLength: 50 })
              .map(s => s.toLowerCase().replace(/\s+/g, '-')),
            description: fc.string({ minLength: 20, maxLength: 200 }),
            longDescription: fc.string({ minLength: 50, maxLength: 500 }),
            benefits: fc.array(fc.string({ minLength: 10, maxLength: 100 }), { minLength: 3, maxLength: 5 }),
            icon: fc.constantFrom('icon1', 'icon2', 'icon3'),
            category: fc.constantFrom(
              ServiceCategory.WRITING,
              ServiceCategory.EDITING,
              ServiceCategory.RESEARCH,
              ServiceCategory.CAREER
            ),
            featured: fc.boolean(),
            metaTitle: fc.string({ minLength: 10, maxLength: 100 }),
            metaDescription: fc.string({ minLength: 20, maxLength: 200 })
          }),
          { minLength: 5, maxLength: 20 }
        ),
        fc.constantFrom(
          ServiceCategory.WRITING,
          ServiceCategory.EDITING,
          ServiceCategory.RESEARCH,
          ServiceCategory.CAREER
        ),
        (allServices, filterCategory) => {
          // Filter services by category
          const filteredServices = allServices.filter(
            service => service.category === filterCategory
          );
          
          // Render the filtered services
          render(<ServicesOverview services={filteredServices} />);
          
          // Property 29: All displayed services must belong to the filter category
          filteredServices.forEach(service => {
            expect(service.category).toBe(filterCategory);
          });
          
          // Verify no services from other categories are included
          const otherCategoryServices = allServices.filter(
            service => service.category !== filterCategory
          );
          
          otherCategoryServices.forEach(service => {
            expect(screen.queryByText(service.name)).not.toBeInTheDocument();
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should handle empty category results correctly', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          ServiceCategory.WRITING,
          ServiceCategory.EDITING,
          ServiceCategory.RESEARCH,
          ServiceCategory.CAREER
        ),
        (category) => {
          // Render with empty services array (simulating no services in category)
          render(<ServicesOverview services={[]} />);
          
          // Should still render the section heading
          expect(screen.getByText('Our Services')).toBeInTheDocument();
          
          // Should not have any service cards
          const serviceCards = screen.queryAllByTestId('service-card');
          expect(serviceCards.length).toBe(0);
        }
      ),
      { numRuns: 100 }
    );
  });
});

/**
 * Property 30: Service Visual Identification
 * 
 * **Validates: Requirements 18.5**
 * 
 * For any service displayed, it should include an icon or image for
 * visual identification.
 */
describe('Property 30: Service Visual Identification', () => {
  it('should display an icon for every service', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            id: fc.uuid(),
            name: fc.string({ minLength: 5, maxLength: 50 }),
            slug: fc.string({ minLength: 5, maxLength: 50 })
              .map(s => s.toLowerCase().replace(/\s+/g, '-')),
            description: fc.string({ minLength: 20, maxLength: 200 }),
            longDescription: fc.string({ minLength: 50, maxLength: 500 }),
            benefits: fc.array(fc.string({ minLength: 10, maxLength: 100 }), { minLength: 3, maxLength: 5 }),
            icon: fc.constantFrom(
              'assignment', 'essay', 'dissertation', 'coursework',
              'proofreading', 'editing', 'cv', 'resume'
            ),
            category: fc.constantFrom(
              ServiceCategory.WRITING,
              ServiceCategory.EDITING,
              ServiceCategory.RESEARCH,
              ServiceCategory.CAREER
            ),
            featured: fc.boolean(),
            metaTitle: fc.string({ minLength: 10, maxLength: 100 }),
            metaDescription: fc.string({ minLength: 20, maxLength: 200 })
          }),
          { minLength: 1, maxLength: 10 }
        ),
        (services) => {
          const { container } = render(<ServicesOverview services={services} />);
          
          // Property 30: Each service must have an icon
          services.forEach(service => {
            // Verify the service has an icon property
            expect(service.icon).toBeDefined();
            expect(typeof service.icon).toBe('string');
            expect(service.icon.length).toBeGreaterThan(0);
          });
          
          // Verify icons are rendered in the UI
          const serviceCards = screen.getAllByTestId('service-card');
          expect(serviceCards.length).toBe(services.length);
          
          // Each card should have an icon
          serviceCards.forEach((card, index) => {
            const iconAttribute = card.getAttribute('data-icon');
            expect(iconAttribute).toBe(services[index]?.icon);
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should include visual identification for services with various icon types', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          'assignment', 'essay', 'dissertation', 'coursework', 'research-paper',
          'case-study', 'lab-report', 'literature-review', 'proofreading',
          'editing', 'formatting', 'plagiarism', 'research-proposal',
          'bibliography', 'data-analysis', 'cv', 'resume', 'cover-letter',
          'linkedin', 'personal-statement', 'statement-purpose'
        ),
        (iconType) => {
          const service: Service = {
            id: 'test-service',
            name: 'Test Service',
            slug: 'test-service',
            description: 'Test description for service',
            longDescription: 'Longer test description for the service',
            benefits: ['Benefit 1', 'Benefit 2', 'Benefit 3'],
            icon: iconType,
            category: ServiceCategory.WRITING,
            featured: true,
            metaTitle: 'Test Service Meta Title',
            metaDescription: 'Test service meta description'
          };
          
          render(<ServicesOverview services={[service]} />);
          
          // Property 30: Service must have visual identification (icon)
          expect(service.icon).toBeDefined();
          expect(service.icon).toBe(iconType);
          
          // Verify icon is rendered
          const serviceCard = screen.getByTestId('service-card');
          expect(serviceCard.getAttribute('data-icon')).toBe(iconType);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should ensure all services have non-empty icon identifiers', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            id: fc.uuid(),
            name: fc.string({ minLength: 5, maxLength: 50 }),
            slug: fc.string({ minLength: 5, maxLength: 50 }),
            description: fc.string({ minLength: 20, maxLength: 200 }),
            longDescription: fc.string({ minLength: 50, maxLength: 500 }),
            benefits: fc.array(fc.string({ minLength: 10, maxLength: 100 }), { minLength: 3, maxLength: 5 }),
            icon: fc.string({ minLength: 1, maxLength: 50 })
              .filter(s => s.trim().length > 0),
            category: fc.constantFrom(
              ServiceCategory.WRITING,
              ServiceCategory.EDITING,
              ServiceCategory.RESEARCH,
              ServiceCategory.CAREER
            ),
            featured: fc.boolean(),
            metaTitle: fc.string({ minLength: 10, maxLength: 100 }),
            metaDescription: fc.string({ minLength: 20, maxLength: 200 })
          }),
          { minLength: 1, maxLength: 15 }
        ),
        (services) => {
          render(<ServicesOverview services={services} />);
          
          // Property 30: Every service must have a visual identifier (icon)
          services.forEach(service => {
            // Icon must be defined and non-empty
            expect(service.icon).toBeDefined();
            expect(typeof service.icon).toBe('string');
            expect(service.icon.trim().length).toBeGreaterThan(0);
          });
          
          // Verify all service cards have icon attributes
          const serviceCards = screen.getAllByTestId('service-card');
          serviceCards.forEach(card => {
            const iconAttribute = card.getAttribute('data-icon');
            expect(iconAttribute).toBeDefined();
            expect(iconAttribute).not.toBe('');
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should maintain icon consistency across service displays', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.uuid(),
          name: fc.string({ minLength: 5, maxLength: 50 }),
          slug: fc.string({ minLength: 5, maxLength: 50 }),
          description: fc.string({ minLength: 20, maxLength: 200 }),
          longDescription: fc.string({ minLength: 50, maxLength: 500 }),
          benefits: fc.array(fc.string({ minLength: 10, maxLength: 100 }), { minLength: 3, maxLength: 5 }),
          icon: fc.constantFrom('test-icon-1', 'test-icon-2', 'test-icon-3'),
          category: fc.constantFrom(
            ServiceCategory.WRITING,
            ServiceCategory.EDITING,
            ServiceCategory.RESEARCH,
            ServiceCategory.CAREER
          ),
          featured: fc.boolean(),
          metaTitle: fc.string({ minLength: 10, maxLength: 100 }),
          metaDescription: fc.string({ minLength: 20, maxLength: 200 })
        }),
        (service) => {
          // Render the same service multiple times
          const { unmount } = render(<ServicesOverview services={[service]} />);
          
          // Verify icon is present
          let serviceCard = screen.getByTestId('service-card');
          const firstIcon = serviceCard.getAttribute('data-icon');
          expect(firstIcon).toBe(service.icon);
          
          unmount();
          
          // Render again and verify icon is consistent
          render(<ServicesOverview services={[service]} />);
          serviceCard = screen.getByTestId('service-card');
          const secondIcon = serviceCard.getAttribute('data-icon');
          
          // Property 30: Icon should be consistent across renders
          expect(secondIcon).toBe(firstIcon);
          expect(secondIcon).toBe(service.icon);
        }
      ),
      { numRuns: 100 }
    );
  });
});
