"use client";

import { cn } from "@/lib/utils";
import { useRef, useState, useCallback, type HTMLAttributes, type MouseEvent } from "react";

type CardVariant = "default" | "elevated" | "glass";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  tilt?: boolean;
  glow?: boolean;
}

const variantStyles: Record<CardVariant, string> = {
  default: "bg-white border border-neutral-200",
  elevated: "bg-white shadow-lg shadow-neutral-200/50",
  glass: "glass bg-white/80",
};

/**
 * Enhanced Card container with gradient border on hover, optional 3D tilt, and glow effects.
 */
export function Card({
  className,
  children,
  variant = "default",
  tilt = false,
  glow = true,
  ...props
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate glow position as percentage
    setGlowPosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });

    // Calculate tilt if enabled
    if (tilt) {
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    }
  }, [tilt]);

  const handleMouseLeave = useCallback(() => {
    setTransform("");
    setGlowPosition({ x: 50, y: 50 });
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative rounded-xl transition-all duration-300 ease-out",
        variantStyles[variant],
        "hover:shadow-xl hover:-translate-y-1",
        glow && "hover:shadow-primary-500/10",
        className
      )}
      style={{
        transform: transform || undefined,
        transformStyle: tilt ? "preserve-3d" : undefined,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Gradient border overlay */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          padding: "1px",
          background: "linear-gradient(135deg, var(--color-primary-300), var(--color-primary-500), var(--color-accent-300))",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          borderRadius: "inherit",
        }}
      />

      {/* Glow effect that follows mouse */}
      {glow && (
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden"
        >
          <div
            className="absolute w-32 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl"
            style={{
              left: `${glowPosition.x}%`,
              top: `${glowPosition.y}%`,
              background: "radial-gradient(circle, var(--color-primary-200) 0%, transparent 70%)",
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
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
 * Card title element with hover gradient effect.
 */
export function CardTitle({ className, children, ...props }: CardTitleProps) {
  return (
    <h3
      className={cn(
        "text-xl font-semibold leading-tight text-neutral-900 transition-colors duration-300 group-hover:text-primary-700",
        className
      )}
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
