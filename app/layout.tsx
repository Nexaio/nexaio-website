import type { Metadata, Viewport } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MobileCtaBar from "../components/MobileCtaBar";
import Motion from "../components/Motion";
import { site } from "../content/site";
import { isIndexable } from "../lib/seo";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const defaultTitle = `${site.name} — ${site.category}`;

// Site-wide defaults. Every page sets its own title, description, canonical
// and Open Graph fields through pageMetadata() in lib/seo.ts.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: defaultTitle,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  robots: isIndexable
    ? { index: true, follow: true }
    : { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    title: defaultTitle,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: site.description,
  },
  // Numbers in the sample product views must not turn into phone links.
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0B1F32",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sora.className}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileCtaBar />
        <Motion />
        <Analytics />
      </body>
    </html>
  );
}
