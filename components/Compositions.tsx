import Image from "next/image";
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
 * Hero composition: the business's CRM underneath (an unnamed, dimmed
 * pipeline), the Nexaio dashboard on top, and the activity rail beside it.
 * `data-loop` lets the rail's events and the live dot play while on screen.
 */
export function HeroComposition({ context = "general" }: { context?: Context }) {
  return (
    <div className="comp" data-loop>
      <div className="comp-crm" aria-hidden="true">
        <small>YOUR CRM</small>
        {[5, 3, 4, 2].map((n, i) => (
          <div key={i}>
            {Array.from({ length: n }).map((_, j) => (
              <span key={j} />
            ))}
          </div>
        ))}
      </div>
      <div className="enter d3">
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
      <div className="comp-foot">
        <ViewTag />
        <span className="meta">Recreated from the Nexaio product interface</span>
      </div>
    </div>
  );
}

/** Your systems → Nexaio → your team. Tokens travel along the wires while visible. */
export function LayerDiagram({ systems, team }: { systems: string[]; team: string[] }) {
  return (
    <div className="layer" data-loop>
      <div className="layer-col">
        <p className="eyebrow">Your systems</p>
        {systems.map((s) => (
          <div className="layer-node" key={s}>
            {s}
            <small>stays yours</small>
          </div>
        ))}
      </div>
      <div className="layer-core">
        <header>
          <Image src="/nexaio-logo-light.png" alt="" width={22} height={22} />
          Nexaio
        </header>
        <ul className="layer-ops">
          <li>
            <i className="dot-cobalt" /> Capture and route
          </li>
          <li>
            <i className="dot-moss" /> Follow up on schedule
          </li>
          <li>
            <i className="dot-moss" /> Coordinate the handoffs
          </li>
          <li>
            <i className="dot-gold" /> Surface what needs a person
          </li>
        </ul>
      </div>
      <div className="layer-col">
        <p className="eyebrow">Your team</p>
        {team.map((t) => (
          <div className="layer-node" key={t}>
            {t}
          </div>
        ))}
      </div>
      <span className="layer-wire a" aria-hidden="true" />
      <span className="layer-wire b" aria-hidden="true" />
      <span className="token t1" aria-hidden="true">
        <i className="dot-cobalt" /> new enquiry
      </span>
      <span className="token t2" aria-hidden="true">
        <i className="dot-gold" /> owner: Dana
      </span>
    </div>
  );
}
