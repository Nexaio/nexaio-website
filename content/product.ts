/**
 * /product copy (V2.3 repair): what the AI agents actually do around the
 * customer's CRM. Five jobs, each limited to what the approved capability
 * material marks as supported now. No product UI is shown: the product's
 * interface is not final, so the page illustrates the work, not screens.
 * Copy budget: at most 450 words in <main>. Keep this file free of imports.
 */

/** The spark state shown beside each job (same names as content/journey.ts). */
type CoreState = "idle" | "listening" | "working" | "handoff";

export const productHero = {
  eyebrow: "Product",
  title: "AI agents that work",
  titleDim: "around your CRM.",
  lede: "They respond, follow up, coordinate, hand off and report. Your team does the work only people can do.",
};

export const split = {
  eyebrow: "Not another CRM",
  title: "An operating layer, not another CRM.",
  crm: {
    label: "Your CRM",
    sub: "the record",
    items: ["Contacts and jobs", "Your pipeline", "Your data and accounts"],
  },
  ai: {
    label: "Nexaio AI",
    sub: "the work",
    items: ["Does the routine follow-through", "Shows what needs your team", "Reports what got done"],
  },
};

export const jobs = {
  eyebrow: "Five jobs",
  title: "What the AI agents actually do.",
  items: [
    { id: "respond", title: "Respond", body: "Each new enquiry is acknowledged in your wording and given an owner.", core: "listening" as CoreState },
    { id: "follow-up", title: "Follow up", body: "Follow-ups go out at the times you set, and stop when the customer replies.", core: "working" as CoreState },
    { id: "coordinate", title: "Coordinate", body: "Your team sees who owns what and what needs a person today.", core: "working" as CoreState },
    { id: "hand-off", title: "Hand off", body: "Pricing, insurance and anything unclear go to a person, with the history.", core: "handoff" as CoreState },
    { id: "report", title: "Report", body: "A monthly report shows what got done and what was verified.", core: "idle" as CoreState },
  ],
};

export const control = {
  eyebrow: "You stay in control",
  title: "Automation where it helps. People where it matters.",
  points: [
    { title: "Rules you approve", body: "Wording and timing are agreed in setup." },
    { title: "People decide", body: "Judgment calls go to your team." },
    { title: "Every action on record", body: "Verified or marked unconfirmed." },
    { title: "Only the access it needs", body: "Your data stays yours." },
  ],
};

export const fit = {
  eyebrow: "Works with your systems",
  title: "Honest about what connects.",
  columns: [
    { tone: "yes" as const, title: "Usually straightforward", items: ["Website forms", "Google Workspace or Microsoft 365 email", "Leads in your CRM"] },
    {
      tone: "scoped" as const,
      title: "Confirmed during scoping",
      note: "Depends on the access each system allows.",
      items: ["Two-way CRM sync", "Phone systems and call tracking", "Ad lead forms"],
    },
    { tone: "no" as const, title: "Not something we do", items: ["Replace your CRM", "Estimating or crew dispatch", "Phone answering"] },
  ],
};

export const setup = {
  eyebrow: "How it works",
  title: "From first call to working agents.",
  steps: [
    { title: "Walkthrough", body: "See the product and how work moves today." },
    { title: "Scope", body: "We map your systems and rules." },
    { title: "Setup and testing", body: "Tested on sample data first." },
    { title: "Go live", body: "After you sign off. We keep refining it." },
  ],
  timing: "You get a plan after scoping, not a date on the first call.",
};

export const productFaq = [
  {
    q: "Do I have to replace my CRM?",
    a: "No. Your CRM stays your system of record. Nexaio works alongside it and the other tools you use, and we don't recommend replacing anything that already works.",
  },
  {
    q: "Which systems does Nexaio work with?",
    a: "Website forms, email and leads created in your CRM are usually straightforward. CRMs, phone systems, call tracking and ad lead forms depend on your plan, add-ons and the access each system allows, so we confirm them during scoping. If a system can't be connected, we'll tell you.",
  },
  {
    q: "Is Nexaio an answering service?",
    a: "No. Nexaio doesn't answer phone calls. Its agents work on the enquiries, follow-ups and handoffs that already exist in your systems.",
  },
  {
    q: "What does it cost?",
    a: "Pricing depends on scope. We walk through it on the call once we understand your setup. There's no self-serve plan.",
  },
];

export const productClosing = {
  title: "See the agents on your own stack.",
  body: "We'll map where the agents take work off your team.",
};
