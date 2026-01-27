# Stack Research

**Domain:** Healthcare/Clinic Marketing Website (Static-first)
**Researched:** 2026-01-27
**Confidence:** HIGH

## Executive Summary

For Tender Touch Mother & Baby Clinic, the recommended stack prioritizes:
1. **Speed** - Mobile users on variable connections need sub-2.5s LCP
2. **Simplicity** - Content rarely updates, no complex CMS needed
3. **Integration** - Bookem booking, WhatsApp, Google Maps are critical paths
4. **Modern DX** - Type safety, great tooling, maintainable codebase

**TL;DR Stack:** Next.js 16 + React 19 + Tailwind CSS v4 + TypeScript 5.8 deployed on Vercel.

---

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended | Confidence |
|------------|---------|---------|-----------------|------------|
| Next.js | 16.1.x | React framework | Industry standard for static/hybrid sites. Built-in Image optimization critical for LCP. Turbopack now stable for fast builds. SSG with optional ISR. Vercel created it, so deployment is seamless. | HIGH |
| React | 19.2.x | UI library | Stable since Dec 2024. Server Components reduce bundle size. Document metadata built-in (no React Helmet needed). Required by Next.js 16 App Router. | HIGH |
| TypeScript | 5.8.x | Type safety | Required for professional React development. Catches bugs at build time. 5.8 has Node.js direct execution support. | HIGH |
| Tailwind CSS | 4.1.x | Styling | Zero-runtime CSS. v4 has 5x faster builds via Oxide engine. CSS-first config with @theme directive. No need for CSS-in-JS complexity. | HIGH |

### Supporting Libraries

| Library | Version | Purpose | When to Use | Confidence |
|---------|---------|---------|-------------|------------|
| Motion (Framer Motion) | 12.x | Animations | Hero sections, scroll animations, page transitions. Industry-leading layout animations. MIT licensed. | HIGH |
| React Hook Form | 7.71.x | Form handling | Contact forms, inquiry forms. Minimal re-renders, excellent performance. | HIGH |
| Zod | 4.3.x | Validation | Form validation with React Hook Form. TypeScript-first, excellent type inference. | HIGH |
| @hookform/resolvers | 5.x | RHF + Zod bridge | Connect Zod schemas to React Hook Form | HIGH |
| @vis.gl/react-google-maps | latest | Google Maps | Clinic location map. Official Google-supported React components. | HIGH |
| lucide-react | 0.562.x | Icons | 1600+ consistent SVG icons. Tree-shakeable, lightweight. | HIGH |
| Resend | 1.x | Transactional email | Contact form submissions. Developer-friendly, React Email support. | MEDIUM |
| next-themes | 0.4.x | Theme switching | Dark/light mode toggle (optional feature) | MEDIUM |

### Development Tools

| Tool | Purpose | Notes | Confidence |
|------|---------|-------|------------|
| pnpm | Package manager | 2x faster than npm, efficient disk usage via hard links. Best for modern projects. | HIGH |
| ESLint 9 | Linting | Flat config format. Use `eslint-config-next/core-web-vitals` for Core Web Vitals rules. | HIGH |
| Prettier | Formatting | Standard code formatting. Works with ESLint via `eslint-config-prettier`. | HIGH |
| TypeScript ESLint | TS linting | TypeScript-specific rules. Included in `eslint-config-next/typescript`. | HIGH |

---

## Integration-Specific Stack

### Bookem Booking Integration

| Component | Implementation | Notes | Confidence |
|-----------|---------------|-------|------------|
| Bookem Embed | DIV tag (not iframe) | Bookem provides a div-based embed code, NOT an iframe. Do not wrap in iframe as it breaks responsive behavior. | HIGH |
| Business ID | From Bookem settings | Found in Settings > Sharing and integrations | HIGH |
| Styling | CSS customization | Bookem provides CSS classes (bkm-*) that can be styled | MEDIUM |

**Implementation pattern:**
```tsx
// Create a client component for Bookem
'use client';

import { useEffect } from 'react';

export function BookemWidget({ businessId }: { businessId: string }) {
  useEffect(() => {
    // Load Bookem script dynamically
    const script = document.createElement('script');
    script.src = 'https://bookem.com/embed.js';
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  return <div id="bookem-widget" data-business-id={businessId} />;
}
```

### WhatsApp Click-to-Chat

| Component | Implementation | Notes | Confidence |
|-----------|---------------|-------|------------|
| Chat Link | `https://wa.me/{number}?text={message}` | Use international format number (e.g., 27XXXXXXXXX for SA) | HIGH |
| Pre-filled Message | URL encode the message | Speeds up user interaction | HIGH |
| Floating Button | CSS positioned component | Bottom-right corner, non-intrusive | HIGH |

