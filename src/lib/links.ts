/** Extract the hostname from a URL string, returning null on invalid input. */
export function parseHost(url: string): string | null {
  try {
    const u = new URL(url);
    return u.hostname;
  } catch {
    return null;
  }
}

/**
 * Build a favicon descriptor for external links, preferring the site's own
 * icon before falling back to DuckDuckGo's cached favicons.
 */
export function faviconFor(url: string): { src: string; fallback?: string; alt: string } {
  const host = parseHost(url);
  if (!host) {
    return { src: '', alt: 'favicon' };
  }
  const primary = `https://${host}/favicon.ico`;
  const fallback = `https://icons.duckduckgo.com/ip3/${host}.ico`;
  return { src: primary, fallback, alt: `${host} favicon` };
}
