import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MobileMenu } from './MobileMenu';

// Mock Next.js Link
vi.mock('next/link', () => ({
  default: ({ children, href, onClick }: { children: React.ReactNode; href: string; onClick?: () => void }) => (
    <a href={href} onClick={onClick}>{children}</a>
  ),
}));

describe('MobileMenu', () => {
  it('does not render when closed', () => {
    render(<MobileMenu isOpen={false} onClose={() => {}} />);
    expect(screen.queryByText('Menu')).toBeNull();
  });

  it('renders when open', () => {
    render(<MobileMenu isOpen={true} onClose={() => {}} />);
    expect(screen.getByText('Menu')).toBeDefined();
  });

  it('renders all navigation links', () => {
    render(<MobileMenu isOpen={true} onClose={() => {}} />);
    expect(screen.getByText('Home')).toBeDefined();
    expect(screen.getByText('Services')).toBeDefined();
    expect(screen.getByText('Get Quote')).toBeDefined();
    expect(screen.getByText('Place Order')).toBeDefined();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(<MobileMenu isOpen={true} onClose={onClose} />);
    
    const closeButton = screen.getByLabelText('Close menu');
    fireEvent.click(closeButton);
    
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose when backdrop is clicked', () => {
    const onClose = vi.fn();
    const { container } = render(<MobileMenu isOpen={true} onClose={onClose} />);
    
    const backdrop = container.querySelector('.bg-black\\/50');
    if (backdrop) {
      fireEvent.click(backdrop);
      expect(onClose).toHaveBeenCalledOnce();
    }
  });

  it('calls onClose when a navigation link is clicked', () => {
    const onClose = vi.fn();
    render(<MobileMenu isOpen={true} onClose={onClose} />);
    
    const homeLink = screen.getByText('Home');
    fireEvent.click(homeLink);
    
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('displays copyright year', () => {
    render(<MobileMenu isOpen={true} onClose={() => {}} />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} Academics Consulate`)).toBeDefined();
  });
});
