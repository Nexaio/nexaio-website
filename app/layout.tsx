import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MobileCtaBar from "../components/MobileCtaBar";
import Motion from "../components/Motion";
import { site } from "../content/site";
import { isIndexable } from "../lib/seo";

// Geist for the site, Geist Mono for labels, Inter inside the recreated
// product views (the product itself is set in Inter).
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

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
  themeColor: "#05080F",
  colorScheme: "dark",
};

// Marks the document as scripted before first paint, so entrance animations
// only ever apply when they can also finish (see "Motion" in globals.css).
const jsFlag = "document.documentElement.classList.add('js')";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The inline script adds a class to <html> before hydration.
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body className={`${geist.variable} ${geistMono.variable} ${inter.variable}`}>
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
