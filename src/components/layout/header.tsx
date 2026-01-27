import { MobileNav } from "./mobile-nav";
import { ServicesDropdown } from "./services-dropdown";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS } from "@/lib/constants";

/**
 * Main site header with responsive navigation.
 * Server Component that composes Client Components (MobileNav, ServicesDropdown).
 *
 * Requirements: NAV-01 (header), NAV-02 (services dropdown), NAV-03 (mobile nav)
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-neutral-100">
      <nav
        className="container mx-auto flex items-center justify-between px-4 py-3"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/" aria-label="Tender Touch Clinic - Home">
          <Image
            src="/images/logo.svg"
            alt=""
            width={150}
            height={50}
            priority
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul
          className="hidden md:flex items-center gap-6"
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
                <Link
                  href={link.href}
                  role="menuitem"
                  className="py-2 text-neutral-700 hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-md px-1"
                >
                  {link.name}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Desktop CTA */}
        <Button href="/book" className="hidden md:inline-flex">
          Book Now
        </Button>

        {/* Mobile Navigation */}
        <MobileNav />
      </nav>
    </header>
  );
}
