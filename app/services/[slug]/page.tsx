import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getServiceBySlug, getAllServices } from '@/lib/services/serviceData';
import { Service } from '@/types/services';
import ScrollReveal from '@/components/animations/ScrollReveal';
import Button from '@/components/ui/Button';

// Revalidate service data every hour (3600 seconds)
// Service catalog rarely changes, so we can cache it
export const revalidate = 3600;

// Generate static params for all service pages
export async function generateStaticParams() {
  const services = getAllServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

// Generate dynamic metadata for each service page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);
  
  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: [service.name, service.category, 'academic services', 'professional help'],
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `/services/${service.slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: service.metaTitle,
      description: service.metaDescription,
    },
  };
}

// Service structured data schema
function generateServiceSchema(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Academics Consulate',
    },
    areaServed: 'Worldwide',
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `https://academicsconsulate.com/services/${service.slug}`,
    },
    category: service.category,
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);

  // Return 404 if service not found
  if (!service) {
    notFound();
  }

  return (
    <>
      {/* Service structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateServiceSchema(service)) }}
      />

      <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20" aria-labelledby="service-title">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto text-center">
                <h1 id="service-title" className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
                  {service.name}
                </h1>
                <p className="text-xl md:text-2xl text-primary-100 mb-8">
                  {service.description}
                </p>
                <Link href={`/order?service=${encodeURIComponent(service.name)}`} aria-label={`Order ${service.name} service`}>
                  <Button variant="secondary" size="lg">
                    Order This Service
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Service Details Section */}
        <section className="py-16" aria-labelledby="service-details-heading">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal direction="up" delay={0.2}>
                <article className="bg-white rounded-lg shadow-soft p-8 md:p-12 mb-12">
                  <h2 id="service-details-heading" className="text-3xl md:text-4xl font-heading font-bold text-neutral-900 mb-6">
                    About This Service
                  </h2>
                  <p className="text-lg text-neutral-700 leading-relaxed whitespace-pre-line">
                    {service.longDescription}
                  </p>
                </article>
              </ScrollReveal>

              {/* Benefits Section */}
              <ScrollReveal direction="up" delay={0.3}>
                <section className="bg-white rounded-lg shadow-soft p-8 md:p-12 mb-12" aria-labelledby="benefits-heading">
                  <h2 id="benefits-heading" className="text-3xl md:text-4xl font-heading font-bold text-neutral-900 mb-8">
                    Key Benefits
                  </h2>
                  <ul className="space-y-4" role="list">
                    {service.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="w-6 h-6 text-primary-600 mr-3 mt-1 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-lg text-neutral-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </ScrollReveal>

              {/* CTA Section */}
              <ScrollReveal direction="up" delay={0.4}>
                <aside className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg shadow-hover p-8 md:p-12 text-center text-white" aria-labelledby="cta-heading">
                  <h2 id="cta-heading" className="text-3xl md:text-4xl font-heading font-bold mb-4">
                    Ready to Get Started?
                  </h2>
                  <p className="text-xl text-primary-100 mb-8">
                    Place your order now and let our experts help you achieve academic excellence.
                  </p>
                  <nav aria-label="Service actions">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link href={`/order?service=${encodeURIComponent(service.name)}`} aria-label={`Order ${service.name} now`}>
                        <Button variant="secondary" size="lg">
                          Order Now
                        </Button>
                      </Link>
                      <Link href="/quote" aria-label="Request a quote for this service">
                        <Button variant="outline" size="lg" className="bg-white/10 hover:bg-white/20 text-white border-white">
                          Request a Quote
                        </Button>
                      </Link>
                    </div>
                  </nav>
                </aside>
              </ScrollReveal>

              {/* Back to Services Link */}
              <nav className="mt-12 text-center" aria-label="Breadcrumb">
                <Link
                  href="/services"
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors"
                  aria-label="Return to all services"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back to All Services
                </Link>
              </nav>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
