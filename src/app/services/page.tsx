import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { serviceCategories, vaccinationsCategory, isExpandableService } from "@/data/services";
import { VaccineDropdown } from "@/components/ui/vaccine-dropdown";
import { ExpandableService } from "@/components/ui/expandable-service";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Our Services | ${SITE_CONFIG.shortName}`,
  description:
    "Antenatal classes, postnatal support, breastfeeding consultations, and baby vaccinations in Cape Town.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <Section variant="primary">
        <Container>
          <div className="text-center">
            <h1 className="font-serif text-4xl font-bold text-neutral-900 sm:text-5xl">
              Our Services
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600">
              Comprehensive care for every stage of your motherhood journey, from
              pregnancy preparation to ongoing support.
            </p>
          </div>
        </Container>
      </Section>

      {/* Service Categories Grid - 2x2 */}
      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            {/* Regular service categories */}
            {serviceCategories.map((category) => (
              <Card key={category.id} id={category.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-2xl">{category.name}</CardTitle>
                  <CardDescription className="mt-2">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {category.services.map((service, index) =>
                      isExpandableService(service) ? (
                        <li key={index}>
                          <ExpandableService service={service} />
                        </li>
                      ) : (
                        <li key={index}>
                          <a
                            href={service.bookingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white px-4 py-3 transition-colors hover:border-primary-300 hover:bg-primary-50"
                          >
                            <div>
                              <span className="block font-medium text-neutral-900">
                                {service.name}
                              </span>
                              <span className="block text-sm text-neutral-500">
                                {service.price} ({service.duration})
                              </span>
                            </div>
                            <span className="text-primary-600">Book &rarr;</span>
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                </CardContent>
              </Card>
            ))}

            {/* Vaccinations category with stacked dropdowns */}
            <Card id={vaccinationsCategory.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl">{vaccinationsCategory.name}</CardTitle>
                <CardDescription className="mt-2">
                  {vaccinationsCategory.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-3">
                  {vaccinationsCategory.categories.map((vaccineCategory, index) => (
                    <VaccineDropdown key={index} category={vaccineCategory} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
