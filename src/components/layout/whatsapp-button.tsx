import { MessageCircle } from "lucide-react";
import { CONTACT_INFO, WHATSAPP_MESSAGE } from "@/lib/constants";

/**
 * Floating WhatsApp button for quick contact.
 * Opens WhatsApp with pre-filled message.
 * Requirement: NAV-05
 *
 * Note: This is a Server Component - no client-side interactivity needed
 * as it's just a styled external link.
 */
export function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${WHATSAPP_MESSAGE}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="
        fixed bottom-6 right-6 z-40
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
  );
}
