/**
 * Sample data for the recreated product views.
 *
 * Every name, job and number here is invented for illustration. None of it is
 * a customer, a prospect or a result, and every view that uses it is labelled
 * "Product view · sample data". The workspace names mirror the product's own
 * convention of marking fixture workspaces "Test".
 *
 * Panel titles and the labels below come from the Nexaio product interface
 * (nexaio-os main, checked 2026-09-29): the dashboard panels "Nexaio is
 * working", "Needs your team", "Today" and "Recently changed" with their
 * subtitles; the working-process phases ("Waiting", "Checking"); "Verified" /
 * "Unconfirmed"; the intake strip ("Sources set up", "Needs review",
 * "Refused"); the message filters ("Nexaio is handling", "Waiting on your
 * team"); "Pipeline stages" with the product's lead-state names; and the
 * report's "What this report does not measure".
 * Keep this file free of imports.
 */

export type Tone = "moss" | "gold" | "cobalt" | "muted";

export const workspaces = {
  general: "Sample Company",
  roofing: "Sample Roofing Co.",
};

export const activity = {
  general: [
    { time: "09:41", text: "Enquiry received", sub: "Website form", tone: "cobalt" as Tone },
    { time: "09:41", text: "Matched to an existing customer", sub: "Verified", tone: "moss" as Tone },
    { time: "09:42", text: "Owner assigned: Dana", sub: "Routing rule", tone: "cobalt" as Tone },
    { time: "09:42", text: "Acknowledgement sent", sub: "Email · approved wording", tone: "moss" as Tone },
    { time: "10:05", text: "Needs your team", sub: "Pricing question", tone: "gold" as Tone },
  ],
  roofing: [
    { time: "07:12", text: "Enquiry received", sub: "Hail damage · website form", tone: "cobalt" as Tone },
    { time: "07:12", text: "Owner assigned: Dana", sub: "Routing rule", tone: "cobalt" as Tone },
    { time: "07:13", text: "Acknowledgement sent", sub: "Email · approved wording", tone: "moss" as Tone },
    { time: "09:30", text: "Estimate follow-up sent", sub: "Full replacement · day 7", tone: "moss" as Tone },
    { time: "10:02", text: "Needs your team", sub: "Insurance question", tone: "gold" as Tone },
  ],
};

export const dashboard = {
  general: {
    working: [
      { stage: "Waiting", subject: "Quote #1042", what: "Second follow-up sent. Checks back Thursday if there is no reply.", next: "Thu 9:00", verified: true },
      { stage: "Checking", subject: "New enquiries", what: "Three enquiries acknowledged and routed to their owners.", next: "Today", verified: true },
    ],
    team: [
      { subject: "Pricing question", what: "Customer asked about payment options. Call today.", owner: "Dana" },
    ],
    today: [
      { time: "11:00", text: "Callback · service request", owner: "Marcus" },
      { time: "14:30", text: "Site visit · new customer", owner: "Priya" },
      { time: "Late", text: "Quote review · #1037", owner: "Marcus" },
    ],
    changed: [
      { time: "09:42", text: "Enquiry matched to existing customer", verified: true },
      { time: "09:15", text: "Reply received · follow-up stopped", verified: true },
      { time: "08:50", text: "Quote #1029 marked won in your CRM", verified: false },
    ],
  },
  roofing: {
    working: [
      { stage: "Waiting", subject: "Full replacement estimate", what: "Day-7 follow-up sent. Checks back Thursday if there is no reply.", next: "Thu 9:00", verified: true },
      { stage: "Checking", subject: "Storm enquiries", what: "Six new enquiries acknowledged and routed to their owners.", next: "Today", verified: true },
    ],
    team: [
      { subject: "Insurance question", what: "Homeowner asked about the adjuster visit. Call today.", owner: "Dana" },
    ],
    today: [
      { time: "08:30", text: "Inspection · hail damage", owner: "Marcus" },
      { time: "13:00", text: "Estimate walkthrough · full replacement", owner: "Priya" },
      { time: "Late", text: "Callback · leak repair", owner: "Dana" },
    ],
    changed: [
      { time: "07:13", text: "Hail enquiry acknowledged", verified: true },
      { time: "06:58", text: "Reply received · follow-up stopped", verified: true },
      { time: "Yesterday", text: "Estimate marked sold in your CRM", verified: false },
    ],
  },
};

