/**
 * Unit Tests for Service Data Catalog
 * 
 * Tests the service catalog data and helper functions to ensure
 * they meet the requirements for the Academics Consulate website.
 */

import { describe, it, expect } from 'vitest';
import {
  services,
  getServiceBySlug,
  getAllServices,
  getServicesByCategory,
  getFeaturedServices,
  getCategoriesWithCounts
} from './serviceData';
import { ServiceCategory } from '@/types/services';

describe('Service Data Catalog', () => {
  describe('Service Catalog Requirements', () => {
    it('should have at least 20 services', () => {
      // Requirement 2.1: The Website SHALL provide at least 20 distinct Service_Page instances
      expect(services.length).toBeGreaterThanOrEqual(20);
    });

    it('should include services from all categories', () => {
      // Requirement 2.4: Include services for writing, editing, research, and career
      const categories = new Set(services.map(s => s.category));
      
      expect(categories.has(ServiceCategory.WRITING)).toBe(true);
      expect(categories.has(ServiceCategory.EDITING)).toBe(true);
      expect(categories.has(ServiceCategory.RESEARCH)).toBe(true);
      expect(categories.has(ServiceCategory.CAREER)).toBe(true);
    });

    it('should include required service types', () => {
      // Requirement 2.4: Include assignments, dissertations, coursework, proofreading, CV/resume writing
      const serviceNames = services.map(s => s.name.toLowerCase());
      
      expect(serviceNames.some(name => name.includes('assignment'))).toBe(true);
      expect(serviceNames.some(name => name.includes('dissertation'))).toBe(true);
      expect(serviceNames.some(name => name.includes('coursework'))).toBe(true);
      expect(serviceNames.some(name => name.includes('proofreading'))).toBe(true);
      expect(serviceNames.some(name => name.includes('cv') || name.includes('resume'))).toBe(true);
    });

    it('should have unique service IDs', () => {
      const ids = services.map(s => s.id);
      const uniqueIds = new Set(ids);
      
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have unique service slugs', () => {
      const slugs = services.map(s => s.slug);
      const uniqueSlugs = new Set(slugs);
      
      expect(uniqueSlugs.size).toBe(slugs.length);
    });

    it('should have all required fields for each service', () => {
      services.forEach(service => {
        // Requirement 2.2: Display service name, description, and benefits
        expect(service.id).toBeTruthy();
        expect(service.name).toBeTruthy();
        expect(service.slug).toBeTruthy();
        expect(service.description).toBeTruthy();
        expect(service.longDescription).toBeTruthy();
        expect(service.benefits).toBeTruthy();
        expect(service.benefits.length).toBeGreaterThan(0);
        expect(service.icon).toBeTruthy();
        expect(service.category).toBeTruthy();
        expect(typeof service.featured).toBe('boolean');
        expect(service.metaTitle).toBeTruthy();
        expect(service.metaDescription).toBeTruthy();
      });
    });
  });

  describe('getServiceBySlug', () => {
    it('should return a service when given a valid slug', () => {
      const service = getServiceBySlug('assignment-writing');
      
      expect(service).toBeDefined();
      expect(service?.slug).toBe('assignment-writing');
      expect(service?.name).toBe('Assignment Writing');
    });

    it('should return undefined for non-existent slug', () => {
      const service = getServiceBySlug('non-existent-service');
      
      expect(service).toBeUndefined();
    });

    it('should be case-sensitive', () => {
      const service = getServiceBySlug('Assignment-Writing');
      
      expect(service).toBeUndefined();
    });
  });

  describe('getAllServices', () => {
    it('should return all services', () => {
      const allServices = getAllServices();
      
      expect(allServices).toEqual(services);
      expect(allServices.length).toBe(services.length);
    });

    it('should return an array', () => {
      const allServices = getAllServices();
      
      expect(Array.isArray(allServices)).toBe(true);
    });
  });

  describe('getServicesByCategory', () => {
    it('should return only writing services', () => {
      const writingServices = getServicesByCategory(ServiceCategory.WRITING);
      
      expect(writingServices.length).toBeGreaterThan(0);
      writingServices.forEach(service => {
        expect(service.category).toBe(ServiceCategory.WRITING);
      });
    });

    it('should return only editing services', () => {
      const editingServices = getServicesByCategory(ServiceCategory.EDITING);
      
      expect(editingServices.length).toBeGreaterThan(0);
      editingServices.forEach(service => {
        expect(service.category).toBe(ServiceCategory.EDITING);
      });
    });

    it('should return only research services', () => {
      const researchServices = getServicesByCategory(ServiceCategory.RESEARCH);
      
      expect(researchServices.length).toBeGreaterThan(0);
      researchServices.forEach(service => {
        expect(service.category).toBe(ServiceCategory.RESEARCH);
      });
    });

    it('should return only career services', () => {
      const careerServices = getServicesByCategory(ServiceCategory.CAREER);
      
      expect(careerServices.length).toBeGreaterThan(0);
      careerServices.forEach(service => {
        expect(service.category).toBe(ServiceCategory.CAREER);
      });
    });

    it('should return empty array for invalid category', () => {
      const invalidServices = getServicesByCategory('invalid' as ServiceCategory);
      
      expect(invalidServices).toEqual([]);
    });
  });

  describe('getFeaturedServices', () => {
    it('should return only featured services', () => {
      const featuredServices = getFeaturedServices();
      
      expect(featuredServices.length).toBeGreaterThan(0);
      featuredServices.forEach(service => {
        expect(service.featured).toBe(true);
      });
    });

    it('should include key services', () => {
      const featuredServices = getFeaturedServices();
      const featuredNames = featuredServices.map(s => s.name);
      
      // Key services should be featured
      expect(featuredNames).toContain('Assignment Writing');
      expect(featuredNames).toContain('Dissertation Writing');
      expect(featuredNames).toContain('Proofreading');
    });
  });

  describe('getCategoriesWithCounts', () => {
    it('should return all categories with counts', () => {
      const categoriesWithCounts = getCategoriesWithCounts();
      
      expect(categoriesWithCounts.length).toBe(4);
      
      const categories = categoriesWithCounts.map(c => c.category);
      expect(categories).toContain(ServiceCategory.WRITING);
      expect(categories).toContain(ServiceCategory.EDITING);
      expect(categories).toContain(ServiceCategory.RESEARCH);
      expect(categories).toContain(ServiceCategory.CAREER);
    });

    it('should have correct counts for each category', () => {
      const categoriesWithCounts = getCategoriesWithCounts();
      
      categoriesWithCounts.forEach(({ category, count }) => {
        const actualCount = services.filter(s => s.category === category).length;
        expect(count).toBe(actualCount);
        expect(count).toBeGreaterThan(0);
      });
    });

    it('should sum to total number of services', () => {
      const categoriesWithCounts = getCategoriesWithCounts();
      const totalCount = categoriesWithCounts.reduce((sum, { count }) => sum + count, 0);
      
      expect(totalCount).toBe(services.length);
    });
  });

  describe('Service Data Quality', () => {
    it('should have proper description lengths', () => {
      services.forEach(service => {
        // Short description: 100-200 characters
        expect(service.description.length).toBeGreaterThanOrEqual(100);
        expect(service.description.length).toBeLessThanOrEqual(200);
        
        // Long description: 490-2000 characters (allowing slight flexibility)
        expect(service.longDescription.length).toBeGreaterThanOrEqual(490);
        expect(service.longDescription.length).toBeLessThanOrEqual(2000);
      });
    });

    it('should have proper SEO metadata lengths', () => {
      services.forEach(service => {
        // Meta title: should be reasonable length for SEO
        expect(service.metaTitle.length).toBeGreaterThan(0);
        expect(service.metaTitle.length).toBeLessThanOrEqual(60);
        
        // Meta description: should be reasonable length for SEO
        expect(service.metaDescription.length).toBeGreaterThanOrEqual(50);
        expect(service.metaDescription.length).toBeLessThanOrEqual(160);
      });
    });

    it('should have URL-safe slugs', () => {
      services.forEach(service => {
        // Slug should be kebab-case (lowercase, hyphens, no spaces)
        expect(service.slug).toMatch(/^[a-z0-9-]+$/);
        expect(service.slug).not.toContain(' ');
        expect(service.slug).not.toContain('_');
      });
    });

    it('should have meaningful benefits', () => {
      services.forEach(service => {
        expect(service.benefits.length).toBeGreaterThanOrEqual(3);
        expect(service.benefits.length).toBeLessThanOrEqual(10);
        
        service.benefits.forEach(benefit => {
          expect(benefit.length).toBeGreaterThan(10);
          expect(benefit.trim()).toBe(benefit);
        });
      });
    });
  });

  describe('Category Distribution', () => {
    it('should have balanced distribution across categories', () => {
      const categoriesWithCounts = getCategoriesWithCounts();
      
      // Each category should have at least 3 services
      categoriesWithCounts.forEach(({ category, count }) => {
        expect(count).toBeGreaterThanOrEqual(3);
      });
    });

    it('should have writing as the largest category', () => {
      const categoriesWithCounts = getCategoriesWithCounts();
      const writingCategory = categoriesWithCounts.find(c => c.category === ServiceCategory.WRITING);
      
      expect(writingCategory).toBeDefined();
      expect(writingCategory!.count).toBeGreaterThanOrEqual(8);
    });
  });
});
