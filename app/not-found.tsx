import Link from "next/link";
import { demoCta } from "../lib/cta";

export default function NotFound() {
  return (
    <section className="page-hero page-hero--center" aria-labelledby="nf-title">
      <div className="hero-field" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="wrap">
        <div className="hero-copy">
          <p className="eyebrow">404</p>
          <h1 className="h1" id="nf-title">
            This page doesn&rsquo;t exist.
          </h1>
          <p className="lede">It may have moved, or the link may be wrong. Start again from the homepage.</p>
          <div className="cta-row">
            <Link className="btn btn-primary" href="/">
              Back to home
            </Link>
            <Link className="btn btn-secondary" href={demoCta.href}>
              {demoCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
