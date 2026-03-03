import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import FormField from './FormField';

describe('FormField Component', () => {
  const mockOnChange = vi.fn();

  it('renders text input by default', () => {
    render(
      <FormField
        label="Name"
        name="name"
        value=""
        onChange={mockOnChange}
      />
    );
    const input = screen.getByLabelText('Name');
    expect(input).toBeDefined();
    expect(input.getAttribute('type')).toBe('text');
  });

  it('renders textarea when type is textarea', () => {
    render(
      <FormField
        label="Description"
        name="description"
        type="textarea"
        value=""
        onChange={mockOnChange}
      />
    );
    const textarea = screen.getByLabelText('Description');
    expect(textarea.tagName).toBe('TEXTAREA');
  });

  it('renders select when type is select', () => {
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ];
    render(
      <FormField
        label="Select"
        name="select"
        type="select"
        value=""
        onChange={mockOnChange}
        options={options}
      />
    );
    const select = screen.getByLabelText('Select');
    expect(select.tagName).toBe('SELECT');
    expect(screen.getByText('Option 1')).toBeDefined();
    expect(screen.getByText('Option 2')).toBeDefined();
  });

  it('shows required indicator when required is true', () => {
    render(
      <FormField
        label="Email"
        name="email"
        type="email"
        value=""
        onChange={mockOnChange}
        required
      />
    );
    const requiredIndicator = screen.getByLabelText('required');
    expect(requiredIndicator).toBeDefined();
    expect(requiredIndicator.textContent).toBe('*');
  });

  it('displays error message when error prop is provided', () => {
    render(
      <FormField
        label="Email"
        name="email"
        value=""
        onChange={mockOnChange}
        error="Invalid email"
      />
    );
    const errorMessage = screen.getByRole('alert');
    expect(errorMessage).toBeDefined();
    expect(errorMessage.textContent).toContain('Invalid email');
  });

  it('sets aria-invalid when error is present', () => {
    render(
      <FormField
        label="Email"
        name="email"
        value=""
        onChange={mockOnChange}
        error="Invalid email"
      />
    );
    const input = screen.getByLabelText('Email');
    expect(input.getAttribute('aria-invalid')).toBe('true');
  });

  it('links error message with input via aria-describedby', () => {
    render(
      <FormField
        label="Email"
        name="email"
        value=""
        onChange={mockOnChange}
        error="Invalid email"
      />
    );
    const input = screen.getByLabelText('Email');
    expect(input.getAttribute('aria-describedby')).toBe('email-error');
  });

  it('applies placeholder text', () => {
    render(
      <FormField
        label="Name"
        name="name"
        value=""
        onChange={mockOnChange}
        placeholder="Enter your name"
      />
    );
    const input = screen.getByPlaceholderText('Enter your name');
    expect(input).toBeDefined();
  });
});
