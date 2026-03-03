import type { Metadata } from 'next';
import QuoteForm from '@/components/forms/QuoteForm';

// Page-specific metadata for SEO
export const metadata: Metadata = {
  title: 'Request a Quote',
  description: 'Get a free, no-obligation quote for your academic project. Tell us about your requirements and we\'ll provide a detailed price estimate within 24 hours.',
  keywords: ['quote request', 'academic services quote', 'pricing estimate', 'free quote', 'assignment quote', 'dissertation quote', 'academic help pricing'],
  openGraph: {
    title: 'Request a Quote | Academics Consulate',
    description: 'Get a free, no-obligation quote for your academic project. We\'ll respond within 24 hours with a detailed price estimate.',
    url: '/quote',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Request a Quote | Academics Consulate',
    description: 'Get a free, no-obligation quote for your academic project. We\'ll respond within 24 hours.',
  },
};

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
            Request a Free Quote
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Tell us about your academic project and we'll provide a detailed, no-obligation quote within 24 hours. 
            All quotes are completely free and there's no commitment required.
          </p>
        </header>

        {/* Quote Form */}
        <section className="bg-white rounded-2xl shadow-lg p-8 sm:p-12" aria-labelledby="quote-form-heading">
          <h2 id="quote-form-heading" className="sr-only">Quote request form</h2>
          <QuoteForm />
        </section>

        {/* Additional Information */}
        <footer className="mt-8 text-center text-sm text-neutral-500">
          <p>
            Need help right away? Contact us directly at{' '}
            <a href="mailto:info@academicsconsulate.com" className="text-primary-600 hover:text-primary-700 underline">
              info@academicsconsulate.com
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
