export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqsByCategory: Record<string, FAQItem[]> = {
  "Antenatal Classes": [
    {
      id: "anc-1",
      question: "When should I start antenatal classes?",
      answer:
        "We recommend starting around 26-28 weeks of pregnancy. This gives you enough time to complete the 6-week course before your due date while the information is still fresh. However, if you're past this point, please get in touch - we can often accommodate later starters.",
    },
    {
      id: "anc-2",
      question: "Can my partner attend the classes?",
      answer:
        "Absolutely! Our courses are designed for couples. Partners are encouraged to attend all sessions as they play an important role in labour support and early parenting. The fee covers both parents.",
    },
    {
      id: "anc-3",
      question: "What topics do the antenatal classes cover?",
      answer:
        "The course covers labour and birth (including pain management options), breastfeeding, newborn care, the first weeks at home, and adjusting to parenthood. Each session builds on the previous one, and there's plenty of time for questions and discussion.",
    },
    {
      id: "anc-4",
      question: "How many couples are in each class?",
      answer:
        "We keep our groups small - typically 6-7 couples maximum. This ensures everyone gets personalized attention and feels comfortable asking questions. It also helps you build meaningful connections with other expectant parents.",
    },
    {
      id: "anc-5",
      question: "What if I miss a class session?",
      answer:
        "Life happens! If you miss a session, we'll provide you with the materials covered and can offer a brief catch-up. For major absences, we may be able to arrange for you to attend that session with another group, subject to availability.",
    },
    {
      id: "anc-6",
      question: "Are the classes suitable for second-time parents?",
      answer:
        "Yes! Many second-time parents find a refresher valuable, especially if there's been a gap between pregnancies. Guidelines change, and it's also a chance to process any previous birth experiences and prepare for this unique journey.",
    },
    {
      id: "anc-7",
      question: "Do you offer private antenatal sessions?",
      answer:
        "Yes, we offer one-on-one antenatal consultations for R600 per hour. These are ideal if you have specific concerns, prefer private sessions, or need flexibility with scheduling that group classes can't accommodate.",
    },
  ],
  "Breastfeeding & Lactation": [
    {
      id: "bf-1",
      question: "I'm struggling with breastfeeding. Can you help?",
      answer:
        "Yes! Breastfeeding support is a big part of what we do. Whether you're dealing with latch issues, supply concerns, pain, or just need reassurance, we provide hands-on help and evidence-based guidance. Sr Megan is a trained breastfeeding counsellor, and Sr Brigitte is a SACLC-certified lactation consultant.",
    },
    {
      id: "bf-2",
      question: "What's the difference between a breastfeeding consultation and a lactation consultation?",
      answer:
        "A breastfeeding consultation with Sr Megan (R600-R900) covers common challenges like latch, positioning, and supply. A lactation consultation with Sr Brigitte (R1,100) is more in-depth, ideal for complex issues like tongue-tie assessment, persistent pain, or when previous interventions haven't worked. Both are effective - we'll help you choose what's right for your situation.",
    },
    {
      id: "bf-3",
      question: "Can you help if I want to combination feed or switch to formula?",
      answer:
        "Absolutely. We support all feeding choices without judgement. Whether you want to exclusively breastfeed, combination feed, or transition to formula, we'll help you do it safely and comfortably. Fed is best, and we're here to support your journey.",
    },
    {
      id: "bf-4",
      question: "My baby has a tongue-tie. Can you assess this?",
      answer:
        "Yes. Sr Brigitte can assess for tongue-tie during a lactation consultation and discuss whether a release might be beneficial. We can also refer you to trusted practitioners for the procedure if needed and support you before and after.",
    },
    {
      id: "bf-5",
      question: "When should I seek breastfeeding help?",
      answer:
        "The sooner the better! Early intervention often prevents small issues becoming big problems. Seek help if you have pain during feeding, concerns about baby's weight gain, difficulty with latch, engorgement, mastitis symptoms, or if breastfeeding just doesn't feel right. Trust your instincts.",
    },
    {
      id: "bf-6",
      question: "Can I get breastfeeding support before my baby is born?",
      answer:
        "Yes! Prenatal breastfeeding education is covered in our antenatal classes, and you can also book a private consultation to discuss any concerns, prepare for known challenges, or simply feel more confident before baby arrives.",
    },
  ],
  "Postnatal Support": [
    {
      id: "pns-1",
      question: "Do you do home visits or clinic appointments?",
      answer:
        "Both! Many new mums prefer home visits in the early days when getting out feels overwhelming, but our clinic provides a calm, welcoming space when you're ready to venture out. Home visits are priced differently - please contact us for current rates.",
    },
    {
      id: "pns-2",
      question: "What does a postnatal visit include?",
      answer:
        "A postnatal visit includes a full check-up for both you and your baby - weight, feeding assessment, physical recovery, and emotional wellbeing. There's time to discuss any concerns, from breastfeeding to sleep to how you're adjusting. Nothing is too small to ask about.",
    },
    {
      id: "pns-3",
      question: "How soon after birth should I have a postnatal check?",
      answer:
        "We recommend a check within the first week after hospital discharge, ideally within 3-5 days. This is when breastfeeding often hits challenges and when we can catch any early concerns. Additional visits depend on your needs - some mums need more support than others, and that's completely normal.",
    },
    {
      id: "pns-4",
      question: "Can you help with my recovery, not just baby care?",
      answer:
        "Absolutely. Postnatal visits are for both of you. We check your physical recovery, discuss any pain or discomfort, assess your emotional wellbeing, and make sure you're getting the support you need. Your health matters just as much as your baby's.",
    },
    {
      id: "pns-5",
      question: "Do you offer support for postnatal depression or anxiety?",
      answer:
        "We're trained to recognise signs of postnatal depression and anxiety and can provide initial support and guidance. If needed, we'll refer you to appropriate mental health professionals. You don't have to struggle alone - please reach out if you're not feeling yourself.",
    },
    {
      id: "pns-6",
      question: "What if I have questions between appointments?",
      answer:
        "For quick questions, you're welcome to WhatsApp us. We try to respond within a few hours during business hours. For more complex concerns that need hands-on assessment, we'll suggest booking a follow-up appointment.",
    },
  ],
  "Baby Vaccinations": [
    {
      id: "vax-1",
      question: "Do you follow the South African vaccination schedule?",
      answer:
        "Yes, we offer all vaccines on the Department of Health's Expanded Programme on Immunisation (EPI) schedule. We also offer additional private vaccines like MMR, meningitis, chicken pox, and hepatitis A for parents who want extended protection.",
    },
    {
      id: "vax-2",
      question: "How much do vaccinations cost?",
      answer:
        "State-subsidised vaccines (EPI schedule) have a small administration fee. Private vaccines vary in price - please check our services page for current pricing. Some medical aids cover private vaccines, so it's worth checking your benefits.",
    },
    {
      id: "vax-3",
      question: "Can I get vaccines at the same time as a check-up?",
      answer:
        "Yes! We offer combo appointments that combine vaccinations with well-baby check-ups. This is convenient and means fewer trips to the clinic. Just let us know when booking.",
    },
    {
      id: "vax-4",
      question: "My baby is behind on vaccines. Can you help us catch up?",
      answer:
        "Absolutely. We can create a catch-up schedule tailored to your baby's age and vaccination history. Bring their Road to Health book so we can see what's been given, and we'll work out the best plan.",
    },
    {
      id: "vax-5",
      question: "What if my baby is unwell on vaccination day?",
      answer:
        "If your baby has a fever or is significantly unwell, we'll postpone the vaccination. A mild cold without fever is usually fine. If you're unsure, give us a call before your appointment and we'll advise.",
    },
    {
      id: "vax-6",
      question: "Do you offer the pregnancy vaccine (Adacel)?",
      answer:
        "Yes! The Adacel vaccine (whooping cough) is recommended during pregnancy, usually between 27-36 weeks. This protects your baby in the first months of life before they can be vaccinated themselves. We can administer this at a quick appointment.",
    },
    {
      id: "vax-7",
      question: "Are vaccines safe for my baby?",
      answer:
        "Yes, vaccines are thoroughly tested and continuously monitored for safety. The benefits far outweigh the risks. We're happy to discuss any specific concerns you have and provide evidence-based information to help you make informed decisions.",
    },
  ],
  "Baby Massage": [
    {
      id: "bm-1",
      question: "How old should my baby be for baby massage classes?",
      answer:
        "Babies can start from 6 weeks old. The 4-week course is designed for babies up to about 6 months, before they become too mobile. If your baby is older or very active, please chat with us about whether it's the right time.",
    },
    {
      id: "bm-2",
      question: "What are the benefits of baby massage?",
      answer:
        "Baby massage can help strengthen the parent-baby bond, may relieve colic and gas, promote better sleep patterns, stimulate your baby's development, and provide relaxation for both of you. Many parents find it becomes a treasured part of their daily routine.",
    },
    {
      id: "bm-3",
      question: "What do I need to bring to baby massage classes?",
      answer:
        "Just bring your baby and a blanket or towel to lie them on. We provide the massage oil. Dress your baby in easy-to-remove clothing, and try to time the class when they're usually alert and calm (not too hungry or tired).",
    },
    {
      id: "bm-4",
      question: "Can baby massage help with colic?",
      answer:
        "Many parents find specific massage techniques helpful for relieving gas and colic symptoms. We teach these techniques in class, and you can use them at home whenever your baby seems uncomfortable. While results vary, it's a gentle, safe approach worth trying.",
    },
    {
      id: "bm-5",
      question: "What if my baby cries during the massage class?",
      answer:
        "Completely normal! Babies have their own schedules and moods. If your baby gets upset, you can take a break, feed, or comfort them. The class environment is relaxed and understanding - we all know babies don't perform on cue!",
    },
  ],
  "Medical Aid & Discovery": [
    {
      id: "med-1",
      question: "Do you accept medical aid?",
      answer:
        "We're not contracted with medical aids, so we operate as an out-of-network provider. However, many medical aids will reimburse you for our services if you submit the invoice. We provide detailed invoices with the correct billing codes for submission.",
    },
    {
      id: "med-2",
      question: "How do Discovery home visits work?",
      answer:
        "Discovery members may be eligible for up to 3 free postnatal home visits in the first 6 weeks after birth, subject to availability and Discovery's terms. The first visit is always at home; follow-ups may be at the clinic or at home. Please contact us to check eligibility and book.",
    },
    {
      id: "med-3",
      question: "What documentation do I need for medical aid claims?",
      answer:
        "We provide a detailed invoice with ICD-10 diagnosis codes, procedure codes, and practice numbers. You'll need to submit this to your medical aid along with your claim form. Keep copies of everything, and feel free to ask if you need any additional documentation.",
    },
    {
      id: "med-4",
      question: "Are vaccines covered by medical aid?",
      answer:
        "Most medical aids cover the standard EPI schedule vaccines from your baby benefits or savings. Private vaccines may or may not be covered depending on your plan. Check with your medical aid before booking if cover is important to you.",
    },
  ],
  "Booking & Payment": [
    {
      id: "book-1",
      question: "How do I book a class or appointment?",
      answer:
        "You can book online through our booking system, or contact us directly via WhatsApp or phone. For courses, we recommend booking early as groups are small and fill up quickly. A deposit secures your spot.",
    },
    {
      id: "book-2",
      question: "What payment methods do you accept?",
      answer:
        "We accept EFT bank transfers and card payments. For courses, a deposit is required to secure your place, with the balance due before the course starts. Individual consultations are payable on the day.",
    },
    {
      id: "book-3",
      question: "What is your cancellation policy?",
      answer:
        "We understand that life with a baby is unpredictable! For courses, we offer transfers to a later course if you can't attend. For individual appointments, please give us at least 24 hours notice if you need to reschedule. Missed appointments without notice may be charged.",
    },
    {
      id: "book-4",
      question: "Do I need to pay a deposit for courses?",
      answer:
        "Yes, a deposit is required to secure your place in group courses like antenatal classes and baby massage. This is because our classes are small and spaces are limited. The balance is due before the course starts.",
    },
    {
      id: "book-5",
      question: "Can I get a refund if I can't attend?",
      answer:
        "We don't typically offer refunds, but we're flexible about transferring to a later course if your circumstances change. For individual appointments cancelled with adequate notice, there's no charge. Please talk to us about your situation - we'll try to find a solution.",
    },
  ],
  "About the Clinic": [
    {
      id: "clinic-1",
      question: "Where is Tender Touch Clinic located?",
      answer:
        "We're located in Cape Town. For our exact address and directions, please visit our contact page or get in touch via WhatsApp. We're easily accessible with parking available.",
    },
    {
      id: "clinic-2",
      question: "What are your opening hours?",
      answer:
        "We see clients by appointment, typically Monday to Friday during business hours, with some Saturday mornings available. Home visit times can be more flexible. Contact us to find a time that works for you.",
    },
    {
      id: "clinic-3",
      question: "Can I bring my other children to appointments?",
      answer:
        "We understand childcare isn't always possible! Siblings are welcome, though a second adult to help may make your appointment more relaxed. For group classes, we ask that it's just you and baby so everyone can focus.",
    },
    {
      id: "clinic-4",
      question: "Is there parking at the clinic?",
      answer:
        "Yes, there's convenient parking available at the clinic. We'll provide details when you book your appointment.",
    },
    {
      id: "clinic-5",
      question: "Who will I see at my appointment?",
      answer:
        "You'll be seen by either Sr Megan Benn or Sr Brigitte Williams, both Registered Nurses and Midwives with extensive experience. When booking, you can request a specific practitioner or we'll match you with whoever is best suited to your needs.",
    },
    {
      id: "clinic-6",
      question: "What qualifications do the nurses have?",
      answer:
        "Sr Megan Benn is a Registered Nurse and Midwife with over 25 years of experience, trained in breastfeeding counselling. Sr Brigitte Williams is also a Registered Nurse and Midwife, and is SACLC-certified (South African Certified Lactation Consultant). Both have decades of experience supporting new families.",
    },
  ],
  "First-Time Parents": [
    {
      id: "ftp-1",
      question: "I'm a first-time parent and feeling overwhelmed. Is that normal?",
      answer:
        "Completely normal! The transition to parenthood is one of life's biggest adjustments. Feeling overwhelmed, anxious, or unsure doesn't mean you're doing it wrong - it means you're human. We're here to support you through this, one step at a time.",
    },
    {
      id: "ftp-2",
      question: "When should I call for help vs. going to the hospital?",
      answer:
        "Trust your instincts. For baby: high fever, difficulty breathing, not feeding, unusual drowsiness, or anything that seems seriously wrong - go to hospital. For feeding concerns, weight worries, or 'is this normal?' questions, call us. When in doubt, it's always okay to seek medical help.",
    },
    {
      id: "ftp-3",
      question: "What should I have ready before baby arrives?",
      answer:
        "The basics: a safe sleep space, nappies, a few onesies, car seat, and feeding supplies (even if breastfeeding, having a few bottles and formula 'just in case' removes stress). Everything else can wait. We cover preparing for baby in detail during antenatal classes.",
    },
    {
      id: "ftp-4",
      question: "How do I know if my baby is getting enough milk?",
      answer:
        "Good signs include: steady weight gain (after initial loss), 6+ wet nappies a day by day 5, baby seeming satisfied after feeds, and meeting developmental milestones. We do weight checks and feeding assessments at postnatal visits to give you peace of mind.",
    },
    {
      id: "ftp-5",
      question: "My baby won't sleep! Is something wrong?",
      answer:
        "Newborn sleep is notoriously erratic - short cycles, frequent waking, and day/night confusion are all normal. It's exhausting but usually not a medical concern. We can discuss sleep expectations and gentle strategies during consultations. It does get better!",
    },
  ],
};
