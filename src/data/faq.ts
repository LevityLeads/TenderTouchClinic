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
  ],
  "Postnatal Support": [
    {
      id: "pns-1",
      question: "Do you do home visits or clinic appointments?",
      answer:
        "Both! Home visits are R800 and clinic appointments are R500. Many new mums prefer home visits in the early days when getting out feels overwhelming, but our clinic provides a calm, welcoming space when you're ready to venture out.",
    },
    {
      id: "pns-2",
      question: "What does a postnatal visit include?",
      answer:
        "A postnatal visit includes a full check-up for both you and your baby - weight, feeding assessment, physical recovery, and emotional wellbeing. There's time to discuss any concerns, from breastfeeding to sleep to how you're adjusting. Nothing is too small to ask about.",
    },
    {
      id: "pns-3",
      question: "I'm struggling with breastfeeding. Can you help?",
      answer:
        "Yes! Breastfeeding support is a big part of what we do. Whether you're dealing with latch issues, supply concerns, pain, or just need reassurance, Megan is a trained breastfeeding counsellor who can provide hands-on help and evidence-based guidance.",
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
  ],
};
