import type { MetadataRoute } from "next";
import { site } from "../content/site";
import { isIndexable } from "../lib/seo";

/** Production is crawlable and points to the sitemap; preview deployments are not. */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
