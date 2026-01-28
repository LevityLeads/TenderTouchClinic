"use client";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/motion";

interface HeroProps {
  /**
   * Optional background image path. Falls back to gradient if not provided.
   */
  backgroundImage?: string;
}

/**
 * Hero section for homepage with main headline, subheadline, and CTAs.
 * Supports background image with gradient fallback.
 */
export function Hero({ backgroundImage = "/images/hero.jpg" }: HeroProps) {
  return (
    <section className="relative min-h-[60vh] bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400">
      {/* Background image with gradient overlay */}
      <Image
        src={backgroundImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
        onError={(e) => {
          // Hide image on error, gradient fallback shows through
          e.currentTarget.style.display = "none";
        }}
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-primary-900/40" />

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
