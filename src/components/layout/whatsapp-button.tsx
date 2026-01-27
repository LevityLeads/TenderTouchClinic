import { MessageCircle } from "lucide-react";
import { CONTACT_INFO, WHATSAPP_MESSAGE } from "@/lib/constants";

/**
 * Floating WhatsApp button for quick contact.
 * Opens WhatsApp with pre-filled message.
 * Includes CSS-only tooltip with non-clinical inquiry disclaimer.
 * Requirements: NAV-05, WHATS-03
 *
 * Note: This is a Server Component - no client-side interactivity needed
 * as it's just a styled external link with pure CSS tooltip.
 */
export function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${WHATSAPP_MESSAGE}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 group">
      {/* CSS-only tooltip - visible on hover/focus */}
      <span
        className="
          absolute bottom-full mb-2 right-0
          px-3 py-2 rounded-lg
          bg-neutral-800/95 text-white text-xs
          opacity-0 invisible
          group-hover:opacity-100 group-hover:visible
          group-focus-within:opacity-100 group-focus-within:visible
          transition-opacity duration-200
          whitespace-nowrap
          pointer-events-none
        "
        role="tooltip"
        aria-hidden="true"
      >
        <span className="block">General inquiries only</span>
        <span className="block text-neutral-300">Not for medical advice</span>
        {/* Arrow pointing down */}
        <span
          className="
            absolute top-full right-4
            border-8 border-transparent border-t-neutral-800/95
          "
          aria-hidden="true"
        />
      </span>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp for general inquiries"
        className="
          flex items-center justify-center
          w-14 h-14 rounded-full
          bg-whatsapp text-white
          shadow-lg hover:shadow-xl
          transition-shadow
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500
        "
      >
        <MessageCircle className="w-7 h-7" aria-hidden="true" />
      </a>
    </div>
  );
}
