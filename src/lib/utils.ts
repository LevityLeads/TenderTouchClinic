import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names with Tailwind CSS class conflict resolution.
 * Combines clsx for conditional classes with tailwind-merge for deduplication.
 *
 * @example
 * cn("px-4 py-2", isActive && "bg-primary-500", className)
 * cn("text-sm", { "font-bold": isBold })
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
