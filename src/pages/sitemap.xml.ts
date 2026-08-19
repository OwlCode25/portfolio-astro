import type { APIRoute } from "astro";

/** Indexable routes. /success is excluded — it is noindex and disallowed. */
const ROUTES = ["/", "/contact"];

export const GET: APIRoute = ({ site }) => {
  const absolute = (path: string) =>
    site ? new URL(path, site).href : path;

  const urls = ROUTES.map((path) => `  <url>\n    <loc>${absolute(path)}</loc>\n  </url>`).join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
};
