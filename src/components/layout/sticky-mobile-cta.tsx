"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar } from "lucide-react";

/**
 * Sticky mobile CTA bar for booking.
 * Only visible on mobile devices when scrolled past the hero.
 * Includes dismiss functionality for the session.
 */
export function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past 400px (roughly past hero)
      const shouldShow = window.scrollY > 400;
      setIsVisible(shouldShow);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isDismissed) return null;

  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-30
        md:hidden
        transform transition-transform duration-300 ease-out
        ${isVisible ? "translate-y-0" : "translate-y-full"}
      `}
    >
      {/* Gradient fade at top */}
      <div className="h-4 bg-gradient-to-t from-white to-transparent" />

      <div className="bg-white border-t border-neutral-200 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-3">
          <Link
            href="/book"
            className="
              flex-1 flex items-center justify-center gap-2
              bg-primary-600 text-white
              py-3 px-4 rounded-xl
              font-semibold text-base
              transition-all duration-200
              active:scale-[0.98] active:bg-primary-700
              hover:bg-primary-700
            "
          >
            <Calendar className="w-5 h-5" aria-hidden="true" />
            Book a Class
          </Link>

          <button
            onClick={() => setIsDismissed(true)}
            className="
              p-2 text-neutral-400 hover:text-neutral-600
              transition-colors
            "
            aria-label="Dismiss booking bar"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
