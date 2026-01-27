"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import type { FAQItem } from "@/data/faq";

interface FAQAccordionProps {
  /**
   * Array of FAQ items to display in the accordion.
   */
  items: FAQItem[];
}

/**
 * Interactive FAQ accordion component using Radix UI.
 * Client Component - handles accordion expand/collapse interactions.
 * Supports keyboard navigation: Tab, Enter/Space to toggle, Arrow keys.
 * Requirement: FAQ-06
 */
export function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>
            <p className="leading-relaxed text-neutral-600">{item.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
