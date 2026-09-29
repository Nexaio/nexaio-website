import type { Metadata } from "next";
import { Closing } from "../../components/Cta";
import JsonLd from "../../components/JsonLd";
import MediaSlot from "../../components/MediaSlot";
import { companyClosing, companyHero, facts, mission, principles, why } from "../../content/company";
import { breadcrumbJsonLd, pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Company",
  description:
    "Why Nexaio exists and how we build it: an AI operating layer that runs the work between a business's systems, in the open, with people in charge.",
  path: "/company",
});

export default function CompanyPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Company", path: "/company" }])} />

      <section className="page-hero" aria-labelledby="company-title">
        <div className="hero-field" aria-hidden="true" />
        <div className="wrap">
          <div className="hero-copy">
            <p className="eyebrow enter d1">{companyHero.eyebrow}</p>
            <h1 className="h1 enter d1" id="company-title">
              <span className="display-line">{companyHero.title}</span>{" "}
              <span className="display-line dim">{companyHero.titleDim}</span>
            </h1>
            <p className="lede enter d2">{companyHero.lede}</p>
          </div>
          <div className="hero-media enter d3">
            <MediaSlot slot="companyOperations" shape="wide" />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="why-title">
        <div className="wrap split">
          <div className="sec-head" data-reveal style={{ marginBottom: 0 }}>
            <p className="eyebrow">{why.eyebrow}</p>
            <h2 className="h2" id="why-title">
              {why.title}
            </h2>
          </div>
          <div className="why-copy" data-reveal>
            {why.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="principles-title">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <p className="eyebrow">{principles.eyebrow}</p>
            <h2 className="h2" id="principles-title">
              {principles.title}
            </h2>
          </div>
          <ul className="principles" data-reveal>
            {principles.items.map((item) => (
              <li key={item.title}>
                <b>{item.title}</b>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="mission-title">
        <div className="wrap mission" data-reveal>
          <h2 className="eyebrow" id="mission-title">
            {mission.eyebrow}
          </h2>
          <p className="statement">{mission.statement}</p>
        </div>
      </section>

      <section className="section" aria-labelledby="facts-title">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <p className="eyebrow">At a glance</p>
            <h2 className="h2" id="facts-title">
              The facts.
            </h2>
          </div>
          <dl className="facts" data-reveal>
            {facts.map((f) => (
              <div key={f.term}>
                <dt>{f.term}</dt>
                <dd>{f.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Closing title={companyClosing.title} body={companyClosing.body} />
    </>
  );
}
