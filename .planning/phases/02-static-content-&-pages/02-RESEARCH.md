# Phase 2: Static Content & Pages - Research

**Researched:** 2026-01-27
**Domain:** Next.js 16 App Router static pages, accessible UI components (Accordion, Carousel), content data patterns
**Confidence:** HIGH

## Summary

Phase 2 transforms the foundation from Phase 1 into a complete content-rich website with all static pages. This phase covers the homepage (hero, services overview, testimonials, CTAs), service pages (overview + 3 detail pages), about page (Megan's bio, credentials, clinic story), class schedule page, FAQ section, and legal pages. The domain is primarily static content presentation with accessible interactive components.

The standard approach uses **Next.js 16 App Router with static rendering** for all pages (no dynamic data), **Radix UI primitives** (via shadcn/ui or direct) for accessible accordion and carousel components, **TypeScript data files** for content management, and the existing design tokens from Phase 1. Key patterns include: Server Components for all page content, Client Components only for interactive elements (accordions, carousels), static content in TypeScript files for type-safety, and semantic HTML with proper heading hierarchy.

**Primary recommendation:** Create TypeScript data files in `src/data/` for all content (services, testimonials, FAQs, schedule), use Radix UI Accordion for FAQs with WAI-ARIA compliance, and consider either a simple grid display or Embla Carousel for testimonials. All pages should be Server Components with client islands only for interactive sections.

## Standard Stack

The established libraries/tools for this phase:

### Core (Already Installed)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.x | App Router static pages | Already in use, default static rendering |
| React | 19.2.x | UI components | Already in use, Server Components default |
| Tailwind CSS | 4.1.x | Styling | Already in use, design tokens defined |
| lucide-react | 0.563.x | Icons | Already in use, 1600+ icons |

### New Dependencies

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|-------------|
| @radix-ui/react-accordion | 1.2.x | FAQ accordion | WAI-ARIA compliant, unstyled, 2,700+ projects use it |
| embla-carousel-react | 8.6.x | Testimonials carousel (optional) | ~7KB gzipped, accessibility-by-default, no dependencies |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Radix Accordion | Native `<details>/<summary>` | Native elements are simpler but have screen reader inconsistencies; Radix ensures WAI-ARIA compliance |
| Embla Carousel | Simple grid with no carousel | Grid is simpler, more accessible by default; carousel adds visual interest but complexity |
| TypeScript data files | Headless CMS | CMS adds complexity; content rarely updated, so static files are simpler |

**Installation:**

```bash
# Required for FAQ accordion
npm install @radix-ui/react-accordion

# Optional - only if using carousel for testimonials
npm install embla-carousel-react
```

## Architecture Patterns

### Recommended Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Homepage (HOME-01 to HOME-06)
│   ├── services/
│   │   ├── page.tsx                # Services overview (SERV-01)
│   │   ├── antenatal-classes/
│   │   │   └── page.tsx            # Detail page (SERV-02)
│   │   ├── baby-massage/
│   │   │   └── page.tsx            # Detail page (SERV-03)
│   │   └── postnatal-support/
│   │       └── page.tsx            # Detail page (SERV-04)
│   ├── about/
│   │   └── page.tsx                # About Megan (ABOUT-01 to ABOUT-06)
│   ├── schedule/
│   │   └── page.tsx                # Class schedule (SCHED-01 to SCHED-05)
│   ├── faq/
│   │   └── page.tsx                # FAQ section (FAQ-01 to FAQ-06)
│   ├── privacy/
│   │   └── page.tsx                # Privacy policy (LEGAL-01)
│   └── terms/
│       └── page.tsx                # Terms of service (LEGAL-02)
├── components/
│   ├── ui/
│   │   ├── accordion.tsx           # Radix-based accordion
│   │   ├── card.tsx                # Service/testimonial cards
│   │   └── section.tsx             # Page section wrapper
│   ├── sections/
│   │   ├── hero.tsx                # Homepage hero (HOME-01)
│   │   ├── services-overview.tsx   # Services grid (HOME-02)
│   │   ├── about-intro.tsx         # About section (HOME-03)
│   │   ├── testimonials.tsx        # Testimonials display (HOME-04)
│   │   ├── cta-section.tsx         # Call-to-action (HOME-05)
│   │   └── trust-indicators.tsx    # Credentials (HOME-06)
│   └── layout/                     # From Phase 1
├── data/
│   ├── services.ts                 # Service content + pricing
│   ├── testimonials.ts             # Client testimonials
│   ├── faq.ts                      # FAQ questions/answers by category
│   ├── schedule.ts                 # Upcoming class dates
│   └── about.ts                    # Megan's bio, credentials, clinic story
└── lib/
    ├── constants.ts                # From Phase 1
    └── utils.ts                    # From Phase 1
```

### Pattern 1: Static Content Data Files

**What:** Store all page content in TypeScript files with proper typing for maintainability.

**When to use:** All static content that rarely changes (services, testimonials, FAQs).

**Example:**
```typescript
// src/data/services.ts
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
    unit: string; // "per course", "per session"
  };
  duration?: string;
  includes?: string[];
  ctaText: string;
  ctaHref: string;
  isDetailPage: boolean; // true for antenatal, baby massage, postnatal
}

