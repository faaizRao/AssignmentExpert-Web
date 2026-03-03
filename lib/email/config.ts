/**
 * SMTP Configuration
 * 
 * Loads and validates SMTP configuration from environment variables.
 * Provides configuration for Nodemailer transporter setup.
 */

import { SMTPConfig } from '@/types/email';

/**
 * Get SMTP Configuration
 * 
 * Loads SMTP configuration from environment variables and validates
 * that all required values are present.
 * 
 * @returns {SMTPConfig} SMTP configuration object
 * @throws {Error} If required environment variables are missing
 */
export function getSMTPConfig(): SMTPConfig {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM;
  const adminEmail = process.env.ADMIN_EMAIL;

  // Validate required environment variables
  if (!host) {
    throw new Error('SMTP_HOST environment variable is required');
  }
  if (!port) {
    throw new Error('SMTP_PORT environment variable is required');
  }
  if (!user) {
    throw new Error('SMTP_USER environment variable is required');
  }
  if (!pass) {
    throw new Error('SMTP_PASS environment variable is required');
  }
  if (!from) {
    throw new Error('SMTP_FROM environment variable is required');
  }
  if (!adminEmail) {
    throw new Error('ADMIN_EMAIL environment variable is required');
  }

  const portNumber = parseInt(port, 10);
  if (isNaN(portNumber)) {
    throw new Error('SMTP_PORT must be a valid number');
  }

  // Port 465 uses SSL, other ports (587, 25) use TLS/STARTTLS
  const secure = portNumber === 465;

  return {
    host,
    port: portNumber,
    secure,
    auth: {
      user,
      pass,
    },
    from,
    adminEmail,
  };
}

/**
 * Validate SMTP Configuration
 * 
 * Checks if SMTP configuration is valid and all required
 * environment variables are set.
 * 
 * @returns {boolean} True if configuration is valid
 */
export function isConfigValid(): boolean {
  try {
    getSMTPConfig();
    return true;
  } catch {
    return false;
  }
}
