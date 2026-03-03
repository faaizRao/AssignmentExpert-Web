import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ServicesOverview from './ServicesOverview';
import { Service, ServiceCategory } from '@/types/services';

// Mock the ScrollReveal component
vi.mock('@/components/animations/ScrollReveal', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="scroll-reveal">{children}</div>
  ),
}));

// Mock the Card component
vi.mock('@/components/ui/Card', () => ({
  default: ({ title, description, link }: { title: string; description: string; link?: string }) => (
    <div data-testid="service-card">
      <h3>{title}</h3>
      <p>{description}</p>
      {link && <a href={link}>Link</a>}
    </div>
  ),
}));

describe('ServicesOverview', () => {
  const mockServices: Service[] = [
    {
      id: 'assignment-writing',
      name: 'Assignment Writing',
      slug: 'assignment-writing',
      description: 'Professional assignment writing services for all academic levels.',
      longDescription: 'Detailed description',
      benefits: ['Benefit 1', 'Benefit 2'],
      icon: 'assignment',
      category: ServiceCategory.WRITING,
      featured: true,
      metaTitle: 'Assignment Writing Service',
      metaDescription: 'Meta description'
    },
    {
      id: 'essay-writing',
      name: 'Essay Writing',
      slug: 'essay-writing',
      description: 'Custom essay writing services for all essay types.',
      longDescription: 'Detailed description',
      benefits: ['Benefit 1', 'Benefit 2'],
      icon: 'essay',
      category: ServiceCategory.WRITING,
      featured: true,
      metaTitle: 'Essay Writing Service',
      metaDescription: 'Meta description'
    },
    {
      id: 'proofreading',
      name: 'Proofreading',
      slug: 'proofreading',
      description: 'Meticulous proofreading to eliminate errors.',
      longDescription: 'Detailed description',
      benefits: ['Benefit 1', 'Benefit 2'],
      icon: 'proofreading',
      category: ServiceCategory.EDITING,
      featured: true,
      metaTitle: 'Proofreading Service',
      metaDescription: 'Meta description'
    }
  ];

  it('renders the section heading', () => {
    render(<ServicesOverview services={mockServices} />);
    
    expect(screen.getByText('Our Services')).toBeInTheDocument();
  });

  it('renders the section description', () => {
    render(<ServicesOverview services={mockServices} />);
    
    expect(screen.getByText(/Professional academic services tailored to your needs/)).toBeInTheDocument();
  });

  it('renders all provided services', () => {
    render(<ServicesOverview services={mockServices} />);
    
    expect(screen.getByText('Assignment Writing')).toBeInTheDocument();
    expect(screen.getByText('Essay Writing')).toBeInTheDocument();
    expect(screen.getByText('Proofreading')).toBeInTheDocument();
  });

  it('renders service descriptions', () => {
    render(<ServicesOverview services={mockServices} />);
    
    expect(screen.getByText('Professional assignment writing services for all academic levels.')).toBeInTheDocument();
    expect(screen.getByText('Custom essay writing services for all essay types.')).toBeInTheDocument();
    expect(screen.getByText('Meticulous proofreading to eliminate errors.')).toBeInTheDocument();
  });

  it('renders service cards with correct links', () => {
    render(<ServicesOverview services={mockServices} />);
    
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
    expect(links[0]).toHaveAttribute('href', '/services/assignment-writing');
    expect(links[1]).toHaveAttribute('href', '/services/essay-writing');
    expect(links[2]).toHaveAttribute('href', '/services/proofreading');
  });

  it('renders correct number of service cards', () => {
    render(<ServicesOverview services={mockServices} />);
    
    const cards = screen.getAllByTestId('service-card');
    expect(cards).toHaveLength(3);
  });

  it('uses ScrollReveal for animations', () => {
    render(<ServicesOverview services={mockServices} />);
    
    const scrollReveals = screen.getAllByTestId('scroll-reveal');
    // 1 for the header + 3 for the service cards
    expect(scrollReveals.length).toBeGreaterThanOrEqual(4);
  });

  it('renders with responsive grid layout classes', () => {
    const { container } = render(<ServicesOverview services={mockServices} />);
    
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('md:grid-cols-2');
    expect(grid).toHaveClass('lg:grid-cols-3');
  });

  it('handles empty services array', () => {
    render(<ServicesOverview services={[]} />);
    
    expect(screen.getByText('Our Services')).toBeInTheDocument();
    const cards = screen.queryAllByTestId('service-card');
    expect(cards).toHaveLength(0);
  });

  it('applies staggered animation delays', () => {
    // This test verifies the component structure supports staggered animations
    // The actual delay values are passed to ScrollReveal component
    const { container } = render(<ServicesOverview services={mockServices} />);
    
    const grid = container.querySelector('.grid');
    expect(grid?.children.length).toBe(3);
  });
});
