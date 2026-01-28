"use client";

import { forwardRef, useState, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Check, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  success?: boolean;
  floatingLabel?: boolean;
}

/**
 * Enhanced Input component with floating label, focus glow, and validation states.
 * Features:
 * - Floating label animation when focused/filled
 * - Subtle glow effect on focus
 * - Animated validation icons (checkmark/error)
 * - Shake animation on error
 * - Color-coded borders
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, success, floatingLabel = true, type = "text", ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!props.value || !!props.defaultValue);

    const isLabelFloating = floatingLabel && (isFocused || hasValue);

    return (
      <div className="relative">
        {/* Floating Label */}
        <motion.label
          htmlFor={props.id}
          initial={false}
          animate={{
            y: isLabelFloating ? -24 : 0,
            x: isLabelFloating ? -4 : 0,
            scale: isLabelFloating ? 0.85 : 1,
            color: error
              ? "rgb(239, 68, 68)"
              : isFocused
              ? "rgb(88, 143, 108)"
              : "rgb(115, 115, 115)",
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={cn(
            "absolute left-3 top-1/2 -translate-y-1/2 origin-left pointer-events-none",
            "text-sm font-medium transition-colors",
            isLabelFloating && "bg-white px-1"
          )}
        >
          {label}
          {props.required && <span className="text-red-500 ml-0.5">*</span>}
        </motion.label>

        {/* Input Field */}
        <input
          ref={ref}
          type={type}
          className={cn(
            "peer w-full rounded-lg border bg-white px-3 py-3 text-base",
            "transition-all duration-200 ease-out",
            "placeholder:text-transparent",
            // Focus glow
            "focus:outline-none focus:ring-2 focus:ring-offset-0",
            // States
            error
              ? "border-red-400 focus:border-red-500 focus:ring-red-200 animate-shake"
              : success
              ? "border-green-400 focus:border-green-500 focus:ring-green-200"
              : "border-neutral-300 focus:border-primary-500 focus:ring-primary-200",
            // Shadow on focus
            isFocused && !error && !success && "shadow-[0_0_0_3px_rgba(101,163,135,0.1)]",
            className
          )}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            setHasValue(!!e.target.value);
            props.onBlur?.(e);
          }}
          onChange={(e) => {
            setHasValue(!!e.target.value);
            props.onChange?.(e);
          }}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${props.id}-error` : undefined}
          {...props}
        />

        {/* Validation Icon */}
        <AnimatePresence>
          {(error || success) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {error ? (
                <AlertCircle className="h-5 w-5 text-red-500" />
              ) : (
                <Check className="h-5 w-5 text-green-500" />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.p
              id={`${props.id}-error`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-1.5 text-sm text-red-600"
              role="alert"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Input.displayName = "Input";

/**
 * Textarea variant with same styling
 */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  success?: boolean;
  floatingLabel?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, success, floatingLabel = true, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!props.value || !!props.defaultValue);

    const isLabelFloating = floatingLabel && (isFocused || hasValue);

    return (
      <div className="relative">
        {/* Floating Label */}
        <motion.label
          htmlFor={props.id}
          initial={false}
          animate={{
            y: isLabelFloating ? -32 : 12,
            x: isLabelFloating ? -4 : 0,
            scale: isLabelFloating ? 0.85 : 1,
            color: error
              ? "rgb(239, 68, 68)"
              : isFocused
              ? "rgb(88, 143, 108)"
              : "rgb(115, 115, 115)",
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={cn(
            "absolute left-3 top-0 origin-left pointer-events-none",
            "text-sm font-medium transition-colors",
            isLabelFloating && "bg-white px-1"
          )}
        >
          {label}
          {props.required && <span className="text-red-500 ml-0.5">*</span>}
        </motion.label>

        {/* Textarea Field */}
        <textarea
          ref={ref}
          className={cn(
            "peer w-full rounded-lg border bg-white px-3 py-3 text-base min-h-[120px] resize-y",
            "transition-all duration-200 ease-out",
            "placeholder:text-transparent",
            "focus:outline-none focus:ring-2 focus:ring-offset-0",
            error
              ? "border-red-400 focus:border-red-500 focus:ring-red-200 animate-shake"
              : success
              ? "border-green-400 focus:border-green-500 focus:ring-green-200"
              : "border-neutral-300 focus:border-primary-500 focus:ring-primary-200",
            isFocused && !error && !success && "shadow-[0_0_0_3px_rgba(101,163,135,0.1)]",
            className
          )}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            setHasValue(!!e.target.value);
            props.onBlur?.(e);
          }}
          onChange={(e) => {
            setHasValue(!!e.target.value);
            props.onChange?.(e);
          }}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${props.id}-error` : undefined}
          {...props}
        />

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.p
              id={`${props.id}-error`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-1.5 text-sm text-red-600"
              role="alert"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

/**
 * Select variant with same styling
 */
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  success?: boolean;
  options: readonly { readonly value: string; readonly label: string }[] | { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, success, options, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = !!props.value || !!props.defaultValue;

    return (
      <div className="relative">
        {/* Label */}
        <label
          htmlFor={props.id}
          className={cn(
            "block text-sm font-medium mb-1.5 transition-colors",
            error ? "text-red-600" : isFocused ? "text-primary-600" : "text-neutral-700"
          )}
        >
          {label}
          {props.required && <span className="text-red-500 ml-0.5">*</span>}
        </label>

        {/* Select Field */}
        <select
          ref={ref}
          className={cn(
            "w-full rounded-lg border bg-white px-3 py-3 text-base appearance-none",
            "transition-all duration-200 ease-out",
            "focus:outline-none focus:ring-2 focus:ring-offset-0",
            error
              ? "border-red-400 focus:border-red-500 focus:ring-red-200 animate-shake"
              : success
              ? "border-green-400 focus:border-green-500 focus:ring-green-200"
              : "border-neutral-300 focus:border-primary-500 focus:ring-primary-200",
            isFocused && !error && !success && "shadow-[0_0_0_3px_rgba(101,163,135,0.1)]",
            !hasValue && "text-neutral-500",
            className
          )}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${props.id}-error` : undefined}
          {...props}
        >
          <option value="">Select an option...</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Dropdown Arrow */}
        <div className="absolute right-3 top-[38px] pointer-events-none">
          <svg
            className={cn(
              "h-5 w-5 transition-colors",
              error ? "text-red-500" : isFocused ? "text-primary-600" : "text-neutral-400"
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Validation Icon */}
        <AnimatePresence>
          {(error || success) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="absolute right-10 top-[38px]"
            >
              {error ? (
                <AlertCircle className="h-5 w-5 text-red-500" />
              ) : (
                <Check className="h-5 w-5 text-green-500" />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.p
              id={`${props.id}-error`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-1.5 text-sm text-red-600"
              role="alert"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Select.displayName = "Select";
