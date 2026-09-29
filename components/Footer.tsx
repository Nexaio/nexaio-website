import Image from "next/image";
import Link from "next/link";
import { contact, footerNav, site } from "../content/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <Link href="/" className="brand" aria-label="Nexaio home">
              <Image src="/nexaio-logo-light.png" alt="" width={24} height={24} />
              <span className="brand-name">Nexaio</span>
            </Link>
            <p>{site.footerLine}</p>
            <div className="foot-contact">
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={`tel:${contact.phone.e164}`}>{contact.phone.display}</a>
            </div>
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
        </div>

        <div className="foot-bottom">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span>{site.domain}</span>
        </div>
      </div>
    </footer>
  );
}
