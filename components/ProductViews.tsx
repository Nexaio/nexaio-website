import type { ReactNode } from "react";
import Icon from "./Icon";

/**
 * Illustrative product views built from HTML, not screenshots.
 *
 * Every view is framed and labelled "Illustration · sample data". The names,
 * jobs and counts are invented for illustration; none of them is a customer,
 * a prospect or a result. Screen readers get one description per view.
 */

type Tone = "risk" | "warn" | "info" | "ok" | "neutral";

function Pill({ tone, children }: { tone: Tone; children: ReactNode }) {
  return <span className={`pill pill-${tone}`}>{children}</span>;
}

export function ProductFrame({
  title,
  description,
  children,
  className = "",
}: {
  title: string;
  /** What the view shows, for screen readers. */
  description: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`pf ${className}`}
      role="img"
      aria-label={`Illustration with sample data: ${description}`}
    >
      <div className="pf-bar">
        <span className="pf-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="pf-title">{title}</span>
        <span className="pf-tag">Illustration · sample data</span>
      </div>
      <div className="pf-body">{children}</div>
    </div>
  );
}

const boardRows: {
  name: string;
  meta: string;
  owner: string;
  status: string;
  tone: Tone;
  next: string;
}[] = [
  {
    name: "Hail damage inspection",
    meta: "Website form · 12 min ago",
    owner: "Unassigned",
    status: "Needs an owner",
    tone: "risk",
    next: "Escalated to office",
  },
  {
    name: "Full replacement estimate",
    meta: "Sent 9 days ago, no reply",
    owner: "Marcus",
    status: "Follow-up set",
    tone: "info",
    next: "Thu 9:00 am",
  },
  {
    name: "Leak repair",
    meta: "Referral · yesterday",
    owner: "Office",
    status: "Waiting on customer",
    tone: "warn",
    next: "Reminder Fri",
  },
  {
    name: "Insurance claim estimate",
    meta: "Waiting on adjuster",
    owner: "Priya",
    status: "Check-in set",
    tone: "info",
    next: "Oct 14",
  },
  {
    name: "Gutter and fascia quote",
    meta: "Customer asked about financing",
    owner: "Dana",
    status: "With a person",
    tone: "neutral",
    next: "History attached",
  },
];

export function OpportunityBoard() {
  return (
    <ProductFrame
      className="pf--hero"
      title="Open opportunities"
      description="a list of open roofing leads and estimates, each with an owner, a status and a next step"
    >
      <div className="ob-stats">
        <span>
          <b>14</b> open
        </span>
        <span>
          <b>3</b> need an owner
        </span>
        <span>
          <b>5</b> follow-ups due
        </span>
        <span>
          <b>2</b> need a person
        </span>
      </div>
      <ul className="ob-list">
        {boardRows.map((r) => (
          <li className="ob-row" key={r.name}>
            <div className="ob-main">
              <span className="ob-name">{r.name}</span>
              <span className="ob-meta">
                {r.meta} · <b>{r.owner}</b>
              </span>
            </div>
            <Pill tone={r.tone}>{r.status}</Pill>
            <span className="ob-next">{r.next}</span>
          </li>
        ))}
      </ul>
    </ProductFrame>
  );
}

function CaptureView() {
  return (
    <ProductFrame
      title="New inquiry"
      description="inquiries from a website form, the CRM, email and referrals combined into one record with a source, time, owner and next step"
    >
      <div className="cv-sources">
        {["Website form", "CRM", "Email", "Referral"].map((s) => (
          <span className="cv-source" key={s}>
            {s}
          </span>
        ))}
      </div>
      <div className="cv-record">
        <p className="cv-name">Hail damage inspection</p>
        <dl className="cv-fields">
          <div>
            <dt>Source</dt>
            <dd>Website form</dd>
          </div>
          <div>
            <dt>Received</dt>
            <dd>2:14 pm</dd>
          </div>
          <div>
            <dt>Owner</dt>
            <dd>Office</dd>
          </div>
          <div>
            <dt>Next step</dt>
            <dd>Call to book inspection</dd>
          </div>
        </dl>
        <p className="cv-done">
          <Icon name="check" size={16} /> Acknowledgement sent by email
        </p>
      </div>
    </ProductFrame>
  );
}

function Timeline({
  items,
}: {
  items: { time: string; text: string; tone?: Tone; tag?: string }[];
}) {
  return (
    <ol className="tlv">
      {items.map((it) => (
        <li className={`tlv-item${it.tone ? ` tlv-item--${it.tone}` : ""}`} key={it.time + it.text}>
          <span className="tlv-time">{it.time}</span>
          <span className="tlv-text">{it.text}</span>
          {it.tag && it.tone ? <Pill tone={it.tone}>{it.tag}</Pill> : null}
        </li>
      ))}
    </ol>
  );
}

