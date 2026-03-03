import { MetadataRoute } from 'next';
import { getAllServices } from '@/lib/services/serviceData';

/**
 * Sitemap Generator
 * 
 * Generates a dynamic sitemap for the Academics Consulate website
 * including all static pages and dynamic service pages.
 * 
 * Requirements: 14.4 - SEO Optimization
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://academicsconsulate.com';
  
  // Get all services for dynamic service pages
  const services = getAllServices();
  
  // Static pages with their priorities and change frequencies
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/quote`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/order`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
  
  // Dynamic service pages
  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));
  
  // Combine all pages
  return [...staticPages, ...servicePages];
}
