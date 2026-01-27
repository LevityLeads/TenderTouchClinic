import type { Metadata } from "next";
import { Car, ParkingCircle, Bus } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { ContactInfo } from "@/components/sections/contact-info";
import { MapEmbed } from "@/components/sections/map-embed";
import { contactInfo, directions } from "@/data/contact";

export const metadata: Metadata = {
  title: "Contact Us | Tender Touch Mother & Baby Clinic",
  description:
    "Get in touch with Tender Touch Mother & Baby Clinic in Kirstenhof, Cape Town. Find our address, phone number, email, WhatsApp, business hours, and directions.",
};

export default function ContactPage() {
  return (
    <main>
      {/* Hero Section */}
      <Section variant="primary">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-display text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
              Get in Touch
            </h1>
            <p className="mt-6 text-lg leading-8 text-neutral-700">
              We would love to hear from you. Whether you have questions about our services,
              want to book a class, or need support, we are here to help.
            </p>
          </div>
        </Container>
      </Section>

      {/* Contact Info Section */}
      <Section>
        <Container>
          <ContactInfo />
        </Container>
      </Section>

      {/* Map Section */}
      <Section variant="muted">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center font-display text-2xl font-bold text-neutral-900 sm:text-3xl">
              Find Us
            </h2>
            <MapEmbed
              address={contactInfo.address.full}
              title="Tender Touch Mother & Baby Clinic Location"
            />
          </div>
        </Container>
      </Section>

      {/* Directions Section */}
      <Section>
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center font-display text-2xl font-bold text-neutral-900 sm:text-3xl">
              Getting Here
            </h2>

            <div className="grid gap-8 md:grid-cols-3">
              {/* By Car */}
              <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <Car className="h-6 w-6 text-primary-600" aria-hidden="true" />
                  <h3 className="font-semibold text-neutral-900">By Car</h3>
                </div>
                <p className="text-sm leading-relaxed text-neutral-700">
                  {directions.byCar}
                </p>
              </div>

              {/* Parking */}
              <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <ParkingCircle className="h-6 w-6 text-primary-600" aria-hidden="true" />
                  <h3 className="font-semibold text-neutral-900">Parking</h3>
                </div>
                <p className="text-sm leading-relaxed text-neutral-700">
                  {directions.parking}
                </p>
              </div>

              {/* Public Transport */}
              <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <Bus className="h-6 w-6 text-primary-600" aria-hidden="true" />
                  <h3 className="font-semibold text-neutral-900">Public Transport</h3>
                </div>
                <p className="text-sm leading-relaxed text-neutral-700">
                  {directions.publicTransport}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section variant="primary">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-bold text-neutral-900 sm:text-3xl">
              Ready to Reach Out?
            </h2>
            <p className="mt-4 text-lg text-neutral-700">
              Send us an enquiry using the form below, or contact us directly via phone,
              email, or WhatsApp. We typically respond within 24 hours.
            </p>
          </div>
        </Container>
      </Section>
    </main>
  );
}
