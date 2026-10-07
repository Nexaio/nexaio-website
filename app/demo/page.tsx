import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Closing, CtaPair } from "../../components/Cta";
import { ViewTag } from "../../components/Compositions";
import Faq from "../../components/Faq";
import Icon from "../../components/Icon";
import JsonLd from "../../components/JsonLd";
import {
  DashboardView,
  HandoffView,
  IntakeView,
  MessagesView,
  ProductWindow,
  ReportView,
} from "../../components/ProductViews";
import {
  demoChapters,
  demoClosing,
  demoFaq,
  demoHero,
  demoVideo,
  type DemoChapterView,
} from "../../content/demo";
import { breadcrumbJsonLd, demoVideoJsonLd, pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Demo",
  description:
    "Follow one enquiry through Nexaio, from arrival to the monthly report. Five chapters, recreated from the product with sample data. No sign-up needed.",
  path: "/demo",
});

const chapterViews: Record<DemoChapterView, ReactNode> = {
  intake: (
    <ProductWindow
      section="intake"
      context="roofing"
      description="the Intake page, listing each enquiry, where it came from and what happened to it"
    >
      <IntakeView />
    </ProductWindow>
  ),
  dashboard: (
    <ProductWindow
      section="dashboard"
      context="roofing"
      description="the dashboard with the panels Nexaio is working, Needs your team, Today and Recently changed"
    >
      <DashboardView context="roofing" />
    </ProductWindow>
  ),
  messages: (
    <ProductWindow
      section="messages"
      context="roofing"
      description="an estimate follow-up that stopped when the homeowner replied"
    >
      <MessagesView context="roofing" />
    </ProductWindow>
  ),
  handoff: (
    <ProductWindow
      section="dashboard"
      context="roofing"
      description="an insurance question handed to a named person with the history attached"
    >
      <HandoffView context="roofing" />
    </ProductWindow>
  ),
  report: (
    <ProductWindow
      section="reports"
      context="roofing"
      description="the monthly report: what Nexaio did, what it confirmed and what it does not measure"
    >
      <ReportView />
    </ProductWindow>
  ),
};

export default function DemoPage() {
  const videoLd = demoVideoJsonLd(demoVideo);
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Demo", path: "/demo" }])} />
      {videoLd ? <JsonLd data={videoLd} /> : null}

      <section className="page-hero" aria-labelledby="demo-title">
        <div className="hero-field" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="wrap">
          <div className="hero-copy">
            <p className="eyebrow enter d1">{demoHero.eyebrow}</p>
            <h1 className="h1 enter d1" id="demo-title">
              <span className="display-line">{demoHero.title}</span>{" "}
              <span className="display-line dim">{demoHero.titleDim}</span>
            </h1>
            <p className="lede enter d2">{demoHero.lede}</p>
            <div className="enter d2">
              <CtaPair hero showDemo={false} />
            </div>
          </div>
          <nav className="chapter-index enter d3" aria-label="Demo chapters">
            <ol>
              {demoChapters.map((c, i) => (
                <li key={c.id}>
                  <a href={`#${c.id}`}>
                    <span className="n">{String(i + 1).padStart(2, "0")}</span>
                    <span>{c.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {/* The video section exists only once a real, approved video is set in
          content/demo.ts. Until then nothing stands in for it. */}
      {demoVideo ? (
        <section className="section" aria-labelledby="video-title" style={{ paddingTop: 0 }}>
          <div className="wrap split" style={{ alignItems: "center" }}>
            <video
              className="video-player"
              controls
              preload="metadata"
              poster={demoVideo.poster}
              aria-labelledby="video-title"
            >
              <source src={demoVideo.src} type={demoVideo.mimeType} />
              <track kind="captions" src={demoVideo.captionsSrc} srcLang="en" label="English" default />
            </video>
            <div className="stack" style={{ gap: 18 }}>
              <h2 className="h3" id="video-title">
                {demoVideo.title}
              </h2>
              <p className="body">{demoVideo.description}</p>
              <details className="faq-item">
                <summary className="faq-q">
                  <span>Transcript</span>
                  <Icon name="plus" size={18} className="faq-icon" />
                </summary>
                {demoVideo.transcript.map((para) => (
                  <p className="faq-a" key={para}>
                    {para}
                  </p>
                ))}
              </details>
            </div>
          </div>
        </section>
      ) : null}

      <section className="section" aria-labelledby="chapters-title">
        <div className="wrap">
          <div className="sec-head sec-head--split" data-reveal>
            <div className="stack" style={{ gap: 18 }}>
              <p className="eyebrow">The walkthrough</p>
              <h2 className="h2" id="chapters-title">
                One enquiry, five chapters.
              </h2>
            </div>
            <p className="body">
              The example follows a sample roofing company, Nexaio&rsquo;s first industry. Every screen is a
              recreation of the product with sample data, not a live account.
            </p>
          </div>
          <div>
            {demoChapters.map((c, i) => (
              <article className="chapter" id={c.id} key={c.id} aria-labelledby={`${c.id}-title`}>
                <div className="chapter-copy" data-reveal>
                  <span className="chapter-n">Chapter {String(i + 1).padStart(2, "0")}</span>
                  <h3 className="h2 chapter-title" id={`${c.id}-title`}>
                    {c.title}
                  </h3>
                  <p className="body">{c.summary}</p>
                  <ul className="points">
                    {c.points.map((pt) => (
                      <li key={pt}>
                        <Icon name="check" size={16} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="chapter-visual" data-reveal>
                  {chapterViews[c.view]}
                  <ViewTag />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="demo-faq-title">
        <div className="wrap split">
          <div className="sec-head" data-reveal style={{ marginBottom: 0 }}>
            <p className="eyebrow">Questions</p>
            <h2 className="h2" id="demo-faq-title">
              About this demo.
            </h2>
            <p className="body">
              Want the product itself?{" "}
              <Link className="text-link" href="/contact">
                Book a walkthrough
              </Link>
              .
            </p>
          </div>
          <div data-reveal>
            <Faq items={demoFaq} />
          </div>
        </div>
      </section>

      <Closing title={demoClosing.title} body={demoClosing.body} showDemo={false} />
    </>
  );
}
