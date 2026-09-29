/**
 * Public identity, contact destinations and navigation for nexaio.co.
 *
 * Everything in this file is published. Change it only with the approvals
 * described in content/README.md. Keep this file free of imports:
 * scripts/check-content.mjs loads it directly with Node.
 */

export const site = {
  name: "Nexaio",
  url: "https://nexaio.co",
  domain: "nexaio.co",
  /** Category line, taken from the approved positioning ("the operating layer that sits on top of a roofing company's existing systems"). */
  category: "The operating layer for roofing companies",
  /** Default meta description. Keep it under 160 characters. */
  description:
    "Nexaio works on top of your CRM, phones and lead sources so every roofing lead and estimate has an owner, a next step and follow-through.",
  /** Square logo for Organization structured data. Served from app/icon.png (512×512). */
  logoPath: "/icon.png",
  locale: "en_US",
  language: "en-US",
} as const;

export const contact = {
  email: "admin@nexaio.co",
  phone: {
    display: "+1 (385) 326-5746",
    e164: "+13853265746",
    /**
     * The number has been published in the footer and on the contact and
     * privacy pages since 2026-06-29. Who answers it, the hours, voicemail and
     * missed-call handling have NOT been verified; the Outbound preflight
     * `website-inbound-response-ownership-preflight-20260929` owns that proof.
     *
     * While this is false the number stays only where it was already published.
     * It is not promoted in the header, the mobile action bar or structured data,
     * and no copy may promise that a call is answered.
     */
    routingVerified: false,
  },
  booking: {
    /** Existing Google Calendar appointment schedule. The destination is unchanged. */
    url: "https://calendar.app.google/kNiFGpgUmyJUtZat5",
    provider: "Google Calendar",
    /**
     * Title the booking page currently shows (checked 2026-09-29). The site calls
     * the call a "walkthrough", so the contact page explains the older name.
     * Set to null once the schedule itself is renamed.
     */
    pageTitle: "Systems Review Call" as string | null,
  },
  /**
   * Response-time promise shown on the contact page. The previously published
   * "Typical response time: within 24 hours on weekdays" is held until a named
   * responder and backup are verified. Set a string here to publish one again.
   */
  responseExpectation: null as string | null,
};

/** Header navigation. "Book a walkthrough" is rendered separately as the header button. */
export const nav = [
  { href: "/#product", label: "Product" },
  { href: "/demo", label: "Demo" },
  { href: "/process", label: "How it works" },
  { href: "/story", label: "Our story" },
];

/** Footer link groups. */
export const footerNav = [
  {
    title: "Product",
    links: [
      { href: "/#product", label: "What Nexaio does" },
      { href: "/demo", label: "Product demo" },
      { href: "/process", label: "How it works" },
      { href: "/#faq", label: "Questions" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/story", label: "Our story" },
      { href: "/contact", label: "Book a walkthrough" },
      { href: "/privacy", label: "Privacy Policy" },
    ],
  },
];

/**
 * Indexable pages, used by app/sitemap.ts. `updated` is the date the page's
 * content last changed materially. Every entry must have an app/<path>/page.tsx.
 */
export const pages = [
  { path: "/", updated: "2026-09-29" },
  { path: "/demo", updated: "2026-09-29" },
  { path: "/process", updated: "2026-09-29" },
  { path: "/contact", updated: "2026-09-29" },
  { path: "/story", updated: "2026-09-29" },
  { path: "/privacy", updated: "2026-06-29" },
];
