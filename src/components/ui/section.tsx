import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";
import { WaveDivider, LayeredWaveDivider } from "./wave-divider";

export type SectionVariant = "default" | "muted" | "primary" | "gradient" | "gradient-primary";

type WaveType = "wave1" | "wave2" | "wave3" | "curve" | "layered" | false;

interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: SectionVariant;
  waveTop?: WaveType;
  waveBottom?: WaveType;
  waveFillTop?: string;
  waveFillBottom?: string;
  children: ReactNode;
}

const variantStyles: Record<SectionVariant, string> = {
  default: "bg-white",
  muted: "bg-neutral-50",
  primary: "bg-primary-50",
  gradient: "bg-gradient-to-b from-neutral-50 via-white to-neutral-50",
  "gradient-primary": "bg-gradient-to-b from-primary-50 via-white to-primary-50",
};

/**
 * Enhanced Section wrapper component with:
 * - Consistent vertical padding
 * - Multiple background variants including gradients
 * - Optional SVG wave dividers at top/bottom
 */
export function Section({
  id,
  className,
  variant = "default",
  waveTop = false,
  waveBottom = false,
  waveFillTop,
  waveFillBottom,
  children,
  ...props
}: SectionProps) {
  // Determine fill colors based on adjacent sections
  const topFill = waveFillTop || (variant === "primary" || variant === "gradient-primary" ? "fill-primary-50" : "fill-white");
  const bottomFill = waveFillBottom || (variant === "muted" ? "fill-neutral-50" : "fill-white");

  return (
    <section
      id={id}
      className={cn(
        "relative py-16 lg:py-24",
        variantStyles[variant],
        (waveTop || waveBottom) && "overflow-hidden",
        waveTop && "pt-24 lg:pt-32",
        waveBottom && "pb-24 lg:pb-32",
        className
      )}
      {...props}
    >
      {/* Top wave divider */}
      {waveTop && (
        waveTop === "layered" ? (
          <LayeredWaveDivider position="top" fillColor={topFill} />
        ) : (
          <WaveDivider variant={waveTop} position="top" fillColor={topFill} />
        )
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Bottom wave divider */}
      {waveBottom && (
        waveBottom === "layered" ? (
          <LayeredWaveDivider position="bottom" fillColor={bottomFill} />
        ) : (
          <WaveDivider variant={waveBottom} position="bottom" fillColor={bottomFill} />
        )
      )}
    </section>
  );
}
