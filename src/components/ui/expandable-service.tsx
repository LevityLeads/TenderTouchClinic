"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import type { ExpandableServiceItem } from "@/data/services";

interface ExpandableServiceProps {
  service: ExpandableServiceItem;
}

export function ExpandableService({ service }: ExpandableServiceProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-lg border border-neutral-200 bg-white">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-neutral-50"
      >
        <span className="font-medium text-neutral-900">{service.name}</span>
        <span className="flex items-center gap-2">
          <span className="text-sm text-primary-600">Info</span>
          <ChevronDown
            className={`h-4 w-4 text-primary-600 transition-transform ${isExpanded ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </span>
      </button>

      {isExpanded && (
        <div className="border-t border-neutral-200 bg-neutral-50 px-4 py-4">
          <h4 className="font-medium text-neutral-900">{service.content.title}</h4>

          <p className="mt-2 rounded bg-amber-50 px-3 py-2 text-sm font-medium text-amber-800">
            {service.content.notice}
          </p>

          <p className="mt-3 text-sm text-neutral-600">{service.content.description}</p>

          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium text-neutral-700">Pricing:</p>
            {service.content.pricing.map((item, index) => (
              <div key={index} className="rounded bg-white px-3 py-2 text-sm">
                <span className="font-medium text-neutral-900">{item.provider}:</span>{" "}
                <span className="text-neutral-600">{item.details}</span>
              </div>
            ))}
          </div>

          <p className="mt-4 text-sm text-neutral-600">{service.content.contactInfo}</p>

          <Link
            href="/contact"
            className="mt-3 inline-block text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            Get in touch &rarr;
          </Link>
        </div>
      )}
    </div>
  );
}
