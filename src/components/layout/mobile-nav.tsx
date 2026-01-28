"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SERVICES } from "@/lib/constants";

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

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="p-2 -mr-2 text-neutral-700 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-md"
      >
        {isOpen ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <Menu className="h-6 w-6" aria-hidden="true" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-0 top-[60px] bg-white z-40"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <nav className="container mx-auto px-4 py-6">
              <motion.ul
                className="space-y-1"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 1 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
                  },
                }}
              >
                {NAV_LINKS.map((link) =>
                  link.name === "Services" ? (
                    <motion.li
                      key={link.name}
                      variants={{
                        hidden: { opacity: 0, x: 20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                    >
                      <button
                        onClick={() => setServicesExpanded(!servicesExpanded)}
                        aria-expanded={servicesExpanded}
                        className="flex items-center justify-between w-full py-3 text-lg font-medium text-neutral-900 hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-md px-2"
                      >
                        Services
                        <ChevronDown
                          className={`h-5 w-5 transition-transform ${
                            servicesExpanded ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                      <AnimatePresence>
                        {servicesExpanded && (
                          <motion.ul
                            className="pl-4 space-y-1 mt-1 overflow-hidden"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {SERVICES.map((service) => (
                              <li key={service.href}>
                                <Link
                                  href={service.href}
                                  onClick={() => setIsOpen(false)}
                                  className="block py-2 px-2 text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                                >
                                  {service.name}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </motion.li>
                  ) : (
                    <motion.li
                      key={link.name}
                      variants={{
                        hidden: { opacity: 0, x: 20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="block py-3 px-2 text-lg font-medium text-neutral-900 hover:text-primary-600 hover:bg-primary-50 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                      >
                        {link.name}
                      </Link>
                    </motion.li>
                  )
                )}
              </motion.ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
