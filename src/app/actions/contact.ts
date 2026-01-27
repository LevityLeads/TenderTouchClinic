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
  // Check honeypot first (spam protection)
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

  // Server-side validation with same schema
  const result = contactFormSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      message: "Please correct the errors below.",
      errors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  // Send email notification
  try {
    const { data: formValues } = result;

    await resend.emails.send({
      from: "Tender Touch Clinic <noreply@resend.dev>", // Using Resend's test domain
      to: [process.env.CONTACT_EMAIL || "tendertouch.ct@gmail.com"],
      replyTo: formValues.email,
      subject: `New Contact Form Submission from ${formValues.name}`,
      text: `
New contact form submission:

Name: ${formValues.name}
Email: ${formValues.email}
Phone: ${formValues.phone}
Preferred Contact Time: ${formValues.preferredTime}

Message:
${formValues.message}

---
Submitted via Tender Touch Clinic website contact form
      `.trim(),
    });

    return {
      success: true,
      message: "Thank you for your message! We'll be in touch soon.",
    };
  } catch (error) {
    console.error("Failed to send contact form email:", error);
    return {
      success: false,
      message:
        "Something went wrong. Please try again or call us directly at 083 564 1671.",
    };
  }
}
