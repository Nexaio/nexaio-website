/**
 * Homepage copy.
 *
 * Claims here must stay inside the approved capability and commercial
 * material (see content/README.md). In particular: no revenue, ROI, job or
 * timeline promises; no testimonials, logos or statistics; nothing that
 * implies a live customer login, phone answering or round-the-clock coverage.
 * Keep this file free of imports.
 */

export const hero = {
  eyebrow: "The operating layer for roofing companies",
  title: "Every lead and estimate, owned until it’s done.",
  lede: "Nexaio works on top of the CRM, phones and lead sources you already use. It keeps every open lead and estimate tied to an owner and a next step, follows up the way you’ve approved, and flags what needs a person — so opportunities you’ve already paid for don’t go cold.",
  assurances: [
    "Works alongside your current CRM",
    "Customer messages use wording you approve",
    "People handle the judgment calls",
  ],
};

export const slip = {
  eyebrow: "Where opportunities slip",
  title: "Leads rarely disappear all at once. They slip between people and systems.",
  lede: "When the phones are busy and crews are on roofs, the same few gaps show up again and again.",
  points: [
    {
      title: "Slow first response",
      body: "A new inquiry waits in an inbox or a voicemail while everyone is on a roof or with a customer.",
    },
    {
      title: "No clear owner",
      body: "Leads arrive from the website, the phone, referrals and ads, and it isn’t always clear who has each one.",
    },
    {
      title: "Estimates that go quiet",
      body: "The estimate went out. Then nothing: no reply, no follow-up, no outcome recorded.",
    },
    {
      title: "Dropped handoffs",
      body: "Between the office, sales and production, the next step lives in someone’s head instead of a system.",
    },
    {
      title: "Split across tools",
      body: "The CRM, the phone system and the inbox each hold part of the story. None of them shows all of it.",
    },
    {
      title: "No clear picture",
      body: "It’s hard to see what’s waiting, what’s overdue and what actually needs you without asking around.",
    },
  ],
  honesty:
    "If your team and your CRM already handle all of this reliably, you may not need Nexaio. We’ll tell you that on the walkthrough.",
};

export type WorkflowVisual =
  | "capture"
  | "escalation"
  | "estimate"
  | "reactivation"
  | "handoff"
  | "summary";

export const product = {
  eyebrow: "What Nexaio does",
  title: "Built around the moments where opportunities go cold",
  lede: "Nexaio doesn’t replace your tools or your team. It covers the handoffs between them, from the first inquiry to the last follow-up.",
  workflows: [
    {
      id: "capture",
      title: "Capture every inquiry",
      body: "Website forms, leads created in your CRM, emailed inquiries, referrals and manual entries land in one consistent record with source, time and owner. Ad lead forms and phone inquiries connect where your systems allow it.",
      visual: "capture",
    },
    {
      id: "respond",
      title: "Respond fast, and escalate when nobody does",
      body: "New inquiries get a prompt acknowledgement on a channel you’ve approved and go to the right person. If nobody picks one up, Nexaio escalates it instead of letting it sit.",
      visual: "escalation",
    },
    {
      id: "estimates",
      title: "Follow through on every estimate",
      body: "When an estimate has no response, no outcome or no next step, Nexaio follows up on the schedule you set, or puts it back in front of the salesperson who owns it.",
      visual: "estimate",
    },
    {
      id: "reactivate",
      title: "Re-engage quotes that went quiet",
      body: "Older leads and quotes can be re-engaged in controlled batches. Anyone who replies goes straight back to your team, and anyone who opts out stays out.",
      visual: "reactivation",
    },
    {
      id: "handoff",
      title: "Hand off at the right moment",
      body: "Complex questions, unhappy customers, insurance or payment conversations and high-value jobs go to a person, with the history attached.",
      visual: "handoff",
    },
    {
      id: "visibility",
      title: "See what’s happening",
      body: "Reporting shows what came in, what was handled, what’s waiting and what needs you, without digging through three systems.",
      visual: "summary",
    },
  ] as { id: string; title: string; body: string; visual: WorkflowVisual }[],
};

