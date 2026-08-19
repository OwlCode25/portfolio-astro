import type { APIRoute } from "astro";

// Served from here rather than public/ so the domain comes from `site` in
// astro.config.mjs. A static copy is a second place to forget to update.
export const GET: APIRoute = ({ site }) => {
  const sitemap = site ? new URL("sitemap.xml", site).href : "/sitemap.xml";

  return new Response(
    `User-agent: *
Allow: /
Disallow: /success

Sitemap: ${sitemap}
`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
};