export const services: Service[] = [
  {
    id: "antenatal-classes",
    name: "Antenatal Classes",
    slug: "antenatal-classes",
    shortDescription: "6-week comprehensive preparation course for expectant parents",
    fullDescription: "Our comprehensive 6-week antenatal course prepares you and your partner for labour, birth, and the early weeks with your newborn...",
    benefits: [
      "Small group of 6-7 couples for personalized attention",
      "Covers labour, birth, breastfeeding, and newborn care",
      "Build community with other expectant parents",
      "Partner involvement throughout the course"
    ],
    pricing: {
      amount: 3500,
      currency: "ZAR",
      unit: "per couple, 6-week course"
    },
    duration: "6 weeks (one 2-hour session per week)",
    includes: [
      "Course materials and handouts",
      "Tea and refreshments",
      "Private WhatsApp group for ongoing support"
    ],
    ctaText: "Book Your Course",
    ctaHref: "/book?service=antenatal",
    isDetailPage: true
  },
  // ... more services
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(s => s.slug === slug);
}
```

### Pattern 2: Server Component Pages with Client Islands

**What:** Keep pages as Server Components, wrap only interactive parts in Client Components.

**When to use:** All page routes.

**Example:**
```typescript
// src/app/faq/page.tsx (Server Component - no directive)
import { Container } from "@/components/ui/container";
import { FAQAccordion } from "@/components/sections/faq-accordion"; // Client
import { faqsByCategory } from "@/data/faq";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Common questions about our antenatal classes, baby massage, postnatal support, and booking.",
};

export default function FAQPage() {
  return (
    <div className="py-section lg:py-section-lg">
      <Container>
        <h1 className="text-4xl font-bold text-neutral-900 sm:text-5xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-lg text-neutral-600 max-w-2xl">
          Find answers to common questions about our services, booking, and what to expect.
        </p>

        {/* Client Component for interactivity */}
        <div className="mt-12 space-y-12">
          {Object.entries(faqsByCategory).map(([category, faqs]) => (
            <section key={category}>
              <h2 className="text-2xl font-semibold text-neutral-800 mb-6">
                {category}
              </h2>
              <FAQAccordion items={faqs} />
            </section>
          ))}
        </div>
      </Container>
    </div>
  );
}
```

### Pattern 3: Accessible Accordion with Radix UI

**What:** Use Radix UI Accordion primitive for FAQ sections with full keyboard support and ARIA compliance.

**When to use:** FAQ section (FAQ-06 requires accordion/expandable format).

**Example:**
```typescript
// src/components/ui/accordion.tsx
"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b border-neutral-200", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 text-left font-medium",
        "hover:text-primary-600 transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
        "[&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown
        className="h-5 w-5 shrink-0 text-neutral-500 transition-transform duration-200"
        aria-hidden="true"
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-neutral-600",
      "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    )}
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
```

### Pattern 4: Hero Section with Optimized Image

**What:** Full-width hero section with background image, headline, and CTA using Next.js Image optimization.

**When to use:** Homepage hero (HOME-01).

**Example:**
```typescript
// src/components/sections/hero.tsx (Server Component)
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-[60vh] flex items-center">
      {/* Background Image */}
      <Image
        src="/images/hero/mother-baby.jpg"
        alt=""
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover"
        quality={85}
      />

      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-primary-800/60" />

      {/* Content */}
      <Container className="relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Nurturing Care for{" "}
            <span className="text-accent-300">Mothers & Babies</span>
          </h1>
          <p className="mt-6 text-xl text-primary-100 leading-relaxed">
            Expert midwifery support from pregnancy through your baby&apos;s first
            years. Antenatal classes, postnatal care, and baby massage in a warm,
            welcoming environment.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/book" size="lg" variant="primary">
              Book a Class
            </Button>
            <Button href="/services" size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              View Services
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

