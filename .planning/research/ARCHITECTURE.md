# Architecture Research

**Domain:** Healthcare/Clinic Website (Mother & Baby Clinic)
**Researched:** 2026-01-27
**Confidence:** HIGH

## Executive Summary

Modern clinic websites follow a **content-first, interaction-light** architecture. For Tender Touch Mother & Baby Clinic, the recommended architecture is a **static-first Next.js App Router application** with client islands for interactive elements (booking widget, contact forms, WhatsApp button). Given the "rarely updated content" requirement, this is an ideal fit for Static Site Generation (SSG) with minimal dynamic components.

---

## System Overview

```
+-------------------------------------------------------------------------+
|                           USER INTERFACE LAYER                           |
|  +-------------+  +-------------+  +-------------+  +-------------+     |
|  |   Pages     |  |   Layouts   |  | UI Components|  | Integrations|     |
|  | (Static SSG)|  | (Shared UI) |  |  (Reusable) |  | (3rd Party) |     |
|  +------+------+  +------+------+  +------+------+  +------+------+     |
|         |                |                |                |             |
+---------+----------------+----------------+----------------+-------------+
          |                |                |                |
+---------+----------------+----------------+----------------+-------------+
|                         COMPONENT LAYER                                  |
|  +------------------+  +------------------+  +------------------+        |
|  |  Page Sections   |  |   UI Primitives  |  |  Feature Comps   |        |
|  |  (Hero, About,   |  |  (Button, Card,  |  |  (ContactForm,   |        |
|  |   Services...)   |  |   Image, Nav)    |  |   BookingEmbed)  |        |
|  +--------+---------+  +--------+---------+  +--------+---------+        |
+-----------+---------------------+---------------------+-----------------+
            |                     |                     |
+-----------+---------------------+---------------------+-----------------+
|                         DATA / CONTENT LAYER                             |
|  +------------------+  +------------------+  +------------------+        |
|  |  Static Content  |  |   Assets (imgs)  |  |  Configuration   |        |
|  |  (services.ts,   |  |  (public/images) |  |  (site metadata) |        |
|  |   team.ts, etc.) |  |                  |  |                  |        |
|  +------------------+  +------------------+  +------------------+        |
+-------------------------------------------------------------------------+
            |                     |                     |
+-----------+---------------------+---------------------+-----------------+
|                      EXTERNAL INTEGRATIONS                               |
|  +----------+  +----------+  +----------+  +----------+  +----------+   |
|  |  Bookem  |  | WhatsApp |  |  Google  |  |  Email   |  |  Google  |   |
|  | (Booking)|  |  (Chat)  |  |   Maps   |  | (Forms)  |  | Analytics|   |
|  +----------+  +----------+  +----------+  +----------+  +----------+   |
+-------------------------------------------------------------------------+
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| **Pages** | Route definitions, SEO metadata, page composition | `app/page.tsx`, `app/services/page.tsx` |
| **Layouts** | Shared structure (header, footer, nav) | `app/layout.tsx` with nested layouts |
| **UI Components** | Reusable visual primitives | `components/ui/button.tsx`, `components/ui/card.tsx` |
| **Page Sections** | Full-width composable blocks | `components/sections/hero.tsx`, `components/sections/testimonials.tsx` |
| **Feature Components** | Interactive functionality | `components/features/contact-form.tsx`, `components/features/booking-embed.tsx` |
| **Static Content** | Site copy, service data, team info | `lib/data/services.ts`, `lib/data/team.ts` |
| **Integrations** | Third-party service connections | Bookem embed, Google Maps, WhatsApp links |

---

## Recommended Project Structure

```
src/
├── app/                          # Next.js App Router (routes)
│   ├── layout.tsx               # Root layout (header, footer, metadata)
│   ├── page.tsx                 # Homepage
│   ├── about/
│   │   └── page.tsx             # About/credentials page
│   ├── services/
│   │   ├── page.tsx             # Services overview
│   │   └── [slug]/
│   │       └── page.tsx         # Individual service pages
│   ├── classes/
│   │   └── page.tsx             # Class schedules
│   ├── contact/
│   │   └── page.tsx             # Contact form + map
│   └── book/
│       └── page.tsx             # Booking page (Bookem embed)
│
├── components/
│   ├── ui/                      # Primitive components (design system)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── image.tsx
│   ├── layout/                  # Structural components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── nav.tsx
│   │   └── mobile-nav.tsx
│   ├── sections/                # Page section blocks
│   │   ├── hero.tsx
│   │   ├── services-grid.tsx
│   │   ├── testimonials.tsx
│   │   ├── team-intro.tsx
│   │   ├── class-schedule.tsx
│   │   └── cta-section.tsx
│   └── features/                # Interactive components
│       ├── contact-form.tsx     # 'use client' - form handling
│       ├── booking-embed.tsx    # 'use client' - Bookem widget
│       ├── whatsapp-button.tsx  # 'use client' - floating action
│       └── google-map.tsx       # 'use client' - map embed
│
├── lib/
│   ├── data/                    # Static content data
│   │   ├── services.ts          # Service definitions
│   │   ├── team.ts              # Team member info
│   │   ├── testimonials.ts      # Testimonial content
│   │   └── classes.ts           # Class schedule data
│   ├── actions/                 # Server Actions
│   │   └── contact.ts           # Contact form submission
│   └── utils/                   # Utility functions
│       └── format.ts
│
├── styles/
│   └── globals.css              # Global styles + Tailwind
│
└── public/
    ├── images/                  # Optimized images
    │   ├── hero/
    │   ├── services/
    │   ├── team/
    │   └── testimonials/
    └── favicon.ico
