'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import SlideIn only when animations are enabled
const SlideIn = dynamic(() => import('./SlideIn'), {
  loading: () => <div>{/* Render children immediately while loading */}</div>,
  ssr: false, // Client-side only to check motion preferences
});

interface DynamicSlideInProps {
  children: React.ReactNode;
  direction: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  duration?: number;
}

/**
 * DynamicSlideIn - Conditionally loads SlideIn component
 * Only loads the animation library if user hasn't set prefers-reduced-motion
 * This reduces bundle size for users who prefer reduced motion
 */
export default function DynamicSlideIn({
  children,
  direction,
  delay = 0,
  duration = 0.5,
}: DynamicSlideInProps) {
  const [shouldAnimate, setShouldAnimate] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldAnimate(!mediaQuery.matches);

    // Listen for changes in motion preference
    const handleChange = (e: MediaQueryListEvent) => {
      setShouldAnimate(!e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // While checking preference, render children without wrapper
  if (shouldAnimate === null) {
    return <>{children}</>;
  }

  // If user prefers reduced motion, don't load animation component
  if (!shouldAnimate) {
    return <>{children}</>;
  }

  // Load and use SlideIn component
  return (
    <SlideIn direction={direction} delay={delay} duration={duration}>
      {children}
    </SlideIn>
  );
}
