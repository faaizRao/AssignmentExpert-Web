import { MetadataRoute } from 'next';

/**
 * Robots.txt Generator
 * 
 * Generates robots.txt file with crawl rules for search engines.
 * Allows all pages except API routes and references the sitemap.
 * 
 * Requirements: 14.4 - SEO Optimization
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: 'https://academicsconsulate.com/sitemap.xml',
  };
}
