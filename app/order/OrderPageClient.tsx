'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import OrderForm from '@/components/forms/OrderForm';

function OrderPageContent() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get('service');

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
            Place Your Order
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Ready to get started? Fill out the form below with your project details and we'll begin working on your assignment right away. 
            We'll contact you shortly to confirm details and discuss payment options.
          </p>
        </header>

        {/* Order Form */}
        <section className="bg-white rounded-2xl shadow-lg p-8 sm:p-12" aria-labelledby="order-form-heading">
          <h2 id="order-form-heading" className="sr-only">Order placement form</h2>
          <OrderForm {...(preselectedService ? { preselectedService } : {})} />
        </section>

        {/* Additional Information */}
        <footer className="mt-8 text-center text-sm text-neutral-500">
          <p>
            Have questions? Contact us at{' '}
            <a href="mailto:info@academicsconsulate.com" className="text-primary-600 hover:text-primary-700 underline">
              info@academicsconsulate.com
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default function OrderPageClient() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
              Place Your Order
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Loading...
            </p>
          </div>
        </div>
      </div>
    }>
      <OrderPageContent />
    </Suspense>
  );
}
