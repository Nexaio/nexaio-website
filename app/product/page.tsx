import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Closing, CtaPair } from "../../components/Cta";
import { ViewTag } from "../../components/Compositions";
import Faq from "../../components/Faq";
import Icon from "../../components/Icon";
import JsonLd from "../../components/JsonLd";
import {
  CrmMapView,
  DashboardView,
  HandoffView,
  IntakeView,
  MessagesView,
  ProductWindow,
} from "../../components/ProductViews";
import {
  capabilities,
  control,
  fit,
  productClosing,
  productFaq,
  productHero,
  setup,
  stays,
  type CapabilityView,
} from "../../content/product";
import { breadcrumbJsonLd, pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Product",
  description:
    "Nexaio is an AI operating layer, not another CRM. It captures enquiries, runs follow-up, hands judgment calls to people and shows what needs your team.",
  path: "/product",
});

const views: Record<CapabilityView, ReactNode> = {
  intake: (
    <ProductWindow
      section="intake"
      rail={false}
      description="the Intake page, listing each enquiry, where it came from and what happened to it"
    >
      <IntakeView />
    </ProductWindow>
  ),
  messages: (
    <ProductWindow section="messages" rail={false} description="a follow-up conversation that stopped when the customer replied">
      <MessagesView />
    </ProductWindow>
  ),
  handoff: (
    <ProductWindow section="dashboard" rail={false} description="work handed to a named person with the conversation attached">
      <HandoffView />
    </ProductWindow>
  ),
  crm: (
    <ProductWindow section="settings" rail={false} description="the Pipeline stages settings, mapping your stage names to what they mean to Nexaio">
      <CrmMapView />
    </ProductWindow>
  ),
};

export default function ProductPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Product", path: "/product" }])} />

      <section className="page-hero" aria-labelledby="product-title">
        <div className="hero-field" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
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
          <div className="page-hero-visual enter d3" data-loop>
            <ProductWindow
              section="dashboard"
              rail={false}
              description="the dashboard with the panels Nexaio is working, Needs your team, Today and Recently changed"
            >
              <DashboardView />
            </ProductWindow>
            <ViewTag />
            <p className="meta" style={{ margin: 0 }}>
              {productHero.visualCaption}
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="stays-title">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <p className="eyebrow">{stays.eyebrow}</p>
            <h2 className="h2" id="stays-title">
              {stays.title}
            </h2>
          </div>
          <div className="stays" data-reveal>
            <div>
              <p className="eyebrow">Stays yours</p>
              <ul>
                {stays.yours.map((item) => (
                  <li key={item}>
                    <Icon name="check" size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="adds">
              <p className="eyebrow">Nexaio adds</p>
              <ul>
                {stays.adds.map((item) => (
                  <li key={item}>
                    <Icon name="plus" size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="capabilities" aria-labelledby="caps-title">
        <div className="wrap">
          <div className="sec-head sec-head--split" data-reveal>
            <div className="stack" style={{ gap: 18 }}>
              <p className="eyebrow">{capabilities.eyebrow}</p>
              <h2 className="h2" id="caps-title">
                {capabilities.title}
              </h2>
            </div>
            <ViewTag />
          </div>
          <div className="caps">
            {capabilities.items.map((c) => (
              <article key={c.id} id={c.id} className="cap" data-reveal>
                {views[c.view]}
                <div className="cap-copy">
                  <h3 className="h3">{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              </article>
            ))}
          </div>
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
