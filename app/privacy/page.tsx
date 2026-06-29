import Image from "next/image";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-nexaio-navy text-nexaio-offwhite">
      {/* Header */}
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/nexaio logo clean.png"
              alt="Nexaio"
              width={32}
              height={32}
              priority
            />
            <span className="text-sm font-semibold tracking-wide text-nexaio-navy">
              Nexaio
            </span>
          </Link>

          <nav className="hidden gap-8 text-sm text-nexaio-navy/70 md:flex">
            <Link href="/" className="hover:text-nexaio-navy">
              Home
            </Link>
            <Link href="/services" className="hover:text-nexaio-navy">
              Services
            </Link>
            <Link href="/process" className="hover:text-nexaio-navy">
              Process
            </Link>
            <Link href="/story" className="hover:text-nexaio-navy">
              Our Story
            </Link>
            <Link href="/contact" className="hover:text-nexaio-navy">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section
        className="relative"
        style={{
          backgroundImage: "url(/hero-bg.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-nexaio-navy/60" />

        <div className="relative mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-nexaio-offwhite/55">
              LEGAL
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-6 text-sm text-nexaio-offwhite/70">
              Effective date: June 29, 2026
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-nexaio-offwhite text-nexaio-navy">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <div className="space-y-10 text-base leading-relaxed text-nexaio-navy/80">
            <p>
              Nexaio (&ldquo;Nexaio,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo;
              or &ldquo;our&rdquo;) respects your privacy and is committed to
              protecting the personal information you share with us. This
              Privacy Policy explains what information we collect, how we use
              it, how we share it, and the choices you have. It applies to{" "}
              <a href="https://nexaio.co" className="underline">
                nexaio.co
              </a>{" "}
              and any services, forms, or messaging programs we operate.
            </p>

            <div>
              <h2 className="text-2xl font-semibold text-nexaio-navy">
                Information We Collect
              </h2>
              <p className="mt-4">
                We collect information you provide directly to us, such as your
                name, email address, phone number, company details, and any
                information you include when you contact us, book a call, or
                opt in to receive messages. We may also automatically collect
                limited technical information &mdash; such as device, browser,
                and usage data &mdash; when you visit our website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-nexaio-navy">
                How We Use Your Information
              </h2>
              <p className="mt-4">
                We use the information we collect to respond to your inquiries,
                schedule and conduct calls, provide and improve our services,
                send you service-related and (where you have consented)
                messaging communications, and comply with our legal
                obligations. We do not use your information for purposes
                unrelated to those described in this policy without your
                consent.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-nexaio-navy">
                SMS / Text Messaging
              </h2>
              <p className="mt-4">
                If you opt in to receive text messages from Nexaio, you consent
                to receive SMS/MMS messages at the phone number you provide.
                Message frequency varies. Message and data rates may apply.
                You can opt out at any time by replying{" "}
                <strong>STOP</strong>, and you can reply <strong>HELP</strong>{" "}
                for assistance. Carriers are not liable for delayed or
                undelivered messages.
              </p>
              <p className="mt-4 rounded-2xl border border-black/10 bg-white p-6">
                Mobile information, SMS opt-in data, phone numbers, and SMS
                consent status will not be sold, rented, shared, or transferred
                to third parties or affiliates for marketing or promotional
                purposes. SMS consent data may only be shared with service
                providers as necessary to deliver messaging services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-nexaio-navy">
                How We Share Your Information
              </h2>
              <p className="mt-4">
                We do not sell, rent, or trade your personal information. We may
                share information with trusted service providers who perform
                services on our behalf (such as hosting, scheduling, and
                messaging delivery), only to the extent necessary for them to
                provide those services and under obligations to protect your
                information. We may also disclose information when required by
                law or to protect our rights, safety, or property.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-nexaio-navy">
                Data Retention
              </h2>
              <p className="mt-4">
                We retain personal information only for as long as necessary to
                fulfill the purposes described in this policy, to comply with
                our legal obligations, resolve disputes, and enforce our
                agreements.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-nexaio-navy">
                Data Security
              </h2>
              <p className="mt-4">
                We use reasonable administrative, technical, and physical
                safeguards designed to protect your information. However, no
                method of transmission or storage is completely secure, and we
                cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-nexaio-navy">
                Your Rights and Choices
              </h2>
              <p className="mt-4">
                You may request access to, correction of, or deletion of your
                personal information, and you may opt out of marketing or
                messaging communications at any time. To exercise these rights,
                contact us using the details below. You can stop receiving text
                messages at any time by replying STOP.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-nexaio-navy">
                Children&rsquo;s Privacy
              </h2>
              <p className="mt-4">
                Our website and services are not directed to children under 13,
                and we do not knowingly collect personal information from
                children.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-nexaio-navy">
                Changes to This Policy
              </h2>
              <p className="mt-4">
                We may update this Privacy Policy from time to time. When we do,
                we will revise the &ldquo;Effective date&rdquo; above. Your
                continued use of our website or services after changes are
                posted constitutes acceptance of the updated policy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-nexaio-navy">
                Contact Us
              </h2>
              <p className="mt-4">
                If you have questions about this Privacy Policy or how we handle
                your information, contact us at:
              </p>
              <p className="mt-4">
                Nexaio
                <br />
                Email:{" "}
                <a href="mailto:admin@nexaio.co" className="underline">
                  admin@nexaio.co
                </a>
                <br />
                Phone:{" "}
                <a href="tel:+13853265746" className="underline">
                  +1 (385) 326-5746
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-nexaio-offwhite/60 sm:flex-row">
          <span>© {new Date().getFullYear()} Nexaio</span>
          <div className="flex items-center gap-6">
            <a href="tel:+13853265746" className="hover:text-nexaio-offwhite">
              +1 (385) 326-5746
            </a>
            <Link href="/privacy" className="hover:text-nexaio-offwhite">
              Privacy
            </Link>
            <Link href="/contact" className="hover:text-nexaio-offwhite">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
