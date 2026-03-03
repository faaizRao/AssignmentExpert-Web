/**
 * Email Service
 * 
 * Provides email sending functionality using Nodemailer with SMTP transport.
 * Includes retry logic with exponential backoff for reliability.
 */

import nodemailer, { Transporter } from 'nodemailer';
import { getSMTPConfig } from './config';
import { EmailNotification } from '@/types/email';
import { QuoteFormData, OrderFormData } from '@/types/forms';

/**
 * Create Nodemailer Transporter
 * 
 * Creates and configures a Nodemailer transporter using SMTP configuration
 * from environment variables.
 * 
 * @returns {Transporter} Configured Nodemailer transporter
 */
export function createTransporter(): Transporter {
  const config = getSMTPConfig();

  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.auth.user,
      pass: config.auth.pass,
    },
    // Connection timeout: 10 seconds
    connectionTimeout: 10000,
    // Socket timeout: 10 seconds
    socketTimeout: 10000,
  });
}

/**
 * Send Email with Retry Logic
 * 
 * Sends an email with exponential backoff retry logic for improved reliability.
 * Retries up to maxRetries times with increasing delays between attempts.
 * 
 * @param {EmailNotification} emailData - Email data to send
 * @param {number} maxRetries - Maximum number of retry attempts (default: 3)
 * @returns {Promise<void>}
 * @throws {Error} If all retry attempts fail
 */
export async function sendEmailWithRetry(
  emailData: EmailNotification,
  maxRetries: number = 3
): Promise<void> {
  const transporter = createTransporter();

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Attempt to send email
      await transporter.sendMail({
        from: emailData.from,
        to: emailData.to,
        replyTo: emailData.replyTo,
        subject: emailData.subject,
        html: emailData.html,
        text: emailData.text,
      });

      // Success - log and return
      console.log(`Email sent successfully to ${emailData.to} on attempt ${attempt}`);
      return;
    } catch (error) {
      // Log the error
      console.error(`Email send attempt ${attempt} failed:`, error);

      // If this was the last attempt, throw the error
      if (attempt === maxRetries) {
        console.error(`Failed to send email to ${emailData.to} after ${maxRetries} attempts`);
        throw error;
      }

      // Calculate exponential backoff delay: 1s, 2s, 4s
      const delay = Math.pow(2, attempt - 1) * 1000;
      console.log(`Retrying in ${delay}ms...`);

      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

/**
 * Send Email
 * 
 * Sends an email without retry logic. Use sendEmailWithRetry for production.
 * This function is useful for testing or when retry logic is not needed.
 * 
 * @param {EmailNotification} emailData - Email data to send
 * @returns {Promise<void>}
 * @throws {Error} If email sending fails
 */
export async function sendEmail(emailData: EmailNotification): Promise<void> {
  const transporter = createTransporter();

  try {
    await transporter.sendMail({
      from: emailData.from,
      to: emailData.to,
      replyTo: emailData.replyTo,
      subject: emailData.subject,
      html: emailData.html,
      text: emailData.text,
    });

    console.log(`Email sent successfully to ${emailData.to}`);
  } catch (error) {
    console.error(`Failed to send email to ${emailData.to}:`, error);
    throw error;
  }
}

/**
 * Verify SMTP Connection
 * 
 * Verifies that the SMTP connection can be established with the current configuration.
 * Useful for testing configuration before attempting to send emails.
 * 
 * @returns {Promise<boolean>} True if connection is successful
 */
export async function verifyConnection(): Promise<boolean> {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('SMTP connection verified successfully');
    return true;
  } catch (error) {
    console.error('SMTP connection verification failed:', error);
    return false;
  }
}

/**
 * Send Quote Confirmation Email
 * 
 * Sends a confirmation email to the user after they submit a quote request.
 * Uses the quote confirmation template and includes retry logic.
 * 
 * @param {QuoteFormData} data - Quote form submission data
 * @returns {Promise<void>}
 * @throws {Error} If email sending fails after all retries
 */
