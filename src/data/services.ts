/**
 * Service item with name, booking link, price, and duration
 */
export interface ServiceItem {
  name: string;
  bookingUrl: string;
  price: string;
  duration: string;
}

/**
 * Special expandable service (like Home Visits) with detailed info instead of direct booking
 */
export interface ExpandableServiceItem {
  name: string;
  isExpandable: true;
  content: {
    title: string;
    notice: string;
    description: string;
    pricing: { provider: string; details: string }[];
    contactInfo: string;
  };
}

/**
 * Vaccine item with age/name and booking link
 */
export interface VaccineItem {
  label: string;
  vaccines?: string;
  bookingUrl: string;
}

/**
 * Vaccine dropdown category
 */
export interface VaccineCategory {
  name: string;
  items: VaccineItem[];
}

/**
 * Icon names for service categories (using Lucide icon names)
 */
export type ServiceIconName = "baby" | "heart-handshake" | "milk" | "syringe";

/**
 * Service category with services
 */
export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: ServiceIconName;
  services: (ServiceItem | ExpandableServiceItem)[];
}

/**
 * Vaccinations category with dropdowns
 */
export interface VaccinationsCategory {
  id: string;
  name: string;
  description: string;
  icon: ServiceIconName;
  categories: VaccineCategory[];
}

/**
 * Type guard to check if a service is expandable
 */
export function isExpandableService(
  service: ServiceItem | ExpandableServiceItem
): service is ExpandableServiceItem {
  return "isExpandable" in service && service.isExpandable === true;
}

/**
 * Service categories data
 */
export const serviceCategories: ServiceCategory[] = [
  {
    id: "pregnancy-preparation",
    name: "Pregnancy & Preparation",
    description: "Prepare for your journey into parenthood with expert guidance and support",
    icon: "baby",
    services: [
      {
        name: "Antenatal Consultation",
        bookingUrl: "https://tendertouchclinic.bookem.com/services/5ae7a87799274fc9888ccf76aaa2758a",
        price: "R600",
        duration: "1 hour",
      },
      {
        name: "Antenatal & Parent Preparation Classes",
        bookingUrl: "https://tendertouchclinic.bookem.com/services/fe1281f7910d43b09d79fe8bfadb87cc",
        price: "R2,900",
        duration: "12 hours",
      },
      {
        name: "Pregnancy Vaccine (Adacel)",
        bookingUrl: "https://tendertouchclinic.bookem.com/services/ae58e163a4b442c0a805bfb65c85cb57",
        price: "R200",
        duration: "20 mins",
      },
    ],
  },
  {
    id: "postnatal-support",
    name: "Postnatal Support",
    description: "Comprehensive care for you and your baby in the early weeks and beyond",
    icon: "heart-handshake",
    services: [
      {
        name: "Home Visits",
        isExpandable: true,
        content: {
          title: "Home Visits - Postnatal check on mom & baby or Lactation Consultation",
          notice: "Please do not book online. This is for information only.",
          description:
            "Postnatal home visits are offered after discharge from hospital. Discovery clients are able to get up to 3 free postnatal visits in the first 6 weeks after baby is born, subject to availability. The first visit is always at home and subsequent follow-ups may be at the clinic or at home (depending on availability).",
          pricing: [
            { provider: "Sr Megan Benn", details: "First visit R950 (1hr 30min); follow-up R650 (1hr)" },
            { provider: "Sr Brigitte Williams", details: "R1,300 for 2 hours (Lactation Consultation)" },
          ],
          contactInfo:
            "To book, please WhatsApp Megan directly on 083 564 1671 or Brigitte on 082 497 8929.",
        },
      } as ExpandableServiceItem,
      {
        name: "Newborn Check (First Consultation)",
        bookingUrl: "https://tendertouchclinic.bookem.com/services/c909c6057fee496cb70f8f466d21feb9",
        price: "R600 - R900",
        duration: "1 - 1.5 hours",
      },
      {
        name: "General Consultation (Follow-ups)",
        bookingUrl: "https://tendertouchclinic.bookem.com/services/0140939ef99b433784c83ec159d44342",
        price: "R300 - R600",
        duration: "30 mins - 1 hour",
      },
    ],
  },
  {
    id: "breastfeeding-lactation",
    name: "Breastfeeding & Lactation",
    description: "Expert support for your breastfeeding journey",
    icon: "milk",
    services: [
      {
        name: "Breastfeeding Consultation (Sr Megan)",
        bookingUrl: "https://tendertouchclinic.bookem.com/services/3cf5f7f4ee9043299ffe1cacb3d6aed4",
        price: "R600 - R900",
        duration: "1 - 1.5 hours",
      },
      {
        name: "Lactation Consultation (Sr Brigitte - SACLC)",
        bookingUrl: "https://tendertouchclinic.bookem.com/services/9ef878824e1d47a99ae0a4a6e0c18531",
        price: "R1,100",
        duration: "1.5 hours",
      },
    ],
  },
];

