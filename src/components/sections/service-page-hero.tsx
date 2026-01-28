"use client";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/motion";

interface ServicePageHeroProps {
  title: string;
  subtitle: string;
  heroImage: string;
}

/**
 * Hero section for service category pages with background image
 */
export function ServicePageHero({ title, subtitle, heroImage }: ServicePageHeroProps) {
  return (
    <section className="relative bg-primary-50 py-16 lg:py-24 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt=""
          fill
          className="object-cover opacity-20"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/80 to-primary-50" />
      </div>

      <Container className="relative z-10">
        <FadeIn className="text-center">
          <h1 className="font-serif text-4xl font-bold text-neutral-900 sm:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600">
            {subtitle}
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}
