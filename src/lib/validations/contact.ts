import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9+\-\s()]+$/, "Please enter a valid phone number"),
  preferredTime: z.enum(["morning", "afternoon", "evening", "any"], {
    message: "Please select a preferred contact time",
  }),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
  honeypot: z.string().max(0, "Bot detected"), // Must be empty
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Time options for the select dropdown
export const preferredTimeOptions = [
  { value: "morning", label: "Morning (8AM - 12PM)" },
  { value: "afternoon", label: "Afternoon (12PM - 5PM)" },
  { value: "evening", label: "Evening (after 5PM)" },
  { value: "any", label: "Any time" },
] as const;
