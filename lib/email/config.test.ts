/**
 * SMTP Configuration Tests
 * 
 * Unit tests for SMTP configuration loading and validation.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getSMTPConfig, isConfigValid } from './config';

describe('SMTP Configuration', () => {
  // Store original environment variables
  const originalEnv = { ...process.env };

  beforeEach(() => {
    // Set up valid test environment variables
    process.env.SMTP_HOST = 'smtp.test.com';
    process.env.SMTP_PORT = '587';
    process.env.SMTP_USER = 'test@test.com';
    process.env.SMTP_PASS = 'testpass';
    process.env.SMTP_FROM = 'Test <test@test.com>';
    process.env.ADMIN_EMAIL = 'admin@test.com';
  });

  afterEach(() => {
    // Restore original environment variables
    process.env = { ...originalEnv };
  });

  describe('getSMTPConfig', () => {
    it('should load valid SMTP configuration from environment variables', () => {
      const config = getSMTPConfig();

      expect(config).toEqual({
        host: 'smtp.test.com',
        port: 587,
        secure: false,
        auth: {
          user: 'test@test.com',
          pass: 'testpass',
        },
        from: 'Test <test@test.com>',
        adminEmail: 'admin@test.com',
      });
    });

    it('should set secure to true for port 465', () => {
      process.env.SMTP_PORT = '465';
      const config = getSMTPConfig();

      expect(config.secure).toBe(true);
      expect(config.port).toBe(465);
    });

    it('should set secure to false for port 587', () => {
      process.env.SMTP_PORT = '587';
      const config = getSMTPConfig();

      expect(config.secure).toBe(false);
      expect(config.port).toBe(587);
    });

    it('should throw error if SMTP_HOST is missing', () => {
      delete process.env.SMTP_HOST;

      expect(() => getSMTPConfig()).toThrow('SMTP_HOST environment variable is required');
    });

    it('should throw error if SMTP_PORT is missing', () => {
      delete process.env.SMTP_PORT;

      expect(() => getSMTPConfig()).toThrow('SMTP_PORT environment variable is required');
    });

    it('should throw error if SMTP_USER is missing', () => {
      delete process.env.SMTP_USER;

      expect(() => getSMTPConfig()).toThrow('SMTP_USER environment variable is required');
    });

    it('should throw error if SMTP_PASS is missing', () => {
      delete process.env.SMTP_PASS;

      expect(() => getSMTPConfig()).toThrow('SMTP_PASS environment variable is required');
    });

    it('should throw error if SMTP_FROM is missing', () => {
      delete process.env.SMTP_FROM;

      expect(() => getSMTPConfig()).toThrow('SMTP_FROM environment variable is required');
    });

    it('should throw error if ADMIN_EMAIL is missing', () => {
      delete process.env.ADMIN_EMAIL;

      expect(() => getSMTPConfig()).toThrow('ADMIN_EMAIL environment variable is required');
    });

    it('should throw error if SMTP_PORT is not a valid number', () => {
      process.env.SMTP_PORT = 'invalid';

      expect(() => getSMTPConfig()).toThrow('SMTP_PORT must be a valid number');
    });
  });

  describe('isConfigValid', () => {
    it('should return true for valid configuration', () => {
      expect(isConfigValid()).toBe(true);
    });

    it('should return false for invalid configuration', () => {
      delete process.env.SMTP_HOST;

      expect(isConfigValid()).toBe(false);
    });

    it('should return false when SMTP_PORT is invalid', () => {
      process.env.SMTP_PORT = 'not-a-number';

      expect(isConfigValid()).toBe(false);
    });
  });
});
