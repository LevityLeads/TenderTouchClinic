import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ServicePageHero } from "@/components/sections/service-page-hero";
import { getServicePageContent, getServiceCategoryBySlug } from "@/data/service-pages";
import { isExpandableService, type ServiceCategory } from "@/data/services";
import { getFeaturedTestimonialForService } from "@/data/testimonials";
import { ArrowRight, CheckCircle, Quote } from "lucide-react";

const SLUG = "pregnancy-preparation";

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
  const testimonial = getFeaturedTestimonialForService(SLUG);

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
          <div className="mt-10 grid gap-6 md:grid-cols-3">
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

      {/* Testimonial */}
      {testimonial && (
        <section className="py-12 lg:py-16 bg-rose-50">
          <Container>
            <div className="mx-auto max-w-3xl">
              <div className="relative rounded-2xl bg-white p-8 shadow-sm">
                <Quote className="absolute top-6 left-6 h-8 w-8 text-rose-200" aria-hidden="true" />
                <div className="relative">
                  <blockquote className="pl-6">
                    <p className="text-lg text-neutral-700 leading-relaxed italic">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                  </blockquote>
                  <div className="mt-6 flex items-center gap-4 pl-6">
                    {testimonial.imageUrl && (
                      <Image
                        src={testimonial.imageUrl}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-neutral-900">{testimonial.name}</p>
                      <p className="text-sm text-neutral-500">{testimonial.service}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

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
              Ready to Get Started?
            </h2>
            <p className="mt-4 text-primary-100">
              Book your consultation today and take the first step in your preparation journey.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/book" variant="secondary" size="lg">
                Book Now
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
