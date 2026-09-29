import type { Metadata } from "next";
import Link from "next/link";
import { Closing, CtaPair } from "../components/Cta";
import { HeroComposition, LayerDiagram, ViewTag } from "../components/Compositions";
import Icon from "../components/Icon";
import JsonLd from "../components/JsonLd";
import MediaSlot from "../components/MediaSlot";
import MotionBeats from "../components/MotionBeats";
import { HandoffView, IntakeView, MessagesView, ProductWindow } from "../components/ProductViews";
import { demoChapters } from "../content/demo";
import { beats, closing, hero, industriesTeaser, layer, shift, start } from "../content/home";
import { homeJsonLd, pageMetadata } from "../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Nexaio — The AI operating layer for service businesses",
  description:
    "Keep your CRM. Nexaio adds the AI operating layer that follows up, coordinates handoffs and shows your team what needs them.",
  path: "/",
  absoluteTitle: true,
});

const beatViews = {
  intake: (
    <ProductWindow section="intake" description="the Intake page, listing each enquiry, where it came from and what happened to it">
      <IntakeView />
    </ProductWindow>
  ),
  messages: (
    <ProductWindow section="messages" description="a follow-up conversation that stopped when the customer replied">
      <MessagesView />
    </ProductWindow>
  ),
  handoff: (
    <ProductWindow section="dashboard" description="work handed to a named person, and the monthly report">
      <HandoffView withReport />
    </ProductWindow>
  ),
};

export default function Home() {
  return (
    <>
      <JsonLd data={homeJsonLd()} />

      {/* 1. Hero: the claim, then the product. */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-field" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="wrap">
          <div className="hero-copy">
            <p className="eyebrow enter d1">{hero.eyebrow}</p>
            <h1 className="display enter d1" id="hero-title">
              <span className="display-line">{hero.title}</span>{" "}
              <span className="display-line dim">{hero.titleDim}</span>
            </h1>
            <p className="lede enter d2">{hero.lede}</p>
            <div className="enter d2">
              <CtaPair hero />
            </div>
          </div>
          <div className="hero-stage">
            <HeroComposition />
          </div>
        </div>
      </section>

      {/* 2. Your systems → Nexaio → your team. */}
      <section className="section" aria-labelledby="layer-title">
        <div className="wrap">
          <div className="sec-head sec-head--split" data-reveal>
            <div className="stack" style={{ gap: 18 }}>
              <p className="eyebrow">{layer.eyebrow}</p>
              <h2 className="h2" id="layer-title">
                {layer.title}
              </h2>
            </div>
            <p className="body">{layer.body}</p>
          </div>
          <div data-reveal>
            <LayerDiagram systems={layer.systems} team={layer.team} />
          </div>
        </div>
      </section>

      {/* 3. The product in three beats. */}
      <section className="section" id="product" aria-labelledby="beats-title">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <p className="eyebrow">{beats.eyebrow}</p>
            <h2 className="h2" id="beats-title">
              {beats.title}
            </h2>
          </div>
          <MotionBeats beats={beats.items.map((b) => ({ ...b, view: beatViews[b.view] }))} />
          <div className="beats-foot" data-reveal>
            <ViewTag />
            <Link className="text-link" href="/product">
              Everything Nexaio does
            </Link>
          </div>
        </div>
      </section>

      {/* 4. What changes. */}
      <section className="section" aria-labelledby="shift-title">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <p className="eyebrow">{shift.eyebrow}</p>
            <h2 className="h2" id="shift-title">
              {shift.title}
            </h2>
          </div>
          <ul className="shift" data-reveal>
            {shift.rows.map((r) => (
              <li key={r.q}>
                <span className="q">{r.q}</span>
                <Icon name="arrow" size={20} className="arrow" />
                <span className="a">{r.a}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Industries: roofing first. */}
      <section className="section" aria-labelledby="industries-title">
        <div className="wrap">
          <div className="sec-head sec-head--split" data-reveal>
            <div className="stack" style={{ gap: 18 }}>
              <p className="eyebrow">{industriesTeaser.eyebrow}</p>
              <h2 className="h2" id="industries-title">
                {industriesTeaser.title}
              </h2>
            </div>
            <p className="body">{industriesTeaser.note}</p>
          </div>
          <Link href="/industries/roofing" className="industry-card" data-reveal>
            <MediaSlot slot="roofingHero" shape="wide">
              <div className="industry-copy">
                <p className="eyebrow">{industriesTeaser.roofing.label}</p>
                <p className="h3">{industriesTeaser.roofing.line}</p>
              </div>
              <span className="btn btn-secondary">
                {industriesTeaser.roofing.link}
                <Icon name="arrow" size={17} className="btn-arrow" />
              </span>
            </MediaSlot>
          </Link>
        </div>
      </section>

      {/* 6. See the demo, and how getting started works. */}
      <section className="section" aria-labelledby="start-title">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <p className="eyebrow">{start.eyebrow}</p>
            <h2 className="h2" id="start-title">
              {start.title}
            </h2>
          </div>
          <div className="split">
            <div className="panel" data-reveal>
              <h3 className="h3">{start.demoTitle}</h3>
              <p className="body" style={{ marginTop: 8 }}>
                {start.demoBody}
              </p>
              <ol className="chapters">
                {demoChapters.map((c, i) => (
                  <li key={c.id}>
                    <Link href={`/demo#${c.id}`}>
                      <span className="n">{String(i + 1).padStart(2, "0")}</span>
                      <span>{c.title}</span>
                      <Icon name="arrow" size={16} />
                    </Link>
                  </li>
                ))}
              </ol>
              <Link className="btn btn-secondary" href="/demo" style={{ marginTop: 22 }}>
                {start.demoLink}
              </Link>
            </div>
            <div data-reveal>
              <h3 className="h3">{start.stepsTitle}</h3>
              <ol className="steps" style={{ marginTop: 18 }}>
                {start.steps.map((s, i) => (
                  <li key={s.title}>
                    <span className="n">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <b>{s.title}</b>
                      <p>{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Close. */}
      <Closing title={closing.title} body={closing.body} />
    </>
  );
}
