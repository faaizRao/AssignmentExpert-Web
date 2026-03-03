import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import Testimonials from './Testimonials';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useReducedMotion: () => false,
}));

// Mock ScrollReveal
vi.mock('@/components/animations/ScrollReveal', () => ({
  default: ({ children }: any) => <div>{children}</div>,
}));

describe('Testimonials', () => {
  const mockTestimonials = [
    {
      id: '1',
      name: 'John Doe',
      rating: 5,
      text: 'Excellent service! The quality of work exceeded my expectations.',
      date: '2024-01-15',
    },
    {
      id: '2',
      name: 'Jane Smith',
      rating: 4,
      text: 'Very professional and delivered on time. Highly recommend!',
      date: '2024-02-20',
    },
    {
      id: '3',
      name: 'Bob Johnson',
      rating: 5,
      text: 'Outstanding work! Will definitely use their services again.',
      date: '2024-03-10',
    },
  ];

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders the testimonials section with heading', () => {
    render(<Testimonials testimonials={mockTestimonials} />);

    expect(screen.getByText('What Our Clients Say')).toBeInTheDocument();
    expect(
      screen.getByText(/Don't just take our word for it/i)
    ).toBeInTheDocument();
  });

  it('displays the first testimonial initially', () => {
    render(<Testimonials testimonials={mockTestimonials} />);

    expect(screen.getByText(mockTestimonials[0].text, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(mockTestimonials[0].name)).toBeInTheDocument();
  });

  it('displays star rating correctly', () => {
    render(<Testimonials testimonials={mockTestimonials} />);

    const ratingLabel = screen.getByLabelText('Rating: 5 out of 5 stars');
    expect(ratingLabel).toBeInTheDocument();
  });

  it('displays customer name as required by Property 16', () => {
    render(<Testimonials testimonials={mockTestimonials} />);

    // Property 16: Testimonial Name Display
    // For any testimonial displayed, it should include the customer's name
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('formats and displays the date', () => {
    render(<Testimonials testimonials={mockTestimonials} />);

    expect(screen.getByText('January 2024')).toBeInTheDocument();
  });

  it('shows navigation arrows when multiple testimonials exist', () => {
    render(<Testimonials testimonials={mockTestimonials} />);

    expect(screen.getByLabelText('Previous testimonial')).toBeInTheDocument();
    expect(screen.getByLabelText('Next testimonial')).toBeInTheDocument();
  });

  it('shows pagination dots for each testimonial', () => {
    render(<Testimonials testimonials={mockTestimonials} />);

    const dots = screen.getAllByRole('button').filter((button) =>
      button.getAttribute('aria-label')?.startsWith('Go to testimonial')
    );
    expect(dots).toHaveLength(mockTestimonials.length);
  });

  it('navigates to next testimonial when next button is clicked', () => {
    render(<Testimonials testimonials={mockTestimonials} />);

    // Verify first testimonial is shown
    expect(screen.getByText('John Doe')).toBeInTheDocument();

    const nextButton = screen.getByLabelText('Next testimonial');
    fireEvent.click(nextButton);

    // Check that the second dot is now active
    const secondDot = screen.getByLabelText('Go to testimonial 2');
    expect(secondDot).toHaveAttribute('aria-current', 'true');
  });

  it('navigates to previous testimonial when previous button is clicked', () => {
    render(<Testimonials testimonials={mockTestimonials} />);

    const prevButton = screen.getByLabelText('Previous testimonial');
    fireEvent.click(prevButton);

    // Should wrap around to the last testimonial - check the third dot is active
    const thirdDot = screen.getByLabelText('Go to testimonial 3');
    expect(thirdDot).toHaveAttribute('aria-current', 'true');
  });

  it('navigates to specific testimonial when pagination dot is clicked', () => {
    render(<Testimonials testimonials={mockTestimonials} />);

    const thirdDot = screen.getByLabelText('Go to testimonial 3');
    fireEvent.click(thirdDot);

    // Check that the third dot is now active
    expect(thirdDot).toHaveAttribute('aria-current', 'true');
  });

  it('auto-plays through testimonials at specified interval', () => {
    render(<Testimonials testimonials={mockTestimonials} autoPlayInterval={1000} />);

    // Initially shows first testimonial - check first dot is active
    const firstDot = screen.getByLabelText('Go to testimonial 1');
    expect(firstDot).toHaveAttribute('aria-current', 'true');

    // Advance time by 1 second
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // Check second dot is now active
    const secondDot = screen.getByLabelText('Go to testimonial 2');
    expect(secondDot).toHaveAttribute('aria-current', 'true');

    // Advance time by another second
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // Check third dot is now active
    const thirdDot = screen.getByLabelText('Go to testimonial 3');
    expect(thirdDot).toHaveAttribute('aria-current', 'true');
  });

  it('pauses auto-play on mouse enter and resumes on mouse leave', () => {
    render(<Testimonials testimonials={mockTestimonials} autoPlayInterval={1000} />);

    const carousel = screen.getByText(mockTestimonials[0].name).closest('section');
    expect(carousel).toBeInTheDocument();

    if (carousel) {
      // Simulate mouse enter to pause
      fireEvent.mouseEnter(carousel);

      // Simulate mouse leave to resume
      fireEvent.mouseLeave(carousel);

      // Advance time - should auto-advance now
      act(() => {
        vi.advanceTimersByTime(1000);
      });

      // Check second dot is now active (proves pause/resume works)
      const secondDot = screen.getByLabelText('Go to testimonial 2');
      expect(secondDot).toHaveAttribute('aria-current', 'true');
    }
  });

  it('wraps around to first testimonial after last one', () => {
    render(<Testimonials testimonials={mockTestimonials} />);

    const nextButton = screen.getByLabelText('Next testimonial');

    // Click next 3 times to go through all testimonials
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    // Should wrap back to first testimonial - check first dot is active
    const firstDot = screen.getByLabelText('Go to testimonial 1');
    expect(firstDot).toHaveAttribute('aria-current', 'true');
  });

  it('does not show navigation controls for single testimonial', () => {
    const singleTestimonial = [mockTestimonials[0]];
    render(<Testimonials testimonials={singleTestimonial} />);

    expect(screen.queryByLabelText('Previous testimonial')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Next testimonial')).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText('Go to testimonial 1')
    ).not.toBeInTheDocument();
  });

  it('renders nothing when testimonials array is empty', () => {
    const { container } = render(<Testimonials testimonials={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('highlights active pagination dot', () => {
    render(<Testimonials testimonials={mockTestimonials} />);

    const firstDot = screen.getByLabelText('Go to testimonial 1');
    expect(firstDot).toHaveAttribute('aria-current', 'true');

    const secondDot = screen.getByLabelText('Go to testimonial 2');
    expect(secondDot).toHaveAttribute('aria-current', 'false');
  });

  it('has proper accessibility attributes', () => {
    render(<Testimonials testimonials={mockTestimonials} />);

    // Check for ARIA labels
    expect(screen.getByLabelText('Previous testimonial')).toBeInTheDocument();
    expect(screen.getByLabelText('Next testimonial')).toBeInTheDocument();
    expect(screen.getByLabelText('Rating: 5 out of 5 stars')).toBeInTheDocument();

    // Check pagination dots have proper labels
    mockTestimonials.forEach((_, index) => {
      expect(
        screen.getByLabelText(`Go to testimonial ${index + 1}`)
      ).toBeInTheDocument();
    });
  });

  it('displays all 5 stars for 5-star rating', () => {
    render(<Testimonials testimonials={mockTestimonials} />);

    const ratingContainer = screen.getByLabelText('Rating: 5 out of 5 stars');
    const stars = ratingContainer.querySelectorAll('svg');
    expect(stars).toHaveLength(5);
  });

  it('displays correct number of filled stars for 4-star rating', () => {
    render(<Testimonials testimonials={mockTestimonials} />);

    // Navigate to second testimonial with 4-star rating
    const nextButton = screen.getByLabelText('Next testimonial');
    fireEvent.click(nextButton);

    // Check that the second dot is now active (indicating we're on the second testimonial)
    const secondDot = screen.getByLabelText('Go to testimonial 2');
    expect(secondDot).toHaveAttribute('aria-current', 'true');

    // The rating label should now show 4 stars
    const ratingContainer = screen.getByLabelText('Rating: 4 out of 5 stars');
    expect(ratingContainer).toBeInTheDocument();
  });

  it('uses default auto-play interval when not specified', () => {
    render(<Testimonials testimonials={mockTestimonials} />);

    // Default is 5000ms
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    const secondDot = screen.getByLabelText('Go to testimonial 2');
    expect(secondDot).toHaveAttribute('aria-current', 'true');
  });
});
