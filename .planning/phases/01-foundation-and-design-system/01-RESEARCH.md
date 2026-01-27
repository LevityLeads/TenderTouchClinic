# Phase 1: Foundation & Design System - Research

**Researched:** 2026-01-27
**Domain:** Next.js 16 + Tailwind CSS v4 mobile-first foundation with accessibility
**Confidence:** HIGH

## Summary

Phase 1 establishes the technical foundation for Tender Touch Clinic's website: project scaffolding, tooling, layout components (Header, Footer, MobileNav), and the UI component library with design tokens. The phase covers requirements FOUND-01 through FOUND-07 (responsive, mobile-first, sub-2.5s LCP, WCAG 2.2 AA, SEO, image optimization, deployment), NAV-01 through NAV-05 (header, services dropdown, sticky mobile nav, footer, WhatsApp button), and CONT-14 (warm teal/green brand palette).

The standard approach uses **Next.js 16.1.x with App Router**, **Tailwind CSS v4.1.x** with CSS-first configuration via the `@theme` directive for design tokens, **TypeScript 5.8.x** for type safety, and **pnpm** as the package manager. Turbopack is now the default bundler in Next.js 16, providing 2-5x faster builds. Key architectural patterns include server-first rendering with client islands for interactive components, mobile-first CSS with min-width breakpoints, and accessibility-first component design.

**Primary recommendation:** Use `pnpm create next-app@latest` with default settings (TypeScript, Tailwind, ESLint, App Router, Turbopack), then configure Tailwind v4 design tokens via `@theme` directive with the teal/green brand palette as CSS variables.

## Standard Stack

The established libraries/tools for this phase:

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.x | React framework with App Router | Industry standard, built-in image optimization for LCP, Turbopack stable, Vercel deployment seamless |
| React | 19.2.x | UI library | Required by Next.js 16, Server Components reduce bundle, Document metadata built-in |
| TypeScript | 5.8.x | Type safety | Required for professional React development, catches bugs at build |
| Tailwind CSS | 4.1.x | Styling | Zero-runtime CSS, v4 has 5x faster builds via Oxide engine, CSS-first config with @theme |
| pnpm | 10.x | Package manager | 2x faster than npm, efficient disk usage, recommended for Next.js |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| lucide-react | 0.562.x | Icons | All icons including hamburger menu, social icons, WhatsApp |
| eslint-plugin-jsx-a11y | 6.x | Accessibility linting | Every component - catches a11y issues at dev time |
| @axe-core/react | 4.x | Runtime a11y testing | Dev mode only - tests rendered DOM accessibility |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Tailwind CSS v4 | CSS Modules | If team prefers traditional CSS, but Tailwind's utility-first is faster and more maintainable |
| lucide-react | heroicons | Both good, Lucide has 1600+ icons with consistent style |
| pnpm | npm | npm is simpler but slower; pnpm recommended for modern projects |

**Installation:**

```bash
# Initialize project (uses defaults: TypeScript, Tailwind, ESLint, App Router, Turbopack)
pnpm create next-app@latest tender-touch-clinic --yes

# Additional production dependencies
pnpm add lucide-react

# Development dependencies for accessibility
pnpm add -D eslint-plugin-jsx-a11y @axe-core/react
```

## Architecture Patterns

### Recommended Project Structure

```
src/
├── app/                          # Next.js App Router (routes)
│   ├── layout.tsx               # Root layout (header, footer, metadata)
│   ├── page.tsx                 # Homepage
│   ├── globals.css              # Global styles + Tailwind @theme
│   └── ...                      # Other routes (Phase 2+)
│
├── components/
│   ├── ui/                      # Primitive components (design system)
│   │   ├── button.tsx           # Reusable button with variants
│   │   ├── container.tsx        # Max-width responsive wrapper
│   │   ├── skip-link.tsx        # Skip to main content (a11y)
│   │   └── ...
│   ├── layout/                  # Structural components
│   │   ├── header.tsx           # Header with logo, nav, CTA
│   │   ├── footer.tsx           # Footer with contact, links, hours
│   │   ├── mobile-nav.tsx       # Hamburger menu + slide-out nav
│   │   ├── services-dropdown.tsx # Desktop services dropdown
│   │   └── whatsapp-button.tsx  # Floating WhatsApp FAB
│   └── ...
│
├── lib/
│   ├── constants.ts             # Site metadata, contact info, hours
│   └── utils.ts                 # Utility functions (cn for classnames)
│
└── public/
    ├── images/                  # Static images
    └── favicon.ico
```

