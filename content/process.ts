/**
 * "How it works" page (/process): setup stages, what we need from the
 * customer, and ongoing operation. Stages mirror the approved commercial
 * structure (scoping, setup tested on sample leads, sign-off before go-live,
 * then ongoing operation) without prices or dates. Keep this file free of imports.
 */

export const processHero = {
  eyebrow: "How it works",
  title: "From first call to a system that runs every day",
  lede: "Nexaio is set up around the systems you already use, then run with you as an ongoing service. Here’s what each stage involves and what we need from you.",
};

export const stages = [
  {
    title: "Walkthrough",
    happens:
      "We show you the product on sample data and look at how leads and estimates move through your business today.",
    you: "Bring a rough picture of your lead sources, your CRM and who follows up.",
  },
  {
    title: "Fit and scope",
    happens:
      "We map your systems and where things slip, check what each system allows us to connect, and agree exactly what gets set up.",
    you: "Walk us through your process and confirm the scope.",
  },
  {
    title: "Setup and testing",
    happens:
      "We connect your systems, configure routing, follow-up rules and escalation paths, and set up the messages you approve. Then we test everything with sample leads.",
    you: "Grant access, approve message wording and name who handles escalations.",
  },
  {
    title: "Go live",
    happens:
      "Once you’ve seen it working on test leads and signed off, it goes live on your real inquiries and estimates.",
    you: "Review the test results and sign off.",
  },
  {
    title: "Ongoing operation",
    happens:
      "We keep it running, maintain the connections and refine rules and timing with you as your business changes.",
    you: "Tell us what’s changing and review what’s working.",
  },
];

export const needs = {
  title: "What we’ll need from you",
  items: [
    "Admin access to your CRM, or a user with the right permissions",
    "Access to your website forms and other lead sources",
    "Access to the email account used for follow-up",
    "Phone system or call-tracking access, if calls are in scope",
    "Your existing lead and quote list, if you want older quotes re-engaged",
    "A named person to approve messages and handle escalations",
  ],
  note: "Access delays are the most common reason setup takes longer, so the plan starts from when access is granted.",
};

export const afterLaunch = {
  title: "After go-live",
  body: "Nexaio isn’t built and handed over. We operate it with you: keeping connections healthy, adjusting follow-up timing and wording when you ask, and changing rules as your team and lead sources change. You keep ownership of your business data and accounts throughout.",
};
