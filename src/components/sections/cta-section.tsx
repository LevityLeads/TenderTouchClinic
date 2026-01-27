import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

/**
 * Call-to-action section for homepage.
 * Centered text with compelling headline and dual CTAs.
 */
export function CTASection() {
  return (
    <Container>
      <div className="text-center">
        <h2 className="font-serif text-3xl font-bold text-neutral-900 sm:text-4xl">
          Ready to Begin Your Journey?
        </h2>
        <p className="mt-4 mx-auto max-w-2xl text-lg text-neutral-600">
          Whether you&apos;re preparing for birth, navigating the early weeks, or looking
          for ongoing support, we&apos;re here to help.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button href="/schedule" size="lg">
            Book Your Class
          </Button>
          <Button href="/contact" variant="secondary" size="lg">
            Contact Us
          </Button>
        </div>
      </div>
    </Container>
  );
}
