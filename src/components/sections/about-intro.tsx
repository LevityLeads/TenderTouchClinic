"use client";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { meganBio } from "@/data/about";
import { SlideIn, ScaleIn } from "@/components/ui/motion";

/**
 * About intro section for homepage.
 * Brief introduction to Megan with credentials and link to full about page.
 */
export function AboutIntro() {
  // Extract first two sentences from bio for intro
  const bioSentences = meganBio.bio.split("\n\n")[0];

  // Show first 3 credentials
  const displayCredentials = meganBio.credentials.slice(0, 3);

  return (
    <Container>
      <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
        {/* Text content */}
        <SlideIn direction="left" distance={40}>
          <div>
            <h2 className="font-serif text-3xl font-bold text-neutral-900 sm:text-4xl">
              Meet {meganBio.name}
            </h2>
            <p className="mt-2 text-lg text-primary-600">
              {meganBio.title}
            </p>

            <p className="mt-6 text-neutral-600 leading-relaxed">
              {bioSentences}
            </p>

            {/* Credentials */}
            <ul className="mt-6 space-y-2">
              {displayCredentials.map((credential, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-neutral-700">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" aria-hidden="true" />
                  {credential}
                </li>
              ))}
            </ul>

            <Button href="/about" variant="outline" className="mt-8">
              Read more about Megan
              <span className="ml-1" aria-hidden="true">&rarr;</span>
            </Button>
          </div>
        </SlideIn>

        {/* Megan's photo */}
        <ScaleIn delay={0.2} className="mt-12 lg:mt-0">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-neutral-100">
            <Image
              src="/images/about/megan.jpg"
              alt={`${meganBio.name} - ${meganBio.title}`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </ScaleIn>
      </div>
    </Container>
  );
}