### Pattern 1: Server-First with Client Islands

**What:** Render all components as Server Components by default. Only add `'use client'` when interactivity is required (state, effects, browser APIs).

**When to use:** Always. This is the default for Next.js 16 App Router.

**Example:**
```typescript
// components/layout/header.tsx (Server Component - no directive needed)
import { MobileNav } from './mobile-nav'
import { ServicesDropdown } from './services-dropdown'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-backdrop-blur:bg-white/60">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" aria-label="Tender Touch Clinic - Home">
          <Image src="/images/logo.png" alt="" width={150} height={50} priority />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-6" role="menubar">
          <li role="none"><Link href="/" role="menuitem">Home</Link></li>
          <li role="none"><ServicesDropdown /></li>
          <li role="none"><Link href="/about" role="menuitem">About</Link></li>
          <li role="none"><Link href="/contact" role="menuitem">Contact</Link></li>
        </ul>

        <Button href="/book" className="hidden md:inline-flex">Book Now</Button>

        {/* Mobile Navigation */}
        <MobileNav />
      </nav>
    </header>
  )
}

// components/layout/mobile-nav.tsx (Client Component - needs state)
'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  // Close menu on escape key (WCAG 1.4.13)
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        className="p-2 -mr-2"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 top-[60px] bg-white z-40"
        >
          <nav className="container mx-auto px-4 py-6">
            <ul className="space-y-4">
              <li><Link href="/" onClick={() => setIsOpen(false)}>Home</Link></li>
              <li><Link href="/services" onClick={() => setIsOpen(false)}>Services</Link></li>
              <li><Link href="/about" onClick={() => setIsOpen(false)}>About</Link></li>
              <li><Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  )
}
```

### Pattern 2: CSS-First Design Tokens with @theme

**What:** Define all design tokens in CSS using Tailwind v4's `@theme` directive. Tokens become both utility classes and CSS variables.

**When to use:** Always for colors, spacing, typography, and other design primitives.

**Example:**
```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  /* Brand Colors - Teal/Green Palette (CONT-14) */
  --color-primary-50: oklch(0.97 0.02 175);
  --color-primary-100: oklch(0.94 0.04 175);
  --color-primary-200: oklch(0.88 0.08 175);
  --color-primary-300: oklch(0.78 0.12 175);
  --color-primary-400: oklch(0.68 0.14 175);
  --color-primary-500: oklch(0.55 0.14 175);  /* Main brand teal */
  --color-primary-600: oklch(0.45 0.12 175);
  --color-primary-700: oklch(0.38 0.10 175);
  --color-primary-800: oklch(0.32 0.08 175);
  --color-primary-900: oklch(0.25 0.06 175);

  /* Warm Accent - Soft Peach/Coral */
  --color-accent-50: oklch(0.98 0.01 50);
  --color-accent-100: oklch(0.95 0.03 50);
  --color-accent-500: oklch(0.75 0.12 50);

  /* Neutral - Warm Grays */
  --color-neutral-50: oklch(0.98 0.005 100);
  --color-neutral-100: oklch(0.96 0.005 100);
  --color-neutral-200: oklch(0.92 0.005 100);
  --color-neutral-700: oklch(0.40 0.01 100);
  --color-neutral-800: oklch(0.30 0.01 100);
  --color-neutral-900: oklch(0.20 0.01 100);

  /* WhatsApp Green */
  --color-whatsapp: oklch(0.62 0.17 145);

  /* Typography */
  --font-sans: "Inter", system-ui, sans-serif;
  --font-display: "Playfair Display", serif;

  /* Spacing Scale (mobile-first) */
  --spacing-section: 4rem;
  --spacing-section-lg: 6rem;

  /* Border Radius */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-full: 9999px;

  /* Breakpoints (mobile-first) */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
}

/* Focus styles for accessibility (FOUND-04) */
@layer base {
  *:focus-visible {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }

  /* Skip link for keyboard navigation */
  .skip-link {
    position: absolute;
    left: -9999px;
    z-index: 999;
    padding: 1rem;
    background: var(--color-primary-500);
    color: white;
  }

  .skip-link:focus {
    left: 50%;
    transform: translateX(-50%);
    top: 0;
  }
}
```