### Pattern 5: Service Card Grid

**What:** Responsive grid of service cards linking to detail pages or overview sections.

**When to use:** Services overview on homepage (HOME-02) and services page (SERV-01).

**Example:**
```typescript
// src/components/sections/services-overview.tsx
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
import Link from "next/link";

export function ServicesOverview() {
  return (
    <section className="py-section lg:py-section-lg bg-white">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Comprehensive care for every stage of your parenting journey
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.id}
              href={service.ctaHref}
              className="group block rounded-lg border border-neutral-200 bg-neutral-50 p-6 transition-all hover:border-primary-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              <h3 className="text-xl font-semibold text-neutral-900 group-hover:text-primary-600">
                {service.name}
              </h3>
              <p className="mt-2 text-neutral-600">{service.shortDescription}</p>
              <span className="mt-4 inline-flex items-center text-primary-600 font-medium">
                Learn more
                <span aria-hidden="true" className="ml-1 transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

### Pattern 6: Class Schedule Display

**What:** Display upcoming course dates with availability indicators.

**When to use:** Schedule page (SCHED-01 through SCHED-05).

**Example:**
```typescript
// src/data/schedule.ts
export interface ClassDate {
  id: string;
  serviceId: string;
  serviceName: string;
  startDate: string; // ISO date string
  time: string;
  duration: string;
  spotsTotal: number;
  spotsAvailable: number;
  status: "available" | "few-spots" | "full" | "waitlist";
}

export const upcomingClasses: ClassDate[] = [
  {
    id: "anc-2026-02",
    serviceId: "antenatal-classes",
    serviceName: "Antenatal Classes",
    startDate: "2026-02-15",
    time: "10:00 AM",
    duration: "6 weeks",
    spotsTotal: 7,
    spotsAvailable: 3,
    status: "few-spots"
  },
  // ... more dates
];

// src/components/sections/class-schedule.tsx
import { upcomingClasses } from "@/data/schedule";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns"; // date-fns for formatting