**Implementation:**
```tsx
const WHATSAPP_NUMBER = '27123456789'; // Replace with actual
const MESSAGE = encodeURIComponent('Hi, I would like to enquire about your services.');

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full shadow-lg"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon className="w-6 h-6 text-white" />
    </a>
  );
}
```

### Google Maps Integration

| Component | Implementation | Notes | Confidence |
|-----------|---------------|-------|------------|
| Library | @vis.gl/react-google-maps | Official Google-supported React bindings | HIGH |
| API Key | Google Cloud Console | Restrict to domain, enable Maps JavaScript API | HIGH |
| Map ID | Required for AdvancedMarker | Create in Google Cloud Console | HIGH |

**Implementation:**
```tsx
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';

const CLINIC_LOCATION = { lat: -33.9249, lng: 18.4241 }; // Cape Town coords

export function ClinicMap() {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <Map
        defaultCenter={CLINIC_LOCATION}
        defaultZoom={15}
        mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
        className="w-full h-[400px]"
      >
        <AdvancedMarker position={CLINIC_LOCATION} />
      </Map>
    </APIProvider>
  );
}
```

---

## Infrastructure

| Technology | Purpose | Why | Confidence |
|------------|---------|-----|------------|
| Vercel | Hosting & CDN | Zero-config Next.js deployment. Global edge network. Generous free tier. Automatic HTTPS. Preview deployments. | HIGH |
| Vercel Analytics | Performance monitoring | Core Web Vitals tracking, Real User Monitoring | MEDIUM |
| GitHub | Source control | Standard. Integrates with Vercel for auto-deploy. | HIGH |

### Alternative Hosting (if cost-sensitive)

| Alternative | When to Use | Trade-offs |
|-------------|-------------|------------|
| Cloudflare Pages | High-traffic static site, budget-conscious | No bandwidth limits, but Next.js support requires OpenNext adapter. More setup complexity. |
| Netlify | Familiar with Netlify, need Forms | Good but Vercel has better Next.js support |

**Recommendation:** Start with Vercel (free tier: 100GB bandwidth, unlimited static). Only migrate if traffic exceeds free tier significantly.

---

## Installation

```bash
# Initialize with pnpm (recommended)
pnpm create next-app@latest tender-touch-clinic --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Core dependencies (auto-installed by create-next-app)
# next@16, react@19, react-dom@19, typescript, tailwindcss@4, eslint

# Additional production dependencies
pnpm add motion @vis.gl/react-google-maps react-hook-form @hookform/resolvers zod lucide-react

# Optional: Email for contact forms
pnpm add resend

# Optional: Theme switching
pnpm add next-themes

# Dev dependencies
pnpm add -D @types/node prettier eslint-config-prettier
```

---

## Alternatives Considered

| Category | Recommended | Alternative | When to Use Alternative |
|----------|-------------|-------------|-------------------------|
| Framework | Next.js 16 | Astro 5.x | If zero JS is critical. But Next.js Image optimization and React ecosystem are too valuable for this project. |
| Framework | Next.js 16 | Remix 3.x | If heavy server-side data needs. Overkill for a marketing site. |
| Styling | Tailwind CSS v4 | CSS Modules | If team prefers traditional CSS. But Tailwind's utility-first is faster for this project. |
| Styling | Tailwind CSS v4 | styled-components | If need runtime theming. But adds JS bundle bloat. |
| Animations | Motion | GSAP | If need timeline-based complex animations. Motion is simpler for scroll/layout animations. |
| Forms | React Hook Form | Formik | If team knows Formik. RHF has better performance (fewer re-renders). |
| Icons | lucide-react | heroicons | Both are good. Lucide has more icons (1600+) and consistent style. |
| Maps | @vis.gl/react-google-maps | react-leaflet + OpenStreetMap | If want to avoid Google costs. But Google Maps is more familiar to users and has better data in SA. |
| Hosting | Vercel | Cloudflare Pages | If expecting >100GB/month bandwidth. Cloudflare has no bandwidth limits. |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Create React App (CRA) | Deprecated, no longer maintained. No SSG, no image optimization. | Next.js |
| Gatsby | Complex GraphQL layer, slower builds, declining ecosystem | Next.js SSG |
| JavaScript (no TypeScript) | No type safety, harder to maintain, more runtime errors | TypeScript |
| CSS-in-JS (styled-components, Emotion) | Runtime overhead, larger bundle, not needed for static site | Tailwind CSS |
| jQuery | Unnecessary with React. Adds bundle weight. | React + vanilla JS |
| Bootstrap | Large CSS bundle, harder to customize, looks dated | Tailwind CSS |
| Moment.js | Huge bundle (300KB). Deprecated. | date-fns or native Intl |
| Font Awesome (full) | Very large. Import individual icons. | lucide-react |
| React Helmet | Unnecessary in Next.js 16/React 19 - use built-in Metadata API | Next.js Metadata API |
| Custom CMS | Overkill for rarely-updated content. Adds maintenance burden. | Markdown/MDX files or simple JSON |
| WordPress headless | Adds complexity, hosting costs, security surface | Static files |