### Pattern 3: Mobile-First Responsive Design

**What:** Start with mobile styles as the base, then enhance for larger screens using min-width media queries.

**When to use:** All layout and component styling.

**Example:**
```typescript
// Mobile-first Tailwind classes
export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="
      px-4          /* Mobile: 16px padding */
      sm:px-6       /* 640px+: 24px padding */
      lg:px-8       /* 1024px+: 32px padding */
      mx-auto
      max-w-7xl
    ">
      {children}
    </div>
  )
}

// Footer with mobile-first responsive grid
export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-section sm:py-section-lg">
      <div className="container mx-auto px-4">
        <div className="
          grid
          grid-cols-1           /* Mobile: single column */
          gap-8
          sm:grid-cols-2        /* 640px+: 2 columns */
          lg:grid-cols-4        /* 1024px+: 4 columns */
        ">
          <div>{/* Contact info */}</div>
          <div>{/* Quick links */}</div>
          <div>{/* Hours */}</div>
          <div>{/* Social */}</div>
        </div>
      </div>
    </footer>
  )
}
```

### Pattern 4: Accessible Services Dropdown

**What:** Desktop dropdown menu following WAI-ARIA menubar pattern with keyboard navigation.

**When to use:** Services navigation menu (NAV-02).

**Example:**
```typescript
// components/layout/services-dropdown.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

const services = [
  { name: 'Antenatal Classes', href: '/services/antenatal-classes' },
  { name: 'Baby Massage', href: '/services/baby-massage' },
  { name: 'Postnatal Support', href: '/services/postnatal-support' },
  { name: 'Vaccinations', href: '/services#vaccinations' },
  { name: 'Lactation Consultations', href: '/services#lactation' },
  { name: 'Newborn Check-ups', href: '/services#newborn-checkups' },
]

export function ServicesDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Close on escape (WCAG 1.4.13)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  return (
    <div ref={menuRef} className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown' && !isOpen) {
            e.preventDefault()
            setIsOpen(true)
          }
        }}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls="services-menu"
        className="flex items-center gap-1 py-2"
        role="menuitem"
      >
        Services
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <ul
          id="services-menu"
          role="menu"
          aria-label="Services submenu"
          className="
            absolute top-full left-0 mt-2
            w-56 rounded-lg bg-white shadow-lg
            border border-neutral-200
            py-2
          "
        >
          {services.map((service) => (
            <li key={service.href} role="none">
              <Link
                href={service.href}
                role="menuitem"
                onClick={() => setIsOpen(false)}
                className="
                  block px-4 py-2
                  hover:bg-primary-50
                  focus:bg-primary-50
                "
              >
                {service.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

### Anti-Patterns to Avoid

- **Desktop-first styling:** Using max-width media queries. Always use min-width (mobile-first) for smaller CSS and better maintenance.
- **Over-clientifying:** Marking components as `'use client'` unnecessarily. Only add when hooks or browser APIs are needed.
- **Missing keyboard navigation:** Dropdowns and mobile menus must support Escape to close and arrow keys for navigation.
- **Lazy-loading LCP images:** Hero and above-fold images must use `priority={true}`, never lazy load.
- **Using JavaScript config for Tailwind v4:** Use CSS-first `@theme` directive instead of `tailwind.config.js`.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Icon library | Custom SVG sprites | lucide-react | 1600+ consistent icons, tree-shakeable, maintained |
| Class name merging | String concatenation | clsx + tailwind-merge | Handles conditional classes and Tailwind conflicts |
| Focus management | Custom focus trap | Browser native + ARIA | Native dialog/focus management, less JS |
| Image optimization | Manual resize/compress | next/image | Automatic WebP, responsive sizes, caching |
| Accessibility linting | Manual review | eslint-plugin-jsx-a11y | Catches 70% of a11y issues at dev time |
| Skip links | Custom implementation | Native anchor + CSS | Simple CSS pattern, no JS needed |

**Key insight:** Browser-native features (sticky positioning, CSS focus-visible, dialog element) are more performant and accessible than JavaScript implementations.

## Common Pitfalls

### Pitfall 1: LCP Regression from Lazy-Loaded Hero Images

**What goes wrong:** Hero image lazy-loads, causing LCP > 2.5s on mobile. Google penalizes this in search rankings.

**Why it happens:** Default Next.js Image component behavior is lazy loading. Developers forget to add `priority`.

**How to avoid:**
- Always add `priority={true}` to hero/above-fold images
- Use `fetchPriority="high"` for critical images
- Test LCP with Lighthouse on mobile throttling (4G)
- Only ONE image per page should have priority

**Warning signs:** PageSpeed Insights shows LCP > 2.5s, hero image appears late during page load.

### Pitfall 2: Mobile Navigation Doesn't Close on Route Change

**What goes wrong:** User taps link in mobile menu, page changes but menu stays open.

**Why it happens:** Next.js App Router doesn't trigger re-render on route change, state persists.

**How to avoid:**
- Add `onClick={() => setIsOpen(false)}` to all navigation links
- Use `usePathname()` hook to detect route changes and close menu
- Test navigation flow on actual mobile device

**Warning signs:** Menu stays open after clicking links during development testing.

### Pitfall 3: Focus Not Visible on Interactive Elements

**What goes wrong:** Keyboard users can't see which element is focused, failing WCAG 2.4.7 and 2.4.11.

**Why it happens:** Tailwind's default focus ring removed, or developers hide focus outlines for aesthetics.

**How to avoid:**
- Use `focus-visible:` utilities (only shows for keyboard, not mouse clicks)
- Define custom focus styles in `@layer base` that match brand
- Test entire site using only keyboard navigation
- Never use `outline-none` without providing visible alternative

**Warning signs:** Tab through page and lose track of focus position.

### Pitfall 4: Dropdown Menu Traps Focus

**What goes wrong:** Keyboard users can't escape dropdown menu, or focus jumps unexpectedly.

**Why it happens:** Missing Escape key handler, incorrect focus management.

**How to avoid:**
- Add Escape key listener to close dropdown (WCAG 1.4.13)
- Return focus to trigger button when closed
- Use `aria-expanded` and `aria-haspopup` attributes
- Ensure menu items are focusable with proper tab order

**Warning signs:** Can't close menu with Escape, focus disappears after closing.

### Pitfall 5: Tailwind v4 Migration Breaks Existing Patterns

**What goes wrong:** Upgrading from v3 or using old tutorials causes broken styles.

**Why it happens:** v4 has breaking changes: renamed utilities, different important syntax, CSS-first config.

**How to avoid:**
- Use `@import "tailwindcss"` not `@tailwind` directives
- Important modifier goes at end: `flex!` not `!flex`
- `ring` is now 1px (use `ring-3` for old 3px)
- `shadow-sm` is now `shadow-xs`
- Border color no longer defaults to gray-200

**Warning signs:** Styles look wrong after setup, ring/shadow utilities appear different.

## Code Examples

### Skip Link for Accessibility (FOUND-04)

```typescript
// components/ui/skip-link.tsx
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="
        sr-only focus:not-sr-only
        focus:absolute focus:top-4 focus:left-4 focus:z-50
        focus:px-4 focus:py-2 focus:bg-primary-500 focus:text-white
        focus:rounded-md focus:outline-none
      "
    >
      Skip to main content
    </a>
  )
}

