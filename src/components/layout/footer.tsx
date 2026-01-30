"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import {
  CONTACT_INFO,
  BUSINESS_HOURS,
  SOCIAL_LINKS,
} from "@/lib/constants";
import { BackToTop } from "@/components/ui/back-to-top";

/**
 * Animated social icon with hover effects
 */
function SocialIcon({
  href,
  label,
  icon: Icon,
  delay = 0,
}: {
  href: string;
  label: string;
  icon: typeof Facebook;
  delay?: number;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group relative p-3 rounded-full bg-neutral-800/80 hover:bg-primary-500 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ scale: 1.1, y: -3 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Glow effect on hover */}
      <span className="absolute inset-0 rounded-full bg-primary-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <Icon className="relative h-5 w-5 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
    </motion.a>
  );
}

/**
 * Animated footer link
 */
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="relative inline-block text-neutral-300 hover:text-primary-300 transition-colors duration-200 group"
    >
      {children}
      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary-400 transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}

/**
 * Footer component with gradient background, animated social icons,
 * contact info, quick links, hours, and back-to-top button.
 * Responsive grid: 1 column mobile, 2 columns tablet, 4 columns desktop.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="relative bg-gradient-to-b from-neutral-800 to-neutral-900 text-neutral-100 py-12 lg:py-16 overflow-hidden">
        {/* Decorative gradient orbs */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-primary-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
              <address className="not-italic space-y-3 text-neutral-300">
                <p className="flex items-start gap-3 group">
                  <MapPin
                    className="w-5 h-5 mt-0.5 shrink-0 text-primary-400 group-hover:scale-110 transition-transform"
                    aria-hidden="true"
                  />
                  <span>{CONTACT_INFO.address.full}</span>
                </p>
                <p className="flex items-center gap-3 group">
                  <Phone className="w-5 h-5 shrink-0 text-primary-400 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  <a
                    href={CONTACT_INFO.phoneHref}
                    className="hover:text-primary-300 transition-colors"
                  >
                    {CONTACT_INFO.phone}
                  </a>
                </p>
                <p className="flex items-center gap-3 group">
                  <Mail className="w-5 h-5 shrink-0 text-primary-400 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  <a
                    href={CONTACT_INFO.emailHref}
                    className="hover:text-primary-300 transition-colors"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </p>
              </address>
            </motion.div>

            {/* Quick Links Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2">
                <li><FooterLink href="/services">Services</FooterLink></li>
                <li><FooterLink href="/about">About</FooterLink></li>
                <li><FooterLink href="/schedule">Class Schedule</FooterLink></li>
                <li><FooterLink href="/contact">Contact</FooterLink></li>
                <li><FooterLink href="/book">Book Online</FooterLink></li>
              </ul>
            </motion.div>

            {/* Business Hours Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                <Clock className="w-5 h-5 text-primary-400" aria-hidden="true" />
                Business Hours
              </h3>
              <dl className="space-y-2 text-neutral-300">
                <div className="flex justify-between gap-4">
                  <dt>{BUSINESS_HOURS.weekdays.days}</dt>
                  <dd className="text-primary-300 font-medium">{BUSINESS_HOURS.weekdays.hours}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>{BUSINESS_HOURS.weekend.days}</dt>
                  <dd className="text-primary-300 font-medium">{BUSINESS_HOURS.weekend.hours}</dd>
                </div>
              </dl>
            </motion.div>

            {/* Social Links Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-4 text-white">Follow Us</h3>
              <div className="flex gap-4">
                <SocialIcon
                  href={SOCIAL_LINKS.facebook.url}
                  label={SOCIAL_LINKS.facebook.label}
                  icon={Facebook}
                  delay={0.4}
                />
                <SocialIcon
                  href={SOCIAL_LINKS.instagram.url}
                  label={SOCIAL_LINKS.instagram.label}
                  icon={Instagram}
                  delay={0.5}
                />
              </div>
              <p className="mt-4 text-sm text-neutral-400">
                Stay updated with tips, events, and clinic news.
              </p>
            </motion.div>
          </div>

          {/* Copyright Bar */}
          <motion.div
            className="mt-12 pt-8 border-t border-neutral-700/50 text-center text-neutral-400 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p>
              &copy; {currentYear} Tender Touch Mother &amp; Baby Clinic. All
              rights reserved.
            </p>
            <p className="mt-2">
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <span className="mx-2 text-neutral-600">|</span>
              <FooterLink href="/terms">Terms of Service</FooterLink>
            </p>
          </motion.div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <BackToTop />
    </>
  );
}
