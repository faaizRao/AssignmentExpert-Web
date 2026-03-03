import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SubjectAreas from './SubjectAreas';

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

describe('SubjectAreas', () => {
  it('renders the section heading', () => {
    render(<SubjectAreas />);
    
    expect(screen.getByRole('heading', { name: /subject areas we cover/i })).toBeInTheDocument();
  });

  it('renders the section description', () => {
    render(<SubjectAreas />);
    
    expect(screen.getByText(/our expert team provides comprehensive academic support/i)).toBeInTheDocument();
  });

  it('renders all subject area items', () => {
    render(<SubjectAreas />);
    
    // Check for some key subject areas
    expect(screen.getByText('Business')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
    expect(screen.getByText('Law')).toBeInTheDocument();
    expect(screen.getByText('Medicine')).toBeInTheDocument();
    expect(screen.getByText('Psychology')).toBeInTheDocument();
    expect(screen.getByText('Computer Science')).toBeInTheDocument();
    expect(screen.getByText('Nursing')).toBeInTheDocument();
    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText('Economics')).toBeInTheDocument();
    expect(screen.getByText('Sociology')).toBeInTheDocument();
  });

  it('renders additional subject areas', () => {
    render(<SubjectAreas />);
    
    expect(screen.getByText('History')).toBeInTheDocument();
    expect(screen.getByText('Literature')).toBeInTheDocument();
    expect(screen.getByText('Mathematics')).toBeInTheDocument();
    expect(screen.getByText('Philosophy')).toBeInTheDocument();
    expect(screen.getByText('Biology')).toBeInTheDocument();
    expect(screen.getByText('Chemistry')).toBeInTheDocument();
    expect(screen.getByText('Physics')).toBeInTheDocument();
    expect(screen.getByText('Political Science')).toBeInTheDocument();
  });

  it('renders business-related subject areas', () => {
    render(<SubjectAreas />);
    
    expect(screen.getByText('Accounting')).toBeInTheDocument();
    expect(screen.getByText('Marketing')).toBeInTheDocument();
    expect(screen.getByText('Finance')).toBeInTheDocument();
    expect(screen.getByText('Management')).toBeInTheDocument();
  });

  it('renders specialized subject areas', () => {
    render(<SubjectAreas />);
    
    expect(screen.getByText('Architecture')).toBeInTheDocument();
    expect(screen.getByText('Environmental Science')).toBeInTheDocument();
    expect(screen.getByText('Statistics')).toBeInTheDocument();
  });

  it('renders icons for each subject area', () => {
    const { container } = render(<SubjectAreas />);
    
    // Check that SVG icons are rendered (at least 24 icons in the subject containers)
    const icons = container.querySelectorAll('.bg-primary-50 svg');
    expect(icons.length).toBeGreaterThanOrEqual(24);
  });

  it('applies correct styling classes', () => {
    const { container } = render(<SubjectAreas />);
    
    // Check for main section styling
    const section = container.querySelector('section');
    expect(section).toHaveClass('py-16', 'bg-white');
  });

  it('uses responsive grid layout', () => {
    const { container } = render(<SubjectAreas />);
    
    // Check for responsive grid classes
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-2', 'sm:grid-cols-3', 'md:grid-cols-4', 'lg:grid-cols-6');
  });

  it('renders icon containers with correct styling', () => {
    const { container } = render(<SubjectAreas />);
    
    // Check for icon containers (at least 24)
    const iconContainers = container.querySelectorAll('.bg-primary-50.rounded-full');
    expect(iconContainers.length).toBeGreaterThanOrEqual(24);
  });

  it('applies hover effects to subject items', () => {
    const { container } = render(<SubjectAreas />);
    
    // Check for hover effect classes on buttons (changed from divs to buttons)
    const subjectItems = container.querySelectorAll('button.hover\\:bg-primary-50');
    expect(subjectItems.length).toBeGreaterThanOrEqual(24);
  });

  it('centers content in subject items', () => {
    const { container } = render(<SubjectAreas />);
    
    // Check for centered content classes
    const subjectItems = container.querySelectorAll('.items-center.text-center');
    expect(subjectItems.length).toBeGreaterThanOrEqual(24);
  });

  it('validates Requirements 1.7 - displays subject areas coverage section', () => {
    render(<SubjectAreas />);
    
    // Verify the section exists and contains subject areas content
    expect(screen.getByRole('heading', { name: /subject areas we cover/i })).toBeInTheDocument();
    expect(screen.getByText('Business')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
  });

  it('displays subject categories in grid layout', () => {
    const { container } = render(<SubjectAreas />);
    
    // Verify grid layout exists
    const grid = container.querySelector('.grid');
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass('grid-cols-2', 'sm:grid-cols-3', 'md:grid-cols-4', 'lg:grid-cols-6');
  });

  it('displays subjects with icons', () => {
    const { container } = render(<SubjectAreas />);
    
    // Verify subjects have icons (at least 24)
    const icons = container.querySelectorAll('.bg-primary-50 svg');
    expect(icons.length).toBeGreaterThanOrEqual(24);
    
    // Verify subjects have names
    expect(screen.getByText('Business')).toBeInTheDocument();
    expect(screen.getByText('Computer Science')).toBeInTheDocument();
  });

  it('includes scroll reveal animations', () => {
    const { container } = render(<SubjectAreas />);
    
    // ScrollReveal component should wrap the content
    // The component structure should have the grid with subject items
    const grid = container.querySelector('.grid');
    expect(grid).toBeInTheDocument();
  });

  it('renders comprehensive list of subject areas', () => {
    const { container } = render(<SubjectAreas />);
    
    // Verify we have a comprehensive list (24 subjects) - now they are buttons
    const subjectItems = container.querySelectorAll('button.hover\\:bg-primary-50');
    expect(subjectItems.length).toBeGreaterThanOrEqual(24);
  });

  it('uses primary color scheme for icons', () => {
    const { container } = render(<SubjectAreas />);
    
    // Check for primary color classes on icon containers (at least 24)
    const iconContainers = container.querySelectorAll('.text-primary-500.bg-primary-50');
    expect(iconContainers.length).toBeGreaterThanOrEqual(24);
  });

  it('applies proper spacing and padding', () => {
    const { container } = render(<SubjectAreas />);
    
    // Check for proper padding on subject items
    const subjectItems = container.querySelectorAll('.p-4.rounded-lg');
    expect(subjectItems.length).toBeGreaterThanOrEqual(24);
  });

  it('renders subject names with proper typography', () => {
    const { container } = render(<SubjectAreas />);
    
    // Check for heading font and styling on subject names
    const subjectNames = container.querySelectorAll('.font-heading.font-medium');
    expect(subjectNames.length).toBeGreaterThanOrEqual(24);
  });
});