// Usage in app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SkipLink />
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
```

### Floating WhatsApp Button (NAV-05)

```typescript
// components/layout/whatsapp-button.tsx
'use client'

import { MessageCircle } from 'lucide-react'

const WHATSAPP_NUMBER = '27835641671'
const MESSAGE = encodeURIComponent('Hi, I would like to enquire about your services at Tender Touch Clinic.')

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="
        fixed bottom-6 right-6 z-40
        flex items-center justify-center
        w-14 h-14 rounded-full
        bg-whatsapp text-white
        shadow-lg hover:shadow-xl
        transition-shadow
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-whatsapp
      "
    >
      <MessageCircle className="w-7 h-7" aria-hidden="true" />
    </a>
  )
}
```

### Responsive Footer with Business Hours (NAV-04)

```typescript
// components/layout/footer.tsx
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from 'lucide-react'
import { CONTACT_INFO, BUSINESS_HOURS, QUICK_LINKS, SOCIAL_LINKS } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-100 py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic space-y-3 text-neutral-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-0.5 shrink-0" aria-hidden="true" />
                <span>13 Nederburg Road, Kirstenhof, Cape Town</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-5 h-5 shrink-0" aria-hidden="true" />
                <a href="tel:+27835641671" className="hover:text-primary-300">083 564 1671</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-5 h-5 shrink-0" aria-hidden="true" />
                <a href="mailto:tendertouch.ct@gmail.com" className="hover:text-primary-300">
                  tendertouch.ct@gmail.com
                </a>
              </p>
            </address>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-neutral-300">
              <li><Link href="/services" className="hover:text-primary-300">Services</Link></li>
              <li><Link href="/about" className="hover:text-primary-300">About Megan</Link></li>
              <li><Link href="/classes" className="hover:text-primary-300">Class Schedule</Link></li>
              <li><Link href="/contact" className="hover:text-primary-300">Contact</Link></li>
              <li><Link href="/book" className="hover:text-primary-300">Book Online</Link></li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" aria-hidden="true" />
              Business Hours
            </h3>
            <dl className="space-y-1 text-neutral-300">
              <div className="flex justify-between">
                <dt>Monday - Friday</dt>
                <dd>By appointment</dd>
              </div>
              <div className="flex justify-between">
                <dt>Saturday - Sunday</dt>
                <dd>Closed</dd>
              </div>
            </dl>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://facebook.com/TenderTouchCapeTown"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="p-2 rounded-full bg-neutral-800 hover:bg-primary-600 transition-colors"
              >
                <Facebook className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://instagram.com/tendertouchclinic"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="p-2 rounded-full bg-neutral-800 hover:bg-primary-600 transition-colors"
              >
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-neutral-800 text-center text-neutral-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Tender Touch Mother & Baby Clinic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
```

### Next.js Image with Priority for LCP (FOUND-06)

```typescript
// Example: Hero image with priority for LCP optimization
import Image from 'next/image'

