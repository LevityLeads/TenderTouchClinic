# Performance Baseline

**Date:** 2026-01-27
**Build:** Next.js 16.1.5 (Turbopack)

## Build Metrics

### Build Output

- **Compilation time:** 10.6s
- **Static page generation:** 680.4ms (16 pages)
- **Build type:** Static prerendering (all pages)
- **Build status:** Success (no warnings)

### Static Pages Generated

| Route | Type |
|-------|------|
| / | Static |
| /about | Static |
| /book | Static |
| /contact | Static |
| /faq | Static |
| /privacy | Static |
| /schedule | Static |
| /services | Static |
| /services/antenatal-classes | Static |
| /services/baby-massage | Static |
| /services/postnatal-support | Static |
| /terms | Static |
| /sitemap.xml | Static |

## Core Web Vitals Targets

| Metric | Target | Description |
|--------|--------|-------------|
| LCP (Largest Contentful Paint) | < 2.5s | Main content visible |
| FID (First Input Delay) | < 100ms | Interactivity responsiveness |
| CLS (Cumulative Layout Shift) | < 0.1 | Visual stability |
| TTFB (Time to First Byte) | < 800ms | Server response time |

## Pages to Verify in PageSpeed Insights

When production URL is available, verify these pages:

1. **Homepage** (`/`)
   - Primary landing page
   - Hero section, service cards, CTAs

2. **Service Page** (`/services/antenatal-classes`)
   - Content-heavy page
   - Accordion FAQ, booking widget

3. **Contact** (`/contact`)
   - Form interactivity
   - Google Maps embed

4. **Book** (`/book`)
   - Third-party widget integration (Bookem)
   - Critical conversion page

## Performance Optimizations Implemented

### Static Generation
- All pages statically pre-rendered at build time
- No server-side computation on each request

### Font Loading
- `font-display: swap` for text visibility during font load
- Local font files (Inter, Playfair Display)

### Image Optimization
- Next.js Image component with automatic optimization
- Responsive images via `srcset`
- Lazy loading for below-fold images

### Third-Party Scripts
- Bookem widget loaded with `lazyOnload` strategy
- Cookie consent deferred to after hydration
- WhatsApp button as Server Component (no client JS)

### Layout Stability (CLS Prevention)
- Fixed-height containers for dynamic content
- `min-h-[500px]` on booking widget container
- Explicit dimensions on images

### Bundle Optimization
- Tree-shaking via Next.js bundler
- Server Components reduce client bundle
- Dynamic imports where appropriate

## Accessibility Test Results

- **Test Suite:** jest-axe with WCAG 2.2 AA rules
- **Status:** PASS (5/5 tests)
- **Components Tested:**
  - Button (button and link variants)
  - Footer
  - Container
  - Section

## Manual Verification Checklist

Before production launch, verify:

- [ ] LCP < 2.5s on mobile (PageSpeed Insights)
- [ ] CLS < 0.1 (PageSpeed Insights)
- [ ] Keyboard navigation works throughout
- [ ] Focus indicators visible
- [ ] Mobile menu accessible (keyboard + screen reader)
- [ ] Forms submit successfully
- [ ] Third-party widgets load (Bookem, Maps)
- [ ] Cookie consent respects preferences

## Notes

- Lighthouse CLI requires Chrome/Chromium installation
- For full Core Web Vitals testing, use PageSpeed Insights with deployed URL
- Local testing provides baseline but real-world performance varies
