import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hero } from "../content/home";
import { site } from "../content/site";

export const alt = `${site.name}: ${site.category}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Site-wide share image, generated at build time from the category line and
 * the homepage headline. The logo is the canonical app/icon.png, unchanged.
 */
export default async function OpenGraphImage() {
  const logo = await readFile(join(process.cwd(), "app/icon.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#05080F",
          backgroundImage: "radial-gradient(circle at 78% 0%, rgba(78, 132, 190, 0.32) 0%, rgba(5, 8, 15, 0) 55%)",
          color: "#EAEFF6",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <img src={logoSrc} width={64} height={64} alt="" style={{ borderRadius: 14 }} />
          <span style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>{site.name}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <span style={{ fontSize: 24, color: "#8AC8FF", letterSpacing: 3, textTransform: "uppercase" }}>
            {site.category}
          </span>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 66, fontWeight: 700, lineHeight: 1.06, letterSpacing: -2 }}>
            <span style={{ color: "#7C889B" }}>{hero.title}</span>
            <span>{hero.titleStrong}</span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(170, 196, 230, 0.18)", paddingTop: 24 }}>
          <span style={{ fontSize: 26, color: "#A9B5C6" }}>{site.domain}</span>
          <span style={{ fontSize: 26, color: "#A9B5C6" }}>{hero.micro}</span>
        </div>
      </div>
    ),
    size,
  );
}
