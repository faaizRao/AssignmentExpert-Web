# Caching Configuration

This document describes the caching strategy implemented for the Academics Consulate website to optimize performance and reduce server load.

## Overview

The caching configuration follows Next.js best practices and implements a multi-layered approach:

1. **Static Asset Caching** - Long-term caching for immutable assets
2. **Service Data Revalidation** - Periodic revalidation for semi-static content
3. **API Route Configuration** - No caching for dynamic form submissions

## Static Asset Caching

Configured in `next.config.ts` using the `headers()` function.

### Image Assets (1 year cache)
- `/images/:path*` - All images in the images directory
- `/assignmentlogo.jpeg` - Main logo
- `/assignmenticon.png` - Favicon icon
- **Cache-Control**: `public, max-age=31536000, immutable`

### Next.js Static Assets (1 year cache)
- `/_next/static/:path*` - JavaScript, CSS, and other static assets
- **Cache-Control**: `public, max-age=31536000, immutable`
- These files have content hashes in their names, making them safe to cache indefinitely

### Font Files (1 year cache)
- `/fonts/:path*` - Custom font files
- **Cache-Control**: `public, max-age=31536000, immutable`

### Metadata Files (1 day cache)
- `favicon.ico`, `site.webmanifest`, `robots.txt`
- **Cache-Control**: `public, max-age=86400, must-revalidate`
- Shorter cache time allows for updates while still reducing server load

## Service Data Revalidation

Service pages use Incremental Static Regeneration (ISR) to balance performance with data freshness.

### Configuration
- **Revalidation Period**: 3600 seconds (1 hour)
- **Applied to**:
  - `/app/services/page.tsx` - Services overview page
  - `/app/services/[slug]/page.tsx` - Individual service pages

### Rationale
Service catalog data rarely changes, making it ideal for caching. The 1-hour revalidation ensures:
- Fast page loads from cached static pages
- Automatic updates when service data changes
- Reduced server load for frequently accessed pages

### Implementation
```typescript
export const revalidate = 3600; // Revalidate every hour
```

## API Route Configuration

API routes for form submissions are configured to never cache responses.

### Configuration
- **Dynamic Rendering**: `force-dynamic`
- **Revalidation**: 0 (no caching)
- **Applied to**:
  - `/app/api/quote/route.ts` - Quote form submissions
  - `/app/api/order/route.ts` - Order form submissions

### Rationale
Form submissions must always be processed fresh to:
- Ensure real-time email delivery
- Prevent duplicate submissions from cached responses
- Maintain accurate submission timestamps
- Avoid stale validation errors

### Implementation
```typescript
export const dynamic = 'force-dynamic';
export const revalidate = 0;
```

## Cache Duration Reference

| Asset Type | Cache Duration | Rationale |
|------------|---------------|-----------|
| Images | 1 year | Immutable, content-addressed |
| JS/CSS bundles | 1 year | Content-hashed filenames |
| Fonts | 1 year | Rarely change |
| Favicon/Manifest | 1 day | Allow updates, reduce load |
| Service pages | 1 hour | Balance freshness and performance |
| API routes | No cache | Always fresh, dynamic content |

## Performance Impact

### Expected Benefits
1. **Reduced Server Load**: Static assets served from browser/CDN cache
2. **Faster Page Loads**: Cached assets load instantly
3. **Lower Bandwidth**: Fewer requests to origin server
4. **Better User Experience**: Near-instant page navigation

### Monitoring
Monitor these metrics to verify caching effectiveness:
- Cache hit ratio (should be >80% for static assets)
- Time to First Byte (TTFB) for cached vs uncached requests
- Server load and bandwidth usage
- Lighthouse performance scores

## Cache Invalidation

### Automatic Invalidation
- **Static assets**: New deployments generate new content hashes
- **Service pages**: Revalidate automatically every hour
- **API routes**: Never cached, always fresh

### Manual Invalidation
If immediate updates are needed:
1. Deploy new version (invalidates static assets)
2. Wait up to 1 hour for service page revalidation
3. Or trigger manual revalidation via Next.js API (if implemented)

## Browser Compatibility

All cache headers are compatible with:
- Chrome/Edge (Chromium)
- Firefox
- Safari
- Mobile browsers

The `immutable` directive is supported by all modern browsers and safely ignored by older browsers.

## Requirements Validation

This configuration satisfies **Requirement 11.1**:
> "THE Website SHALL achieve a First Contentful Paint within 1.5 seconds on 3G connections"

By implementing aggressive caching for static assets and smart revalidation for service data, we significantly reduce load times and improve performance metrics.
