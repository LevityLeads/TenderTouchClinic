import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from "lucide-react";
import {
  CONTACT_INFO,
  BUSINESS_HOURS,
  SOCIAL_LINKS,
} from "@/lib/constants";

/**
 * Footer component with contact info, quick links, hours, and social links.
 * Responsive grid: 1 column mobile, 2 columns tablet, 4 columns desktop.
 * Requirement: NAV-04
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-100 py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic space-y-3 text-neutral-300">
              <p className="flex items-start gap-2">
                <MapPin
                  className="w-5 h-5 mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <span>{CONTACT_INFO.address.full}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-5 h-5 shrink-0" aria-hidden="true" />
                <a
                  href={CONTACT_INFO.phoneHref}
                  className="hover:text-primary-300 transition-colors"
                >
                  {CONTACT_INFO.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-5 h-5 shrink-0" aria-hidden="true" />
                <a
                  href={CONTACT_INFO.emailHref}
                  className="hover:text-primary-300 transition-colors"
                >
                  {CONTACT_INFO.email}
                </a>
              </p>
            </address>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-neutral-300">
              <li>
                <Link
                  href="/services"
                  className="hover:text-primary-300 transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary-300 transition-colors"
                >
                  About Megan
                </Link>
              </li>
              <li>
                <Link
                  href="/schedule"
                  className="hover:text-primary-300 transition-colors"
                >
                  Class Schedule
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary-300 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/book"
                  className="hover:text-primary-300 transition-colors"
                >
                  Book Online
                </Link>
              </li>
            </ul>
          </div>

          {/* Business Hours Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" aria-hidden="true" />
              Business Hours
            </h3>
            <dl className="space-y-2 text-neutral-300">
              <div className="flex justify-between gap-4">
                <dt>{BUSINESS_HOURS.weekdays.days}</dt>
                <dd>{BUSINESS_HOURS.weekdays.hours}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>{BUSINESS_HOURS.weekend.days}</dt>
                <dd>{BUSINESS_HOURS.weekend.hours}</dd>
              </div>
            </dl>
          </div>

          {/* Social Links Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href={SOCIAL_LINKS.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={SOCIAL_LINKS.facebook.label}
                className="p-2 rounded-full bg-neutral-800 hover:bg-primary-600 transition-colors"
              >
                <Facebook className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href={SOCIAL_LINKS.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={SOCIAL_LINKS.instagram.label}
                className="p-2 rounded-full bg-neutral-800 hover:bg-primary-600 transition-colors"
              >
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-800 text-center text-neutral-400 text-sm">
          <p>
            &copy; {currentYear} Tender Touch Mother &amp; Baby Clinic. All
            rights reserved.
          </p>
          <p className="mt-2">
            <Link
              href="/privacy"
              className="hover:text-primary-300 transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="mx-2">|</span>
            <Link
              href="/terms"
              className="hover:text-primary-300 transition-colors"
            >
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
