'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getAllServices, getServicesByCategory } from '@/lib/services/serviceData';
import { ServiceCategory } from '@/types/services';
import Card from '@/components/ui/Card';
import ScrollReveal from '@/components/animations/ScrollReveal';

export default function ServicesPageClient() {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');
  
  const allServices = getAllServices();
  const displayedServices = selectedCategory === 'all' 
    ? allServices 
    : getServicesByCategory(selectedCategory);

  const categories = [
    { value: 'all', label: 'All Services', count: allServices.length },
    { value: ServiceCategory.WRITING, label: 'Writing', count: getServicesByCategory(ServiceCategory.WRITING).length },
    { value: ServiceCategory.EDITING, label: 'Editing', count: getServicesByCategory(ServiceCategory.EDITING).length },
    { value: ServiceCategory.RESEARCH, label: 'Research', count: getServicesByCategory(ServiceCategory.RESEARCH).length },
    { value: ServiceCategory.CAREER, label: 'Career', count: getServicesByCategory(ServiceCategory.CAREER).length },
  ];

  return (
    <main className="min-h-screen ">
      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden" aria-labelledby="services-page-heading">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/service.jpg"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={85}
          />
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-800/85 to-primary-700/80" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <ScrollReveal direction="up" delay={0}>
            <h1 id="services-page-heading" className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-4 drop-shadow-lg">
              Our Services
            </h1>
            <p className="text-lg md:text-xl text-white max-w-3xl mx-auto drop-shadow-md">
              Comprehensive academic services to support your educational journey. 
              From writing and editing to research and career development.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-b border-neutral-200" aria-label="Service category filter">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up" delay={0.1}>
            <nav aria-label="Filter services by category">
              <div className="flex flex-wrap gap-3 justify-center" role="group">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value as ServiceCategory | 'all')}
                    className={`px-6 py-2.5 rounded-full font-medium transition-all duration-200 ${
                      selectedCategory === category.value
                        ? 'bg-primary-500 text-white shadow-md'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                    aria-pressed={selectedCategory === category.value}
                    aria-label={`Filter by ${category.label}, ${category.count} services available`}
                  >
                    {category.label} ({category.count})
                  </button>
                ))}
              </div>
            </nav>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" aria-label="Available services">
        <div className="max-w-7xl mx-auto">
          {displayedServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
              {displayedServices.map((service, index) => (
                <ScrollReveal
                  key={service.id}
                  direction="up"
                  delay={0.1 * (index % 3)}
                >
                  <div role="listitem">
                    <Card
                      title={service.name}
                      description={service.description}
                      link={`/services/${service.slug}`}
                      hoverEffect={true}
                    />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-12" role="status">
              <p className="text-lg text-neutral-600">
                No services found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white" aria-labelledby="cta-heading">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal direction="up" delay={0}>
            <h2 id="cta-heading" className="text-3xl md:text-4xl font-heading font-bold text-neutral-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-neutral-600 mb-8">
              Request a free quote or place an order for any of our services. 
              Our expert team is ready to help you succeed.
            </p>
            <nav aria-label="Call to action">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/quote"
                  className="inline-block px-8 py-3 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors duration-200"
                  aria-label="Request a free quote for academic services"
                >
                  Request a Quote
                </a>
                <a
                  href="/order"
                  className="inline-block px-8 py-3 bg-white text-primary-500 font-medium rounded-lg border-2 border-primary-500 hover:bg-primary-50 transition-colors duration-200"
                  aria-label="Place an order for academic services"
                >
                  Place an Order
                </a>
              </div>
            </nav>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
