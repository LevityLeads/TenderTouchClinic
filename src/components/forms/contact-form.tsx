"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useState, useEffect } from "react";
import {
  contactFormSchema,
  type ContactFormData,
  preferredTimeOptions,
} from "@/lib/validations/contact";
import {
  submitContactForm,
  type ContactFormState,
} from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Select } from "@/components/ui/input";
import { motion } from "framer-motion";
import { CheckCircle, Clock } from "lucide-react";

const initialState: ContactFormState = {
  success: false,
  message: "",
};

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialState
  );
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    formState: { errors, touchedFields },
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur", // Validate on blur for progressive disclosure
  });

  // Watch for successful submission
  useEffect(() => {
    if (state.success && state.message) {
      setShowSuccess(true);
    }
  }, [state.success, state.message]);

  // Show success state with animation
  if (showSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-lg border border-green-200 bg-green-50 p-8 text-center"
        role="status"
        aria-live="polite"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100"
        >
          <CheckCircle className="h-8 w-8 text-green-600" />
        </motion.div>
        <h3 className="text-lg font-semibold text-green-800">Message Sent!</h3>
        <p className="mt-2 text-green-700">
          Thank you for reaching out. We&apos;ll get back to you within 2 business hours during clinic hours.
        </p>
      </motion.div>
    );
  }

  // Get field values for success states
  const watchedFields = watch();

  return (
    <form action={formAction} className="space-y-6">
      {/* Response time indicator */}
      <div className="flex items-center gap-2 rounded-lg bg-primary-50 p-3 text-sm text-primary-700">
        <Clock className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
        <span>We typically respond within 2 hours during business hours</span>
      </div>

      {/* Honeypot field - hidden from users, visible to bots */}
      <input
        type="text"
        {...register("honeypot")}
        className="absolute -left-[9999px]"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {/* Name field */}
      <Input
        {...register("name")}
        id="name"
        label="Your name"
        type="text"
        required
        error={errors.name?.message || state.errors?.name?.[0]}
        success={touchedFields.name && !errors.name && !!watchedFields.name}
        floatingLabel
      />

      {/* Email field */}
      <Input
        {...register("email")}
        id="email"
        label="Email address"
        type="email"
        required
        error={errors.email?.message || state.errors?.email?.[0]}
        success={touchedFields.email && !errors.email && !!watchedFields.email}
        floatingLabel
      />

      {/* Phone field */}
      <Input
        {...register("phone")}
        id="phone"
        label="Phone number"
        type="tel"
        required
        error={errors.phone?.message || state.errors?.phone?.[0]}
        success={touchedFields.phone && !errors.phone && !!watchedFields.phone}
        floatingLabel
      />

      {/* Preferred time field */}
      <Select
        {...register("preferredTime")}
        id="preferredTime"
        label="Best time to reach you"
        required
        options={preferredTimeOptions}
        error={errors.preferredTime?.message || state.errors?.preferredTime?.[0]}
        success={touchedFields.preferredTime && !errors.preferredTime && !!watchedFields.preferredTime}
      />

      {/* Message field */}
      <Textarea
        {...register("message")}
        id="message"
        label="How can we help?"
        rows={5}
        required
        error={errors.message?.message || state.errors?.message?.[0]}
        success={touchedFields.message && !errors.message && !!watchedFields.message}
        floatingLabel
      />

      {/* Server error message */}
      {!state.success && state.message && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-600"
          role="alert"
          aria-live="polite"
        >
          {state.message}
        </motion.p>
      )}

      {/* Submit button with loading state */}
      <Button
        type="submit"
        loading={pending}
        className="w-full"
      >
        Send Message
      </Button>

      {/* Privacy notice */}
      <p className="text-xs text-neutral-500 text-center">
        We&apos;ll only use your information to respond to your inquiry.{" "}
        <a href="/privacy" className="text-primary-600 hover:underline">
          Privacy Policy
        </a>
      </p>
    </form>
  );
}
