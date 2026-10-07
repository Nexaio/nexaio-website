import type { Metadata } from "next";
import Link from "next/link";
import AiCore from "../../components/AiCore";
import Icon from "../../components/Icon";
import JsonLd from "../../components/JsonLd";
import { contactHero, reach, steps } from "../../content/contact";
import { contact } from "../../content/site";
import { bookingPage } from "../../lib/cta";
import { breadcrumbJsonLd, pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Book a walkthrough",
  description:
    "Book a Nexaio walkthrough: tell us about your business, pick a time on our booking page, and we'll confirm and prepare for your setup.",
  path: "/contact",
});

/**
 * Three steps, framed now (V2.2-A): step 1 says what we'll ask on the call,
 * step 2 opens the real booking page, step 3 says what happens next. This
 * page collects nothing: no form, no inputs, no storage. The form → booking
 * → Outbound pipeline is V2.2-B.
 */
export default function ContactPage() {
  const [tell, pick, confirm] = steps;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Book a walkthrough", path: "/contact" }])} />

      <section className="page-hero" aria-labelledby="contact-title">
        <div className="hero-field" aria-hidden="true" />
        <div className="wrap page-hero-grid">
          <div className="hero-copy">
            <p className="eyebrow enter d1">{contactHero.eyebrow}</p>
            <h1 className="h1 enter d1" id="contact-title">
              {contactHero.title}
            </h1>
            <p className="lede enter d2">{contactHero.lede}</p>
          </div>
          <div className="page-hero-core page-hero-core--calm enter d3">
            <AiCore size="sm" state="listening" />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="journey-steps-title" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <h2 className="sr-only" id="journey-steps-title">
            Three steps
          </h2>
          <ol className="contact-steps">
            <li id={tell.id}>
              <span className="n">01</span>
              <h3 className="h3">{tell.title}</h3>
              <p>{tell.body}</p>
              <ul className="points">
                {(tell.asks ?? []).map((item) => (
                  <li key={item}>
                    <Icon name="check" size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </li>
            <li id={pick.id} className="is-primary">
              <span className="n">02</span>
              <h3 className="h3">{pick.title}</h3>
              <p>{pick.body}</p>
              <a className="btn btn-primary" href={bookingPage.href} target="_blank" rel="noopener noreferrer">
                {pick.button}
                <Icon name="external" size={17} className="btn-arrow" />
                <span className="sr-only"> (opens {bookingPage.provider} in a new tab)</span>
              </a>
              {bookingPage.pageTitle ? (
                <p className="note">
                  It&rsquo;s listed as a &ldquo;{bookingPage.pageTitle}&rdquo;: the same walkthrough.
                </p>
              ) : null}
              {contact.responseExpectation ? <p className="note">{contact.responseExpectation}</p> : null}
            </li>
            <li id={confirm.id}>
              <span className="n">03</span>
              <h3 className="h3">{confirm.title}</h3>
              <p>{confirm.body}</p>
            </li>
          </ol>

          <div className="contact-foot">
            <div>
              <h2 className="eyebrow">{reach.title}</h2>
              <ul className="lines">
                <li>
                  <Icon name="mail" size={18} />
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </li>
                <li>
                  <Icon name="phone" size={18} />
                  <a href={`tel:${contact.phone.e164}`}>{contact.phone.display}</a>
                </li>
              </ul>
            </div>
            <p className="fine">
              We use the details you share to arrange and prepare for the call. See our{" "}
              <Link href="/privacy" className="text-link">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