export const intake = {
  stats: [
    { value: "3/3", label: "Sources set up" },
    { value: "1", label: "Needs review" },
    { value: "0", label: "Refused" },
  ],
  deliveries: [
    { time: "09:41", source: "Website form", outcome: "Accepted · matched", tone: "moss" as Tone },
    { time: "09:20", source: "Email", outcome: "Accepted · new lead", tone: "moss" as Tone },
    { time: "08:57", source: "Manual entry", outcome: "Needs review", tone: "gold" as Tone },
    { time: "08:31", source: "Website form", outcome: "Accepted · matched", tone: "moss" as Tone },
  ],
  review: "Matched more than one existing lead. Nothing was changed and nobody was contacted. A person has to decide.",
};

const messageFilters = [
  { label: "Nexaio is handling", count: "12" },
  { label: "Waiting on your team", count: "2" },
];

export const conversation = {
  general: {
    subject: "Quote #1042",
    messages: [
      { dir: "out", who: "Nexaio · approved wording", text: "Following up on the quote we sent last week. Happy to answer any questions." },
      { dir: "in", who: "Customer", text: "Before we go ahead, what payment options do you have?" },
    ],
    note: "Customer replied, so follow-up stopped. Waiting on your team: Dana.",
    filters: messageFilters,
  },
  roofing: {
    subject: "Full replacement estimate",
    messages: [
      { dir: "out", who: "Nexaio · approved wording", text: "Following up on the roof replacement estimate we sent last week. Happy to answer any questions." },
      { dir: "in", who: "Homeowner", text: "Thanks. Before we decide, how would the insurance side work?" },
    ],
    note: "Homeowner replied, so follow-up stopped. Insurance question sent to Dana.",
    filters: messageFilters,
  },
};

export const report = {
  period: "September",
  headline: "64 enquiries handled. 9 handed to your team.",
  coverage: "Covers the whole month.",
  stats: [
    { value: "64", label: "Enquiries handled" },
    { value: "118", label: "Follow-ups sent" },
    { value: "9", label: "Handed to your team" },
  ],
  notMeasured: "Revenue. Nexaio never sees your invoices, so it does not claim any.",
};

/** Your stage names (left) and the product's lead states they map to (right). */
export const crmStages = {
  general: [
    { yours: "New Lead", nexaio: "New" },
    { yours: "Contacted", nexaio: "Contacted" },
    { yours: "Quote Sent", nexaio: "Estimate sent" },
    { yours: "Closed Won", nexaio: "Won" },
  ],
  roofing: [
    { yours: "New Lead", nexaio: "New" },
    { yours: "Inspection Scheduled", nexaio: "Appointment scheduled" },
    { yours: "Estimate Sent", nexaio: "Estimate sent" },
    { yours: "Sold", nexaio: "Won" },
  ],
};

export const roofingLeads = [
  { name: "Hail damage inspection", meta: "Website form · 12 min ago", owner: "Dana", state: "Nexaio working", tone: "moss" as Tone },
  { name: "Full replacement estimate", meta: "Sent 9 days ago", owner: "Marcus", state: "Nexaio working", tone: "moss" as Tone },
  { name: "Insurance claim", meta: "Waiting on adjuster", owner: "Priya", state: "Your team", tone: "cobalt" as Tone },
  { name: "Gutter and fascia quote", meta: "Customer asked about financing", owner: "Dana", state: "Need you", tone: "gold" as Tone },
];