export function Hero() {
  return (
    <section className="relative h-[60vh] min-h-[400px]">
      <Image
        src="/images/hero/mother-baby.jpg"
        alt="Mother and baby in nurturing clinic environment"
        fill
        priority                    // Critical for LCP
        fetchPriority="high"        // Additional browser hint
        sizes="100vw"               // Full viewport width
        className="object-cover"
        quality={85}                // Balance quality/size
      />
      {/* Hero content overlay */}
    </section>
  )
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.js` | `@theme` directive in CSS | Tailwind v4 (2024) | CSS-first config, no JS needed |
| `@tailwind base/components/utilities` | `@import "tailwindcss"` | Tailwind v4 | Single import |
| `!important` prefix (`!flex`) | Suffix (`flex!`) | Tailwind v4 | Important modifier position changed |
| `middleware.ts` | `proxy.ts` | Next.js 16 (2025) | Clarifies network boundary |
| `next lint` command | `npm run lint` scripts | Next.js 16 | Lint removed from build/CLI |
| Implicit caching | `"use cache"` directive | Next.js 16 | Opt-in explicit caching |
| React Helmet for metadata | Built-in Metadata API | Next.js 13+ / React 19 | Native metadata support |

**Deprecated/outdated:**
- `@tailwind` directives: Use `@import "tailwindcss"` instead
- `.eslintrc.*` files: Prefer `eslint.config.mjs` flat config
- `ring` for 3px ring: Now use `ring-3` (default is 1px)
- `shadow-sm`: Now `shadow-xs` (all shadow names shifted)
- Sync params/searchParams/cookies: Must await in Next.js 16

## Open Questions

Things that couldn't be fully resolved:

1. **Exact brand colors**
   - What we know: Teal/green palette required (CONT-14)
   - What's unclear: Exact hex/oklch values for primary colors
   - Recommendation: Use teal-based oklch values as placeholder, finalize with actual brand colors from client

2. **Logo and font files**
   - What we know: Logo exists, brand fonts likely specified
   - What's unclear: Actual logo file, font family names
   - Recommendation: Use placeholder logo, Inter + Playfair Display as default fonts, update when assets provided

3. **Services dropdown on mobile**
   - What we know: 6 services need links (NAV-02)
   - What's unclear: Whether mobile should have dropdown or flat list
   - Recommendation: Flat expandable list on mobile (simpler UX), dropdown on desktop only

## Sources

### Primary (HIGH confidence)
- [Next.js 16 Blog Post](https://nextjs.org/blog/next-16) - Turbopack default, proxy.ts, cache components
- [Next.js App Router Documentation](https://nextjs.org/docs/app) - Project structure, server components
- [Tailwind CSS v4.0 Announcement](https://tailwindcss.com/blog/tailwindcss-v4) - @theme directive, CSS-first config
- [Tailwind CSS Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide) - Breaking changes, migration steps
- [Next.js LCP Optimization](https://nextjs.org/learn/seo/lcp) - Image priority, performance targets
- [W3C WAI Menus Tutorial](https://www.w3.org/WAI/tutorials/menus/) - Accessible navigation patterns
- [MDN aria-label](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label) - ARIA best practices

### Secondary (MEDIUM confidence)
- [Next.js 16 Linting Setup with ESLint 9](https://chris.lu/web_development/tutorials/next-js-16-linting-setup-eslint-9-flat-config) - Flat config setup
- [Tailwind CSS v4 Design Tokens](https://dev.to/wearethreebears/exploring-typesafe-design-tokens-in-tailwind-4-372d) - @theme patterns
- [WCAG 2.2 Complete Guide](https://www.allaccessible.org/blog/wcag-22-complete-guide-2025) - Success criteria overview
- [Mobile-First Responsive Design 2026](https://pxlpeak.com/blog/web-design/responsive-design-best-practices) - Best practices
- [React Accessibility Best Practices](https://www.allaccessible.org/blog/react-accessibility-best-practices-guide) - WCAG patterns

### Tertiary (LOW confidence - verify before using)
- Various Medium articles on hamburger menus - patterns vary, test accessibility
- Community discussions on pnpm + ESLint issues - may be version-specific

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All verified via official documentation (Next.js 16 blog, Tailwind v4 docs)
- Architecture: HIGH - Patterns from Next.js official guides and existing project research
- Pitfalls: HIGH - Combined from project PITFALLS.md research and official upgrade guides

**Research date:** 2026-01-27
**Valid until:** 2026-02-27 (30 days - stable technologies with recent major releases)
