import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import { fileURLToPath } from 'url';

// https://docs.astro.build
export default defineConfig({
  site: 'https://tobrojekt.dev',
  integrations: [mdx(), tailwind()],
  vite: {
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
});
