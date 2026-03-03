import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage Component', () => {
  it('renders error message', () => {
    render(<ErrorMessage message="Test error message" />);
    expect(screen.getByText('Test error message')).toBeDefined();
  });

  it('has alert role for accessibility', () => {
    render(<ErrorMessage message="Error" />);
    const alert = screen.getByRole('alert');
    expect(alert).toBeDefined();
  });

  it('has aria-live attribute', () => {
    render(<ErrorMessage message="Error" />);
    const alert = screen.getByRole('alert');
    expect(alert.getAttribute('aria-live')).toBe('assertive');
  });

  it('renders error icon', () => {
    const { container } = render(<ErrorMessage message="Error" />);
    const icon = container.querySelector('svg');
    expect(icon).toBeDefined();
    expect(icon?.getAttribute('aria-hidden')).toBe('true');
  });

  it('returns null when message is empty', () => {
    const { container } = render(<ErrorMessage message="" />);
    expect(container.firstChild).toBeNull();
  });

  it('applies custom className', () => {
    const { container } = render(<ErrorMessage message="Error" className="custom-class" />);
    const alert = container.querySelector('.custom-class');
    expect(alert).toBeDefined();
  });
});
