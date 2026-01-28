"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/motion";

/**
 * Hero section for homepage with main headline, subheadline, and CTAs.
 * Uses gradient background instead of hero image.
 */
export function Hero() {
  return (
    <section className="relative min-h-[60vh] bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400">
      {/* Decorative overlay pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />

      <Container className="relative flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <FadeIn y={30} duration={0.6}>
          <h1 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Nurturing Care for Mothers & Babies
          </h1>
        </FadeIn>

        <FadeIn y={20} delay={0.15} duration={0.6}>
          <p className="mt-6 max-w-2xl text-lg text-primary-100 sm:text-xl">
            Antenatal classes, postnatal support, and baby massage in a warm,
            welcoming environment in Cape Town.
          </p>
        </FadeIn>

        <FadeIn y={20} delay={0.3} duration={0.6}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="/schedule" size="lg">
              Book a Class
            </Button>
            <Button href="/services" variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              View Services
            </Button>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
