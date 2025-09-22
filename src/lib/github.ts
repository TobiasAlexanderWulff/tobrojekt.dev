/**
 * Minimal GitHub API helper to fetch the latest commit date for a branch.
 * Uses unauthenticated requests by default; if `GITHUB_TOKEN` is set in the
 * environment, it will be used to increase rate limits.
 */
export async function getLatestCommitDate(
  repo: string,
  branch: string = 'main'
): Promise<string | null> {
  try {
    const url = new URL(`https://api.github.com/repos/${repo}/commits/${encodeURIComponent(branch)}`);
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github+json',
      'User-Agent': 'tobrojekt.dev-build',
    };
    const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(url, { headers });
    if (!res.ok) return null;
    const json: any = await res.json();
    const date: string | undefined = json?.commit?.committer?.date || json?.commit?.author?.date;
    return date ?? null;
  } catch {
    return null;
  }
}

/** Normalize various date inputs to a YYYY-MM-DD string for sitemap usage. */
export function formatYMD(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return '';
  return d.toISOString().slice(0, 10);
}
