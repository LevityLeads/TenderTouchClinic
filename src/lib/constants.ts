/**
 * Site configuration and constants for Tender Touch Clinic
 */

export const SITE_CONFIG = {
  name: "Tender Touch Mother & Baby Clinic",
  shortName: "Tender Touch Clinic",
  description:
    "Private Mother & Baby Clinic in Cape Town offering antenatal classes, postnatal support, baby massage, lactation consultations, and newborn care.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://tendertouchclinic.co.za",
  locale: "en-ZA",
} as const;

export const CONTACT_INFO = {
  phone: "083 564 1671",
  phoneHref: "tel:+27835641671",
  whatsapp: "27835641671",
  email: "tendertouch.ct@gmail.com",
  emailHref: "mailto:tendertouch.ct@gmail.com",
  address: {
    street: "13 Nederburg Road",
    suburb: "Kirstenhof",
    city: "Cape Town",
    country: "South Africa",
    full: "13 Nederburg Road, Kirstenhof, Cape Town",
  },
} as const;

export const BUSINESS_HOURS = {
  weekdays: {
    days: "Monday - Friday",
    hours: "By appointment",
  },
  weekend: {
    days: "Saturday - Sunday",
    hours: "Closed",
  },
} as const;

export const SOCIAL_LINKS = {
  facebook: {
    url: "https://facebook.com/TenderTouchCapeTown",
    label: "Follow us on Facebook",
  },
  instagram: {
    url: "https://instagram.com/tendertouchclinic",
    label: "Follow us on Instagram",
  },
} as const;

export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Schedule", href: "/schedule" },
  { name: "Contact", href: "/contact" },
] as const;

export const SERVICES = [
  {
    name: "Pregnancy & Preparation",
    href: "/services#pregnancy-preparation",
    description: "Antenatal consultations and parent preparation classes",
  },
  {
    name: "Postnatal Support",
    href: "/services#postnatal-support",
    description: "Home visits and newborn consultations",
  },
  {
    name: "Breastfeeding & Lactation",
    href: "/services#breastfeeding-lactation",
    description: "Expert breastfeeding support and guidance",
  },
  {
    name: "Baby Vaccinations",
    href: "/services#baby-vaccinations",
    description: "State-subsidised and private vaccines",
  },
] as const;

/**
 * Bookem booking configuration
 */
export const BOOKEM_CONFIG = {
  businessSlug: "tendertouchclinic",
  baseUrl: "https://tendertouchclinic.bookem.com",
  // Service ID mapping for legacy detail pages
  services: {
    "antenatal-classes": "antenatal",
    "baby-massage": "baby-massage",
    "postnatal-support": "postnatal",
  },
} as const;

/**
 * Pre-filled WhatsApp message for inquiries
 */
export const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi, I would like to enquire about your services at Tender Touch Clinic."
);

/**
 * Generate WhatsApp chat URL
 */
export function getWhatsAppUrl(message?: string) {
  const msg = message ? encodeURIComponent(message) : WHATSAPP_MESSAGE;
  return `https://wa.me/${CONTACT_INFO.whatsapp}?text=${msg}`;
}
