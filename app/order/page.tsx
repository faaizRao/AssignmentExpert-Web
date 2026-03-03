import type { Metadata } from 'next';
import OrderPageClient from './OrderPageClient';

// Page-specific metadata for SEO
export const metadata: Metadata = {
  title: 'Place an Order',
  description: 'Place your order for academic services with Academics Consulate. Submit your project requirements and we\'ll get started on your assignment, dissertation, or coursework immediately.',
  keywords: ['place order', 'order academic services', 'submit assignment', 'order dissertation', 'academic help order', 'coursework order', 'assignment help'],
  openGraph: {
    title: 'Place an Order | Academics Consulate',
    description: 'Place your order for academic services. Submit your requirements and we\'ll get started on your project immediately.',
    url: '/order',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Place an Order | Academics Consulate',
    description: 'Place your order for academic services. Submit your requirements and we\'ll get started immediately.',
  },
};

export default function OrderPage() {
  return <OrderPageClient />;
}
