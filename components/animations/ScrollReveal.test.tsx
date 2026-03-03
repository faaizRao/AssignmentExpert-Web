import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ScrollReveal from './ScrollReveal';

// Mock framer-motion
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

describe('ScrollReveal', () => {
  beforeEach(() => {
    mockIntersectionObserver.mockClear();
  });

  it('renders children correctly', () => {
    render(
      <ScrollReveal>
        <div>Test Content</div>
      </ScrollReveal>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('accepts direction prop', () => {
    const { rerender } = render(
      <ScrollReveal direction="up">
        <div>Test</div>
      </ScrollReveal>
    );

    expect(screen.getByText('Test')).toBeInTheDocument();

    rerender(
      <ScrollReveal direction="down">
        <div>Test</div>
      </ScrollReveal>
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('accepts delay and duration props', () => {
    render(
      <ScrollReveal delay={0.2} duration={0.8}>
        <div>Test</div>
      </ScrollReveal>
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('sets up IntersectionObserver', () => {
    render(
      <ScrollReveal>
        <div>Test</div>
      </ScrollReveal>
    );

    expect(mockIntersectionObserver).toHaveBeenCalled();
  });
});