---

## Stack Patterns by Variant

**If content updates frequently (multiple times per week):**
- Consider adding a headless CMS like Sanity or Contentful
- Use ISR (Incremental Static Regeneration) instead of pure SSG
- Add `revalidate` to fetch calls

**If budget is extremely tight:**
- Use Cloudflare Pages (free unlimited bandwidth)
- Self-host email via SMTP instead of Resend
- Use OpenStreetMap instead of Google Maps

**If SEO is critical (competing for local search):**
- Add structured data (JSON-LD) for LocalBusiness schema
- Implement sitemap.xml generation
- Add robots.txt
- Ensure all pages have unique meta descriptions

**If accessibility is a priority (recommended for healthcare):**
- Add `eslint-plugin-jsx-a11y` for accessibility linting
- Test with screen readers
- Ensure color contrast meets WCAG AA
- Add skip-to-content links

---

## Version Compatibility Matrix

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| Next.js 16.1.x | React 19.2.x | Required - App Router needs React 19 |
| Next.js 16.1.x | TypeScript 5.8.x | Full support |
| Next.js 16.1.x | Tailwind CSS 4.1.x | Full support via built-in PostCSS |
| Tailwind CSS 4.1.x | ESLint 9.x | Use flat config format |
| React Hook Form 7.71.x | Zod 4.3.x | Via @hookform/resolvers |
| Motion 12.x | React 19.x | Full support |
| @vis.gl/react-google-maps | React 19.x | Full support |

---

## Environment Variables

```env
# .env.local (do not commit)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NEXT_PUBLIC_GOOGLE_MAP_ID=your_map_id
RESEND_API_KEY=your_resend_api_key

# .env (can commit - non-sensitive)
NEXT_PUBLIC_SITE_URL=https://tendertouchclinic.co.za
NEXT_PUBLIC_WHATSAPP_NUMBER=27123456789
NEXT_PUBLIC_BOOKEM_BUSINESS_ID=your_bookem_business_id
```

---

## Performance Budget

| Metric | Target | Rationale |
|--------|--------|-----------|
| LCP (Largest Contentful Paint) | < 2.5s | Google Core Web Vitals threshold |
| FID (First Input Delay) | < 100ms | Google Core Web Vitals threshold |
| CLS (Cumulative Layout Shift) | < 0.1 | Google Core Web Vitals threshold |
| Total JS Bundle (initial) | < 100KB | Fast mobile loading |
| Total CSS | < 50KB | Tailwind purges unused |
| Hero Image (optimized) | < 200KB | Next.js Image handles this |

---

## Sources

### Official Documentation (HIGH confidence)
- [Next.js 15 Release Blog](https://nextjs.org/blog/next-15) - Verified Next.js features
- [Next.js 16.1 Release Blog](https://nextjs.org/blog/next-16-1) - Latest stable version
- [React 19.2 Release](https://react.dev/blog/2025/10/01/react-19-2) - React features
- [Tailwind CSS v4.0 Announcement](https://tailwindcss.com/blog/tailwindcss-v4) - Tailwind v4 features
- [React Hook Form Documentation](https://react-hook-form.com/) - Form library
- [Zod Documentation](https://zod.dev/) - Validation library
- [Motion Documentation](https://motion.dev/) - Animation library
- [@vis.gl/react-google-maps](https://visgl.github.io/react-google-maps/) - Maps integration
- [Bookem Embedding Guide](https://bookem.com/help/embeddingbookem) - Bookem integration

### Verified via Search (MEDIUM confidence)
- [2026 JavaScript Framework Trends](https://dev.to/this-is-learning/javascript-frameworks-heading-into-2026-2hel)
- [Vercel vs Cloudflare Pages 2026](https://northflank.com/blog/vercel-vs-netlify-choosing-the-deployment-platform-in-2026)
- [pnpm vs npm 2026 Benchmarks](https://pnpm.io/benchmarks)
- [TypeScript 5.8 Features](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-8.html)
- [ESLint 9 Flat Config for Next.js](https://chris.lu/web_development/tutorials/next-js-16-linting-setup-eslint-9-flat-config)

### Community Sources (LOW confidence - verify before using)
- WhatsApp click-to-chat patterns - multiple sources agree on wa.me format
- lucide-react adoption - widely used, 9000+ npm dependents

---

*Stack research for: Tender Touch Mother & Baby Clinic website*
*Researched: 2026-01-27*
*Researcher confidence: HIGH - all core technologies verified via official documentation*
