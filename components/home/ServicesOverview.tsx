'use client';

import { Service } from '@/types/services';
import Card from '@/components/ui/Card';
import ScrollReveal from '@/components/animations/ScrollReveal';

interface ServicesOverviewProps {
  services: Service[];
}

export default function ServicesOverview({ services }: ServicesOverviewProps) {
  return (
    <section 
      className="py-16 px-4 sm:px-6 lg:px-8 bg-neutral-50"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto">
        <ScrollReveal direction="up" delay={0}>
          <div className="text-center mb-12">
            <h2 id="services-heading" className="text-4xl md:text-5xl font-heading font-bold text-neutral-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Professional academic services tailored to your needs. From writing to editing, we've got you covered.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
          {services.map((service, index) => (
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
      </div>
    </section>
  );
}
