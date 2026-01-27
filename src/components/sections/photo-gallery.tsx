import Image from "next/image";
import { cn } from "@/lib/utils";

interface GalleryImage {
  src: string;
  alt: string;
}

interface PhotoGalleryProps {
  /**
   * Array of images to display in the gallery.
   */
  images: GalleryImage[];
  /**
   * Optional additional CSS classes.
   */
  className?: string;
}

/**
 * Responsive photo gallery grid.
 * Server Component - uses Next.js Image for optimization.
 * Grid: 2 cols mobile, 3 cols md, 4 cols lg.
 * Requirement: ABOUT-06
 */
export function PhotoGallery({ images, className }: PhotoGalleryProps) {
  if (images.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4",
        className
      )}
    >
      {images.map((image, index) => (
        <div
          key={`${image.src}-${index}`}
          className="relative aspect-square overflow-hidden rounded-lg shadow-sm transition-shadow hover:shadow-md"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
