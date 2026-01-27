# Phase 4: Integrations & Launch - Research

**Researched:** 2026-01-27
**Domain:** Third-party integrations (Bookem, WhatsApp), Accessibility testing, Performance optimization
**Confidence:** MEDIUM (see breakdown below)

## Summary

This phase focuses on three distinct integration areas: Bookem booking widget, WhatsApp floating button enhancements, and production readiness (accessibility compliance and Core Web Vitals).

The project already has a WhatsApp button implemented (Server Component with floating positioning), so that requirement is partially complete. The main work involves Bookem widget integration, adding non-clinical disclaimer text, accessibility auditing, and performance verification.

For Bookem integration, the widget uses a div-based approach (not iframe) for better responsive behavior. Service pre-selection is typically achieved via URL parameters. For accessibility, axe DevTools with axe-core 4.11.x provides automated WCAG 2.2 AA testing, though manual review is needed for focus appearance criteria. Core Web Vitals optimization leverages Next.js 16's built-in components (Image with `preload` prop, Script with `lazyOnload` strategy).

**Primary recommendation:** Use Next.js Script component with `lazyOnload` strategy to embed Bookem widget, implement jest-axe for automated accessibility testing, and verify LCP/CLS using PageSpeed Insights before launch.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next/script | 16.1.5 | Third-party script loading | Built-in, optimized loading strategies, prevents render blocking |
| axe-core | 4.11.1 | Accessibility testing engine | Industry standard, WCAG 2.2 support, 57% automated coverage |
| jest-axe | 9.0.0+ | Jest accessibility assertions | Integrates axe-core with test suite |
| react-cookie-consent | 10.0.1 | Cookie consent banner | Simple API, 78+ projects using it, GDPR-compliant |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @lhci/cli | latest | Lighthouse CI | Add to CI/CD pipeline for regression prevention |
| eslint-plugin-jsx-a11y | 6.10.2 | Accessibility linting | Already installed, catches issues at build time |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| react-cookie-consent | vanilla-cookieconsent | More granular control, but adds complexity - only needed if detailed category preferences required |
| jest-axe | @axe-core/react | Runtime dev tools vs test-time assertions - use both for complete coverage |
| PageSpeed Insights | Lighthouse CLI | CLI is faster for CI/CD, PSI gives real-user data |

**Installation:**
```bash
npm install --save-dev jest-axe @types/jest-axe
npm install react-cookie-consent
```

Note: axe-core is a dependency of jest-axe, installed automatically.

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/
│   ├── integrations/
│   │   └── bookem-widget.tsx     # Bookem booking widget wrapper
│   └── layout/
│       ├── whatsapp-button.tsx   # Already exists
│       └── cookie-consent.tsx    # Cookie banner component
├── lib/
│   └── constants.ts              # Bookem config, already has WhatsApp constants
└── __tests__/
    └── a11y/
        └── *.test.tsx            # Accessibility test files
```

### Pattern 1: Third-Party Widget as Client Component

**What:** Wrap third-party scripts in Client Components using Next.js Script
**When to use:** Any external widget requiring JavaScript initialization
**Example:**
```typescript
// src/components/integrations/bookem-widget.tsx
'use client';

import Script from 'next/script';
import { useRef } from 'react';

interface BookemWidgetProps {
  serviceId?: string;
}

export function BookemWidget({ serviceId }: BookemWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Construct URL with optional service pre-selection
  const bookemUrl = serviceId
    ? `https://bookem.com/[business-slug]?service=${serviceId}`
    : `https://bookem.com/[business-slug]`;

  return (
    <div ref={containerRef} className="min-h-[400px]">
      {/* Container for Bookem widget */}
      <div id="bookem-container" />
      <Script
        src="https://bookem.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => {
          // Initialize widget after script loads
          // Exact API depends on Bookem documentation
        }}
        onError={(e) => {
          console.error('Bookem widget failed to load', e);
        }}
      />
      {/* Fallback for when widget unavailable */}
      <noscript>
        <p className="text-center py-8">
          <a href={bookemUrl} className="text-primary-600 underline">
            Book an appointment on our booking page
          </a>
        </p>
      </noscript>
    </div>
  );
}
```

### Pattern 2: Cookie Consent with Conditional Analytics

**What:** Show consent banner, only load analytics after acceptance
**When to use:** Sites with analytics/tracking (LEGAL-03)
**Example:**
```typescript
// src/components/layout/cookie-consent.tsx
'use client';

