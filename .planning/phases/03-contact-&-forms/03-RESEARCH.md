# Phase 3: Contact & Forms - Research

**Researched:** 2026-01-27
**Domain:** Form handling, email delivery, maps integration
**Confidence:** HIGH

## Summary

This phase implements a contact page with a HIPAA-aware contact form (collecting no medical information), email notifications via Resend, and an interactive Google Maps embed. The stack leverages Next.js Server Actions for form submission, React Hook Form with Zod for validation, and Resend for transactional email delivery.

The key architectural decisions are:
- **Client-side validation** with React Hook Form + Zod for immediate feedback
- **Server-side validation** with the same Zod schema for security
- **Server Actions** instead of API routes for form handling (simpler, type-safe)
- **Resend** for email delivery (developer-friendly, React Email templates)
- **Google Maps Embed API** (free, no JavaScript SDK needed)

**Primary recommendation:** Use React Hook Form with Zod resolver for client validation, duplicate validation in Server Action, send email via Resend, and embed Google Maps via iframe with responsive CSS wrapper.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| react-hook-form | ^7.54 | Form state management | Uncontrolled components, minimal re-renders, tiny bundle |
| zod | ^3.24 | Schema validation | TypeScript-first, single source of truth for types + validation |
| @hookform/resolvers | ^3.10 | Connect RHF to Zod | Official integration, type inference |
| resend | ^4.1 | Email delivery | Developer-friendly API, React Email templates, good deliverability |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @react-email/components | ^0.0.31 | Email templates | When building styled email templates |
| lucide-react | (existing) | Icons | MapPin, Phone, Mail, Clock, MessageCircle icons |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Resend | SendGrid, Postmark | Resend has simpler API, React Email integration; SendGrid has more features for high volume |
| React Hook Form | Native useActionState | RHF provides better UX with field-level validation, touched states |
| Google Maps Embed | @react-google-maps/api | Embed is free, no JS SDK; API needed only for interactivity beyond basic map |

**Installation:**
```bash
pnpm add react-hook-form zod @hookform/resolvers resend
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   ├── contact/
│   │   └── page.tsx              # Contact page (Server Component)
│   └── actions/
│       └── contact.ts            # Contact form Server Action
├── components/
│   ├── forms/
│   │   └── contact-form.tsx      # Contact form (Client Component)
│   └── sections/
│       ├── contact-info.tsx      # Contact details section
│       └── map-embed.tsx         # Google Maps embed
├── lib/
│   └── validations/
│       └── contact.ts            # Zod schema (shared client/server)
└── emails/
    └── contact-notification.tsx  # React Email template
```

### Pattern 1: Shared Validation Schema
**What:** Define Zod schema once, use for both client and server validation
**When to use:** Any form that needs client + server validation
**Example:**
```typescript
// src/lib/validations/contact.ts
import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Please enter a valid email"),
  phone: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9+\-\s()]+$/, "Please enter a valid phone number"),
  preferredTime: z.enum(["morning", "afternoon", "evening", "any"], {
    required_error: "Please select a preferred contact time",
  }),
  message: z.string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
  honeypot: z.string().max(0), // Must be empty (spam protection)
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
```

### Pattern 2: Server Action with useActionState
**What:** Server Action returns structured result, client uses useActionState hook
**When to use:** Forms that need pending state and error display
**Example:**
```typescript
// src/app/actions/contact.ts
"use server";

import { contactFormSchema } from "@/lib/validations/contact";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Check honeypot (spam protection)
  const honeypot = formData.get("honeypot");
  if (honeypot) {
    // Silently accept but don't process (bot detected)
    return { success: true, message: "Thank you for your message!" };
  }

  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    preferredTime: formData.get("preferredTime"),
    message: formData.get("message"),
    honeypot: formData.get("honeypot") ?? "",
  };

  const result = contactFormSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      message: "Please correct the errors below.",
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await resend.emails.send({
      from: "Tender Touch Clinic <noreply@yourdomain.com>",
      to: [process.env.CONTACT_EMAIL!],
      subject: `New Contact Form Submission from ${result.data.name}`,
      // React Email template here
    });

    return {
      success: true,
      message: "Thank you! We'll be in touch soon.",
    };
  } catch (error) {
    console.error("Failed to send email:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again or call us directly.",
    };
  }
}
```

