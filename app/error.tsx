"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="phero phero--full">
      <div className="phero-bg" aria-hidden="true">
        <div className="glow glow-1" />
        <div className="grid-lines" />
      </div>
      <div className="wrap">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="h1">Let’s try that again.</h1>
        <p className="lede">
          Something unexpected happened on our end. Try again, or head back home.
        </p>
        <div className="cta-row cta-row--center">
          <button type="button" className="btn btn-primary" onClick={() => reset()}>
            Try again
          </button>
          <Link className="btn btn-secondary" href="/">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
