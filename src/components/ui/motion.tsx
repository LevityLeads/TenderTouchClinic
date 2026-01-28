"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";

// Default animation config
const defaultTransition = {
  duration: 0.5,
  ease: [0.25, 0.4, 0.25, 1] as const, // Custom easing for smooth feel
};

// Viewport config for scroll animations
const defaultViewport = {
  once: true,
  margin: "-50px",
};

// ============================================
// FadeIn - Simple fade with optional translateY
// ============================================

interface FadeInProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  y = 20,
  ...props
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={defaultViewport}
      transition={{ ...defaultTransition, duration, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// FadeInStagger - Container that staggers children
// ============================================

interface FadeInStaggerProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  staggerDelay?: number;
  delay?: number;
}

export function FadeInStagger({
  children,
  staggerDelay = 0.1,
  delay = 0,
  ...props
}: FadeInStaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={{
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// FadeInStaggerItem - Child of FadeInStagger
// ============================================

interface FadeInStaggerItemProps
  extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  y?: number;
}

export function FadeInStaggerItem({
  children,
  y = 20,
  ...props
}: FadeInStaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.4, 0.25, 1] as const,
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// ScaleIn - Scale up with fade
// ============================================

interface ScaleInProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  delay?: number;
  duration?: number;
}

export function ScaleIn({
  children,
  delay = 0,
  duration = 0.5,
  ...props
}: ScaleInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={defaultViewport}
      transition={{ ...defaultTransition, duration, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// SlideIn - Slide from direction
// ============================================

type Direction = "left" | "right" | "up" | "down";

interface SlideInProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
}

export function SlideIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  distance = 30,
  ...props
}: SlideInProps) {
  const directionOffset = {
    left: { x: -distance, y: 0 },
    right: { x: distance, y: 0 },
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={defaultViewport}
      transition={{ ...defaultTransition, duration, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// PageTransition - Wrapper for page content
// ============================================

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