import CookieConsent, { getCookieConsentValue } from 'react-cookie-consent';

export function CookieConsentBanner() {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      declineButtonText="Decline"
      enableDeclineButton
      cookieName="ttc-cookie-consent"
      expires={365}
      onAccept={() => {
        // Initialize analytics here if consent given
        // window.gtag?.config({ ... });
      }}
      style={{
        background: 'var(--color-neutral-900)',
        color: 'var(--color-neutral-100)',
      }}
      buttonStyle={{
        background: 'var(--color-primary-500)',
        color: 'white',
        borderRadius: '0.5rem',
      }}
      ariaAcceptLabel="Accept cookies"
      ariaDeclineLabel="Decline cookies"
    >
      We use cookies to enhance your experience. By continuing to visit this
      site you agree to our use of cookies.{' '}
      <a href="/privacy" className="underline">
        Learn more
      </a>
    </CookieConsent>
  );
}
```

### Pattern 3: Accessibility Testing with jest-axe

**What:** Automated accessibility assertions in unit tests
**When to use:** Every component test file
**Example:**
```typescript
// src/__tests__/a11y/components.test.tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from '@/components/ui/button';
import { WhatsAppButton } from '@/components/layout/whatsapp-button';

expect.extend(toHaveNoViolations);

// Configure axe for WCAG 2.2 AA
const axeOptions = {
  runOnly: {
    type: 'tag' as const,
    values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'],
  },
};

describe('Accessibility', () => {
  it('Button has no violations', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container, axeOptions);
    expect(results).toHaveNoViolations();
  });

  it('WhatsAppButton has no violations', async () => {
    const { container } = render(<WhatsAppButton />);
    const results = await axe(container, axeOptions);
    expect(results).toHaveNoViolations();
  });
});
```

### Anti-Patterns to Avoid
- **Loading third-party scripts with `beforeInteractive`:** Blocks hydration, hurts LCP
- **Multiple `priority` images per page:** Defeats lazy loading, slows initial load
- **Testing isolated components without landmark context:** axe may flag false positives for missing landmarks
- **Relying solely on automated a11y testing:** Only catches ~57% of issues, manual testing essential

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Cookie consent UI | Custom modal/banner | react-cookie-consent | Handles cookies, consent state, ARIA labels |
| Accessibility testing | Manual DOM inspection | jest-axe + axe DevTools | Automated, consistent, catches regressions |
| Script loading optimization | Raw `<script>` tags | next/script | Handles loading strategies, prevents blocking |
| Image optimization | Manual compression | next/image | Automatic format selection, responsive srcset |
| Focus management | Manual focus() calls | Radix UI primitives | Already used, handles keyboard navigation |

**Key insight:** Third-party integrations and accessibility testing are solved problems. Focus on configuration and integration, not custom implementations.

## Common Pitfalls

### Pitfall 1: Bookem Widget Blocking Page Load

**What goes wrong:** Widget script loaded synchronously blocks rendering, hurts LCP
**Why it happens:** Default script behavior is synchronous/blocking
**How to avoid:** Use `strategy="lazyOnload"` for non-critical widgets
**Warning signs:** LCP > 2.5s, "Eliminate render-blocking resources" in Lighthouse

### Pitfall 2: WhatsApp Button Obscuring Content

**What goes wrong:** Fixed button covers interactive elements on mobile
**Why it happens:** Insufficient bottom padding, doesn't account for mobile browsers
**How to avoid:** Add bottom padding to pages (pb-24), use z-index carefully
**Warning signs:** Users report inability to click CTAs at bottom of page

### Pitfall 3: Cookie Consent Causing CLS

**What goes wrong:** Banner appearing shifts page content
**Why it happens:** Banner not reserving space, injected after initial paint
**How to avoid:** Position banner at very bottom (position: fixed), ensure it overlays rather than pushes content
**Warning signs:** CLS > 0.1 on pages with cookie banner

### Pitfall 4: Incomplete Accessibility Coverage

**What goes wrong:** Automated tests pass but manual testing reveals issues
**Why it happens:** axe-core catches ~57% of issues, focus appearance/keyboard nav need manual testing
**How to avoid:** Combine jest-axe (automated), axe DevTools (browser), and manual keyboard testing
**Warning signs:** Users report keyboard navigation issues despite passing tests

### Pitfall 5: Missing Fallback for Widget Failure

**What goes wrong:** Booking widget doesn't load, users can't book
**Why it happens:** Network issues, script blocked, third-party downtime
**How to avoid:** Provide fallback link to external booking page (BOOK-05)
**Warning signs:** No visible booking option when JavaScript fails

### Pitfall 6: Mobile Touch Target Size

**What goes wrong:** WhatsApp button too small on mobile, hard to tap
**Why it happens:** Button sized for desktop mouse, not mobile fingers
**How to avoid:** Minimum 44x44px touch target (WCAG 2.5.5 AAA), button is 56x56px (w-14 h-14) - already compliant
**Warning signs:** Low click-through rate on mobile, user complaints

## Code Examples

Verified patterns from official sources:

### Next.js Script with lazyOnload Strategy
```typescript
// Source: https://nextjs.org/docs/app/api-reference/components/script
'use client';

