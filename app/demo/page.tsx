import type { Metadata } from "next";
import Link from "next/link";
import AiCore from "../../components/AiCore";
import { ViewTag } from "../../components/Compositions";
import { Closing, CtaPair } from "../../components/Cta";
import ExplainerVideo from "../../components/ExplainerVideo";
import Faq from "../../components/Faq";
import JsonLd from "../../components/JsonLd";
import { demoChapters, demoClosing, demoFaq, demoHero } from "../../content/demo";
import { breadcrumbJsonLd, pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Demo",
  description:
    "Follow one sample enquiry through Nexaio's AI agents, from the website form to the monthly report. Five short chapters, illustrated with sample data.",
  path: "/demo",
});

export default function DemoPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Demo", path: "/demo" }])} />

      <section className="page-hero" aria-labelledby="demo-title">
        <div className="hero-field" aria-hidden="true" />
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

      {/* The explainer renders only with a real, approved film (content/media.ts). */}
      <ExplainerVideo placement="demo" />

      <section className="section" aria-labelledby="chapters-title">
        <div className="wrap">
          <div className="sec-head sec-head--split" data-reveal>
            <div className="stack" style={{ gap: 18 }}>
              <p className="eyebrow">The walkthrough</p>
              <h2 className="h2" id="chapters-title">
                One enquiry, five chapters.
              </h2>
            </div>
            <ViewTag>Illustration · sample enquiry</ViewTag>
          </div>
          <ol className="story">
            {demoChapters.map((c, i) => (
              <li className="story-ch" id={c.id} key={c.id} data-reveal>
                <span className="story-node" aria-hidden="true">
                  <AiCore size="xs" state={c.core} />
                </span>
                <div className="story-copy">
                  <span className="chapter-n">Chapter {String(i + 1).padStart(2, "0")}</span>
                  <h3 className="h3 story-title">{c.title}</h3>
                  <p className="body">{c.line}</p>
                  <div className="ai-did">
                    <span className="ai-did-label">What the AI did</span>
                    <ul>
                      {c.aiDid.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ol>
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
