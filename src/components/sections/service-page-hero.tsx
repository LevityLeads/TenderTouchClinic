"use client";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/motion";

interface ServicePageHeroProps {
  title: string;
  subtitle: string;
  heroImage: string;
  heroVideo?: string;
}

/**
 * Hero section for service category pages with background image/video
 * Video shows on desktop (md+), image fallback on mobile for performance
 */
export function ServicePageHero({ title, subtitle, heroImage, heroVideo }: ServicePageHeroProps) {
  return (
    <section className="relative bg-primary-700 py-16 lg:py-24 overflow-hidden">
      {/* Background media */}
      <div className="absolute inset-0">
        {/* Image - always present as fallback, hidden on md+ when video exists */}
        <Image
          src={heroImage}
          alt=""
          fill
          className={`object-cover ${heroVideo ? "md:hidden" : ""}`}
          priority
          sizes="100vw"
        />

        {/* Video - only on desktop for performance */}
        {heroVideo && (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="hidden md:block absolute inset-0 w-full h-full object-cover object-bottom"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        )}

        {/* Color overlay to tint with brand colors */}
        <div
          className="absolute inset-0 mix-blend-multiply"
          style={{ background: "oklch(0.45 0.10 160 / 0.7)" }}
        />

        {/* Gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 via-transparent to-primary-900/20" />
      </div>

      <Container className="relative z-10">
        <FadeIn className="text-center">
          <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl drop-shadow-md">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90 drop-shadow-sm">
            {subtitle}
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}
