/**
 * /industries/roofing copy (V2.2 packet §3). Roofing is Nexaio's first live
 * industry: proof in the first trade, while the company reads broader.
 * Copy budget: at most 420 words in <main>.
 *
 * Roofing-specific, but held to the same limits as every page: no customers,
 * results, logos or named CRM integrations; no response-time, appointment or
 * phone-answering promises; nothing about insurance beyond routing the
 * conversation to a person. Keep this file free of imports.
 */

type CoreState = "idle" | "listening" | "working" | "handoff";

export const roofingHero = {
  eyebrow: "Nexaio for roofing",
  badge: "First trade",
  title: "Roofing, first.",
  lede: "Storms bring enquiries in waves, and estimates go quiet for weeks. Nexaio's AI agents keep every one moving, around the CRM you already run.",
};

/** Sample events shown on the hero surface (labelled as a sample). */
export const roofingHeroEvents = [
  { title: "Hail enquiry · owner assigned", meta: "Website form · 07:12" },
  { title: "Estimate follow-up sent", meta: "Full replacement · day 7" },
];

export const vignettes = {
  eyebrow: "Where roofing work slips",
  title: "Three moments, handled.",
  items: [
    {
      id: "storm",
      label: "Storm spike",
      title: "Every enquiry gets an owner.",
      body: "After a storm, enquiries arrive faster than the office can reply. The agents acknowledge each one in your wording and route it by your rules.",
      chips: ["Acknowledged", "Owner: Dana", "Routed by your rules"],
      core: "working" as CoreState,
    },
    {
      id: "estimates",
      label: "Estimate goes quiet",
      title: "No estimate sits without a next step.",
      body: "Homeowners take time. The agents follow up at the times you set, stop when they reply, and put a stalled estimate back with its owner.",
      chips: ["Follow-up sent · day 7", "Reply → follow-up stopped"],
      core: "working" as CoreState,
    },
    {
      id: "insurance",
      label: "Insurance needs a person",
      title: "Judgment calls go to your team.",
      body: "Insurance, pricing and scope need a person. The agents hand the question over with the whole conversation attached.",
      chips: ["Handed to Dana", "History attached"],
      core: "handoff" as CoreState,
    },
  ],
};

export const roofingCrm = {
  eyebrow: "Your CRM stays",
  title: "Works alongside the CRM you already run.",
  body: "Your pipeline stays where it is. Nexaio reads your stage names and what each one means, so follow-up and reporting match how your team works.",
  note: "Which CRMs connect, and how, depends on your plan and the access it allows. We confirm it during scoping.",
  slab: "Your CRM · the record",
};

export const roofingFaq = [
  {
    q: "Do we need to switch CRMs?",
    a: "No. Nexaio works alongside the CRM you already use. Which connections are possible depends on your CRM, your plan and the access it allows, and we confirm that during scoping.",
  },
  {
    q: "Does Nexaio answer our phones?",
    a: "No. Nexaio doesn't answer calls. Its agents work on the enquiries and follow-ups that reach your systems, such as website forms, email and leads in your CRM.",
  },
  {
    q: "What happens when a storm brings a spike in enquiries?",
    a: "Enquiries that reach your connected systems are captured once, acknowledged where you've approved it, and routed by your rules, so nothing depends on someone remembering. The agents don't promise response times on your behalf.",
  },
  {
    q: "Is roofing the only industry Nexaio serves?",
    a: "Roofing is the first trade we serve. Nexaio is built for home-service businesses, and we add a trade when we actually serve it.",
  },
];

export const roofingClosing = {
  title: "See Nexaio on your roofing workflow.",
  body: "Book a walkthrough and we'll look at your lead sources, your CRM and where estimates stall today.",
};
