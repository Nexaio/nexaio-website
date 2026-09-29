import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Closing, CtaPair } from "../../../components/Cta";
import { ViewTag } from "../../../components/Compositions";
import Faq from "../../../components/Faq";
import JsonLd from "../../../components/JsonLd";
import MediaSlot from "../../../components/MediaSlot";
import MotionBeats from "../../../components/MotionBeats";
import {
  ActivityRail,
  CrmMapView,
  HandoffView,
  LeadsView,
  MessagesView,
  ProductWindow,
} from "../../../components/ProductViews";
import {
  moments,
  roofingClosing,
  roofingCrm,
  roofingFaq,
  roofingHero,
  roofingHeroEvents,
  type RoofingMomentView,
} from "../../../content/roofing";
import { breadcrumbJsonLd, pageMetadata } from "../../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Nexaio for roofing companies",
  description:
    "Nexaio keeps every roofing enquiry, estimate and handoff moving, alongside the CRM you already use. Built for storm spikes and estimates that go quiet.",
  path: "/industries/roofing",
});

const momentViews: Record<RoofingMomentView, ReactNode> = {
  dashboard: (
    <div className="moment-media" data-loop>
      <MediaSlot slot="roofingStorm" shape="tall" />
      <div className="activity-card" role="group" aria-label="Example activity on a busy day, sample data">
        <header>
          <span>Activity</span>
          <span>Today</span>
        </header>
        <ActivityRail context="roofing" />
      </div>
    </div>
  ),
  messages: (
    <ProductWindow
      section="messages"
      context="roofing"
      rail={false}
      description="an estimate follow-up that stopped when the homeowner replied, with the insurance question sent to a person"
    >
      <MessagesView context="roofing" />
    </ProductWindow>
  ),
  handoff: (
    <ProductWindow
      section="dashboard"
      context="roofing"
      rail={false}
      description="an insurance question handed to a named person with the history attached"
    >
      <HandoffView context="roofing" />
    </ProductWindow>
  ),
};

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
            <p className="eyebrow enter d1">{roofingHero.eyebrow}</p>
            <h1 className="h1 enter d1" id="roofing-title">
              <span className="display-line">{roofingHero.title}</span>{" "}
              <span className="display-line dim">{roofingHero.titleDim}</span>
            </h1>
            <p className="lede enter d2">{roofingHero.lede}</p>
            <div className="enter d2">
              <CtaPair hero />
            </div>
          </div>
          <div className="hero-media enter d3">
            <MediaSlot slot="roofingHero" shape="wide">
              <ViewTag />
              <div className="toasts" role="group" aria-label="Example events, sample data">
                {roofingHeroEvents.map((e) => (
                  <div className="toast" key={e.title}>
                    <b>{e.title}</b>
                    <span>{e.meta}</span>
                  </div>
                ))}
              </div>
            </MediaSlot>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="moments-title">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <p className="eyebrow">{moments.eyebrow}</p>
            <h2 className="h2" id="moments-title">
              {moments.title}
            </h2>
          </div>
          <MotionBeats
            beats={moments.items.map((m, i) => ({
              id: m.id,
              index: `${String(i + 1).padStart(2, "0")} · ${m.label}`,
              title: m.title,
              body: m.body,
              view: momentViews[m.view],
            }))}
          />
          <div className="beats-foot" data-reveal>
            <ViewTag />
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
            <p className="body">{roofingCrm.leadsBody}</p>
            <p className="meta">{roofingCrm.note}</p>
          </div>
          <div className="chapter-visual" data-reveal>
            <ProductWindow
              section="settings"
              context="roofing"
              rail={false}
              description="the Pipeline stages settings, mapping a roofing company's stage names to what they mean to Nexaio"
            >
              <CrmMapView context="roofing" />
            </ProductWindow>
            <ProductWindow
              section="leads"
              context="roofing"
              rail={false}
              description="the Leads list, showing who owns each lead and whether Nexaio or the team has it"
            >
              <LeadsView />
            </ProductWindow>
            <ViewTag />
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
