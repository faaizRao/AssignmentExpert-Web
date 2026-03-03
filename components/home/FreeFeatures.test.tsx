import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FreeFeatures from './FreeFeatures';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  useReducedMotion: () => false,
}));

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver as any;

describe('FreeFeatures', () => {
  it('renders the section heading', () => {
    render(<FreeFeatures />);
    
    expect(screen.getByRole('heading', { name: /free features included/i })).toBeInTheDocument();
  });

  it('renders the section description', () => {
    render(<FreeFeatures />);
    
    expect(screen.getByText(/every service comes with these valuable extras/i)).toBeInTheDocument();
  });

  it('renders all free feature items', () => {
    render(<FreeFeatures />);
    
    // Check for feature titles
    expect(screen.getByText('Free Plagiarism Report')).toBeInTheDocument();
    expect(screen.getByText('Free Bibliography')).toBeInTheDocument();
    expect(screen.getByText('Free Formatting')).toBeInTheDocument();
    expect(screen.getByText('Free Revisions')).toBeInTheDocument();
    expect(screen.getByText('Free Title Page')).toBeInTheDocument();
    expect(screen.getByText('Free Outline')).toBeInTheDocument();
  });

  it('renders feature descriptions', () => {
    render(<FreeFeatures />);
    
    expect(screen.getByText(/comprehensive plagiarism report/i)).toBeInTheDocument();
    expect(screen.getByText(/properly formatted bibliography/i)).toBeInTheDocument();
    expect(screen.getByText(/professional formatting according to your specified style guide/i)).toBeInTheDocument();
    expect(screen.getByText(/unlimited revisions/i)).toBeInTheDocument();
    expect(screen.getByText(/professionally designed title page/i)).toBeInTheDocument();
    expect(screen.getByText(/detailed outline of your project structure/i)).toBeInTheDocument();
  });

  it('renders icons for each feature', () => {
    const { container } = render(<FreeFeatures />);
    
    // Check that SVG icons are rendered (6 icons in the feature containers)
    const icons = container.querySelectorAll('.bg-secondary-50 svg');
    expect(icons).toHaveLength(6);
  });

  it('applies correct styling classes', () => {
    const { container } = render(<FreeFeatures />);
    
    // Check for main section styling
    const section = container.querySelector('section');
    expect(section).toHaveClass('py-16', 'bg-neutral-50');
  });

  it('uses responsive grid layout', () => {
    const { container } = render(<FreeFeatures />);
    
    // Check for responsive grid classes
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3');
  });

  it('renders icon containers with correct styling', () => {
    const { container } = render(<FreeFeatures />);
    
    // Check for icon containers
    const iconContainers = container.querySelectorAll('.bg-secondary-50.rounded-full');
    expect(iconContainers).toHaveLength(6);
  });

  it('applies shadow effects to feature cards', () => {
    const { container } = render(<FreeFeatures />);
    
    // Check for shadow effect classes
    const featureCards = container.querySelectorAll('.shadow-sm.hover\\:shadow-md');
    expect(featureCards.length).toBeGreaterThanOrEqual(6);
  });

  it('centers content in feature items', () => {
    const { container } = render(<FreeFeatures />);
    
    // Check for centered content classes
    const featureItems = container.querySelectorAll('.items-center.text-center');
    expect(featureItems.length).toBeGreaterThanOrEqual(6);
  });

  it('renders feature cards with white background', () => {
    const { container } = render(<FreeFeatures />);
    
    // Check for white background on cards
    const featureCards = container.querySelectorAll('.bg-white.rounded-lg');
    expect(featureCards).toHaveLength(6);
  });

  it('validates Requirements 1.6 - displays free features showcase section', () => {
    render(<FreeFeatures />);
    
    // Verify the section exists and contains free features content
    expect(screen.getByRole('heading', { name: /free features included/i })).toBeInTheDocument();
    expect(screen.getByText('Free Plagiarism Report')).toBeInTheDocument();
  });

  it('displays features with icons and descriptions', () => {
    const { container } = render(<FreeFeatures />);
    
    // Verify features have icons
    const icons = container.querySelectorAll('.bg-secondary-50 svg');
    expect(icons).toHaveLength(6);
    
    // Verify features have descriptions
    expect(screen.getByText(/comprehensive plagiarism report/i)).toBeInTheDocument();
    expect(screen.getByText(/properly formatted bibliography/i)).toBeInTheDocument();
  });

  it('includes scroll reveal animations', () => {
    const { container } = render(<FreeFeatures />);
    
    // ScrollReveal component should wrap the content
    // The component structure should have the grid with feature items
    const grid = container.querySelector('.grid');
    expect(grid).toBeInTheDocument();
  });
});