/**
 * Vaccinations category with dropdown options
 */
export const vaccinationsCategory: VaccinationsCategory = {
  id: "baby-vaccinations",
  name: "Baby Vaccinations",
  description: "Essential immunizations in a calm, caring environment",
  icon: "syringe",
  categories: [
    {
      name: "State-Subsidised Schedule",
      items: [
        {
          label: "6 weeks",
          vaccines: "Polio, Rotarix, PCV 1, Hexaxim 1",
          bookingUrl: "https://tendertouchclinic.bookem.com/services/c9b1a71961054e959e67ff1a0fc68ab4",
        },
        {
          label: "10 weeks",
          vaccines: "Hexaxim 2",
          bookingUrl: "https://tendertouchclinic.bookem.com/services/5d1ddedcfb0a4cf0be3218ccf1c2a09d",
        },
        {
          label: "14 weeks",
          vaccines: "Rotarix 2, PCV 2, Hexaxim 3",
          bookingUrl: "https://tendertouchclinic.bookem.com/services/b1918515fbbc410ab90bd5c9ed71f340",
        },
        {
          label: "6 months",
          vaccines: "Measles/Rubella",
          bookingUrl: "https://tendertouchclinic.bookem.com/services/6e1baa5af8894af1a61d649deecbbbd7",
        },
        {
          label: "9 months",
          vaccines: "PCV 3",
          bookingUrl: "https://tendertouchclinic.bookem.com/services/b904703c465a48499bd13eb72f86a055",
        },
        {
          label: "18 months",
          vaccines: "Hexaxim 4 booster",
          bookingUrl: "https://tendertouchclinic.bookem.com/services/b4454c693aca43b78c7560fe4d210611",
        },
      ],
    },
    {
      name: "Private Vaccines",
      items: [
        {
          label: "MMR (12mo+)",
          bookingUrl: "https://tendertouchclinic.bookem.com/services/ef7b4ed508b34e21bb90bb322494f508",
        },
        {
          label: "Menactra - Meningitis A,C,W,Y (2yr+)",
          bookingUrl: "https://tendertouchclinic.bookem.com/services/ee8f7d8971484091881ebdb51583a6aa",
        },
        {
          label: "Bexsero - Meningitis B (8wk+)",
          bookingUrl: "https://tendertouchclinic.bookem.com/services/cb275e4a7b434e2295c666c77acc903c",
        },
        {
          label: "Chicken Pox",
          bookingUrl: "https://tendertouchclinic.bookem.com/services/eff0276ab45347a99bf73971910b4046",
        },
        {
          label: "Hepatitis A",
          bookingUrl: "https://tendertouchclinic.bookem.com/services/a1e647b0478741fba70cc577039d2be7",
        },
        {
          label: "6yr Booster (Adacel Quadra)",
          bookingUrl: "https://tendertouchclinic.bookem.com/services/d33698842c7742eb9f19bc690ceab7eb",
        },
      ],
    },
    {
      name: "Combo Appointments",
      items: [
        {
          label: "9mo: PCV + Menactra",
          bookingUrl: "https://tendertouchclinic.bookem.com/services/3ced9186b71447b9bd7a6c8be0456638",
        },
        {
          label: "12mo: MMR + Menactra",
          bookingUrl: "https://tendertouchclinic.bookem.com/services/68ec4f5b4b8a48228e3139bfb69c7064",
        },
        {
          label: "15mo: Chicken Pox + Hep A (dose 1)",
          bookingUrl: "https://tendertouchclinic.bookem.com/services/5f329377fb614d4fbbf9aba01e0db8c5",
        },
        {
          label: "18mo: Hexaxim + Hep A",
          bookingUrl: "https://tendertouchclinic.bookem.com/services/72d7c79bede648c7bd530b458702989a",
        },
        {
          label: "2yr: Chicken Pox + Hep A (dose 2)",
          bookingUrl: "https://tendertouchclinic.bookem.com/services/9e602138479b43a1aa37caf12db2027b",
        },
      ],
    },
  ],
};
