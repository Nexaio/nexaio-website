import type { ReactNode } from "react";
import {
  activity,
  conversation,
  crmStages,
  dashboard,
  intake,
  report,
  roofingLeads,
  workspaces,
  type Tone,
} from "../content/samples";
import Icon, { type IconName } from "./Icon";

/**
 * Recreated product views.
 *
 * These are faithful HTML recreations of the Nexaio product interface on
 * nexaio-os main: the charcoal rail, the workspace bar with its "Test" marker,
 * the light canvas, and the real panel concepts ("Nexaio is working", "Needs
 * your team", "Today", "Recently changed", Verified / Unconfirmed). They are
 * populated with sample data from content/samples.ts and are never a live
 * account. Screen readers get one description per view; the surrounding page
 * shows a visible "Product view · sample data" tag.
 */

export type Context = "general" | "roofing";
type Section = "dashboard" | "leads" | "intake" | "messages" | "tasks" | "reports" | "settings";

const NAV: { key: Section; label: string; icon: IconName }[] = [
  { key: "dashboard", label: "Dashboard", icon: "dashboard" },
  { key: "leads", label: "Leads", icon: "users" },
  { key: "intake", label: "Intake", icon: "inbox" },
  { key: "messages", label: "Messages", icon: "messages" },
  { key: "tasks", label: "Tasks", icon: "tasks" },
  { key: "reports", label: "Reports", icon: "chart" },
  { key: "settings", label: "Settings", icon: "settings" },
];

/** The product's faceted mark, as drawn in the product rail. */
export function ProductMark({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <g transform="rotate(45 10 10)">
        <rect x="3.5" y="3.5" width="13" height="13" rx="2.5" fill="#FFFFFF" />
        <path d="M3.5 10 L10 3.5 L10 10 Z" fill="#8AB1DF" opacity="0.9" />
        <path d="M10 10 L16.5 10 L10 16.5 Z" fill="#5F927D" opacity="0.8" />
      </g>
    </svg>
  );
}

function Accent({ tone }: { tone: "moss" | "gold" | "cobalt" }) {
  return <i className={`pw-accent ${tone}`} aria-hidden="true" />;
}

function Verified({ ok }: { ok: boolean }) {
  return ok ? (
    <span className="chip ok">
      <Icon name="shield" size={10} strokeWidth={2.2} /> Verified
    </span>
  ) : (
    <span className="chip wait">Unconfirmed</span>
  );
}

function toneChip(tone: Tone) {
  return tone === "moss" ? "chip ok" : tone === "gold" ? "chip wait" : tone === "cobalt" ? "chip stage" : "chip muted";
}

