import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card Component', () => {
  it('renders title and description', () => {
    render(<Card title="Test Card" description="Test description" />);
    expect(screen.getByText('Test Card')).toBeDefined();
    expect(screen.getByText('Test description')).toBeDefined();
  });

  it('renders icon when provided', () => {
    const icon = <svg data-testid="test-icon" />;
    render(<Card title="Card" description="Description" icon={icon} />);
    expect(screen.getByTestId('test-icon')).toBeDefined();
  });

  it('renders as a link when link prop is provided', () => {
    render(<Card title="Card" description="Description" link="/test" />);
    const link = screen.getByRole('link');
    expect(link).toBeDefined();
    expect(link.getAttribute('href')).toBe('/test');
  });

  it('renders as a div when no link is provided', () => {
    const { container } = render(<Card title="Card" description="Description" />);
    const card = container.querySelector('div');
    expect(card).toBeDefined();
    expect(card?.tagName).toBe('DIV');
  });

  it('applies hover effect styles by default', () => {
    const { container } = render(<Card title="Card" description="Description" />);
    const card = container.querySelector('div');
    expect(card?.className).toContain('hover:shadow-hover');
  });

  it('does not apply hover effect when hoverEffect is false', () => {
    const { container } = render(<Card title="Card" description="Description" hoverEffect={false} />);
    const card = container.querySelector('div');
    expect(card?.className).not.toContain('hover:shadow-hover');
  });
});
