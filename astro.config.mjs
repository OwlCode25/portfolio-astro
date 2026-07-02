import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  // TODO: reemplazar con la URL real de producción (habilita canonical, og:url y URLs absolutas de OG).
  // site: "https://TU-DOMINIO",
  integrations: [tailwind()],
  output: "server",
  adapter: vercel({
    webAnalytics: { enabled: true }
  }),
});