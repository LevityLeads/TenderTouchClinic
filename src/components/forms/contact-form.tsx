"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState } from "react";
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

const initialState: ContactFormState = {
  success: false,
  message: "",
};

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialState
  );

  const {
    register,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur", // Validate on blur for progressive disclosure
  });

  // Show success state
  if (state.success && state.message) {
    return (
      <div
        className="rounded-lg border border-green-200 bg-green-50 p-8 text-center"
        role="status"
        aria-live="polite"
      >
        <h3 className="text-lg font-semibold text-green-800">Message Sent!</h3>
        <p className="mt-2 text-green-700">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      {/* Honeypot field - hidden from users, visible to bots */}
      <input
        type="text"
        {...register("honeypot")}
        className="absolute -left-[9999px]"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {/* Privacy notice */}
      <p className="text-sm text-gray-600">
        We will only use your information to respond to your inquiry. See our{" "}
        <a href="/privacy" className="text-primary-600 hover:underline">
          Privacy Policy
        </a>
        .
      </p>

      {/* Name field */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name <span className="text-red-500">*</span>
        </label>
        <input
          {...register("name")}
          type="text"
          id="name"
          name="name"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          aria-describedby={errors.name ? "name-error" : undefined}
          aria-invalid={errors.name ? "true" : "false"}
        />
        {(errors.name || state.errors?.name) && (
          <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.name?.message || state.errors?.name?.[0]}
          </p>
        )}
      </div>

      {/* Email field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email <span className="text-red-500">*</span>
        </label>
        <input
          {...register("email")}
          type="email"
          id="email"
          name="email"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          aria-describedby={errors.email ? "email-error" : undefined}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {(errors.email || state.errors?.email) && (
          <p
            id="email-error"
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {errors.email?.message || state.errors?.email?.[0]}
          </p>
        )}
      </div>

      {/* Phone field */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          Phone <span className="text-red-500">*</span>
        </label>
        <input
          {...register("phone")}
          type="tel"
          id="phone"
          name="phone"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          aria-describedby={errors.phone ? "phone-error" : undefined}
          aria-invalid={errors.phone ? "true" : "false"}
        />
        {(errors.phone || state.errors?.phone) && (
          <p
            id="phone-error"
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {errors.phone?.message || state.errors?.phone?.[0]}
          </p>
        )}
      </div>

      {/* Preferred time field */}
      <div>
        <label
          htmlFor="preferredTime"
          className="block text-sm font-medium text-gray-700"
        >
          Preferred Contact Time <span className="text-red-500">*</span>
        </label>
        <select
          {...register("preferredTime")}
          id="preferredTime"
          name="preferredTime"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          aria-describedby={
            errors.preferredTime ? "preferredTime-error" : undefined
          }
          aria-invalid={errors.preferredTime ? "true" : "false"}
        >
          <option value="">Select a time...</option>
          {preferredTimeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {(errors.preferredTime || state.errors?.preferredTime) && (
          <p
            id="preferredTime-error"
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {errors.preferredTime?.message || state.errors?.preferredTime?.[0]}
          </p>
        )}
      </div>

      {/* Message field */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700"
        >
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("message")}
          id="message"
          name="message"
          rows={5}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          aria-describedby={errors.message ? "message-error" : undefined}
          aria-invalid={errors.message ? "true" : "false"}
        />
        {(errors.message || state.errors?.message) && (
          <p
            id="message-error"
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {errors.message?.message || state.errors?.message?.[0]}
          </p>
        )}
      </div>

      {/* Server error message */}
      {!state.success && state.message && (
        <p className="text-sm text-red-600" role="alert" aria-live="polite">
          {state.message}
        </p>
      )}

      {/* Submit button */}
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