```

### Structure Rationale

- **`app/`**: Contains only routing and page composition. Pages are thin - they import and compose section components.
- **`components/ui/`**: Design system primitives. Small, focused, highly reusable. No business logic.
- **`components/layout/`**: Structural elements shared across pages. Header/footer/nav live here.
- **`components/sections/`**: Page-level blocks that compose UI components. Each section is a complete visual unit (hero, testimonials grid, etc.).
- **`components/features/`**: Interactive components marked with `'use client'`. These are the "client islands" in our server-first architecture.
- **`lib/data/`**: Hardcoded content stored as TypeScript files. Easy to update, type-safe, no CMS overhead. Ideal for "rarely updated" sites.
- **`lib/actions/`**: Server Actions for form handling. Contact form submissions processed server-side.

---

## Architectural Patterns

### Pattern 1: Server-First with Client Islands

**What:** Render everything as Server Components by default. Only mark components as `'use client'` when they need interactivity (forms, embeds, animations).

**When to use:** Always for content-heavy sites like this clinic website.

**Trade-offs:**
- Pro: Minimal JavaScript sent to browser, faster initial load
- Pro: SEO-friendly (content rendered server-side)
- Con: Need to carefully plan component boundaries

**Example:**
```typescript
// components/sections/hero.tsx (Server Component - no directive needed)
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export function Hero() {
  return (
    <section className="relative h-screen">
      <Image src="/images/hero/mother-baby.jpg" fill alt="..." priority />
      <div className="absolute inset-0 flex flex-col justify-center">
        <h1>Tender Touch Mother & Baby Clinic</h1>
        <p>Compassionate care for your journey</p>
        <Button href="/book">Book Appointment</Button>
      </div>
    </section>
  )
}

// components/features/contact-form.tsx (Client Component)
'use client'