### Pattern 3: Client Form with RHF + Server Action
**What:** React Hook Form for UX, Server Action for submission
**When to use:** When you need instant client validation AND server processing
**Example:**
```typescript
// src/components/forms/contact-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState } from "react";
import { contactFormSchema, type ContactFormData } from "@/lib/validations/contact";
import { submitContactForm, type ContactFormState } from "@/app/actions/contact";

const initialState: ContactFormState = {
  success: false,
  message: "",
};

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);

  const {
    register,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur", // Validate on blur for progressive disclosure
  });

  return (
    <form action={formAction} className="space-y-6">
      {/* Honeypot field - hidden from users, visible to bots */}
      <input
        type="text"
        {...register("honeypot")}
        className="absolute -left-[9999px]"
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Form fields with error display */}
      <div>
        <label htmlFor="name">Name *</label>
        <input {...register("name")} id="name" name="name" />
        {errors.name && <p role="alert">{errors.name.message}</p>}
      </div>

      {/* ... other fields ... */}

      {state.message && (
        <p role="status" aria-live="polite" className={state.success ? "text-green-600" : "text-red-600"}>
          {state.message}
        </p>
      )}

      <button type="submit" disabled={pending}>
        {pending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
```

### Pattern 4: Responsive Google Maps Embed
**What:** Iframe wrapper with aspect ratio for responsive sizing
**When to use:** Embedding any external iframe content
**Example:**
```typescript
// src/components/sections/map-embed.tsx
interface MapEmbedProps {
  address: string;
  title?: string;
}

export function MapEmbed({ address, title = "Clinic Location" }: MapEmbedProps) {
  const encodedAddress = encodeURIComponent(address);
  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&q=${encodedAddress}`;

  return (
    <div className="relative w-full aspect-[16/9] min-h-[300px]">
      <iframe
        src={embedUrl}
        title={title}
        className="absolute inset-0 w-full h-full border-0 rounded-lg"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
```

### Anti-Patterns to Avoid
- **Collecting medical information:** HIPAA requires BAA with form processor, encrypted storage, audit trails. Avoid entirely for simple contact forms.
- **Validating only on client:** Bots can bypass JavaScript; always validate server-side.
- **Using hidden input for honeypot:** Use CSS positioning instead (`absolute -left-[9999px]`) - more effective against sophisticated bots.
- **Blocking form submission on client errors alone:** Use progressive enhancement - form should work without JS.
- **Large Google Maps API bundle:** Use Embed API (iframe) unless you need custom markers, directions, etc.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Form state management | Custom useState per field | React Hook Form | Handles touched, dirty, validation, submission states |
| Schema validation | Manual if/else checks | Zod | Type inference, composable, same schema client/server |
| Email delivery | nodemailer + SMTP | Resend | Better deliverability, simpler API, React templates |
| Phone validation | Regex only | Zod + regex | Zod provides structure, regex handles format |
| Loading states | Manual useState | useActionState/useFormStatus | React 19 built-in, automatic pending state |
| CSRF protection | Manual token handling | Server Actions | Next.js handles CSRF automatically |

**Key insight:** Form handling has many edge cases (touched states, blur vs submit validation, async errors, pending states). React Hook Form + useActionState handle these; custom solutions miss edge cases.

## Common Pitfalls

### Pitfall 1: Validation Schema Mismatch
**What goes wrong:** Client schema differs from server schema, causing inconsistent errors
**Why it happens:** Copy-paste errors, forgetting to update both
**How to avoid:** Single schema file imported by both client component and server action
**Warning signs:** Form passes client validation but fails server validation

### Pitfall 2: Honeypot Field Visible to Users
**What goes wrong:** Honeypot input is displayed, users fill it out, submissions rejected
**Why it happens:** `display: none` or `visibility: hidden` detected by some bots; CSS not applied correctly
**How to avoid:** Use `position: absolute; left: -9999px` AND `tabIndex={-1}` AND `autoComplete="off"`
**Warning signs:** Legitimate users reporting form not working

### Pitfall 3: Google Maps Embed Breaks on Strict Referrer Policy
**What goes wrong:** Map shows "For development purposes only" or fails to load
**Why it happens:** Site-wide `referrer-policy: no-referrer` prevents API key validation
**How to avoid:** Add `referrerPolicy="no-referrer-when-downgrade"` to iframe
**Warning signs:** Map works locally but not in production

### Pitfall 4: Missing Environment Variables in Production
**What goes wrong:** Email sending fails, map doesn't load
**Why it happens:** .env.local not committed, Vercel/hosting env vars not set
**How to avoid:** Document required env vars, check at build time if possible
**Warning signs:** Works locally, fails in production

### Pitfall 5: Form Reset After Error
**What goes wrong:** User's input cleared when server returns validation error
**Why it happens:** Using native form action without preserving state
**How to avoid:** useActionState preserves input; don't call form.reset() on error
**Warning signs:** Users complaining about losing their message

### Pitfall 6: Missing ARIA for Form Errors
**What goes wrong:** Screen reader users don't hear validation errors
**Why it happens:** Errors displayed visually but not announced
**How to avoid:** Use `role="alert"` or `aria-live="polite"` on error messages; associate with `aria-describedby`
**Warning signs:** Accessibility audit failures

## Code Examples

Verified patterns from official sources:

### Resend Email Send (App Router)
```typescript
// Source: https://resend.com/docs/send-with-nextjs
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['delivered@resend.dev'],
      subject: 'Hello world',
      react: EmailTemplate({ firstName: 'John' }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
```

### React Hook Form with Zod
```typescript
// Source: https://react-hook-form.com/docs/useform + @hookform/resolvers
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, { message: 'Required' }),
  age: z.number().min(10),
});

