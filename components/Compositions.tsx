import type { CSSProperties, ReactNode } from "react";
import { crmStages } from "../content/samples";
import AiCore from "./AiCore";
import Icon, { type IconName } from "./Icon";

/** The visible label every product presentation carries. */
export function ViewTag({ children = "Product view · sample data" }: { children?: string }) {
  return <span className="view-tag">{children}</span>;
}

/**
 * A small, cropped product fragment behind glass (V2.2: never a hero, at
 * most two on /product, at most one per /demo chapter), labelled
 * "Product detail · sample data".
 */
export function ProductDetail({ children }: { children: ReactNode }) {
  return (
    <figure className="frag">
      <div className="frag-crop">{children}</div>
      <figcaption>
        <ViewTag>Product detail · sample data</ViewTag>
      </figcaption>
    </figure>
  );
}

/** Generic system icons. No third-party logos, ever. */
const SYSTEM_ICONS: Record<string, IconName> = {
  CRM: "dashboard",
  Inbox: "inbox",
  "Website form": "tasks",
  Calendar: "calendar",
  "Phone log": "phone",
};

/** Stage geometry (viewBox 0 0 1000 540): tile centres, the Core at the centre. */
const SYS_Y = [62, 166, 270, 374, 478];
const TEAM_Y = [150, 270, 390];

/**
 * Systems → Nexaio AI → Your team (V2.2 packet §2): glass system tiles on the
 * left, the Core in the centre, people on the right. While the stage is on
 * screen, signal pulses travel tile → Core → person along hairline paths
 * (stroke-dashoffset only), and the label under the Core cycles through the
 * five jobs. The jobs are a plain list in the HTML, so they read without
 * motion, without script and to assistive technology. On small screens the
 * stage stacks vertically.
 */
export function SystemsStage({
  systems,
  team,
  jobs,
  systemsLabel,
  coreLabel,
  teamLabel,
}: {
  systems: string[];
  team: string[];
  jobs: string[];
  systemsLabel: string;
  coreLabel: string;
  teamLabel: string;
}) {
  return (
    <div className="stage" data-loop="">
      <svg className="stage-links" viewBox="0 0 1000 540" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        {SYS_Y.slice(0, systems.length).map((y, i) => (
          <g key={`s${y}`} style={{ "--k": i } as CSSProperties}>
            <path className="link" d={`M222 ${y}C320 ${y} 330 270 402 270`} pathLength={100} />
            <path className="pulse" d={`M222 ${y}C320 ${y} 330 270 402 270`} pathLength={100} />
          </g>
        ))}
        {TEAM_Y.slice(0, team.length).map((y, i) => (
          <g key={`t${y}`} style={{ "--k": i } as CSSProperties}>
            <path className="link" d={`M598 270C670 270 680 ${y} 778 ${y}`} pathLength={100} />
            <path className="pulse pulse--out" d={`M598 270C670 270 680 ${y} 778 ${y}`} pathLength={100} />
          </g>
        ))}
      </svg>

      <div className="stage-col stage-col--systems">
        <p className="stage-label">{systemsLabel}</p>
        <ul>
          {systems.map((s, i) => (
            <li key={s} className="tile" style={{ "--ty": `${(SYS_Y[i] / 540) * 100}%` } as CSSProperties}>
              <Icon name={SYSTEM_ICONS[s] ?? "dashboard"} size={16} />
              {s}
            </li>
          ))}
        </ul>
      </div>

      <div className="stage-v" aria-hidden="true">
        <i />
      </div>

      <div className="stage-core">
        <AiCore size="md" state="working" />
        <p className="stage-label stage-label--core">{coreLabel}</p>
        <ol className="stage-jobs">
          {jobs.map((j, i) => (
            <li key={j} style={{ "--k": i } as CSSProperties}>
              {j}
            </li>
          ))}
        </ol>
      </div>

      <div className="stage-v" aria-hidden="true">
        <i />
      </div>

      <div className="stage-col stage-col--team">
        <p className="stage-label">{teamLabel}</p>
        <ul>
          {team.map((t, i) => (
            <li key={t} className="tile tile--person" style={{ "--ty": `${(TEAM_Y[i] / 540) * 100}%` } as CSSProperties}>
              <Icon name="users" size={16} />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * The customer's CRM as a slim slab: the system of record, listing the
 * product's own lead-state names (sample stages). Static.
 */
export function CrmSlab({ label }: { label: string }) {
  return (
    <div className="slab" role="group" aria-label={label}>
      <span className="slab-label">
        <i aria-hidden="true" />
        {label}
      </span>
      <ol className="slab-stages" aria-label="Pipeline stages, as Nexaio reads them (sample)">
        {crmStages.general.map((s) => (
          <li key={s.nexaio}>{s.nexaio}</li>
        ))}
      </ol>
    </div>
  );
}

/**
 * "Your CRM — the record" beside "Nexaio AI — the work" (/product): the
 * not-another-CRM idea as one visual.
 */
export function CrmSplit({
  crm,
  ai,
}: {
  crm: { label: string; sub: string; items: string[] };
  ai: { label: string; sub: string; items: string[] };
}) {
  return (
    <div className="crm-split">
      <div className="crm-split-side">
        <p className="crm-split-h">
          {crm.label} <span>— {crm.sub}</span>
        </p>
        <CrmSlab label={`${crm.label} · ${crm.sub}`} />
        <ul className="crm-split-list">
          {crm.items.map((x) => (
            <li key={x}>
              <Icon name="check" size={15} />
              {x}
            </li>
          ))}
        </ul>
      </div>
      <div className="crm-split-side crm-split-side--ai">
        <p className="crm-split-h">
          {ai.label} <span>— {ai.sub}</span>
        </p>
        <AiCore size="sm" state="working" />
        <ul className="crm-split-list">
          {ai.items.map((x) => (
            <li key={x}>
              <Icon name="plus" size={15} />
              {x}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
