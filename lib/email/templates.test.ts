/**
 * Email Templates Tests
 * 
 * Unit tests for email template generation functions.
 * Validates that templates render correctly with provided data.
 */

import { describe, it, expect } from 'vitest';
import {
  stripHtml,
  renderQuoteConfirmation,
  renderQuoteNotification,
  renderOrderConfirmation,
  renderOrderNotification,
} from './templates';
import { QuoteFormData, OrderFormData } from '@/types/forms';

describe('Email Templates', () => {
  describe('stripHtml', () => {
    it('should remove HTML tags from content', () => {
      const html = '<p>Hello <strong>World</strong></p>';
      const result = stripHtml(html);
      expect(result).toBe('Hello World');
    });

    it('should remove style tags and content', () => {
      const html = '<style>body { color: red; }</style><p>Content</p>';
      const result = stripHtml(html);
      expect(result).toBe('Content');
    });

    it('should remove script tags and content', () => {
      const html = '<script>alert("test")</script><p>Content</p>';
      const result = stripHtml(html);
      expect(result).toBe('Content');
    });

    it('should decode HTML entities', () => {
      const html = '&lt;div&gt;&amp;&nbsp;&quot;&#39;';
      const result = stripHtml(html);
      expect(result).toBe('<div>& "\'');
    });

    it('should normalize whitespace', () => {
      const html = '<p>Hello    \n\n   World</p>';
      const result = stripHtml(html);
      expect(result).toBe('Hello World');
    });
  });

  describe('renderQuoteConfirmation', () => {
    const mockQuoteData: QuoteFormData = {
      name: 'John Doe',
      email: 'john@example.com',
      serviceType: 'Assignment Writing',
      projectDetails: 'I need help with my computer science assignment on algorithms.',
      timestamp: new Date('2024-01-15T10:30:00Z'),
    };

    it('should render quote confirmation email with user name', () => {
      const html = renderQuoteConfirmation(mockQuoteData);
      expect(html).toContain('Dear John Doe');
    });

    it('should include service type in the email', () => {
      const html = renderQuoteConfirmation(mockQuoteData);
      expect(html).toContain('Assignment Writing');
    });

    it('should include project details in the email', () => {
      const html = renderQuoteConfirmation(mockQuoteData);
      expect(html).toContain('I need help with my computer science assignment on algorithms.');
    });

    it('should include formatted timestamp', () => {
      const html = renderQuoteConfirmation(mockQuoteData);
      expect(html).toContain('2024');
    });

    it('should include call-to-action button', () => {
      const html = renderQuoteConfirmation(mockQuoteData);
      expect(html).toContain('Visit Our Website');
      expect(html).toContain('https://academicsconsulate.com');
    });

    it('should include proper email structure', () => {
      const html = renderQuoteConfirmation(mockQuoteData);
      expect(html).toContain('<!DOCTYPE html>');
      expect(html).toContain('<html');
      expect(html).toContain('</html>');
    });

    it('should include subject line indicator in title', () => {
      const html = renderQuoteConfirmation(mockQuoteData);
      expect(html).toContain('Quote Request Received');
    });
  });

  describe('renderQuoteNotification', () => {
    const mockQuoteData: QuoteFormData = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      serviceType: 'Dissertation Help',
      projectDetails: 'I need assistance with my PhD dissertation on machine learning.',
      timestamp: new Date('2024-01-15T14:45:00Z'),
    };

    it('should render quote notification email with customer name', () => {
      const html = renderQuoteNotification(mockQuoteData);
      expect(html).toContain('Jane Smith');
    });

    it('should include customer email as mailto link', () => {
      const html = renderQuoteNotification(mockQuoteData);
      expect(html).toContain('mailto:jane@example.com');
      expect(html).toContain('jane@example.com');
    });

    it('should include service type', () => {
      const html = renderQuoteNotification(mockQuoteData);
      expect(html).toContain('Dissertation Help');
    });

    it('should include project details', () => {
      const html = renderQuoteNotification(mockQuoteData);
      expect(html).toContain('I need assistance with my PhD dissertation on machine learning.');
    });

    it('should include formatted timestamp', () => {
      const html = renderQuoteNotification(mockQuoteData);
      expect(html).toContain('2024');
    });

    it('should have admin-specific styling', () => {
      const html = renderQuoteNotification(mockQuoteData);
      expect(html).toContain('New Quote Request');
    });

    it('should include response time reminder', () => {
      const html = renderQuoteNotification(mockQuoteData);
      expect(html).toContain('24 hours');
    });
  });

  describe('renderOrderConfirmation', () => {
    const mockOrderData: OrderFormData = {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      serviceType: 'Essay Writing',
      deadline: '2024-02-01',
      requirements: 'I need a 2000-word essay on climate change with at least 10 academic sources.',
      timestamp: new Date('2024-01-15T09:00:00Z'),
    };

    it('should render order confirmation email with user name', () => {
      const html = renderOrderConfirmation(mockOrderData);
      expect(html).toContain('Dear Alice Johnson');
    });

    it('should include service type', () => {
      const html = renderOrderConfirmation(mockOrderData);
      expect(html).toContain('Essay Writing');
    });

    it('should include deadline prominently', () => {
      const html = renderOrderConfirmation(mockOrderData);
      expect(html).toContain('February');
      expect(html).toContain('2024');
    });

    it('should include requirements', () => {
      const html = renderOrderConfirmation(mockOrderData);
      expect(html).toContain('I need a 2000-word essay on climate change');
    });

    it('should include next steps section', () => {
      const html = renderOrderConfirmation(mockOrderData);
      expect(html).toContain('What Happens Next?');
    });

    it('should include success badge', () => {
      const html = renderOrderConfirmation(mockOrderData);
      expect(html).toContain('Order Confirmed');
    });

    it('should include call-to-action button', () => {
      const html = renderOrderConfirmation(mockOrderData);
      expect(html).toContain('Visit Our Website');
    });
  });

  describe('renderOrderNotification', () => {
    const twoDaysFromNow = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
    const mockOrderData: OrderFormData = {
      name: 'Bob Williams',
      email: 'bob@example.com',
      serviceType: 'Research Paper',
      deadline: twoDaysFromNow.toISOString().split('T')[0]!, // 2 days from now
      requirements: 'I need a 5000-word research paper on renewable energy with 20+ citations.',
      timestamp: new Date('2024-01-15T11:20:00Z'),
    };

    it('should render order notification email with customer name', () => {
      const html = renderOrderNotification(mockOrderData);
      expect(html).toContain('Bob Williams');
    });

    it('should include customer email as mailto link', () => {
      const html = renderOrderNotification(mockOrderData);
      expect(html).toContain('mailto:bob@example.com');
    });

    it('should include service type', () => {
      const html = renderOrderNotification(mockOrderData);
      expect(html).toContain('Research Paper');
    });

    it('should include deadline with urgency indicator', () => {
      const html = renderOrderNotification(mockOrderData);
      expect(html).toContain('Deadline');
      expect(html).toContain('days');
    });

    it('should show urgent priority for deadlines within 3 days', () => {
      const twoDaysFromNow = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
      const urgentOrderData = {
        ...mockOrderData,
        deadline: twoDaysFromNow.toISOString().split('T')[0]!,
      };
      const html = renderOrderNotification(urgentOrderData);
      expect(html).toContain('URGENT');
    });

    it('should show high priority for deadlines within 7 days', () => {
      const fiveDaysFromNow = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
      const highPriorityOrderData = {
        ...mockOrderData,
        deadline: fiveDaysFromNow.toISOString().split('T')[0]!,
      };
      const html = renderOrderNotification(highPriorityOrderData);
      expect(html).toContain('High Priority');
    });

    it('should show normal priority for deadlines beyond 7 days', () => {
      const tenDaysFromNow = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000);
      const normalOrderData = {
        ...mockOrderData,
        deadline: tenDaysFromNow.toISOString().split('T')[0]!,
      };
      const html = renderOrderNotification(normalOrderData);
      expect(html).toContain('Normal Priority');
    });

    it('should include requirements', () => {
      const html = renderOrderNotification(mockOrderData);
      expect(html).toContain('I need a 5000-word research paper on renewable energy');
    });

    it('should include response time reminder', () => {
      const html = renderOrderNotification(mockOrderData);
      expect(html).toContain('2 hours');
    });
  });

  describe('Email subject line identification', () => {
    it('should identify quote request in confirmation email', () => {
      const mockQuoteData: QuoteFormData = {
        name: 'Test User',
        email: 'test@example.com',
        serviceType: 'Test Service',
        projectDetails: 'Test details',
        timestamp: new Date(),
      };
      const html = renderQuoteConfirmation(mockQuoteData);
      expect(html).toContain('Quote Request Received');
    });

    it('should identify quote request in notification email', () => {
      const mockQuoteData: QuoteFormData = {
        name: 'Test User',
        email: 'test@example.com',
        serviceType: 'Test Service',
        projectDetails: 'Test details',
        timestamp: new Date(),
      };
      const html = renderQuoteNotification(mockQuoteData);
      expect(html).toContain('New Quote Request');
    });

    it('should identify order in confirmation email', () => {
      const mockOrderData: OrderFormData = {
        name: 'Test User',
        email: 'test@example.com',
        serviceType: 'Test Service',
        deadline: '2024-12-31',
        requirements: 'Test requirements',
        timestamp: new Date(),
      };
      const html = renderOrderConfirmation(mockOrderData);
      expect(html).toContain('Order Received');
    });

    it('should identify order in notification email', () => {
      const mockOrderData: OrderFormData = {
        name: 'Test User',
        email: 'test@example.com',
        serviceType: 'Test Service',
        deadline: '2024-12-31',
        requirements: 'Test requirements',
        timestamp: new Date(),
      };
      const html = renderOrderNotification(mockOrderData);
      expect(html).toContain('New Order');
    });
  });

  describe('Email content completeness', () => {
    it('should include all quote form fields in confirmation email', () => {
      const mockQuoteData: QuoteFormData = {
        name: 'Complete Test',
        email: 'complete@example.com',
        serviceType: 'Complete Service',
        projectDetails: 'Complete project details',
        timestamp: new Date('2024-01-15T10:00:00Z'),
      };
      const html = renderQuoteConfirmation(mockQuoteData);
      
      expect(html).toContain(mockQuoteData.name);
      expect(html).toContain(mockQuoteData.serviceType);
      expect(html).toContain(mockQuoteData.projectDetails);
      expect(html).toContain('2024');
    });

    it('should include all quote form fields in notification email', () => {
      const mockQuoteData: QuoteFormData = {
        name: 'Complete Test',
        email: 'complete@example.com',
        serviceType: 'Complete Service',
        projectDetails: 'Complete project details',
        timestamp: new Date('2024-01-15T10:00:00Z'),
      };
      const html = renderQuoteNotification(mockQuoteData);
      
      expect(html).toContain(mockQuoteData.name);
      expect(html).toContain(mockQuoteData.email);
      expect(html).toContain(mockQuoteData.serviceType);
      expect(html).toContain(mockQuoteData.projectDetails);
      expect(html).toContain('2024');
    });

    it('should include all order form fields in confirmation email', () => {
      const mockOrderData: OrderFormData = {
        name: 'Complete Order',
        email: 'order@example.com',
        serviceType: 'Order Service',
        deadline: '2024-03-15',
        requirements: 'Complete order requirements',
        timestamp: new Date('2024-01-15T10:00:00Z'),
      };
      const html = renderOrderConfirmation(mockOrderData);
      
      expect(html).toContain(mockOrderData.name);
      expect(html).toContain(mockOrderData.serviceType);
      expect(html).toContain('March');
      expect(html).toContain(mockOrderData.requirements);
      expect(html).toContain('2024');
    });

    it('should include all order form fields in notification email', () => {
      const mockOrderData: OrderFormData = {
        name: 'Complete Order',
        email: 'order@example.com',
        serviceType: 'Order Service',
        deadline: '2024-03-15',
        requirements: 'Complete order requirements',
        timestamp: new Date('2024-01-15T10:00:00Z'),
      };
      const html = renderOrderNotification(mockOrderData);
      
      expect(html).toContain(mockOrderData.name);
      expect(html).toContain(mockOrderData.email);
      expect(html).toContain(mockOrderData.serviceType);
      expect(html).toContain('March');
      expect(html).toContain(mockOrderData.requirements);
      expect(html).toContain('2024');
    });
  });
});
