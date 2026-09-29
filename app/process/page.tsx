import type { Metadata } from "next";
import { CtaPair } from "../../components/Cta";
import CtaBand from "../../components/CtaBand";
import FitSection from "../../components/FitSection";
import { onboarding } from "../../content/home";
import { afterLaunch, needs, processHero, stages } from "../../content/process";
import { pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "How it works: setup, go-live and ongoing operation",
  description:
    "How Nexaio is set up for a roofing company: walkthrough, scoping, setup tested on sample leads, sign-off, go-live and ongoing operation, plus what we need from you.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <>
      <section className="phero" aria-labelledby="process-title">
        <div className="phero-bg" aria-hidden="true">
          <div className="glow glow-1" />
          <div className="grid-lines" />
        </div>
        <div className="wrap">
          <p className="eyebrow">{processHero.eyebrow}</p>
          <h1 className="h1" id="process-title">
            {processHero.title}
          </h1>
          <p className="lede">{processHero.lede}</p>
          <CtaPair centered />
        </div>
      </section>

      <section className="section section--white" aria-labelledby="stages-title">
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">Stages</p>
            <h2 className="h2" id="stages-title">
              What happens, and what you’ll do
            </h2>
          </div>
          <ol className="stages">
            {stages.map((s, i) => (
              <li className="stage reveal" key={s.title}>
                <div className="stage-head">
                  <span className="step-num">{i + 1}</span>
                  <h3 className="h3">{s.title}</h3>
                </div>
                <div className="stage-body">
                  <div>
                    <p className="stage-label">What happens</p>
                    <p>{s.happens}</p>
                  </div>
                  <div>
                    <p className="stage-label">What you’ll do</p>
                    <p>{s.you}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <p className="fine reveal">{onboarding.timing}</p>
        </div>
      </section>

      <section className="section section--light" aria-labelledby="needs-title">
        <div className="wrap split">
          <div className="reveal">
            <h2 className="h2" id="needs-title">
              {needs.title}
            </h2>
            <ul className="checklist checklist--lg">
              {needs.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <p className="fine">{needs.note}</p>
          </div>
          <div className="side-card reveal">
            <h2 className="h3">{afterLaunch.title}</h2>
            <p>{afterLaunch.body}</p>
          </div>
        </div>
      </section>

      <FitSection />

      <CtaBand
        title="See where Nexaio would fit"
        body="Book a walkthrough and we’ll look at your systems, your lead sources and where things slip today."
      />
    </>
  );
}
