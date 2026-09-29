import type { Metadata } from "next";
import Link from "next/link";
import { CtaPair, DemoButton } from "../components/Cta";
import CtaBand from "../components/CtaBand";
import Faq from "../components/Faq";
import FitSection from "../components/FitSection";
import Icon, { type IconName } from "../components/Icon";
import JsonLd from "../components/JsonLd";
import { OpportunityBoard, ProductView } from "../components/ProductViews";
import { demoChapters, demoVideo } from "../content/demo";
import {
  closing,
  control,
  demoTeaser,
  faq,
  hero,
  onboarding,
  product,
  slip,
} from "../content/home";
import { site } from "../content/site";
import { bookCta } from "../lib/cta";
import { homeJsonLd, pageMetadata } from "../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: `${site.name} — ${site.category}`,
  absoluteTitle: true,
  description: site.description,
  path: "/",
});

const slipIcons: IconName[] = ["clock", "owner", "estimate", "handoff", "layers", "eye"];
const controlIcons: IconName[] = ["sliders", "people", "record", "lock"];

export default function Home() {
  return (
    <>
      <JsonLd data={homeJsonLd()} />

      {/* HERO */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-bg" aria-hidden="true">
          <div className="glow glow-1" />
          <div className="glow glow-2" />
          <div className="grid-lines" />
        </div>
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{hero.eyebrow}</p>
            <h1 className="display" id="hero-title">
              {hero.title}
            </h1>
            <p className="lede hero-lede">{hero.lede}</p>
            <CtaPair />
            <ul className="assurances">
              {hero.assurances.map((a) => (
                <li key={a}>
                  <Icon name="check" size={16} />
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div className="hero-visual">
            <OpportunityBoard />
          </div>
        </div>
      </section>

      {/* WHERE OPPORTUNITIES SLIP */}
      <section className="section section--light" aria-labelledby="slip-title">
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">{slip.eyebrow}</p>
            <h2 className="h2" id="slip-title">
              {slip.title}
            </h2>
            <p className="lede">{slip.lede}</p>
          </div>
          <ul className="grid-3">
            {slip.points.map((p, i) => (
              <li className="tile reveal" key={p.title}>
                <span className="tile-icon">
                  <Icon name={slipIcons[i % slipIcons.length]} size={22} />
                </span>
                <h3 className="h3">{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ul>
          <p className="honesty reveal">{slip.honesty}</p>
        </div>
      </section>

      {/* WHAT NEXAIO DOES */}
      <section className="section section--white" id="product" aria-labelledby="product-title">
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">{product.eyebrow}</p>
            <h2 className="h2" id="product-title">
              {product.title}
            </h2>
            <p className="lede">{product.lede}</p>
          </div>
          <div className="workflows">
            {product.workflows.map((w, i) => (
              <article
                className={`workflow reveal${i % 2 === 1 ? " workflow--flip" : ""}`}
                key={w.id}
                id={w.id}
              >
                <div className="workflow-copy">
                  <p className="workflow-step">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="h3 workflow-title">{w.title}</h3>
                  <p>{w.body}</p>
                </div>
                <div className="workflow-visual">
                  <ProductView visual={w.visual} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WORKS WITH WHAT YOU HAVE */}
      <FitSection id="fit" />

      {/* CONTROL */}
      <section className="section section--light" aria-labelledby="control-title">
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">{control.eyebrow}</p>
            <h2 className="h2" id="control-title">
              {control.title}
            </h2>
          </div>
          <ul className="grid-4">
            {control.points.map((p, i) => (
              <li className="tile reveal" key={p.title}>
                <span className="tile-icon">
                  <Icon name={controlIcons[i % controlIcons.length]} size={22} />
                </span>
                <h3 className="h3">{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* DEMO TEASER */}
      <section className="section section--dark" aria-labelledby="demo-title">
        <div className="wrap teaser">
          <div className="teaser-copy reveal">
            <p className="eyebrow">{demoTeaser.eyebrow}</p>
            <h2 className="h2" id="demo-title">
              {demoTeaser.title}
            </h2>
            <p className="lede">{demoTeaser.body}</p>
            {!demoVideo ? (
              <p className="teaser-note">
                The narrated video is being recorded. Until it’s published, the
                demo page walks through each step with sample screens.
              </p>
            ) : null}
            <div className="cta-row">
              <DemoButton variant="primary" />
            </div>
          </div>
          <ol className="teaser-steps reveal">
            {demoChapters.map((c, i) => (
              <li key={c.id}>
                <Link href={`/demo#${c.id}`}>
                  <span className="teaser-num">{String(i + 1).padStart(2, "0")}</span>
                  <span>{c.title}</span>
                  <Icon name="arrow" size={16} className="teaser-arrow" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* WHAT HAPPENS NEXT */}
      <section className="section section--white" id="how-it-works" aria-labelledby="next-title">
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">{onboarding.eyebrow}</p>
            <h2 className="h2" id="next-title">
              {onboarding.title}
            </h2>
          </div>
          <ol className="steps">
            {onboarding.steps.map((s, i) => (
              <li className="step reveal" key={s.title}>
                <span className="step-num">{i + 1}</span>
                <h3 className="h3">{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
          <p className="fine reveal">
            {onboarding.timing}{" "}
            <Link href="/process" className="text-link">
              How setup works
            </Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--light" id="faq" aria-labelledby="faq-title">
        <div className="wrap faq-wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">Questions</p>
            <h2 className="h2" id="faq-title">
              Straight answers
            </h2>
            <p className="lede">
              Still unsure? <Link href={bookCta.href} className="text-link">Book a walkthrough</Link>{" "}
              and ask us directly.
            </p>
          </div>
          <Faq items={faq} />
        </div>
      </section>

      <CtaBand title={closing.title} body={closing.body} />
    </>
  );
}
