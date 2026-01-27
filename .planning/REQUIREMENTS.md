# Requirements: Tender Touch Clinic Website

**Defined:** 2026-01-27
**Core Value:** Visitors can quickly understand what Tender Touch offers and easily take the next step—whether booking classes or reaching out for support.

## v1 Requirements

Requirements for initial website launch. Each maps to roadmap phases.

### Foundation & Performance

- [ ] **FOUND-01**: Site is fully responsive across mobile, tablet, and desktop breakpoints
- [ ] **FOUND-02**: Mobile-first design prioritizes phone experience (70%+ of users browse on mobile)
- [ ] **FOUND-03**: Page load time achieves sub-2.5s Largest Contentful Paint (LCP) on mobile
- [ ] **FOUND-04**: Site meets WCAG 2.2 AA accessibility standards (keyboard navigation, screen reader support, color contrast)
- [ ] **FOUND-05**: SEO optimization implemented (meta tags, Open Graph, structured data for LocalBusiness, sitemap.xml)
- [ ] **FOUND-06**: Images are optimized using Next.js Image component for performance
- [ ] **FOUND-07**: Site deployed to Vercel with HTTPS and custom domain configured

### Navigation & Layout

- [ ] **NAV-01**: Header with logo, main navigation (Home, Services dropdown, About, Contact), and prominent CTA
- [ ] **NAV-02**: Services dropdown menu lists all 6 services with links to detail pages or overview sections
- [ ] **NAV-03**: Sticky mobile header with hamburger menu for easy navigation while scrolling
- [ ] **NAV-04**: Footer with contact info, quick links, social media links, and business hours
- [ ] **NAV-05**: Floating WhatsApp button visible on all pages for quick contact

### Homepage

- [x] **HOME-01**: Hero section with compelling headline, subheadline, hero image, and primary CTA (Book Now / Get in Touch)
- [x] **HOME-02**: Services overview section with cards/grid showing all 6 services with brief descriptions
- [x] **HOME-03**: About section introducing Megan and Tender Touch's approach
- [x] **HOME-04**: Testimonials section displaying 3-5 curated client reviews with photos
- [x] **HOME-05**: Call-to-action section encouraging visitors to book or contact
- [x] **HOME-06**: Trust indicators (credentials, certifications, years of experience)

### Services Pages

- [x] **SERV-01**: Services overview page displaying all 6 services with summary cards
- [x] **SERV-02**: Antenatal Classes detail page with full 6-week course outline, pricing, benefits, and booking CTA
- [x] **SERV-03**: Baby Massage detail page with 4-week course details, benefits, class photos, and booking CTA
- [x] **SERV-04**: Postnatal Support detail page covering home visits, clinic consultations, what's included, and contact CTA
- [x] **SERV-05**: Vaccinations section on overview page with schedule, vaccines offered, and booking CTA
- [x] **SERV-06**: Lactation Consultations section on overview page with what's covered and booking CTA
- [x] **SERV-07**: Newborn Check-ups section on overview page with services included and booking CTA
- [x] **SERV-08**: Each service page/section includes transparent pricing information
- [x] **SERV-09**: Clear CTAs on each service directing to booking or contact methods

### About Page

- [x] **ABOUT-01**: Megan's professional bio highlighting credentials (RN, Midwife, UCT 1996, Certified Infant Massage Instructor)
- [x] **ABOUT-02**: Personal story including her experience as a mother of two and journey to opening Tender Touch
- [x] **ABOUT-03**: Clinic story (opened January 2022, grew from postnatal home visit practice)
- [x] **ABOUT-04**: Professional photo of Megan
- [x] **ABOUT-05**: Clinic mission and patient-centered approach
- [x] **ABOUT-06**: Photo gallery showing clinic environment and classes

### Class Schedule

- [x] **SCHED-01**: Class schedule page displaying upcoming course dates
- [x] **SCHED-02**: 6-week Antenatal Classes with start dates and availability
- [x] **SCHED-03**: 4-week Baby Massage classes with start dates and availability
- [x] **SCHED-04**: Clear indication of available spots or waitlist status
- [x] **SCHED-05**: Booking CTA for each upcoming class

### FAQ Section

