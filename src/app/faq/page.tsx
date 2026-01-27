import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { FAQAccordion } from "@/components/sections/faq-accordion";
import { faqsByCategory } from "@/data/faq";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Find answers to common questions about antenatal classes, baby massage, postnatal support, booking, and payment at Tender Touch Clinic.",
  alternates: {
    canonical: "/faq",
  },
};

/**
 * FAQ page with accordion-style answers organized by category.
 * Requirements: FAQ-01 through FAQ-06
 */
export default function FAQPage() {
  const categories = Object.entries(faqsByCategory);

  return (
    <div className="bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-primary-50 py-12 lg:py-16">
        <Container>
          <div className="text-center">
            <h1 className="font-heading text-4xl font-bold text-neutral-900 sm:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
              Find answers to common questions about our services, classes, and how everything works.
            </p>
          </div>
        </Container>
      </section>

      {/* FAQ Categories */}
      <section className="py-section lg:py-section-lg">
        <Container>
          <div className="mx-auto max-w-3xl space-y-12">
            {categories.map(([category, items]) => (
              <div key={category}>
                <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-6">
                  {category}
                </h2>
                <FAQAccordion items={items} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-500 py-section lg:py-section-lg">
        <Container>
          <div className="text-center">
            <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
              Still Have Questions?
            </h2>
            <p className="mt-4 text-lg text-primary-100 max-w-2xl mx-auto">
              We&apos;re here to help. Reach out and we&apos;ll get back to you as soon as we can.
            </p>
            <div className="mt-8">
              <Button
                href="/contact"
                variant="secondary"
                size="lg"
              >
                Get in Touch
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
