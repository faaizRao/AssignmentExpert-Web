import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HowItWorks from './HowItWorks';

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

describe('HowItWorks', () => {
  it('renders the section heading', () => {
    render(<HowItWorks />);
    
    expect(screen.getByRole('heading', { name: /how it works/i })).toBeInTheDocument();
  });

  it('renders the section description', () => {
    render(<HowItWorks />);
    
    expect(screen.getByText(/getting started is easy/i)).toBeInTheDocument();
  });

  it('renders all three steps', () => {
    render(<HowItWorks />);
    
    // Check for step titles
    expect(screen.getByText('Submit Your Request')).toBeInTheDocument();
    expect(screen.getByText('Get a Quote')).toBeInTheDocument();
    expect(screen.getByText('Receive Quality Work')).toBeInTheDocument();
  });

  it('renders step numbers', () => {
    render(<HowItWorks />);
    
    // Check for step numbers (they appear as text content)
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders step descriptions', () => {
    render(<HowItWorks />);
    
    expect(screen.getByText(/fill out our simple form/i)).toBeInTheDocument();
    expect(screen.getByText(/our team reviews your requirements/i)).toBeInTheDocument();
    expect(screen.getByText(/once approved, our expert team/i)).toBeInTheDocument();
  });

  it('renders icons for each step', () => {
    const { container } = render(<HowItWorks />);
    
    // Check that SVG icons are rendered (3 icons in the step containers)
    const icons = container.querySelectorAll('.bg-primary-50 svg');
    expect(icons).toHaveLength(3);
  });

  it('applies correct styling classes', () => {
    const { container } = render(<HowItWorks />);
    
    // Check for main section styling
    const section = container.querySelector('section');
    expect(section).toHaveClass('py-16', 'bg-white');
  });

  it('uses responsive grid layout', () => {
    const { container } = render(<HowItWorks />);
    
    // Check for responsive grid classes
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-3');
  });

  it('renders step number badges with correct styling', () => {
    const { container } = render(<HowItWorks />);
    
    // Check for step number badges
    const badges = container.querySelectorAll('.bg-primary-500.text-white.rounded-full');
    expect(badges.length).toBeGreaterThanOrEqual(3);
  });

  it('renders icon containers with correct styling', () => {
    const { container } = render(<HowItWorks />);
    
    // Check for icon containers
    const iconContainers = container.querySelectorAll('.bg-primary-50.rounded-full');
    expect(iconContainers).toHaveLength(3);
  });
});
