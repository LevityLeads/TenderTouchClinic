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
        role="menuitem"
        className="flex items-center gap-1 py-2 text-neutral-700 hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-md px-1"
      >
        Services
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <ul
          id="services-menu"
          role="menu"
          aria-label="Services submenu"
          className="absolute top-full left-0 mt-2 w-56 rounded-lg bg-white shadow-lg border border-neutral-200 py-2"
        >
          {SERVICES.map((service) => (
            <li key={service.href} role="none">
              <Link
                href={service.href}
                role="menuitem"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-600 focus:bg-primary-50 focus:text-primary-600 focus-visible:outline-none"
              >
                {service.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
