'use client';

import ScrollReveal from '@/components/animations/ScrollReveal';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function FreeFeatures() {
  const features: Feature[] = [
    {
      id: 'plagiarism-report',
      title: 'Free Plagiarism Report',
      description: 'Every project includes a comprehensive plagiarism report to verify 100% originality and authenticity.',
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 'bibliography',
      title: 'Free Bibliography',
      description: 'Properly formatted bibliography and reference list included at no extra cost, following your required citation style.',
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      id: 'formatting',
      title: 'Free Formatting',
      description: 'Professional formatting according to your specified style guide (APA, MLA, Harvard, Chicago, etc.) included free.',
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      ),
    },
    {
      id: 'revisions',
      title: 'Free Revisions',
      description: 'Unlimited revisions within the scope of your original requirements to ensure complete satisfaction.',
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
    },
    {
      id: 'title-page',
      title: 'Free Title Page',
      description: 'Professionally designed title page formatted according to your academic institution\'s requirements.',
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'outline',
      title: 'Free Outline',
      description: 'Detailed outline of your project structure to help you understand the flow and organization of your work.',
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
  ];

  return (
    <section 
      className="py-16 px-4 sm:px-6 lg:px-8 bg-neutral-50"
      aria-labelledby="free-features-heading"
    >
      <div className="max-w-7xl mx-auto">
        <ScrollReveal direction="up" delay={0}>
          <div className="text-center mb-12">
            <h2 id="free-features-heading" className="text-4xl md:text-5xl font-heading font-bold text-neutral-900 mb-4">
              Free Features Included
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Every service comes with these valuable extras at no additional cost, ensuring you get the best value for your investment.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
          {features.map((feature, index) => (
            <ScrollReveal
              key={feature.id}
              direction="up"
              delay={0.1 * (index % 3)}
            >
              <article className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200" role="listitem">
                {/* Icon container */}
                <div className="w-16 h-16 mb-4 text-secondary-500 bg-secondary-50 rounded-full flex items-center justify-center p-4" aria-hidden="true">
                  {feature.icon}
                </div>

                {/* Feature title */}
                <h3 className="text-xl font-heading font-semibold text-neutral-800 mb-3">
                  {feature.title}
                </h3>

                {/* Feature description */}
                <p className="text-base text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
