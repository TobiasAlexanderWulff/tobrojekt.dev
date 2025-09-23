import type { Dictionary } from '~/lib/i18n';

/**
 * Known link relations exposed in project content. Keep this list small and
 * opinionated – it drives schema validation, localization, and icon defaults.
 */
export const linkTypeList = [
  'demo',
  'docs',
  'github',
  'source',
  'related',
  'other',
] as const;

export type LinkType = (typeof linkTypeList)[number];

const defaultLinkType: LinkType = 'other';

export type LinkTypeConfig = {
  labelKey: LinkType;
  icon?: {
    light: string;
    dark?: string;
  };
  inheritsFrom?: LinkType;
};

const linkTypeRegistry: Record<LinkType, LinkTypeConfig> = {
  demo: {
    labelKey: 'demo',
  },
  docs: {
    labelKey: 'docs',
  },
  github: {
    labelKey: 'github',
    icon: {
      light: '/icons/github-light.svg',
      dark: '/icons/github-dark.svg',
    },
  },
  source: {
    labelKey: 'source',
    inheritsFrom: 'github',
  },
  related: {
    labelKey: 'related',
  },
  other: {
    labelKey: 'other',
  },
};

function resolveLinkTypeConfig(type: LinkType): LinkTypeConfig {
  const config = linkTypeRegistry[type] ?? linkTypeRegistry[defaultLinkType];
  if (config.inheritsFrom) {
    const parent = resolveLinkTypeConfig(config.inheritsFrom);
    return {
      ...parent,
      ...config,
      icon: config.icon ?? parent.icon,
    };
  }
  return config;
}

export function isLinkType(value: string | null | undefined): value is LinkType {
  if (!value) return false;
  return (linkTypeList as readonly string[]).includes(value);
}

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

export type ProjectLinkInput = {
  rel?: string | null;
  label?: string | null;
  url: string;
  icon?: string | null;
  iconDark?: string | null;
};

export type ResolvedProjectLink = {
  href: string;
  rel: LinkType;
  label: string;
  ariaLabel: string;
  icon: {
    light: string;
    dark: string;
    alt: string;
    fallback?: string;
    onError?: string;
  };
};

export function resolveProjectLink(
  link: ProjectLinkInput,
  dictionary: Dictionary
): ResolvedProjectLink {
  const rel = normalizeRel(link.rel);
  const config = resolveLinkTypeConfig(rel);
  const fallback = faviconFor(link.url);

  const lightFromConfig = config.icon?.light;
  const darkFromConfig = config.icon?.dark ?? lightFromConfig;

  const iconLight = link.icon ?? lightFromConfig ?? fallback.src;
  const iconDark = link.iconDark ?? darkFromConfig ?? iconLight;

  const label = link.label ?? dictionary.links[rel] ?? dictionary.links[defaultLinkType] ?? link.url;
  const ariaLabel = label;

  let fallbackSrc: string | undefined;
  if (!link.icon && !link.iconDark && !config.icon?.light && fallback.fallback) {
    fallbackSrc = fallback.fallback;
  }

  const onError = fallbackSrc
    ? `this.onerror=null;this.dataset.themeSrcLight='${fallbackSrc}';this.dataset.themeSrcDark='${fallbackSrc}';this.src='${fallbackSrc}'`
    : undefined;

  return {
    href: link.url,
    rel,
    label,
    ariaLabel,
    icon: {
      light: iconLight,
      dark: iconDark,
      alt: label,
      fallback: fallbackSrc,
      onError,
    },
  };
}

function normalizeRel(rel: string | null | undefined): LinkType {
  if (!rel) {
    return defaultLinkType;
  }
  const lower = rel.toLowerCase();
  if (isLinkType(lower)) {
    return lower;
  }
  return defaultLinkType;
}
