import type { Metadata } from 'next';
import ServicesPageClient from './ServicesPageClient';

// Revalidate service data every hour (3600 seconds)
// Service catalog rarely changes, so we can cache it
export const revalidate = 3600;

// Page-specific metadata for SEO
export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Explore our comprehensive range of academic services including writing, editing, research, and career development. Professional support for all your academic needs.',
  keywords: ['academic services', 'writing services', 'editing services', 'research services', 'career services', 'assignment help', 'dissertation writing', 'proofreading', 'CV writing'],
  openGraph: {
    title: 'Our Services | Academics Consulate',
    description: 'Explore our comprehensive range of academic services including writing, editing, research, and career development.',
    url: '/services',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Services | Academics Consulate',
    description: 'Explore our comprehensive range of academic services including writing, editing, research, and career development.',
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