/** The product shell around a view. */
export function ProductWindow({
  section,
  context = "general",
  description,
  children,
  rail = true,
  className = "",
}: {
  section: Section;
  context?: Context;
  description: string;
  children: ReactNode;
  rail?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`pw ${className}`}
      role="img"
      aria-label={`Recreated Nexaio product view with sample data: ${description}`}
    >
      <div className="pw-shell" style={rail ? undefined : { gridTemplateColumns: "minmax(0,1fr)" }}>
        {rail ? (
          <aside className="pw-rail" aria-hidden="true">
            <div className="pw-rail-brand">
              <ProductMark />
              Nexaio
            </div>
            <div>
              <p className="pw-rail-label">Workspace</p>
              <ul>
                {NAV.map((n) => (
                  <li key={n.key} className={n.key === section ? "is-on" : undefined}>
                    <Icon name={n.icon} size={14} />
                    {n.label}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        ) : null}
        <div className="pw-main" aria-hidden="true">
          <div className="pw-ws">
            <small>Workspace</small>
            <b>{workspaces[context]}</b>
            <span className="pw-test">Test</span>
          </div>
          <div className="pw-content">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function DashboardView({ context = "general" }: { context?: Context }) {
  const d = dashboard[context];
  return (
    <>
      <div className="pw-head">
        <h4 className="pw-title">Dashboard</h4>
        <span className="pw-live">
          <i className="pulse" /> Live · updated just now
        </span>
      </div>
      <div className="pw-grid">
        <section className="pw-panel">
          <div className="pw-panel-h">
            <Accent tone="moss" />
            <h4>Nexaio is working</h4>
            <span>{d.working.length}</span>
          </div>
          <p>What Nexaio is doing on its own, why, and when it checks back.</p>
          {d.working.map((w) => (
            <div className="pw-row" key={w.subject}>
              <div className="pw-row-top">
                <span className="chip phase">{w.stage}</span>
                <b>{w.subject}</b>
                <em>→ {w.next}</em>
              </div>
              <p>{w.what}</p>
              <div className="pw-row-top">
                <Verified ok={w.verified} />
              </div>
            </div>
          ))}
        </section>
        <section className="pw-panel">
          <div className="pw-panel-h">
            <Accent tone="gold" />
            <h4>Needs your team</h4>
            <span>{d.team.length}</span>
          </div>
          <p>Work only a person can do. Every card says what to do next.</p>
          {d.team.map((t) => (
            <div className="pw-row warn" key={t.subject}>
              <div className="pw-row-top">
                <b>{t.subject}</b>
                <em>Owner · {t.owner}</em>
              </div>
              <p>{t.what}</p>
              <div className="pw-row-top">
                <span className="chip ai">Why? · AI evidence</span>
              </div>
            </div>
          ))}
        </section>
        <section className="pw-panel">
          <div className="pw-panel-h">
            <Accent tone="cobalt" />
            <h4>Today</h4>
            <span>{d.today.length}</span>
          </div>
          <p>Due today or already late, with who owns it and where it stands.</p>
          <ul className="pw-list">
            {d.today.map((t) => (
              <li key={t.text}>
                <time>{t.time}</time>
                <span>{t.text}</span>
                <span className={t.time === "Late" ? "chip wait" : "chip muted"}>{t.owner}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="pw-panel">
          <div className="pw-panel-h">
            <h4>Recently changed</h4>
          </div>
          <p>Who did what, what came of it, and whether it was confirmed.</p>
          <ul className="pw-list">
            {d.changed.map((c) => (
              <li key={c.text}>
                <time>{c.time}</time>
                <span>{c.text}</span>
                <Verified ok={c.verified} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

/**
 * `trace` marks the ONE row a story beat talks about with `data-trace`, so the
 * page can highlight it once (globals.css). Sample data is unchanged.
 */
export function IntakeView({ trace = false }: { trace?: boolean } = {}) {
  return (
    <>
      <div className="pw-head">
        <h4 className="pw-title">Intake</h4>
        <span className="pw-live">Every delivery, in the order it arrived</span>
      </div>
      <div className="pw-stats">
        {intake.stats.map((s) => (
          <div className="pw-stat" key={s.label}>
            <b>{s.value}</b>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
      <section className="pw-panel">
        <ul className="pw-list">
          {intake.deliveries.map((d, i) => (
            <li key={d.time + d.source} data-trace={trace && i === 0 ? "" : undefined}>
              <time>{d.time}</time>
              <span>{d.source}</span>
              <span className={toneChip(d.tone)}>{d.outcome}</span>
            </li>
          ))}
        </ul>
      </section>
      <div className="pw-note">
        <Accent tone="gold" /> {intake.review}
      </div>
    </>
  );
}

export function MessagesView({ context = "general", trace = false }: { context?: Context; trace?: boolean }) {
  const c = conversation[context];
  return (
    <>
      <div className="pw-head">
        <h4 className="pw-title">Messages</h4>
        <span className="pw-live">{c.filters.map((f) => `${f.label} ${f.count}`).join(" · ")}</span>
      </div>
      <section className="pw-panel" style={{ display: "grid", gap: 8 }}>
        <div className="pw-panel-h">
          <h4>{c.subject}</h4>
          <span>Email</span>
        </div>
        {c.messages.map((m) => (
          <div className={`pw-bubble${m.dir === "out" ? " out" : ""}`} key={m.text}>
            <small>{m.who}</small>
            {m.text}
          </div>
        ))}
        <div className="pw-note" data-trace={trace ? "" : undefined}>
          <Accent tone="gold" /> {c.note}
        </div>
      </section>
    </>
  );
}

export function HandoffView({
  context = "general",
  withReport = false,
  trace = false,
}: {
  context?: Context;
  withReport?: boolean;
  trace?: boolean;
}) {
  const d = dashboard[context];
  return (
    <>
      <div className="pw-head">
        <h4 className="pw-title">Needs your team</h4>
        <span className="pw-live">Sorted worst first</span>
      </div>
      <p className="pw-sub">Work only a person can do. Every card says what to do next.</p>
      {d.team.map((t) => (
        <div className="pw-row warn" key={t.subject}>
          <div className="pw-row-top">
            <b>{t.subject}</b>
            <em data-trace={trace ? "" : undefined}>Owner · {t.owner}</em>
          </div>
          <p>{t.what}</p>
          <div className="pw-row-top">
            <span className="chip ai">Why? · AI evidence</span>
            <span className="chip muted">History attached</span>
          </div>
        </div>
      ))}
      {withReport ? (
        <section className="pw-panel">
          <div className="pw-panel-h">
            <Accent tone="cobalt" />
            <h4>Reports · {report.period}</h4>
          </div>
          <ReportStats />
          <p className="pw-sub" style={{ margin: "9px 0 0" }}>
            Not measured · {report.notMeasured}
          </p>
        </section>
      ) : (
        <section className="pw-panel">
          <div className="pw-panel-h">
            <h4>Recently changed</h4>
          </div>
          <ul className="pw-list">
            {d.changed.slice(0, 2).map((c) => (
              <li key={c.text}>
                <time>{c.time}</time>
                <span>{c.text}</span>
                <Verified ok={c.verified} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

function ReportStats() {
  return (
    <div className="pw-stats">
      {report.stats.map((s) => (
        <div className="pw-stat" key={s.label}>
          <b>{s.value}</b>
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  );
}

export function ReportView() {
  return (
    <>
      <div className="pw-head">
        <h4 className="pw-title">Reports</h4>
        <span className="chip muted">{report.period}</span>
      </div>
      <p className="pw-sub">What Nexaio did for you, what it proved, and what it deliberately does not measure.</p>
      <section className="pw-panel">
        <p className="pw-kicker">{report.period}</p>
        <p className="pw-headline">{report.headline}</p>
        <p className="pw-sub" style={{ margin: "4px 0 0" }}>
          {report.coverage}
        </p>
      </section>
      <div className="pw-section-h">
        <i className="pw-accent moss" aria-hidden="true" />
        <span>What Nexaio did</span>
        <span className="chip ok">
          <Icon name="shield" size={10} strokeWidth={2.2} /> Verified
        </span>
      </div>
      <ReportStats />
      <div className="pw-section-h">
        <i className="pw-accent gold" aria-hidden="true" />
        <span>What this report does not measure</span>
      </div>
      <div className="pw-note">{report.notMeasured}</div>
    </>
  );
}

export function CrmMapView({ context = "general" }: { context?: Context }) {
  return (
    <>
      <div className="pw-head">
        <h4 className="pw-title">Pipeline stages</h4>
        <span className="chip ok">In force</span>
      </div>
      <p style={{ margin: 0, fontSize: 11, color: "var(--p-muted)" }}>
        Your pipeline stage names are yours. This is what each one means to Nexaio.
      </p>
      <div className="pw-map">
        {crmStages[context].map((s) => (
          <div key={s.yours}>
            <span>&ldquo;{s.yours}&rdquo;</span>
            <i>→</i>
            <em>{s.nexaio}</em>
          </div>
        ))}
      </div>
    </>
  );
}

export function LeadsView() {
  return (
    <>
      <div className="pw-head">
        <h4 className="pw-title">Leads</h4>
        <span className="pw-live">Need you · Nexaio working · Your team</span>
      </div>
      <section className="pw-panel">
        <ul className="pw-list">
          {roofingLeads.map((l) => (
            <li key={l.name} style={{ gridTemplateColumns: "minmax(0,1fr) auto" }}>
              <span>
                <b style={{ fontWeight: 600, color: "var(--p-text-strong)" }}>{l.name}</b>
                <br />
                <small style={{ color: "var(--p-muted)" }}>
                  {l.meta} · {l.owner}
                </small>
              </span>
              <span className={toneChip(l.tone)}>{l.state}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

/** The activity rail beside the hero window (a site presentation of product events). */
export function ActivityRail({ context = "general" }: { context?: Context }) {
  return (
    <ol className="rail-list">
      {activity[context].map((e) => (
        <li key={e.time + e.text}>
          <time>{e.time}</time>
          <i className={e.tone === "moss" ? "dot-moss" : e.tone === "gold" ? "dot-gold" : "dot-cobalt"} />
          <span>
            {e.text}
            <small>{e.sub}</small>
          </span>
        </li>
      ))}
    </ol>
  );
}
