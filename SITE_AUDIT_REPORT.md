# TenderTouchClinic Site Audit Report

**Date:** January 29, 2026
**Auditor:** Site Review
**Version:** 1.0

---

## Executive Summary

The TenderTouchClinic website is a well-structured, modern Next.js 16 application with solid foundations in accessibility, SEO, and responsive design. However, there are several opportunities for improvement across performance, UI polish, and UX optimization that would make this a stronger business asset.

**Overall Grade: B+**

| Category | Score | Priority Items |
|----------|-------|----------------|
| Performance | B- | Large assets, missing optimizations |
| UI/Visual Design | B+ | Minor polish, consistency issues |
| UX/Conversion | B | Booking flow, social proof, CTAs |
| Accessibility | A- | Good foundation, minor gaps |
| SEO | A- | Well implemented |

---

## 1. PERFORMANCE ISSUES

### 1.1 Critical: Large Asset Sizes

**Problem:** Several assets are significantly oversized, impacting initial load times and mobile performance.

| Asset | Current Size | Recommended | Impact |
|-------|-------------|-------------|--------|
| `hero.gif` | 11.7 MB | Remove (video fallback not needed) | Critical |
| `postnatal.mp4` | 19.8 MB | Compress to ~5 MB | High |
| `breastfeeding.mp4` | 15.2 MB | Compress to ~4 MB | High |
| `brigitte.png` | 3.9 MB | Convert to WebP, ~200 KB | High |
| `contactus.png` | 2.8 MB | Convert to WebP, ~150 KB | High |
| `megan.png` | 1.8 MB | Convert to WebP, ~150 KB | Medium |
| `logo.png` | 110 KB | Convert to SVG | Low |

**Recommendations:**
- Remove `hero.gif` entirely - the video provides the fallback
- Compress all videos using HandBrake or FFmpeg (target: 1-2 Mbps bitrate)
- Convert all PNG images to WebP format with lossy compression
- Convert logo to SVG for crisp rendering at any size
- Implement responsive images with multiple srcset sizes

### 1.2 High: Missing Next.js Image Optimization Config

**Location:** `next.config.ts:1-7`

**Problem:** The Next.js config is essentially empty with no image optimization settings.

```typescript
// Current (empty)
const nextConfig: NextConfig = {
  /* config options here */
};
```

**Recommended Configuration:**
```typescript
const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};
```

### 1.3 Medium: Hero Video Not Optimized

**Location:** `src/components/sections/hero.tsx:325-333`

**Problem:** Video loads immediately without poster image, causing layout shift and delayed content paint.

**Current:**
```tsx
<video autoPlay muted loop playsInline className="...">
  <source src="/images/hero.mp4" type="video/mp4" />
</video>
```

**Recommended:**
```tsx
<video
  autoPlay
  muted
  loop
  playsInline
  poster="/images/hero.jpg"
  preload="metadata"
  className="..."
>
  <source src="/images/hero.mp4" type="video/mp4" />
</video>
```

### 1.4 Medium: Framer Motion Bundle Size

**Problem:** Framer Motion is imported in many components, adding ~25KB to the bundle. Several animations could use CSS instead.

**Affected Files:**
- `hero.tsx` - GradientMesh blobs (could be CSS)
- `footer.tsx` - Simple fade animations (could be CSS)
- `mobile-nav.tsx` - Hamburger animation (could be CSS)
- `testimonials.tsx` - Grid animations (could be CSS/Intersection Observer)

**Recommendations:**
- Keep Framer Motion for complex interactions (carousel, page transitions)
- Replace simple opacity/transform animations with CSS `@keyframes` and Intersection Observer
- Consider `framer-motion/m` for reduced bundle size on simple components

### 1.5 Low: Third-Party Script Loading

**Location:** `src/components/integrations/bookem-widget.tsx:193-198`

**Current:** Uses `lazyOnload` which is good, but could be improved.

**Recommendations:**
- Add `fetchPriority="low"` to prevent blocking
- Consider loading only when booking section is in viewport using Intersection Observer

---

## 2. UI/VISUAL DESIGN IMPROVEMENTS

### 2.1 High: Inconsistent Section Spacing

**Problem:** Section padding varies inconsistently across pages.

| Page | Section Padding | Expected |
|------|-----------------|----------|
| Home | `py-section` (4rem) | Consistent |
| Services | `py-12 lg:py-16` | Different |
| About | `py-section lg:py-section-lg` | Different |

**Recommendation:** Standardize all sections to use the `<Section>` component with consistent variants.

