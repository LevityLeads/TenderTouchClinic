import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export type SectionVariant = "default" | "muted" | "primary";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: SectionVariant;
}

const variantStyles: Record<SectionVariant, string> = {
  default: "bg-white",
  muted: "bg-neutral-50",
  primary: "bg-primary-50",
};

/**
 * Section wrapper component with consistent vertical padding and background variants.
 */
export function Section({
  id,
  className,
  variant = "default",
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 lg:py-24",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
