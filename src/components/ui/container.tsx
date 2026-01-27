import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type ContainerProps = HTMLAttributes<HTMLDivElement>;

/**
 * Responsive max-width container with mobile-first padding.
 * - Mobile: 16px padding (px-4)
 * - Tablet: 24px padding (sm:px-6)
 * - Desktop: 32px padding (lg:px-8)
 */
export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
