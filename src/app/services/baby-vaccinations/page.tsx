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

// Descriptions for each vaccine category
const vaccineCategoryDescriptions: Record<string, string> = {
  "State-Subsidised Schedule":
    "Essential vaccines provided as part of the national immunisation programme. Follow the recommended schedule to ensure your baby is fully protected at each milestone.",
  "Private Vaccines":
    "Additional vaccines for enhanced protection against serious illnesses. These complement the state schedule and provide broader immunity for your child.",
  "Combo Appointments":
    "Convenient combined vaccine appointments that reduce the number of visits. Perfect for busy parents who want to stay on track with their baby's immunisation schedule.",
};

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

      {/* Vaccine Category Cards */}
      <section className="bg-white py-12 lg:py-16">
        <Container>
          <h2 className="font-serif text-2xl font-bold text-neutral-900 sm:text-3xl text-center">
            Vaccination Options
          </h2>
          <p className="mt-4 text-center text-neutral-600 max-w-2xl mx-auto">
            Select a category below to view available vaccines and book your appointment.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {category.categories.map((vaccineCategory, index) => (
              <div
                key={index}
                className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-primary-200 transition-all duration-300"
              >
                {/* Category Name */}
                <h3 className="font-serif text-xl font-semibold text-neutral-900">
                  {vaccineCategory.name}
                </h3>

                {/* Description */}
                <p className="mt-3 text-neutral-600 text-sm leading-relaxed flex-grow">
                  {vaccineCategoryDescriptions[vaccineCategory.name]}
                </p>

                {/* Vaccines Count */}
                <div className="mt-6 pt-4 border-t border-neutral-100">
                  <p className="text-sm text-neutral-500 mb-3">
                    {vaccineCategory.items.length} vaccine{vaccineCategory.items.length !== 1 ? "s" : ""} available
                  </p>
                </div>

                {/* Dropdown */}
                <VaccineDropdown category={vaccineCategory} />
              </div>
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
