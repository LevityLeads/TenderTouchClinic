export interface Testimonial {
  id: string;
  name: string;
  service: string;
  quote: string;
  imageUrl?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Sarah M.",
    service: "Antenatal Classes",
    quote:
      "Megan's antenatal classes gave us the confidence we needed. The small group setting meant we could ask all our questions without feeling rushed. I still keep in touch with the other couples we met!",
    imageUrl: "/images/testimonials/placeholder-1.jpg",
  },
  {
    id: "test-2",
    name: "Jessica & Mark T.",
    service: "Antenatal Classes",
    quote:
      "As first-time parents, we were nervous about everything. Megan's warm, evidence-based approach helped us feel prepared and excited rather than anxious. The course was worth every cent.",
    imageUrl: "/images/testimonials/placeholder-2.jpg",
  },
  {
    id: "test-3",
    name: "Lauren K.",
    service: "Baby Massage",
    quote:
      "The baby massage course was such a special bonding experience. My little one now loves our massage time, and it really helps him settle before bed. I'd recommend it to every new parent.",
    imageUrl: "/images/testimonials/placeholder-3.jpg",
  },
  {
    id: "test-4",
    name: "Amanda B.",
    service: "Postnatal Support",
    quote:
      "When I was struggling with breastfeeding, Megan's home visit was a lifesaver. She was patient, knowledgeable, and so reassuring. I felt supported rather than judged.",
    imageUrl: "/images/testimonials/placeholder-4.jpg",
  },
  {
    id: "test-5",
    name: "Nadia P.",
    service: "Postnatal Support",
    quote:
      "The postnatal check-ups gave me such peace of mind. Megan takes the time to really listen and address all your concerns. It's not just a quick weigh-in - it's genuine care.",
    imageUrl: "/images/testimonials/placeholder-5.jpg",
  },
  {
    id: "test-6",
    name: "Claire & David R.",
    service: "Antenatal Classes",
    quote:
      "We did our research and chose Tender Touch for the small class sizes. It was the best decision. Megan's experience and personal touch made all the difference to our birth preparation.",
    imageUrl: "/images/testimonials/placeholder-6.jpg",
  },
];