function EscalationView() {
  return (
    <ProductFrame
      title="Activity"
      description="a timeline where an inquiry is acknowledged, is not picked up within the set time, is escalated to the office manager and is then claimed"
    >
      <p className="pv-sub">Hail damage inspection</p>
      <Timeline
        items={[
          { time: "2:14 pm", text: "Inquiry received from website form" },
          { time: "2:14 pm", text: "Acknowledgement sent by email" },
          { time: "2:29 pm", text: "Not picked up within 15 minutes", tone: "warn", tag: "Overdue" },
          { time: "2:29 pm", text: "Escalated to office manager", tone: "risk", tag: "Escalated" },
          { time: "2:36 pm", text: "Claimed by Dana", tone: "ok", tag: "Owned" },
        ]}
      />
    </ProductFrame>
  );
}

function EstimateView() {
  return (
    <ProductFrame
      title="Estimate"
      description="an estimate with two follow-ups sent and no reply after nine days, handed back to the salesperson who owns it"
    >
      <p className="pv-sub">
        Full replacement · Owner <b>Marcus</b>
      </p>
      <Timeline
        items={[
          { time: "Sep 12", text: "Estimate sent" },
          { time: "Sep 15", text: "Follow-up 1 sent by email" },
          { time: "Sep 19", text: "Follow-up 2 sent by email" },
          { time: "Sep 21", text: "No reply after 9 days", tone: "warn", tag: "Stalled" },
          { time: "Next", text: "Back with Marcus: call the homeowner", tone: "info", tag: "Due today" },
        ]}
      />
    </ProductFrame>
  );
}

function ReactivationView() {
  const rows: { name: string; when: string; status: string; tone: Tone }[] = [
    { name: "Roof replacement quote", when: "March", status: "Contacted", tone: "neutral" },
    { name: "Storm repair quote", when: "April", status: "Replied · with sales", tone: "ok" },
    { name: "Skylight and flashing", when: "April", status: "Opted out", tone: "warn" },
    { name: "Full replacement quote", when: "May", status: "Next batch", tone: "info" },
  ];
  return (
    <ProductFrame
      title="Re-engagement"
      description="a batch of older quotes being re-engaged, where replies go to sales and opt-outs are respected"
    >
      <p className="pv-sub">Batch · spring quotes</p>
      <ul className="rv-list">
        {rows.map((r) => (
          <li className="rv-row" key={r.name}>
            <span className="rv-name">{r.name}</span>
            <span className="rv-when">{r.when}</span>
            <Pill tone={r.tone}>{r.status}</Pill>
          </li>
        ))}
      </ul>
    </ProductFrame>
  );
}

function HandoffView() {
  return (
    <ProductFrame
      title="Conversation"
      description="a customer asks about financing and the conversation is handed to the sales manager with its history"
    >
      <p className="pv-sub">Gutter and fascia quote</p>
      <div className="hv-msg hv-msg--in">
        <span className="hv-who">Customer</span>
        Before we go ahead, do you offer financing?
      </div>
      <div className="hv-event">
        <Icon name="handoff" size={16} />
        <span>
          Financing question: handed to <b>Dana (sales manager)</b>
        </span>
      </div>
      <div className="hv-chips">
        <span className="hv-chip">History attached · 6 messages</span>
        <span className="hv-chip">Automated follow-up paused</span>
      </div>
    </ProductFrame>
  );
}

function SummaryView() {
  const stats = [
    { n: "18", label: "New inquiries" },
    { n: "9", label: "Estimates followed up" },
    { n: "6", label: "Waiting on customers" },
    { n: "2", label: "Need you" },
  ];
  return (
    <ProductFrame
      title="This week"
      description="a weekly summary of new inquiries, estimates followed up, work waiting on customers and two decisions for the owner"
    >
      <div className="sv-stats">
        {stats.map((s) => (
          <div className="sv-stat" key={s.label}>
            <span className="sv-n">{s.n}</span>
            <span className="sv-l">{s.label}</span>
          </div>
        ))}
      </div>
      <p className="pv-sub">Needs you</p>
      <ul className="sv-needs">
        <li>
          <Pill tone="risk">Decision</Pill> Financing terms · Gutter and fascia quote
        </li>
        <li>
          <Pill tone="warn">Review</Pill> Re-quote requested · Leak repair
        </li>
      </ul>
    </ProductFrame>
  );
}

export type ProductVisual =
  | "capture"
  | "escalation"
  | "estimate"
  | "reactivation"
  | "handoff"
  | "summary";

export function ProductView({ visual }: { visual: ProductVisual }) {
  switch (visual) {
    case "capture":
      return <CaptureView />;
    case "escalation":
      return <EscalationView />;
    case "estimate":
      return <EstimateView />;
    case "reactivation":
      return <ReactivationView />;
    case "handoff":
      return <HandoffView />;
    case "summary":
      return <SummaryView />;
  }
}
