import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { getServiceBySlug } from "@/data/services";
import { SITE_CONFIG } from "@/lib/constants";
import { notFound } from "next/navigation";

const service = getServiceBySlug("baby-massage");

if (!service) {
  notFound();
}

export const metadata: Metadata = {
  title: `${service.name} | ${SITE_CONFIG.shortName}`,
  description: service.fullDescription,
};

export default function BabyMassagePage() {
  if (!service) {
    notFound();
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-neutral-50 border-b border-neutral-200">
        <Container>
          <nav className="py-3" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link href="/" className="text-neutral-500 hover:text-primary-600">
                  Home
                </Link>
              </li>
              <li className="text-neutral-400">/</li>
              <li>
                <Link href="/services" className="text-neutral-500 hover:text-primary-600">
                  Services
                </Link>
              </li>
              <li className="text-neutral-400">/</li>
              <li className="text-neutral-900 font-medium">{service.name}</li>
            </ol>
          </nav>
        </Container>
      </div>

      {/* Hero */}
      <Section variant="primary">
        <Container>
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            <div>
              <h1 className="font-serif text-4xl font-bold text-neutral-900 sm:text-5xl">
                {service.name}
              </h1>
              <p className="mt-6 text-lg text-neutral-600 leading-relaxed">
                {service.fullDescription}
              </p>
              {service.duration && (
                <p className="mt-4 text-sm text-neutral-500">
                  <strong>Duration:</strong> {service.duration}
                </p>
              )}
            </div>

            {/* Pricing Card */}
            <div className="mt-8 lg:mt-0">
              <div className="rounded-xl bg-white p-8 shadow-lg ring-1 ring-neutral-100">
                <p className="text-sm font-medium text-primary-600 uppercase tracking-wide">
                  Course Fee
                </p>
                <p className="mt-2 text-4xl font-bold text-neutral-900">
                  R{service.pricing.amount.toLocaleString()}
                </p>
                <p className="mt-1 text-neutral-500">{service.pricing.unit}</p>
                <Button href="/schedule" size="lg" className="mt-6 w-full">
                  Book Your Course
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Benefits */}
      <Section>
        <Container>
          <h2 className="font-serif text-3xl font-bold text-neutral-900">
            Benefits of Baby Massage
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-lg bg-neutral-50 p-4"
              >
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-medium text-primary-600">
                  {index + 1}
                </span>
                <p className="text-neutral-700">{benefit}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* What's Included */}
      {service.includes && service.includes.length > 0 && (
        <Section variant="muted">
          <Container>
            <h2 className="font-serif text-3xl font-bold text-neutral-900">
              What&apos;s Included
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {service.includes.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary-500">
                    <svg
                      className="h-3 w-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 12 12"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                  </span>
                  <span className="text-neutral-700">{item}</span>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {/* CTA */}
      <Section variant="primary">
        <Container>
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold text-neutral-900">
              Bond with Your Baby Through Massage
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-neutral-600">
              Learn gentle, nurturing massage techniques that benefit both you and
              your little one. Suitable for babies from 6 weeks to pre-crawling.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button href="/schedule" size="lg">
                Book Your Course
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Ask a Question
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
