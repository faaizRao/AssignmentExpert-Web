import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import QuoteForm from './QuoteForm';

// Mock the service data
vi.mock('@/lib/services/serviceData', () => ({
  getAllServices: () => [
    { id: 'assignment-writing', name: 'Assignment Writing' },
    { id: 'essay-writing', name: 'Essay Writing' },
  ],
}));

describe('QuoteForm Component', () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    global.fetch = vi.fn();
  });

  it('renders all form fields', () => {
    render(<QuoteForm />);

    expect(screen.getByLabelText(/full name/i)).toBeDefined();
    expect(screen.getByLabelText(/email address/i)).toBeDefined();
    expect(screen.getByLabelText(/service type/i)).toBeDefined();
    expect(screen.getByLabelText(/project details/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /request quote/i })).toBeDefined();
  });

  it('displays validation errors for empty required fields', async () => {
    render(<QuoteForm />);

    const submitButton = screen.getByRole('button', { name: /request quote/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeDefined();
    });
  });

  it('validates email format', async () => {
    render(<QuoteForm />);

    const emailInput = screen.getByLabelText(/email address/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    const submitButton = screen.getByRole('button', { name: /request quote/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeDefined();
    });
  });

  it('clears error when user corrects input', async () => {
    render(<QuoteForm />);

    const nameInput = screen.getByLabelText(/full name/i);
    const submitButton = screen.getByRole('button', { name: /request quote/i });

    // Submit with empty name to trigger error
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeDefined();
    });

    // Type in name field
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });

    // Error should be cleared
    await waitFor(() => {
      expect(screen.queryByText(/name is required/i)).toBeNull();
    });
  });

  it('submits form with valid data', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, message: 'Quote request submitted' }),
    });
    global.fetch = mockFetch;

    const onSuccess = vi.fn();
    render(<QuoteForm onSuccess={onSuccess} />);

    // Fill in form
    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/service type/i), {
      target: { value: 'assignment-writing' },
    });
    fireEvent.change(screen.getByLabelText(/project details/i), {
      target: { value: 'I need help with my assignment on computer science' },
    });

    // Submit form
    const submitButton = screen.getByRole('button', { name: /request quote/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/quote',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
      );
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it('displays success message after successful submission', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, message: 'Quote request submitted' }),
    });
    global.fetch = mockFetch;

    render(<QuoteForm />);

    // Fill in form
    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/service type/i), {
      target: { value: 'assignment-writing' },
    });
    fireEvent.change(screen.getByLabelText(/project details/i), {
      target: { value: 'I need help with my assignment on computer science' },
    });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /request quote/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/quote request submitted successfully/i)
      ).toBeDefined();
    });
  });

  it('displays error message on submission failure', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Server error' }),
    });
    global.fetch = mockFetch;

    const onError = vi.fn();
    render(<QuoteForm onError={onError} />);

    // Fill in form
    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/service type/i), {
      target: { value: 'assignment-writing' },
    });
    fireEvent.change(screen.getByLabelText(/project details/i), {
      target: { value: 'I need help with my assignment on computer science' },
    });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /request quote/i }));

    await waitFor(() => {
      expect(screen.getByText(/error submitting quote request/i)).toBeDefined();
      expect(screen.getByText(/server error/i)).toBeDefined();
      expect(onError).toHaveBeenCalled();
    });
  });

  it('preserves form data on submission failure', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Server error' }),
    });
    global.fetch = mockFetch;

    render(<QuoteForm />);

    const testData = {
      name: 'John Doe',
      email: 'john@example.com',
      serviceType: 'assignment-writing',
      projectDetails: 'I need help with my assignment on computer science',
    };

    // Fill in form
    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: testData.name },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: testData.email },
    });
    fireEvent.change(screen.getByLabelText(/service type/i), {
      target: { value: testData.serviceType },
    });
    fireEvent.change(screen.getByLabelText(/project details/i), {
      target: { value: testData.projectDetails },
    });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /request quote/i }));

    await waitFor(() => {
      expect(screen.getByText(/error submitting quote request/i)).toBeDefined();
    });

    // Verify form data is preserved
    expect((screen.getByLabelText(/full name/i) as HTMLInputElement).value).toBe(
      testData.name
    );
    expect((screen.getByLabelText(/email address/i) as HTMLInputElement).value).toBe(
      testData.email
    );
    expect((screen.getByLabelText(/service type/i) as HTMLSelectElement).value).toBe(
      testData.serviceType
    );
    expect(
      (screen.getByLabelText(/project details/i) as HTMLTextAreaElement).value
    ).toBe(testData.projectDetails);
  });

  it('shows loading state during submission', async () => {
    const mockFetch = vi.fn().mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                json: async () => ({ success: true }),
              }),
            100
          )
        )
    );
    global.fetch = mockFetch;

    render(<QuoteForm />);

    // Fill in form
    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/service type/i), {
      target: { value: 'assignment-writing' },
    });
    fireEvent.change(screen.getByLabelText(/project details/i), {
      target: { value: 'I need help with my assignment on computer science' },
    });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /request quote/i }));

    // Check for loading state
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /submitting/i })).toBeDefined();
    });
  });

  it('disables submit button during submission', async () => {
    const mockFetch = vi.fn().mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                json: async () => ({ success: true }),
              }),
            100
          )
        )
    );
    global.fetch = mockFetch;

    render(<QuoteForm />);

    // Fill in form
    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/service type/i), {
      target: { value: 'assignment-writing' },
    });
    fireEvent.change(screen.getByLabelText(/project details/i), {
      target: { value: 'I need help with my assignment on computer science' },
    });

    // Submit form
    const submitButton = screen.getByRole('button', { name: /request quote/i });
    fireEvent.click(submitButton);

    // Check button is disabled
    await waitFor(() => {
      expect(submitButton).toHaveProperty('disabled', true);
    });
  });
});