export async function sendQuoteConfirmation(data: QuoteFormData): Promise<void> {
  const config = getSMTPConfig();
  const { renderQuoteConfirmation, stripHtml } = await import('./templates');
  
  const html = renderQuoteConfirmation(data);
  const text = stripHtml(html);
  
  const emailData: EmailNotification = {
    from: config.from,
    to: data.email,
    subject: 'Quote Request Received - Academics Consulate',
    html,
    text,
  };
  
  try {
    await sendEmailWithRetry(emailData);
    console.log(`Quote confirmation sent to ${data.email}`);
  } catch (error) {
    console.error(`Failed to send quote confirmation to ${data.email}:`, error);
    throw error;
  }
}

/**
 * Send Quote Notification Email
 * 
 * Sends a notification email to the admin when a quote request is submitted.
 * Uses the quote notification template and includes retry logic.
 * 
 * @param {QuoteFormData} data - Quote form submission data
 * @returns {Promise<void>}
 * @throws {Error} If email sending fails after all retries
 */
export async function sendQuoteNotification(data: QuoteFormData): Promise<void> {
  const config = getSMTPConfig();
  const { renderQuoteNotification, stripHtml } = await import('./templates');
  
  const html = renderQuoteNotification(data);
  const text = stripHtml(html);
  
  const emailData: EmailNotification = {
    from: config.from,
    to: config.adminEmail,
    replyTo: data.email,
    subject: `New Quote Request - ${data.serviceType}`,
    html,
    text,
  };
  
  try {
    await sendEmailWithRetry(emailData);
    console.log(`Quote notification sent to admin (${config.adminEmail})`);
  } catch (error) {
    console.error(`Failed to send quote notification to admin:`, error);
    throw error;
  }
}

/**
 * Send Order Confirmation Email
 * 
 * Sends a confirmation email to the user after they place an order.
 * Uses the order confirmation template and includes retry logic.
 * 
 * @param {OrderFormData} data - Order form submission data
 * @returns {Promise<void>}
 * @throws {Error} If email sending fails after all retries
 */
export async function sendOrderConfirmation(data: OrderFormData): Promise<void> {
  const config = getSMTPConfig();
  const { renderOrderConfirmation, stripHtml } = await import('./templates');
  
  const html = renderOrderConfirmation(data);
  const text = stripHtml(html);
  
  const emailData: EmailNotification = {
    from: config.from,
    to: data.email,
    subject: 'Order Received - Academics Consulate',
    html,
    text,
  };
  
  try {
    await sendEmailWithRetry(emailData);
    console.log(`Order confirmation sent to ${data.email}`);
  } catch (error) {
    console.error(`Failed to send order confirmation to ${data.email}:`, error);
    throw error;
  }
}

/**
 * Send Order Notification Email
 * 
 * Sends a notification email to the admin when an order is placed.
 * Uses the order notification template and includes retry logic.
 * 
 * @param {OrderFormData} data - Order form submission data
 * @returns {Promise<void>}
 * @throws {Error} If email sending fails after all retries
 */
export async function sendOrderNotification(data: OrderFormData): Promise<void> {
  const config = getSMTPConfig();
  const { renderOrderNotification, stripHtml } = await import('./templates');
  
  const html = renderOrderNotification(data);
  const text = stripHtml(html);
  
  const emailData: EmailNotification = {
    from: config.from,
    to: config.adminEmail,
    replyTo: data.email,
    subject: `New Order - ${data.serviceType} - Deadline: ${new Date(data.deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`,
    html,
    text,
  };
  
  try {
    await sendEmailWithRetry(emailData);
    console.log(`Order notification sent to admin (${config.adminEmail})`);
  } catch (error) {
    console.error(`Failed to send order notification to admin:`, error);
    throw error;
  }
}
