'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import FadeIn only when animations are enabled
const FadeIn = dynamic(() => import('./FadeIn'), {
  loading: () => <div>{/* Render children immediately while loading */}</div>,
  ssr: false, // Client-side only to check motion preferences
});

interface DynamicFadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}

/**
 * DynamicFadeIn - Conditionally loads FadeIn component
 * Only loads the animation library if user hasn't set prefers-reduced-motion
 * This reduces bundle size for users who prefer reduced motion
 */
export default function DynamicFadeIn({
  children,
  delay = 0,
  duration = 0.5,
}: DynamicFadeInProps) {
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

  // Load and use FadeIn component
  return (
    <FadeIn delay={delay} duration={duration}>
      {children}
    </FadeIn>
  );
}
