import type { CSSProperties, ReactNode } from "react";
import { crmStages } from "../content/samples";
import AiCore from "./AiCore";
import Icon from "./Icon";

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

/**
 * The AI does the work (V2.3, replaces the Systems → Core → Team stage).
 * Three lanes, each a labelled sample: what comes in, the steps the AI
 * handles on its own, and where it lands — a count of steps done by the AI
 * against the one that needs a person. The point is relief: routine
 * follow-through happens without anyone being assigned more work.
 *
 * The first two lanes are supported now. The third is the founders' design
 * direction and is marked "In design · not live" until the Product
 * capability attestation (G3) verifies it. Step counts are steps in the
 * sample, never business figures. Plain lists in HTML; the sequential
 * lighting is CSS while the stage is on screen (`data-loop`), static under
 * reduced motion. The export keeps its V2.2 name for the page and the guard.
 */
export function SystemsStage({
  flow,
}: {
  flow: {
    inLabel: string;
    aiLabel: string;
    outLabel: string;
    tallyAi: string;
    tallyPerson: string;
    sampleTag: string;
    designTag: string;
    lanes: { id: string; label: string; input: string; steps: string[]; person: string; status: "live" | "design" }[];
  };
}) {
  return (
    <div className="flow" data-loop="">
      <div className="flow-head" aria-hidden="true">
        <span>{flow.inLabel}</span>
        <span>{flow.aiLabel}</span>
        <span>
          {flow.outLabel}
          <em className="flow-legend">
            <i className="is-ai" /> {flow.tallyAi} <i className="is-person" /> {flow.tallyPerson}
          </em>
        </span>
      </div>
      {flow.lanes.map((lane, li) => {
        const design = lane.status === "design";
        return (
          <article
            key={lane.id}
            id={`lane-${lane.id}`}
            className={`lane${design ? " lane--design" : ""}`}
            style={{ "--l": li } as CSSProperties}
            aria-label={`${lane.label}${design ? `, ${flow.designTag}` : ""}`}
          >
            <header className="lane-top">
              <b>{lane.label}</b>
              {design ? <span className="lane-tag">{flow.designTag}</span> : <ViewTag>{flow.sampleTag}</ViewTag>}
            </header>
            <div className="lane-in">
              <span className="lane-chip lane-chip--in">{lane.input}</span>
              <i className="lane-link" aria-hidden="true" />
            </div>
            <div className="lane-ai">
              <AiCore size="xs" state={design ? "idle" : "working"} />
              <ol className="lane-steps">
                {lane.steps.map((step, k) => (
                  <li key={step} style={{ "--k": k } as CSSProperties}>
                    <Icon name="check" size={13} />
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            <div className="lane-out">
              <div className="tally" role="img" aria-label={`${lane.steps.length} ${flow.tallyAi.toLowerCase()}, 1 ${flow.tallyPerson.toLowerCase()}`}>
                <span className="tally-bar" aria-hidden="true">
                  <i style={{ flex: lane.steps.length }} />
                  <i style={{ flex: 1 }} />
                </span>
                <span className="tally-nums" aria-hidden="true">
                  <b>{lane.steps.length}</b>
                  <b className="is-person">1</b>
                </span>
              </div>
              <span className="lane-chip lane-chip--person">
                <Icon name="users" size={13} />
                {lane.person}
              </span>
            </div>
          </article>
        );
      })}
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