import { useActionState } from 'react'
import { submitContact } from '@/lib/actions/contact'

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, null)

  return (
    <form action={formAction}>
      <input name="name" required />
      <input name="email" type="email" required />
      <textarea name="message" required />
      <button type="submit" disabled={pending}>
        {pending ? 'Sending...' : 'Send Message'}
      </button>
      {state?.success && <p>Message sent!</p>}
    </form>
  )
}
```

### Pattern 2: Hardcoded Content with Type Safety

**What:** Store site content in TypeScript files rather than a CMS. Content is type-checked and co-located with the codebase.

**When to use:** Content updates are infrequent (monthly or less). No non-technical editors need access.

**Trade-offs:**
- Pro: Zero CMS complexity, no external dependencies
- Pro: Type-safe content, IDE autocomplete
- Pro: Content versioned with code (git history)
- Con: Requires developer to update content
- Con: Not suitable if frequent updates needed

**Example:**
```typescript
// lib/data/services.ts
export interface Service {
  slug: string
  title: string
  shortDescription: string
  fullDescription: string
  image: string
  duration: string
  price: string
}

export const services: Service[] = [
  {
    slug: 'prenatal-massage',
    title: 'Prenatal Massage',
    shortDescription: 'Gentle therapeutic massage for expectant mothers',
    fullDescription: 'Our prenatal massage is designed to...',
    image: '/images/services/prenatal-massage.jpg',
    duration: '60 min',
    price: 'R650'
  },
  // ... more services
]

// Usage in page (Server Component)
// app/services/page.tsx
import { services } from '@/lib/data/services'

export default function ServicesPage() {
  return (
    <main>
      {services.map(service => (
        <ServiceCard key={service.slug} service={service} />
      ))}
    </main>
  )
}
```

### Pattern 3: Third-Party Embed Isolation

**What:** Wrap third-party embeds (Bookem, Google Maps) in dedicated client components that handle loading states and errors gracefully.

**When to use:** Any external widget integration.

**Trade-offs:**
- Pro: Isolates third-party code from your components
- Pro: Can add loading skeletons and error boundaries
- Con: Slight complexity overhead

**Example:**
```typescript
// components/features/booking-embed.tsx
'use client'

import { useEffect, useRef, useState } from 'react'

interface BookingEmbedProps {
  bookemUrl: string
}

export function BookingEmbed({ bookemUrl }: BookingEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Bookem uses a div-based embed, not iframe
    // Load their script dynamically
    const script = document.createElement('script')
    script.src = 'https://bookem.com/widget.js'
    script.async = true
    script.onload = () => setIsLoading(false)
    script.onerror = () => setError('Failed to load booking system')
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  if (error) {
    return (
      <div className="text-center py-8">
        <p>{error}</p>
        <a href={bookemUrl} target="_blank" rel="noopener">
          Book directly on Bookem
        </a>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="min-h-[600px]">
      {isLoading && <BookingSkeleton />}
      <div id="bookem-widget" data-url={bookemUrl} />
    </div>
  )
}
```

### Pattern 4: Server Actions for Form Handling

**What:** Use Next.js Server Actions to handle form submissions server-side, avoiding the need for separate API routes.

**When to use:** Contact forms, newsletter signups, any form that needs server processing.

**Trade-offs:**
- Pro: No separate API routes to maintain
- Pro: Progressive enhancement (works without JS)
- Pro: Type-safe end-to-end
- Con: Limited to form actions (not arbitrary API calls)

**Example:**
```typescript
// lib/actions/contact.ts
'use server'

import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10)
})

