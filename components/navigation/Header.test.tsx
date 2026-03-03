import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

// Mock Next.js components
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock('next/image', () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    <img alt={alt} src={src} />
  ),
}));

describe('Header', () => {
  it('renders the logo', () => {
    render(<Header />);
    const logo = screen.getByAltText('Academics Consulate Logo');
    expect(logo).toBeDefined();
  });

  it('renders desktop navigation links', () => {
    render(<Header />);
    expect(screen.getByText('Home')).toBeDefined();
    expect(screen.getByText('Services')).toBeDefined();
    expect(screen.getByText('Get Quote')).toBeDefined();
    expect(screen.getByText('Place Order')).toBeDefined();
  });

  it('renders mobile menu toggle button', () => {
    render(<Header />);
    const menuButton = screen.getByLabelText('Open menu');
    expect(menuButton).toBeDefined();
  });

  it('applies sticky positioning', () => {
    const { container } = render(<Header />);
    const header = container.querySelector('header');
    expect(header?.className).toContain('fixed');
  });
});
