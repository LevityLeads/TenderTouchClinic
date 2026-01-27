'use client';

import CookieConsent from 'react-cookie-consent';
import Link from 'next/link';

/**
 * Cookie consent banner for GDPR/POPIA compliance.
 * Appears for new visitors, persists choice in cookie.
 * Requirement: LEGAL-03
 *
 * Note: Uses 'use client' as react-cookie-consent requires interactivity.
 * Position:fixed ensures no layout shift (CLS).
 */
export function CookieConsentBanner() {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      declineButtonText="Decline"
      enableDeclineButton
      cookieName="ttc-cookie-consent"
      expires={365}
      style={{
        background: '#1e293b', // neutral-800
        color: '#f1f5f9', // neutral-100
        padding: '1rem',
        alignItems: 'center',
      }}
      buttonStyle={{
        background: '#0d9488', // primary-500
        color: 'white',
        borderRadius: '0.5rem',
        padding: '0.5rem 1.5rem',
        fontWeight: '500',
      }}
      declineButtonStyle={{
        background: 'transparent',
        border: '1px solid #94a3b8', // neutral-400
        color: '#f1f5f9',
        borderRadius: '0.5rem',
        padding: '0.5rem 1.5rem',
      }}
      ariaAcceptLabel="Accept cookies"
      ariaDeclineLabel="Decline cookies"
    >
      We use cookies to enhance your browsing experience.{' '}
      <Link href="/privacy" className="underline hover:text-primary-300">
        Learn more
      </Link>
    </CookieConsent>
  );
}
