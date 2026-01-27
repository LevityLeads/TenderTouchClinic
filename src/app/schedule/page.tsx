import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ClassSchedule } from "@/components/sections/class-schedule";

export const metadata: Metadata = {
  title: "Class Schedule",
  description:
    "View upcoming antenatal classes and baby massage courses at Tender Touch Clinic. Book your spot today.",
  alternates: {
    canonical: "/schedule",
  },
};

/**
 * Schedule page displaying upcoming class dates with availability.
 * Requirements: SCHED-01 through SCHED-05
 */
export default function SchedulePage() {
  return (
    <div className="bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-primary-50 py-12 lg:py-16">
        <Container>
          <div className="text-center">
            <h1 className="font-heading text-4xl font-bold text-neutral-900 sm:text-5xl">
              Class Schedule
            </h1>
            <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
              Browse our upcoming antenatal classes and baby massage courses.
              Small groups ensure personalised attention for every family.
            </p>
          </div>
        </Container>
      </section>

      {/* Antenatal Classes Section */}
      <section className="py-section lg:py-section-lg">
        <Container>
          <h2 className="font-heading text-2xl font-bold text-neutral-900 sm:text-3xl">
            Antenatal Classes
          </h2>
          <p className="mt-2 text-neutral-600 max-w-2xl">
            A comprehensive 6-week course covering labour, birth, breastfeeding, and early parenting.
            Partners are encouraged to attend all sessions.
          </p>
          <div className="mt-8">
            <ClassSchedule serviceFilter="antenatal-classes" />
          </div>
        </Container>
      </section>

      {/* Baby Massage Section */}
      <section className="bg-white py-section lg:py-section-lg">
        <Container>
          <h2 className="font-heading text-2xl font-bold text-neutral-900 sm:text-3xl">
            Baby Massage
          </h2>
          <p className="mt-2 text-neutral-600 max-w-2xl">
            A 4-week course teaching you nurturing massage techniques to bond with your baby.
            Suitable for babies 6 weeks to 6 months old.
          </p>
          <div className="mt-8">
            <ClassSchedule serviceFilter="baby-massage" />
          </div>
        </Container>
      </section>

      {/* How Booking Works */}
      <section className="py-section lg:py-section-lg">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-heading text-2xl font-bold text-neutral-900 sm:text-3xl text-center">
              How Booking Works
            </h2>
            <ol className="mt-8 space-y-6">
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600 font-semibold">
                  1
                </span>
                <div>
                  <h3 className="font-semibold text-neutral-900">Choose Your Dates</h3>
                  <p className="mt-1 text-neutral-600">
                    Select a course that fits your schedule. For antenatal classes,
                    we recommend starting around 26-28 weeks of pregnancy.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600 font-semibold">
                  2
                </span>
                <div>
                  <h3 className="font-semibold text-neutral-900">Reserve Your Spot</h3>
                  <p className="mt-1 text-neutral-600">
                    Contact us to secure your place. A deposit is required to confirm
                    your booking, with the balance due before the course starts.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600 font-semibold">
                  3
                </span>
                <div>
                  <h3 className="font-semibold text-neutral-900">Confirmation</h3>
                  <p className="mt-1 text-neutral-600">
                    You&apos;ll receive a confirmation email with course details,
                    what to bring, and directions to the clinic.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-500 py-section lg:py-section-lg">
        <Container>
          <div className="text-center">
            <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
              Don&apos;t See Your Preferred Dates?
            </h2>
            <p className="mt-4 text-lg text-primary-100 max-w-2xl mx-auto">
              Get in touch and let us know when works best for you.
              We may be able to add additional course dates or put you on a waiting list.
            </p>
            <div className="mt-8">
              <Button
                href="/contact"
                variant="secondary"
                size="lg"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
