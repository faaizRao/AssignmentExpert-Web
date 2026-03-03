'use client';

import Image from 'next/image';

interface ServicesHeroSectionProps {
  title: string;
  subtitle: string;
}

export default function ServicesHeroSection({
  title,
  subtitle,
}: ServicesHeroSectionProps) {
  return (
    <section 
      className="relative min-h-400px md:min-h-500px flex items-center justify-center overflow-hidden"
      aria-labelledby="services-hero-title"
    >
      {/* Background image */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/service.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/85 via-primary-800/80 to-primary-700/75" />
      </div>
      
      {/* Content container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            id="services-hero-title"
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-white mb-4 leading-tight"
          >
            {title}
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-white max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
