import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "../../components/CtaBand";
import { BookButton } from "../../components/Cta";
import DemoMedia from "../../components/DemoMedia";
import Faq from "../../components/Faq";
import JsonLd from "../../components/JsonLd";
import { ProductView } from "../../components/ProductViews";
import { demoChapters, demoFaq, demoVideo } from "../../content/demo";
import { demoVideoJsonLd, pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Nexaio demo: how it works for roofing companies",
  absoluteTitle: true,
  description:
    "See how Nexaio handles a new roofing inquiry, an estimate that goes quiet and a customer who needs a person, step by step on sample data.",
  path: "/demo",
});

export default function DemoPage() {
  const videoLd = demoVideoJsonLd(demoVideo);

  return (
    <>
      {videoLd ? <JsonLd data={videoLd} /> : null}

      <section className="phero" aria-labelledby="demo-page-title">
        <div className="phero-bg" aria-hidden="true">
          <div className="glow glow-1" />
          <div className="grid-lines" />
        </div>
        <div className="wrap">
          <p className="eyebrow">Product demo</p>
          <h1 className="h1" id="demo-page-title">
            See how Nexaio keeps every roofing lead and estimate moving
          </h1>
          <p className="lede">
            Follow a sample roofing company through a new inquiry, an estimate
            that goes quiet and a customer who needs a person. Every screen uses
            sample data.
          </p>
          <div className="cta-row cta-row--center">
            <BookButton variant="primary" withArrow />
            <Link className="btn btn-secondary" href="#chapters-title">
              Go to the steps
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--dark section--tight">
        <div className="wrap wrap--narrow">
          <DemoMedia headingId="demo-media-title" />
        </div>
      </section>

      <section className="section section--white" aria-labelledby="chapters-title">
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">Step by step</p>
            <h2 className="h2" id="chapters-title">
              What the walkthrough covers
            </h2>
            <p className="lede">
              Five moments from a normal week, shown on a demonstration workspace.
              Timing, wording and who gets what are all set by you during setup.
            </p>
          </div>

          <nav className="chapter-nav reveal" aria-label="Demo steps">
            {demoChapters.map((c, i) => (
              <Link key={c.id} href={`#${c.id}`}>
                <span className="chapter-nav-num">{String(i + 1).padStart(2, "0")}</span>
                {c.title}
              </Link>
            ))}
          </nav>

          <div className="workflows">
            {demoChapters.map((c, i) => (
              <article
                className={`workflow reveal${i % 2 === 1 ? " workflow--flip" : ""}`}
                id={c.id}
                key={c.id}
                aria-labelledby={`${c.id}-title`}
              >
                <div className="workflow-copy">
                  <p className="workflow-step">Step {String(i + 1).padStart(2, "0")}</p>
                  <h3 className="h3 workflow-title" id={`${c.id}-title`}>
                    {c.title}
                  </h3>
                  <p>{c.summary}</p>
                  <ul className="checklist">
                    {c.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
                <div className="workflow-visual">
                  <ProductView visual={c.visual} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {demoVideo ? (
        <section className="section section--light" aria-labelledby="transcript-title">
          <div className="wrap wrap--narrow">
            <h2 className="h2" id="transcript-title">
              Video transcript
            </h2>
            <div className="transcript">
              {demoVideo.transcript.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section section--light" aria-labelledby="demo-faq-title">
        <div className="wrap faq-wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">About this demo</p>
            <h2 className="h2" id="demo-faq-title">
              Good to know
            </h2>
            <p className="lede">
              Want the details on setup? Read{" "}
              <Link href="/process" className="text-link">
                how it works
              </Link>
              .
            </p>
          </div>
          <Faq items={demoFaq} />
        </div>
      </section>

      <CtaBand
        bookOnly
        title="See it on your own workflow"
        body="On a walkthrough we show you the product live and look at where your leads and estimates slip today."
      />
    </>
  );
}
