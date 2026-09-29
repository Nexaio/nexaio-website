import { site } from "../content/site";
import OpenGraphImage from "./opengraph-image";

export const alt = `${site.name}: ${site.category}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Same artwork as the Open Graph image. */
export default OpenGraphImage;
