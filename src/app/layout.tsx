import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SkipLink } from "@/components/ui/skip-link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { SITE_CONFIG, CONTACT_INFO } from "@/lib/constants";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Comprehensive metadata for SEO (FOUND-05)
 */
export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.shortName}`,
  },
  description:
    "Tender Touch Mother & Baby Clinic - Nurturing care for mothers and babies in Cape Town. Antenatal classes, baby massage, postnatal support, and more.",
  metadataBase: new URL(SITE_CONFIG.url),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: SITE_CONFIG.locale,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.name,
    description:
      "Tender Touch Mother & Baby Clinic - Nurturing care for mothers and babies in Cape Town. Antenatal classes, baby massage, postnatal support, and more.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tender Touch Clinic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name,
    description:
      "Tender Touch Mother & Baby Clinic - Nurturing care for mothers and babies in Cape Town. Antenatal classes, baby massage, postnatal support, and more.",
    images: ["/images/og-image.jpg"],
  },
};

/**
 * LocalBusiness JSON-LD structured data for SEO (FOUND-05)
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE_CONFIG.name,
  description: "Nurturing care for mothers and babies in Cape Town",
  url: SITE_CONFIG.url,
  telephone: CONTACT_INFO.phone,
  email: CONTACT_INFO.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTACT_INFO.address.street,
    addressLocality: CONTACT_INFO.address.suburb,
    addressRegion: "Western Cape",
    postalCode: "7945",
    addressCountry: "ZA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -34.0711,
    longitude: 18.4561,
  },
  openingHours: "Mo-Fr 09:00-17:00",
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SkipLink />
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
