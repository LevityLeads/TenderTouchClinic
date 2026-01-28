"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import type { VaccineCategory } from "@/data/services";

interface VaccineDropdownProps {
  category: VaccineCategory;
}

export function VaccineDropdown({ category }: VaccineDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="flex w-full items-center justify-between rounded-lg border border-neutral-200 bg-white px-4 py-3 text-left text-sm font-medium text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        <span>{category.name}</span>
        <ChevronDown
          className={`h-4 w-4 text-neutral-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute z-10 mt-2 w-full rounded-lg border border-neutral-200 bg-white py-1 shadow-lg"
        >
          {category.items.map((item, index) => (
            <li key={index} role="option">
              <a
                href={item.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-sm hover:bg-primary-50 focus:bg-primary-50 focus:outline-none"
              >
                <span className="font-medium text-neutral-900">{item.label}</span>
                {item.vaccines && (
                  <span className="mt-0.5 block text-xs text-neutral-500">
                    {item.vaccines}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
