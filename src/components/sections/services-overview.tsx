"use client";

import { Container } from "@/components/ui/container";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { serviceCategories, vaccinationsCategory, type ServiceIconName } from "@/data/services";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/ui/motion";
import { Baby, HeartHandshake, Milk, Syringe } from "lucide-react";

/**
 * Icon mapping for service categories
 */
const iconMap: Record<ServiceIconName, React.ComponentType<{ className?: string }>> = {
  "baby": Baby,
  "heart-handshake": HeartHandshake,
  "milk": Milk,
  "syringe": Syringe,
};

/**
 * Pastel accent colors for service cards - each card gets a different soft color
 */
const cardAccentColors = [
  { border: "border-t-rose-300", hoverBg: "hover:bg-rose-50/50", iconBg: "bg-rose-100", iconColor: "text-rose-600" },
  { border: "border-t-sky-300", hoverBg: "hover:bg-sky-50/50", iconBg: "bg-sky-100", iconColor: "text-sky-600" },
  { border: "border-t-lavender-300", hoverBg: "hover:bg-lavender-50/50", iconBg: "bg-lavender-100", iconColor: "text-lavender-600" },
  { border: "border-t-cream-300", hoverBg: "hover:bg-cream-50/50", iconBg: "bg-amber-100", iconColor: "text-amber-600" },
];

/**
 * Services overview section for homepage.
 * Displays a grid of service category cards with links to dedicated service pages.
 */
export function ServicesOverview() {
  const allCategories = [
    ...serviceCategories.map(cat => ({
      id: cat.id,
      name: cat.name,
      description: cat.description,
      icon: cat.icon,
    })),
    {
      id: vaccinationsCategory.id,
      name: vaccinationsCategory.name,
      description: vaccinationsCategory.description,
      icon: vaccinationsCategory.icon,
    },
  ];

  return (
    <Container>
      <FadeIn className="text-center">
        <h2 className="font-serif text-3xl font-bold text-neutral-900 sm:text-4xl">
          Our Services
        </h2>
        <p className="mt-4 text-lg text-neutral-600">
          Comprehensive care for every stage of your motherhood journey
        </p>
      </FadeIn>

      <FadeInStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.08}>
        {allCategories.map((category, index) => {
          const accentColor = cardAccentColors[index % cardAccentColors.length];
          const IconComponent = iconMap[category.icon];
          const isPopular = index === 0; // Pregnancy & Preparation is most popular
          return (
            <FadeInStaggerItem key={category.id}>
              <Card className={`relative flex h-full flex-col border-t-4 ${accentColor.border} ${accentColor.hoverBg} transition-colors`}>
                {/* Popular badge */}
                {isPopular && (
                  <div className="absolute -top-3 right-4">
                    <span className="inline-flex items-center rounded-full bg-primary-600 px-3 py-1 text-xs font-medium text-white shadow-sm">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="flex-grow">
                  {/* Icon */}
                  <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${accentColor.iconBg}`}>
                    <IconComponent className={`h-6 w-6 ${accentColor.iconColor}`} aria-hidden="true" />
                  </div>
                  <CardTitle>{category.name}</CardTitle>
                  <CardDescription className="mt-2">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button href={`/services/${category.id}`} variant="ghost" className="w-full justify-start px-0 text-primary-600 hover:text-primary-700">
                    Learn more
                    <span className="ml-1" aria-hidden="true">&rarr;</span>
                  </Button>
                </CardFooter>
              </Card>
            </FadeInStaggerItem>
          );
        })}
      </FadeInStagger>
    </Container>
  );
}
