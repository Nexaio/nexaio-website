import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <Link href="/" className="logo">
              <img src="/nexaio-logo-light.png" alt="Nexaio logo" /> Nexaio
            </Link>
            <p>
              Operational automation systems, designed and owned for reliability
              as you scale.
            </p>
          </div>

          <div className="foot-col">
            <h5>Pages</h5>
            <Link href="/services">Services</Link>
            <Link href="/process">Process</Link>
            <Link href="/story">Our Story</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy Policy</Link>
          </div>

          <div className="foot-col">
            <h5>Get in touch</h5>
            <a href="tel:+13853265746">+1 (385) 326-5746</a>
            <a href="mailto:admin@nexaio.co">admin@nexaio.co</a>
            <Link href="/contact">Book a Systems Review</Link>
          </div>
        </div>

        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} Nexaio. All rights reserved.</span>
          <span>Built to scale, not break.</span>
        </div>
      </div>
    </footer>
  );
}
