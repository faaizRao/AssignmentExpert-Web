/**
 * Email Templates
 * 
 * HTML email templates for user confirmations and admin notifications.
 * Templates are designed to be email-client compatible with inline styles.
 */

import { QuoteFormData, OrderFormData } from '@/types/forms';

/**
 * Strip HTML Tags
 * 
 * Converts HTML content to plain text by removing HTML tags.
 * Used to generate plain text fallback for email clients.
 * 
 * @param {string} html - HTML content to convert
 * @returns {string} Plain text content
 */
export function stripHtml(html: string): string {
  return html
    .replace(/<style[^>]*>.*?<\/style>/gi, '')
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Format Date
 * 
 * Formats a Date object to a readable string.
 * 
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string
 */
function formatDate(date: Date): string {
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });
}

/**
 * Quote Confirmation Template (User)
 * 
 * Email template sent to users confirming their quote request.
 * 
 * @param {QuoteFormData} data - Quote form submission data
 * @returns {string} HTML email content
 */
export function renderQuoteConfirmation(data: QuoteFormData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quote Request Received</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, Helvetica, sans-serif;
      line-height: 1.6;
      color: #333333;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background-color: #0ea5e9;
      color: #ffffff;
      padding: 30px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: bold;
    }
    .content {
      padding: 30px 20px;
      background-color: #f9fafb;
    }
    .content p {
      margin: 0 0 15px 0;
      color: #374151;
    }
    .details-box {
      background-color: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .details-box h2 {
      margin: 0 0 15px 0;
      font-size: 18px;
      color: #0ea5e9;
    }
    .detail-item {
      margin-bottom: 12px;
    }
    .detail-label {
      font-weight: bold;
      color: #1f2937;
      display: inline-block;
      min-width: 120px;
    }
    .detail-value {
      color: #4b5563;
    }
    .button-container {
      text-align: center;
      margin: 30px 0;
    }
    .button {
      display: inline-block;
      padding: 14px 32px;
      background-color: #0ea5e9;
      color: #ffffff;
      text-decoration: none;
      border-radius: 6px;
      font-weight: bold;
      font-size: 16px;
    }
    .footer {
      padding: 20px;
      text-align: center;
      background-color: #f3f4f6;
      border-top: 1px solid #e5e7eb;
    }
    .footer p {
      margin: 5px 0;
      font-size: 13px;
      color: #6b7280;
    }
    .footer-brand {
      font-weight: bold;
      color: #0ea5e9;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Quote Request Received</h1>
    </div>
    <div class="content">
      <p>Dear ${data.name},</p>
      <p>Thank you for your interest in Academics Consulate. We have received your quote request for <strong>${data.serviceType}</strong>.</p>
      
      <div class="details-box">
        <h2>Your Request Details</h2>
        <div class="detail-item">
          <span class="detail-label">Service:</span>
          <span class="detail-value">${data.serviceType}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Project Details:</span>
          <div class="detail-value" style="margin-top: 8px; white-space: pre-wrap;">${data.projectDetails}</div>
        </div>
        <div class="detail-item">
          <span class="detail-label">Submitted:</span>
          <span class="detail-value">${formatDate(data.timestamp)}</span>
        </div>
      </div>
      
      <p>Our team will review your request and respond within 24 hours with a detailed quote tailored to your specific needs.</p>
      
      <p>If you have any questions in the meantime, please don't hesitate to reach out to us.</p>
      
      <div class="button-container">
        <a href="https://academicsconsulate.com" class="button">Visit Our Website</a>
      </div>
    </div>
    <div class="footer">
      <p class="footer-brand">Academics Consulate</p>
      <p>Professional Academic Services</p>
      <p>This is an automated message. Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Quote Notification Template (Admin)
 * 
 * Email template sent to admin when a quote request is submitted.
 * 
 * @param {QuoteFormData} data - Quote form submission data
 * @returns {string} HTML email content
 */
export function renderQuoteNotification(data: QuoteFormData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Quote Request</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, Helvetica, sans-serif;
      line-height: 1.6;
      color: #333333;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background-color: #0369a1;
      color: #ffffff;
      padding: 25px 20px;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: bold;
    }
    .header .subtitle {
      margin: 5px 0 0 0;
      font-size: 14px;
      opacity: 0.9;
    }
    .content {
      padding: 30px 20px;
      background-color: #ffffff;
      border-left: 1px solid #e5e7eb;
      border-right: 1px solid #e5e7eb;
    }
    .field {
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #f3f4f6;
    }
    .field:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }
    .label {
      font-weight: bold;
      color: #0369a1;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: block;
      margin-bottom: 8px;
    }
    .value {
      color: #1f2937;
      font-size: 15px;
    }
    .value a {
      color: #0ea5e9;
      text-decoration: none;
    }
    .value a:hover {
      text-decoration: underline;
    }
    .project-details {
      background-color: #f9fafb;
      padding: 15px;
      border-radius: 6px;
      border-left: 4px solid #0ea5e9;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    .footer {
      padding: 20px;
      text-align: center;
      background-color: #f3f4f6;
      border-top: 1px solid #e5e7eb;
    }
    .footer p {
      margin: 5px 0;
      font-size: 13px;
      color: #6b7280;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Quote Request</h1>
      <p class="subtitle">A new customer has requested a quote</p>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">Customer Name</span>
        <div class="value">${data.name}</div>
      </div>
      
      <div class="field">
        <span class="label">Email Address</span>
        <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
      </div>
      
      <div class="field">
        <span class="label">Service Type</span>
        <div class="value">${data.serviceType}</div>
      </div>
      
      <div class="field">
        <span class="label">Project Details</span>
        <div class="value">
          <div class="project-details">${data.projectDetails}</div>
        </div>
      </div>
      
      <div class="field">
        <span class="label">Submitted</span>
        <div class="value">${formatDate(data.timestamp)}</div>
      </div>
    </div>
    <div class="footer">
      <p>Academics Consulate Admin Notification</p>
      <p>Please respond to the customer within 24 hours</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Order Confirmation Template (User)
 * 
 * Email template sent to users confirming their order placement.
 * 
 * @param {OrderFormData} data - Order form submission data
 * @returns {string} HTML email content
 */
export function renderOrderConfirmation(data: OrderFormData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Received</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, Helvetica, sans-serif;
      line-height: 1.6;
      color: #333333;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background: linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%);
      color: #ffffff;
      padding: 30px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: bold;
    }
    .header .subtitle {
      margin: 10px 0 0 0;
      font-size: 16px;
      opacity: 0.95;
    }
    .content {
      padding: 30px 20px;
      background-color: #f9fafb;
    }
    .content p {
      margin: 0 0 15px 0;
      color: #374151;
    }
    .success-badge {
      background-color: #10b981;
      color: #ffffff;
      padding: 8px 16px;
      border-radius: 20px;
      display: inline-block;
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .details-box {
      background-color: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .details-box h2 {
      margin: 0 0 15px 0;
      font-size: 18px;
      color: #0ea5e9;
    }
    .detail-item {
      margin-bottom: 12px;
    }
    .detail-label {
      font-weight: bold;
      color: #1f2937;
      display: inline-block;
      min-width: 120px;
    }
    .detail-value {
      color: #4b5563;
    }
    .deadline-highlight {
      background-color: #fef3c7;
      border: 2px solid #f59e0b;
      border-radius: 8px;
      padding: 15px;
      margin: 20px 0;
      text-align: center;
    }
    .deadline-highlight .label {
      font-size: 14px;
      color: #92400e;
      margin-bottom: 5px;
    }
    .deadline-highlight .value {
      font-size: 20px;
      font-weight: bold;
      color: #b45309;
    }
    .requirements-box {
      background-color: #f9fafb;
      padding: 15px;
      border-radius: 6px;
      border-left: 4px solid #0ea5e9;
      white-space: pre-wrap;
      word-wrap: break-word;
      margin-top: 8px;
    }
    .next-steps {
      background-color: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .next-steps h3 {
      margin: 0 0 15px 0;
      font-size: 16px;
      color: #1e40af;
    }
    .next-steps ol {
      margin: 0;
      padding-left: 20px;
      color: #1e3a8a;
    }
    .next-steps li {
      margin-bottom: 8px;
    }
    .button-container {
      text-align: center;
      margin: 30px 0;
    }
    .button {
      display: inline-block;
      padding: 14px 32px;
      background-color: #0ea5e9;
      color: #ffffff;
      text-decoration: none;
      border-radius: 6px;
      font-weight: bold;
      font-size: 16px;
    }
    .footer {
      padding: 20px;
      text-align: center;
      background-color: #f3f4f6;
      border-top: 1px solid #e5e7eb;
    }
    .footer p {
      margin: 5px 0;
      font-size: 13px;
      color: #6b7280;
    }
    .footer-brand {
      font-weight: bold;
      color: #0ea5e9;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Order Received!</h1>
      <p class="subtitle">Thank you for choosing Academics Consulate</p>
    </div>
    <div class="content">
      <div style="text-align: center;">
        <span class="success-badge">✓ Order Confirmed</span>
      </div>
      
      <p>Dear ${data.name},</p>
      <p>We have successfully received your order for <strong>${data.serviceType}</strong>. Our team is now reviewing your requirements and will begin working on your project shortly.</p>
      
      <div class="deadline-highlight">
        <div class="label">Project Deadline</div>
        <div class="value">${new Date(data.deadline).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}</div>
      </div>
      
      <div class="details-box">
        <h2>Order Details</h2>
        <div class="detail-item">
          <span class="detail-label">Service:</span>
          <span class="detail-value">${data.serviceType}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Deadline:</span>
          <span class="detail-value">${new Date(data.deadline).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Requirements:</span>
          <div class="requirements-box">${data.requirements}</div>
        </div>
        <div class="detail-item">
          <span class="detail-label">Submitted:</span>
          <span class="detail-value">${formatDate(data.timestamp)}</span>
        </div>
      </div>
      
      <div class="next-steps">
        <h3>What Happens Next?</h3>
        <ol>
          <li>Our team will review your requirements within 2 hours</li>
          <li>We'll send you a confirmation email with project details and payment information</li>
          <li>Once payment is confirmed, we'll begin working on your project</li>
          <li>You'll receive regular updates on the progress</li>
          <li>Your completed work will be delivered before the deadline</li>
        </ol>
      </div>
      
      <p>If you have any questions or need to provide additional information, please don't hesitate to contact us.</p>
      
      <div class="button-container">
        <a href="https://academicsconsulate.com" class="button">Visit Our Website</a>
      </div>
    </div>
    <div class="footer">
      <p class="footer-brand">Academics Consulate</p>
      <p>Professional Academic Services</p>
      <p>This is an automated message. Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Order Notification Template (Admin)
 * 
 * Email template sent to admin when an order is placed.
 * 
 * @param {OrderFormData} data - Order form submission data
 * @returns {string} HTML email content
 */
export function renderOrderNotification(data: OrderFormData): string {
  const deadline = new Date(data.deadline);
  const now = new Date();
  const daysUntilDeadline = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  // Determine urgency level
  let urgencyClass = 'normal';
  let urgencyLabel = 'Normal Priority';
  if (daysUntilDeadline <= 3) {
    urgencyClass = 'urgent';
    urgencyLabel = 'URGENT - ' + daysUntilDeadline + ' days';
  } else if (daysUntilDeadline <= 7) {
    urgencyClass = 'high';
    urgencyLabel = 'High Priority - ' + daysUntilDeadline + ' days';
  }
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Order</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, Helvetica, sans-serif;
      line-height: 1.6;
      color: #333333;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background-color: #0369a1;
      color: #ffffff;
      padding: 25px 20px;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: bold;
    }
    .header .subtitle {
      margin: 5px 0 0 0;
      font-size: 14px;
      opacity: 0.9;
    }
    .urgency-banner {
      padding: 15px 20px;
      text-align: center;
      font-weight: bold;
      font-size: 16px;
    }
    .urgency-banner.urgent {
      background-color: #dc2626;
      color: #ffffff;
    }
    .urgency-banner.high {
      background-color: #f59e0b;
      color: #ffffff;
    }
    .urgency-banner.normal {
      background-color: #10b981;
      color: #ffffff;
    }
    .content {
      padding: 30px 20px;
      background-color: #ffffff;
      border-left: 1px solid #e5e7eb;
      border-right: 1px solid #e5e7eb;
    }
    .field {
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #f3f4f6;
    }
    .field:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }
    .label {
      font-weight: bold;
      color: #0369a1;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: block;
      margin-bottom: 8px;
    }
    .value {
      color: #1f2937;
      font-size: 15px;
    }
    .value a {
      color: #0ea5e9;
      text-decoration: none;
    }
    .value a:hover {
      text-decoration: underline;
    }
    .deadline-box {
      background-color: #fef3c7;
      border: 2px solid #f59e0b;
      border-radius: 8px;
      padding: 15px;
      text-align: center;
    }
    .deadline-box .label {
      color: #92400e;
      font-size: 14px;
      margin-bottom: 5px;
    }
    .deadline-box .value {
      font-size: 20px;
      font-weight: bold;
      color: #b45309;
    }
    .requirements-box {
      background-color: #f9fafb;
      padding: 15px;
      border-radius: 6px;
      border-left: 4px solid #0ea5e9;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    .footer {
      padding: 20px;
      text-align: center;
      background-color: #f3f4f6;
      border-top: 1px solid #e5e7eb;
    }
    .footer p {
      margin: 5px 0;
      font-size: 13px;
      color: #6b7280;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Order Received</h1>
      <p class="subtitle">A new customer has placed an order</p>
    </div>
    
    <div class="urgency-banner ${urgencyClass}">
      ${urgencyLabel}
    </div>
    
    <div class="content">
      <div class="field">
        <span class="label">Customer Name</span>
        <div class="value">${data.name}</div>
      </div>
      
      <div class="field">
        <span class="label">Email Address</span>
        <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
      </div>
      
      <div class="field">
        <span class="label">Service Type</span>
        <div class="value">${data.serviceType}</div>
      </div>
      
      <div class="field">
        <span class="label">Deadline</span>
        <div class="deadline-box">
          <div class="label">Project must be completed by</div>
          <div class="value">${deadline.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</div>
          <div style="margin-top: 8px; font-size: 14px; color: #92400e;">
            (${daysUntilDeadline} days from now)
          </div>
        </div>
      </div>
      
      <div class="field">
        <span class="label">Requirements</span>
        <div class="value">
          <div class="requirements-box">${data.requirements}</div>
        </div>
      </div>
      
      <div class="field">
        <span class="label">Submitted</span>
        <div class="value">${formatDate(data.timestamp)}</div>
      </div>
    </div>
    <div class="footer">
      <p>Academics Consulate Admin Notification</p>
      <p>Please review and respond to the customer within 2 hours</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}
