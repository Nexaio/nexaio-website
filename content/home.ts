/**
 * Homepage copy (V2.3 reference-fidelity repair). Short on purpose: the
 * ambient field, the explainer film, the workflow and the one-enquiry story
 * carry the message. Copy budget: at most 380 words in <main>.
 *
 * Claims stay inside the approved offer and capability material (see
 * content/README.md) and the truth tags: respond, follow up, coordinate the
 * team, hand off with context, report. Nothing about appointments, phone
 * answering or messaging channels until G3; no revenue, ROI, job or timeline
 * promises; no testimonials, logos, customer counts, headcount or years in
 * market. Keep this file free of imports.
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
 * What Nexaio does, as one vertical flow: many things come in, the AI
 * handles the routine, the chase stops when the customer replies, and a
 * person is brought in only when it is actually needed. Inputs are
 * illustrative of kinds of work, not a list of connected channels. Items
 * the Product capability attestation (G3) has not verified are tagged.
 */
export const flow = {
  eyebrow: "What Nexaio does",
  title: "Less admin.",
  titleDim: "The AI does the routine work, so your people don't have to.",
  inputs: [
    { label: "New enquiries", status: "live" as const },
    { label: "Existing opportunities", status: "live" as const },
    { label: "Estimates waiting on a reply", status: "live" as const },
    { label: "Quiet prospects", status: "design" as const },
  ],
  moreInputs: "and the rest of the routine",
  ai: "Nexaio AI",
  aiSub: "around your CRM",
  steps: [
    { id: "routine", title: "Handles the routine work", line: "Acknowledges, records and routes every one, in your wording." },
    { id: "follow", title: "Follows up and responds", line: "On your timing, so nothing waits on someone remembering." },
    { id: "stop", title: "Stops when the customer replies", line: "No chasing. The thread is handed on with its history." },
    { id: "human", title: "People only when it's needed", line: "A pricing or insurance question reaches one person, with context." },
  ],
  designTag: "In design · not live",
  sampleTag: "Illustrative",
  relief: { before: "Without Nexaio", after: "With Nexaio", beforeLabel: "every step is someone's job", afterLabel: "one judgment call reaches a person" },
};

export const homeServices = {
  eyebrow: "Industries",
  title: "Built for home services.",
  body: "Roofing is first; more trades as we take them on.",
  live: {
    badge: "First trade",
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
