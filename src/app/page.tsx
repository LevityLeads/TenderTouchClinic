import { Hero } from "@/components/sections/hero";
import { ServicesOverview } from "@/components/sections/services-overview";
import { AboutIntro } from "@/components/sections/about-intro";
import { Testimonials } from "@/components/sections/testimonials";
import { CTASection } from "@/components/sections/cta-section";
import { Stats } from "@/components/sections/stats";
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

      {/* Stats with animated counters */}
      <Section>
        <Stats />
      </Section>

      {/* About Megan intro */}
      <Section variant="cream">
        <AboutIntro />
      </Section>

      {/* Testimonials */}
      <Section variant="rose">
        <Testimonials />
      </Section>

      {/* Call to Action */}
      <Section variant="primary">
        <CTASection />
      </Section>

      {/* Trust Indicators (credentials) */}
      <Section variant="sky">
        <TrustIndicators />
      </Section>
    </>
  );
}
