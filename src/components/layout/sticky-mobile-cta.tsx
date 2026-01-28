"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Calendar, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Enhanced Sticky mobile CTA bar for booking.
 * Features:
 * - Gradient background with glassmorphism
 * - Smart visibility (hides when scrolling up)
 * - Smooth animations
 * - Pulse attention grabber
 */
export function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const lastScrollY = useRef(0);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine scroll direction
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }

      // Show after scrolling past 400px (roughly past hero)
      // Hide when scrolling up (user is reading)
      const shouldShow = currentScrollY > 400 && scrollDirection === "down";
      setIsVisible(shouldShow);

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollDirection]);

  // Reset dismissed state when scrolling back to top
  useEffect(() => {
    const handleScrollTop = () => {
      if (window.scrollY < 100) {
        setIsDismissed(false);
      }
    };

    window.addEventListener("scroll", handleScrollTop, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollTop);
  }, []);

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-30 md:hidden"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Gradient fade at top for smooth blend */}
          <div className="h-6 bg-gradient-to-t from-white via-white/80 to-transparent" />

          {/* Main CTA bar with glassmorphism */}
          <div className="bg-white/95 backdrop-blur-lg border-t border-neutral-200/50 px-4 py-3 shadow-[0_-4px_30px_rgba(0,0,0,0.1)]">
            <div className="flex items-center gap-3">
              {/* CTA Button with gradient */}
              <Link
                href="/book"
                className="group relative flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-semibold text-base text-white overflow-hidden transition-all duration-300 active:scale-[0.98]"
              >
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-500 bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]" />

                {/* Shimmer overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                {/* Content */}
                <span className="relative z-10 flex items-center gap-2">
                  <motion.span
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Calendar className="w-5 h-5" aria-hidden="true" />
                  </motion.span>
                  Book a Class
                </span>
              </Link>

              {/* Dismiss button */}
              <motion.button
                onClick={() => setIsDismissed(true)}
                className="flex items-center justify-center w-10 h-10 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-full transition-colors duration-200"
                aria-label="Dismiss booking bar"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Subtle progress text */}
            <motion.p
              className="text-center text-xs text-neutral-400 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Ready to start your parenting journey?
            </motion.p>
          </div>

          {/* Safe area padding for iOS */}
          <div className="h-[env(safe-area-inset-bottom)] bg-white" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
