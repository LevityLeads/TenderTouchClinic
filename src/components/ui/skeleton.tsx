"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

/**
 * Skeleton loading placeholder with shimmer animation.
 * Use to indicate loading state while content is being fetched.
 */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-neutral-200",
        "before:absolute before:inset-0",
        "before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent",
        "before:animate-[shimmer_2s_infinite]",
        className
      )}
      aria-hidden="true"
    />
  );
}

/**
 * Skeleton for text content (single line)
 */
export function SkeletonText({ className }: SkeletonProps) {
  return <Skeleton className={cn("h-4 w-full rounded", className)} />;
}

/**
 * Skeleton for headings
 */
export function SkeletonHeading({ className }: SkeletonProps) {
  return <Skeleton className={cn("h-8 w-3/4 rounded", className)} />;
}

/**
 * Skeleton for circular avatars
 */
export function SkeletonAvatar({ className }: SkeletonProps) {
  return <Skeleton className={cn("h-12 w-12 rounded-full", className)} />;
}

/**
 * Skeleton for buttons
 */
export function SkeletonButton({ className }: SkeletonProps) {
  return <Skeleton className={cn("h-10 w-24 rounded-lg", className)} />;
}

/**
 * Skeleton for images
 */
export function SkeletonImage({ className }: SkeletonProps) {
  return <Skeleton className={cn("aspect-video w-full rounded-lg", className)} />;
}

/**
 * Skeleton card - full card placeholder
 */
export function SkeletonCard({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-neutral-200 bg-white p-6 space-y-4",
        className
      )}
    >
      <Skeleton className="h-6 w-1/2 rounded" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-5/6 rounded" />
        <Skeleton className="h-4 w-4/6 rounded" />
      </div>
      <Skeleton className="h-10 w-32 rounded-lg" />
    </div>
  );
}

/**
 * Skeleton testimonial card
 */
export function SkeletonTestimonial({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-neutral-200 bg-white p-6 sm:p-8",
        className
      )}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-3/4 rounded" />
        </div>
        <div className="flex items-center gap-4 pt-4 border-t border-neutral-100">
          <SkeletonAvatar />
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-3 w-32 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton service card
 */
export function SkeletonServiceCard({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-neutral-200 bg-white p-6",
        className
      )}
    >
      <div className="flex items-center gap-4 mb-4">
        <Skeleton className="h-12 w-12 rounded-lg" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-5 w-1/2 rounded" />
          <Skeleton className="h-4 w-3/4 rounded" />
        </div>
      </div>
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-12 w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}
