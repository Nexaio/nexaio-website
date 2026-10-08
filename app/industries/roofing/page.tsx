import type { Metadata } from "next";
import Link from "next/link";
import AiCore from "../../../components/AiCore";
import { CrmSlab, ViewTag } from "../../../components/Compositions";
import { Closing, CtaPair } from "../../../components/Cta";
import Faq from "../../../components/Faq";
import JsonLd from "../../../components/JsonLd";
import MediaSlot from "../../../components/MediaSlot";
import { roofingClosing, roofingCrm, roofingFaq, roofingHero, roofingHeroEvents, vignettes } from "../../../content/roofing";
import { breadcrumbJsonLd, pageMetadata } from "../../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Nexaio for roofing companies",
  description:
    "Roofing is Nexaio's first trade. AI agents keep every storm enquiry, quiet estimate and insurance handoff moving, alongside the CRM you already run.",
  path: "/industries/roofing",
});

export default function RoofingPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Roofing", path: "/industries/roofing" }])} />

      <section className="page-hero" aria-labelledby="roofing-title">
        <div className="hero-field" aria-hidden="true" />
        <div className="wrap">
          <nav aria-label="Breadcrumb" className="enter d1" style={{ marginBottom: 28 }}>
            <ol className="crumbs">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>Industries</li>
              <li aria-current="page">Roofing</li>
            </ol>
          </nav>
          <div className="hero-copy">
            <p className="eyebrow enter d1">
              {roofingHero.eyebrow} <span className="live-badge">{roofingHero.badge}</span>
            </p>
            <h1 className="h1 enter d1" id="roofing-title">
              {roofingHero.title}
            </h1>
            <p className="lede enter d2">{roofingHero.lede}</p>
            <div className="enter d2">
              <CtaPair hero />
            </div>
          </div>
          <div className="hero-media enter d3">
            <MediaSlot slot="roofingHero" shape="wide">
              <ul className="event-chips" aria-label="Sample events">
                {roofingHeroEvents.map((e) => (
                  <li key={e.title}>
                    <b>{e.title}</b>
                    <span>{e.meta}</span>
                  </li>
                ))}
              </ul>
              <ViewTag>Sample</ViewTag>
            </MediaSlot>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="vignettes-title">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <p className="eyebrow">{vignettes.eyebrow}</p>
            <h2 className="h2" id="vignettes-title">
              {vignettes.title}
            </h2>
          </div>
          <ol className="vignettes">
            {vignettes.items.map((v, i) => (
              <li key={v.id} id={v.id} className="vignette" data-reveal>
                <span className="chapter-n">
                  <AiCore size="xs" state={v.core} /> {String(i + 1).padStart(2, "0")} · {v.label}
                </span>
                <h3 className="h3">{v.title}</h3>
                <p>{v.body}</p>
                <ul className="chip-row" aria-label="What the AI did">
                  {v.chips.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <div className="beats-foot" data-reveal>
            <ViewTag>Sample events</ViewTag>
            <Link className="text-link" href="/demo">
              Follow one roofing enquiry through the demo
            </Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="crm-title">
        <div className="wrap split" style={{ alignItems: "center" }}>
          <div className="sec-head" data-reveal style={{ marginBottom: 0 }}>
            <p className="eyebrow">{roofingCrm.eyebrow}</p>
            <h2 className="h2" id="crm-title">
              {roofingCrm.title}
            </h2>
            <p className="body">{roofingCrm.body}</p>
            <p className="meta">{roofingCrm.note}</p>
          </div>
          <div data-reveal>
            <CrmSlab label={roofingCrm.slab} />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="roofing-faq-title">
        <div className="wrap split">
          <div className="sec-head" data-reveal style={{ marginBottom: 0 }}>
            <p className="eyebrow">Questions</p>
            <h2 className="h2" id="roofing-faq-title">
              Roofing questions, answered.
            </h2>
          </div>
          <div data-reveal>
            <Faq items={roofingFaq} />
          </div>
        </div>
      </section>

      <Closing title={roofingClosing.title} body={roofingClosing.body} />
    </>
  );
}
