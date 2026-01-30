"use client";

import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/motion";

interface ServicePageHeroProps {
  title: string;
  subtitle: string;
  gradient?: string;
  // Keeping these for backwards compatibility but they won't be used
  heroImage?: string;
  heroVideo?: string;
}

/**
 * Hero section for service category pages with soft gradient backgrounds
 */
export function ServicePageHero({ title, subtitle, gradient }: ServicePageHeroProps) {
  // Default to a soft mint/sage gradient if none provided
  const bgGradient = gradient || "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 50%, #6ee7b7 100%)";

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      {/* Gradient Background */}
      <div
        className="absolute inset-0"
        style={{ background: bgGradient }}
      />

      <Container className="relative z-10">
        <FadeIn className="text-center">
          <h1 className="font-serif text-4xl font-bold text-neutral-800 sm:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-700">
            {subtitle}
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}
