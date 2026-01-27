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
    name: "Antenatal Classes",
    href: "/services/antenatal-classes",
    description: "6-week comprehensive preparation course for expectant parents",
  },
  {
    name: "Postnatal Support",
    href: "/services/postnatal-support",
    description: "Home visits and clinic consultations for new mothers",
  },
  {
    name: "Baby Massage",
    href: "/services/baby-massage",
    description: "4-week baby massage classes for bonding and development",
  },
  {
    name: "Lactation Consultations",
    href: "/services#lactation",
    description: "Expert breastfeeding support and guidance",
  },
  {
    name: "Newborn Check-ups",
    href: "/services#newborn-checkups",
    description: "Weighing, health checks, and developmental monitoring",
  },
  {
    name: "Vaccinations",
    href: "/services#vaccinations",
    description: "Essential vaccinations for babies and toddlers",
  },
] as const;

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
