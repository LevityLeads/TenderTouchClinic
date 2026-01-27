import { Container } from "@/components/ui/container";
import { Shield, Award, GraduationCap, Heart } from "lucide-react";
import { meganBio } from "@/data/about";

/**
 * Trust indicators section for homepage.
 * Displays credentials and experience in a horizontal row.
 */
export function TrustIndicators() {
  const indicators = [
    {
      icon: Heart,
      text: "25+ Years Experience",
      description: "Caring for mothers since 1996",
    },
    {
      icon: Shield,
      text: "Registered Nurse & Midwife",
      description: "Fully qualified and registered",
    },
    {
      icon: GraduationCap,
      text: "UCT Graduate",
      description: "Bachelor of Nursing",
    },
    {
      icon: Award,
      text: "IAIM Certified",
      description: "Infant Massage Instructor",
    },
  ];

  return (
    <Container>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {indicators.map((indicator, index) => {
          const Icon = indicator.icon;
          return (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                <Icon className="h-6 w-6 text-primary-600" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-medium text-neutral-900">
                {indicator.text}
              </h3>
              <p className="mt-1 text-sm text-neutral-500">
                {indicator.description}
              </p>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
