/**
 * /company copy (V2.2 packet §3): a serious, confident AI company, not an
 * essay. Copy budget: at most 140 words in <main>.
 *
 * No company size, headcount, customer count, funding, office locations, years
 * in market, founder names, ages or biographies. Every fact in `facts` must be
 * checkable. Keep this file free of imports.
 */

export const companyHero = {
  eyebrow: "Company",
  title: "We build AI that does the work,",
  titleDim: "not more software to manage.",
};

export const principles = {
  eyebrow: "How we build",
  items: [
    { title: "Keep what works.", body: "We build around the systems you already run." },
    { title: "Show the work.", body: "Every action is recorded, verified or marked unconfirmed." },
    { title: "People make judgments.", body: "Pricing, complaints and anything unclear go to a person." },
    { title: "Say what's true.", body: "We state our limits plainly." },
  ],
};

export const mission = {
  eyebrow: "Mission",
  statement: "Make the work between a business's systems reliable: owned, visible and checked.",
};

export const facts = [
  { term: "Company", detail: "Nexaio" },
  { term: "What we build", detail: "AI agents for home-service businesses" },
  { term: "First industry", detail: "Roofing" },
  { term: "Contact", detail: "admin@nexaio.co" },
];

export const companyClosing = {
  title: "Talk to us about your operation.",
  body: "Book a walkthrough and we'll look at how work moves today.",
};
