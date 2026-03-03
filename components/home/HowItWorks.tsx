'use client';

import ScrollReveal from '@/components/animations/ScrollReveal';

interface Step {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function HowItWorks() {
  const steps: Step[] = [
    {
      number: 1,
      title: 'Submit Your Request',
      description: 'Fill out our simple form with your project details, requirements, and deadline. The more information you provide, the better we can assist you.',
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      number: 2,
      title: 'Get a Quote',
      description: 'Our team reviews your requirements and provides a detailed quote within 24 hours. We ensure transparent pricing with no hidden fees.',
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
    {
      number: 3,
      title: 'Receive Quality Work',
      description: 'Once approved, our expert team gets to work. We deliver high-quality, original work on time, with revisions included to ensure your satisfaction.',
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section 
      className="py-16 px-4 sm:px-6 lg:px-8 bg-white"
      aria-labelledby="how-it-works-heading"
    >
      <div className="max-w-7xl mx-auto">
        <ScrollReveal direction="up" delay={0}>
          <div className="text-center mb-12">
            <h2 id="how-it-works-heading" className="text-4xl md:text-5xl font-heading font-bold text-neutral-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Getting started is easy. Follow these three simple steps to receive professional academic assistance.
            </p>
          </div>
        </ScrollReveal>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8" role="list">
          {steps.map((step, index) => (
            <ScrollReveal
              key={step.number}
              direction="up"
              delay={0.1 * index}
            >
              <li className="relative flex flex-col items-center text-center">
                {/* Step number badge */}
                <div 
                  className="absolute -top-4 -left-4 md:static md:mb-4 w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-heading font-bold text-xl shadow-lg z-10"
                  aria-label={`Step ${step.number}`}
                >
                  {step.number}
                </div>

                {/* Icon container */}
                <div className="w-20 h-20 mb-6 text-primary-500 bg-primary-50 rounded-full flex items-center justify-center p-4" aria-hidden="true">
                  {step.icon}
                </div>

                {/* Step title */}
                <h3 className="text-2xl font-heading font-semibold text-neutral-800 mb-3">
                  {step.title}
                </h3>

                {/* Step description */}
                <p className="text-base text-neutral-600 leading-relaxed">
                  {step.description}
                </p>

                {/* Connector arrow (hidden on mobile and last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 -right-4 lg:-right-8 w-8 lg:w-16 text-primary-300" aria-hidden="true">
                    <svg className="w-full h-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                )}
              </li>
            </ScrollReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
