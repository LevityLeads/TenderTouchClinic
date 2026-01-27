"use client";

import { useState, useCallback } from "react";
import Script from "next/script";
import { BOOKEM_CONFIG, CONTACT_INFO, getWhatsAppUrl } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface BookemWidgetProps {
  /**
   * Optional service ID to pre-select a service in the booking widget.
   * Use values from BOOKEM_CONFIG.services mapping.
   */
  serviceId?: string;
  /**
   * Additional CSS classes for the container
   */
  className?: string;
}

type WidgetStatus = "loading" | "ready" | "error";

/**
 * Bookem booking widget wrapper component.
 *
 * Uses next/script with lazyOnload strategy to prevent blocking page render.
 * Includes fallback contact methods for when JavaScript is disabled or widget fails.
 */
export function BookemWidget({ serviceId, className }: BookemWidgetProps) {
  const [status, setStatus] = useState<WidgetStatus>("loading");

  // Construct the widget URL with optional service pre-selection
  const widgetUrl = serviceId
    ? `${BOOKEM_CONFIG.baseUrl}/${BOOKEM_CONFIG.businessSlug}?service=${serviceId}`
    : `${BOOKEM_CONFIG.baseUrl}/${BOOKEM_CONFIG.businessSlug}`;

  // Construct the embed script URL
  const scriptUrl = `${BOOKEM_CONFIG.baseUrl}/widget/${BOOKEM_CONFIG.businessSlug}.js`;

  const handleLoad = useCallback(() => {
    setStatus("ready");
  }, []);

  const handleError = useCallback(() => {
    setStatus("error");
  }, []);

  return (
    <div
      className={cn(
        "w-full overflow-x-hidden",
        className
      )}
    >
      {/* Loading State */}
      {status === "loading" && (
        <div className="flex min-h-[500px] items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50">
          <div className="text-center">
            <div
              className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-neutral-300 border-t-primary-600"
              role="status"
              aria-label="Loading booking widget"
            />
            <p className="mt-4 text-sm text-neutral-600">
              Loading booking system...
            </p>
          </div>
        </div>
      )}

      {/* Widget Container */}
      <div
        id="bookem-widget-container"
        className={cn(
          "min-h-[500px] w-full",
          status !== "ready" && "hidden"
        )}
        data-bookem-url={widgetUrl}
        data-bookem-service={serviceId}
      />

      {/* Error State / Fallback */}
      {status === "error" && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-6">
          <p className="font-medium text-amber-800">
            Unable to load online booking
          </p>
          <p className="mt-2 text-sm text-amber-700">
            Please contact us directly to schedule your appointment:
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={CONTACT_INFO.phoneHref}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm ring-1 ring-neutral-200 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {CONTACT_INFO.phone}
            </a>
            <a
              href={CONTACT_INFO.emailHref}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm ring-1 ring-neutral-200 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Email Us
            </a>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#20BD5A] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* noscript fallback for when JavaScript is disabled */}
      <noscript>
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-6">
          <p className="font-medium text-neutral-900">
            Online booking requires JavaScript
          </p>
          <p className="mt-2 text-sm text-neutral-600">
            Please enable JavaScript to use our online booking system, or contact
            us directly:
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href={CONTACT_INFO.phoneHref}
                className="text-primary-600 underline hover:text-primary-700"
              >
                Call: {CONTACT_INFO.phone}
              </a>
            </li>
            <li>
              <a
                href={CONTACT_INFO.emailHref}
                className="text-primary-600 underline hover:text-primary-700"
              >
                Email: {CONTACT_INFO.email}
              </a>
            </li>
            <li>
              <a
                href={widgetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 underline hover:text-primary-700"
              >
                Book directly on Bookem
              </a>
            </li>
          </ul>
        </div>
      </noscript>

      {/* Widget Script - loads lazily after page render */}
      <Script
        src={scriptUrl}
        strategy="lazyOnload"
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}
