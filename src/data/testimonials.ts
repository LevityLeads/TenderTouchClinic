export interface Testimonial {
  id: string;
  name: string;
  service: string;
  quote: string;
  imageUrl?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "nicole",
    name: "Nicole A.",
    service: "Antenatal Classes & Postnatal Support",
    quote:
      "Megan is an absolute life saver! I truly don't know how we would have gotten through the newborn season without her. Her home visits during those first 6 weeks were a life saver. Every service she offers is the absolute best - antenatal classes, infant massage, vaccinations, and CPR courses. My son is now 15 months old and I am bonded to Megan for life!",
    imageUrl: "/images/testimonials/nicole.jpg",
  },
  {
    id: "madelaine",
    name: "Madelaine S.",
    service: "Antenatal Classes",
    quote:
      "This is by far the best class I have ever taken. Megan was fantastic and really has a lot of insight and understanding. Made the experience of getting ready to become a mom smooth and answered all the questions we had. I feel so much better and more prepared than I did 6 weeks ago. Thank you so much Megan!",
    imageUrl: "/images/testimonials/madelaine.jpg",
  },
  {
    id: "laura",
    name: "Laura H.",
    service: "Antenatal Classes",
    quote:
      "Megan is super knowledgeable and supportive. She knows that not everyone has the same ideas, so caters to every possibility and expertly advises given your unique needs. The 6-week antenatal class has been really fun but also eye-opening. My husband and I had a lot to learn! Plus, you get to connect with others who are in the same boat.",
    imageUrl: "/images/testimonials/laura.jpg",
  },
];
