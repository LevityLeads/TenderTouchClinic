import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ServicePageHero } from "@/components/sections/service-page-hero";
import { VaccineDropdown } from "@/components/ui/vaccine-dropdown";
import { getServicePageContent, getServiceCategoryBySlug } from "@/data/service-pages";
import { type VaccinationsCategory } from "@/data/services";
import { CheckCircle } from "lucide-react";

const SLUG = "baby-vaccinations";

export const metadata: Metadata = {
  title: "Baby Vaccinations",
  description:
    "State-subsidised and private baby vaccinations in a calm, caring environment. Comprehensive immunisation services at Tender Touch Clinic.",
  alternates: {
    canonical: `/services/${SLUG}`,
  },
};

export default function BabyVaccinationsPage() {
  const pageContent = getServicePageContent(SLUG);
  const category = getServiceCategoryBySlug(SLUG) as VaccinationsCategory;

  if (!pageContent || !category) {
    notFound();
  }

  return (
    <div className="bg-neutral-50">
      <ServicePageHero
        title={pageContent.title}
        subtitle={pageContent.subtitle}
        heroImage={pageContent.heroImage}
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

      {/* Vaccine Categories */}
      <section className="bg-white py-12 lg:py-16">
        <Container>
          <h2 className="font-serif text-2xl font-bold text-neutral-900 sm:text-3xl text-center">
            Vaccination Options
          </h2>
          <p className="mt-4 text-center text-neutral-600">
            Select a category below to view available vaccines and book your appointment.
          </p>
          <div className="mt-8 mx-auto max-w-2xl space-y-4">
            {category.categories.map((vaccineCategory, index) => (
              <VaccineDropdown key={index} category={vaccineCategory} />
            ))}
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
              Ready to Book?
            </h2>
            <p className="mt-4 text-primary-100">
              Keep your little one protected with timely vaccinations in a caring environment.
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
