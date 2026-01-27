import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Our Services | ${SITE_CONFIG.shortName}`,
  description:
    "Antenatal classes, postnatal support, baby massage, lactation consultations, newborn check-ups, and vaccinations in Cape Town.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <Section variant="primary">
        <Container>
          <div className="text-center">
            <h1 className="font-serif text-4xl font-bold text-neutral-900 sm:text-5xl">
              Our Services
            </h1>
            <p className="mt-4 mx-auto max-w-2xl text-lg text-neutral-600">
              Comprehensive care for every stage of your motherhood journey, from
              pregnancy preparation to ongoing support.
            </p>
          </div>
        </Container>
      </Section>

      {/* Services Grid */}
      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Card
                key={service.id}
                id={service.isDetailPage ? undefined : service.slug}
                className="flex flex-col"
              >
                <CardHeader>
                  <CardTitle className="text-2xl">{service.name}</CardTitle>
                  <CardDescription className="mt-2">
                    {service.fullDescription}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-grow space-y-4">
                  {/* Pricing */}
                  <div className="rounded-lg bg-primary-50 px-4 py-3">
                    <p className="text-sm font-medium text-primary-900">
                      {service.pricing.amount > 0
                        ? `From R${service.pricing.amount.toLocaleString()}`
                        : "Price varies"}
                    </p>
                    <p className="text-xs text-primary-700">
                      {service.pricing.unit}
                    </p>
                  </div>

                  {/* Benefits (first 3) */}
                  <ul className="space-y-2">
                    {service.benefits.slice(0, 3).map((benefit, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-neutral-600"
                      >
                        <span
                          className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500"
                          aria-hidden="true"
                        />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button
                    href={service.isDetailPage ? service.ctaHref : "/contact"}
                    className="w-full"
                  >
                    {service.ctaText}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
