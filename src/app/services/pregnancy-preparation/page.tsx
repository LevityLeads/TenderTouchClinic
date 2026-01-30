import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { getServicePageContent, getServiceCategoryBySlug } from "@/data/service-pages";
import { isExpandableService, type ServiceCategory } from "@/data/services";
import { ArrowRight, CheckCircle } from "lucide-react";

const SLUG = "pregnancy-preparation";

// Humanized "What to Expect" items
const whatToExpect = [
  "A relaxed space to ask all your questions - no question is too small or silly",
  "Practical tips you can actually use when the big day comes",
  "Time to connect with other expecting parents (in our group classes)",
  "Honest, evidence-based information without the overwhelm",
];

export const metadata: Metadata = {
  title: "Pregnancy & Preparation Services",
  description:
    "Antenatal consultations, parent preparation classes, and pregnancy vaccines. Expert guidance to prepare you for parenthood at Tender Touch Clinic.",
  alternates: {
    canonical: `/services/${SLUG}`,
  },
};

export default function PregnancyPreparationPage() {
  const pageContent = getServicePageContent(SLUG);
  const category = getServiceCategoryBySlug(SLUG) as ServiceCategory;

  if (!pageContent || !category) {
    notFound();
  }

  return (
    <div className="bg-neutral-50">
      {/* Hero with centered background illustration */}
      <section className="relative overflow-hidden">
        {/* Background image - centered */}
        <div className="absolute inset-0">
          <Image
            src="/images/pregnancy.png"
            alt=""
            fill
            className="object-contain object-center"
            priority
            sizes="100vw"
            quality={100}
            unoptimized
          />
        </div>

        {/* Content overlay */}
        <Container className="relative z-10">
          <div className="py-16 sm:py-20 lg:py-24 text-center">
            <h1 className="font-serif text-3xl font-bold text-neutral-800 sm:text-4xl lg:text-5xl">
              {pageContent.title}
            </h1>
            <p className="mt-4 max-w-xl mx-auto text-base text-neutral-600 sm:text-lg">
              Getting ready for the adventure ahead
            </p>
          </div>
        </Container>
      </section>

      {/* Introduction */}
      <section className="py-12 lg:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-lg text-neutral-600 leading-relaxed">
              Preparing for a baby can feel like there&apos;s so much to learn. Our classes and
              consultations are designed to help you feel confident and ready - without the
              information overload. We cover the practical stuff, answer your questions, and
              help you feel prepared for birth and those first weeks at home.
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
              isExpandableService(service) ? null : (
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
      <section className="bg-emerald-50 py-12 lg:py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-2xl font-bold text-neutral-900 sm:text-3xl">
              Questions?
            </h2>
            <p className="mt-4 text-neutral-600">
              Not sure which class or consultation is right for you? Drop us a message
              and we&apos;ll help you figure it out.
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
