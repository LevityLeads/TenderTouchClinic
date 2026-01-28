"use client";

import { Container } from "@/components/ui/container";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/ui/motion";

/**
 * Services overview section for homepage.
 * Displays a grid of service cards with links to detail pages.
 */
export function ServicesOverview() {
  return (
    <Container>
      <FadeIn className="text-center">
        <h2 className="font-serif text-3xl font-bold text-neutral-900 sm:text-4xl">
          Our Services
        </h2>
        <p className="mt-4 text-lg text-neutral-600">
          Comprehensive care for every stage of your motherhood journey
        </p>
      </FadeIn>

      <FadeInStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.08}>
        {services.map((service) => (
          <FadeInStaggerItem key={service.id}>
            <Card className="flex h-full flex-col">
              <CardHeader className="flex-grow">
                <CardTitle>{service.name}</CardTitle>
                <CardDescription className="mt-2">
                  {service.shortDescription}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button href={service.ctaHref} variant="ghost" className="w-full justify-start px-0 text-primary-600 hover:text-primary-700">
                  Learn more
                  <span className="ml-1" aria-hidden="true">&rarr;</span>
                </Button>
              </CardFooter>
            </Card>
          </FadeInStaggerItem>
        ))}
      </FadeInStagger>
    </Container>
  );
}
