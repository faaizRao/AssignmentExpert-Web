import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import HeroSection from '@/components/home/HeroSection';
import ServicesOverview from '@/components/home/ServicesOverview';
import HowItWorks from '@/components/home/HowItWorks';
import Guarantees from '@/components/home/Guarantees';
import FreeFeatures from '@/components/home/FreeFeatures';
import SubjectAreas from '@/components/home/SubjectAreas';
import { getFeaturedServices } from '@/lib/services/serviceData';

// Code-split heavy Testimonials component with carousel logic
const Testimonials = dynamic(() => import('@/components/home/Testimonials'), {
  loading: () => (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="h-12 bg-neutral-200 rounded w-64 mx-auto mb-4 animate-pulse" />
          <div className="h-6 bg-neutral-200 rounded w-96 mx-auto animate-pulse" />
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-soft p-8 md:p-12 min-h-300px animate-pulse">
            <div className="h-6 bg-neutral-200 rounded w-32 mx-auto mb-6" />
            <div className="space-y-3 mb-6">
              <div className="h-4 bg-neutral-200 rounded" />
              <div className="h-4 bg-neutral-200 rounded" />
              <div className="h-4 bg-neutral-200 rounded w-3/4 mx-auto" />
            </div>
            <div className="h-6 bg-neutral-200 rounded w-24 mx-auto" />
          </div>
        </div>
      </div>
    </div>
  ),
  ssr: true,
});

// Page-specific metadata for SEO
export const metadata: Metadata = {
  title: 'Professional Academic Writing Services',
  description: 'Get expert help with assignments, dissertations, coursework, proofreading, and CV writing. Professional academic services with guaranteed quality, on-time delivery, and 24/7 support.',
  keywords: ['academic writing services', 'assignment help', 'dissertation writing', 'coursework assistance', 'proofreading services', 'CV writing', 'academic support'],
  openGraph: {
    title: 'Professional Academic Writing Services | Academics Consulate',
    description: 'Get expert help with assignments, dissertations, coursework, proofreading, and CV writing. Professional academic services with guaranteed quality.',
    url: '/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Academic Writing Services | Academics Consulate',
    description: 'Get expert help with assignments, dissertations, coursework, proofreading, and CV writing.',
  },
};

// Sample testimonials data
const testimonials = [
  {
    id: '1',
    name: 'Sarah M.',
    rating: 5,
    text: 'Excellent service! My dissertation was completed ahead of schedule and exceeded my expectations. The writer was professional and responsive to all my requirements.',
    date: '2024-01-15',
  },
  {
    id: '2',
    name: 'James K.',
    rating: 5,
    text: 'I was struggling with my assignment and the team at Academics Consulate saved me. High-quality work, delivered on time, and great communication throughout.',
    date: '2024-01-10',
  },
  {
    id: '3',
    name: 'Emily R.',
    rating: 5,
    text: 'Professional proofreading service that caught errors I completely missed. My paper improved significantly and I received excellent feedback from my professor.',
    date: '2024-01-05',
  },
  {
    id: '4',
    name: 'Michael T.',
    rating: 5,
    text: 'Outstanding coursework help! The writer demonstrated deep subject knowledge and delivered a well-researched, properly formatted paper. Highly recommend!',
    date: '2023-12-28',
  },
];

export default function Home() {
  const featuredServices = getFeaturedServices();

  return (
    <>
      <HeroSection
        title="Expert Academic Services for Your Success"
        subtitle="Professional writing, editing, and research assistance from qualified experts. Get the academic support you need to excel in your studies."
        ctaText="Get Started"
        ctaLink="/quote"
      />
      <ServicesOverview services={featuredServices} />
      <HowItWorks />
      <Guarantees />
      <Testimonials testimonials={testimonials} />
      <FreeFeatures />
      <SubjectAreas />
    </>
  );
}
