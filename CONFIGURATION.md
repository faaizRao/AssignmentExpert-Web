# Next.js Configuration Documentation

This document explains the Next.js optimization and SEO configuration for the Academics Consulate website.

## Configuration Files

### 1. next.config.ts

The Next.js configuration includes:

#### Image Optimization
- **Formats**: AVIF and WebP for modern browsers with automatic fallback
- **Device Sizes**: Optimized for various screen sizes (640px to 3840px)
- **Image Sizes**: Predefined sizes for responsive images
- **Cache TTL**: 60 seconds minimum cache time
- **SVG Support**: Enabled with security headers

#### Bundle Analyzer
- Integrated `@next/bundle-analyzer` for analyzing bundle sizes
- Run with: `npm run analyze`
- Only enabled when `ANALYZE=true` environment variable is set

#### Performance Optimizations
- **Compression**: Enabled for all responses
- **Powered-by Header**: Disabled for security
- **Static Asset Caching**: Long-term caching (1 year) for images and logo assets

### 2. app/layout.tsx

The root layout includes:

#### Font Optimization
- **Inter**: Used as the primary sans-serif font
- **Poppins**: Used for headings
- Both fonts are optimized with:
  - `display: 'swap'` for better performance
  - Automatic self-hosting by Next.js
  - CSS variables for Tailwind integration

#### Metadata Configuration
Comprehensive SEO metadata including:
- **Title Template**: Dynamic titles for all pages
- **Description**: Optimized for search engines
- **Keywords**: Relevant academic service keywords
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Twitter-specific metadata
- **Robots**: Search engine crawling instructions
- **Icons**: Favicon and app icons configuration

### 3. tailwind.config.ts

Updated to use Next.js font variables:
- `--font-inter` for sans-serif text
- `--font-poppins` for headings

## Environment Variables

### Required Variables

Add to `.env.local`:

```env
# Site URL for metadata (production)
NEXT_PUBLIC_SITE_URL=https://academicsconsulate.com

# For local development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Scripts

### Build and Analysis

```bash
# Standard build
npm run build

# Build with bundle analysis
npm run analyze
```

The bundle analyzer will open in your browser showing:
- Bundle sizes by route
- Dependency sizes
- Optimization opportunities

## Performance Features

### Image Optimization
- Automatic format conversion (AVIF/WebP)
- Responsive image generation
- Lazy loading by default
- Blur placeholders support

### Font Optimization
- Self-hosted Google Fonts
- Automatic subsetting
- Font display swap
- Zero layout shift

### Caching Strategy
- Static assets: 1 year cache
- Images: Immutable caching
- Automatic cache invalidation on updates

## SEO Features

### Metadata
- Unique titles per page (template-based)
- Descriptive meta descriptions
- Open Graph tags for social sharing
- Twitter Card support
- Proper robots directives

### Performance
- Optimized Core Web Vitals
- Fast page loads
- Efficient code splitting
- Minimal JavaScript bundles

## Requirements Validation

This configuration satisfies:
- **Requirement 11.2**: Image optimization for web delivery
- **Requirement 11.4**: JavaScript bundle size minimization through code splitting
- **Requirement 14.1**: Unique meta titles for each page
- **Requirement 14.2**: Unique meta descriptions for each page

## Next Steps

Future tasks will add:
- Sitemap generation (app/sitemap.ts)
- Robots.txt configuration (app/robots.ts)
- Structured data markup
- Additional page-specific metadata
