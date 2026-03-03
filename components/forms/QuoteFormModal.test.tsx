import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import QuoteFormModal from './QuoteFormModal';

// Mock the Modal component
vi.mock('@/components/ui/Modal', () => ({
  default: ({ isOpen, onClose, title, children }: any) => (
    isOpen ? (
      <div data-testid="modal">
        <h2>{title}</h2>
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    ) : null
  ),
}));

// Mock the QuoteForm component
vi.mock('./QuoteForm', () => ({
  default: ({ onSuccess }: any) => (
    <div data-testid="quote-form">
      <button onClick={onSuccess}>Submit</button>
    </div>
  ),
}));

describe('QuoteFormModal', () => {
  const mockOnClose = vi.fn();

  it('renders modal when isOpen is true', () => {
    render(<QuoteFormModal isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByText('Request a Quote')).toBeInTheDocument();
  });

  it('does not render modal when isOpen is false', () => {
    render(<QuoteFormModal isOpen={false} onClose={mockOnClose} />);
    
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('renders QuoteForm inside modal', () => {
    render(<QuoteFormModal isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByTestId('quote-form')).toBeInTheDocument();
  });
});
