import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ServicePageHero } from "@/components/sections/service-page-hero";
import { getServicePageContent, getServiceCategoryBySlug } from "@/data/service-pages";
import { isExpandableService, type ServiceCategory } from "@/data/services";
import { ArrowRight, CheckCircle, MessageCircle } from "lucide-react";

const SLUG = "postnatal-support";

// Soft sky blue gradient
const GRADIENT = "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 25%, #7dd3fc 50%, #38bdf8 75%, #7dd3fc 100%)";

// Humanized "What to Expect" items
const whatToExpect = [
  "A proper check-up for both you and baby - we want to make sure you're both doing okay",
  "Help with feeding, whether that's breastfeeding, bottles, or a bit of both",
  "Someone to answer all those 3am questions (well, during normal hours anyway!)",
  "A listening ear when you need to talk about how you're really feeling",
];

export const metadata: Metadata = {
  title: "Postnatal Support Services",
  description:
    "Home visits, newborn consultations, and postnatal care for mom and baby. Comprehensive support in the early weeks at Tender Touch Clinic.",
  alternates: {
    canonical: `/services/${SLUG}`,
  },
};

export default function PostnatalSupportPage() {
  const pageContent = getServicePageContent(SLUG);
  const category = getServiceCategoryBySlug(SLUG) as ServiceCategory;

  if (!pageContent || !category) {
    notFound();
  }

  return (
    <div className="bg-neutral-50">
      <ServicePageHero
        title={pageContent.title}
        subtitle="Support for you and your baby in those precious early weeks"
        gradient={GRADIENT}
      />

      {/* Introduction */}
      <section className="py-12 lg:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-lg text-neutral-600 leading-relaxed">
              The first weeks with a newborn are wonderful - and also exhausting, overwhelming,
              and full of questions. Whether you need help with feeding, want reassurance that
              everything&apos;s going well, or just need someone experienced to check in on you,
              we&apos;re here. We can come to you or see you at the clinic - whatever works best.
            </p>
          </div>
        </Container>
      </section>

      {/* Services Cards */}
      <section className="bg-white py-12 lg:py-16">
        <Container>
          <h2 className="font-serif text-2xl font-bold text-neutral-900 sm:text-3xl text-center">
            What We Offer
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {category.services.map((service, index) =>
              isExpandableService(service) ? (
                /* Home Visits - Special Card */
                <div
                  key={index}
                  className="flex flex-col rounded-2xl border border-neutral-200 bg-gradient-to-b from-primary-50 to-white p-6 shadow-sm"
                >
                  <h3 className="font-serif text-xl font-semibold text-neutral-900">
                    {service.name}
                  </h3>
                  <p className="mt-3 text-neutral-600 text-sm leading-relaxed flex-grow">
                    {service.content.description}
                  </p>
                  <div className="mt-6 pt-4 border-t border-neutral-100">
                    <p className="text-xs text-neutral-500 mb-2">Pricing varies by provider</p>
                    <div className="space-y-1 text-sm">
                      {service.content.pricing.map((p, i) => (
                        <p key={i} className="text-neutral-600">
                          <span className="font-medium">{p.provider}:</span> {p.details}
                        </p>
                      ))}
                    </div>
                  </div>
                  <Link
                    href="/contact"
                    className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-3 text-white font-medium transition-colors hover:bg-primary-700"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Contact to Book
                  </Link>
                </div>
              ) : (
                /* Regular Bookable Services */
                <div
                  key={index}
                  className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-primary-200 transition-all duration-300"
                >
                  <h3 className="font-serif text-xl font-semibold text-neutral-900">
                    {service.name}
                  </h3>
                  <p className="mt-3 text-neutral-600 text-sm leading-relaxed flex-grow">
                    {service.description}
                  </p>
                  <div className="mt-6 pt-4 border-t border-neutral-100">
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold text-primary-600">
                        {service.price}
                      </span>
                      <span className="text-sm text-neutral-500">
                        {service.duration}
                      </span>
                    </div>
                  </div>
                  <a
                    href={service.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-3 text-white font-medium transition-colors hover:bg-primary-700"
                  >
                    Book Now
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              )
            )}
          </div>
        </Container>
      </section>

      {/* What to Expect */}
      <section className="py-12 lg:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-2xl font-bold text-neutral-900 sm:text-3xl text-center">
              What to Expect
            </h2>
            <ul className="mt-8 space-y-4">
              {whatToExpect.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary-500 shrink-0 mt-0.5" />
                  <span className="text-neutral-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Soft CTA */}
      <section className="bg-sky-50 py-12 lg:py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-2xl font-bold text-neutral-900 sm:text-3xl">
              Need Some Support?
            </h2>
            <p className="mt-4 text-neutral-600">
              Whether you&apos;re not sure what you need, or you&apos;ve got a specific question -
              we&apos;re just a message away.
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-6 py-3 text-white font-medium hover:bg-primary-700 transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
