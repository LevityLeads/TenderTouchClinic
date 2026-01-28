"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { SERVICES } from "@/lib/constants";

export function ServicesDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} className="relative">
      <div className="flex items-center">
        {/* Services link - clicking goes to /services page */}
        <Link
          href="/services"
          className="group relative py-2 text-neutral-700 hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-md px-1 transition-colors duration-200"
        >
          Services
          {/* Animated underline */}
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-400 to-primary-600 transform origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
        </Link>

        {/* Dropdown toggle button */}
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown" && !isOpen) {
              e.preventDefault();
              setIsOpen(true);
            }
          }}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          aria-controls="services-menu"
          aria-label="Show service categories"
          className="p-1 text-neutral-700 hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-md transition-colors duration-200"
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </button>
      </div>

      {isOpen && (
        <ul
          id="services-menu"
          role="menu"
          aria-label="Services submenu"
          className="absolute top-full left-0 mt-2 w-64 rounded-xl bg-white shadow-lg border border-neutral-200 py-2 z-50"
        >
          {/* View All Services option */}
          <li role="none">
            <Link
              href="/services"
              role="menuitem"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2.5 text-primary-600 font-medium hover:bg-primary-50 focus:bg-primary-50 focus-visible:outline-none border-b border-neutral-100"
            >
              View All Services
            </Link>
          </li>
          {SERVICES.map((service) => (
            <li key={service.href} role="none">
              <Link
                href={service.href}
                role="menuitem"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2.5 text-neutral-700 hover:bg-primary-50 hover:text-primary-600 focus:bg-primary-50 focus:text-primary-600 focus-visible:outline-none transition-colors duration-150"
              >
                <span className="block font-medium">{service.name}</span>
                <span className="block text-sm text-neutral-500">{service.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
