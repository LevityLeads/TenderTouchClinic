"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SERVICES } from "@/lib/constants";
import { Button } from "@/components/ui/button";

/**
 * Animated hamburger menu icon that morphs to X
 */
function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="relative w-6 h-5 flex flex-col justify-between">
      <motion.span
        className="block h-0.5 w-full bg-neutral-700 rounded-full origin-left"
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 0 : 0,
          width: isOpen ? "100%" : "100%",
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      />
      <motion.span
        className="block h-0.5 w-full bg-neutral-700 rounded-full"
        animate={{
          opacity: isOpen ? 0 : 1,
          x: isOpen ? 20 : 0,
        }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      />
      <motion.span
        className="block h-0.5 w-full bg-neutral-700 rounded-full origin-left"
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? 0 : 0,
          width: isOpen ? "100%" : "75%",
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      />
    </div>
  );
}

/**
 * Container animation variants
 */
const menuVariants = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.3,
      when: "afterChildren",
    },
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  closed: { opacity: 0, x: 50 },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 24,
    },
  },
};

const submenuVariants = {
  closed: { height: 0, opacity: 0 },
  open: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.3 },
      opacity: { duration: 0.2, delay: 0.1 },
    },
  },
};

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close menu on escape key and manage body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Reset services expanded when menu closes
  const handleMenuToggle = (newState: boolean) => {
    if (!newState) {
      setServicesExpanded(false);
    }
    setIsOpen(newState);
  };

  return (
    <div className="md:hidden relative z-[60]">
      {/* Hamburger button */}
      <button
        ref={buttonRef}
        onClick={() => handleMenuToggle(!isOpen)}
        onTouchEnd={(e) => {
          e.preventDefault();
          handleMenuToggle(!isOpen);
        }}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="relative p-3 -mr-2 text-neutral-700 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-md touch-manipulation"
      >
        <HamburgerIcon isOpen={isOpen} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Full-screen backdrop with blur */}
            <motion.div
              className="fixed inset-0 bg-primary-900/20 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Menu panel */}
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl z-40 overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              {/* Decorative gradient top */}
              <div className="h-1 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600" />

              <nav className="px-6 py-8 pt-20">
                <motion.ul
                  className="space-y-2"
                  variants={menuVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  {NAV_LINKS.map((link) =>
                    link.name === "Services" ? (
                      <motion.li key={link.name} variants={itemVariants}>
                        <button
                          onClick={() => setServicesExpanded(!servicesExpanded)}
                          aria-expanded={servicesExpanded}
                          className="flex items-center justify-between w-full py-4 text-xl font-medium text-neutral-900 hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-lg px-4 transition-colors duration-200 hover:bg-primary-50"
                        >
                          <span>Services</span>
                          <motion.div
                            animate={{ rotate: servicesExpanded ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRight className="h-5 w-5 text-primary-500" aria-hidden="true" />
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {servicesExpanded && (
                            <motion.ul
                              className="pl-4 space-y-1 mt-2 overflow-hidden"
                              variants={submenuVariants}
                              initial="closed"
                              animate="open"
                              exit="closed"
                            >
                              {SERVICES.map((service, index) => (
                                <motion.li
                                  key={service.href}
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                >
                                  <Link
                                    href={service.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block py-3 px-4 text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 transition-colors duration-200"
                                  >
                                    {service.name}
                                  </Link>
                                </motion.li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </motion.li>
                    ) : (
                      <motion.li key={link.name} variants={itemVariants}>
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="block py-4 px-4 text-xl font-medium text-neutral-900 hover:text-primary-600 hover:bg-primary-50 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 transition-colors duration-200"
                        >
                          {link.name}
                        </Link>
                      </motion.li>
                    )
                  )}

                  {/* CTA Button */}
                  <motion.li variants={itemVariants} className="pt-6">
                    <Button
                      href="/book"
                      size="lg"
                      className="w-full justify-center"
                      onClick={() => setIsOpen(false)}
                    >
                      Book a Class
                    </Button>
                  </motion.li>
                </motion.ul>

                {/* Decorative bottom element */}
                <motion.div
                  className="mt-12 pt-8 border-t border-neutral-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-sm text-neutral-500 text-center">
                    Nurturing care for mothers & babies
                  </p>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
