'use client';

import ScrollReveal from '@/components/animations/ScrollReveal';

interface Guarantee {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function Guarantees() {
  const guarantees: Guarantee[] = [
    {
      id: 'quality',
      title: 'Quality Guarantee',
      description: 'We ensure the highest quality standards in all our work. Every project is thoroughly reviewed and meets academic excellence criteria.',
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
    {
      id: 'on-time',
      title: 'On-Time Delivery',
      description: 'We respect your deadlines. Your work will be delivered on or before the agreed deadline, giving you time for review.',
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 'plagiarism-free',
      title: 'Plagiarism-Free',
      description: 'All work is 100% original and written from scratch. We provide plagiarism reports to guarantee authenticity.',
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      id: 'confidentiality',
      title: 'Complete Confidentiality',
      description: 'Your privacy is our priority. All personal information and project details are kept strictly confidential and secure.',
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
    {
      id: 'revisions',
      title: 'Free Revisions',
      description: 'Not satisfied? We offer free revisions to ensure the final work meets your expectations and requirements.',
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
    },
    {
      id: 'support',
      title: '24/7 Support',
      description: 'Our customer support team is available around the clock to answer your questions and address any concerns.',
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section 
      className="py-16 px-4 sm:px-6 lg:px-8 bg-white"
      aria-labelledby="guarantees-heading"
    >
      <div className="max-w-7xl mx-auto">
        <ScrollReveal direction="up" delay={0}>
          <div className="text-center mb-12">
            <h2 id="guarantees-heading" className="text-4xl md:text-5xl font-heading font-bold text-neutral-900 mb-4">
              Our Guarantees
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              We stand behind our work with solid commitments to quality, reliability, and customer satisfaction.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
          {guarantees.map((guarantee, index) => (
            <ScrollReveal
              key={guarantee.id}
              direction="up"
              delay={0.1 * (index % 3)}
            >
              <article className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-neutral-50 transition-colors duration-200" role="listitem">
                {/* Icon container */}
                <div className="w-16 h-16 mb-4 text-primary-500 bg-primary-50 rounded-full flex items-center justify-center p-4" aria-hidden="true">
                  {guarantee.icon}
                </div>

                {/* Guarantee title */}
                <h3 className="text-xl font-heading font-semibold text-neutral-800 mb-3">
                  {guarantee.title}
                </h3>

                {/* Guarantee description */}
                <p className="text-base text-neutral-600 leading-relaxed">
                  {guarantee.description}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