import Script from 'next/script';

export default function WidgetPage() {
  return (
    <>
      <Script
        src="https://example.com/widget.js"
        strategy="lazyOnload"
        onLoad={() => console.log('Widget loaded')}
        onError={(e) => console.error('Widget error', e)}
      />
    </>
  );
}
```

### jest-axe Basic Setup
```typescript
// Source: https://github.com/NickColley/jest-axe
import { axe, toHaveNoViolations } from 'jest-axe';
import { render } from '@testing-library/react';

expect.extend(toHaveNoViolations);

it('should have no accessibility violations', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### react-cookie-consent with Custom Styling
```typescript
// Source: https://github.com/Mastermindzh/react-cookie-consent
import CookieConsent, { getCookieConsentValue } from 'react-cookie-consent';

<CookieConsent
  location="bottom"
  buttonText="Accept"
  enableDeclineButton
  declineButtonText="Decline"
  cookieName="site-consent"
  expires={365}
  onAccept={() => {
    // Enable analytics
  }}
  onDecline={() => {
    // Ensure analytics remain disabled
  }}
>
  This site uses cookies to improve your experience.
</CookieConsent>

// Check consent elsewhere:
const hasConsent = getCookieConsentValue("site-consent") === "true";
```

### WhatsApp Link with Pre-filled Message (Already Implemented)
```typescript
// Source: Existing implementation at src/lib/constants.ts
export const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi, I would like to enquire about your services at Tender Touch Clinic."
);

export function getWhatsAppUrl(message?: string) {
  const msg = message ? encodeURIComponent(message) : WHATSAPP_MESSAGE;
  return `https://wa.me/${CONTACT_INFO.whatsapp}?text=${msg}`;
}
```

### axe-core Configuration for WCAG 2.2 AA
```typescript
// Source: https://github.com/dequelabs/axe-core
const axeOptions = {
  runOnly: {
    type: 'tag',
    values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'],
  },
  rules: {
    // Disable rules that need page context (for component testing)
    region: { enabled: false },
    'page-has-heading-one': { enabled: false },
  },
};
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| iframe embeds | div-based widgets | ~2022 | Better responsive behavior, no scrolling issues |
| FID (First Input Delay) | INP (Interaction to Next Paint) | March 2024 | 95th percentile of interactions measured |
| next/image `priority` prop | next/image `preload` prop | Next.js 16 | Clearer semantics, same behavior |
| WCAG 2.1 | WCAG 2.2 (Oct 2023) | October 2023 | New criteria: focus appearance, target size minimum |
| Manual a11y audits | Automated + manual hybrid | Ongoing | ~57% automated coverage, manual still essential |

