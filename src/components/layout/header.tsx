"use client";

import { useState, useEffect } from "react";
import { MobileNav } from "./mobile-nav";
import { ServicesDropdown } from "./services-dropdown";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Animated navigation link with underline effect
 */
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      role="menuitem"
      className="group relative py-2 text-neutral-700 hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-md px-1 transition-colors duration-200"
    >
      {children}
      {/* Animated underline */}
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-400 to-primary-600 transform origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
    </Link>
  );
}

/**
 * Enhanced Header with:
 * - Scroll progress indicator
 * - Dynamic sizing on scroll
 * - Animated navigation underlines
 */
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  // Transform scroll progress to width percentage
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Handle scroll state for header shrinking
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-lg shadow-sm border-b border-neutral-100/50"
          : "bg-white/80 backdrop-blur border-b border-transparent"
      )}
    >
      {/* Scroll progress indicator */}
      <motion.div
        className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 z-50"
        style={{ width: progressWidth }}
      />

      <nav
        className={cn(
          "container mx-auto flex items-center justify-between px-4 transition-all duration-300",
          isScrolled ? "py-2" : "py-3"
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo with subtle animation */}
        <Link
          href="/"
          aria-label="Tender Touch Clinic - Home"
          className="relative group"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Image
              src="/images/logo.png"
              alt=""
              width={150}
              height={50}
              priority
              className={cn(
                "w-auto transition-all duration-300",
                isScrolled ? "h-8" : "h-10"
              )}
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <ul
          className="hidden md:flex items-center gap-1 lg:gap-2"
          role="menubar"
          aria-label="Main menu"
        >
          {NAV_LINKS.map((link) =>
            link.name === "Services" ? (
              <li key={link.name} role="none">
                <ServicesDropdown />
              </li>
            ) : (
              <li key={link.name} role="none">
                <NavLink href={link.href}>
                  {link.name}
                </NavLink>
              </li>
            )
          )}
        </ul>

        {/* Desktop CTA with enhanced styling */}
        <motion.div
          className="hidden md:block"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button href="/book" size={isScrolled ? "sm" : "md"}>
            Book Now
          </Button>
        </motion.div>

        {/* Mobile Navigation */}
        <MobileNav />
      </nav>
    </header>
  );
}