### 2.2 High: Service Cards Need Visual Hierarchy

**Location:** `src/components/sections/services-overview.tsx`

**Problem:** All 4 service cards look identical with subtle color differences. Users may not understand the value proposition at a glance.

**Recommendations:**
- Add icons to each card for instant recognition
- Include a "most popular" badge for top service
- Add brief benefit statements (not just descriptions)
- Consider hover state that reveals more info or testimonial snippet

### 2.3 Medium: Hero Text Could Be More Impactful

**Location:** `src/components/sections/hero.tsx:315`

**Current Headline:** "Nurture and Care for Parents and Babies"

**Issues:**
- Generic/could apply to any clinic
- Doesn't communicate unique value
- Missing emotional hook

**Recommendations:**
- Consider: "Expert Support for Your Motherhood Journey" or
- "Cape Town's Trusted Partner for New Parents"
- Add a credibility statement: "Over 500 families supported since [year]"

### 2.4 Medium: Button Consistency

**Problem:** Primary CTA buttons vary across pages.

| Location | CTA Text | Style |
|----------|----------|-------|
| Hero | "Book a Class" | White bg |
| Header | "Book Now" | Primary |
| Mobile nav | "Book a Class" | Primary |
| Service cards | "Book" | Ghost |
| Footer | "Book Online" | Secondary |

**Recommendation:** Standardize primary conversion CTA to "Book Now" everywhere for consistency and recognition.

### 2.5 Medium: Missing Loading States

**Affected Areas:**
- Page transitions (no loading indicator)
- Image lazy loading (no skeleton/blur placeholder)
- Contact form submit (button shows loading, but no form feedback)

**Recommendations:**
- Add page transition animation or loading bar
- Use Next.js Image `placeholder="blur"` with `blurDataURL`
- Add subtle form field loading states during validation

### 2.6 Low: Footer Visual Weight

**Location:** `src/components/layout/footer.tsx`

**Problem:** Footer is visually heavy with dark background that creates jarring contrast from light pages.

**Recommendations:**
- Consider lighter footer variant (warm gray) that feels more cohesive with the pastel palette
- Or add a gradient transition section above footer

### 2.7 Low: Mobile Navigation Polish

**Location:** `src/components/layout/mobile-nav.tsx:160`

**Problem:** Mobile nav panel is plain white, missing brand personality.

**Recommendations:**
- Add subtle brand gradient or pattern background
- Include clinic logo in menu panel
- Add contact quick-access buttons at bottom

---

## 3. UX/CONVERSION IMPROVEMENTS

### 3.1 Critical: Booking Flow Friction

**Problem:** The booking page has multiple steps before users can actually book, creating friction.

**Current Flow:**
1. Click "Book Now"
2. Land on /book page with instructions
3. Scroll past "How to Book" section
4. Scroll past "What you'll need" section
5. Finally see booking widget

**Recommended Flow:**
1. Click "Book Now"
2. Immediately see booking widget at top
3. Help content available but collapsed/secondary

**Additional Recommendations:**
- Add service quick-filters above booking widget
- Show "Next available: [date]" for popular services
- Add "Book by phone" sticky button for users who prefer calling

### 3.2 High: Missing Social Proof on Key Pages

**Affected Pages:**
- Services page (no testimonials)
- Individual service pages (no testimonials)
- Contact page (no trust indicators)
- Book page (no reassurance)

**Recommendations:**
- Add relevant testimonial excerpt on each service detail page
- Include "500+ families helped" badge on booking page
- Add professional affiliations/certifications near contact form
- Consider adding a reviews summary (e.g., "4.9/5 from 127 reviews")

### 3.3 High: Contact Form Could Convert Better

**Location:** `src/components/forms/contact-form.tsx`

**Issues:**
- No urgency or value proposition
- "Preferred Contact Time" feels bureaucratic
- Success message is generic

**Recommendations:**
- Add headline: "Questions? We typically respond within 2 hours"
- Change "Preferred Contact Time" to "Best time to reach you"
- Success message should set expectations: "We'll get back to you within 2 business hours"
- Consider adding a quick FAQ below form to pre-answer common questions

### 3.4 High: Service Detail Pages Need Pricing Clarity

**Location:** `src/app/services/pregnancy-preparation/page.tsx`

**Problem:** Users must expand/click to see pricing. Price is the #1 thing parents want to know.

**Recommendations:**
- Show price prominently on service cards (already doing, good)
- Add "Starting from R[X]" in the page hero
- Consider a pricing table comparing packages
- Add payment options info (payment plans, medical aid acceptance)

