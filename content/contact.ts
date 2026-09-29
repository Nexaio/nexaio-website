/**
 * Contact / booking page copy. The booking destination itself lives in
 * content/site.ts (`contact.booking`). The page only hands off to that
 * existing Google Calendar schedule; it collects nothing itself.
 * Keep this file free of imports.
 */

export const contactHero = {
  eyebrow: "Book a walkthrough",
  title: "See Nexaio on a live walkthrough",
  lede: "Pick a time on our booking page. We’ll show you the product and look at where your leads and estimates slip today. If Nexaio isn’t a fit, we’ll tell you.",
};

export const bookingCard = {
  title: "Choose a time",
  body: "Our booking page runs on Google Calendar and opens in a new tab. Pick any open slot.",
  button: "Open the booking page",
};

export const agenda = {
  title: "What happens on the call",
  items: [
    {
      title: "How things work today",
      body: "Your lead sources, your CRM and who handles first response and estimate follow-up.",
    },
    {
      title: "The product, on sample data",
      body: "A walkthrough focused on the gaps you actually have, not a tour of every feature.",
    },
    {
      title: "An honest fit check",
      body: "If it fits, we outline next steps and pricing. If it doesn’t, we say so.",
    },
  ],
};

export const prepare = {
  title: "Helpful to have in mind",
  items: [
    "Which CRM you use, if any",
    "Where your leads come from",
    "Who handles first response and estimate follow-up",
  ],
};
