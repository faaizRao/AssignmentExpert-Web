'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export default function HeroSection({
  title,
  subtitle,
  ctaText,
  ctaLink,
}: HeroSectionProps) {
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: prefersReducedMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.2,
        delayChildren: prefersReducedMotion ? 0 : 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
      y: prefersReducedMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  const backgroundStyle = mounted ? {
    backgroundImage: 'url(/degrees.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#1e3a8a'
  } : {
    backgroundColor: '#1e3a8a'
  };

  return (
    <section
      className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden"
      style={backgroundStyle}
      aria-labelledby="hero-title"
    >
      
      {/* Dark overlay */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary-900/80 via-primary-800/70 to-primary-900/80" aria-hidden="true" />

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-secondary-500/20 via-transparent to-primary-500/20" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {mounted ? (
          <motion.div
            className="max-w-4xl mx-auto text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >

            {/* Title */}
            <motion.h1
              id="hero-title"
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg"
            >
              {title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl text-gray-100 mb-10 max-w-2xl mx-auto drop-shadow-md"
            >
              {subtitle}
            </motion.p>

            {/* Button */}
            <motion.div variants={itemVariants}>
              <Link href={ctaLink}>
                <Button
                  variant="secondary"
                  size="lg"
                  className="text-black text-lg px-8 py-4 shadow-lg"
                >
                  {ctaText}
                </Button>
              </Link>
            </motion.div>

          </motion.div>
        ) : (
          <div className="max-w-4xl mx-auto text-center">
            {/* Title */}
            <h1
              id="hero-title"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg"
            >
              {title}
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-100 mb-10 max-w-2xl mx-auto drop-shadow-md">
              {subtitle}
            </p>

            {/* Button */}
            <div>
              <Link href={ctaLink}>
                <Button
                  variant="secondary"
                  size="lg"
                  className="text-black text-lg px-8 py-4 shadow-lg"
                >
                  {ctaText}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

    </section>
  );
}