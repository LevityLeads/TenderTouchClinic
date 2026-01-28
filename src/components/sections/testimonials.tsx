"use client";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/ui/motion";

/**
 * Color palette for avatar backgrounds when no image is provided
 */
const avatarColors = [
  "bg-primary-100 text-primary-600",
  "bg-amber-100 text-amber-600",
  "bg-rose-100 text-rose-600",
  "bg-sky-100 text-sky-600",
  "bg-emerald-100 text-emerald-600",
  "bg-violet-100 text-violet-600",
];

/**
 * Get initials from name (e.g., "Sarah M." → "S", "Jessica & Mark T." → "J")
 */
function getInitials(name: string): string {
  return name.charAt(0).toUpperCase();
}

/**
 * Check if testimonial has a valid (non-placeholder) image
 */
function hasValidImage(testimonial: Testimonial): boolean {
  return !!(
    testimonial.imageUrl &&
    !testimonial.imageUrl.includes("placeholder")
  );
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  colorIndex: number;
}

function TestimonialCard({ testimonial, colorIndex }: TestimonialCardProps) {
  const colorClass = avatarColors[colorIndex % avatarColors.length];
  const showImage = hasValidImage(testimonial);

  return (
    <figure className="h-full rounded-xl bg-white p-6 shadow-sm ring-1 ring-neutral-100 transition-all duration-300 hover:shadow-lg hover:ring-primary-100 hover:-translate-y-1">
      {/* Quote */}
      <blockquote className="text-neutral-700">
        <span
          className="text-4xl leading-none text-primary-300"
          aria-hidden="true"
        >
          &ldquo;
        </span>
        <p className="mt-2 leading-relaxed">{testimonial.quote}</p>
      </blockquote>

      {/* Attribution */}
      <figcaption className="mt-6 flex items-center gap-4">
        {/* Avatar - image or colored initials */}
        <div
          className={`
            relative h-12 w-12 flex-shrink-0 rounded-full overflow-hidden
            ${!showImage ? colorClass + " flex items-center justify-center" : ""}
          `}
        >
          {showImage ? (
            <Image
              src={testimonial.imageUrl!}
              alt={testimonial.name}
              fill
              sizes="48px"
              className="object-cover"
            />
          ) : (
            <span className="text-lg font-semibold">
              {getInitials(testimonial.name)}
            </span>
          )}
        </div>
        <div>
          <cite className="not-italic font-medium text-neutral-900">
            {testimonial.name}
          </cite>
          <p className="text-sm text-neutral-500">{testimonial.service}</p>
        </div>
      </figcaption>
    </figure>
  );
}

/**
 * Testimonials section for homepage.
 * Displays 3 client testimonials in a responsive grid.
 * Supports real images or falls back to colored initials.
 */
export function Testimonials() {
  // Show first 3 testimonials on homepage
  const displayTestimonials = testimonials.slice(0, 3);

  return (
    <Container>
      <FadeIn className="text-center">
        <h2 className="font-serif text-3xl font-bold text-neutral-900 sm:text-4xl">
          What Parents Say
        </h2>
        <p className="mt-4 text-lg text-neutral-600">
          Real experiences from families we&apos;ve had the privilege to support
        </p>
      </FadeIn>

      <FadeInStagger
        className="mt-12 grid gap-8 lg:grid-cols-3"
        staggerDelay={0.1}
      >
        {displayTestimonials.map((testimonial, index) => (
          <FadeInStaggerItem key={testimonial.id}>
            <TestimonialCard testimonial={testimonial} colorIndex={index} />
          </FadeInStaggerItem>
        ))}
      </FadeInStagger>
    </Container>
  );
}
