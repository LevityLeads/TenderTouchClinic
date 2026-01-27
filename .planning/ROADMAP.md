# Roadmap: Tender Touch Clinic Website

## Overview

This roadmap delivers a modern, mobile-first marketing website for Tender Touch Mother & Baby Clinic. Starting with technical foundation and design system, progressing through static content pages, contact forms, and external integrations, culminating in performance polish and launch. The journey prioritizes mobile-first and accessibility from day one (cannot be retrofitted), establishes patient-centric content before interactive features, and validates against Core Web Vitals before launch.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3, 4): Planned milestone work
- Decimal phases (e.g., 2.1): Urgent insertions if needed (marked with INSERTED)

- [x] **Phase 1: Foundation & Design System** - Next.js scaffolding, component library, mobile-first layout, performance/accessibility foundation
- [ ] **Phase 2: Static Content & Pages** - Homepage, services, about, schedule, FAQ, testimonials with patient-centric copy
- [ ] **Phase 3: Contact & Forms** - Contact page, inquiry form with HIPAA-aware design, Google Maps, email integration
- [ ] **Phase 4: Integrations & Launch** - Bookem booking, WhatsApp button, final SEO/accessibility/performance validation, deployment

## Phase Details

### Phase 1: Foundation & Design System
**Goal**: Developers have a mobile-first, accessible, performant foundation with reusable components ready for content pages
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, FOUND-06, FOUND-07, NAV-01, NAV-02, NAV-03, NAV-04, NAV-05, CONT-14
**Success Criteria** (what must be TRUE):
  1. Site renders correctly on mobile, tablet, and desktop breakpoints
  2. Page achieves sub-2.5s Largest Contentful Paint on mobile (4G throttled)
  3. Keyboard navigation works through header, navigation, and footer
  4. Header with logo, nav links, and CTA renders on all viewports with mobile hamburger menu
  5. Footer with contact info, links, hours, and social displays on all pages
**Plans**: 3 plans

Plans:
- [x] 01-01-PLAN.md — Project scaffolding, design tokens, and UI primitives (Wave 1)
- [x] 01-02-PLAN.md — Header, MobileNav, and ServicesDropdown (Wave 2)
- [x] 01-03-PLAN.md — Footer, WhatsApp button, and root layout wiring (Wave 2)

### Phase 2: Static Content & Pages
**Goal**: Visitors can browse all clinic information, understand services, and see testimonials
**Depends on**: Phase 1
**Requirements**: HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, HOME-06, SERV-01, SERV-02, SERV-03, SERV-04, SERV-05, SERV-06, SERV-07, SERV-08, SERV-09, ABOUT-01, ABOUT-02, ABOUT-03, ABOUT-04, ABOUT-05, ABOUT-06, SCHED-01, SCHED-02, SCHED-03, SCHED-04, SCHED-05, FAQ-01, FAQ-02, FAQ-03, FAQ-04, FAQ-05, FAQ-06, TEST-01, TEST-02, TEST-03, TEST-04, TEST-05, CONT-11, CONT-12, CONT-13, CONT-15, LEGAL-01, LEGAL-02
**Success Criteria** (what must be TRUE):
  1. Visitor on homepage can immediately see services overview and understand what Tender Touch offers
  2. Visitor can navigate to any service page and find pricing, course details, and benefits
  3. Visitor can read Megan's story, credentials, and see clinic photos on About page
  4. Visitor can view upcoming antenatal and baby massage class dates with availability
  5. Visitor can find answers to common questions in accordion-style FAQ section
**Plans**: 3 plans

Plans:
- [ ] 02-01-PLAN.md — Content data files and accordion component (Wave 1)
- [ ] 02-02-PLAN.md — Homepage sections and services pages (Wave 2)
- [ ] 02-03-PLAN.md — About, Schedule, FAQ, and legal pages (Wave 2)

### Phase 3: Contact & Forms
**Goal**: Visitors can reach out via contact form and find clinic location
**Depends on**: Phase 2
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, CONT-06, CONT-07, CONT-08, CONT-09, CONT-10
**Success Criteria** (what must be TRUE):
  1. Visitor can submit contact form with name, phone, email, preferred time, and message
  2. Form shows validation errors for invalid input and success message after submission
  3. Clinic receives email notification when form is submitted
  4. Visitor can see clinic address, phone, email, hours, and interactive map on contact page
  5. Form collects NO medical information (HIPAA-aware design)
**Plans**: 2 plans

Plans:
- [ ] 03-01-PLAN.md — Contact page layout, info display, and Google Maps embed (Wave 1)
- [ ] 03-02-PLAN.md — Contact form with React Hook Form, Zod validation, and Resend email (Wave 2)

### Phase 4: Integrations & Launch
**Goal**: Visitors can book appointments via Bookem and site is production-ready
**Depends on**: Phase 3
**Requirements**: BOOK-01, BOOK-02, BOOK-03, BOOK-04, BOOK-05, WHATS-01, WHATS-02, WHATS-03, WHATS-04, LEGAL-03
**Success Criteria** (what must be TRUE):
  1. Visitor can access Bookem booking widget from service pages with service pre-selected
  2. Booking widget works correctly on mobile devices
  3. Floating WhatsApp button appears on all pages and opens chat with pre-filled message
  4. Site passes WCAG 2.2 AA accessibility audit (axe DevTools)
  5. Site achieves Core Web Vitals (LCP < 2.5s, CLS < 0.1) on mobile
**Plans**: TBD

Plans:
- [ ] 04-01: Bookem booking integration
- [ ] 04-02: WhatsApp button and final polish
- [ ] 04-03: Accessibility/performance audit and launch validation

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Design System | 3/3 | Complete | 2026-01-27 |
| 2. Static Content & Pages | 3/3 | Complete | 2026-01-27 |
| 3. Contact & Forms | 0/2 | Ready | - |
| 4. Integrations & Launch | 0/3 | Not started | - |

---
*Roadmap created: 2026-01-27*
*Total plans: 11 | Total requirements: 67 | Depth: quick*
