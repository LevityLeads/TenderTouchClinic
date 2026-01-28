"use client";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { meganBio, brigitteBio } from "@/data/about";
import { FadeIn, SlideIn, ScaleIn } from "@/components/ui/motion";

interface TeamMemberCardProps {
  member: typeof meganBio;
  index: number;
}

/**
 * Individual team member card for the homepage
 */
function TeamMemberCard({ member, index }: TeamMemberCardProps) {
  // Extract first paragraph from bio for intro
  const bioIntro = member.bio.split("\n\n")[0];

  // Show first 3 credentials
  const displayCredentials = member.credentials.slice(0, 3);

  return (
    <SlideIn direction={index === 0 ? "left" : "right"} distance={40} delay={index * 0.15}>
      <div className="flex flex-col h-full">
        {/* Photo */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-neutral-100 mb-6">
          <Image
            src={member.imageUrl}
            alt={`${member.name} - ${member.title}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="font-serif text-2xl font-bold text-neutral-900">
            {member.name}
          </h3>
          <p className="mt-1 text-primary-600 font-medium">
            {member.title}
          </p>

          <p className="mt-4 text-neutral-600 leading-relaxed text-sm">
            {bioIntro}
          </p>

          {/* Credentials */}
          <ul className="mt-4 space-y-1.5">
            {displayCredentials.map((credential, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-neutral-700">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" aria-hidden="true" />
                {credential}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SlideIn>
  );
}

/**
 * Meet Our Team section for homepage.
 * Shows both Megan and Brigitte side by side.
 */
export function AboutIntro() {
  const teamMembers = [meganBio, brigitteBio];

  return (
    <Container>
      {/* Section Header */}
      <FadeIn className="text-center mb-12">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
          Our Team
        </span>
        <h2 className="font-serif text-3xl font-bold text-neutral-900 sm:text-4xl lg:text-5xl">
          <span className="text-neutral-900">Meet </span>
          <span className="text-gradient">Our Team</span>
        </h2>
        <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
          Experienced, compassionate care from registered nurses and midwives who understand the parenting journey
        </p>
      </FadeIn>

      {/* Team Members Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
        {teamMembers.map((member, index) => (
          <TeamMemberCard key={member.name} member={member} index={index} />
        ))}
      </div>

      {/* CTA Button */}
      <ScaleIn delay={0.4}>
        <div className="mt-10 text-center">
          <Button href="/about" variant="outline">
            Learn more about our team
            <span className="ml-1" aria-hidden="true">&rarr;</span>
          </Button>
        </div>
      </ScaleIn>
    </Container>
  );
}