function getStatusBadge(status: ClassDate["status"]) {
  const styles = {
    "available": "bg-green-100 text-green-800",
    "few-spots": "bg-yellow-100 text-yellow-800",
    "full": "bg-neutral-100 text-neutral-600",
    "waitlist": "bg-primary-100 text-primary-800"
  };
  const labels = {
    "available": "Spots Available",
    "few-spots": "Few Spots Left",
    "full": "Full",
    "waitlist": "Join Waitlist"
  };
  return (
    <span className={`inline-flex px-2 py-1 text-sm font-medium rounded-full ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

export function ClassSchedule() {
  return (
    <div className="space-y-4">
      {upcomingClasses.map((cls) => (
        <div
          key={cls.id}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border border-neutral-200 bg-white"
        >
          <div>
            <h3 className="font-semibold text-neutral-900">{cls.serviceName}</h3>
            <p className="text-neutral-600">
              Starting {format(parseISO(cls.startDate), "MMMM d, yyyy")} at {cls.time}
            </p>
            <p className="text-sm text-neutral-500">{cls.duration}</p>
          </div>
          <div className="flex items-center gap-4">
            {getStatusBadge(cls.status)}
            <Button
              href={`/book?class=${cls.id}`}
              size="sm"
              variant={cls.status === "full" ? "secondary" : "primary"}
              disabled={cls.status === "full"}
            >
              {cls.status === "waitlist" ? "Join Waitlist" : "Book Now"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Anti-Patterns to Avoid

- **Over-clientifying:** Don't add `'use client'` to page components. Only interactive sections (accordions, carousels) need client-side rendering.
- **Inline content:** Don't hard-code content in components. Use TypeScript data files for maintainability.
- **Missing alt text:** Every image must have descriptive alt text (empty alt for decorative images only).
- **Skipping heading levels:** Use proper hierarchy (h1 > h2 > h3). Don't jump from h1 to h3.
- **Carousel for critical content:** Testimonials are important but not critical path. If carousel adds complexity, use a simple grid instead.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| FAQ accordion | Custom show/hide with state | Radix UI Accordion | Keyboard nav, ARIA, animation CSS variables built-in |
| Testimonials carousel | Custom slider with touch events | Embla Carousel or simple grid | Touch, accessibility, performance already solved |
| Image optimization | Manual resize, WebP conversion | next/image component | Automatic optimization, formats, responsive |
| Date formatting | Manual string manipulation | date-fns library | Localization, parsing, formatting edge cases handled |
| Content management | Database or CMS | TypeScript data files | Infrequent updates, type-safe, no infrastructure |

**Key insight:** For a site with rarely-updated content, TypeScript data files provide type-safety and simplicity. A headless CMS adds unnecessary complexity.

## Common Pitfalls

### Pitfall 1: Hero Image Causes LCP Regression

**What goes wrong:** Hero image lazy-loads by default, causing LCP > 2.5s.

**Why it happens:** Next.js Image defaults to lazy loading; developers forget `priority` prop.

**How to avoid:**
- Add `priority` and `fetchPriority="high"` to hero images
- Use appropriate `sizes` attribute: `sizes="100vw"` for full-width heroes
- Test with Lighthouse mobile throttling before shipping

**Warning signs:** PageSpeed Insights shows LCP element is the hero image, score > 2.5s.

### Pitfall 2: Accordion Content Hidden from Screen Readers When Collapsed

**What goes wrong:** Screen reader users can't discover content in collapsed accordion items.

**Why it happens:** Native `<details>/<summary>` has inconsistent screen reader support; custom accordions miss ARIA.

**How to avoid:**
- Use Radix UI Accordion which handles all ARIA attributes
- Test with VoiceOver/NVDA to verify content is announced correctly
- Ensure collapsed content is still findable via page search (Radix handles this)

**Warning signs:** Testing with screen reader shows content not announced or navigation issues.

### Pitfall 3: Service Cards Not Keyboard Focusable

**What goes wrong:** Tab navigation skips service cards; keyboard users can't access them.

**Why it happens:** Using `<div onClick>` instead of proper links or buttons.

**How to avoid:**
- Use `<Link>` component for navigation cards
- Ensure all interactive elements are focusable
- Add visible focus styles (`:focus-visible`)

**Warning signs:** Tab through page and cards are skipped.

### Pitfall 4: Missing Page Metadata for SEO

**What goes wrong:** Pages have generic or missing titles/descriptions, harming SEO.

**Why it happens:** Developers focus on UI, forget to export `metadata` object.

**How to avoid:**
- Every page.tsx must export `metadata: Metadata` with title and description
- Use template for consistent title pattern: `"Services | Tender Touch"`
- Include OpenGraph images for social sharing

**Warning signs:** Browser tab shows "page.tsx" or generic title.

### Pitfall 5: Content Duplication Between Data Files and Components

**What goes wrong:** Same content hard-coded in multiple places, gets out of sync.

**Why it happens:** Quick prototyping, then forgetting to consolidate.

**How to avoid:**
- Single source of truth: all content in `src/data/` files
- Components import and render data, never define content
- Type-check imports to catch missing data early

**Warning signs:** Updating content in one place doesn't update everywhere.

### Pitfall 6: Schedule Dates Hardcoded Instead of Sortable

**What goes wrong:** Past classes still display, or classes show in wrong order.

**Why it happens:** Dates stored as strings without parsing/filtering logic.

**How to avoid:**
- Store dates as ISO strings, parse with date-fns
- Filter out past dates before rendering
- Sort by date ascending (soonest first)

**Warning signs:** Manual date entry causes ordering bugs.

## Code Examples

Verified patterns from official sources:

### FAQ Data Structure

```typescript
// src/data/faq.ts
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQCategory {
  name: string;
  description?: string;
  items: FAQItem[];
}

export const faqsByCategory: Record<string, FAQItem[]> = {
  "Antenatal Classes": [
    {
      id: "anc-1",
      question: "When should I start antenatal classes?",
      answer: "We recommend starting around 26-28 weeks of pregnancy. This gives you enough time to complete the 6-week course before your due date while the information is still fresh."
    },
    {
      id: "anc-2",
      question: "Can my partner attend?",
      answer: "Absolutely! Our courses are designed for couples. Partners are encouraged to attend all sessions as they play an important role in labour support and early parenting."
    },
    // ... more FAQs
  ],
  "Baby Massage": [
    {
      id: "bm-1",
      question: "How old should my baby be?",
      answer: "Babies can start from 6 weeks old. The 4-week course is designed for babies up to about 6 months, before they become too mobile."
    },
    // ... more FAQs
  ],
  "Booking & Payment": [
    {
      id: "book-1",
      question: "How do I book a class?",
      answer: "You can book online through our booking system, or contact us directly via WhatsApp or phone. A deposit secures your spot."
    },
    // ... more FAQs
  ]
};
```

### Testimonials Data and Display

```typescript
// src/data/testimonials.ts
export interface Testimonial {
  id: string;
  name: string;
  service: string;
  quote: string;
  imageUrl?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Sarah M.",
    service: "Antenatal Classes",
    quote: "Megan's classes gave us the confidence we needed. The small group setting meant we could ask all our questions.",
    imageUrl: "/images/testimonials/sarah.jpg"
  },
  // ... more testimonials
];

// src/components/sections/testimonials.tsx
import { Container } from "@/components/ui/container";
import { testimonials } from "@/data/testimonials";
import { OptimizedImage } from "@/components/ui/image";

export function Testimonials() {
  return (
    <section className="py-section lg:py-section-lg bg-primary-50">
      <Container>
        <h2 className="text-3xl font-bold text-center text-neutral-900 sm:text-4xl">
          What Our Clients Say
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 3).map((t) => (
            <blockquote
              key={t.id}
              className="rounded-lg bg-white p-6 shadow-sm"
            >
              <p className="text-neutral-700 italic">"{t.quote}"</p>
              <footer className="mt-4 flex items-center gap-3">
                {t.imageUrl ? (
                  <OptimizedImage
                    src={t.imageUrl}
                    alt={`Photo of ${t.name}`}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-600 font-medium">
                      {t.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <cite className="not-italic font-medium text-neutral-900">
                    {t.name}
                  </cite>
                  <p className="text-sm text-neutral-500">{t.service}</p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

### About Page Bio Section

```typescript
// src/data/about.ts
export const meganBio = {
  name: "Megan Benn",
  title: "Registered Nurse & Midwife",
  credentials: [
    "Bachelor of Nursing, UCT (1996)",
    "Registered Nurse & Midwife",
    "Trained Breastfeeding Counsellor",
    "Certified Infant Massage Instructor (IAIM)"
  ],
  bio: `With over 25 years of nursing experience and as a mother of two teenagers, I understand the joys and challenges of parenthood firsthand.

After years of providing postnatal home visits, I opened Tender Touch Mother & Baby Clinic in January 2022 to create a warm, welcoming space where mothers can find the support they need.

My approach combines evidence-based care with genuine warmth and understanding. I believe every mother deserves personalized attention, which is why I keep my classes small and my consultations unhurried.`,
  personalNote: "When I'm not at the clinic, you'll find me enjoying Cape Town's beautiful outdoors with my family.",
  imageUrl: "/images/about/megan.jpg"
};

export const clinicStory = {
  founded: "January 2022",
  location: "Kirstenhof, Cape Town",
  description: "Tender Touch Mother & Baby Clinic grew from my successful postnatal home visit practice into a dedicated space where mothers can come for ongoing support and community.",
  mission: "To provide nurturing, evidence-based care in a warm environment where every mother feels supported and every baby thrives."
};
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `priority` prop for LCP images | `priority` or `loading="eager"` + `fetchPriority="high"` | Next.js 16 (2025) | More explicit control over preloading |
| Native `<details>/<summary>` | Radix UI Accordion | Ongoing | Better screen reader support, animation CSS variables |
| CMS for all content | TypeScript data files + CMS for frequently updated content | Ongoing | Simpler for static sites with infrequent updates |
| jQuery sliders | Embla Carousel (7KB) or no carousel | 2024+ | Dramatic bundle size reduction, better performance |
| CSS-only accordions | JS-enhanced with ARIA | Ongoing | Better accessibility, consistent cross-browser behavior |

**Deprecated/outdated:**
- react-accessible-accordion: Maintainer suggests native `<details>/<summary>` or Radix
- jQuery-based carousels: Heavy, not tree-shakeable
- CSS-only show/hide: Limited accessibility without JS enhancements

## Open Questions

Things that couldn't be fully resolved:

1. **Testimonials: Carousel vs Grid**
   - What we know: Carousels add visual interest but complexity; grids are simpler and more accessible
   - What's unclear: User preference for visual presentation
   - Recommendation: Start with simple grid of 3-5 testimonials; add carousel only if explicitly requested

2. **Photo Gallery Implementation (ABOUT-06)**
   - What we know: Next.js Image handles optimization; need responsive grid
   - What's unclear: Number of photos, whether lightbox is needed
   - Recommendation: Simple CSS grid with next/image; defer lightbox to later if needed

3. **Class Schedule Data Source**
   - What we know: TypeScript data files work for static content
   - What's unclear: Whether Bookem provides API for real-time availability
   - Recommendation: Start with static TypeScript data; integrate Bookem API in Phase 4 if available

4. **Legal Page Content**
   - What we know: Need Privacy Policy (LEGAL-01) and Terms (LEGAL-02)
   - What's unclear: Exact content and legal requirements for South Africa
   - Recommendation: Create placeholder pages with common sections; finalize content with client

## Sources

### Primary (HIGH confidence)
- [Radix UI Accordion Documentation](https://www.radix-ui.com/primitives/docs/components/accordion) - WAI-ARIA pattern, API reference
- [Next.js Image Component](https://nextjs.org/docs/app/api-reference/components/image) - priority, fetchPriority, sizes
- [Next.js 16 Blog Post](https://nextjs.org/blog/next-16) - Cache Components, PPR updates
- [shadcn/ui Accordion](https://ui.shadcn.com/docs/components/accordion) - Installation, styling patterns
- [shadcn/ui Carousel](https://ui.shadcn.com/docs/components/carousel) - Embla integration

### Secondary (MEDIUM confidence)
- [Embla Carousel](https://www.embla-carousel.com/) - Accessibility, React integration
- [WAI-ARIA Accordion Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/) - Accessibility requirements
- [Healthcare Website Design Best Practices](https://www.nopio.com/blog/clinic-website-design/) - Provider bio, about page patterns
- [Next.js Image Optimization Guide](https://www.debugbear.com/blog/nextjs-image-optimization) - LCP optimization

### Tertiary (LOW confidence - verify before using)
- Community carousel comparisons - verify specific bundle sizes
- Healthcare template examples - verify accessibility compliance

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All verified via official documentation, existing Phase 1 foundation
- Architecture patterns: HIGH - Patterns from Next.js docs, Radix UI docs, established React patterns
- Pitfalls: HIGH - Combined from Phase 1 research, official upgrade guides, accessibility testing resources

**Research date:** 2026-01-27
**Valid until:** 2026-02-27 (30 days - stable technologies, static content patterns)
