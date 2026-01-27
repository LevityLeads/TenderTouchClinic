import NextImage, { type ImageProps as NextImageProps } from "next/image";
import { cn } from "@/lib/utils";

/**
 * Default responsive sizes for images.
 * - Mobile (<768px): 100% viewport width
 * - Tablet (768px-1200px): 50% viewport width
 * - Desktop (>1200px): 33% viewport width
 */
const DEFAULT_SIZES = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

type OptimizedImageProps = Omit<NextImageProps, "alt"> & {
  /** Alt text is required for accessibility */
  alt: string;
};

/**
 * Optimized image wrapper around Next.js Image component.
 * Provides consistent defaults for responsive images and accessibility.
 *
 * Features:
 * - Default sizes attribute for responsive loading
 * - Automatic lazy loading unless priority is set
 * - WebP/AVIF format optimization via Next.js
 *
 * @example
 * <OptimizedImage
 *   src="/images/hero.jpg"
 *   alt="Mother and baby in clinic"
 *   width={800}
 *   height={600}
 *   priority // For above-the-fold images
 * />
 */
export function OptimizedImage({
  alt,
  sizes = DEFAULT_SIZES,
  className,
  priority = false,
  ...props
}: OptimizedImageProps) {
  return (
    <NextImage
      alt={alt}
      sizes={sizes}
      className={cn(className)}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      {...props}
    />
  );
}
