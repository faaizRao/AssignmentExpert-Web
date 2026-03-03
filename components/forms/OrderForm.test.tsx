import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import OrderForm from './OrderForm';

// Mock the service data
vi.mock('@/lib/services/serviceData', () => ({
  getAllServices: () => [
    { id: 'assignment-writing', name: 'Assignment Writing' },
    { id: 'essay-writing', name: 'Essay Writing' },
  ],
}));

describe('OrderForm Component', () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    global.fetch = vi.fn();
  });

  it('renders all form fields', () => {
    render(<OrderForm />);

    expect(screen.getByLabelText(/full name/i)).toBeDefined();
    expect(screen.getByLabelText(/email address/i)).toBeDefined();
    expect(screen.getByLabelText(/service type/i)).toBeDefined();
    expect(screen.getByLabelText(/deadline/i)).toBeDefined();
    expect(screen.getByLabelText(/project requirements/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /place order/i })).toBeDefined();
  });

  it('pre-selects service when preselectedService prop is provided', () => {
    render(<OrderForm preselectedService="essay-writing" />);

    const serviceSelect = screen.getByLabelText(/service type/i) as HTMLSelectElement;
    expect(serviceSelect.value).toBe('essay-writing');
  });

  it('displays validation errors for empty required fields', async () => {
    render(<OrderForm />);

    const submitButton = screen.getByRole('button', { name: /place order/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeDefined();
    });
  });

  it('validates email format', async () => {
    render(<OrderForm />);

    const emailInput = screen.getByLabelText(/email address/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    const submitButton = screen.getByRole('button', { name: /place order/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeDefined();
    });
  });

  it('validates deadline is a future date', async () => {
    render(<OrderForm />);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split('T')[0];

    const deadlineInput = screen.getByLabelText(/deadline/i);
    fireEvent.change(deadlineInput, { target: { value: yesterdayString } });

    const submitButton = screen.getByRole('button', { name: /place order/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/deadline must be a future date/i)).toBeDefined();
    });
  });

  it('clears error when user corrects input', async () => {
    render(<OrderForm />);

    const nameInput = screen.getByLabelText(/full name/i);
    const submitButton = screen.getByRole('button', { name: /place order/i });

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
      json: async () => ({ success: true, message: 'Order submitted' }),
    });
    global.fetch = mockFetch;

    const onSuccess = vi.fn();
    render(<OrderForm onSuccess={onSuccess} />);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = tomorrow.toISOString().split('T')[0];

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
    fireEvent.change(screen.getByLabelText(/deadline/i), {
      target: { value: tomorrowString },
    });
    fireEvent.change(screen.getByLabelText(/project requirements/i), {
      target: {
        value:
          'I need help with my computer science assignment. It should be 2000 words.',
      },
    });

    // Submit form
    const submitButton = screen.getByRole('button', { name: /place order/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/order',
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
      json: async () => ({ success: true, message: 'Order submitted' }),
    });
    global.fetch = mockFetch;

    render(<OrderForm />);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = tomorrow.toISOString().split('T')[0];

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
    fireEvent.change(screen.getByLabelText(/deadline/i), {
      target: { value: tomorrowString },
    });
    fireEvent.change(screen.getByLabelText(/project requirements/i), {
      target: {
        value:
          'I need help with my computer science assignment. It should be 2000 words.',
      },
    });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /place order/i }));

    await waitFor(() => {
      expect(screen.getByText(/order submitted successfully/i)).toBeDefined();
    });
  });

  it('displays error message on submission failure', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Server error' }),
    });
    global.fetch = mockFetch;

    const onError = vi.fn();
    render(<OrderForm onError={onError} />);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = tomorrow.toISOString().split('T')[0];

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
    fireEvent.change(screen.getByLabelText(/deadline/i), {
      target: { value: tomorrowString },
    });
    fireEvent.change(screen.getByLabelText(/project requirements/i), {
      target: {
        value:
          'I need help with my computer science assignment. It should be 2000 words.',
      },
    });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /place order/i }));

    await waitFor(() => {
      expect(screen.getByText(/error submitting order/i)).toBeDefined();
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

    render(<OrderForm />);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = tomorrow.toISOString().split('T')[0];

    const testData = {
      name: 'John Doe',
      email: 'john@example.com',
      serviceType: 'assignment-writing',
      deadline: tomorrowString,
      requirements:
        'I need help with my computer science assignment. It should be 2000 words.',
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
    fireEvent.change(screen.getByLabelText(/deadline/i), {
      target: { value: testData.deadline },
    });
    fireEvent.change(screen.getByLabelText(/project requirements/i), {
      target: { value: testData.requirements },
    });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /place order/i }));

    await waitFor(() => {
      expect(screen.getByText(/error submitting order/i)).toBeDefined();
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
    expect((screen.getByLabelText(/deadline/i) as HTMLInputElement).value).toBe(
      testData.deadline
    );
    expect(
      (screen.getByLabelText(/project requirements/i) as HTMLTextAreaElement).value
    ).toBe(testData.requirements);
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

    render(<OrderForm />);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = tomorrow.toISOString().split('T')[0];

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
    fireEvent.change(screen.getByLabelText(/deadline/i), {
      target: { value: tomorrowString },
    });
    fireEvent.change(screen.getByLabelText(/project requirements/i), {
      target: {
        value:
          'I need help with my computer science assignment. It should be 2000 words.',
      },
    });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /place order/i }));

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

    render(<OrderForm />);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = tomorrow.toISOString().split('T')[0];

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
    fireEvent.change(screen.getByLabelText(/deadline/i), {
      target: { value: tomorrowString },
    });
    fireEvent.change(screen.getByLabelText(/project requirements/i), {
      target: {
        value:
          'I need help with my computer science assignment. It should be 2000 words.',
      },
    });

    // Submit form
    const submitButton = screen.getByRole('button', { name: /place order/i });
    fireEvent.click(submitButton);

    // Check button is disabled
    await waitFor(() => {
      expect(submitButton).toHaveProperty('disabled', true);
    });
  });

  it('sets minimum date to today for deadline input', () => {
    render(<OrderForm />);

    const deadlineInput = screen.getByLabelText(/deadline/i) as HTMLInputElement;
    const today = new Date().toISOString().split('T')[0];

    expect(deadlineInput.min).toBe(today);
  });
});
