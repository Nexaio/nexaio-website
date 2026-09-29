/**
 * Homepage copy. Short on purpose: the product views carry the story.
 *
 * Claims stay inside the approved offer and capability material (see
 * content/README.md): no revenue, ROI, job or timeline promises; no
 * testimonials, logos, customer counts, headcount or years in market; nothing
 * that implies phone answering or round-the-clock coverage.
 * Keep this file free of imports.
 */

export const hero = {
  eyebrow: "The AI operating layer",
  title: "Your CRM keeps the record.",
  titleDim: "Nexaio keeps the work moving.",
  lede: "Nexaio sets up AI workflows around the tools you already use. They follow up, coordinate the handoffs and show your team what needs them.",
};

export const layer = {
  eyebrow: "Works with what you have",
  title: "Keep your stack. Add the layer that runs on top of it.",
  body: "Your CRM stays your system of record and your pipeline stays yours. Nexaio maps what each stage means and works around it.",
  systems: ["CRM", "Website forms", "Email"],
  team: ["Owner", "Office", "Sales"],
};

export const beats = {
  eyebrow: "The product",
  title: "What Nexaio does, in three moves.",
  items: [
    {
      id: "respond",
      index: "01",
      title: "Respond and route",
      body: "Every enquiry lands in one place, matched to the right record, with an owner and a next step.",
      view: "intake" as const,
    },
    {
      id: "follow-through",
      index: "02",
      title: "Follow through",
      body: "Follow-ups go out on the schedule and wording you approved, and stop when a customer replies.",
      view: "messages" as const,
    },
    {
      id: "hand-off",
      index: "03",
      title: "Hand off and report",
      body: "When a person is needed, the work lands with them, context attached. Each month, a report shows what was done.",
      view: "handoff" as const,
    },
  ],
};

export const shift = {
  eyebrow: "What changes",
  title: "The work between your systems gets an owner.",
  rows: [
    { q: "Who has this enquiry?", a: "Every enquiry has an owner and a next step." },
    { q: "Did anyone follow up?", a: "Follow-ups run on schedule, and stop when the customer replies." },
    { q: "What needs me today?", a: "One view of what is waiting on your team, and why." },
    { q: "Did it actually happen?", a: "Every action shows whether it was verified." },
  ],
};

export const industriesTeaser = {
  eyebrow: "Industries",
  title: "Built around how each industry works.",
  roofing: {
    label: "Roofing",
    line: "Storm spikes, estimates that go quiet, insurance timelines. Nexaio for roofing companies.",
    link: "Explore roofing",
  },
  note: "Roofing is Nexaio's first industry. New industries are added when Nexaio serves them.",
};

export const start = {
  eyebrow: "See it working",
  title: "Look through the product first, or talk to us.",
  demoTitle: "Walk through the product",
  demoBody: "Five short chapters following one enquiry, recreated from the product with sample data.",
  demoLink: "Open the demo",
  stepsTitle: "How getting started works",
  steps: [
    {
      title: "Walkthrough",
      body: "A call to see the product and look at how work moves through your business today.",
    },
    {
      title: "Scope and setup",
      body: "We map your systems and rules, connect what they allow, and test with sample data before anything reaches a customer.",
    },
    {
      title: "Nexaio runs with your team",
      body: "It goes live after you sign off. We keep running and refining it with you.",
    },
  ],
};

export const closing = {
  title: "See Nexaio on your own workflow.",
  body: "Book a walkthrough, or look through the product first.",
};
