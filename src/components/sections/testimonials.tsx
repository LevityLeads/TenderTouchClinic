"use client";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { FadeIn, FadeInStagger, FadeInStaggerItem, ScaleIn } from "@/components/ui/motion";
import { motion } from "framer-motion";

/**
 * Color palette for avatar backgrounds when no image is provided
 */
const avatarColors = [
  "bg-gradient-to-br from-primary-100 to-primary-200 text-primary-600",
  "bg-gradient-to-br from-amber-100 to-amber-200 text-amber-600",
  "bg-gradient-to-br from-rose-100 to-rose-200 text-rose-600",
  "bg-gradient-to-br from-sky-100 to-sky-200 text-sky-600",
  "bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-600",
  "bg-gradient-to-br from-violet-100 to-violet-200 text-violet-600",
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

/**
 * Enhanced decorative quote mark component
 */
function QuoteMark() {
  return (
    <div className="absolute -top-3 -left-2 select-none pointer-events-none">
      <span
        className="quote-mark text-6xl font-serif leading-none"
        aria-hidden="true"
        style={{
          fontFamily: "Georgia, serif",
          background: "linear-gradient(135deg, var(--color-primary-200), var(--color-primary-400))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        &ldquo;
      </span>
    </div>
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
    <Card className="h-full p-6 sm:p-8" glow>
      <figure className="h-full flex flex-col">
        {/* Quote with decorative mark */}
        <blockquote className="relative flex-1">
          <QuoteMark />
          <p className="text-neutral-700 leading-relaxed pl-6 pt-4 text-base sm:text-lg">
            {testimonial.quote}
          </p>
        </blockquote>

        {/* Attribution with enhanced avatar */}
        <figcaption className="mt-6 pt-6 border-t border-neutral-100 flex items-center gap-4">
          {/* Avatar with gradient ring on hover */}
          <div className="relative">
            {/* Gradient ring */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary-300 via-primary-400 to-accent-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />

            <motion.div
              className={`
                relative h-14 w-14 flex-shrink-0 rounded-full overflow-hidden ring-2 ring-white shadow-md
                ${!showImage ? colorClass + " flex items-center justify-center" : ""}
              `}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {showImage ? (
                <Image
                  src={testimonial.imageUrl!}
                  alt={testimonial.name}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              ) : (
                <span className="text-xl font-semibold">
                  {getInitials(testimonial.name)}
                </span>
              )}
            </motion.div>
          </div>

          <div>
            <cite className="not-italic font-semibold text-neutral-900 block">
              {testimonial.name}
            </cite>
            <p className="text-sm text-primary-600 font-medium">{testimonial.service}</p>
          </div>
        </figcaption>
      </figure>
    </Card>
  );
}

/**
 * Enhanced Testimonials section with gradient text heading,
 * decorative quote marks, and improved card styling.
 */
export function Testimonials() {
  // Show first 3 testimonials on homepage
  const displayTestimonials = testimonials.slice(0, 3);

  return (
    <Container>
      <FadeIn className="text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
          Testimonials
        </span>
        <h2 className="font-serif text-3xl font-bold sm:text-4xl lg:text-5xl">
          <span className="text-neutral-900">What </span>
          <span className="text-gradient">Parents Say</span>
        </h2>
        <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
          Real experiences from families we&apos;ve had the privilege to support on their parenting journey
        </p>
      </FadeIn>

      <FadeInStagger
        className="mt-12 lg:mt-16 grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3"
        staggerDelay={0.15}
      >
        {displayTestimonials.map((testimonial, index) => (
          <FadeInStaggerItem key={testimonial.id}>
            <TestimonialCard testimonial={testimonial} colorIndex={index} />
          </FadeInStaggerItem>
        ))}
      </FadeInStagger>

      {/* Trust indicator */}
      <ScaleIn delay={0.6}>
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full border-2 border-white ${avatarColors[i]} flex items-center justify-center text-xs font-semibold`}
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <span className="text-sm text-neutral-600">
              <span className="font-semibold text-neutral-900">500+</span> happy families
            </span>
          </div>
        </div>
      </ScaleIn>
    </Container>
  );
}
