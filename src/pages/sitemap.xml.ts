import { getCollection } from 'astro:content';

export async function GET({ site }: { site: URL }) {
  const projects = await getCollection('projects');
  const tags = await getCollection('tags');

  const urls: string[] = [];

  const add = (path: string) => urls.push(new URL(path, site).href);

  // Core pages
  add('/');
  add('/projects');
  add('/tags');
  add('/search');

  // Project detail pages (public only)
  for (const p of projects) {
    if (p.data.visibility === 'private') continue;
    add(`/projects/${p.slug}`);
  }

  // Tag pages
  for (const t of tags) {
    add(`/tags/${t.data.id}`);
  }

  const projectLastmod = (p: (typeof projects)[number]) =>
    p.data.dates?.updated ?? p.data.dates?.completed ?? p.data.dates?.created ?? undefined;

  const xmlItems = [
    // Static pages (no lastmod)
    ...['/', '/projects', '/tags', '/search'].map((path) =>
      `<url><loc>${new URL(path, site).href}</loc></url>`
    ),
    // Project pages with optional lastmod
    ...projects
      .filter((p) => p.data.visibility !== 'private')
      .map((p) => {
        const loc = new URL(`/projects/${p.slug}`, site).href;
        const lm = projectLastmod(p);
        return `<url><loc>${loc}</loc>${lm ? `<lastmod>${new Date(lm).toISOString()}</lastmod>` : ''}</url>`;
      }),
    // Tag pages (no lastmod)
    ...tags.map((t) => `<url><loc>${new URL(`/tags/${t.data.id}`, site).href}</loc></url>`),
  ].join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${xmlItems}</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

