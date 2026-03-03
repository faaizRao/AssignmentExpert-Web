import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  it('should render the footer component', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('should display the logo', () => {
    render(<Footer />);
    const logo = screen.getByAltText('Academics Consulate Logo');
    expect(logo).toBeInTheDocument();
  });

  it('should display contact email with mailto link', () => {
    render(<Footer />);
    const emailLink = screen.getByRole('link', { name: /contact@academicsconsulate.com/i });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:contact@academicsconsulate.com');
  });

  it('should display phone number with tel link', () => {
    render(<Footer />);
    const phoneLink = screen.getByRole('link', { name: /\+44 123 456 7890/i });
    expect(phoneLink).toBeInTheDocument();
    expect(phoneLink).toHaveAttribute('href', 'tel:+441234567890');
  });

  it('should display business hours', () => {
    render(<Footer />);
    expect(screen.getByText('Business Hours')).toBeInTheDocument();
    expect(screen.getByText('Mon-Fri: 9:00 AM - 6:00 PM')).toBeInTheDocument();
    expect(screen.getByText('Sat-Sun: 10:00 AM - 4:00 PM')).toBeInTheDocument();
  });

  it('should display copyright notice with current year', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${currentYear} Academics Consulate. All rights reserved.`))).toBeInTheDocument();
  });

  it('should display quick links navigation', () => {
    render(<Footer />);
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Services' })).toHaveAttribute('href', '/services');
    expect(screen.getByRole('link', { name: 'Get Quote' })).toHaveAttribute('href', '/quote');
    expect(screen.getByRole('link', { name: 'Place Order' })).toHaveAttribute('href', '/order');
  });

  it('should display popular services links', () => {
    render(<Footer />);
    expect(screen.getByText('Popular Services')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Assignment Writing' })).toHaveAttribute('href', '/services/assignment-writing');
    expect(screen.getByRole('link', { name: 'Dissertation Writing' })).toHaveAttribute('href', '/services/dissertation-writing');
    expect(screen.getByRole('link', { name: 'Proofreading' })).toHaveAttribute('href', '/services/proofreading');
    expect(screen.getByRole('link', { name: 'CV Writing' })).toHaveAttribute('href', '/services/cv-writing');
  });

  it('should display social media links', () => {
    render(<Footer />);
    const facebookLink = screen.getByLabelText('Facebook');
    const twitterLink = screen.getByLabelText('Twitter');
    const linkedinLink = screen.getByLabelText('LinkedIn');
    const instagramLink = screen.getByLabelText('Instagram');

    expect(facebookLink).toBeInTheDocument();
    expect(facebookLink).toHaveAttribute('href', 'https://facebook.com');
    expect(facebookLink).toHaveAttribute('target', '_blank');
    expect(facebookLink).toHaveAttribute('rel', 'noopener noreferrer');

    expect(twitterLink).toBeInTheDocument();
    expect(twitterLink).toHaveAttribute('href', 'https://twitter.com');

    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com');

    expect(instagramLink).toBeInTheDocument();
    expect(instagramLink).toHaveAttribute('href', 'https://instagram.com');
  });

  it('should have proper accessibility attributes for external links', () => {
    render(<Footer />);
    const externalLinks = screen.getAllByRole('link', { name: /Facebook|Twitter|LinkedIn|Instagram/i });
    
    externalLinks.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('should display contact section heading', () => {
    render(<Footer />);
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });

  it('should have hover effects on links', () => {
    render(<Footer />);
    const emailLink = screen.getByRole('link', { name: /contact@academicsconsulate.com/i });
    expect(emailLink).toHaveClass('hover:text-primary-400');
  });

  it('should render all required sections', () => {
    render(<Footer />);
    
    // Check for all main sections
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    expect(screen.getByText('Popular Services')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });

  it('should display company description', () => {
    render(<Footer />);
    expect(screen.getByText(/Professional academic writing, editing, and research services/i)).toBeInTheDocument();
  });
});
