"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronRight, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SERVICES, CONTACT_INFO, getWhatsAppUrl } from "@/lib/constants";
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
    <div className="md:hidden">
      {/* Hamburger button */}
      <button
        ref={buttonRef}
        onClick={() => handleMenuToggle(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="relative z-50 p-2 -mr-2 text-neutral-700 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-md"
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
              className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl z-40 overflow-y-auto flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              {/* Decorative gradient top */}
              <div className="h-1 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600" />

              {/* Logo header */}
              <div className="px-6 pt-6 pb-2">
                <Image
                  src="/images/logo.png"
                  alt="Tender Touch Clinic"
                  width={140}
                  height={47}
                  className="h-10 w-auto"
                />
              </div>

              <nav className="flex-1 px-6 py-4">
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
                      Book Now
                    </Button>
                  </motion.li>
                </motion.ul>
              </nav>

              {/* Quick contact footer */}
              <motion.div
                className="mt-auto px-6 py-6 border-t border-neutral-100 bg-neutral-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-xs text-neutral-500 mb-3">Quick contact</p>
                <div className="flex gap-3">
                  <a
                    href={CONTACT_INFO.phoneHref}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 shadow-sm ring-1 ring-neutral-200 hover:bg-neutral-50"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    Call
                  </a>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-[#20BD5A]"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
