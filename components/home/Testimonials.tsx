'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import ScrollReveal from '@/components/animations/ScrollReveal';

interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
  autoPlayInterval?: number;
}

export default function Testimonials({
  testimonials,
  autoPlayInterval = 5000,
}: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      goToNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isPaused, autoPlayInterval, goToNext, testimonials.length]);

  // Touch handlers for swipe gestures
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    if (e.targetTouches[0]) {
      setTouchStart(e.targetTouches[0].clientX);
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.targetTouches[0]) {
      setTouchEnd(e.targetTouches[0].clientX);
    }
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  // Render star rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1" aria-label={`Rating: ${rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-neutral-300'
            }`}
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section 
      className="py-16 px-4 sm:px-6 lg:px-8 bg-neutral-50"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto">
        <ScrollReveal direction="up" delay={0}>
          <div className="text-center mb-12">
            <h2 id="testimonials-heading" className="text-4xl md:text-5xl font-heading font-bold text-neutral-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied clients have to say about our services.
            </p>
          </div>
        </ScrollReveal>

        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          role="region"
          aria-label="Customer testimonials carousel"
          aria-live="polite"
        >
          {/* Testimonial carousel */}
          <div className="relative overflow-hidden min-h-[300px] flex items-center">
            <AnimatePresence mode="wait">
              {testimonials[currentIndex] && (
                <motion.div
                  key={currentIndex}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <div className="bg-white rounded-lg shadow-soft p-8 md:p-12">
                    {/* Rating */}
                    <div className="flex justify-center mb-6">
                      {renderStars(testimonials[currentIndex].rating)}
                  </div>

                  {/* Testimonial text */}
                  <blockquote className="text-lg md:text-xl text-neutral-700 text-center mb-6 leading-relaxed">
                    <span className="sr-only">Customer testimonial:</span>
                    "{testimonials[currentIndex].text}"
                  </blockquote>

                  {/* Customer name and date */}
                  <footer className="text-center">
                    <cite className="font-heading font-semibold text-neutral-900 text-lg not-italic">
                      {testimonials[currentIndex].name}
                    </cite>
                    <p className="text-sm text-neutral-500 mt-1">
                      <time dateTime={testimonials[currentIndex].date}>
                        {new Date(testimonials[currentIndex].date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                        })}
                      </time>
                    </p>
                  </footer>
                </div>
              </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation arrows */}
          {testimonials.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white rounded-full p-3 shadow-soft hover:shadow-hover transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                aria-label="Previous testimonial"
              >
                <svg
                  className="w-6 h-6 text-neutral-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white rounded-full p-3 shadow-soft hover:shadow-hover transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                aria-label="Next testimonial"
              >
                <svg
                  className="w-6 h-6 text-neutral-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Pagination dots */}
          {testimonials.length > 1 && (
            <nav 
              className="flex justify-center gap-2 mt-8"
              aria-label="Testimonial navigation"
            >
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                    index === currentIndex
                      ? 'bg-primary-500 w-8'
                      : 'bg-neutral-300 hover:bg-neutral-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1} of ${testimonials.length}`}
                  aria-current={index === currentIndex ? 'true' : 'false'}
                />
              ))}
            </nav>
          )}
        </div>
      </div>
    </section>
  );
}
