import type { Metadata } from "next";
import Link from "next/link";
import AiCore from "../components/AiCore";
import { SystemsStage } from "../components/Compositions";
import { CtaPair } from "../components/Cta";
import ExplainerVideo from "../components/ExplainerVideo";
import Icon from "../components/Icon";
import JsonLd from "../components/JsonLd";
import MediaSlot from "../components/MediaSlot";
import SignalJourney from "../components/SignalJourney";
import { closing, flow, hero, homeServices } from "../content/home";
import { journey } from "../content/journey";
import { industries } from "../content/site";
import { bookCta } from "../lib/cta";
import { homeJsonLd, pageMetadata } from "../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Nexaio — AI agents for home-service businesses",
  description:
    "Your CRM keeps the record. Nexaio's AI agents do the work around it: they respond, follow up, coordinate your team and report what got done.",
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  const roofing = industries.find((i) => i.slug === "roofing");
  return (
    <>
      <JsonLd data={homeJsonLd()} />

      {/* The living field sits behind the whole page (canvas, fixed). The CSS
          hero field underneath stands in without script or canvas. */}
      <AiCore size="hero" state="idle" />

      {/* 1. Hero: the category and the claim over the Quantum Nebula. No product window on Home. */}
      <section className="hero hero--nebula" aria-labelledby="hero-title">
        <div className="hero-field" aria-hidden="true" />
        <div className="hero-scrim" aria-hidden="true" />
        <div className="wrap">
          <div className="hero-copy">
            <p className="eyebrow-pill enter d1">{hero.eyebrow}</p>
            <h1 className="display display--signal enter d1" id="hero-title">
              <span className="display-line dim">{hero.title}</span>{" "}
              <span className="display-line">{hero.titleStrong}</span>
            </h1>
            <div className="hero-sub enter d2">
              <p className="lede">{hero.lede}</p>
              <div className="cta-row" data-hero-ctas="">
                <Link className="btn btn-primary" href={bookCta.href}>
                  {bookCta.label}
                  <Icon name="arrow" size={17} className="btn-arrow" />
                </Link>
                <a className="btn btn-secondary" href={hero.secondaryCta.href}>
                  {hero.secondaryCta.label}
                </a>
              </div>
              <p className="hero-micro">{hero.micro}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="signal-flow" data-signal="">
        {/* 2. The explainer: renders only with a real, approved film. */}
        <ExplainerVideo placement="home" />

        {/* 3. The AI does the routine work; people only get the judgment calls. */}
        <section className="section" id="flow" aria-labelledby="flow-title">
          <div className="wrap">
            <div className="sec-head sec-head--split" data-reveal>
              <div className="stack" style={{ gap: 18 }}>
                <p className="eyebrow">{flow.eyebrow}</p>
                <h2 className="h2" id="flow-title">
                  <span className="display-line">{flow.title}</span>{" "}
                  <span className="display-line dim">{flow.titleDim}</span>
                </h2>
              </div>
              <p className="body">{flow.body}</p>
            </div>
            <div data-reveal>
              <SystemsStage flow={flow} />
            </div>
          </div>
        </section>

        {/* 4. Watch one enquiry. */}
        <section className="section journey-section" id={journey.id} aria-labelledby="journey-title">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <p className="eyebrow">{journey.eyebrow}</p>
              <h2 className="h2" id="journey-title">
                {journey.title}
              </h2>
            </div>
            <div data-reveal>
              <SignalJourney />
            </div>
          </div>
        </section>

        {/* 5. Built for home services: Roofing is the live industry. */}
        <section className="section" aria-labelledby="homes-title">
          <div className="wrap">
            <div className="sec-head sec-head--split" data-reveal>
              <div className="stack" style={{ gap: 18 }}>
                <p className="eyebrow">{homeServices.eyebrow}</p>
                <h2 className="h2" id="homes-title">
                  {homeServices.title}
                </h2>
              </div>
              <p className="body">{homeServices.body}</p>
            </div>
            {roofing ? (
              <Link href={roofing.href} className="industry-card" data-reveal>
                <MediaSlot slot="roofingHero" shape="wide">
                  <div className="industry-copy">
                    <span className="live-badge">{homeServices.live.badge}</span>
                    <p className="eyebrow">{homeServices.live.label}</p>
                    <p className="h3">{homeServices.live.line}</p>
                  </div>
                  <span className="btn btn-secondary">
                    {homeServices.live.link}
                    <Icon name="arrow" size={17} className="btn-arrow" />
                  </span>
                </MediaSlot>
              </Link>
            ) : null}
          </div>
        </section>

        {/* 6. Close, with how getting started works. */}
        <section className="section closing-section" aria-labelledby="closing-title">
          <div className="wrap">
            <div className="closing" data-reveal>
              <h2 className="h2" id="closing-title">
                <span className="display-line">{closing.title}</span>{" "}
                <span className="display-line dim">{closing.titleDim}</span>
              </h2>
              <p className="lede">{closing.body}</p>
              <CtaPair />
            </div>
            <div className="start-strip" data-reveal>
              <h3 className="eyebrow">{closing.stepsTitle}</h3>
              <ol>
                {closing.steps.map((s, i) => (
                  <li key={s.title}>
                    <span className="n">{String(i + 1).padStart(2, "0")}</span>
                    <b>{s.title}</b>
                    <p>{s.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
