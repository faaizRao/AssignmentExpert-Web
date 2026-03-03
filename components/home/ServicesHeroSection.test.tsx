import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ServicesHeroSection from './ServicesHeroSection';

describe('ServicesHeroSection', () => {
  const defaultProps = {
    title: 'Our Services',
    subtitle: 'Professional academic services for students',
  };

  it('renders hero section with title and subtitle', () => {
    render(<ServicesHeroSection {...defaultProps} />);
    
    expect(screen.getByText('Our Services')).toBeInTheDocument();
    expect(screen.getByText('Professional academic services for students')).toBeInTheDocument();
  });

  it('has correct heading structure', () => {
    render(<ServicesHeroSection {...defaultProps} />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Our Services');
    expect(heading).toHaveAttribute('id', 'services-hero-title');
  });

  it('has correct ARIA label', () => {
    render(<ServicesHeroSection {...defaultProps} />);
    
    const section = screen.getByRole('region');
    expect(section).toHaveAttribute('aria-labelledby', 'services-hero-title');
  });

  it('renders with background image', () => {
    render(<ServicesHeroSection {...defaultProps} />);
    
    // Check if the component renders (background image is handled by Next.js Image)
    const section = screen.getByRole('region');
    expect(section).toBeInTheDocument();
  });
});
