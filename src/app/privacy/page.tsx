import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { CONTACT_INFO, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${SITE_CONFIG.name}. Learn how we collect, use, and protect your personal information.`,
  alternates: {
    canonical: "/privacy",
  },
  robots: {
    index: false,
    follow: true,
  },
};

/**
 * Privacy policy page with placeholder content.
 * Requirement: LEGAL-01
 */
export default function PrivacyPage() {
  return (
    <div className="bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-primary-50 py-12 lg:py-16">
        <Container>
          <div className="text-center">
            <h1 className="font-heading text-4xl font-bold text-neutral-900 sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-neutral-600">
              Last updated: January 2026
            </p>
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-section lg:py-section-lg">
        <Container>
          <div className="mx-auto max-w-3xl prose prose-neutral">
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 mb-8">
              <p className="text-sm text-yellow-800 m-0">
                <strong>Note:</strong> This is placeholder content. Please consult with a legal
                professional to ensure your privacy policy meets all applicable legal requirements.
              </p>
            </div>

            <h2>Information We Collect</h2>
            <p>
              When you contact us, book a class, or schedule an appointment, we may collect the
              following information:
            </p>
            <ul>
              <li>Your name and contact details (email address, phone number)</li>
              <li>Your address (for home visits)</li>
              <li>Pregnancy or baby-related information relevant to the services you&apos;re booking</li>
              <li>Payment information (processed securely through our payment provider)</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the information you provide to:</p>
            <ul>
              <li>Respond to your enquiries</li>
              <li>Process bookings and manage appointments</li>
              <li>Provide the services you have requested</li>
              <li>Send you appointment reminders and relevant follow-up information</li>
              <li>Improve our services</li>
            </ul>

            <h2>Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to outside
              parties. We may share limited information with:
            </p>
            <ul>
              <li>Our booking platform provider (to process appointments)</li>
              <li>Our payment processor (to handle transactions securely)</li>
              <li>Professional bodies if required by law or for certification purposes</li>
            </ul>

            <h2>Data Security</h2>
            <p>
              We implement reasonable security measures to protect your personal information.
              However, no method of transmission over the internet or electronic storage is
              100% secure. We strive to use commercially acceptable means to protect your
              information.
            </p>

            <h2>Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to provide our
              services and comply with legal obligations. Health-related records may be kept
              for longer periods as required by professional standards.
            </p>

            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information (subject to legal requirements)</li>
              <li>Opt out of marketing communications</li>
            </ul>

            <h2>Cookies</h2>
            <p>
              Our website may use cookies to enhance your browsing experience. You can set
              your browser to refuse cookies, though this may affect some functionality.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. Any changes will be
              posted on this page with an updated revision date.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions about this privacy policy or wish to exercise your
              rights regarding your personal information, please contact us:
            </p>
            <ul>
              <li>
                Email:{" "}
                <a href={CONTACT_INFO.emailHref}>{CONTACT_INFO.email}</a>
              </li>
              <li>
                Phone:{" "}
                <a href={CONTACT_INFO.phoneHref}>{CONTACT_INFO.phone}</a>
              </li>
              <li>Address: {CONTACT_INFO.address.full}</li>
            </ul>
          </div>
        </Container>
      </section>
    </div>
  );
}
