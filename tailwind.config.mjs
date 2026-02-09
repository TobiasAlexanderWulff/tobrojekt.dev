import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,md,mdx,js,jsx,ts,tsx,vue,svelte}'],
  theme: {
    extend: {},
  },
  plugins: [typography],
};
