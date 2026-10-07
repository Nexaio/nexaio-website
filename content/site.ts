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
   * Category line (V2.2 packet §1): say AI and agents plainly; home services
   * broadly. Roofing is the first industry, not the identity.
   */
  category: "AI agents for home-service businesses",
  /** Supporting phrase used under the category where there is room. */
  categorySupport: "The AI operating layer around your CRM",
  /** Default meta description. Keep it under 160 characters. */
  description:
    "Nexaio's AI agents work around the CRM you already use: they respond to enquiries, follow up, coordinate your team and report what got done.",
  footerLine: "AI agents for home-service businesses. Your CRM keeps the record; our AI does the work.",
  /** Square logo for Organization structured data. Served from app/icon.png (512×512). */
  logoPath: "/icon.png",
  locale: "en_US",
  language: "en-US",
} as const;

/**
 * Brand mark (V2.2 packet §4). "refined" draws the vector N with the Core in
 * its gap (components/BrandMark.tsx); "current" shows the canonical PNG. The
 * canonical PNGs, favicon, app icons and share image never change, so
 * reverting is this one value.
 */
export const brand = {
  markVariant: "refined" as "refined" | "current",
};

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
 * Industries, typed `live | planned` (V2.2 packet §3).
 *
 * `live` means Nexaio actually sells and serves the trade today: it gets a
 * real page at app/industries/<slug>/page.tsx, a navigation item, a footer
 * link and a sitemap URL. `planned` entries never render publicly: no page,
 * no link, no "supported" wording, no sitemap URL (the guard enforces this).
 * Going live later is one status flip plus one page, after the go-live
 * decision. Never add an industry to fill the navigation.
 */
export type IndustryStatus = "live" | "planned";

export type Industry = {
  slug: string;
  href: string;
  label: string;
  status: IndustryStatus;
  summary: string;
};

export const industryCatalog: Industry[] = [
  {
    slug: "roofing",
    href: "/industries/roofing",
    label: "Roofing",
    status: "live",
    summary: "Storm spikes, estimates and handoffs",
  },
];

/** Only live industries. Everything public reads this list, never the catalog. */
export const industries = industryCatalog.filter((i) => i.status === "live");

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
 * Industry URLs come from the live list only.
 */
export const pages = [
  { path: "/", updated: "2026-10-07" },
  { path: "/product", updated: "2026-10-07" },
  { path: "/demo", updated: "2026-10-07" },
  ...industries.map((i) => ({ path: i.href, updated: "2026-10-07" })),
  { path: "/company", updated: "2026-10-07" },
  { path: "/contact", updated: "2026-10-07" },
  { path: "/privacy", updated: "2026-06-29" },
];
