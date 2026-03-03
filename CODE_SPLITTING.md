# Code Splitting Implementation

This document describes the code splitting optimizations implemented for the Academics Consulate website to improve performance and reduce initial bundle size.

## Overview

Code splitting has been implemented using Next.js dynamic imports to:
1. Reduce initial JavaScript bundle size
2. Load heavy components on-demand
3. Conditionally load animation libraries based on user preferences
4. Improve First Contentful Paint (FCP) and Time to Interactive (TTI)

## Implementation Details

### 1. Testimonials Component (Heavy Component)

**Location**: `app/page.tsx`

The Testimonials component includes:
- Framer Motion animations
- Carousel logic with auto-play
- Touch gesture handling
- Complex state management

**Implementation**:
```typescript
const Testimonials = dynamic(() => import('@/components/home/Testimonials'), {
  loading: () => <LoadingSkeleton />,
  ssr: true, // Still render on server for SEO
});
```

**Benefits**:
- Reduces homepage initial bundle by ~15-20KB (gzipped)
- Testimonials load after critical content is visible
- Loading skeleton provides visual feedback
- SEO maintained with SSR enabled

### 2. Animation Components (Conditional Loading)

**Location**: `components/animations/`

Three dynamic animation wrappers have been created:
- `DynamicScrollReveal.tsx`
- `DynamicFadeIn.tsx`
- `DynamicSlideIn.tsx`

**Implementation Strategy**:
These components check the user's `prefers-reduced-motion` setting:
- If user prefers reduced motion: Animation library is NOT loaded (saves ~30KB)
- If user allows motion: Animation components are dynamically imported

**Usage Example**:
```typescript
import { DynamicScrollReveal } from '@/components/animations';

<DynamicScrollReveal direction="up" delay={0.2}>
  <YourContent />
</DynamicScrollReveal>
```

**Benefits**:
- Respects user accessibility preferences
- Reduces bundle size for users who prefer reduced motion
- Improves performance on low-end devices
- Maintains animation quality for users who want it

### 3. Bundle Analysis

**Configuration**: Already set up in `next.config.ts`

**Usage**:
```bash
# Analyze production bundle with webpack (required for bundle analyzer)
npm run build -- --webpack
ANALYZE=true npm run build -- --webpack

# Or use Next.js experimental Turbopack analyzer (Next.js 16+)
npx next experimental-analyze
```

**Note**: Next.js 16+ uses Turbopack by default. The `@next/bundle-analyzer` requires webpack mode. Use `--webpack` flag or try the new experimental analyzer.

**What to Look For**:
- Total bundle size per route
- Largest dependencies (Framer Motion, React, etc.)
- Duplicate code across chunks
- Opportunities for further splitting

## Performance Impact

### Before Code Splitting
- Homepage bundle: ~180KB (estimated)
- Framer Motion loaded for all users: ~30KB
- Testimonials in main bundle: ~15KB

### After Code Splitting
- Homepage initial bundle: ~135KB (estimated)
- Framer Motion: Loaded conditionally
- Testimonials: Loaded separately after main content

### Expected Improvements
- **First Contentful Paint**: 10-15% faster
- **Time to Interactive**: 15-20% faster
- **Total Bundle Size**: 25% reduction for users with reduced motion
- **Lighthouse Performance Score**: +5-10 points

## Best Practices Applied

1. **Strategic Splitting**: Only split components that are:
   - Heavy (>10KB)
   - Below the fold
   - Not critical for initial render

2. **Loading States**: All dynamic imports include loading skeletons to prevent layout shift

3. **SSR Consideration**: 
   - Testimonials: SSR enabled for SEO
   - Animation wrappers: SSR disabled (client-side preference check)

4. **User Experience**: Loading states match the final component's layout to minimize CLS (Cumulative Layout Shift)

## Future Optimization Opportunities

1. **Route-Based Splitting**: Already automatic with Next.js App Router
2. **Library Splitting**: Consider splitting Framer Motion into smaller chunks
3. **Image Optimization**: Already implemented with Next.js Image component
4. **Font Optimization**: Already implemented with next/font

## Monitoring

To monitor the impact of code splitting:

1. **Lighthouse Audits**:
   ```bash
   npm run build
   npm run start
   # Run Lighthouse in Chrome DevTools
   ```

2. **Bundle Analysis**:
   ```bash
   npm run analyze
   ```

3. **Real User Monitoring**: Consider implementing:
   - Web Vitals tracking
   - Performance API metrics
   - Error tracking for dynamic import failures

## Rollback Plan

If code splitting causes issues:

1. **Testimonials**: Change back to static import in `app/page.tsx`
2. **Animations**: Use original components instead of Dynamic* versions
3. **Verify**: Run tests to ensure functionality is maintained

## Related Files

- `app/page.tsx` - Testimonials dynamic import
- `components/animations/Dynamic*.tsx` - Animation wrappers
- `next.config.ts` - Bundle analyzer configuration
- `package.json` - Analyze script

## References

- [Next.js Dynamic Imports](https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading)
- [Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)
- [Web Vitals](https://web.dev/vitals/)
- [Framer Motion Performance](https://www.framer.com/motion/guide-reduce-bundle-size/)
