import { demoVideo } from "../content/demo";
import { contact } from "../content/site";

/**
 * The two primary calls to action, in priority order.
 *
 * The demo label says "Watch" only when a real, approved video is published
 * (content/demo.ts). Until then the demo page is a set of labelled sample
 * screens, so the button says "See the demo".
 */
export const demoCta = {
  href: "/demo",
  label: demoVideo ? "Watch the demo" : "See the demo",
};

/** Walkthrough bookings go through /contact, which explains the call and links to the booking page. */
export const bookCta = {
  href: "/contact",
  label: "Book a walkthrough",
};

/** The external booking page (existing Google Calendar appointment schedule). */
export const bookingPage = {
  href: contact.booking.url,
  provider: contact.booking.provider,
  pageTitle: contact.booking.pageTitle,
};
