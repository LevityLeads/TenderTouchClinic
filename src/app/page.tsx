import { Hero } from "@/components/sections/hero";
import { ServicesOverview } from "@/components/sections/services-overview";
import { UpcomingClasses } from "@/components/sections/upcoming-classes";
import { AboutIntro } from "@/components/sections/about-intro";
import { Testimonials } from "@/components/sections/testimonials";
import { CTASection } from "@/components/sections/cta-section";
import { TrustIndicators } from "@/components/sections/trust-indicators";
import { Section } from "@/components/ui/section";

export default function Home() {
  return (
    <>
      {/* Hero - no section wrapper (handles its own styling) */}
      <Hero />

      {/* Services Overview */}
      <Section variant="muted">
        <ServicesOverview />
      </Section>

      {/* Upcoming Classes */}
      <Section>
        <UpcomingClasses />
      </Section>

      {/* About Megan intro */}
      <Section>
        <AboutIntro />
      </Section>

      {/* Testimonials */}
      <Section variant="muted">
        <Testimonials />
      </Section>

      {/* Call to Action */}
      <Section variant="primary">
        <CTASection />
      </Section>

      {/* Trust Indicators */}
      <Section>
        <TrustIndicators />
      </Section>
    </>
  );
}
