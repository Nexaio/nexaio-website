import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Nexaio collects, uses, and protects your information, including mobile and SMS data.",
};

export default function PrivacyPage() {
  return (
    <>
      <section className="phero" style={{ textAlign: "left", paddingBottom: 40 }}>
        <div className="phero-bg" data-parallax="0.15">
          <div className="glow glow-1" />
          <div className="grid-lines" />
        </div>
        <div className="wrap">
          <p className="eyebrow">Legal</p>
          <h1 style={{ marginLeft: 0, marginRight: 0 }}>Privacy Policy</h1>
          <p style={{ marginTop: 18, color: "var(--mgray)", fontSize: 14 }}>
            Effective date: June 29, 2026
          </p>
        </div>
      </section>

      <section className="block" style={{ borderTop: "none", paddingTop: 10 }}>
        <div className="wrap">
          <div className="prose" style={{ maxWidth: 760, margin: "0 auto" }}>
            <p>
              Nexaio (&ldquo;Nexaio,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
              &ldquo;our&rdquo;) respects your privacy and is committed to
              protecting the personal information you share with us. This Privacy
              Policy explains what information we collect, how we use it, how we
              share it, and the choices you have. It applies to nexaio.co and any
              services, forms, or messaging programs we operate.
            </p>

            <h2 style={ph}>Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as your
              name, email address, phone number, company details, and any
              information you include when you contact us, book a call, or opt in
              to receive messages. We may also automatically collect limited
              technical information — such as device, browser, and usage data —
              when you visit our website.
            </p>

            <h2 style={ph}>How We Use Your Information</h2>
            <p>
              We use the information we collect to respond to your inquiries,
              schedule and conduct calls, provide and improve our services, send
              you service-related and (where you have consented) messaging
              communications, and comply with our legal obligations. We do not
              use your information for purposes unrelated to those described in
              this policy without your consent.
            </p>

            <h2 style={ph}>SMS / Text Messaging</h2>
            <p>
              If you opt in to receive text messages from Nexaio, you consent to
              receive SMS/MMS messages at the phone number you provide. Message
              frequency varies. Message and data rates may apply. You can opt out
              at any time by replying <strong>STOP</strong>, and you can reply{" "}
              <strong>HELP</strong> for assistance. Carriers are not liable for
              delayed or undelivered messages.
            </p>
            <div
              className="panel"
              style={{ background: "var(--card-2)", margin: "22px 0", padding: "22px 24px" }}
            >
              <p style={{ margin: 0 }}>
                Mobile information, SMS opt-in data, phone numbers, and SMS
                consent status will not be sold, rented, shared, or transferred
                to third parties or affiliates for marketing or promotional
                purposes. SMS consent data may only be shared with service
                providers as necessary to deliver messaging services.
              </p>
            </div>

            <h2 style={ph}>How We Share Your Information</h2>
            <p>
              We do not sell, rent, or trade your personal information. We may
              share information with trusted service providers who perform
              services on our behalf (such as hosting, scheduling, and messaging
              delivery), only to the extent necessary for them to provide those
              services and under obligations to protect your information. We may
              also disclose information when required by law or to protect our
              rights, safety, or property.
            </p>

            <h2 style={ph}>Data Retention</h2>
            <p>
              We retain personal information only for as long as necessary to
              fulfill the purposes described in this policy, to comply with our
              legal obligations, resolve disputes, and enforce our agreements.
            </p>

            <h2 style={ph}>Data Security</h2>
            <p>
              We use reasonable administrative, technical, and physical
              safeguards designed to protect your information. However, no method
              of transmission or storage is completely secure, and we cannot
              guarantee absolute security.
            </p>

            <h2 style={ph}>Your Rights and Choices</h2>
            <p>
              You may request access to, correction of, or deletion of your
              personal information, and you may opt out of marketing or messaging
              communications at any time. To exercise these rights, contact us
              using the details below. You can stop receiving text messages at
              any time by replying STOP.
            </p>

            <h2 style={ph}>Children&apos;s Privacy</h2>
            <p>
              Our website and services are not directed to children under 13, and
              we do not knowingly collect personal information from children.
            </p>

            <h2 style={ph}>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. When we do, we
              will revise the &ldquo;Effective date&rdquo; above. Your continued
              use of our website or services after changes are posted constitutes
              acceptance of the updated policy.
            </p>

            <h2 style={ph}>Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or how we handle
              your information, contact us at:
              <br />
              Nexaio
              <br />
              Email:{" "}
              <a href="mailto:admin@nexaio.co" style={{ color: "var(--accent-2)", textDecoration: "underline" }}>
                admin@nexaio.co
              </a>
              <br />
              Phone:{" "}
              <a href="tel:+13853265746" style={{ color: "var(--accent-2)", textDecoration: "underline" }}>
                +1 (385) 326-5746
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

const ph = {
  fontSize: "22px",
  fontWeight: 600,
  color: "var(--offwhite)",
  margin: "34px 0 0",
} as const;
