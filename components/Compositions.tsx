import type { CSSProperties, ReactNode } from "react";
import { crmStages } from "../content/samples";
import { nebulaPlate } from "../content/media";
import AiCore from "./AiCore";
import Icon from "./Icon";

/** The visible label every sample or illustration carries. */
export function ViewTag({ children = "Product view · sample data" }: { children?: string }) {
  return <span className="view-tag">{children}</span>;
}

/**
 * A small, cropped product fragment behind glass, labelled. Kept for later
 * pages; V2.3 shows no product UI on Home, Product, Demo or Roofing.
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

/**
 * A panel of the ambient navy field (the darker still of the reference
 * plate) with content over it: the shared atmosphere for page heroes and
 * cards, instead of lit white surfaces or floating objects.
 */
export function Atmosphere({ children, className = "" }: { children?: ReactNode; className?: string }) {
  return (
    <div className={`atmo${className ? ` ${className}` : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={nebulaPlate.ambient} alt="" loading="lazy" decoding="async" />
      <div className="atmo-shade" aria-hidden="true" />
      {children ? <div className="atmo-over">{children}</div> : null}
    </div>
  );
}

type FlowInput = { label: string; status: "live" | "design" };
type FlowStep = { id: string; title: string; line: string };

/**
 * What Nexaio does (V2.3 repair): one vertical flow. Many kinds of work come
 * in at the top (illustrative, not a list of connected channels), converge
 * on Nexaio AI, which handles the routine, follows up and responds, stops
 * when the customer replies, and brings in a person only when it is needed.
 * The relief row at the end makes the reduction plain: without Nexaio every
 * step is someone's job; with it, one judgment call reaches a person.
 *
 * Plain HTML lists; the converging lines and the step lighting are CSS/SVG
 * motion while the stage is on screen (`data-loop`), static under reduced
 * motion. Items the Product capability attestation (G3) has not verified
 * carry the "In design · not live" tag. The export keeps its name for the
 * page and the guard.
 */
export function SystemsStage({
  flow,
}: {
  flow: {
    inputs: FlowInput[];
    moreInputs: string;
    ai: string;
    aiSub: string;
    steps: FlowStep[];
    designTag: string;
    sampleTag: string;
    relief: { before: string; after: string; beforeLabel: string; afterLabel: string };
  };
}) {
  const n = flow.inputs.length;
  return (
    <div className="wf" data-loop="">
      <ul className="wf-inputs" aria-label="What comes in">
        {flow.inputs.map((inp, i) => (
          <li key={inp.label} className={inp.status === "design" ? "is-design" : undefined} style={{ "--k": i } as CSSProperties}>
            {inp.label}
            {inp.status === "design" ? <em className="lane-tag">{flow.designTag}</em> : null}
          </li>
        ))}
        <li className="wf-more">{flow.moreInputs}</li>
      </ul>
      <svg className="wf-converge" viewBox="0 0 1000 140" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        {flow.inputs.map((inp, i) => {
          const x = ((i + 0.5) / n) * 1000;
          const d = `M${x} 0C${x} 70 500 60 500 140`;
          return (
            <g key={inp.label} style={{ "--k": i } as CSSProperties}>
              <path className="wf-link" d={d} pathLength={100} />
              <path className="wf-pulse" d={d} pathLength={100} />
            </g>
          );
        })}
      </svg>
      <div className="wf-ai">
        <AiCore size="sm" state="working" />
        <b>{flow.ai}</b>
        <small>{flow.aiSub}</small>
      </div>
      <ol className="wf-steps">
        {flow.steps.map((s, i) => (
          <li key={s.id} id={`wf-${s.id}`} className={i === flow.steps.length - 1 ? "is-human" : undefined} style={{ "--k": i } as CSSProperties}>
            <span className="wf-n" aria-hidden="true">
              {i === flow.steps.length - 1 ? <Icon name="users" size={14} /> : <Icon name="check" size={14} />}
            </span>
            <b>{s.title}</b>
            <p>{s.line}</p>
          </li>
        ))}
      </ol>
      <div className="wf-relief" role="img" aria-label={`${flow.relief.before}: ${flow.relief.beforeLabel}. ${flow.relief.after}: ${flow.relief.afterLabel}.`}>
        <div className="wf-row is-before">
          <b>{flow.relief.before}</b>
          <span className="wf-icons">
            {Array.from({ length: 6 }, (_, i) => (
              <i key={i} className="is-person" style={{ "--k": i } as CSSProperties}>
                <Icon name="users" size={13} />
              </i>
            ))}
          </span>
          <em>{flow.relief.beforeLabel}</em>
        </div>
        <div className="wf-row is-after">
          <b>{flow.relief.after}</b>
          <span className="wf-icons">
            {Array.from({ length: 5 }, (_, i) => (
              <i key={i} className="is-ai" style={{ "--k": i } as CSSProperties}>
                <AiCore size="xs" state="working" />
              </i>
            ))}
            <i className="is-person" style={{ "--k": 5 } as CSSProperties}>
              <Icon name="users" size={13} />
            </i>
          </span>
          <em>{flow.relief.afterLabel}</em>
        </div>
        <ViewTag>{flow.sampleTag}</ViewTag>
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

/** "Your CRM — the record" beside "Nexaio AI — the work" (/product). */
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
          <AiCore size="xs" state="working" /> {ai.label} <span>— {ai.sub}</span>
        </p>
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
