import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG, CONTACT_INFO } from "@/lib/constants";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-primary-500 py-section lg:py-section-lg">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              {SITE_CONFIG.shortName}
            </h1>
            <p className="mt-4 text-xl text-primary-100 sm:text-2xl">
              Nurturing care for mothers and babies
            </p>
            <p className="mt-2 text-primary-200">
              Cape Town&apos;s trusted midwifery clinic
            </p>
          </div>
        </Container>
      </section>

      {/* Coming Soon Section */}
      <section className="py-section lg:py-section-lg">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
              Coming Soon
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              We&apos;re building something special. Our new website will showcase
              our services including antenatal classes, postnatal support, baby
              massage, and more.
            </p>

            {/* Button Examples */}
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button variant="primary" size="lg">
                Primary Button
              </Button>
              <Button variant="secondary" size="lg">
                Secondary Button
              </Button>
              <Button variant="outline" size="lg">
                Outline Button
              </Button>
              <Button variant="ghost" size="lg">
                Ghost Button
              </Button>
            </div>

            {/* Contact Info */}
            <div className="mt-12 rounded-lg bg-neutral-100 p-6">
              <h3 className="text-lg font-semibold text-neutral-900">
                Contact Us
              </h3>
              <p className="mt-2 text-neutral-600">
                <a
                  href={CONTACT_INFO.phoneHref}
                  className="hover:text-primary-600"
                >
                  {CONTACT_INFO.phone}
                </a>
                {" | "}
                <a
                  href={CONTACT_INFO.emailHref}
                  className="hover:text-primary-600"
                >
                  {CONTACT_INFO.email}
                </a>
              </p>
              <p className="mt-1 text-sm text-neutral-500">
                {CONTACT_INFO.address.full}
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
