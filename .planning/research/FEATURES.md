# Feature Research

**Domain:** Mother & Baby Clinic Website (Midwifery/Maternal Care)
**Researched:** 2026-01-27
**Confidence:** MEDIUM-HIGH (based on multiple credible sources, healthcare website best practices, and competitor analysis)

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = product feels incomplete or unprofessional.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Mobile-responsive design** | 70%+ of healthcare searches happen on mobile; new parents browse while nursing/rocking baby | LOW | Non-negotiable. Must load in under 3 seconds with sticky navigation |
| **Clear contact information on every page** | 77% of patients search online before booking; contact info in header/footer is standard | LOW | Phone, address, hours visible without scrolling. WhatsApp common for this demographic |
| **Service pages with plain-language descriptions** | Patients need to understand what services help them before booking | MEDIUM | One page per service category: antenatal, postnatal, baby massage, vaccinations, lactation, newborn checks |
| **Provider/practitioner profiles** | Patients want to know who will care for them; builds trust before first visit | LOW | Photo, qualifications (midwife credentials), experience, personal touch (e.g., "mother of two") |
| **Online booking or inquiry form** | 43% of patients prefer booking outside business hours; expectation set by other industries | MEDIUM | At minimum: inquiry form. Ideally: self-service booking with date/time selection |
| **Location information with map** | Parents need to know where to go, parking availability | LOW | Embedded Google Map, directions, parking info, accessibility notes |
| **Operating hours** | Basic information patients need to plan visits | LOW | Consider noting "after-hours support available" if applicable |
| **About page (clinic story)** | Establishes credibility and personal connection; 78% of patients say testimonials increase likelihood of booking | LOW | Focus on patient-centered mission, not self-congratulation |
| **Testimonials/reviews** | 84% of patients read online reviews before choosing a provider; 46% choose based on reviews | LOW | 3-5 curated testimonials on homepage; consider linking to Google reviews |
| **Basic accessibility (WCAG 2.2 AA)** | Legal requirement in many jurisdictions; ethical imperative; parents may have visual impairments or use assistive tech | MEDIUM | High-contrast text, keyboard navigation, large tap targets, alt text for images |
| **SSL/HTTPS security** | Browser warnings scare visitors away; basic trust signal | LOW | Standard with modern hosting |
| **Privacy policy** | Required if collecting any data (contact forms, booking) | LOW | Template available; customize for services offered |

### Differentiators (Competitive Advantage)