export async function submitContact(prevState: unknown, formData: FormData) {
  const validated = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    message: formData.get('message')
  })

  if (!validated.success) {
    return { success: false, errors: validated.error.flatten() }
  }

  // Send email via Resend, SendGrid, or Nodemailer
  try {
    await sendEmail({
      to: 'clinic@tendertouchmb.co.za',
      subject: `Contact from ${validated.data.name}`,
      body: validated.data.message,
      replyTo: validated.data.email
    })
    return { success: true }
  } catch (e) {
    return { success: false, error: 'Failed to send message' }
  }
}
```

---

## Data Flow

### Static Content Flow (Build Time)

```
TypeScript Data Files (lib/data/*.ts)
           |
           v
    [Build Process]
           |
           v
   Server Components read data
           |
           v
      HTML Generated
           |
           v
    Static Pages Served
```

### Interactive Component Flow (Runtime)

```
User Interaction (click, form submit)
           |
           v
    Client Component
           |
           +---> Server Action (forms)
           |            |
           |            v
           |     Server Processing
           |            |
           |            v
           |     Response to Client
           |
           +---> External API (booking, maps)
                        |
                        v
                 Third-party handles
```

### Key Data Flows

1. **Page Content:** TypeScript data files -> Server Components -> Static HTML (build time)
2. **Contact Form:** User input -> Client Component -> Server Action -> Email service -> Response
3. **Booking:** User clicks -> Bookem widget loads -> Bookem handles entire flow externally
4. **WhatsApp:** User clicks -> Opens WhatsApp with pre-filled message (external)
5. **Google Maps:** Static embed loads -> User interacts with Google's UI (external)

---

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| **Bookem** | Div-based embed (NOT iframe) | Load their script, render their div. Responsive. Don't wrap in iframe. |
| **Google Maps** | Use `@next/third-parties` GoogleMapsEmbed | Lazy loads below fold. Requires API key. |
| **WhatsApp** | Simple `href="https://wa.me/..."` link | Can be floating button. Pre-fill message with URL params. |
| **Email (Forms)** | Server Action + Email API (Resend/SendGrid) | Process server-side. Never expose API keys client-side. |
| **Google Analytics** | Use `@next/third-parties` GoogleAnalytics | Add to root layout. Respect user consent. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Page -> Sections | Props (data) | Pages compose sections, pass content data |
| Sections -> UI | Props (visual) | Sections use UI primitives for consistency |
| Client Components -> Server Actions | FormData | Use `action` attribute on forms |
| Components -> Data | Import | Direct import from `lib/data/*.ts` files |

---

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-10k monthly visitors | Current architecture is perfect. Static pages serve instantly from CDN. |
| 10k-100k monthly visitors | Still fine. Ensure images optimized. Consider adding ISR if content updates more frequently. |
| 100k+ monthly visitors | Unlikely for a local clinic. If reached, add CDN caching headers, consider edge deployment. |

### Scaling Priorities (If Needed)

1. **First bottleneck:** Image loading on mobile. Solution: Next.js Image component handles this automatically with lazy loading, WebP conversion, and responsive sizes.
2. **Second bottleneck:** Third-party scripts blocking render. Solution: Already addressed by lazy-loading embeds and using `@next/third-parties`.

**Reality check:** A local mother & baby clinic is unlikely to exceed 10k monthly visitors. This architecture is already over-engineered for the expected scale.

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Over-Clientifying

**What people do:** Mark everything as `'use client'` because it's "easier" or "familiar from old React"

**Why it's wrong:** Ships unnecessary JavaScript, slower page loads, worse SEO, defeats Next.js benefits

**Do this instead:** Start with Server Components. Only add `'use client'` when you need hooks (useState, useEffect) or browser APIs.

### Anti-Pattern 2: Using a CMS for Rarely-Updated Content

**What people do:** Set up Contentful/Sanity/Strapi for a site that updates once a month

**Why it's wrong:** Adds complexity, costs money, requires CMS training, creates external dependency

**Do this instead:** For "rarely updated" sites, TypeScript data files are simpler, faster, and free. Upgrade to CMS only if update frequency increases.

### Anti-Pattern 3: Wrapping Bookem in an Iframe

**What people do:** Put the Bookem embed inside an `<iframe>` tag

**Why it's wrong:** Bookem explicitly states their embed is "not an iframe" and wrapping it can break responsive behavior

**Do this instead:** Use their div-based embed directly as documented.

### Anti-Pattern 4: Client-Side Form Handling

**What people do:** Use `fetch()` in client component to POST to an API route

**Why it's wrong:** More code, worse progressive enhancement, requires separate API route maintenance

**Do this instead:** Use Server Actions with `action={formAction}`. Works without JS, simpler code.

### Anti-Pattern 5: Deep Component Nesting

**What people do:** Create folder structures like `components/features/forms/contact/inputs/email/index.tsx`

**Why it's wrong:** Makes files hard to find, over-abstraction for simple components

**Do this instead:** Keep it flat. If a component is used in one place, keep it close to that place. Only extract to shared when truly reused.

---

## Build Order Implications

Based on component dependencies, the recommended build order is:

### Phase 1: Foundation (No Dependencies)
1. Project setup (Next.js, Tailwind, TypeScript config)
2. UI primitives (`components/ui/*`) - buttons, cards, inputs
3. Layout components (header, footer, nav)
4. Root layout with metadata

### Phase 2: Static Content (Depends on Phase 1)
1. Data files (`lib/data/*`) - services, team, testimonials
2. Section components (`components/sections/*`)
3. Static pages (home, about, services)

### Phase 3: Interactive Features (Depends on Phase 1)
1. Contact form with Server Action
2. WhatsApp floating button
3. Google Maps embed

### Phase 4: External Integrations (Depends on Phase 1)
1. Bookem booking embed
2. Google Analytics

### Phase 5: Polish (Depends on All)
1. Mobile responsiveness refinement
2. Loading states and error boundaries
3. Performance optimization
4. SEO final pass

**Parallelization opportunity:** Phases 2 and 3 can be built in parallel after Phase 1.

---

## Sources

**Next.js Architecture:**
- [Next.js Official Project Structure](https://nextjs.org/docs/app/getting-started/project-structure)
- [Next.js Architecture in 2026 - Server-First Patterns](https://www.yogijs.tech/blog/nextjs-project-architecture-app-router)
- [Next.js Folder Structure Best Practices 2026](https://www.codebydeep.com/blog/next-js-folder-structure-best-practices-for-scalable-applications-2026-guide)
- [Best Practices for Organizing Next.js 15](https://dev.to/bajrayejoon/best-practices-for-organizing-your-nextjs-15-2025-53ji)

**Healthcare Website Patterns:**
- [Healthcare Website Design Examples 2026](https://www.digitalsilk.com/digital-trends/best-healthcare-website-design-examples/)
- [Best Healthcare Website Examples](https://www.blendb2b.com/blog/best-healthcare-website-examples)

**Third-Party Integrations:**
- [Bookem Embedding Documentation](https://bookem.com/help/embeddingbookem) - Confirms div-based embed, not iframe
- [Next.js Third-Party Libraries Guide](https://nextjs.org/docs/app/guides/third-party-libraries)
- [@next/third-parties Package](https://www.npmjs.com/package/@next/third-parties)

**Forms and Server Actions:**
- [Next.js Forms Guide](https://nextjs.org/docs/app/guides/forms)
- [Next.js Server Actions Contact Form](https://web3forms.com/blog/nextjs-server-actions-contact-form)
- [Next.js Send Email Tutorial 2026](https://mailtrap.io/blog/nextjs-send-email/)

**State Management:**
- [State Management with Next.js App Router](https://www.pronextjs.dev/tutorials/state-management)
- [React Context State Management in Next.js](https://vercel.com/kb/guide/react-context-state-management-nextjs)

**Mobile-First Design:**
- [Mobile-First Development Best Practices with Next.js](https://dev.to/muzammilrawjani/mobile-first-development-best-practices-with-nextjs-and-mobile-first-css-1526)
- [Responsive Design Best Practices 2025](https://nextnative.dev/blog/responsive-design-best-practices)

---

*Architecture research for: Tender Touch Mother & Baby Clinic Website*
*Researched: 2026-01-27*
