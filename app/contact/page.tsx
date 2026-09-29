import type { Metadata } from "next";
import Link from "next/link";
import Icon from "../../components/Icon";
import { agenda, bookingCard, contactHero, prepare } from "../../content/contact";
import { contact } from "../../content/site";
import { bookingPage, demoCta } from "../../lib/cta";
import { pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Book a walkthrough",
  description:
    "Book a live Nexaio walkthrough. See the product on sample data and find out whether it fits how your roofing company handles leads and estimates.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="phero phero--left" aria-labelledby="contact-title">
        <div className="phero-bg" aria-hidden="true">
          <div className="glow glow-1" />
          <div className="grid-lines" />
        </div>
        <div className="wrap contact-grid">
          <div className="contact-intro">
            <p className="eyebrow">{contactHero.eyebrow}</p>
            <h1 className="h1" id="contact-title">
              {contactHero.title}
            </h1>
            <p className="lede">{contactHero.lede}</p>
          </div>

          <div className="book-card" id="book">
            <span className="book-card-icon" aria-hidden="true">
              <Icon name="calendar" size={24} />
            </span>
            <h2 className="h3">{bookingCard.title}</h2>
            <p>{bookingCard.body}</p>
            <a
              className="btn btn-primary btn-block"
              href={bookingPage.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {bookingCard.button}
              <Icon name="external" size={18} className="btn-arrow" />
              <span className="sr-only"> (opens {bookingPage.provider} in a new tab)</span>
            </a>
            {bookingPage.pageTitle ? (
              <p className="book-card-note">
                The booking page lists it as a “{bookingPage.pageTitle}”. It’s
                the same walkthrough.
              </p>
            ) : null}
            {contact.responseExpectation ? (
              <p className="book-card-note">{contact.responseExpectation}</p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="section section--white" aria-labelledby="agenda-title">
        <div className="wrap contact-details">
          <div className="reveal">
            <h2 className="h2" id="agenda-title">
              {agenda.title}
            </h2>
            <ol className="agenda">
              {agenda.items.map((item, i) => (
                <li key={item.title}>
                  <span className="step-num">{i + 1}</span>
                  <div>
                    <h3 className="h3">{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="contact-side reveal">
            <div className="side-card">
              <h2 className="h3">{prepare.title}</h2>
              <ul className="checklist">
                {prepare.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>

            <div className="side-card">
              <h2 className="h3">Prefer to look first?</h2>
              <p>
                The demo walks through a new inquiry, an estimate that goes quiet
                and a customer who needs a person, on sample data.
              </p>
              <Link className="btn btn-secondary btn-sm" href={demoCta.href}>
                {demoCta.label}
              </Link>
            </div>

            <div className="side-card">
              <h2 className="h3">Other ways to reach us</h2>
              <ul className="contact-lines">
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
              We use the details you share to schedule and prepare for the call.
              See our{" "}
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
