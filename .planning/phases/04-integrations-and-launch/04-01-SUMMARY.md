---
phase: 04-integrations-and-launch
plan: 01
subsystem: integrations
tags: [bookem, booking, script, lazyOnload, widget, third-party]

# Dependency graph
requires:
  - phase: 02-static-content
    provides: Service detail pages structure
  - phase: 03-contact-and-forms
    provides: Contact information constants and patterns
provides:
  - BookemWidget client component with lazyOnload strategy
  - BOOKEM_CONFIG service ID mappings
  - /book standalone booking page
  - Embedded booking on service detail pages
affects: [04-02, deployment, seo]

# Tech tracking
tech-stack:
  added: []
  patterns: [lazyOnload third-party scripts, noscript fallbacks, overflow-x-hidden for widgets]

key-files:
  created:
    - src/components/integrations/bookem-widget.tsx
    - src/app/book/page.tsx
  modified:
    - src/lib/constants.ts
    - src/app/services/antenatal-classes/page.tsx
    - src/app/services/baby-massage/page.tsx
    - src/app/services/postnatal-support/page.tsx

key-decisions:
  - "lazyOnload strategy for Bookem script to prevent blocking page render"
  - "min-h-[500px] container to prevent CLS while widget loads"
  - "44px minimum touch targets for mobile accessibility"
  - "Fallback contact methods (phone, email, WhatsApp) when widget unavailable"
  - "noscript fallback with direct Bookem link for JavaScript-disabled browsers"

patterns-established:
  - "Third-party widget pattern: lazyOnload + loading state + error fallback + noscript"
  - "Integrations component directory: src/components/integrations/"

# Metrics
duration: 7min
completed: 2026-01-27
---

# Phase 04 Plan 01: Bookem Booking Widget Integration Summary

**Bookem booking widget with lazyOnload strategy, service pre-selection, mobile-optimized touch targets, and fallback contact methods**

## Performance

- **Duration:** 7 min
- **Started:** 2026-01-27T18:52:43Z
- **Completed:** 2026-01-27T19:00:00Z
- **Tasks:** 3
- **Files modified:** 6

## Accomplishments

- Created BookemWidget client component with non-blocking lazyOnload script loading
- Built standalone /book page with first-time booker instructions and alternative contact methods
- Embedded booking widget on service detail pages with service pre-selection
- Implemented comprehensive fallback system (loading state, error state, noscript)
- Mobile-optimized with 44px+ touch targets and overflow protection

## Task Commits

Each task was committed atomically:

1. **Task 1: Create Bookem widget component and configuration** - `26893f3` (feat)
2. **Task 2: Create standalone booking page** - `cba2d54` (feat)
3. **Task 3: Add booking widget to service pages** - `025eb55` (feat)

## Files Created/Modified

- `src/components/integrations/bookem-widget.tsx` - BookemWidget client component with lazyOnload, fallbacks, mobile touch targets
- `src/lib/constants.ts` - Added BOOKEM_CONFIG with businessSlug and service ID mappings
- `src/app/book/page.tsx` - Standalone booking page with instructions and alternative contact
- `src/app/services/antenatal-classes/page.tsx` - Added BookemWidget with antenatal service pre-selection
- `src/app/services/baby-massage/page.tsx` - Added BookemWidget with baby-massage service pre-selection
- `src/app/services/postnatal-support/page.tsx` - Added BookemWidget with postnatal service pre-selection

## Decisions Made

- **lazyOnload strategy:** Prevents Bookem script from blocking initial page render, improving Core Web Vitals
- **min-h-[500px] container:** Reserves space for widget to prevent Cumulative Layout Shift (CLS)
- **44px touch targets:** Ensures fallback links meet WCAG mobile accessibility requirements
- **Three-tier fallback:** Loading spinner, error state with contact options, noscript with direct Bookem link
- **overflow-x-hidden:** Safeguard against widget causing horizontal scroll on mobile

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

- Build cache corruption caused ENOENT error during verification; resolved by cleaning .next and node_modules/.cache directories

## User Setup Required

**Bookem account configuration required before production:**

1. **Verify business slug:** Update `BOOKEM_CONFIG.businessSlug` in `src/lib/constants.ts` with actual Bookem account slug
2. **Verify service IDs:** Update `BOOKEM_CONFIG.services` mapping with actual Bookem service IDs from the Bookem dashboard
3. **Test widget loading:** After configuration, verify widget loads correctly on /book and service pages

## Next Phase Readiness

- Booking integration complete, ready for 04-02 (WhatsApp disclaimer, cookie consent)
- Bookem credentials need verification with actual account before deployment
- Widget tested with placeholder URLs; production testing required after Bookem configuration

---
*Phase: 04-integrations-and-launch*
*Completed: 2026-01-27*