Features that set Tender Touch apart from generic healthcare sites and larger hospital systems. Small clinic advantages: personalization, warmth, flexibility.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Warm, approachable visual design** | Soft-trust colors (sage green, warm pastels) reduce anxiety; distinguish from clinical hospital feel | LOW-MEDIUM | Avoid harsh clinical whites/blues. Use authentic imagery of mothers/babies, not stock photos |
| **Class schedule with specific dates** | Parents can see exactly when antenatal (6-week) and baby massage (4-week) courses run; reduces friction | MEDIUM | Show upcoming course start dates, times, number of spots. Update regularly |
| **Pricing transparency** | 91% of Americans want healthcare price transparency; small clinics can compete by being upfront where hospitals are opaque | LOW | List prices for classes and consultations; note any insurance/payment options |
| **Easy WhatsApp/SMS contact** | New mothers often have one hand free while holding baby; typing easier than calling | LOW | WhatsApp click-to-chat link; many competitors only offer phone/email |
| **Personalized booking experience** | Match expectant parents to right service based on due date or baby's age | MEDIUM | Simple intake questions: "When is your due date?" or "How old is your baby?" to route to appropriate services |
| **Home visit information** | Postnatal home visits are a key differentiator for small clinics vs. hospital-based care | LOW | Dedicated section explaining home visit service, what to expect, coverage area |
| **Educational resources/blog** | Positions clinic as trusted advisor; addresses common concerns; SEO benefit | MEDIUM | Start with 5-10 cornerstone articles: breastfeeding tips, what to expect in antenatal classes, newborn care basics |
| **FAQ section** | Reduces phone inquiries; addresses common anxieties before they become barriers to booking | LOW | "When should I start antenatal classes?", "What if my baby cries during the massage class?", etc. |
| **Multilingual content** | Serves diverse community; few small clinics offer this | MEDIUM-HIGH | Consider primary languages of target community; even basic translations differentiate |
| **Partner/support person inclusion** | Antenatal classes often include partners; make this explicit and welcoming | LOW | Copy that explicitly invites partners/support people; images showing diverse family structures |
| **Photo gallery** | Humanizes the clinic; shows real environment; reduces anxiety about unfamiliar space | LOW | Clinic interior, class in session (with consent), practitioner at work |
| **Downloadable resources** | Practical value that keeps clinic top-of-mind | LOW-MEDIUM | Printable checklist: "What to bring to your first antenatal class", "Baby massage routine card" |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems for a v1 small clinic site.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| **Full patient portal** | "Hospital websites have them" | Massive complexity; HIPAA/data compliance burden; overkill for small clinic; high maintenance cost | Simple booking + email confirmations. Direct messaging via WhatsApp or email |
| **Real-time online booking with instant confirmation** | "Other services do it" | Requires complex calendar integration, no-show management, payment processing; staff need to manage availability constantly | Phase 1: Inquiry form that captures preferred dates. Phase 2: Simple booking with manual confirmation |
| **Complex multi-service booking** | "Let parents book everything at once" | Confusing UX; different services have different availability; increased abandonment | Guide users to one service at a time; offer "bundled" consultations as single bookable item |
| **Live chat / AI chatbot** | "Available 24/7" | Requires constant monitoring or expensive AI setup; creates expectation of instant response; healthcare questions need professional answers | Clear FAQ; simple contact form with "We'll respond within X hours" promise |
| **E-commerce for baby products** | "Additional revenue" | Inventory management, shipping logistics, returns, liability for product safety; distracts from core service | Recommend products in blog posts with affiliate links if desired; not core to v1 |
| **Telehealth/video consultations** | "Modern healthcare offers this" | Requires HIPAA-compliant video platform, technical support, scheduling complexity; not all services translate to video | Note availability for future; some consultations (lactation) work better in-person initially |
| **Complex SEO-optimized content hub** | "We need to rank for everything" | Requires ongoing content creation; staff time; potential for outdated information | Start with 5-10 quality evergreen articles. Quality over quantity |
| **Membership/subscription model** | "Recurring revenue" | Complex billing; unclear value proposition for episodic care (pregnancy is finite); customer service overhead | Package pricing for course bundles (e.g., antenatal + postnatal support) |
| **Event calendar with recurring classes** | "Show all our offerings" | Complex to maintain; outdated info damages trust; parents need specific dates | Static "upcoming courses" section updated monthly; less is more |
| **Social media feed integration** | "Show we're active" | Slow page loads; design inconsistency; if feed goes stale, looks bad | Link to social profiles; post testimonials directly on site |

## Feature Dependencies

```
[Contact Form]
    └── requires → [SSL Certificate] (secure data transmission)
    └── enhances → [Service Pages] (embedded on each service page)

[Online Booking]
    └── requires → [Service Pages] (what are they booking?)
    └── requires → [Provider Profiles] (who will they see?)
    └── requires → [Contact Form] (fallback for booking issues)
    └── enhances → [Class Schedule] (click to book from schedule)

[Testimonials]
    └── enhances → [Service Pages] (service-specific testimonials)
    └── enhances → [Homepage] (trust signal on first visit)
    └── requires → [Privacy Policy] (consent for testimonial use)

[Educational Blog]
    └── enhances → [Service Pages] (link to related articles)
    └── enhances → [SEO] (organic search traffic)
    └── requires → [About Page] (establishes author credibility)

[Class Schedule]
    └── requires → [Service Pages] (classes are a service)
    └── enhances → [Online Booking] (see schedule, then book)

[FAQ Section]
    └── reduces load on → [Contact Form] (fewer inquiries)
    └── enhances → [Service Pages] (service-specific FAQs)
```

### Dependency Notes

- **Contact Form requires SSL:** Any data collection needs secure transmission. SSL is table stakes.
- **Online Booking requires Service Pages:** Users must understand what they're booking before they book it.
- **Testimonials enhance everything:** Strategic placement on homepage (trust) and service pages (conversion).
- **Blog requires About Page:** E-E-A-T (Experience, Expertise, Authoritativeness, Trust) - Google and patients want to know who's writing.
- **FAQ reduces Contact Form load:** Good FAQ = fewer "when do classes start?" emails.