**Deprecated/outdated:**
- **FID metric:** Replaced by INP in March 2024
- **`priority` prop on next/image:** Deprecated in Next.js 16, use `preload` instead
- **Synchronous script loading:** Always use Next.js Script component with appropriate strategy

## Open Questions

Things that couldn't be fully resolved:

1. **Bookem Exact Embed Code**
   - What we know: Div-based embed, not iframe. CSS uses `.bkm-` prefix classes.
   - What's unclear: Exact JavaScript initialization code, service pre-selection URL parameter format
   - Recommendation: Contact Bookem support or check business account dashboard for embed code. May need to fetch from Bookem account settings directly.

2. **Bookem Service ID Mapping**
   - What we know: Services can likely be pre-selected via URL parameter
   - What's unclear: Exact parameter name (service, serviceId, category?), how Bookem service IDs map to site service slugs
   - Recommendation: Test in Bookem dashboard, document mapping in constants file

3. **Analytics Implementation**
   - What we know: Cookie consent component ready, conditional loading pattern established
   - What's unclear: Whether analytics will be implemented in this phase
   - Recommendation: If analytics needed, add Vercel Analytics (built-in) or Google Analytics with consent check

## Sources

### Primary (HIGH confidence)
- [Next.js Script Component Docs](https://nextjs.org/docs/app/api-reference/components/script) - Loading strategies, callbacks
- [axe-core GitHub](https://github.com/dequelabs/axe-core) - v4.11.1, WCAG 2.2 support
- [jest-axe GitHub](https://github.com/NickColley/jest-axe) - Testing patterns

### Secondary (MEDIUM confidence)
- [Bookem Help](https://bookem.com/help/embeddingbookem) - Div-based embed confirmed
- [react-cookie-consent GitHub](https://github.com/Mastermindzh/react-cookie-consent) - API, usage patterns
- [Core Web Vitals 2026 Guide](https://roastweb.com/blog/core-web-vitals-explained-2026) - INP thresholds

### Tertiary (LOW confidence)
- Bookem exact embed code - Could not access full documentation, recommend checking account dashboard
- Service pre-selection parameter format - Inferred from similar booking platforms

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Official documentation consulted for all tools
- Architecture patterns: MEDIUM - Based on Next.js docs and community patterns
- Pitfalls: MEDIUM - Mix of official docs and community experience
- Bookem integration: LOW - Limited public documentation, exact API unclear

**Research date:** 2026-01-27
**Valid until:** 2026-02-27 (30 days - stable domain, but verify Bookem API before implementation)

---

## Appendix: Existing Implementation Status

Items already implemented that Phase 4 requirements reference:

| Requirement | Status | Location |
|-------------|--------|----------|
| WhatsApp floating button | Done | `src/components/layout/whatsapp-button.tsx` |
| WhatsApp pre-filled message | Done | `src/lib/constants.ts` (WHATSAPP_MESSAGE) |
| Bottom-right positioning | Done | `fixed bottom-6 right-6` classes |
| Accessible labeling | Done | `aria-label="Chat with us on WhatsApp"` |
| Focus indicator | Done | `focus-visible:outline` classes |
| Touch target size | Done | `w-14 h-14` = 56x56px (exceeds 44px minimum) |

**Remaining WhatsApp work:**
- WHATS-03: Add disclaimer text (non-clinical inquiries only)
- Consider tooltip or adjacent text explaining WhatsApp use case
