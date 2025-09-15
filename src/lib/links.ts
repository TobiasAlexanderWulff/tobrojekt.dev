export function parseHost(url: string): string | null {
  try {
    const u = new URL(url);
    return u.hostname;
  } catch {
    return null;
  }
}

export function faviconFor(url: string): { src: string; fallback?: string; alt: string } {
  const host = parseHost(url);
  if (!host) {
    return { src: '', alt: 'favicon' };
  }
  const primary = `https://${host}/favicon.ico`;
  const fallback = `https://icons.duckduckgo.com/ip3/${host}.ico`;
  return { src: primary, fallback, alt: `${host} favicon` };
}