type FormData = z.infer<typeof schema>;

const App = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <input {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}
      <input type="number" {...register('age', { valueAsNumber: true })} />
      <button type="submit">Submit</button>
    </form>
  );
};
```

### useActionState for Server Actions
```typescript
// Source: https://nextjs.org/docs/app/guides/forms
'use client'

import { useActionState } from 'react'

const initialState = { message: '' };

export function Signup() {
  const [state, formAction, pending] = useActionState(createUser, initialState)

  return (
    <form action={formAction}>
      <input type="text" id="email" name="email" required />
      <p aria-live="polite">{state?.message}</p>
      <button disabled={pending}>Sign up</button>
    </form>
  )
}
```

### Responsive Google Maps Embed
```html
<!-- Source: https://developers.google.com/maps/documentation/embed/embedding-map -->
<div style="position: relative; padding-bottom: 56.25%; height: 0;">
  <iframe
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
    loading="lazy"
    allowfullscreen
    referrerpolicy="no-referrer-when-downgrade"
    src="https://www.google.com/maps/embed/v1/place?key=API_KEY&q=13+Nederburg+Road,Kirstenhof,Cape+Town">
  </iframe>
</div>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| API routes for forms | Server Actions | Next.js 14+ | Simpler, type-safe, automatic CSRF |
| useState for form state | React Hook Form + useActionState | React 19 | Built-in pending states, better DX |
| Custom CSRF tokens | Server Actions built-in | Next.js 14+ | Less boilerplate, more secure |
| nodemailer + SMTP | Resend/Postmark APIs | 2023+ | Better deliverability, React templates |
| Google Maps JS API for static maps | Embed API iframe | Always available | Simpler, no bundle impact, free tier |

**Deprecated/outdated:**
- `useFormState` from `react-dom`: Renamed to `useActionState` in React 19
- API routes for simple form submission: Server Actions preferred unless you need REST API

## Open Questions

Things that couldn't be fully resolved:

1. **Google Maps API Key restriction strategy**
   - What we know: Key can be restricted to HTTP referrers for security
   - What's unclear: Whether Vercel preview deployments break referrer restriction
   - Recommendation: Use wildcard for preview URLs (*.vercel.app) or unrestricted key for Embed API (low risk, free tier)

2. **Email sender domain verification**
   - What we know: Resend requires verified domain for production sending
   - What's unclear: Client's domain setup (DNS access, existing email provider)
   - Recommendation: Use `onboarding@resend.dev` for development; plan domain verification before launch

3. **Rate limiting for form submissions**
   - What we know: No built-in rate limiting in Server Actions
   - What's unclear: Expected traffic volume, spam risk level
   - Recommendation: Start with honeypot only; add rate limiting (Vercel KV or Upstash) if spam becomes issue

## Sources

### Primary (HIGH confidence)
- [Next.js Forms Guide](https://nextjs.org/docs/app/guides/forms) - Server Actions, useActionState, validation patterns
- [Resend Next.js Integration](https://resend.com/docs/send-with-nextjs) - Email sending setup, API usage
- [React Hook Form useForm](https://react-hook-form.com/docs/useform) - Form state management, resolver integration
- [Google Maps Embed API](https://developers.google.com/maps/documentation/embed/embedding-map) - URL structure, iframe attributes

### Secondary (MEDIUM confidence)
- [Type-Safe Form Validation in Next.js 15](https://www.abstractapi.com/guides/email-validation/type-safe-form-validation-in-next-js-15-with-zod-and-react-hook-form) - Pattern combining RHF, Zod, Server Actions
- [Zod Documentation](https://zod.dev/) - Schema definition, safeParse, type inference
- [@hookform/resolvers](https://www.npmjs.com/package/@hookform/resolvers) - zodResolver integration

### Tertiary (LOW confidence)
- [HIPAA Compliant Contact Form](https://rosebenedictdesign.com/2025/09/21/hipaa-compliant-contact-form/) - HIPAA avoidance strategy (don't collect PHI)
- [Honeypot Spam Protection](https://medium.com/@zainshahza/honey-potting-in-next-js-acfd80eb8010) - Implementation pattern

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Official docs for all libraries, widely adopted patterns
- Architecture: HIGH - Next.js official forms guide, Resend official integration
- Pitfalls: MEDIUM - Combination of official docs and community experience

**Research date:** 2026-01-27
**Valid until:** 2026-02-27 (30 days - stable domain, mature libraries)
