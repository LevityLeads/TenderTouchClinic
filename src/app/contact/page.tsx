import type { Metadata } from "next";
import Image from "next/image";
import { Car, ParkingCircle, Bus, MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { MapEmbed } from "@/components/sections/map-embed";
import { ContactForm } from "@/components/forms/contact-form";
import { contactInfo, directions } from "@/data/contact";

export const metadata: Metadata = {
  title: "Contact Us | Tender Touch Mother & Baby Clinic",
  description:
    "Get in touch with Tender Touch Mother & Baby Clinic in Kirstenhof, Cape Town. Find our address, phone number, email, WhatsApp, and directions.",
};

export default function ContactPage() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address.full)}`;
  const whatsappUrl = `https://wa.me/${contactInfo.whatsapp}`;

  return (
    <main>
      {/* Main Contact Section - Form and Info */}
      <Section variant="primary">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Column - Business Info and Image */}
            <div className="space-y-8">
              <div>
                <h1 className="font-display text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
                  Get in Touch
                </h1>
                <p className="mt-4 text-lg leading-relaxed text-neutral-700">
                  We would love to hear from you. Whether you have questions about our services,
                  want to book a class, or need support, we are here to help.
                </p>
              </div>

              {/* Contact Image */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-neutral-100 shadow-lg">
                <Image
                  src="/images/contactus.png"
                  alt="Tender Touch Mother & Baby Clinic - Welcoming space for parents and babies"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Right Column - Form and Contact Details */}
            <div className="space-y-8">
              {/* Contact Form */}
              <div className="rounded-lg bg-white p-6 shadow-md sm:p-8">
                <h2 className="mb-6 font-display text-xl font-bold text-neutral-900">
                  Send Us a Message
                </h2>
                <ContactForm />
                <p className="mt-4 text-center text-sm text-neutral-600">
                  No medical information is collected via this form.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                <h3 className="font-display text-lg font-semibold text-neutral-900">
                  Contact Details
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Phone */}
                  <div className="flex gap-3">
                    <Phone className="h-5 w-5 shrink-0 text-primary-600" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-medium text-neutral-900">Phone</p>
                      <a
                        href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                        className="text-sm text-primary-600 hover:underline"
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-3">
                    <Mail className="h-5 w-5 shrink-0 text-primary-600" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-medium text-neutral-900">Email</p>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-sm text-primary-600 hover:underline"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex gap-3">
                    <MessageCircle className="h-5 w-5 shrink-0 text-primary-600" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-medium text-neutral-900">WhatsApp</p>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary-600 hover:underline"
                      >
                        Message us
                      </a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex gap-3">
                    <MapPin className="h-5 w-5 shrink-0 text-primary-600" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-medium text-neutral-900">Address</p>
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary-600 hover:underline"
                      >
                        {contactInfo.address.street}, {contactInfo.address.suburb}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
    </main>
  );
}
