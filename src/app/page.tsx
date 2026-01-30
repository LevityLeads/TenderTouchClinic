import { Hero } from "@/components/sections/hero";
import { ServicesOverview } from "@/components/sections/services-overview";
import { AboutIntro } from "@/components/sections/about-intro";
import { Testimonials } from "@/components/sections/testimonials";
import { MissionStatement } from "@/components/sections/mission-statement";
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

      {/* Mission Statement */}
      <Section>
        <MissionStatement />
      </Section>

      {/* Testimonials */}
      <Section variant="rose-animated">
        <Testimonials />
      </Section>

      {/* About the team */}
      <Section variant="cream-animated">
        <AboutIntro />
      </Section>
    </>
  );
}
