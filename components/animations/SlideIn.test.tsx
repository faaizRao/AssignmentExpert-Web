import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SlideIn from './SlideIn';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  useReducedMotion: () => false,
}));

describe('SlideIn', () => {
  it('renders children correctly', () => {
    render(
      <SlideIn direction="left">
        <div>Test Content</div>
      </SlideIn>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('accepts all direction values', () => {
    const directions: Array<'left' | 'right' | 'up' | 'down'> = [
      'left',
      'right',
      'up',
      'down',
    ];

    directions.forEach((direction) => {
      const { unmount } = render(
        <SlideIn direction={direction}>
          <div>{`Slide ${direction}`}</div>
        </SlideIn>
      );

      expect(screen.getByText(`Slide ${direction}`)).toBeInTheDocument();
      unmount();
    });
  });

  it('accepts delay prop', () => {
    render(
      <SlideIn direction="up" delay={0.3}>
        <div>Delayed Slide</div>
      </SlideIn>
    );

    expect(screen.getByText('Delayed Slide')).toBeInTheDocument();
  });

  it('accepts duration prop', () => {
    render(
      <SlideIn direction="down" duration={1.0}>
        <div>Slow Slide</div>
      </SlideIn>
    );

    expect(screen.getByText('Slow Slide')).toBeInTheDocument();
  });

  it('accepts both delay and duration props', () => {
    render(
      <SlideIn direction="right" delay={0.2} duration={0.8}>
        <div>Custom Slide</div>
      </SlideIn>
    );

    expect(screen.getByText('Custom Slide')).toBeInTheDocument();
  });
});
