"use client";

import { Container } from "@/components/ui/container";
import { testimonials } from "@/data/testimonials";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/ui/motion";

/**
 * Testimonials section for homepage.
 * Displays 3 client testimonials in a responsive grid.
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

      <FadeInStagger className="mt-12 grid gap-8 lg:grid-cols-3" staggerDelay={0.1}>
        {displayTestimonials.map((testimonial) => (
          <FadeInStaggerItem key={testimonial.id}>
            <figure className="h-full rounded-xl bg-white p-6 shadow-sm ring-1 ring-neutral-100">
              {/* Quote */}
              <blockquote className="text-neutral-700">
                <span className="text-4xl leading-none text-primary-300" aria-hidden="true">&ldquo;</span>
                <p className="mt-2 leading-relaxed">
                  {testimonial.quote}
                </p>
              </blockquote>

              {/* Attribution */}
              <figcaption className="mt-6 flex items-center gap-4">
                {/* Avatar placeholder using first letter */}
                <div className="h-10 w-10 flex-shrink-0 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-600">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <cite className="not-italic font-medium text-neutral-900">
                    {testimonial.name}
                  </cite>
                  <p className="text-sm text-neutral-500">
                    {testimonial.service}
                  </p>
                </div>
              </figcaption>
            </figure>
          </FadeInStaggerItem>
        ))}
      </FadeInStagger>
    </Container>
  );
}
