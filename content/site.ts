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
  /**
   * Category line. Approved direction (nexaio-website-and-inbound-growth rev5-7):
   * keep the customer's CRM and systems; Nexaio adds and runs the AI layer
   * around them. "Service businesses" is the working category; change it here.
   */
  category: "The AI operating layer for service businesses",
  /** Default meta description. Keep it under 160 characters. */
  description:
    "Nexaio works alongside the CRM and tools you already use, running the follow-up, coordination and handoffs around them.",
  footerLine: "The AI operating layer that works alongside the systems you already run.",
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
     * While this is false the number stays only where it was already published
     * (footer, contact, privacy). It is not promoted in the header, the mobile
     * action bar or structured data, and no copy may promise a call is answered.
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
   * Response-time promise. The previously published "within 24 hours on
   * weekdays" is held until a named responder and backup are verified.
   */
  responseExpectation: null as string | null,
};

/**
 * Industries Nexaio actually sells and serves. Each entry needs a real page at
 * app/industries/<slug>/page.tsx; the guard fails if the two lists differ.
 * Never add an industry to fill the navigation.
 */
export const industries = [
  {
    slug: "roofing",
    href: "/industries/roofing",
    label: "Roofing",
    summary: "Leads, estimates and follow-through for roofing companies",
  },
];

/** Header navigation. "Industries" opens a menu built from `industries`. */
export const nav = [
  { href: "/product", label: "Product" },
  { href: "/industries", label: "Industries" },
  { href: "/demo", label: "Demo" },
  { href: "/company", label: "Company" },
];

/** Footer link groups. The Industries group is built from `industries`. */
export const footerNav = [
  {
    title: "Product",
    links: [
      { href: "/product", label: "Product" },
      { href: "/product#how-it-works", label: "How it works" },
      { href: "/demo", label: "Demo" },
    ],
  },
  {
    title: "Industries",
    links: industries.map((i) => ({ href: i.href, label: i.label })),
  },
  {
    title: "Company",
    links: [
      { href: "/company", label: "Company" },
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
  { path: "/product", updated: "2026-09-29" },
  { path: "/demo", updated: "2026-09-29" },
  { path: "/industries/roofing", updated: "2026-09-29" },
  { path: "/company", updated: "2026-09-29" },
  { path: "/contact", updated: "2026-09-29" },
  { path: "/privacy", updated: "2026-06-29" },
];
