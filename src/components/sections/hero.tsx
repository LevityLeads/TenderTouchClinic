"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Text animation variants
const titleVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.2,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring" as const,
      damping: 12,
      stiffness: 100,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
      delay,
    },
  }),
};

/**
 * Gradient Mesh Background Component
 * Creates an animated, organic flowing gradient effect
 * Using brand palette: #659b8a (oklch 0.65 0.12 160)
 */
function GradientMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient - sage greens */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, oklch(0.50 0.10 160) 0%, oklch(0.58 0.11 160) 50%, oklch(0.65 0.12 160) 100%)"
        }}
      />

      {/* Deep forest blob - top left */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "60vw",
          height: "60vw",
          background: "radial-gradient(circle, oklch(0.35 0.08 160) 0%, transparent 60%)",
          left: "-20%",
          top: "-25%",
          filter: "blur(40px)",
        }}
        animate={{
          x: [0, 100, 50, 0],
          y: [0, 80, 40, 0],
          scale: [1, 1.2, 1.1, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Light mint blob - right side */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "50vw",
          height: "50vw",
          background: "radial-gradient(circle, oklch(0.80 0.10 160) 0%, transparent 55%)",
          right: "-15%",
          top: "10%",
          filter: "blur(35px)",
        }}
        animate={{
          x: [0, -70, -35, 0],
          y: [0, 60, 90, 0],
          scale: [1, 0.85, 1.1, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Bright sage blob - bottom */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "70vw",
          height: "70vw",
          background: "radial-gradient(circle, oklch(0.72 0.12 160) 0%, transparent 50%)",
          left: "15%",
          bottom: "-35%",
          filter: "blur(50px)",
        }}
        animate={{
          x: [0, -50, 50, 0],
          y: [0, -60, -30, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Teal shift blob - center right */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "40vw",
          height: "40vw",
          background: "radial-gradient(circle, oklch(0.55 0.14 170) 0%, transparent 60%)",
          right: "10%",
          bottom: "15%",
          filter: "blur(30px)",
        }}
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -50, 40, 0],
          scale: [1, 0.9, 1.2, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      {/* Warm accent - subtle cream/sage */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "35vw",
          height: "35vw",
          background: "radial-gradient(circle, oklch(0.88 0.06 150) 0%, transparent 60%)",
          left: "35%",
          top: "20%",
          filter: "blur(35px)",
        }}
        animate={{
          x: [0, -80, 40, 0],
          y: [0, 50, -25, 0],
          scale: [1, 1.25, 0.9, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      {/* Soft rose/pink blob - nurturing warmth */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "30vw",
          height: "30vw",
          background: "radial-gradient(circle, oklch(0.85 0.08 350) 0%, transparent 55%)",
          right: "5%",
          top: "35%",
          filter: "blur(40px)",
        }}
        animate={{
          x: [0, -40, 20, 0],
          y: [0, 30, -20, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />

      {/* Soft sky/blue blob - calming accent */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "25vw",
          height: "25vw",
          background: "radial-gradient(circle, oklch(0.82 0.07 230) 0%, transparent 55%)",
          left: "5%",
          bottom: "20%",
          filter: "blur(35px)",
        }}
        animate={{
          x: [0, 50, -25, 0],
          y: [0, -35, 20, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.5,
        }}
      />

      {/* Floating light orbs */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "15vw",
          height: "15vw",
          background: "radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 60%)",
          left: "25%",
          top: "40%",
          filter: "blur(20px)",
        }}
        animate={{
          y: [0, -40, 0],
          x: [0, 25, 0],
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute rounded-full"
        style={{
          width: "10vw",
          height: "10vw",
          background: "radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 60%)",
          right: "35%",
          top: "30%",
          filter: "blur(15px)",
        }}
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className="absolute rounded-full"
        style={{
          width: "8vw",
          height: "8vw",
          background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 60%)",
          left: "60%",
          bottom: "35%",
          filter: "blur(12px)",
        }}
        animate={{
          y: [0, -25, 0],
          x: [0, 15, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

/**
 * Enhanced Hero section with video background,
 * staggered text reveal, and glassmorphism CTAs.
 */
export function Hero() {
  const title = "Nurture and Care for Parents and Babies";

  return (
    <section className="relative min-h-[80vh] overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        {/* Gradient fallback (shows while video loads or if video fails) */}
        <GradientMesh />

        {/* Video element */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/images/hero.mp4" type="video/mp4" />
        </video>

        {/* Color overlay to tint video with brand colors */}
        <div
          className="absolute inset-0 mix-blend-multiply"
          style={{ background: "oklch(0.50 0.12 160 / 0.6)" }}
        />
      </div>

      {/* Subtle vignette for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 via-transparent to-primary-900/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/20 via-transparent to-primary-900/20" />

      <Container className="relative flex min-h-[80vh] flex-col items-center justify-center py-24 text-center">
        {/* Animated title with letter-by-letter reveal */}
        <motion.h1
          className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl max-w-5xl drop-shadow-lg"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          style={{ perspective: "1000px", textWrap: "balance" }}
        >
          {title.split(" ").map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block whitespace-nowrap">
              {word.split("").map((char, charIndex) => (
                <motion.span
                  key={`${wordIndex}-${charIndex}`}
                  variants={letterVariants}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
              {wordIndex < title.split(" ").length - 1 && (
                <span className="inline-block">&nbsp;</span>
              )}
            </span>
          ))}
        </motion.h1>

        {/* Subtitle with fade-up */}
        <motion.p
          className="mt-6 max-w-2xl text-lg text-white/90 sm:text-xl lg:text-2xl drop-shadow-md"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={0.8}
        >
          Antenatal classes, postnatal support, and baby massage in a warm,
          welcoming environment in Cape Town.
        </motion.p>

        {/* CTA buttons with glassmorphism effect */}
        <motion.div
          className="mt-10 flex flex-col gap-4 sm:flex-row"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={1.1}
        >
          <Button
            href="/services"
            size="lg"
            className="bg-white text-primary-700 hover:bg-white/90 hover:text-primary-800 shadow-xl shadow-black/20"
          >
            Book a Class
          </Button>
          <Button
            href="/services"
            variant="outline"
            size="lg"
            className="border-white/50 text-white backdrop-blur-sm bg-white/10 hover:bg-white/20 hover:border-white"
          >
            View Services
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-24 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2 text-white/60"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </Container>

      {/* Curved bottom edge */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-12 sm:h-16"
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,60 Q600,0 1200,60 L1200,60 L0,60 Z"
            className="fill-neutral-50"
          />
        </svg>
      </div>
    </section>
  );
}
