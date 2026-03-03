/**
 * Quote API Route Tests
 * 
 * Unit tests for the quote API route to ensure proper validation,
 * email sending, and error handling.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './route';
import { NextRequest } from 'next/server';
import * as emailService from '@/lib/email/emailService';

// Mock the email service
vi.mock('@/lib/email/emailService', () => ({
  sendQuoteConfirmation: vi.fn(),
  sendQuoteNotification: vi.fn(),
}));

describe('POST /api/quote', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should successfully process valid quote request', async () => {
    // Mock successful email sending
    vi.mocked(emailService.sendQuoteConfirmation).mockResolvedValue(undefined);
    vi.mocked(emailService.sendQuoteNotification).mockResolvedValue(undefined);

    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      serviceType: 'assignment-writing',
      projectDetails: 'I need help with my computer science assignment on algorithms.',
    };

    const request = new NextRequest('http://localhost:3000/api/quote', {
      method: 'POST',
      body: JSON.stringify(validData),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.message).toContain('successfully');
    expect(emailService.sendQuoteConfirmation).toHaveBeenCalledTimes(1);
    expect(emailService.sendQuoteNotification).toHaveBeenCalledTimes(1);
  });

  it('should reject request with missing required fields', async () => {
    const invalidData = {
      name: 'John Doe',
      email: 'john@example.com',
      // Missing serviceType and projectDetails
    };

    const request = new NextRequest('http://localhost:3000/api/quote', {
      method: 'POST',
      body: JSON.stringify(invalidData),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.message).toContain('Validation failed');
    expect(data.errors).toBeDefined();
    expect(emailService.sendQuoteConfirmation).not.toHaveBeenCalled();
    expect(emailService.sendQuoteNotification).not.toHaveBeenCalled();
  });

  it('should reject request with invalid email format', async () => {
    const invalidData = {
      name: 'John Doe',
      email: 'invalid-email',
      serviceType: 'assignment-writing',
      projectDetails: 'I need help with my assignment.',
    };

    const request = new NextRequest('http://localhost:3000/api/quote', {
      method: 'POST',
      body: JSON.stringify(invalidData),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.message).toContain('Validation failed');
    expect(emailService.sendQuoteConfirmation).not.toHaveBeenCalled();
  });

  it('should reject request with project details too short', async () => {
    const invalidData = {
      name: 'John Doe',
      email: 'john@example.com',
      serviceType: 'assignment-writing',
      projectDetails: 'Too short',
    };

    const request = new NextRequest('http://localhost:3000/api/quote', {
      method: 'POST',
      body: JSON.stringify(invalidData),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.message).toContain('Validation failed');
  });

  it('should handle email sending failure gracefully', async () => {
    // Mock email sending failure
    vi.mocked(emailService.sendQuoteConfirmation).mockRejectedValue(
      new Error('SMTP connection failed')
    );

    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      serviceType: 'assignment-writing',
      projectDetails: 'I need help with my computer science assignment.',
    };

    const request = new NextRequest('http://localhost:3000/api/quote', {
      method: 'POST',
      body: JSON.stringify(validData),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.success).toBe(false);
    expect(data.message).toContain('Failed to send email');
    expect(data.error).toBe('Email delivery failed');
  });

  it('should reject request with invalid JSON', async () => {
    const request = new NextRequest('http://localhost:3000/api/quote', {
      method: 'POST',
      body: 'invalid json',
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.message).toContain('Invalid request format');
  });

  it('should reject request with invalid service type', async () => {
    const invalidData = {
      name: 'John Doe',
      email: 'john@example.com',
      serviceType: 'non-existent-service',
      projectDetails: 'I need help with my assignment.',
    };

    const request = new NextRequest('http://localhost:3000/api/quote', {
      method: 'POST',
      body: JSON.stringify(invalidData),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.message).toContain('Validation failed');
  });

  it('should add timestamp to quote data', async () => {
    vi.mocked(emailService.sendQuoteConfirmation).mockResolvedValue(undefined);
    vi.mocked(emailService.sendQuoteNotification).mockResolvedValue(undefined);

    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      serviceType: 'assignment-writing',
      projectDetails: 'I need help with my assignment.',
    };

    const request = new NextRequest('http://localhost:3000/api/quote', {
      method: 'POST',
      body: JSON.stringify(validData),
    });

    await POST(request);

    // Verify that the email functions were called with data including timestamp
    expect(emailService.sendQuoteConfirmation).toHaveBeenCalledWith(
      expect.objectContaining({
        ...validData,
        timestamp: expect.any(Date),
      })
    );
  });
});
