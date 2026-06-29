import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Motion from "../components/Motion";

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nexaio.co"),
  title: {
    default: "Nexaio — Operational automation built to scale",
    template: "%s — Nexaio",
  },
  description:
    "Nexaio designs and owns automation systems that keep operations clean, reliable, and scalable as businesses grow.",
  openGraph: {
    title: "Nexaio — Operational automation built to scale",
    description:
      "Automation systems designed and owned for reliability as you scale.",
    url: "https://nexaio.co",
    siteName: "Nexaio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexaio — Operational automation built to scale",
    description:
      "Automation systems designed and owned for reliability as you scale.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sora.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <Motion />
        <Analytics />
      </body>
    </html>
  );
}