## MVP Definition

### Launch With (v1)

Minimum viable product - what's needed to validate the concept and serve the core value: "Visitors can quickly understand services and easily book or get in touch."

- [x] **Mobile-responsive homepage** - Hero with clinic value prop, services overview, trust signals
- [x] **Service pages (6 total)** - Antenatal classes, postnatal support, baby massage, vaccinations, lactation, newborn check-ups
- [x] **Contact page with form** - Phone, email, WhatsApp, address, map, hours, inquiry form
- [x] **About page with provider profiles** - Clinic story, practitioner bio with credentials and photo
- [x] **Testimonials section** - 3-5 testimonials on homepage or dedicated page
- [x] **Basic class schedule** - Next start dates for antenatal and baby massage courses
- [x] **Pricing information** - Clear pricing for all services/classes
- [x] **FAQ section** - 10-15 common questions
- [x] **Privacy policy** - Required for contact form compliance

**Why this scope:** Covers all table stakes, enables the core user journey (understand services -> decide to book -> contact clinic), and can be launched in weeks, not months.

### Add After Validation (v1.x)

Features to add once core is working and receiving traffic.

- [ ] **Online booking with calendar** - Add when contact form volume justifies; trigger: 20+ inquiries/month
- [ ] **Educational blog (5-10 articles)** - Add for SEO and authority; trigger: organic traffic strategy begins
- [ ] **Photo gallery** - Add when professional photos are available
- [ ] **Downloadable resources** - Add based on common questions received
- [ ] **WhatsApp chat widget** - Add if WhatsApp inquiries outpace email

### Future Consideration (v2+)

Features to defer until product-market fit is established.

- [ ] **Multilingual content** - Defer until community demand is clear
- [ ] **Video content/virtual tour** - Defer until budget allows professional production
- [ ] **Newsletter signup** - Defer until content strategy is active
- [ ] **Online payments** - Defer until booking volume justifies payment processing complexity
- [ ] **Telehealth option** - Defer until clear demand for remote consultations

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Mobile-responsive design | HIGH | LOW | **P1** |
| Service pages | HIGH | MEDIUM | **P1** |
| Contact page/form | HIGH | LOW | **P1** |
| Provider profiles | HIGH | LOW | **P1** |
| Testimonials | HIGH | LOW | **P1** |
| Class schedule | HIGH | LOW | **P1** |
| Pricing transparency | HIGH | LOW | **P1** |
| FAQ section | MEDIUM | LOW | **P1** |
| Privacy policy | MEDIUM | LOW | **P1** |
| Warm visual design | MEDIUM | MEDIUM | **P1** |
| Online booking | HIGH | MEDIUM | **P2** |
| Educational blog | MEDIUM | MEDIUM | **P2** |
| Photo gallery | LOW | LOW | **P2** |
| Downloadable resources | LOW | LOW | **P2** |
| Multilingual content | LOW | HIGH | **P3** |
| Video content | LOW | HIGH | **P3** |
| Patient portal | LOW | HIGH | **P3 (avoid)** |

**Priority key:**
- **P1:** Must have for launch - core user journey
- **P2:** Should have, add when possible - enhances experience
- **P3:** Nice to have, future consideration - specialized needs

## Competitor Feature Analysis

| Feature | Large Hospital Sites | Generic Clinic Templates | Boutique Midwife Clinics | **Tender Touch Approach** |
|---------|---------------------|-------------------------|-------------------------|--------------------------|
| Service descriptions | Clinical, jargon-heavy | Generic, impersonal | Warm, patient-focused | Patient-centered with clear outcomes |
| Booking | Full portal, complex | Basic form | Varies widely | Simple form v1, self-service v2 |
| Pricing | Hidden/opaque | Often missing | Usually transparent | Fully transparent - competitive advantage |
| Visual design | Corporate, sterile | Template-generic | Often warm but amateur | Professional warmth - soft colors, quality imagery |
| Provider info | Formal credentials only | Missing or minimal | Personal, approachable | Credentials + personal touch + photo |
| Contact methods | Phone primarily | Form only | Multiple options | Phone, email, WhatsApp, form |
| Class information | Buried in menus | N/A | Varies | Prominent with specific dates and pricing |
| Testimonials | Formal case studies | Stock testimonials | Real but few | Curated real testimonials, service-specific |
| Mobile experience | Functional but clunky | Template-dependent | Varies widely | Mobile-first design throughout |
| Trust signals | Accreditations, awards | Generic badges | Personal stories | Practitioner credentials + real testimonials + personal story |

