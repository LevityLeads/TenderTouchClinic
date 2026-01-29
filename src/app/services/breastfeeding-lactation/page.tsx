import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ServicePageHero } from "@/components/sections/service-page-hero";
import { getServicePageContent, getServiceCategoryBySlug } from "@/data/service-pages";
import { isExpandableService, type ServiceCategory } from "@/data/services";
import { ArrowRight, CheckCircle } from "lucide-react";

const SLUG = "breastfeeding-lactation";

export const metadata: Metadata = {
  title: "Breastfeeding & Lactation Support",
  description:
    "Expert breastfeeding consultations and lactation support from experienced professionals including SACLC-certified consultants at Tender Touch Clinic.",
  alternates: {
    canonical: `/services/${SLUG}`,
  },
};

export default function BreastfeedingLactationPage() {
  const pageContent = getServicePageContent(SLUG);
  const category = getServiceCategoryBySlug(SLUG) as ServiceCategory;

  if (!pageContent || !category) {
    notFound();
  }

  return (
    <div className="bg-neutral-50">
      <ServicePageHero
        title={pageContent.title}
        subtitle={pageContent.subtitle}
        heroImage={pageContent.heroImage}
        heroVideo={pageContent.heroVideo}
      />

      {/* Introduction */}
      <section className="py-12 lg:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-lg text-neutral-600 leading-relaxed">
              {pageContent.introduction}
            </p>
          </div>
        </Container>
      </section>

      {/* Services Cards */}
      <section className="bg-white py-12 lg:py-16">
        <Container>
          <h2 className="font-serif text-2xl font-bold text-neutral-900 sm:text-3xl text-center">
            Our Services
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {category.services.map((service, index) =>
              isExpandableService(service) ? null : (
                <div
                  key={index}
                  className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-primary-200 transition-all duration-300"
                >
                  {/* Service Name */}
                  <h3 className="font-serif text-xl font-semibold text-neutral-900">
                    {service.name}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-neutral-600 text-sm leading-relaxed flex-grow">
                    {service.description}
                  </p>

                  {/* Price & Duration */}
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

                  {/* Book Button */}
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
              {pageContent.whatToExpect.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary-500 shrink-0 mt-0.5" />
                  <span className="text-neutral-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      {pageContent.whyChooseUs && (
        <section className="bg-primary-50 py-12 lg:py-16">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-serif text-2xl font-bold text-neutral-900 sm:text-3xl">
                Why Choose Tender Touch
              </h2>
              <ul className="mt-8 space-y-3">
                {pageContent.whyChooseUs.map((item, index) => (
                  <li key={index} className="text-neutral-600">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="bg-primary-600 py-12 lg:py-16">
        <Container>
          <div className="text-center">
            <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">
              Need Breastfeeding Support?
            </h2>
            <p className="mt-4 text-primary-100">
              You don&apos;t have to figure it out alone. Book a consultation with our experts.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/book" variant="secondary" size="lg">
                Book Online
              </Button>
              <Button href="/contact" variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Contact Us
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
