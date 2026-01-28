"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes, type MouseEvent, useState, useCallback } from "react";
import { Loader2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 hover:shadow-lg hover:shadow-primary-500/25 focus-visible:ring-primary-500 shimmer",
  secondary:
    "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 hover:shadow-md focus-visible:ring-neutral-500",
  outline:
    "border-2 border-primary-500 text-primary-600 hover:bg-primary-50 hover:shadow-md hover:shadow-primary-500/10 focus-visible:ring-primary-500 hover:border-primary-600",
  ghost:
    "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:ring-neutral-500",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-5 py-2.5 text-base gap-2",
  lg: "px-7 py-3.5 text-lg gap-2.5",
};

const baseStyles =
  "relative inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] overflow-hidden";

type ButtonBaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  ripple?: boolean;
  loading?: boolean;
  success?: boolean;
};

type ButtonAsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

interface RippleEffect {
  x: number;
  y: number;
  id: number;
}

/**
 * Enhanced Button component with shimmer effect, loading/success states, and optional ripple animation.
 * Renders as Link when href is provided, button otherwise.
 *
 * Features:
 * - Loading state with spinner
 * - Success state with checkmark animation
 * - Ripple effect on click
 * - Shimmer effect on hover (primary variant)
 */
export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(
  { className, variant = "primary", size = "md", ripple = true, loading = false, success = false, children, ...props },
  ref
) {
  const [ripples, setRipples] = useState<RippleEffect[]>([]);

  const createRipple = useCallback((event: MouseEvent<HTMLElement>) => {
    if (!ripple || loading) return;

    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const id = Date.now();

    setRipples(prev => [...prev, { x, y, id }]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 600);
  }, [ripple, loading]);

  const classes = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    loading && "cursor-wait",
    success && "bg-green-500 hover:bg-green-600 from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
    className
  );

  const rippleElements = ripples.map(({ x, y, id }) => (
    <span
      key={id}
      className="absolute rounded-full bg-white/30 pointer-events-none animate-[ripple_0.6s_linear]"
      style={{
        left: x,
        top: y,
        width: 10,
        height: 10,
        marginLeft: -5,
        marginTop: -5,
      }}
    />
  ));

  // Content with loading/success states
  const buttonContent = (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.span
          key="loading"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.15 }}
          className="relative z-10 flex items-center justify-center gap-2"
        >
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Loading...</span>
        </motion.span>
      ) : success ? (
        <motion.span
          key="success"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.15 }}
          className="relative z-10 flex items-center justify-center gap-2"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            <Check className="h-4 w-4" />
          </motion.div>
          <span>Success!</span>
        </motion.span>
      ) : (
        <motion.span
          key="default"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="relative z-10 flex items-center justify-center gap-inherit"
        >
          {children}
        </motion.span>
      )}
    </AnimatePresence>
  );

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props;
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        onClick={createRipple as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        {...linkProps}
      >
        {buttonContent}
        {rippleElements}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      disabled={loading || buttonProps.disabled}
      onClick={(e) => {
        createRipple(e);
        if (buttonProps.onClick && !loading) {
          buttonProps.onClick(e);
        }
      }}
      {...(buttonProps as Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "disabled">)}
    >
      {buttonContent}
      {rippleElements}
    </button>
  );
});
