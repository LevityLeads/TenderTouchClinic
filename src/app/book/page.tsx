import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { CONTACT_INFO, getWhatsAppUrl, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Book an Appointment | ${SITE_CONFIG.shortName}`,
  description:
    "Book your appointment at Tender Touch Mother & Baby Clinic. Schedule antenatal classes, baby massage courses, postnatal support, lactation consultations, and more.",
};

const services = [
  {
    name: "Pregnancy & Preparation",
    description: "Prepare for your journey into parenthood with expert guidance and support.",
    href: "/services/pregnancy-preparation",
    gradient: "from-emerald-200 via-teal-100 to-transparent",
    borderColor: "border-t-emerald-400",
  },
  {
    name: "Postnatal Support",
    description: "Caring support for you and your baby in the early weeks and beyond.",
    href: "/services/postnatal-support",
    gradient: "from-sky-200 via-blue-100 to-transparent",
    borderColor: "border-t-sky-400",
  },
  {
    name: "Breastfeeding & Lactation",
    description: "Gentle, expert support for your feeding journey - whatever that looks like for you.",
    href: "/services/breastfeeding-lactation",
    gradient: "from-rose-200 via-pink-100 to-transparent",
    borderColor: "border-t-rose-400",
  },
  {
    name: "Baby Vaccinations",
    description: "Essential immunisations in a calm, caring environment.",
    href: "/services/baby-vaccinations",
    gradient: "from-amber-200 via-orange-100 to-transparent",
    borderColor: "border-t-amber-400",
  },
];

export default function BookPage() {
  return (
    <main>
      {/* Breadcrumb */}
      <div className="border-b border-neutral-200 bg-neutral-50">
        <Container>
          <nav className="py-3" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-neutral-500 hover:text-primary-600"
                >
                  Home
                </Link>
              </li>
              <li className="text-neutral-400">/</li>
              <li className="font-medium text-neutral-900">Book</li>
            </ol>
          </nav>
        </Container>
      </div>

      {/* Hero Section */}
      <Section variant="primary">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-display text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
              Book an Appointment
            </h1>
            <p className="mt-6 text-lg leading-8 text-neutral-700">
              Choose a service below to find out more and book your appointment.
              We&apos;re here to support you at every stage.
            </p>
          </div>
        </Container>
      </Section>

      {/* Service Cards */}
      <Section>
        <Container>
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center font-display text-2xl font-bold text-neutral-900 sm:text-3xl mb-10">
              Select Your Appointment
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <Link
                  key={service.name}
                  href={service.href}
                  className={`group relative flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-neutral-300 border-t-4 ${service.borderColor}`}
                >
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${service.gradient} opacity-30 pointer-events-none`} />

                  <div className="relative">
                    <h3 className="font-serif text-lg font-semibold text-neutral-900 group-hover:text-primary-700 transition-colors">
                      {service.name}
                    </h3>
                    <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Alternative Contact */}
      <Section variant="muted">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-xl font-bold text-neutral-900 sm:text-2xl">
              Not sure which service you need?
            </h2>
            <p className="mt-4 text-neutral-600">
              No worries - just get in touch and we&apos;ll help you figure it out.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href={CONTACT_INFO.phoneHref}
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-neutral-900 shadow-sm ring-1 ring-neutral-200 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {CONTACT_INFO.phone}
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-[#20BD5A] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
