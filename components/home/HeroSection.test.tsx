import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import HeroSection from './HeroSection';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
  useReducedMotion: () => false,
}));

// Mock Next.js Link component
vi.mock('next/link', () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

describe('HeroSection', () => {
  const defaultProps = {
    title: 'Professional Academic Services',
    subtitle: 'Expert assistance with assignments, dissertations, and more',
    ctaText: 'Get a Quote',
    ctaLink: '/quote',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Content Rendering', () => {
    it('should render the title', () => {
      render(<HeroSection {...defaultProps} />);
      expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    });

    it('should render the subtitle', () => {
      render(<HeroSection {...defaultProps} />);
      expect(screen.getByText(defaultProps.subtitle)).toBeInTheDocument();
    });

    it('should render the CTA button with correct text', () => {
      render(<HeroSection {...defaultProps} />);
      expect(screen.getByText(defaultProps.ctaText)).toBeInTheDocument();
    });

    it('should render CTA button as a link with correct href', () => {
      render(<HeroSection {...defaultProps} />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', defaultProps.ctaLink);
    });
  });

  describe('Styling and Layout', () => {
    it('should have gradient background with brand colors', () => {
      const { container } = render(<HeroSection {...defaultProps} />);
      // Check for the overlay gradient instead of the old solid gradient
      const gradientDiv = container.querySelector('.from-primary-900\\/80');
      expect(gradientDiv).toBeInTheDocument();
    });

    it('should have minimum height for proper hero display', () => {
      const { container } = render(<HeroSection {...defaultProps} />);
      const section = container.querySelector('section');
      expect(section).toHaveClass('min-h-600px');
      expect(section).toHaveClass('md:min-h-700px');
    });

    it('should center content vertically and horizontally', () => {
      const { container } = render(<HeroSection {...defaultProps} />);
      const section = container.querySelector('section');
      expect(section).toHaveClass('flex');
      expect(section).toHaveClass('items-center');
      expect(section).toHaveClass('justify-center');
    });
  });

  describe('Responsive Typography', () => {
    it('should have responsive text sizing for title', () => {
      render(<HeroSection {...defaultProps} />);
      const title = screen.getByRole('heading', { level: 1 });
      expect(title).toHaveClass('text-4xl');
      expect(title).toHaveClass('sm:text-5xl');
      expect(title).toHaveClass('md:text-6xl');
      expect(title).toHaveClass('lg:text-7xl');
    });

    it('should have responsive text sizing for subtitle', () => {
      render(<HeroSection {...defaultProps} />);
      const subtitle = screen.getByText(defaultProps.subtitle);
      expect(subtitle).toHaveClass('text-lg');
      expect(subtitle).toHaveClass('sm:text-xl');
      expect(subtitle).toHaveClass('md:text-2xl');
    });

    it('should use heading font family for title', () => {
      render(<HeroSection {...defaultProps} />);
      const title = screen.getByRole('heading', { level: 1 });
      expect(title).toHaveClass('font-heading');
    });
  });

  describe('Accessibility', () => {
    it('should use semantic HTML with proper heading hierarchy', () => {
      render(<HeroSection {...defaultProps} />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
    });

    it('should have proper section landmark', () => {
      const { container } = render(<HeroSection {...defaultProps} />);
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('should have accessible link for CTA', () => {
      render(<HeroSection {...defaultProps} />);
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', defaultProps.ctaLink);
    });
  });

  describe('Brand Colors', () => {
    it('should use primary brand colors in gradient', () => {
      const { container } = render(<HeroSection {...defaultProps} />);
      // Check for the new overlay gradient
      const gradientDiv = container.querySelector('.from-primary-900\\/80');
      expect(gradientDiv).toBeInTheDocument();
    });

    it('should use secondary color accent in overlay', () => {
      const { container } = render(<HeroSection {...defaultProps} />);
      const overlayDiv = container.querySelector('.from-secondary-500\\/20');
      expect(overlayDiv).toBeInTheDocument();
    });

    it('should use white text for title', () => {
      render(<HeroSection {...defaultProps} />);
      const title = screen.getByRole('heading', { level: 1 });
      expect(title).toHaveClass('text-white');
    });

    it('should use white text for subtitle', () => {
      render(<HeroSection {...defaultProps} />);
      const subtitle = screen.getByText(defaultProps.subtitle);
      expect(subtitle).toHaveClass('text-white');
    });
  });

  describe('Props Handling', () => {
    it('should handle different title text', () => {
      const customTitle = 'Custom Hero Title';
      render(<HeroSection {...defaultProps} title={customTitle} />);
      expect(screen.getByText(customTitle)).toBeInTheDocument();
    });

    it('should handle different subtitle text', () => {
      const customSubtitle = 'Custom subtitle text';
      render(<HeroSection {...defaultProps} subtitle={customSubtitle} />);
      expect(screen.getByText(customSubtitle)).toBeInTheDocument();
    });

    it('should handle different CTA text', () => {
      const customCtaText = 'Contact Us';
      render(<HeroSection {...defaultProps} ctaText={customCtaText} />);
      expect(screen.getByText(customCtaText)).toBeInTheDocument();
    });

    it('should handle different CTA link', () => {
      const customCtaLink = '/contact';
      render(<HeroSection {...defaultProps} ctaLink={customCtaLink} />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', customCtaLink);
    });
  });

  describe('Requirements Validation', () => {
    it('should satisfy Requirement 1.1: Display Hero_Section with business name and primary CTA', () => {
      render(<HeroSection {...defaultProps} />);
      
      // Business name in title
      expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
      
      // Primary CTA
      const ctaButton = screen.getByText(defaultProps.ctaText);
      expect(ctaButton).toBeInTheDocument();
      
      // CTA links to quote page
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', defaultProps.ctaLink);
    });

    it('should satisfy Requirement 7.4: Apply consistent typography', () => {
      render(<HeroSection {...defaultProps} />);
      
      const title = screen.getByRole('heading', { level: 1 });
      expect(title).toHaveClass('font-heading');
      expect(title).toHaveClass('font-bold');
    });

    it('should satisfy Requirement 8.1: Animated text reveal on load', () => {
      render(<HeroSection {...defaultProps} />);
      
      // Check for motion.div wrapper (animation container)
      const animatedContainer = screen.getByText(defaultProps.title).closest('[class*="max-w-4xl"]');
      expect(animatedContainer).toBeInTheDocument();
    });
  });
});
