"use client";

import { Container } from "@/components/ui/container";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/ui/motion";
import { Heart, Users, Baby, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    value: 500,
    suffix: "+",
    label: "Happy Families",
    icon: Users,
    description: "Trusted by parents across Cape Town",
  },
  {
    value: 25,
    suffix: "+",
    label: "Years Experience",
    icon: Heart,
    description: "Caring for mothers since 1996",
  },
  {
    value: 1000,
    suffix: "+",
    label: "Babies Vaccinated",
    icon: Baby,
    description: "Safe, gentle immunizations",
  },
  {
    value: 200,
    suffix: "+",
    label: "Classes Taught",
    icon: Calendar,
    description: "Antenatal preparation courses",
  },
];

/**
 * Stats section with animated counters that count up when scrolled into view.
 * Displays key metrics to build trust and credibility.
 */
export function Stats() {
  return (
    <Container>
      <FadeIn className="text-center mb-12">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
          Our Impact
        </span>
        <h2 className="font-serif text-3xl font-bold sm:text-4xl text-neutral-900">
          Trusted by <span className="text-gradient">Families</span>
        </h2>
        <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
          Over two decades of dedicated care for mothers and babies in Cape Town
        </p>
      </FadeIn>

      <FadeInStagger
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        staggerDelay={0.1}
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <FadeInStaggerItem key={index}>
              <motion.div
                className="relative p-6 rounded-2xl bg-white border border-neutral-200 text-center group hover:border-primary-200 hover:shadow-lg transition-all duration-300"
                whileHover={{ y: -4 }}
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative">
                  {/* Icon */}
                  <motion.div
                    className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 text-primary-600"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </motion.div>

                  {/* Counter */}
                  <div className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-2">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      duration={2.5}
                    />
                  </div>

                  {/* Label */}
                  <h3 className="font-semibold text-neutral-900 mb-1">
                    {stat.label}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-neutral-500">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            </FadeInStaggerItem>
          );
        })}
      </FadeInStagger>
    </Container>
  );
}
