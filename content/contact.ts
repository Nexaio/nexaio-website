/**
 * Contact page copy (V2.2 packet §3). The booking destination itself lives in
 * content/site.ts (`contact.booking`). The page shows the three-step journey
 * and hands off to that existing Google Calendar schedule; it collects
 * nothing itself: no form, no inputs, no storage. The form → Outbound
 * pipeline is V2.2-B. Copy budget: at most 160 words in <main>.
 * Keep this file free of imports.
 */

export const contactHero = {
  eyebrow: "Book a walkthrough",
  title: "Talk to us.",
  lede: "A walkthrough of how work moves through your business, and whether Nexaio's AI agents fit. If they don't, we'll say so.",
};

export const steps = [
  {
    id: "tell-us",
    title: "Tell us about your business",
    body: "On the call, we'll ask about:",
    asks: ["The CRM you use, if any", "Where your enquiries come from", "Who handles follow-up today"],
  },
  {
    id: "pick-a-time",
    title: "Pick a time",
    body: "Our booking page runs on Google Calendar and opens in a new tab.",
    button: "Pick a time",
  },
  {
    id: "confirm",
    title: "We confirm and prepare",
    body: "The booking page confirms your time, and we come prepared for your setup.",
  },
];

export const reach = {
  title: "Other ways to reach us",
};
