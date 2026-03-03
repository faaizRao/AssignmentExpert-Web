/**
 * Unit tests for Homepage
 * 
 * Tests the main homepage composition and metadata configuration.
 */

import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Home, { metadata } from './page';

// Mock all child components
vi.mock('@/components/home/HeroSection', () => ({
  default: ({ title, subtitle, ctaText, ctaLink }: any) => (
    <div data-testid="hero-section">
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <a href={ctaLink}>{ctaText}</a>
    </div>
  ),
}));

vi.mock('@/components/home/ServicesOverview', () => ({
  default: ({ services }: any) => (
    <div data-testid="services-overview">
      {services.map((service: any) => (
        <div key={service.id}>{service.name}</div>
      ))}
    </div>
  ),
}));

vi.mock('@/components/home/HowItWorks', () => ({
  default: () => <div data-testid="how-it-works">How It Works</div>,
}));

vi.mock('@/components/home/Guarantees', () => ({
  default: () => <div data-testid="guarantees">Guarantees</div>,
}));

vi.mock('@/components/home/Testimonials', () => ({
  default: ({ testimonials }: any) => (
    <div data-testid="testimonials">
      {testimonials.map((testimonial: any) => (
        <div key={testimonial.id}>{testimonial.name}</div>
      ))}
    </div>
  ),
}));

vi.mock('@/components/home/FreeFeatures', () => ({
  default: () => <div data-testid="free-features">Free Features</div>,
}));

vi.mock('@/components/home/SubjectAreas', () => ({
  default: () => <div data-testid="subject-areas">Subject Areas</div>,
}));

vi.mock('@/lib/services/serviceData', () => ({
  getFeaturedServices: () => [
    {
      id: 'assignment-writing',
      name: 'Assignment Writing',
      slug: 'assignment-writing',
      description: 'Professional assignment writing services',
      featured: true,
    },
    {
      id: 'dissertation-writing',
      name: 'Dissertation Writing',
      slug: 'dissertation-writing',
      description: 'Expert dissertation writing help',
      featured: true,
    },
  ],
}));

describe('Homepage', () => {
  it('renders all homepage sections', () => {
    render(<Home />);

    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('services-overview')).toBeInTheDocument();
    expect(screen.getByTestId('how-it-works')).toBeInTheDocument();
    expect(screen.getByTestId('guarantees')).toBeInTheDocument();
    expect(screen.getByTestId('testimonials')).toBeInTheDocument();
    expect(screen.getByTestId('free-features')).toBeInTheDocument();
    expect(screen.getByTestId('subject-areas')).toBeInTheDocument();
  });

  it('renders hero section with correct props', () => {
    render(<Home />);

    expect(screen.getByText('Expert Academic Services for Your Success')).toBeInTheDocument();
    expect(screen.getByText(/Professional writing, editing, and research assistance/)).toBeInTheDocument();
    expect(screen.getByText('Get Started')).toBeInTheDocument();
  });

  it('renders featured services', () => {
    render(<Home />);

    expect(screen.getByText('Assignment Writing')).toBeInTheDocument();
    expect(screen.getByText('Dissertation Writing')).toBeInTheDocument();
  });

  it('renders testimonials', () => {
    render(<Home />);

    expect(screen.getByText('Sarah M.')).toBeInTheDocument();
    expect(screen.getByText('James K.')).toBeInTheDocument();
    expect(screen.getByText('Emily R.')).toBeInTheDocument();
    expect(screen.getByText('Michael T.')).toBeInTheDocument();
  });

  describe('Metadata', () => {
    it('has correct title', () => {
      expect(metadata.title).toBe('Professional Academic Writing Services');
    });

    it('has descriptive meta description', () => {
      expect(metadata.description).toContain('expert help');
      expect(metadata.description).toContain('assignments');
      expect(metadata.description).toContain('dissertations');
    });

    it('has relevant keywords', () => {
      expect(metadata.keywords).toContain('academic writing services');
      expect(metadata.keywords).toContain('assignment help');
      expect(metadata.keywords).toContain('dissertation writing');
    });

    it('has Open Graph metadata', () => {
      expect(metadata.openGraph).toBeDefined();
      expect(metadata.openGraph?.title).toContain('Professional Academic Writing Services');
      expect(metadata.openGraph?.description).toContain('expert help');
      expect(metadata.openGraph?.url).toBe('/');
      expect(metadata.openGraph?.type).toBe('website');
    });

    it('has Twitter Card metadata', () => {
      expect(metadata.twitter).toBeDefined();
      expect(metadata.twitter?.card).toBe('summary_large_image');
      expect(metadata.twitter?.title).toContain('Professional Academic Writing Services');
      expect(metadata.twitter?.description).toContain('expert help');
    });
  });
});
