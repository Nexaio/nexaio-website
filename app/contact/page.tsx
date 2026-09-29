import type { Metadata } from "next";
import Link from "next/link";
import Icon from "../../components/Icon";
import JsonLd from "../../components/JsonLd";
import { agenda, bookingCard, contactHero, lookFirst, prepare } from "../../content/contact";
import { contact } from "../../content/site";
import { bookingPage, demoCta } from "../../lib/cta";
import { breadcrumbJsonLd, pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Book a walkthrough",
  description:
    "Book a Nexaio walkthrough. See the product on sample data and find out whether it fits how your business handles enquiries, follow-up and handoffs.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Book a walkthrough", path: "/contact" }])} />

      <section className="page-hero" aria-labelledby="contact-title">
        <div className="hero-field" aria-hidden="true" />
        <div className="wrap page-hero-grid">
          <div className="hero-copy">
            <p className="eyebrow enter d1">{contactHero.eyebrow}</p>
            <h1 className="h1 enter d1" id="contact-title">
              <span className="display-line">{contactHero.title}</span>{" "}
              <span className="display-line dim">{contactHero.titleDim}</span>
            </h1>
            <p className="lede enter d2">{contactHero.lede}</p>
          </div>

          <div className="book enter d3" id="book">
            <span className="book-icon" aria-hidden="true">
              <Icon name="calendar" size={22} />
            </span>
            <h2 className="h3">{bookingCard.title}</h2>
            <p>{bookingCard.body}</p>
            <a className="btn btn-primary" href={bookingPage.href} target="_blank" rel="noopener noreferrer">
              {bookingCard.button}
              <Icon name="external" size={17} className="btn-arrow" />
              <span className="sr-only"> (opens {bookingPage.provider} in a new tab)</span>
            </a>
            {bookingPage.pageTitle ? (
              <p className="note">
                The booking page lists it as a &ldquo;{bookingPage.pageTitle}&rdquo;. It&rsquo;s the same
                walkthrough.
              </p>
            ) : null}
            {contact.responseExpectation ? <p className="note">{contact.responseExpectation}</p> : null}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="agenda-title">
        <div className="wrap split">
          <div data-reveal>
            <h2 className="h2" id="agenda-title">
              {agenda.title}
            </h2>
            <ol className="steps" style={{ marginTop: 28 }}>
              {agenda.items.map((item, i) => (
                <li key={item.title}>
                  <span className="n">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <b>{item.title}</b>
                    <p>{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="side" data-reveal>
            <div className="panel">
              <h2 className="h3">{prepare.title}</h2>
              <ul className="points">
                {prepare.items.map((item) => (
                  <li key={item}>
                    <Icon name="check" size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="panel">
              <h2 className="h3">{lookFirst.title}</h2>
              <p>{lookFirst.body}</p>
              <div>
                <Link className="btn btn-secondary btn-sm" href={demoCta.href}>
                  {demoCta.label}
                </Link>
              </div>
            </div>

            <div className="panel">
              <h2 className="h3">Other ways to reach us</h2>
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
              We use the details you share to schedule and prepare for the call. See our{" "}
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
