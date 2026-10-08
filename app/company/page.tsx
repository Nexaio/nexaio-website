import type { Metadata } from "next";
import { Closing } from "../../components/Cta";
import JsonLd from "../../components/JsonLd";
import MediaSlot from "../../components/MediaSlot";
import { companyClosing, companyHero, facts, mission, principles } from "../../content/company";
import { breadcrumbJsonLd, pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Company",
  description:
    "Nexaio builds AI agents for home-service businesses: AI that does the work around the systems you already run, not more software to manage.",
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
          </div>
          <div className="hero-media enter d3">
            <MediaSlot slot="companyOperations" shape="wide">
              <p className="h3 media-line">{mission.statement}</p>
            </MediaSlot>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="principles-title">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <h2 className="eyebrow" id="principles-title">
              {principles.eyebrow}
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

      <section className="section" aria-labelledby="facts-title">
        <div className="wrap mission" data-reveal>
          <h2 className="eyebrow" id="facts-title">
            At a glance
          </h2>
          <dl className="facts">
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
