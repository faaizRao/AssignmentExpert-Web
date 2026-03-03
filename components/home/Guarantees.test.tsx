import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Guarantees from './Guarantees';

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

describe('Guarantees', () => {
  it('renders the section heading', () => {
    render(<Guarantees />);
    
    expect(screen.getByRole('heading', { name: /our guarantees/i })).toBeInTheDocument();
  });

  it('renders the section description', () => {
    render(<Guarantees />);
    
    expect(screen.getByText(/we stand behind our work/i)).toBeInTheDocument();
  });

  it('renders all guarantee items', () => {
    render(<Guarantees />);
    
    // Check for guarantee titles
    expect(screen.getByText('Quality Guarantee')).toBeInTheDocument();
    expect(screen.getByText('On-Time Delivery')).toBeInTheDocument();
    expect(screen.getByText('Plagiarism-Free')).toBeInTheDocument();
    expect(screen.getByText('Complete Confidentiality')).toBeInTheDocument();
    expect(screen.getByText('Free Revisions')).toBeInTheDocument();
    expect(screen.getByText('24/7 Support')).toBeInTheDocument();
  });

  it('renders guarantee descriptions', () => {
    render(<Guarantees />);
    
    expect(screen.getByText(/highest quality standards/i)).toBeInTheDocument();
    expect(screen.getByText(/respect your deadlines/i)).toBeInTheDocument();
    expect(screen.getByText(/100% original/i)).toBeInTheDocument();
    expect(screen.getByText(/privacy is our priority/i)).toBeInTheDocument();
    expect(screen.getByText(/not satisfied\? we offer free revisions/i)).toBeInTheDocument();
    expect(screen.getByText(/available around the clock/i)).toBeInTheDocument();
  });

  it('renders icons for each guarantee', () => {
    const { container } = render(<Guarantees />);
    
    // Check that SVG icons are rendered (6 icons in the guarantee containers)
    const icons = container.querySelectorAll('.bg-primary-50 svg');
    expect(icons).toHaveLength(6);
  });

  it('applies correct styling classes', () => {
    const { container } = render(<Guarantees />);
    
    // Check for main section styling
    const section = container.querySelector('section');
    expect(section).toHaveClass('py-16', 'bg-white');
  });

  it('uses responsive grid layout', () => {
    const { container } = render(<Guarantees />);
    
    // Check for responsive grid classes
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3');
  });

  it('renders icon containers with correct styling', () => {
    const { container } = render(<Guarantees />);
    
    // Check for icon containers
    const iconContainers = container.querySelectorAll('.bg-primary-50.rounded-full');
    expect(iconContainers).toHaveLength(6);
  });

  it('applies hover effects to guarantee items', () => {
    const { container } = render(<Guarantees />);
    
    // Check for hover effect classes
    const guaranteeItems = container.querySelectorAll('.hover\\:bg-neutral-50');
    expect(guaranteeItems.length).toBeGreaterThanOrEqual(6);
  });

  it('centers content in guarantee items', () => {
    const { container } = render(<Guarantees />);
    
    // Check for centered content classes
    const guaranteeItems = container.querySelectorAll('.items-center.text-center');
    expect(guaranteeItems.length).toBeGreaterThanOrEqual(6);
  });

  it('validates Requirements 1.4 - displays guarantees section', () => {
    render(<Guarantees />);
    
    // Verify the section exists and contains guarantee content
    expect(screen.getByRole('heading', { name: /our guarantees/i })).toBeInTheDocument();
    expect(screen.getByText('Quality Guarantee')).toBeInTheDocument();
  });

  it('validates Requirements 10.3 - displays service guarantees prominently', () => {
    render(<Guarantees />);
    
    // Verify key guarantees are displayed
    expect(screen.getByText('Quality Guarantee')).toBeInTheDocument();
    expect(screen.getByText('On-Time Delivery')).toBeInTheDocument();
    expect(screen.getByText('Plagiarism-Free')).toBeInTheDocument();
    expect(screen.getByText('Complete Confidentiality')).toBeInTheDocument();
  });
});
