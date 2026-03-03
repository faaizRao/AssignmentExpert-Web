import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner Component', () => {
  it('renders with status role', () => {
    render(<LoadingSpinner />);
    const status = screen.getByRole('status');
    expect(status).toBeDefined();
  });

  it('includes screen reader text', () => {
    render(<LoadingSpinner />);
    expect(screen.getByText('Loading...')).toBeDefined();
  });

  it('applies correct size styles', () => {
    const { container, rerender } = render(<LoadingSpinner size="sm" />);
    let svg = container.querySelector('svg');
    expect(svg?.classList.contains('h-4')).toBe(true);
    
    rerender(<LoadingSpinner size="lg" />);
    svg = container.querySelector('svg');
    expect(svg?.classList.contains('h-12')).toBe(true);
  });

  it('has spinning animation', () => {
    const { container } = render(<LoadingSpinner />);
    const svg = container.querySelector('svg');
    expect(svg?.classList.contains('animate-spin')).toBe(true);
  });

  it('has aria-live attribute for accessibility', () => {
    render(<LoadingSpinner />);
    const status = screen.getByRole('status');
    expect(status.getAttribute('aria-live')).toBe('polite');
  });
});
