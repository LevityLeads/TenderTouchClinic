"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CarouselProps {
  children: ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}

/**
 * Carousel component with auto-rotation, navigation dots/arrows, and smooth transitions.
 * Pauses on hover for better UX.
 */
export function Carousel({
  children,
  autoPlay = true,
  interval = 5000,
  showDots = true,
  showArrows = true,
  pauseOnHover = true,
  className,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0);

  const itemCount = children.length;

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % itemCount);
  }, [itemCount]);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + itemCount) % itemCount);
  }, [itemCount]);

  const goToIndex = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  // Auto-play logic
  useEffect(() => {
    if (!autoPlay || isPaused) return;

    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [autoPlay, isPaused, interval, goToNext]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {/* Main carousel content */}
      <div className="overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            {children[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      {showArrows && itemCount > 1 && (
        <>
          <button
            onClick={goToPrev}
            className={cn(
              "absolute left-2 top-1/2 -translate-y-1/2 z-10",
              "h-10 w-10 rounded-full bg-white/90 shadow-md",
              "flex items-center justify-center",
              "text-neutral-600 hover:text-neutral-900 hover:bg-white",
              "transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            )}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goToNext}
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 z-10",
              "h-10 w-10 rounded-full bg-white/90 shadow-md",
              "flex items-center justify-center",
              "text-neutral-600 hover:text-neutral-900 hover:bg-white",
              "transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            )}
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {showDots && itemCount > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {children.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300",
                "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
                index === currentIndex
                  ? "w-8 bg-primary-500"
                  : "w-2.5 bg-neutral-300 hover:bg-neutral-400"
              )}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex ? "true" : "false"}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Grid carousel that shows multiple items at once
 */
interface GridCarouselProps {
  children: ReactNode[];
  itemsPerView?: number;
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

export function GridCarousel({
  children,
  itemsPerView = 3,
  autoPlay = false,
  interval = 5000,
  className,
}: GridCarouselProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const pageCount = Math.ceil(children.length / itemsPerView);

  const goToNext = useCallback(() => {
    setCurrentPage((prev) => (prev + 1) % pageCount);
  }, [pageCount]);

  // Auto-play logic
  useEffect(() => {
    if (!autoPlay || isPaused || pageCount <= 1) return;

    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [autoPlay, isPaused, interval, goToNext, pageCount]);

  const currentItems = children.slice(
    currentPage * itemsPerView,
    (currentPage + 1) * itemsPerView
  );

  return (
    <div
      className={className}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {currentItems}
        </motion.div>
      </AnimatePresence>

      {/* Page dots */}
      {pageCount > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: pageCount }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300",
                "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
                index === currentPage
                  ? "w-8 bg-primary-500"
                  : "w-2.5 bg-neutral-300 hover:bg-neutral-400"
              )}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
