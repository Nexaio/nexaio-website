import Image from "next/image";
import Link from "next/link";
import { contact, footerNav, site } from "../content/site";
import { bookCta } from "../lib/cta";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <Link href="/" className="brand" aria-label="Nexaio home">
              <Image src="/nexaio-logo-light.png" alt="" width={28} height={28} />
              <span className="brand-name">Nexaio</span>
            </Link>
            <p>
              {site.category}. Nexaio works on top of the systems you already
              use so every lead and estimate has an owner and a next step.
            </p>
            <Link className="btn btn-primary btn-sm" href={bookCta.href}>
              {bookCta.label}
            </Link>
          </div>

          {footerNav.map((group) => (
            <nav className="foot-col" key={group.title} aria-label={group.title}>
              <p className="foot-title">{group.title}</p>
              {group.links.map((l) => (
                <Link key={l.href} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </nav>
          ))}

          <div className="foot-col">
            <p className="foot-title">Get in touch</p>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={`tel:${contact.phone.e164}`}>{contact.phone.display}</a>
          </div>
        </div>

        <div className="foot-bottom">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <span>{site.domain}</span>
        </div>
      </div>
    </footer>
  );
}
