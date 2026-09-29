import Link from "next/link";
import { bookCta, demoCta } from "../lib/cta";
import Icon from "./Icon";

/**
 * The two calls to action, in priority order: book a walkthrough, then see
 * (or, once a real video is published, watch) the demo. `hero` marks the row
 * the mobile action bar waits for.
 */
export function CtaPair({
  hero = false,
  showDemo = true,
  centered = false,
}: {
  hero?: boolean;
  showDemo?: boolean;
  centered?: boolean;
}) {
  return (
    <div className={`cta-row${centered ? " cta-row--center" : ""}`} data-hero-ctas={hero ? "" : undefined}>
      <Link className="btn btn-primary" href={bookCta.href}>
        {bookCta.label}
        <Icon name="arrow" size={17} className="btn-arrow" />
      </Link>
      {showDemo ? (
        <Link className="btn btn-secondary" href={demoCta.href}>
          {demoCta.label}
        </Link>
      ) : null}
    </div>
  );
}

/** Closing band used at the end of main pages. */
export function Closing({
  title,
  body,
  showDemo = true,
}: {
  title: string;
  body: string;
  showDemo?: boolean;
}) {
  return (
    <section className="section closing-section" aria-labelledby="closing-title">
      <div className="wrap closing" data-reveal>
        <h2 className="h2" id="closing-title">
          {title}
        </h2>
        <p className="lede">{body}</p>
        <CtaPair showDemo={showDemo} />
      </div>
    </section>
  );
}
