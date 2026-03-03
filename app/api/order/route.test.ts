/**
 * Order API Route Tests
 * 
 * Unit tests for the order API route to ensure proper validation,
 * email sending, and error handling.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './route';
import { NextRequest } from 'next/server';
import * as emailService from '@/lib/email/emailService';

// Mock the email service
vi.mock('@/lib/email/emailService', () => ({
  sendOrderConfirmation: vi.fn(),
  sendOrderNotification: vi.fn(),
}));

describe('POST /api/order', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should successfully process valid order request', async () => {
    // Mock successful email sending
    vi.mocked(emailService.sendOrderConfirmation).mockResolvedValue(undefined);
    vi.mocked(emailService.sendOrderNotification).mockResolvedValue(undefined);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const validData = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      serviceType: 'dissertation-writing',
      deadline: tomorrow.toISOString().split('T')[0],
      requirements: 'I need a comprehensive dissertation on machine learning algorithms with at least 50 pages.',
    };

    const request = new NextRequest('http://localhost:3000/api/order', {
      method: 'POST',
      body: JSON.stringify(validData),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.message).toContain('successfully');
    expect(emailService.sendOrderConfirmation).toHaveBeenCalledTimes(1);
    expect(emailService.sendOrderNotification).toHaveBeenCalledTimes(1);
  });

  it('should reject request with missing required fields', async () => {
    const invalidData = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      // Missing serviceType, deadline, and requirements
    };

    const request = new NextRequest('http://localhost:3000/api/order', {
      method: 'POST',
      body: JSON.stringify(invalidData),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.message).toContain('Validation failed');
    expect(data.errors).toBeDefined();
    expect(emailService.sendOrderConfirmation).not.toHaveBeenCalled();
    expect(emailService.sendOrderNotification).not.toHaveBeenCalled();
  });

  it('should reject request with invalid email format', async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const invalidData = {
      name: 'Jane Smith',
      email: 'invalid-email',
      serviceType: 'dissertation-writing',
      deadline: tomorrow.toISOString().split('T')[0],
      requirements: 'I need help with my dissertation on machine learning.',
    };

    const request = new NextRequest('http://localhost:3000/api/order', {
      method: 'POST',
      body: JSON.stringify(invalidData),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.message).toContain('Validation failed');
    expect(emailService.sendOrderConfirmation).not.toHaveBeenCalled();
  });

  it('should reject request with past deadline', async () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const invalidData = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      serviceType: 'dissertation-writing',
      deadline: yesterday.toISOString().split('T')[0],
      requirements: 'I need help with my dissertation on machine learning.',
    };

    const request = new NextRequest('http://localhost:3000/api/order', {
      method: 'POST',
      body: JSON.stringify(invalidData),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.message).toContain('Validation failed');
  });

  it('should reject request with requirements too short', async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const invalidData = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      serviceType: 'dissertation-writing',
      deadline: tomorrow.toISOString().split('T')[0],
      requirements: 'Too short',
    };

    const request = new NextRequest('http://localhost:3000/api/order', {
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
    vi.mocked(emailService.sendOrderConfirmation).mockRejectedValue(
      new Error('SMTP connection failed')
    );

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const validData = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      serviceType: 'dissertation-writing',
      deadline: tomorrow.toISOString().split('T')[0],
      requirements: 'I need a comprehensive dissertation on machine learning algorithms.',
    };

    const request = new NextRequest('http://localhost:3000/api/order', {
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
    const request = new NextRequest('http://localhost:3000/api/order', {
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
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const invalidData = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      serviceType: 'non-existent-service',
      deadline: tomorrow.toISOString().split('T')[0],
      requirements: 'I need help with my dissertation.',
    };

    const request = new NextRequest('http://localhost:3000/api/order', {
      method: 'POST',
      body: JSON.stringify(invalidData),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.message).toContain('Validation failed');
  });

  it('should add timestamp to order data', async () => {
    vi.mocked(emailService.sendOrderConfirmation).mockResolvedValue(undefined);
    vi.mocked(emailService.sendOrderNotification).mockResolvedValue(undefined);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const validData = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      serviceType: 'dissertation-writing',
      deadline: tomorrow.toISOString().split('T')[0],
      requirements: 'I need a comprehensive dissertation on machine learning.',
    };

    const request = new NextRequest('http://localhost:3000/api/order', {
      method: 'POST',
      body: JSON.stringify(validData),
    });

    await POST(request);

    // Verify that the email functions were called with data including timestamp
    expect(emailService.sendOrderConfirmation).toHaveBeenCalledWith(
      expect.objectContaining({
        ...validData,
        timestamp: expect.any(Date),
      })
    );
  });

  it('should accept future deadline', async () => {
    vi.mocked(emailService.sendOrderConfirmation).mockResolvedValue(undefined);
    vi.mocked(emailService.sendOrderNotification).mockResolvedValue(undefined);

    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    const validData = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      serviceType: 'dissertation-writing',
      deadline: nextWeek.toISOString().split('T')[0],
      requirements: 'I need a comprehensive dissertation on machine learning algorithms.',
    };

    const request = new NextRequest('http://localhost:3000/api/order', {
      method: 'POST',
      body: JSON.stringify(validData),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });
});
