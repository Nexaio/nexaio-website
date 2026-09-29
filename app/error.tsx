"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="page-hero page-hero--center" aria-labelledby="error-title">
      <div className="hero-field" aria-hidden="true" />
      <div className="wrap">
        <div className="hero-copy">
          <p className="eyebrow">Something went wrong</p>
          <h1 className="h1" id="error-title">
            Let&rsquo;s try that again.
          </h1>
          <p className="lede">Something unexpected happened on our end. Try again, or head back home.</p>
          <div className="cta-row">
            <button type="button" className="btn btn-primary" onClick={() => reset()}>
              Try again
            </button>
            <Link className="btn btn-secondary" href="/">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
