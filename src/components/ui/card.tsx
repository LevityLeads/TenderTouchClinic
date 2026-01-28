import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement>;

/**
 * Card container with neutral border and hover shadow.
 */
export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-neutral-200/50 hover:-translate-y-1 hover:border-primary-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

type CardHeaderProps = HTMLAttributes<HTMLDivElement>;

/**
 * Card header section with standard padding.
 */
export function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props}>
      {children}
    </div>
  );
}

type CardTitleProps = HTMLAttributes<HTMLHeadingElement>;

/**
 * Card title element.
 */
export function CardTitle({ className, children, ...props }: CardTitleProps) {
  return (
    <h3
      className={cn("text-xl font-semibold leading-tight text-neutral-900", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

/**
 * Card description text.
 */
export function CardDescription({ className, children, ...props }: CardDescriptionProps) {
  return (
    <p className={cn("text-sm text-neutral-600", className)} {...props}>
      {children}
    </p>
  );
}

type CardContentProps = HTMLAttributes<HTMLDivElement>;

/**
 * Card content area with horizontal padding.
 */
export function CardContent({ className, children, ...props }: CardContentProps) {
  return (
    <div className={cn("px-6 pb-6", className)} {...props}>
      {children}
    </div>
  );
}

type CardFooterProps = HTMLAttributes<HTMLDivElement>;

/**
 * Card footer section with border top.
 */
export function CardFooter({ className, children, ...props }: CardFooterProps) {
  return (
    <div
      className={cn("flex items-center border-t border-neutral-100 px-6 py-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}
