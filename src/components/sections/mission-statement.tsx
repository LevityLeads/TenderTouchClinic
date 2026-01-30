"use client";

import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/motion";
import { clinicStory } from "@/data/about";

/**
 * Mission statement section for homepage.
 * Simple, warm presentation of the clinic's mission.
 */
export function MissionStatement() {
  return (
    <Container>
      <FadeIn className="mx-auto max-w-3xl text-center">
        <h2 className="font-serif text-2xl font-bold text-neutral-900 sm:text-3xl">
          Our Mission
        </h2>
        <p className="mt-6 text-xl text-primary-700 italic leading-relaxed">
          &ldquo;{clinicStory.mission}&rdquo;
        </p>
        <p className="mt-8 text-neutral-600 leading-relaxed">
          We believe in personalised attention, evidence-based care, and creating
          a warm space where no question is too small. Every family&apos;s journey is
          unique, and we&apos;re here to support yours.
        </p>
      </FadeIn>
    </Container>
  );
}
