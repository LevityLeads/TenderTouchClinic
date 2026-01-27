---
phase: 02-static-content-and-pages
plan: 02
subsystem: ui
tags: [next.js, react, tailwind, server-components, static-pages]

# Dependency graph
requires:
  - phase: 02-01
    provides: Content data files (services.ts, testimonials.ts, about.ts)
  - phase: 01-foundation
    provides: UI primitives (Button, Container), design system tokens
provides:
  - Homepage with 6 sections (Hero, ServicesOverview, AboutIntro, Testimonials, CTA, TrustIndicators)
  - Services overview page with all 6 services and pricing
  - 3 service detail pages (antenatal-classes, baby-massage, postnatal-support)
  - UI primitives (Card, Section components)
affects: [02-03, 03-contact-and-forms, 04-polish]

# Tech tracking
tech-stack:
  added: [lucide-react icons]
  patterns: [Section component with variants, Card composition pattern]

key-files:
  created:
    - src/components/ui/card.tsx
    - src/components/ui/section.tsx
    - src/components/sections/hero.tsx
    - src/components/sections/services-overview.tsx
    - src/components/sections/about-intro.tsx
    - src/components/sections/testimonials.tsx
    - src/components/sections/cta-section.tsx
    - src/components/sections/trust-indicators.tsx
    - src/app/services/page.tsx
    - src/app/services/antenatal-classes/page.tsx
    - src/app/services/baby-massage/page.tsx
    - src/app/services/postnatal-support/page.tsx
  modified:
    - src/app/page.tsx

key-decisions:
  - "Section component with variant prop for consistent page section styling"
  - "Card composition pattern following shadcn/ui conventions"
  - "Gradient background for Hero instead of hero image (placeholder approach)"
  - "First-letter avatar placeholders for testimonials until real images available"
  - "Postnatal support uses 'Get in Touch' CTA vs 'Book' since it requires consultation first"

patterns-established:
  - "Section variant pattern: default (white), muted (neutral-50), primary (primary-50)"
  - "Service detail page pattern: breadcrumb, hero with pricing card, benefits grid, includes list, CTA"
  - "Alternating section backgrounds for visual rhythm on long pages"

# Metrics
duration: 14min
completed: 2026-01-27
---

# Phase 02 Plan 02: Homepage & Services Pages Summary

**Homepage with 6 content sections, services overview with pricing, and 3 service detail pages with full content, benefits, and booking CTAs**

## Performance

- **Duration:** 14 min
- **Started:** 2026-01-27T12:40:08Z
- **Completed:** 2026-01-27T12:54:00Z
- **Tasks:** 2
- **Files modified:** 13

## Accomplishments

- Created homepage with all 6 sections (Hero, Services, About, Testimonials, CTA, Trust)
- Built services overview page displaying all 6 services with visible pricing
- Created 3 service detail pages with benefits, what's included, pricing, and booking CTAs
- Established reusable UI primitives (Card, Section) following existing patterns

## Task Commits

Each task was committed atomically:

1. **Task 1: Create UI primitives and homepage section components** - `65fb43c` (feat)
2. **Task 2: Create homepage and services pages** - `1f9ad2c` (feat)

## Files Created/Modified

**UI Primitives:**
- `src/components/ui/card.tsx` - Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- `src/components/ui/section.tsx` - Section wrapper with variant backgrounds

**Homepage Sections:**
- `src/components/sections/hero.tsx` - Full-width hero with gradient and dual CTAs
- `src/components/sections/services-overview.tsx` - Grid of service cards from data
- `src/components/sections/about-intro.tsx` - Megan intro with credentials
- `src/components/sections/testimonials.tsx` - 3-column testimonial grid
- `src/components/sections/cta-section.tsx` - Call-to-action with booking/contact links
- `src/components/sections/trust-indicators.tsx` - Credentials with icons

**Pages:**
- `src/app/page.tsx` - Homepage composing all 6 sections
- `src/app/services/page.tsx` - Services overview with pricing grid
- `src/app/services/antenatal-classes/page.tsx` - Antenatal course detail
- `src/app/services/baby-massage/page.tsx` - Baby massage course detail
- `src/app/services/postnatal-support/page.tsx` - Postnatal support detail

## Decisions Made

1. **Section variant pattern:** Created Section component with 3 variants (default/white, muted/neutral-50, primary/primary-50) for consistent page section styling with alternating backgrounds.

2. **Gradient hero over image:** Used CSS gradient background for Hero section instead of requiring hero image. Provides visual impact while allowing content to be deployed without image assets.

3. **First-letter avatars:** Testimonial avatars use first letter of name as placeholder. Real images can be swapped in later via imageUrl property in data.

4. **Postnatal "Get in Touch" CTA:** Unlike antenatal and baby massage which link to /schedule, postnatal support uses "Get in Touch" linking to /contact since it typically requires initial consultation.

5. **Card composition pattern:** Followed shadcn/ui conventions with CardHeader, CardTitle, CardDescription, CardContent, CardFooter for flexible card layouts.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - build and TypeScript compilation succeeded on first attempt.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Homepage and services pages complete with all content
- Ready for 02-03 (About page and additional static pages)
- Photo gallery section component exists (from prior work), ready for use
- All CTAs link to /schedule and /contact which need implementation in Phase 3

---
*Phase: 02-static-content-and-pages*
*Completed: 2026-01-27*
