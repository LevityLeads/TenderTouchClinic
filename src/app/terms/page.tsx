import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { CONTACT_INFO, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${SITE_CONFIG.name}. Read about our booking policies, cancellation terms, and service conditions.`,
  alternates: {
    canonical: "/terms",
  },
  robots: {
    index: false,
    follow: true,
  },
};

/**
 * Terms of service page with placeholder content.
 * Requirement: LEGAL-02
 */
export default function TermsPage() {
  return (
    <div className="bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-primary-50 py-12 lg:py-16">
        <Container>
          <div className="text-center">
            <h1 className="font-heading text-4xl font-bold text-neutral-900 sm:text-5xl">
              Terms of Service
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
                professional to ensure your terms of service meet all applicable legal requirements.
              </p>
            </div>

            <h2>Acceptance of Terms</h2>
            <p>
              By using our services, booking classes, or scheduling appointments at {SITE_CONFIG.name},
              you agree to these terms and conditions. Please read them carefully before proceeding.
            </p>

            <h2>Services Description</h2>
            <p>
              {SITE_CONFIG.name} provides antenatal education, postnatal support, baby massage
              instruction, breastfeeding consultations, and related mother and baby care services.
              Our services are educational and supportive in nature and do not replace medical advice
              or treatment from qualified healthcare providers.
            </p>

            <h2>Booking and Payment</h2>
            <h3>Course Bookings</h3>
            <ul>
              <li>A deposit is required to secure your place in any course</li>
              <li>The full course fee must be paid before the course commences</li>
              <li>Course fees cover both parents/partners where applicable</li>
            </ul>

            <h3>Individual Appointments</h3>
            <ul>
              <li>Individual consultations and home visits are payable on the day of service</li>
              <li>We accept EFT bank transfers and card payments</li>
            </ul>

            <h3>Cancellation Policy</h3>
            <ul>
              <li>
                <strong>Courses:</strong> If you cannot attend your booked course, you may transfer
                to a later course at no extra charge, subject to availability. Refunds are not
                generally available, but we will consider exceptional circumstances.
              </li>
              <li>
                <strong>Individual appointments:</strong> Please give at least 24 hours notice if
                you need to reschedule. Appointments missed without notice may be charged in full.
              </li>
            </ul>

            <h2>Health and Safety</h2>
            <p>
              Please inform us of any relevant health conditions that may affect your participation
              in classes or services. While we take all reasonable precautions to ensure a safe
              environment, participation in classes and services is at your own risk.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              Our services are educational and supportive in nature. We provide information and
              guidance based on current evidence and best practice, but we cannot guarantee specific
              outcomes. {SITE_CONFIG.name} and its practitioners shall not be held liable for any
              injury, loss, or damage arising from the use of our services, except where such
              liability cannot be excluded by law.
            </p>
            <p>
              Nothing in these terms shall limit or exclude our liability for death or personal
              injury caused by negligence, or for fraud or fraudulent misrepresentation.
            </p>

            <h2>Intellectual Property</h2>
            <p>
              All course materials, handouts, and content provided during our services are protected
              by copyright. These materials are for your personal use only and may not be
              reproduced, distributed, or used commercially without our written permission.
            </p>

            <h2>Privacy</h2>
            <p>
              Your privacy is important to us. Please refer to our{" "}
              <a href="/privacy">Privacy Policy</a> for information on how we collect, use, and
              protect your personal data.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to update these terms from time to time. Changes will be
              posted on this page. Continued use of our services after changes are posted
              constitutes acceptance of the modified terms.
            </p>

            <h2>Governing Law</h2>
            <p>
              These terms are governed by and construed in accordance with the laws of South Africa.
            </p>

            <h2>Contact Information</h2>
            <p>
              If you have any questions about these terms, please contact us:
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
