"use client";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface HeroProps {
  backgroundImage?: string;
}

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
 * Enhanced Hero section with animated gradient overlay, floating shapes,
 * staggered text reveal, and glassmorphism CTAs.
 */
export function Hero({ backgroundImage = "/images/hero.gif" }: HeroProps) {
  const isAnimated = backgroundImage.endsWith(".gif");
  const title = "Nurture and Care for Parents and Babies";

  return (
    <section className="relative min-h-[80vh] overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500" />

      {/* Animated gradient overlay */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: "linear-gradient(45deg, var(--color-primary-800), var(--color-primary-500), var(--color-accent-400), var(--color-primary-600))",
          backgroundSize: "400% 400%",
          animation: "gradient-shift 15s ease infinite",
        }}
      />

      {/* Background image */}
      <Image
        src={backgroundImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover mix-blend-overlay opacity-40"
        unoptimized={isAnimated}
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />

      {/* Floating decorative shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large blob top-left */}
        <motion.div
          className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-white/5 blur-3xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Medium blob right */}
        <motion.div
          className="absolute top-1/4 -right-10 w-72 h-72 rounded-full bg-accent-300/10 blur-2xl"
          animate={{
            y: [0, 30, 0],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Small floating circles */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-4 h-4 rounded-full bg-white/20"
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-2/3 right-1/3 w-6 h-6 rounded-full bg-white/15"
          animate={{
            y: [0, 20, 0],
            opacity: [0.15, 0.4, 0.15],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-3 h-3 rounded-full bg-accent-200/30"
          animate={{
            y: [0, -25, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />

        {/* Bottom blob */}
        <motion.div
          className="absolute -bottom-32 left-1/4 w-[500px] h-[500px] rounded-full bg-primary-400/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 via-transparent to-primary-900/30" />

      <Container className="relative flex min-h-[80vh] flex-col items-center justify-center py-24 text-center">
        {/* Animated title with letter-by-letter reveal */}
        <motion.h1
          className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl max-w-5xl"
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
          className="mt-6 max-w-2xl text-lg text-white/90 sm:text-xl lg:text-2xl"
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
            href="/book"
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

      {/* Simple curved bottom edge */}
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
