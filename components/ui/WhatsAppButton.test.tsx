import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import WhatsAppButton from './WhatsAppButton';

describe('WhatsAppButton', () => {
  it('renders WhatsApp button', () => {
    render(<WhatsAppButton />);
    
    const button = screen.getByLabelText('Contact us on WhatsApp');
    expect(button).toBeInTheDocument();
  });

  it('has correct WhatsApp URL', () => {
    render(<WhatsAppButton />);
    
    const button = screen.getByLabelText('Contact us on WhatsApp');
    expect(button).toHaveAttribute('href');
    expect(button.getAttribute('href')).toContain('wa.me');
  });

  it('opens in new tab', () => {
    render(<WhatsAppButton />);
    
    const button = screen.getByLabelText('Contact us on WhatsApp');
    expect(button).toHaveAttribute('target', '_blank');
    expect(button).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('shows tooltip on hover', () => {
    render(<WhatsAppButton />);
    
    const button = screen.getByLabelText('Contact us on WhatsApp');
    
    // Initially tooltip should not be visible
    expect(screen.queryByText('Chat with us on WhatsApp')).not.toBeInTheDocument();
    
    // Hover over button
    fireEvent.mouseEnter(button);
    expect(screen.getByText('Chat with us on WhatsApp')).toBeInTheDocument();
    
    // Mouse leave
    fireEvent.mouseLeave(button);
    expect(screen.queryByText('Chat with us on WhatsApp')).not.toBeInTheDocument();
  });

  it('has correct styling classes', () => {
    render(<WhatsAppButton />);
    
    const button = screen.getByLabelText('Contact us on WhatsApp');
    expect(button).toHaveClass('fixed', 'bottom-6', 'right-6', 'z-40');
  });

  it('has WhatsApp green background color', () => {
    render(<WhatsAppButton />);
    
    const button = screen.getByLabelText('Contact us on WhatsApp');
    expect(button).toHaveStyle({ backgroundColor: '#25D366' });
  });
});
