/**
 * Contact / booking page copy. The booking destination itself lives in
 * content/site.ts (`contact.booking`). The page only hands off to that
 * existing Google Calendar schedule; it collects nothing itself.
 * Keep this file free of imports.
 */

export const contactHero = {
  eyebrow: "Book a walkthrough",
  title: "Let's look at how work moves",
  titleDim: "through your business.",
  lede: "Pick a time on our booking page. We'll show you the product and look at where enquiries, follow-up and handoffs slip today. If Nexaio isn't a fit, we'll tell you.",
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
      body: "Your systems, where enquiries come from, and who handles first response and follow-up.",
    },
    {
      title: "The product, on sample data",
      body: "A walkthrough focused on the gaps you actually have, not a tour of every feature.",
    },
    {
      title: "An honest fit check",
      body: "If it fits, we outline next steps and pricing. If it doesn't, we say so.",
    },
  ],
};

export const prepare = {
  title: "Helpful to have in mind",
  items: [
    "Which CRM you use, if any",
    "Where your enquiries come from",
    "Who handles first response and follow-up",
  ],
};

export const lookFirst = {
  title: "Prefer to look first?",
  body: "The demo follows one enquiry from arrival to the monthly report, recreated from the product with sample data.",
};
