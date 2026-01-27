import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { contactInfo, businessHours } from "@/data/contact";

/**
 * Contact information display with icons and linked contact methods.
 * Displays address, phone, email, WhatsApp, and business hours.
 */
export function ContactInfo() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address.full)}`;
  const whatsappUrl = `https://wa.me/${contactInfo.whatsapp}`;

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* Contact Methods */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-neutral-900">Contact Details</h3>

        {/* Address */}
        <div className="flex gap-4">
          <MapPin className="h-5 w-5 shrink-0 text-primary-600" aria-hidden="true" />
          <div>
            <p className="font-medium text-neutral-900">Address</p>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:underline"
            >
              {contactInfo.address.street}
              <br />
              {contactInfo.address.suburb}, {contactInfo.address.city}
            </a>
          </div>
        </div>

        {/* Phone */}
        <div className="flex gap-4">
          <Phone className="h-5 w-5 shrink-0 text-primary-600" aria-hidden="true" />
          <div>
            <p className="font-medium text-neutral-900">Phone</p>
            <a
              href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
              className="text-primary-600 hover:underline"
            >
              {contactInfo.phone}
            </a>
          </div>
        </div>

        {/* Email */}
        <div className="flex gap-4">
          <Mail className="h-5 w-5 shrink-0 text-primary-600" aria-hidden="true" />
          <div>
            <p className="font-medium text-neutral-900">Email</p>
            <a
              href={`mailto:${contactInfo.email}`}
              className="text-primary-600 hover:underline"
            >
              {contactInfo.email}
            </a>
          </div>
        </div>

        {/* WhatsApp */}
        <div className="flex gap-4">
          <MessageCircle className="h-5 w-5 shrink-0 text-primary-600" aria-hidden="true" />
          <div>
            <p className="font-medium text-neutral-900">WhatsApp</p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:underline"
            >
              Message us on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Business Hours */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-neutral-900">Business Hours</h3>

        <div className="flex gap-4">
          <Clock className="h-5 w-5 shrink-0 text-primary-600" aria-hidden="true" />
          <div className="w-full">
            <dl className="space-y-2">
              {businessHours.map(({ day, hours }) => (
                <div key={day} className="flex justify-between text-sm">
                  <dt className="font-medium text-neutral-900">{day}</dt>
                  <dd className={hours === "Closed" ? "text-neutral-500" : "text-neutral-700"}>
                    {hours}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
