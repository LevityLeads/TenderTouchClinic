import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PhotoGallery } from "@/components/sections/photo-gallery";
import { meganBio, clinicStory } from "@/data/about";

export const metadata: Metadata = {
  title: "About Megan Benn",
  description:
    "Meet Megan Benn, Registered Nurse and Midwife with over 25 years of experience. Learn about Tender Touch Mother & Baby Clinic's story and mission.",
  alternates: {
    canonical: "/about",
  },
};

/**
 * Placeholder images for the clinic photo gallery.
 * These will be replaced with actual clinic photos later.
 */
const galleryImages = [
  { src: "/images/about/clinic-1.jpg", alt: "Tender Touch Clinic interior" },
  { src: "/images/about/clinic-2.jpg", alt: "Comfortable consultation space" },
  { src: "/images/about/clinic-3.jpg", alt: "Class space for antenatal sessions" },
  { src: "/images/about/clinic-4.jpg", alt: "Baby massage session" },
];

/**
 * About page showcasing Megan's background, credentials, and clinic story.
 * Requirements: ABOUT-01 through ABOUT-06
 */
export default function AboutPage() {
  return (
    <div className="bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-primary-50 py-12 lg:py-16">
        <Container>
          <div className="text-center">
            <h1 className="font-heading text-4xl font-bold text-neutral-900 sm:text-5xl">
              About {meganBio.name}
            </h1>
            <p className="mt-4 text-lg text-neutral-600">
              {meganBio.title}
            </p>
          </div>
        </Container>
      </section>

      {/* Bio Section */}
      <section className="py-section lg:py-section-lg">
        <Container>
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            {/* Photo Column */}
            <div className="lg:col-span-2">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-neutral-200 shadow-lg">
                <Image
                  src={meganBio.imageUrl}
                  alt={`${meganBio.name}, ${meganBio.title}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-3">
              <h2 className="font-heading text-3xl font-bold text-neutral-900">
                My Story
              </h2>

              {/* Bio paragraphs */}
              <div className="mt-6 space-y-4 text-neutral-600 leading-relaxed">
                {meganBio.bio.split("\n\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Personal note */}
              <p className="mt-6 italic text-neutral-500">
                {meganBio.personalNote}
              </p>

              {/* Credentials */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-neutral-900">
                  Qualifications & Credentials
                </h3>
                <ul className="mt-4 space-y-2 text-neutral-600">
                  {meganBio.credentials.map((credential, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary-500" />
                      {credential}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Clinic Story Section */}
      <section className="bg-white py-section lg:py-section-lg">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-bold text-neutral-900">
              About the Clinic
            </h2>
            <p className="mt-2 text-sm text-neutral-500">
              Established {clinicStory.founded} | {clinicStory.location}
            </p>
            <p className="mt-6 text-lg text-neutral-600 leading-relaxed">
              {clinicStory.description}
            </p>
          </div>

          {/* Mission Statement */}
          <div className="mt-12 rounded-lg bg-primary-50 p-8 lg:p-12">
            <h3 className="text-center text-xl font-semibold text-neutral-900">
              Our Mission
            </h3>
            <p className="mt-4 text-center text-lg text-primary-700 italic">
              &ldquo;{clinicStory.mission}&rdquo;
            </p>
          </div>

          {/* Values */}
          <div className="mt-12">
            <h3 className="text-center text-xl font-semibold text-neutral-900">
              What We Believe In
            </h3>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {clinicStory.values.map((value, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-white p-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600 font-semibold text-sm">
                    {index + 1}
                  </span>
                  <span className="text-neutral-700">{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-section lg:py-section-lg">
        <Container>
          <h2 className="text-center font-heading text-3xl font-bold text-neutral-900">
            The Clinic
          </h2>
          <p className="mt-4 text-center text-neutral-600">
            A calm, welcoming space for mothers and babies
          </p>
          <div className="mt-8">
            <PhotoGallery images={galleryImages} />
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-500 py-section lg:py-section-lg">
        <Container>
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold text-white">
              Ready to Meet?
            </h2>
            <p className="mt-4 text-lg text-primary-100">
              Book a consultation and let&apos;s discuss how I can support you on your journey.
            </p>
            <div className="mt-8">
              <Button
                href="/contact"
                variant="secondary"
                size="lg"
              >
                Book a Consultation
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
