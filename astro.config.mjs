import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  // Drives canonical links and the absolute URLs Open Graph requires.
  site: "https://owlcode.dev",
  integrations: [tailwind()],
  output: "server",
  adapter: vercel({
    webAnalytics: { enabled: true }
  }),
});