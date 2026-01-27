interface MapEmbedProps {
  address: string;
  title?: string;
}

/**
 * Responsive Google Maps embed component.
 * Uses the basic Google Maps embed URL format (no API key required).
 */
export function MapEmbed({ address, title = "Clinic Location" }: MapEmbedProps) {
  const encodedAddress = encodeURIComponent(address);
  const mapUrl = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;

  return (
    <div className="aspect-[16/9] min-h-[300px] w-full overflow-hidden rounded-lg border border-neutral-200 shadow-sm">
      <iframe
        src={mapUrl}
        title={title}
        width="100%"
        height="100%"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="border-0"
      />
    </div>
  );
}
