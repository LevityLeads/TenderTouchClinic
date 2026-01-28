import { serviceCategories, vaccinationsCategory } from "./services";

/**
 * Extended content for dedicated service category pages
 */
export interface ServicePageContent {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  introduction: string;
  whatToExpect: string[];
  whyChooseUs?: string[];
}

/**
 * Content for each service category page
 */
export const servicePageContent: Record<string, ServicePageContent> = {
  "pregnancy-preparation": {
    slug: "pregnancy-preparation",
    title: "Pregnancy & Preparation",
    subtitle: "Expert guidance as you prepare for parenthood",
    heroImage: "/images/services/pregnancy-preparation-hero.jpg",
    introduction:
      "Preparing for your baby's arrival is an exciting journey. Our pregnancy and preparation services are designed to give you the knowledge, confidence, and support you need. From one-on-one antenatal consultations to comprehensive parent preparation classes, we're here to help you feel ready for birth and beyond.",
    whatToExpect: [
      "Personalised guidance tailored to your pregnancy journey",
      "Evidence-based information on birth, breastfeeding, and newborn care",
      "A calm, supportive environment to ask questions and address concerns",
      "Practical skills you can use from day one with your baby",
    ],
    whyChooseUs: [
      "Over 25 years of midwifery experience",
      "Small class sizes for personalised attention",
      "Flexible scheduling to suit your needs",
    ],
  },
  "postnatal-support": {
    slug: "postnatal-support",
    title: "Postnatal Support",
    subtitle: "Caring for you and your baby in the early weeks",
    heroImage: "/images/services/postnatal-support-hero.jpg",
    introduction:
      "The first weeks with your newborn are precious but can also feel overwhelming. Our postnatal support services provide hands-on help and reassurance when you need it most. Whether at home or in-clinic, we offer check-ups for both mom and baby, feeding support, and guidance to help you settle into your new routine with confidence.",
    whatToExpect: [
      "Thorough assessment of mom's recovery and baby's wellbeing",
      "Practical feeding support and guidance",
      "Weight checks and growth monitoring for baby",
      "Emotional support and reassurance during the adjustment period",
    ],
    whyChooseUs: [
      "Home visits available for your convenience",
      "Discovery medical aid clients may qualify for free visits",
      "Continuity of care from pregnancy through postnatal period",
    ],
  },
  "breastfeeding-lactation": {
    slug: "breastfeeding-lactation",
    title: "Breastfeeding & Lactation",
    subtitle: "Expert support for your breastfeeding journey",
    heroImage: "/images/services/breastfeeding-lactation-hero.jpg",
    introduction:
      "Breastfeeding is natural, but that doesn't mean it's always easy. Our lactation consultants provide compassionate, expert support to help you overcome challenges and find what works best for you and your baby. Whether you're dealing with latch issues, low supply concerns, or just need reassurance, we're here to help.",
    whatToExpect: [
      "Thorough assessment of feeding and latch",
      "Practical positioning and attachment guidance",
      "Support for common challenges like engorgement or mastitis",
      "A non-judgmental space to discuss your feeding goals",
    ],
    whyChooseUs: [
      "SACLC-certified lactation consultant available",
      "Flexible consultation options to suit your schedule",
      "Follow-up support to track your progress",
    ],
  },
  "baby-vaccinations": {
    slug: "baby-vaccinations",
    title: "Baby Vaccinations",
    subtitle: "Essential immunisations in a calm, caring environment",
    heroImage: "/images/services/baby-vaccinations-hero.jpg",
    introduction:
      "Keeping your baby protected with timely vaccinations is one of the most important things you can do as a parent. At Tender Touch, we administer both state-subsidised and private vaccines in a gentle, unhurried setting. We take the time to answer your questions and make the experience as stress-free as possible for both you and your little one.",
    whatToExpect: [
      "Clear explanation of each vaccine and what it protects against",
      "Gentle administration techniques to minimise discomfort",
      "Advice on managing any mild side effects at home",
      "Reminders and guidance on the recommended vaccination schedule",
    ],
    whyChooseUs: [
      "Comprehensive range of state and private vaccines",
      "Convenient combo appointments to reduce visits",
      "Patient, child-friendly approach",
    ],
  },
};

/**
 * Get service category data by slug
 */
export function getServiceCategoryBySlug(slug: string) {
  if (slug === "baby-vaccinations") {
    return vaccinationsCategory;
  }
  return serviceCategories.find((cat) => cat.id === slug);
}

/**
 * Get page content by slug
 */
export function getServicePageContent(slug: string): ServicePageContent | undefined {
  return servicePageContent[slug];
}
