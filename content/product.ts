/**
 * /product copy: the layer, capabilities, control, fit and setup.
 * Capabilities are limited to what the approved capability material marks as
 * supported, and each is shown through a recreated product view.
 * Keep this file free of imports.
 */

export const productHero = {
  eyebrow: "Product",
  title: "An operating layer,",
  titleDim: "not another CRM.",
  lede: "Nexaio connects to the systems you already use and runs the follow-through around them. Everything it does shows up in one live view, and anything that needs judgment goes to a person.",
  visualCaption: "The dashboard: what Nexaio is doing, what needs your team, what is due today and what changed.",
};

export const stays = {
  eyebrow: "The layer",
  title: "What stays yours, and what Nexaio adds.",
  yours: ["Your CRM, as the system of record", "Your pipeline and stage names", "Your customer data and accounts", "Your team, and who does what"],
  adds: ["Capture and routing of every enquiry", "Follow-up on your schedule and wording", "Coordination of handoffs between people", "A live view of what needs attention", "A monthly report you can check"],
};

export type CapabilityView = "intake" | "messages" | "handoff" | "crm";

export const capabilities = {
  eyebrow: "Capabilities",
  title: "Each one visible in the product.",
  items: [
    {
      id: "intake",
      title: "Every enquiry, in one place.",
      body: "Website forms, email and leads created in your CRM arrive as one consistent record, matched to what already exists. When a match is unclear, Nexaio asks instead of guessing.",
      view: "intake" as CapabilityView,
    },
    {
      id: "follow-up",
      title: "Follow-ups that stop when they should.",
      body: "Sequences run on your schedule and approved wording, and stop when a customer replies, opts out or a person takes over.",
      view: "messages" as CapabilityView,
    },
    {
      id: "handoffs",
      title: "Judgment calls go to a person.",
      body: "Pricing, insurance, complaints and anything unclear land with the right person, with the conversation attached.",
      view: "handoff" as CapabilityView,
    },
    {
      id: "crm",
      title: "Your pipeline, your names.",
      body: "Nexaio reads your pipeline stages and records what each one means. Nothing in your CRM is renamed or replaced.",
      view: "crm" as CapabilityView,
    },
  ],
};

export const control = {
  eyebrow: "You stay in control",
  title: "Automation where it helps. People where it matters.",
  points: [
    { title: "Rules you approve", body: "Wording, timing and channels are agreed during setup. Anything outside them waits for a person." },
    { title: "People make the judgment calls", body: "Sensitive, complex or high-value conversations go to your team with the context attached." },
    { title: "Every action on the record", body: "Follow-ups, handoffs and changes are recorded with their history, and marked verified or unconfirmed." },
    { title: "Only the access it needs", body: "We ask for the access each connection requires, nothing more. Your data and accounts stay yours." },
  ],
};

export const fit = {
  eyebrow: "Works with your systems",
  title: "Honest about what connects.",
  columns: [
    {
      tone: "yes" as const,
      title: "Usually straightforward",
      items: ["Website and landing-page forms", "Email on Google Workspace or Microsoft 365", "Leads created in your CRM", "Referrals and manual entries", "Importing an existing lead list"],
    },
    {
      tone: "scoped" as const,
      title: "Confirmed during scoping",
      note: "Depends on your plan, add-ons and the access each system allows.",
      items: ["Your CRM's two-way sync", "Phone systems and call tracking", "Facebook and Google lead forms", "Text messaging, after carrier registration"],
    },
    {
      tone: "no" as const,
      title: "Not something we do",
      items: ["Replace your CRM", "Estimating or scheduling crews", "Answer your phone calls", "Promise results we can't measure"],
    },
  ],
};

export const setup = {
  eyebrow: "How it works",
  title: "From first call to a running layer.",
  steps: [
    { title: "Walkthrough", body: "See the product and look at how work moves through your business today." },
    { title: "Scope", body: "We map your systems, lead sources and rules, check what each system allows, and agree exactly what gets set up." },
    { title: "Setup and testing", body: "We connect your systems, configure routing, follow-up and escalation, and test with sample data before anything reaches a customer." },
    { title: "Go live and keep improving", body: "After you sign off it goes live. We keep running and refining it with you. It's an ongoing service, not a one-time build." },
  ],
  timing: "Timing depends on your systems and how quickly access is granted, so you get a plan after scoping rather than a date on the first call.",
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
    a: "No. Nexaio doesn't answer phone calls. It works on the enquiries, follow-ups and handoffs that already exist in your systems.",
  },
  {
    q: "Will it text my customers?",
    a: "Text messaging needs carrier registration first, and that approval can take days to weeks outside our control. Until then, follow-up runs on email.",
  },
  {
    q: "What does it cost?",
    a: "Pricing depends on scope. We walk through it on the call once we understand your setup. There's no self-serve plan.",
  },
];

export const productClosing = {
  title: "See how Nexaio would fit your stack.",
  body: "Book a walkthrough and we'll look at your systems, your lead sources and where work slips today.",
};
