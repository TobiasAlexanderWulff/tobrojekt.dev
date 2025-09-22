import { getCollection } from 'astro:content';
import { getLatestCommitDate } from "~/lib/github";
import { defaultLocale, localizePath, locales } from "~/lib/i18n";

type SitemapEntry = {
  path: string;
  lastmod?: string;
};

/**
 * Generate a localized sitemap that favors project metadata and external GitHub
 * commit timestamps when available. Astro calls this handler at build time.
 */
export async function GET({ site }: { site: URL }) {
  const projects = await getCollection('projects');
  const tags = await getCollection('tags');

  // Pre-fetch external updated dates for projects with GitHub metadata
  const externalUpdated = new Map<string, string>();
  await Promise.all(
    projects.map(async (p) => {
      const gh = (p.data as any).external?.github as { repo?: string; branch?: string } | undefined;
      if (gh?.repo) {
        const dt = await getLatestCommitDate(gh.repo, gh.branch ?? 'main');
        if (dt) externalUpdated.set(p.slug, dt);
      }
    })
  );

  const projectLastmod = (p: (typeof projects)[number]) =>
    externalUpdated.get(p.slug) ??
    p.data.dates?.updated ??
    p.data.dates?.completed ??
    p.data.dates?.created ??
    undefined;

  const entries: SitemapEntry[] = [];

  const staticPaths = ['/', '/projects', '/tags', '/search'];
  for (const path of staticPaths) {
    entries.push({ path });
  }

  for (const p of projects) {
    if (p.data.visibility === 'private') continue;
    const lastmod = projectLastmod(p);
    entries.push({
      path: `/projects/${p.slug}`,
      lastmod: lastmod ? new Date(lastmod).toISOString() : undefined,
    });
  }

  for (const t of tags) {
    entries.push({ path: `/tags/${t.data.id}` });
  }

  const xmlItems = entries
    .map((entry) => {
      const localized = locales.map((locale) => ({
        locale,
        href: new URL(localizePath(entry.path, locale), site).href,
      }));
      const defaultHref =
        localized.find((item) => item.locale === defaultLocale)?.href ??
        new URL(entry.path, site).href;
      const lastmodTag = entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : '';
      const alternateLinks =
        localized
          .map(
            (item) =>
              `<xhtml:link rel="alternate" hreflang="${item.locale}" href="${item.href}" />`
          )
          .join('') +
        `<xhtml:link rel="alternate" hreflang="x-default" href="${defaultHref}" />`;
      return `<url><loc>${defaultHref}</loc>${lastmodTag}${alternateLinks}</url>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${xmlItems}</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
