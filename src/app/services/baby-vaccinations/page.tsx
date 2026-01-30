import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { VaccineDropdown } from "@/components/ui/vaccine-dropdown";
import { getServicePageContent, getServiceCategoryBySlug } from "@/data/service-pages";
import { type VaccinationsCategory } from "@/data/services";
import { CheckCircle } from "lucide-react";

const SLUG = "baby-vaccinations";

// Humanized descriptions for each vaccine category
const vaccineCategoryDescriptions: Record<string, string> = {
  "State-Subsidised Schedule":
    "These are the essential vaccines from the national programme - the ones that keep your little one protected at each important milestone.",
  "Private Vaccines":
    "Extra protection for things like chickenpox, meningitis, and more. Many parents choose these for added peace of mind.",
  "Combo Appointments":
    "Multiple vaccines in one visit means fewer trips and less fuss. We'll make sure everything stays on track.",
};

// Humanized "What to Expect" items
const whatToExpect = [
  "We do our best to make sure your little one feels safe and secure",
  "We'll explain each vaccine and answer any questions you have",
  "We'll give you guidance on what to do about any side effects and how to manage these once you're home",
  "Let us know if your little one can have a marshmallow after their jab!",
];

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
      {/* Hero with centered background illustration */}
      <section className="relative overflow-hidden bg-amber-50 md:bg-transparent">
        {/* Image only visible on md+ screens */}
        <div className="absolute inset-0 hidden md:block">
          <Image
            src="/images/vaccine.png"
            alt=""
            fill
            className="object-contain object-center"
            priority
            sizes="100vw"
            quality={100}
            unoptimized
          />
        </div>
        <Container className="relative z-10">
          <div className="py-12 sm:py-16 lg:py-24 text-center">
            <h1 className="font-serif text-3xl font-bold text-neutral-800 sm:text-4xl lg:text-5xl">
              {pageContent.title}
            </h1>
            <p className="mt-4 max-w-xl mx-auto text-base text-neutral-600 sm:text-lg">
              Keeping your little one protected, one gentle jab at a time
            </p>
          </div>
        </Container>
      </section>

      {/* Introduction */}
      <section className="py-12 lg:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-lg text-neutral-600 leading-relaxed">
              Vaccines are one of the best ways to protect your baby, and we know it can feel
              a bit daunting. We take our time, keep things calm, and make sure both you and
              your little one feel looked after. Whether you&apos;re following the state schedule
              or adding some extra protection, we&apos;re here to help.
            </p>
          </div>
        </Container>
      </section>

      {/* Vaccine Category Cards */}
      <section className="bg-white py-12 lg:py-16">
        <Container>
          <h2 className="font-serif text-2xl font-bold text-neutral-900 sm:text-3xl text-center">
            What We Offer
          </h2>
          <p className="mt-4 text-center text-neutral-600 max-w-2xl mx-auto">
            Have a look at the options below. Not sure what you need? Just ask - we&apos;re happy to help.
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
      <section className="bg-amber-50 py-12 lg:py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-2xl font-bold text-neutral-900 sm:text-3xl">
              Ready to Book?
            </h2>
            <p className="mt-4 text-neutral-600">
              Give us a call or send a WhatsApp to schedule your baby&apos;s vaccines.
              We&apos;ll find a time that works for you.
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
