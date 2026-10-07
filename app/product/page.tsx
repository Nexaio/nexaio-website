import type { Metadata } from "next";
import type { ReactNode } from "react";
import AiCore from "../../components/AiCore";
import { CrmSplit, ProductDetail } from "../../components/Compositions";
import { Closing, CtaPair } from "../../components/Cta";
import Faq from "../../components/Faq";
import Icon from "../../components/Icon";
import JsonLd from "../../components/JsonLd";
import { MessagesView, ProductWindow, ReportView } from "../../components/ProductViews";
import {
  control,
  fit,
  jobs,
  productClosing,
  productFaq,
  productHero,
  setup,
  split,
  type JobFragment,
} from "../../content/product";
import { breadcrumbJsonLd, pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Product",
  description:
    "Nexaio's AI agents work around your CRM: they respond to enquiries, follow up, coordinate your team, hand off judgment calls and report what got done.",
  path: "/product",
});

/** The two small product fragments this page allows (V2.2 packet §2). */
const fragments: Record<Exclude<JobFragment, null>, ReactNode> = {
  messages: (
    <ProductWindow section="messages" rail={false} description="a follow-up conversation that stopped when the customer replied">
      <MessagesView />
    </ProductWindow>
  ),
  report: (
    <ProductWindow section="reports" rail={false} description="the monthly report: what Nexaio did, what it confirmed and what it does not measure">
      <ReportView />
    </ProductWindow>
  ),
};

export default function ProductPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Product", path: "/product" }])} />

      <section className="page-hero" aria-labelledby="product-title">
        <div className="hero-field" aria-hidden="true" />
        <div className="wrap page-hero-grid">
          <div className="hero-copy">
            <p className="eyebrow enter d1">{productHero.eyebrow}</p>
            <h1 className="h1 enter d1" id="product-title">
              <span className="display-line">{productHero.title}</span>{" "}
              <span className="display-line dim">{productHero.titleDim}</span>
            </h1>
            <p className="lede enter d2">{productHero.lede}</p>
            <div className="enter d2">
              <CtaPair hero />
            </div>
          </div>
          <div className="page-hero-core enter d3">
            <AiCore size="lg" state="working" />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="split-title">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <p className="eyebrow">{split.eyebrow}</p>
            <h2 className="h2" id="split-title">
              {split.title}
            </h2>
          </div>
          <div data-reveal>
            <CrmSplit crm={split.crm} ai={split.ai} />
          </div>
        </div>
      </section>

      <section className="section" id="jobs" aria-labelledby="jobs-title">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <p className="eyebrow">{jobs.eyebrow}</p>
            <h2 className="h2" id="jobs-title">
              {jobs.title}
            </h2>
          </div>
          <ol className="jobs">
            {jobs.items.map((job, i) => (
              <li key={job.id} id={job.id} className={`job${job.fragment ? " job--frag" : ""}`} data-reveal>
                <AiCore size="sm" state={job.core} />
                <div className="job-copy">
                  <span className="job-n">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="h3">{job.title}</h3>
                  <p>{job.body}</p>
                </div>
                {job.fragment ? <ProductDetail>{fragments[job.fragment]}</ProductDetail> : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="control-title">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <p className="eyebrow">{control.eyebrow}</p>
            <h2 className="h2" id="control-title">
              {control.title}
            </h2>
          </div>
          <ul className="trust" data-reveal>
            {control.points.map((pt) => (
              <li key={pt.title}>
                <b>{pt.title}</b>
                <p>{pt.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="fit-title">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <p className="eyebrow">{fit.eyebrow}</p>
            <h2 className="h2" id="fit-title">
              {fit.title}
            </h2>
          </div>
          <div className="fit" data-reveal>
            {fit.columns.map((col) => (
              <div key={col.title} className={col.tone}>
                <h3>{col.title}</h3>
                {"note" in col && col.note ? <p>{col.note}</p> : null}
                <ul>
                  {col.items.map((item) => (
                    <li key={item}>
                      <Icon
                        name={col.tone === "yes" ? "check" : col.tone === "scoped" ? "scope" : "minus"}
                        size={16}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="how-it-works" aria-labelledby="setup-title">
        <div className="wrap split">
          <div className="sec-head" data-reveal style={{ marginBottom: 0 }}>
            <p className="eyebrow">{setup.eyebrow}</p>
            <h2 className="h2" id="setup-title">
              {setup.title}
            </h2>
            <p className="body">{setup.timing}</p>
          </div>
          <ol className="steps" data-reveal>
            {setup.steps.map((s, i) => (
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
      </section>

      <section className="section" aria-labelledby="product-faq-title">
        <div className="wrap split">
          <div className="sec-head" data-reveal style={{ marginBottom: 0 }}>
            <p className="eyebrow">Questions</p>
            <h2 className="h2" id="product-faq-title">
              Straight answers.
            </h2>
          </div>
          <div data-reveal>
            <Faq items={productFaq} />
          </div>
        </div>
      </section>

      <Closing title={productClosing.title} body={productClosing.body} />
    </>
  );
}
