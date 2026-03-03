import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import FadeIn from './FadeIn';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  useReducedMotion: () => false,
}));

describe('FadeIn', () => {
  it('renders children correctly', () => {
    render(
      <FadeIn>
        <div>Test Content</div>
      </FadeIn>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('accepts delay prop', () => {
    render(
      <FadeIn delay={0.3}>
        <div>Delayed Content</div>
      </FadeIn>
    );

    expect(screen.getByText('Delayed Content')).toBeInTheDocument();
  });

  it('accepts duration prop', () => {
    render(
      <FadeIn duration={1.0}>
        <div>Slow Fade</div>
      </FadeIn>
    );

    expect(screen.getByText('Slow Fade')).toBeInTheDocument();
  });

  it('accepts both delay and duration props', () => {
    render(
      <FadeIn delay={0.2} duration={0.8}>
        <div>Custom Animation</div>
      </FadeIn>
    );

    expect(screen.getByText('Custom Animation')).toBeInTheDocument();
  });
});
