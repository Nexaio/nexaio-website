import type { MetadataRoute } from "next";
import { pages, site } from "../content/site";

/** Indexable pages from content/site.ts, with the date their content last changed. */
export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((p) => ({
    url: p.path === "/" ? site.url : `${site.url}${p.path}`,
    lastModified: p.updated,
  }));
}
