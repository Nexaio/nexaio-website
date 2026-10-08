/**
 * Homepage copy (V2.3 motion proof). Short on purpose: the Quantum Nebula,
 * the "AI does the work" flow and the one-enquiry journey carry the story.
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
  lede: "Nexaio's AI agents respond to enquiries, follow up, coordinate your team and report what got done, around the systems you already use.",
  secondaryCta: { href: "#journey", label: "Watch how it works" },
  micro: "Not another CRM.",
};

/**
 * What the AI does itself, in three lanes. The first two are supported now
 * (acknowledge, route, follow up, stop on reply, record). The third is a
 * design direction from the founders and is labelled as such: it stays
 * "in design" until the Product capability attestation (G3) verifies it.
 * Step counts are steps in the labelled sample, never business figures.
 */
export type LaneStatus = "live" | "design";

export const flow = {
  eyebrow: "The work",
  title: "The AI does the routine work.",
  titleDim: "People only get the judgment calls.",
  body: "The agents acknowledge, follow up, notice the reply, stop and record it. People step in only for judgment.",
  inLabel: "In",
  aiLabel: "Nexaio AI handles",
  outLabel: "Lands",
  tallyAi: "Done by the AI",
  tallyPerson: "Needs a person",
  sampleTag: "Sample",
  designTag: "In design · not live",
  lanes: [
    {
      id: "enquiry",
      label: "New enquiry",
      input: "Website form · 07:12",
      steps: ["Acknowledged in your wording", "Owner set", "Follow-up · day 3", "Reply noticed · stopped", "Recorded"],
      person: "Insurance question → Dana",
      status: "live" as LaneStatus,
    },
    {
      id: "estimate",
      label: "Estimate gone quiet",
      input: "Estimate sent · day 7",
      steps: ["Follow-up · your timing", "Reply noticed · stopped", "Recorded"],
      person: "Pricing question → Marcus",
      status: "live" as LaneStatus,
    },
    {
      id: "reengage",
      label: "Re-engagement",
      input: "Prospect quiet for months",
      steps: ["Check-in in your wording", "Reply noticed · stopped", "Recorded"],
      person: "Only if they ask",
      status: "design" as LaneStatus,
    },
  ],
};

export const homeServices = {
  eyebrow: "Industries",
  title: "Built for home services.",
  body: "Roofing is first; more trades as we take them on.",
  live: {
    badge: "Live now",
    label: "Roofing",
    line: "Storm spikes, estimates that go quiet, insurance questions that need a person.",
    link: "Nexaio for roofing",
  },
};

export const closing = {
  title: "Keep your CRM.",
  titleDim: "Add the AI that does the work.",
  body: "Book a walkthrough. We'll find what slips.",
  stepsTitle: "Getting started",
  steps: [
    { title: "Walkthrough", body: "See the product." },
    { title: "Scope and setup", body: "We map your systems and rules, test on sample data." },
    { title: "Live with your team", body: "Live after you sign off." },
  ],
};
