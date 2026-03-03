/**
 * Service Data Interfaces
 * 
 * Type definitions for service catalog and service-related data structures.
 * These interfaces define the shape of academic service information.
 */

/**
 * Service Category Enum
 * 
 * Categories for organizing academic services.
 */
export enum ServiceCategory {
  WRITING = 'writing',
  EDITING = 'editing',
  RESEARCH = 'research',
  CAREER = 'career'
}

/**
 * Service Information
 * 
 * Complete data structure for an academic service offering.
 * Used throughout the application to display service information.
 */
export interface Service {
  /** Unique identifier (kebab-case) */
  id: string;
  
  /** Display name of the service */
  name: string;
  
  /** URL-friendly identifier for routing */
  slug: string;
  
  /** Short description (100-200 characters) */
  description: string;
  
  /** Detailed description (500-2000 characters) */
  longDescription: string;
  
  /** List of key benefits */
  benefits: string[];
  
  /** Icon identifier or path */
  icon: string;
  
  /** Service category */
  category: ServiceCategory;
  
  /** Display on homepage flag */
  featured: boolean;
  
  /** SEO title for meta tags */
  metaTitle: string;
  
  /** SEO description for meta tags */
  metaDescription: string;
}