### Competitive Positioning

Tender Touch can differentiate by:
1. **Being more personal than hospital sites** - Show the human behind the care
2. **Being more professional than DIY clinic sites** - Quality design and content
3. **Being more transparent than both** - Clear pricing, honest about what to expect
4. **Being more accessible than both** - Multiple contact methods, mobile-first, plain language

## Sources

### Healthcare Website Best Practices
- [Digital Silk: Healthcare Website Design Examples 2026](https://www.digitalsilk.com/digital-trends/best-healthcare-website-design-examples/)
- [Kanopi: Healthcare Website Design Examples](https://kanopi.com/blog/healthcare-website-design/)
- [Nopio: Clinic Website Design Essential Features 2026](https://www.nopio.com/blog/clinic-website-design/)
- [Mark Brinker: Healthcare Website Design Mistakes to Avoid](https://www.markbrinker.com/healthcare-website-design)
- [Adchitects: Healthcare Web Design Best Practices 2026](https://adchitects.co/blog/web-design-for-healthcare-best-practices-and-guidelines)
- [Concrete CMS: Healthcare Website Design Best Practices](https://www.concretecms.com/about/blog/web-design/healthcare-website-design-best-practices-and-strategies)

### Booking and Scheduling
- [Noterro: Best Medical Appointment Scheduling Software 2026](https://www.noterro.com/blog/best-medical-appointment-scheduling-software)
- [CertifyHealth: Patient Scheduling Best Practices](https://www.certifyhealth.com/blog/5-patient-scheduling-best-practices-for-appointment-management/)
- [Jotform: Organizing Baby Massage Classes](https://www.jotform.com/blog/organizing-baby-massage-sessions-and-classes/)

### Patient Trust and Testimonials
- [Birdeye: Doctor Review Sites 2026](https://birdeye.com/blog/doctor-review-sites/)
- [Sprypt: Patient Testimonials vs Reviews](https://www.sprypt.com/blog/patient-testimonials-vs-reviews)
- [Tebra: HIPAA-Compliant Patient Testimonials](https://www.tebra.com/theintake/practice-growth/legal-and-compliance/your-guide-to-hipaa-compliant-patient-reviews)
- [RepuGen: Patient Review Survey 2025](https://www.repugen.com/patient-review-survey)

### Antenatal and Postnatal Services
- [NCT: Antenatal Courses](https://www.nct.org.uk/courses-workshops/nct-antenatal-course)
- [NHS: Antenatal Classes](https://www.nhs.uk/pregnancy/labour-and-birth/preparing-for-the-birth/antenatal-classes/)
- [Tommy's: Antenatal Classes Guide](https://www.tommys.org/pregnancy-information/im-pregnant/antenatal-care/antenatal-classes-preparing-you-birth)
- [The Lactation Network](https://lactationnetwork.com/)
- [Nest Collaborative: Telehealth Lactation](https://nestcollaborative.com/)

### Small Clinic Competitive Strategy
- [LinkedIn: Small Clinics vs Hospitals Competition](https://www.linkedin.com/pulse/3-ways-smaller-clinics-compete-hospitals-larger-daniel-coulton-shaw)
- [Healthcare Success: Competitive Analysis](https://healthcaresuccess.com/blog/healthcare-marketing/your-guide-to-healthcare-industry-competitive-analysis-for-branding-digital-marketing.html)

### Website Mistakes to Avoid
- [AHA Media: Hospital Website Mistakes](https://ahamediagroup.com/blog/5-hospital-website-mistakes-to-avoid/)
- [Sagefrog: Healthcare Website Mistakes](https://www.sagefrog.com/blog/5-common-mistakes-healthcare-website-mistakes-avoid/)
- [TBH Creative: Healthcare Website Mistakes](https://www.tbhcreative.com/blog/avoid-these-common-healthcare-website-mistakes/)

---
*Feature research for: Tender Touch Mother & Baby Clinic*
*Researched: 2026-01-27*
