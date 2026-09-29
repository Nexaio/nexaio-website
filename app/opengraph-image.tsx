import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hero } from "../content/home";
import { site } from "../content/site";

export const alt = `${site.name}: ${site.category}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Site-wide share image, generated at build time from the approved category line. */
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
          background: "linear-gradient(135deg, #07131F 0%, #0B1F32 55%, #16354F 100%)",
          color: "#F4F6F8",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <img src={logoSrc} width={72} height={72} alt="" style={{ borderRadius: 16 }} />
          <span style={{ fontSize: 44, fontWeight: 700, letterSpacing: -1 }}>{site.name}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <span style={{ fontSize: 26, color: "#9FC7E8", letterSpacing: 3, textTransform: "uppercase" }}>
            {site.category}
          </span>
          <span style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1.5, maxWidth: 980 }}>
            {hero.title}
          </span>
        </div>
        <span style={{ fontSize: 28, color: "#AEB9C4" }}>{site.domain}</span>
      </div>
    ),
    size,
  );
}