### 3.5 Medium: No Exit Intent or Abandonment Recovery

**Problem:** Users who leave never get a second chance to convert.

**Recommendations:**
- Add newsletter signup for pregnancy tips (builds list for remarketing)
- Consider exit-intent popup: "Before you go - get our free pregnancy checklist"
- Add "Save for later" functionality on services

### 3.6 Medium: About Page Doesn't Drive Action

**Location:** `src/app/about/page.tsx`

**Problem:** Long scrolling page with CTA only at the very end.

**Recommendations:**
- Add floating/sticky CTA after first team member section
- Include "Book a consultation with Megan" button after her bio
- Add testimonial specific to each practitioner if available

### 3.7 Medium: Missing Urgency/Scarcity Signals

**Problem:** No reason to book NOW vs later.

**Recommendations:**
- Show class availability: "Only 3 spots left for Feb Antenatal Class"
- Add "Book by [date] for [benefit]" where applicable
- Show popular times: "Most parents book 6 months before due date"

### 3.8 Low: FAQ Page Buried

**Location:** Navigation structure

**Problem:** FAQ is in navigation but not integrated where users need it.

**Recommendations:**
- Add contextual FAQ snippets on relevant pages
- Link to FAQ from service descriptions
- Add FAQ schema markup for Google rich snippets (already have structured data capability)

### 3.9 Low: No Live Chat or Immediate Contact

**Problem:** WhatsApp button is good but small. Users with urgent questions may bounce.

**Recommendations:**
- Make WhatsApp button more prominent with text label
- Add "Available: Mon-Fri 9am-5pm" indicator
- Consider live chat during business hours

---

## 4. QUICK WINS (Implement First)

These changes require minimal effort but deliver meaningful impact:

| Change | Effort | Impact | Location |
|--------|--------|--------|----------|
| Add poster to hero video | 5 min | Medium | hero.tsx |
| Compress team photos | 30 min | High | /public/images |
| Standardize CTA text to "Book Now" | 15 min | Medium | Multiple |
| Add trust badge to booking page | 10 min | Medium | book/page.tsx |
| Move booking widget above instructions | 15 min | High | book/page.tsx |
| Add `blurDataURL` to images | 30 min | Medium | Image components |
| Configure Next.js image optimization | 10 min | High | next.config.ts |

---

## 5. TECHNICAL DEBT

### 5.1 Code Organization
- `globals.css` at 818 lines is becoming unwieldy - consider splitting into modular files
- Some components have inline styles that should be in CSS (e.g., `hero.tsx` blob styles)

### 5.2 Type Safety
- Good TypeScript usage overall
- Consider stricter types for service data structures

### 5.3 Testing
- Accessibility tests exist (good!)
- Missing component unit tests
- No integration/E2E tests for booking flow

---

## 6. ACCESSIBILITY NOTES

The site has a strong accessibility foundation:

**Strengths:**
- Skip link implemented
- ARIA labels on interactive elements
- Focus-visible styles
- Reduced motion support
- Semantic HTML structure

**Minor Improvements:**
- Some images could have more descriptive alt text
- Form error announcements could use `aria-live` more consistently
- Mobile nav could trap focus when open

---

## 7. RECOMMENDED IMPLEMENTATION ORDER

### Phase 1: Performance (Week 1)
1. Compress and convert all images
2. Remove hero.gif
3. Compress video files
4. Add Next.js image config
5. Add video poster image

### Phase 2: Conversion Optimization (Week 2)
1. Restructure booking page (widget first)
2. Add trust indicators throughout
3. Add service testimonials
4. Improve contact form messaging

### Phase 3: UI Polish (Week 3)
1. Standardize section spacing
2. Standardize CTA buttons
3. Enhance service cards with icons
4. Add loading states

### Phase 4: Advanced UX (Week 4+)
1. Add urgency/availability indicators
2. Implement newsletter capture
3. Add contextual FAQs
4. Consider live chat integration

---

## Summary

The TenderTouchClinic website has excellent foundations but is leaving conversions on the table due to:

1. **Performance drag** from unoptimized assets (~50MB+ could become ~10MB)
2. **Friction in the booking flow** - users must scroll past content to book
3. **Missing social proof** where it matters most (service pages, booking page)
4. **Generic messaging** that doesn't differentiate from competitors

Implementing the quick wins alone could improve conversion rates by an estimated 15-25%. The full optimization roadmap would create a significantly more effective business asset.

---

*Report generated for TenderTouchClinic website audit. All recommendations are based on best practices for healthcare service websites targeting expecting and new parents.*
