/**
 * Homepage copy (V2.2 packet §1 and §3). Short on purpose: the Core, the
 * Systems → AI → Team stage and the one-enquiry journey carry the story.
 * Copy budget: at most 380 words in <main> (guard + HTTP check).
 *
 * Claims stay inside the approved offer and capability material (see
 * content/README.md) and the packet's truth tags: respond, follow up,
 * coordinate the team, hand off with context, report. Nothing about
 * appointments, phone answering or messaging channels until G3; no revenue,
 * ROI, job or timeline promises; no testimonials, logos, customer counts,
 * headcount or years in market. Keep this file free of imports.
 */

export const hero = {
  eyebrow: "AI agents · for home-service businesses",
  title: "Your CRM keeps the record.",
  titleStrong: "Our AI does the work.",
  lede: "Nexaio's AI agents respond to new enquiries, follow up, coordinate your team and report what got done, around the systems you already use.",
  secondaryCta: { href: "#journey", label: "Watch how it works" },
  micro: "Not another CRM.",
};

export const stage = {
  eyebrow: "Systems → AI → Team",
  title: "Your systems hold the record.",
  titleDim: "Our AI agents do the work between them.",
  body: "Nothing gets replaced. The agents pick up what your systems already know, do the routine work, and hand anything that needs judgment to a person.",
  systemsLabel: "Your systems",
  coreLabel: "Nexaio AI",
  teamLabel: "Your team",
  systems: ["CRM", "Inbox", "Website form", "Calendar", "Phone log"],
  team: ["Owner", "Office", "Sales"],
  jobs: ["Respond", "Follow up", "Coordinate", "Hand off", "Report"],
};

export const homeServices = {
  eyebrow: "Built for home services",
  title: "Built for home services.",
  body: "Roofing is first; more trades as we take them on.",
  live: {
    badge: "Live now",
    label: "Roofing",
    line: "Storm spikes, estimates that go quiet, insurance questions that need a person.",
    link: "See Nexaio for roofing",
  },
};

export const closing = {
  title: "Keep your CRM.",
  titleDim: "Add the AI that does the work.",
  body: "Book a walkthrough and we'll look at your systems and where work slips today.",
  stepsTitle: "How getting started works",
  steps: [
    { title: "Walkthrough", body: "See the product and how work moves today." },
    { title: "Scope and setup", body: "We map your systems and rules, then test on sample data." },
    { title: "Live with your team", body: "It goes live after you sign off. We keep refining it with you." },
  ],
};
