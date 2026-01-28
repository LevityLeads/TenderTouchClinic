"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { serviceCategories, vaccinationsCategory, isExpandableService, type ServiceIconName } from "@/data/services";
import { VaccineDropdown } from "@/components/ui/vaccine-dropdown";
import { ExpandableService } from "@/components/ui/expandable-service";
import { Button } from "@/components/ui/button";
import { Baby, HeartHandshake, Milk, Syringe, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/ui/motion";

// Map icon names to Lucide components
const iconMap: Record<ServiceIconName, typeof Baby> = {
  baby: Baby,
  "heart-handshake": HeartHandshake,
  milk: Milk,
  syringe: Syringe,
};

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <Section variant="primary">
        <Container>
          <FadeIn className="text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
              Our Services
            </span>
            <h1 className="font-serif text-4xl font-bold text-neutral-900 sm:text-5xl">
              Comprehensive <span className="text-gradient">Care</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600">
              Expert support for every stage of your motherhood journey, from
              pregnancy preparation to ongoing care.
            </p>
          </FadeIn>
        </Container>
      </Section>

      {/* Service Categories Grid - 2x2 */}
      <Section>
        <Container>
          <FadeInStagger className="grid gap-8 md:grid-cols-2" staggerDelay={0.1}>
            {/* Regular service categories */}
            {serviceCategories.map((category) => {
              const Icon = iconMap[category.icon];
              return (
                <FadeInStaggerItem key={category.id}>
                  <Card id={category.id} className="flex flex-col h-full group" glow>
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        {/* Animated Icon */}
                        <motion.div
                          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 text-primary-600"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Icon className="h-7 w-7" aria-hidden="true" />
                        </motion.div>
                        <div>
                          <CardTitle className="text-2xl">{category.name}</CardTitle>
                          <CardDescription className="mt-1">
                            {category.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col">
                      <ul className="space-y-3 flex-grow">
                        {category.services.map((service, index) =>
                          isExpandableService(service) ? (
                            <li key={index}>
                              <ExpandableService service={service} />
                            </li>
                          ) : (
                            <li key={index}>
                              <motion.a
                                href={service.bookingUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white px-4 py-3 transition-all duration-200 hover:border-primary-300 hover:bg-primary-50 hover:shadow-sm group/item"
                                whileHover={{ x: 4 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                              >
                                <div>
                                  <span className="block font-medium text-neutral-900">
                                    {service.name}
                                  </span>
                                  <span className="block text-sm text-neutral-500">
                                    <span className="font-semibold text-primary-600">{service.price}</span>
                                    {" "}
                                    <span className="text-neutral-400">|</span>
                                    {" "}
                                    {service.duration}
                                  </span>
                                </div>
                                <span className="flex items-center gap-1 text-primary-600 font-medium">
                                  Book
                                  <ArrowRight className="h-4 w-4 transition-transform group-hover/item:translate-x-1" />
                                </span>
                              </motion.a>
                            </li>
                          )
                        )}
                      </ul>
                      <div className="mt-4 pt-4 border-t border-neutral-100">
                        <Button
                          href={`/services/${category.id}`}
                          variant="ghost"
                          className="w-full justify-center text-primary-600 hover:text-primary-700 hover:bg-primary-50"
                        >
                          Find out more
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </FadeInStaggerItem>
              );
            })}

            {/* Vaccinations category with stacked dropdowns */}
            <FadeInStaggerItem>
              <Card id={vaccinationsCategory.id} className="flex flex-col h-full" glow>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    {/* Animated Icon */}
                    <motion.div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 text-primary-600"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Syringe className="h-7 w-7" aria-hidden="true" />
                    </motion.div>
                    <div>
                      <CardTitle className="text-2xl">{vaccinationsCategory.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {vaccinationsCategory.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <div className="space-y-3 flex-grow">
                    {vaccinationsCategory.categories.map((vaccineCategory, index) => (
                      <VaccineDropdown key={index} category={vaccineCategory} />
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-neutral-100">
                    <Button
                      href={`/services/${vaccinationsCategory.id}`}
                      variant="ghost"
                      className="w-full justify-center text-primary-600 hover:text-primary-700 hover:bg-primary-50"
                    >
                      Find out more
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </FadeInStaggerItem>
          </FadeInStagger>
        </Container>
      </Section>
    </>
  );
}
