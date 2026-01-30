"use client";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { FadeIn } from "@/components/ui/motion";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

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
 * Highlight a phrase within the quote text
 */
function highlightQuote(quote: string, highlight?: string): React.ReactNode {
  if (!highlight) return quote;

  const parts = quote.split(highlight);
  if (parts.length === 1) return quote;

  return (
    <>
      {parts[0]}
      <span className="font-semibold text-primary-700 bg-primary-50 px-1 rounded">
        {highlight}
      </span>
      {parts.slice(1).join(highlight)}
    </>
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

/**
 * Star rating component
 */
function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4 fill-amber-400 text-amber-400"
          aria-hidden="true"
        />
      ))}
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
        {/* Star Rating */}
        <StarRating />

        {/* Pull-quote highlight (if available) */}
        {testimonial.highlight && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 pb-4 border-b border-primary-100"
          >
            <p className="text-xl sm:text-2xl font-serif font-semibold text-primary-700 leading-snug">
              &ldquo;{testimonial.highlight}&rdquo;
            </p>
          </motion.div>
        )}

        {/* Quote with decorative mark */}
        <blockquote className="relative flex-1">
          <QuoteMark />
          <p className="text-neutral-700 leading-relaxed pl-6 pt-4 text-base sm:text-lg">
            {highlightQuote(testimonial.quote, testimonial.highlight)}
          </p>
        </blockquote>

        {/* Attribution with enhanced avatar */}
        <figcaption className="mt-6 pt-6 border-t border-neutral-100 flex items-center gap-4">
          {/* Avatar with gradient ring on hover */}
          <div className="relative group">
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
 * Featured testimonial card for carousel (larger, more prominent)
 */
function FeaturedTestimonialCard({ testimonial, colorIndex }: TestimonialCardProps) {
  const colorClass = avatarColors[colorIndex % avatarColors.length];
  const showImage = hasValidImage(testimonial);

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="p-8 sm:p-12" glow>
        <figure className="text-center">
          {/* Star Rating */}
          <div className="flex justify-center mb-6">
            <StarRating />
          </div>

          {/* Pull-quote highlight */}
          {testimonial.highlight && (
            <motion.p
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-serif font-semibold text-gradient leading-tight mb-6"
            >
              &ldquo;{testimonial.highlight}&rdquo;
            </motion.p>
          )}

          {/* Full quote */}
          <blockquote>
            <p className="text-neutral-600 leading-relaxed text-lg max-w-2xl mx-auto">
              {testimonial.quote}
            </p>
          </blockquote>

          {/* Attribution */}
          <figcaption className="mt-8 flex flex-col items-center gap-4">
            <motion.div
              className={`
                relative h-16 w-16 rounded-full overflow-hidden ring-4 ring-primary-100 shadow-lg
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
                  sizes="64px"
                  className="object-cover"
                />
              ) : (
                <span className="text-2xl font-semibold">
                  {getInitials(testimonial.name)}
                </span>
              )}
            </motion.div>

            <div>
              <cite className="not-italic font-semibold text-neutral-900 text-lg block">
                {testimonial.name}
              </cite>
              <p className="text-primary-600 font-medium">{testimonial.service}</p>
            </div>
          </figcaption>
        </figure>
      </Card>
    </div>
  );
}

/**
 * Enhanced Testimonials section with grid layout,
 * decorative quote marks, pull-quotes, and improved card styling.
 */
export function Testimonials() {
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

      {/* Testimonials grid */}
      <div className="mt-12 lg:mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <TestimonialCard testimonial={testimonial} colorIndex={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>

    </Container>
  );
}
