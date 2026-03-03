import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Academics Consulate - Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-neutral-900 mb-6">
            Privacy Policy
          </h1>
          
          <p className="text-neutral-600 mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-4">
                1. Introduction
              </h2>
              <p className="text-neutral-700 mb-4">
                Welcome to Academics Consulate. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy will inform you about how we look after your personal data when you visit our website 
                and tell you about your privacy rights and how the law protects you.
              </p>
            </section>

            {/* Data Collection */}
            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-4">
                2. Data We Collect
              </h2>
              <p className="text-neutral-700 mb-4">
                We may collect, use, store and transfer different kinds of personal data about you:
              </p>
              <ul className="list-disc pl-6 mb-4 text-neutral-700 space-y-2">
                <li>
                  <strong>Identity Data:</strong> includes first name, last name, username or similar identifier.
                </li>
                <li>
                  <strong>Contact Data:</strong> includes email address, telephone numbers, and mailing address.
                </li>
                <li>
                  <strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, 
                  time zone setting and location, browser plug-in types and versions, operating system and platform.
                </li>
                <li>
                  <strong>Usage Data:</strong> includes information about how you use our website and services.
                </li>
                <li>
                  <strong>Project Data:</strong> includes details about your academic projects, requirements, and preferences.
                </li>
              </ul>
            </section>

            {/* How We Use Data */}
            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-4">
                3. How We Use Your Data
              </h2>
              <p className="text-neutral-700 mb-4">
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data:
              </p>
              <ul className="list-disc pl-6 mb-4 text-neutral-700 space-y-2">
                <li>To provide and deliver the academic services you have requested</li>
                <li>To process and complete your orders and quotes</li>
                <li>To communicate with you about your projects and services</li>
                <li>To improve our website, services, and customer experience</li>
                <li>To send you marketing communications (with your consent)</li>
                <li>To comply with legal obligations and protect our legal rights</li>
              </ul>
            </section>

            {/* Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-4">
                4. Cookies
              </h2>
              <p className="text-neutral-700 mb-4">
                Our website uses cookies to distinguish you from other users. This helps us provide you with a good 
                experience when you browse our website and allows us to improve our site. Cookies are small text files 
                that are placed on your computer or mobile device when you visit our website.
              </p>
              <p className="text-neutral-700 mb-4">
                We use the following types of cookies:
              </p>
              <ul className="list-disc pl-6 mb-4 text-neutral-700 space-y-2">
                <li>
                  <strong>Strictly necessary cookies:</strong> These are required for the operation of our website.
                </li>
                <li>
                  <strong>Analytical/performance cookies:</strong> These allow us to recognize and count visitors and 
                  see how visitors move around our website.
                </li>
                <li>
                  <strong>Functionality cookies:</strong> These are used to recognize you when you return to our website.
                </li>
              </ul>
            </section>

            {/* Third-Party Services */}
            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-4">
                5. Third-Party Services
              </h2>
              <p className="text-neutral-700 mb-4">
                We may share your personal data with third-party service providers who perform services on our behalf, including:
              </p>
              <ul className="list-disc pl-6 mb-4 text-neutral-700 space-y-2">
                <li>Email service providers for sending communications</li>
                <li>Payment processors for handling transactions</li>
                <li>Analytics providers to help us understand website usage</li>
                <li>Cloud storage providers for data hosting</li>
              </ul>
              <p className="text-neutral-700 mb-4">
                We require all third parties to respect the security of your personal data and to treat it in accordance 
                with the law. We do not allow our third-party service providers to use your personal data for their own 
                purposes and only permit them to process your personal data for specified purposes and in accordance with 
                our instructions.
              </p>
            </section>

            {/* Data Security */}
            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-4">
                6. Data Security
              </h2>
              <p className="text-neutral-700 mb-4">
                We have put in place appropriate security measures to prevent your personal data from being accidentally 
                lost, used, or accessed in an unauthorized way, altered, or disclosed. We limit access to your personal 
                data to those employees, agents, contractors, and other third parties who have a business need to know.
              </p>
              <p className="text-neutral-700 mb-4">
                We have put in place procedures to deal with any suspected personal data breach and will notify you and 
                any applicable regulator of a breach where we are legally required to do so.
              </p>
            </section>

            {/* Data Retention */}
            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-4">
                7. Data Retention
              </h2>
              <p className="text-neutral-700 mb-4">
                We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, 
                including for the purposes of satisfying any legal, accounting, or reporting requirements.
              </p>
              <p className="text-neutral-700 mb-4">
                To determine the appropriate retention period for personal data, we consider the amount, nature, and 
                sensitivity of the personal data, the potential risk of harm from unauthorized use or disclosure, the 
                purposes for which we process your personal data, and applicable legal requirements.
              </p>
            </section>

            {/* Your Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-4">
                8. Your Legal Rights
              </h2>
              <p className="text-neutral-700 mb-4">
                Under certain circumstances, you have rights under data protection laws in relation to your personal data:
              </p>
              <ul className="list-disc pl-6 mb-4 text-neutral-700 space-y-2">
                <li>
                  <strong>Right to access:</strong> You have the right to request access to your personal data.
                </li>
                <li>
                  <strong>Right to correction:</strong> You have the right to request correction of inaccurate personal data.
                </li>
                <li>
                  <strong>Right to erasure:</strong> You have the right to request deletion of your personal data.
                </li>
                <li>
                  <strong>Right to object:</strong> You have the right to object to processing of your personal data.
                </li>
                <li>
                  <strong>Right to data portability:</strong> You have the right to request transfer of your personal data.
                </li>
                <li>
                  <strong>Right to withdraw consent:</strong> You have the right to withdraw consent at any time.
                </li>
              </ul>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-4">
                9. Contact Us
              </h2>
              <p className="text-neutral-700 mb-4">
                If you have any questions about this privacy policy or our privacy practices, please contact us:
              </p>
              <div className="bg-neutral-50 p-6 rounded-lg">
                <p className="text-neutral-700 mb-2">
                  <strong>Email:</strong>{' '}
                  <a href="mailto:privacy@academicsconsulate.com" className="text-primary-600 hover:text-primary-700">
                    privacy@academicsconsulate.com
                  </a>
                </p>
                <p className="text-neutral-700 mb-2">
                  <strong>Phone:</strong>{' '}
                  <a href="tel:+441234567890" className="text-primary-600 hover:text-primary-700">
                    +44 123 456 7890
                  </a>
                </p>
                <p className="text-neutral-700">
                  <strong>Address:</strong> Academics Consulate, London, United Kingdom
                </p>
              </div>
            </section>

            {/* Changes to Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-4">
                10. Changes to This Privacy Policy
              </h2>
              <p className="text-neutral-700 mb-4">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new 
                privacy policy on this page and updating the "Last updated" date at the top of this privacy policy.
              </p>
              <p className="text-neutral-700 mb-4">
                You are advised to review this privacy policy periodically for any changes. Changes to this privacy policy 
                are effective when they are posted on this page.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
