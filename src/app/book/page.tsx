import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { BookemWidget } from "@/components/integrations/bookem-widget";
import { CONTACT_INFO, getWhatsAppUrl, SITE_CONFIG } from "@/lib/constants";
import { Shield, Clock, Award } from "lucide-react";

export const metadata: Metadata = {
  title: `Book an Appointment | ${SITE_CONFIG.shortName}`,
  description:
    "Book your appointment at Tender Touch Mother & Baby Clinic. Schedule antenatal classes, baby massage courses, postnatal support, lactation consultations, and more.",
};

export default function BookPage() {
  return (
    <main>
      {/* Breadcrumb */}
      <div className="border-b border-neutral-200 bg-neutral-50">
        <Container>
          <nav className="py-3" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-neutral-500 hover:text-primary-600"
                >
                  Home
                </Link>
              </li>
              <li className="text-neutral-400">/</li>
              <li className="font-medium text-neutral-900">Book</li>
            </ol>
          </nav>
        </Container>
      </div>

      {/* Hero Section with Trust Indicators */}
      <Section variant="primary">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-display text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
              Book Your Appointment
            </h1>
            <p className="mt-4 text-lg leading-8 text-neutral-700">
              Select a service and time that works for you
            </p>

            {/* Trust Indicators */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-600">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary-600" aria-hidden="true" />
                <span>Secure booking</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary-600" aria-hidden="true" />
                <span>Instant confirmation</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary-600" aria-hidden="true" />
                <span>25+ years experience</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Booking Widget - FIRST for reduced friction */}
      <Section>
        <Container>
          <div className="mx-auto max-w-4xl">
            <BookemWidget />
          </div>
        </Container>
      </Section>

      {/* Helpful Info - Now Secondary */}
      <Section variant="muted">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center font-display text-xl font-bold text-neutral-900 sm:text-2xl">
              Booking Tips
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {/* What you'll need */}
              <div className="rounded-lg border border-neutral-200 bg-white p-5">
                <h3 className="font-semibold text-neutral-900">
                  What to have ready
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                  <li className="flex items-start gap-2">
                    <svg
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Your contact details
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Expected due date (antenatal)
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Baby&apos;s age (baby massage)
                  </li>
                </ul>
              </div>

              {/* Cancellation policy */}
              <div className="rounded-lg border border-neutral-200 bg-white p-5">
                <h3 className="font-semibold text-neutral-900">
                  Need to reschedule?
                </h3>
                <p className="mt-3 text-sm text-neutral-600">
                  Please contact us at least 24 hours in advance. Call{" "}
                  <a
                    href={CONTACT_INFO.phoneHref}
                    className="font-medium text-primary-600 hover:text-primary-700"
                  >
                    {CONTACT_INFO.phone}
                  </a>{" "}
                  or email us to make changes. We&apos;re happy to help!
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Alternative Contact */}
      <Section>
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-xl font-bold text-neutral-900 sm:text-2xl">
              Prefer to book by phone?
            </h2>
            <p className="mt-4 text-neutral-600">
              We&apos;re here to help you find the perfect appointment time.
            </p>
            <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href={CONTACT_INFO.phoneHref}
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-neutral-900 shadow-sm ring-1 ring-neutral-200 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {CONTACT_INFO.phone}
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-[#20BD5A] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
