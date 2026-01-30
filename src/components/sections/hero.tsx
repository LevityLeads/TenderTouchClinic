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
 * Soft Mint Gradient Background
 * Creates a calm, soothing gradient with gentle animated elements
 */
function MintGradientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient - soft mint to sage */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 25%, #6ee7b7 50%, #86efac 75%, #bbf7d0 100%)"
        }}
      />

      {/* Subtle animated blob - lighter mint */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "50vw",
          height: "50vw",
          background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 60%)",
          left: "-10%",
          top: "-15%",
          filter: "blur(40px)",
        }}
        animate={{
          x: [0, 50, 25, 0],
          y: [0, 40, 20, 0],
          scale: [1, 1.1, 1.05, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle animated blob - sage tint */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "40vw",
          height: "40vw",
          background: "radial-gradient(circle, rgba(134, 239, 172, 0.3) 0%, transparent 60%)",
          right: "-5%",
          bottom: "10%",
          filter: "blur(35px)",
        }}
        animate={{
          x: [0, -30, -15, 0],
          y: [0, -25, 15, 0],
          scale: [1, 0.95, 1.05, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Light orb */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "20vw",
          height: "20vw",
          background: "radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 60%)",
          left: "30%",
          top: "30%",
          filter: "blur(25px)",
        }}
        animate={{
          y: [0, -20, 0],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

/**
 * Hero section with soft mint gradient background
 */
export function Hero() {
  const title = "Nurturing Care for You and Your Baby";

  return (
    <section className="relative min-h-[70vh] overflow-hidden">
      {/* Gradient Background */}
      <MintGradientBackground />

      <Container className="relative flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        {/* Animated title with letter-by-letter reveal */}
        <motion.h1
          className="font-serif text-4xl font-bold tracking-tight text-neutral-800 sm:text-5xl lg:text-6xl max-w-4xl"
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
          className="mt-6 max-w-2xl text-lg text-neutral-700 sm:text-xl"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={0.8}
        >
          Antenatal classes, postnatal support, and baby care from experienced
          midwives in a warm, welcoming space in Cape Town.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="mt-10 flex flex-col gap-4 sm:flex-row"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={1.1}
        >
          <Button
            href="/book"
            size="lg"
            className="bg-primary-600 text-white hover:bg-primary-700 shadow-lg"
          >
            Book an Appointment
          </Button>
          <Button
            href="/services"
            variant="outline"
            size="lg"
            className="border-neutral-400 text-neutral-700 hover:bg-white/50"
          >
            View Our Services
          </Button>
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
