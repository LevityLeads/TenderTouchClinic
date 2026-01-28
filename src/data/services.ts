export interface Service {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  pricing: {
    amount: number;
    currency: string;
    unit: string;
  };
  duration?: string;
  includes?: string[];
  ctaText: string;
  ctaHref: string;
  image: string;
}

export const BOOKEM_URL = "https://tendertouchclinic.bookem.com/";

export const services: Service[] = [
  {
    id: "antenatal-classes",
    name: "Antenatal Classes",
    slug: "antenatal-classes",
    shortDescription:
      "6-week comprehensive preparation course for expectant parents",
    fullDescription:
      "Our comprehensive 6-week antenatal course prepares you and your partner for labour, birth, and the early weeks with your newborn. Led by Megan, a registered midwife with over 25 years of experience, each session covers essential topics in a warm, supportive environment. Small groups of 6-7 couples ensure personalized attention and lasting connections with other expectant parents.",
    benefits: [
      "Small group of 6-7 couples for personalized attention",
      "Covers labour, birth, breastfeeding, and newborn care",
      "Build community with other expectant parents",
      "Partner involvement throughout the course",
      "Evidence-based information with practical demonstrations",
    ],
    pricing: {
      amount: 3500,
      currency: "ZAR",
      unit: "per couple, 6-week course",
    },
    duration: "6 weeks (one 2-hour session per week)",
    includes: [
      "Course materials and handouts",
      "Tea and refreshments",
      "Private WhatsApp group for ongoing support",
      "Access to resources and reference materials",
    ],
    ctaText: "Book Now",
    ctaHref: BOOKEM_URL,
    image: "/images/services/antenatal-classes.svg",
  },
  {
    id: "postnatal-support",
    name: "Postnatal Support",
    slug: "postnatal-support",
    shortDescription:
      "Home visits and clinic consultations for new mothers and babies",
    fullDescription:
      "The early weeks with a new baby can be overwhelming. Our postnatal support services provide the guidance and reassurance you need, whether at home or in our clinic. Megan offers comprehensive assessments of both mother and baby, breastfeeding support, practical advice, and a listening ear during this precious but challenging time.",
    benefits: [
      "Convenient home visits or clinic appointments",
      "Comprehensive mother and baby check-ups",
      "Expert breastfeeding support and guidance",
      "Emotional support during the postpartum period",
      "Flexible scheduling to suit your needs",
    ],
    pricing: {
      amount: 800,
      currency: "ZAR",
      unit: "per home visit / R500 clinic visit",
    },
    duration: "60-90 minutes per visit",
    includes: [
      "Full assessment of mother and baby",
      "Breastfeeding evaluation and support",
      "Written summary of visit",
      "Follow-up WhatsApp support",
    ],
    ctaText: "Book Now",
    ctaHref: BOOKEM_URL,
    image: "/images/services/postnatal-support.svg",
  },
  {
    id: "baby-massage",
    name: "Baby Massage",
    slug: "baby-massage",
    shortDescription:
      "4-week course teaching gentle massage techniques for your baby",
    fullDescription:
      "Baby massage is a wonderful way to bond with your little one while supporting their development and wellbeing. Our 4-week course, taught by Megan as a certified IAIM instructor, teaches you gentle, nurturing techniques that can help with colic, sleep, and general relaxation. Suitable for babies from 6 weeks to pre-crawling.",
    benefits: [
      "Strengthens parent-baby bonding",
      "May help relieve colic and gas",
      "Promotes better sleep patterns",
      "Stimulates baby's development",
      "Provides relaxation for both baby and parent",
    ],
    pricing: {
      amount: 1200,
      currency: "ZAR",
      unit: "per 4-week course",
    },
    duration: "4 weeks (one 1-hour session per week)",
    includes: [
      "Massage oil provided",
      "Take-home instruction card",
      "Small group setting (max 6 babies)",
      "Catch-up session if you miss a class",
    ],
    ctaText: "Book Now",
    ctaHref: BOOKEM_URL,
    image: "/images/services/baby-massage.svg",
  },
  {
    id: "lactation-consultations",
    name: "Lactation Consultations",
    slug: "lactation-consultations",
    shortDescription:
      "One-on-one support for breastfeeding challenges and questions",
    fullDescription:
      "Breastfeeding doesn't always come naturally, and that's okay. Our lactation consultations provide dedicated time to address your specific concerns, whether it's latch issues, low supply worries, returning to work, or weaning questions. As a trained breastfeeding counsellor, Megan offers evidence-based guidance tailored to your situation.",
    benefits: [
      "Personalized assessment and advice",
      "Hands-on latch support",
      "Problem-solving for specific challenges",
      "Confidence-building guidance",
      "No rush - dedicated time for your concerns",
    ],
    pricing: {
      amount: 600,
      currency: "ZAR",
      unit: "per session",
    },
    duration: "45-60 minutes",
    ctaText: "Book Now",
    ctaHref: BOOKEM_URL,
    image: "/images/services/lactation-consultations.svg",
  },
  {
    id: "newborn-checkups",
    name: "Newborn Check-ups",
    slug: "newborn-checkups",
    shortDescription:
      "Regular weighing and health assessments for your baby",
    fullDescription:
      "Regular check-ups give you peace of mind about your baby's growth and development. Our newborn assessments include weighing, feeding evaluation, and a chance to ask any questions. It's a supportive, unhurried appointment where no concern is too small.",
    benefits: [
      "Accurate weight tracking",
      "Feeding assessment",
      "Development monitoring",
      "Reassurance and guidance",
      "Quick, convenient appointments",
    ],
    pricing: {
      amount: 400,
      currency: "ZAR",
      unit: "per visit",
    },
    duration: "20-30 minutes",
    ctaText: "Book Now",
    ctaHref: BOOKEM_URL,
    image: "/images/services/newborn-checkups.svg",
  },
  {
    id: "vaccinations",
    name: "Vaccinations",
    slug: "vaccinations",
    shortDescription:
      "Essential immunizations administered in a caring environment",
    fullDescription:
      "We offer essential vaccinations for babies and toddlers in a calm, supportive environment. Megan takes the time to explain each vaccine, answer your questions, and ensure your little one is as comfortable as possible. We follow the South African immunization schedule and can advise on additional optional vaccines.",
    benefits: [
      "Calm, unhurried environment",
      "Clear explanation of vaccines",
      "Comfortable setting for your baby",
      "Immunization record keeping",
      "Advice on vaccine schedule",
    ],
    pricing: {
      amount: 0,
      currency: "ZAR",
      unit: "Price varies by vaccine",
    },
    duration: "15-20 minutes",
    ctaText: "Book Now",
    ctaHref: BOOKEM_URL,
    image: "/images/services/vaccinations.svg",
  },
];

/**
 * Find a service by its URL slug.
 * @param slug - The URL-friendly identifier for the service
 * @returns The service if found, undefined otherwise
 */
export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
