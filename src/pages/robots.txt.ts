/** Serve a plain robots.txt pointing crawlers to the generated sitemap. */
export async function GET({ site }: { site: URL }) {
  const sitemapUrl = new URL('sitemap.xml', site).href;
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`;
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
