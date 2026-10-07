import Image from "next/image";
import { crmStages } from "../content/samples";
import {
  ActivityRail,
  DashboardView,
  ProductWindow,
  type Context,
} from "./ProductViews";

/** The visible label every product presentation carries. */
export function ViewTag({ children = "Product view · sample data" }: { children?: string }) {
  return <span className="view-tag">{children}</span>;
}

/**
 * Hero composition: the Nexaio dashboard as the centerpiece, lit and layered,
 * sitting ON TOP of a slim slab that stands for the customer's CRM (the system
 * of record), with the activity rail tucked against the window's lower-left
 * corner. The CRM slab lists the product's own lead-state names. `data-loop`
 * lets the rail, the live dot and the link traces play while on screen.
 */
export function HeroComposition({
  context = "general",
  slabLabel,
}: {
  context?: Context;
  slabLabel: string;
}) {
  return (
    <div className="comp" data-loop>
      <div className="comp-stage">
        <div className="comp-glow" aria-hidden="true" />
        <div className="comp-window">
          <ProductWindow
            section="dashboard"
            context={context}
            description="the Nexaio dashboard with the panels Nexaio is working, Needs your team, Today and Recently changed"
          >
            <DashboardView context={context} />
          </ProductWindow>
        </div>
        <div className="comp-rail enter d4" role="group" aria-label="Example activity, sample data">
          <header>
            <span>Activity</span>
            <span>Today</span>
          </header>
          <ActivityRail context={context} />
        </div>
      </div>
      <div className="comp-links" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="comp-slab" role="group" aria-label={slabLabel}>
        <span className="slab-label">
          <i aria-hidden="true" />
          {slabLabel}
        </span>
        <ol className="slab-stages" aria-label="Pipeline stages, as Nexaio reads them">
          {crmStages[context].map((s) => (
            <li key={s.nexaio}>{s.nexaio}</li>
          ))}
        </ol>
      </div>
      <div className="comp-foot">
        <ViewTag />
        <span className="meta">Recreated from the Nexaio product interface</span>
      </div>
    </div>
  );
}

/**
 * The operating layer as three stacked layers: your systems on top, Nexaio in
 * the middle, your team below. Two data dots travel down each link while the
 * stack is on screen (paused off-screen, static under reduced motion).
 */
export function LayerDiagram({
  systems,
  team,
  ops,
}: {
  systems: string[];
  team: string[];
  ops: string[];
}) {
  return (
    <div className="opstack" data-loop>
      <div className="opstack-layer is-systems">
        <p className="opstack-label">
          Your systems <small>stay the system of record</small>
        </p>
        <ul className="opstack-chips">
          {systems.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
      <div className="opstack-link" aria-hidden="true">
        <i className="d1" />
        <i className="d2" />
        <span className="opstack-token">
          <b className="dot-cobalt" /> new enquiry
        </span>
      </div>
      <div className="opstack-layer is-core">
        <p className="opstack-label">
          <Image src="/nexaio-logo-light.png" alt="" width={20} height={20} />
          Nexaio <small>AI operating layer</small>
        </p>
        <ul className="opstack-chips is-ops">
          {ops.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      </div>
      <div className="opstack-link" aria-hidden="true">
        <i className="d1" />
        <i className="d2" />
        <span className="opstack-token">
          <b className="dot-gold" /> owner: Dana
        </span>
      </div>
      <div className="opstack-layer is-team">
        <p className="opstack-label">
          Your team <small>makes the judgment calls</small>
        </p>
        <ul className="opstack-chips">
          {team.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