- [x] **FAQ-01**: FAQ section addressing common questions about services
- [x] **FAQ-02**: Questions about antenatal classes (when to start, what to bring, group size)
- [x] **FAQ-03**: Questions about baby massage (age range, what to bring, benefits)
- [x] **FAQ-04**: Questions about postnatal support (home visits vs clinic, what's included)
- [x] **FAQ-05**: Questions about booking, payment, and cancellation policies
- [x] **FAQ-06**: Mobile-friendly accordion/expandable format

### Contact & Forms

- [x] **CONT-01**: Contact page with multiple contact methods (phone, email, WhatsApp)
- [x] **CONT-02**: Contact form with fields: name, phone, email, preferred contact time, message
- [x] **CONT-03**: Form validation with clear error messages
- [x] **CONT-04**: HIPAA-aware form design (collects NO medical information)
- [x] **CONT-05**: Success confirmation after form submission
- [x] **CONT-06**: Form submissions sent via email to clinic (using Resend or similar)
- [x] **CONT-07**: Privacy notice on form about data handling
- [x] **CONT-08**: Clinic address, phone, email, and hours prominently displayed on contact page
- [x] **CONT-09**: Google Maps embed showing clinic location (13 Nederburg Road, Kirstenhof)
- [x] **CONT-10**: Directions and parking information

### Booking Integration

- [ ] **BOOK-01**: Bookem booking widget embedded on site (div-based, not iframe)
- [ ] **BOOK-02**: Booking widget accessible from service pages with relevant service pre-selected
- [ ] **BOOK-03**: Booking widget mobile-optimized and tested on phones
- [ ] **BOOK-04**: Clear instructions for first-time bookers
- [ ] **BOOK-05**: Alternative contact methods provided if booking widget unavailable

### WhatsApp Integration

- [ ] **WHATS-01**: WhatsApp click-to-chat floating button on all pages
- [ ] **WHATS-02**: Pre-filled message template (e.g., "Hi, I'm interested in learning more about...")
- [ ] **WHATS-03**: Clear disclaimer that WhatsApp is for non-clinical inquiries only (directions, hours, general questions)
- [ ] **WHATS-04**: Non-intrusive positioning (bottom right/left corner)

### Testimonials

- [x] **TEST-01**: Testimonials section on homepage featuring 3-5 curated reviews
- [x] **TEST-02**: Each testimonial includes client name, service used, and quote
- [x] **TEST-03**: Real photos of clients (with permission) or placeholder illustrations
- [x] **TEST-04**: Testimonials emphasize specific outcomes and emotional experience
- [x] **TEST-05**: Diverse representation across different services (antenatal, postnatal, baby massage)

### Content & Messaging

- [x] **CONT-11**: All content written with patient-first, empathetic tone
- [x] **CONT-12**: Content addresses visitor concerns ("Can you help me?" "Will you take good care of me?")
- [x] **CONT-13**: Use of "you" language more than "we" language throughout
- [ ] **CONT-14**: Warm, approachable visual design with soft colors (teal/green brand palette)
- [x] **CONT-15**: Real photos from clinic, classes, and sessions used throughout site

### Legal & Privacy

- [x] **LEGAL-01**: Privacy policy page covering data collection, storage, and usage
- [x] **LEGAL-02**: Privacy policy linked in footer and on contact form
- [ ] **LEGAL-03**: Cookie consent (if analytics implemented)

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Enhanced Features

- **BLOG-01**: Educational blog with articles on pregnancy, postnatal care, baby development
- **BLOG-02**: Blog post categories and search functionality
- **GALLERY-01**: Expanded photo gallery with filterable categories
- **VIDEO-01**: Video testimonials from clients
- **VIDEO-02**: Virtual tour of clinic
- **MULTI-01**: Multilingual content (Afrikaans, Xhosa based on community needs)

### Advanced Booking

- **BOOK-06**: Real-time availability calendar display
- **BOOK-07**: Email/SMS booking confirmations and reminders
- **BOOK-08**: Client portal for managing appointments

### Enhanced Engagement

- **NEWS-01**: Newsletter signup with regular updates
- **SOCIAL-01**: Instagram feed integration on homepage
- **EVENT-01**: Events calendar for group talks and workshops

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Patient portal with medical records | Massive HIPAA compliance burden, requires secure patient management system |
| E-commerce for baby products | Distracts from core service offering, adds complexity |
| Live chat or AI chatbot | Creates expectation of instant response; WhatsApp sufficient for quick questions |
| Telehealth/video consultations | Not core to initial offering; requires separate compliance considerations |
| Full online payment processing | Bookem handles booking and payment; no need to duplicate |
| User accounts/login | Not needed for information and booking website |
| Multi-language support (v1) | Defer until community demand is clear; English-first for Cape Town market |
| Native mobile app | Web-first approach with responsive design sufficient |
| Real-time chat between moms | Community building not in scope; focus on clinic-patient relationship |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Complete |
| FOUND-02 | Phase 1 | Complete |
| FOUND-03 | Phase 1 | Complete |
| FOUND-04 | Phase 1 | Complete |
| FOUND-05 | Phase 1 | Complete |
| FOUND-06 | Phase 1 | Complete |
| FOUND-07 | Phase 1 | Complete |
| NAV-01 | Phase 1 | Complete |
| NAV-02 | Phase 1 | Complete |
| NAV-03 | Phase 1 | Complete |
| NAV-04 | Phase 1 | Complete |
| NAV-05 | Phase 1 | Complete |
| HOME-01 | Phase 2 | Complete |
| HOME-02 | Phase 2 | Complete |
| HOME-03 | Phase 2 | Complete |
| HOME-04 | Phase 2 | Complete |
| HOME-05 | Phase 2 | Complete |
| HOME-06 | Phase 2 | Complete |
| SERV-01 | Phase 2 | Complete |
| SERV-02 | Phase 2 | Complete |
| SERV-03 | Phase 2 | Complete |
| SERV-04 | Phase 2 | Complete |
| SERV-05 | Phase 2 | Complete |
| SERV-06 | Phase 2 | Complete |
| SERV-07 | Phase 2 | Complete |
| SERV-08 | Phase 2 | Complete |
| SERV-09 | Phase 2 | Complete |
| ABOUT-01 | Phase 2 | Complete |
| ABOUT-02 | Phase 2 | Complete |
| ABOUT-03 | Phase 2 | Complete |
| ABOUT-04 | Phase 2 | Complete |
| ABOUT-05 | Phase 2 | Complete |
| ABOUT-06 | Phase 2 | Complete |
| SCHED-01 | Phase 2 | Complete |
| SCHED-02 | Phase 2 | Complete |
| SCHED-03 | Phase 2 | Complete |
| SCHED-04 | Phase 2 | Complete |
| SCHED-05 | Phase 2 | Complete |
| FAQ-01 | Phase 2 | Complete |
| FAQ-02 | Phase 2 | Complete |
| FAQ-03 | Phase 2 | Complete |
| FAQ-04 | Phase 2 | Complete |
| FAQ-05 | Phase 2 | Complete |
| FAQ-06 | Phase 2 | Complete |
| TEST-01 | Phase 2 | Complete |
| TEST-02 | Phase 2 | Complete |
| TEST-03 | Phase 2 | Complete |
| TEST-04 | Phase 2 | Complete |
| TEST-05 | Phase 2 | Complete |
| CONT-01 | Phase 3 | Complete |
| CONT-02 | Phase 3 | Complete |
| CONT-03 | Phase 3 | Complete |
| CONT-04 | Phase 3 | Complete |
| CONT-05 | Phase 3 | Complete |
| CONT-06 | Phase 3 | Complete |
| CONT-07 | Phase 3 | Complete |
| CONT-08 | Phase 3 | Complete |
| CONT-09 | Phase 3 | Complete |
| CONT-10 | Phase 3 | Complete |
| CONT-11 | Phase 2 | Complete |
| CONT-12 | Phase 2 | Complete |
| CONT-13 | Phase 2 | Complete |
| CONT-14 | Phase 1 | Complete |
| CONT-15 | Phase 2 | Complete |
| BOOK-01 | Phase 4 | Pending |
| BOOK-02 | Phase 4 | Pending |
| BOOK-03 | Phase 4 | Pending |
| BOOK-04 | Phase 4 | Pending |
| BOOK-05 | Phase 4 | Pending |
| WHATS-01 | Phase 4 | Pending |
| WHATS-02 | Phase 4 | Pending |
| WHATS-03 | Phase 4 | Pending |
| WHATS-04 | Phase 4 | Pending |
| LEGAL-01 | Phase 2 | Complete |
| LEGAL-02 | Phase 2 | Complete |
| LEGAL-03 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 67
- Mapped to phases: 67
- Unmapped: 0

---
*Requirements defined: 2026-01-27*
*Last updated: 2026-01-27 after roadmap creation*