export const fit = {
  eyebrow: "Works with what you have",
  title: "Keep your CRM. Nexaio works on top of it.",
  lede: "Your CRM stays your system of record. Nexaio connects to the tools you already use, covers the gaps between them and never asks you to rip anything out.",
  layers: {
    systems: {
      title: "Your systems",
      items: ["CRM", "Phones and call tracking", "Website forms and ads", "Email and calendar"],
    },
    nexaio: {
      title: "Nexaio",
      items: ["Capture", "Follow-through", "Escalation", "Visibility"],
    },
    team: {
      title: "Your team",
      items: ["Owner", "Office", "Sales"],
    },
  },
  columns: [
    {
      tone: "yes",
      title: "Usually straightforward",
      items: [
        "Website and landing-page forms",
        "Email on Google Workspace or Microsoft 365",
        "Leads created in your CRM",
        "Referrals and manual entries",
        "Importing your existing lead and quote list",
      ],
    },
    {
      tone: "scoped",
      title: "Confirmed during scoping",
      note: "Depends on your plan, add-ons and the access each system allows.",
      items: [
        "Roofing CRMs and other CRMs",
        "Phone systems and call tracking",
        "Facebook and Google lead forms",
        "Text messaging, which needs carrier registration that can take days to weeks and isn’t in our control",
      ],
    },
    {
      tone: "no",
      title: "Not something we do",
      items: [
        "Replace your CRM",
        "Estimating, measurement or material ordering",
        "Crew scheduling or production management",
        "Answer your phone calls",
      ],
    },
  ] as { tone: "yes" | "scoped" | "no"; title: string; note?: string; items: string[] }[],
};

export const control = {
  eyebrow: "You stay in control",
  title: "Automation where it helps. People where it matters.",
  points: [
    {
      title: "Your rules, your wording",
      body: "Customer-facing messages use the wording, timing and channels you approve during setup.",
    },
    {
      title: "People make the judgment calls",
      body: "Sensitive, complex or high-value conversations are handed to your team with the context attached.",
    },
    {
      title: "A record of what happened",
      body: "Follow-ups, handoffs and escalations are recorded with their history, so you can see what happened and why.",
    },
    {
      title: "Only the access it needs",
      body: "We ask for the access each connection requires, nothing more. Your business data and accounts stay yours.",
    },
  ],
};

export const demoTeaser = {
  eyebrow: "Product demo",
  title: "See it before you talk to anyone",
  body: "The demo follows a sample roofing company through a new inquiry, an estimate that goes quiet and a customer who needs a person.",
};

export const onboarding = {
  eyebrow: "What happens next",
  title: "From first call to a running system",
  steps: [
    {
      title: "Walkthrough",
      body: "A call to see the product and look at how leads and estimates move through your business today.",
    },
    {
      title: "Fit and scope",
      body: "We map your systems, lead sources and where things actually slip, then agree exactly what gets set up. If it isn’t a fit, we’ll say so.",
    },
    {
      title: "Setup and testing",
      body: "We connect your systems, configure routing, follow-up rules and approved messages, and test with sample leads before anything reaches a customer.",
    },
    {
      title: "Go live and keep improving",
      body: "Once you sign off, it goes live. We keep running and refining it with you. It’s an ongoing service, not a one-time build.",
    },
  ],
  timing:
    "Timing depends on your systems and how quickly access is granted. You get a realistic plan after scoping, not a guess on the first call.",
};

export const faq = [
  {
    q: "Do I have to replace my CRM?",
    a: "No. Your CRM stays your system of record. Nexaio works on top of it and the other tools you use, and we don’t recommend replacing anything that already works.",
  },
  {
    q: "Which systems does Nexaio work with?",
    a: "Website forms, email and leads created in your CRM are usually straightforward. Roofing CRMs, phone systems, call tracking and ad lead forms depend on your plan, add-ons and the access each system allows, so we confirm them during scoping before committing. If a system can’t be connected at all, we’ll tell you.",
  },
  {
    q: "Is Nexaio an answering service or an AI receptionist?",
    a: "No. Nexaio doesn’t answer your phone calls. It works on the inquiries, estimates and follow-ups that already exist in your systems and makes sure each one has an owner and a next step.",
  },
  {
    q: "Will it text my customers?",
    a: "Text messaging needs carrier registration before it can be used, and that approval can take days to weeks. It isn’t in our control. Until it’s approved, follow-up runs on email.",
  },
  {
    q: "Who decides what gets sent?",
    a: "You do. Customer-facing messages use wording and timing you approve during setup, and anything sensitive goes to a person on your team.",
  },
  {
    q: "How long does setup take?",
    a: "It depends on your systems and how quickly access is granted. We give you a realistic plan after scoping rather than quoting a date on the first call.",
  },
  {
    q: "What does it cost?",
    a: "Pricing depends on scope. We walk through it on the call once we understand your setup. There’s no self-serve plan.",
  },
  {
    q: "Is Nexaio a fit for my company?",
    a: "It’s built for roofing companies with steady inbound leads, office staff and several people handling leads and estimates across more than one system. It’s usually not a fit for one-person operations, companies without much inbound demand, or teams whose CRM already handles follow-through reliably.",
  },
];

export const closing = {
  title: "See it on your own workflow",
  body: "Book a walkthrough. We’ll show you the product and look at where your leads and estimates slip today.",
};
