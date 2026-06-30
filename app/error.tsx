"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section
      className="phero"
      style={{ minHeight: "72vh", display: "flex", alignItems: "center" }}
    >
      <div className="phero-bg">
        <div className="glow glow-1" />
        <div className="grid-lines" />
      </div>
      <div className="wrap">
        <p className="eyebrow">Something went wrong</p>
        <h1>
          Let&apos;s try that <span className="grad">again.</span>
        </h1>
        <p className="lede">
          Something unexpected happened on our end — it&apos;s not you. Try
          again, or head back home.
        </p>
        <div className="hero-cta" style={{ justifyContent: "center" }}>
          <button className="btn btn-primary" onClick={() => reset()}>
            <span>Try again</span>
          </button>
          <Link className="btn btn-ghost" href="/">
            <span>Back to home</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
