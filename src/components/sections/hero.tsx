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
  const title = "Nurturing Care for Mothers & Babies";

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
          className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          style={{ perspective: "1000px" }}
        >
          {title.split("").map((char, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className="inline-block"
              style={{
                display: char === " " ? "inline" : "inline-block",
                whiteSpace: char === " " ? "pre" : "normal",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
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
            href="/schedule"
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
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
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

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-16 sm:h-20 lg:h-24"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            className="fill-neutral-50"
            opacity=".25"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            className="fill-neutral-50"
            opacity=".5"
          />
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="fill-neutral-50"
          />
        </svg>
      </div>
    </section>
  );
}
