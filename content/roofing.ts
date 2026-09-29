/**
 * /industries/roofing copy. Roofing is Nexaio's first industry.
 *
 * Roofing-specific, but held to the same limits as every page: no customers,
 * results, logos or named CRM integrations; no response-time or phone-answering
 * promises; nothing about insurance beyond routing the conversation to a
 * person. Keep this file free of imports.
 */

export const roofingHero = {
  eyebrow: "Nexaio for roofing",
  title: "Every roofing lead and estimate,",
  titleDim: "followed through.",
  lede: "Roofing work arrives in waves and decisions take weeks. Nexaio keeps every enquiry, estimate and handoff moving, alongside the CRM your team already runs.",
};

/** Sample events shown over the hero media slot. */
export const roofingHeroEvents = [
  { title: "Hail enquiry · owner assigned", meta: "Website form · 07:12" },
  { title: "Estimate follow-up sent", meta: "Full replacement · day 7" },
];

export type RoofingMomentView = "dashboard" | "messages" | "handoff";

export const moments = {
  eyebrow: "Where roofing work slips",
  title: "Built for how roofing work actually arrives.",
  items: [
    {
      id: "storm",
      label: "When a storm comes through",
      title: "Every enquiry gets an owner, even on the busiest day.",
      body: "After a storm, enquiries can arrive faster than the office can reply. Nexaio captures each one once, acknowledges it with your approved wording and routes it by your rules, so the team can see who owns what.",
      view: "dashboard" as RoofingMomentView,
    },
    {
      id: "estimates",
      label: "When an estimate goes quiet",
      title: "No estimate sits without a next step.",
      body: "Homeowners take time to decide. Nexaio follows up on the schedule you set, stops when they reply, and puts a stalled estimate back in front of the person who owns it.",
      view: "messages" as RoofingMomentView,
    },
    {
      id: "insurance",
      label: "When insurance is involved",
      title: "Judgment calls go to your team.",
      body: "Insurance, pricing and scope need a person. Nexaio doesn't answer them. It hands the question to the right person with the whole conversation attached, and holds follow-up until they've replied.",
      view: "handoff" as RoofingMomentView,
    },
  ],
};

export const roofingCrm = {
  eyebrow: "Your CRM stays",
  title: "Works alongside the CRM you already run.",
  body: "Your pipeline stays where it is. Nexaio reads your stage names and records what each one means, so follow-up and reporting line up with how your team already works.",
  note: "Which CRMs connect, and how, depends on your plan and the access it allows. We confirm it during scoping.",
  leadsBody: "Each lead shows who owns it, and whether Nexaio is working on it, your team has it, or it needs someone now.",
};

export const roofingFaq = [
  {
    q: "Do we need to switch CRMs?",
    a: "No. Nexaio works alongside the CRM you already use. Which connections are possible depends on your CRM, your plan and the access it allows, and we confirm that during scoping.",
  },
  {
    q: "Does Nexaio answer our phones?",
    a: "No. Nexaio doesn't answer calls. It works on the enquiries and follow-ups that reach your systems, such as website forms, email and leads in your CRM.",
  },
  {
    q: "What happens when a storm brings a spike in enquiries?",
    a: "Enquiries that reach your connected systems are captured once, acknowledged where you've approved it, and routed by your rules, so nothing depends on someone remembering. Nexaio doesn't book inspections or promise response times on your behalf.",
  },
  {
    q: "Will Nexaio talk to homeowners about insurance or pricing?",
    a: "No. Insurance, pricing and anything that needs judgment go to your team with the conversation attached.",
  },
  {
    q: "Is roofing the only industry Nexaio serves?",
    a: "Roofing is the first. The operating layer itself isn't specific to roofing, and new industries are added when Nexaio serves them.",
  },
];

export const roofingClosing = {
  title: "See Nexaio on your roofing workflow.",
  body: "Book a walkthrough and we'll look at your lead sources, your CRM and where estimates stall today.",
};
