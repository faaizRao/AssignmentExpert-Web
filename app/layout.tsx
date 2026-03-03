import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/Footer";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

// Font optimization with next/font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

// Comprehensive metadata configuration for SEO
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Academics Consulate - Professional Academic Services',
    template: '%s | Academics Consulate',
  },
  description: 'Professional academic writing, editing, and research services for students. Expert assistance with assignments, dissertations, coursework, and more.',
  keywords: ['academic writing', 'dissertation help', 'assignment writing', 'proofreading', 'CV writing', 'academic services', 'coursework help', 'research papers'],
  authors: [{ name: 'Academics Consulate' }],
  creator: 'Academics Consulate',
  publisher: 'Academics Consulate',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Academics Consulate',
    title: 'Academics Consulate - Professional Academic Services',
    description: 'Professional academic writing, editing, and research services for students.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Academics Consulate - Professional Academic Services',
    description: 'Professional academic writing, editing, and research services for students.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/assignmenticon.png',
    shortcut: '/assignmenticon.png',
    apple: '/assignmenticon.png',
  },
};

// Organization structured data schema for SEO
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Academics Consulate',
  description: 'Professional academic writing, editing, and research services for students',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/assignmentlogo.jpeg`,
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'contact@academicsconsulate.com',
    contactType: 'Customer Service',
  },
  sameAs: [
    'https://facebook.com',
    'https://twitter.com',
    'https://linkedin.com',
    'https://instagram.com',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* Organization structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="antialiased font-sans">
        <ErrorBoundary>
          {/* Skip to content link for keyboard navigation */}
          <a href="#main-content" className="skip-to-content">
            Skip to main content
          </a>
          <Header />
          <main id="main-content" className="min-h-screen pt-16 md:pt-20">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </ErrorBoundary>
      </body>
    </html>
  );
}
