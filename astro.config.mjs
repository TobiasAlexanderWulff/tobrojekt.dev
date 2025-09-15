import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

// https://docs.astro.build
export default defineConfig({
  site: 'https://tobrojekt.dev',
  integrations: [mdx(), tailwind()],
});

