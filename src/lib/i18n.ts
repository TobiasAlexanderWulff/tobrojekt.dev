/**
 * Locale primitives and helpers used to drive language-aware routing and copy.
 * Prefer consuming through these utilities so UI components stay decoupled
 * from the raw dictionary implementation.
 */
export const locales = ['en', 'de'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';
export const LOCALE_STORAGE_KEY = 'preferred-locale';

export type LocalizedValue<T = string> =
  | T
  | {
      en?: T;
      de?: T;
    };

export type Dictionary = {
  site: {
    name: string;
    description: string;
    languageLabel: string;
    localeNames: Record<Locale, string>;
    toggleAria: string;
    themeToggle: string;
  };
  nav: {
    home: string;
    projects: string;
    blogs: string;
    search: string;
  };
  footer: {
    rights: string;
  };
  links: Record<'demo' | 'docs' | 'github' | 'source' | 'related' | 'other', string>;
  homepage: {
    heroTitle: string;
    heroIntro: string;
    featuredProjectsHeading: string;
    featuredProjectsEmpty: string;
    featuredBlogsHeading: string;
    featuredBlogsEmpty: string;
  };
  projectsIndex: {
    heading: string;
    metaDescription: string;
    description: string;
    recentHeading: string;
    recentEmpty: string;
    allHeading: string;
    allEmpty: string;
  };
  projectDetail: {
    status: string;
    started: string;
    created: string;
    completed: string;
    updated: string;
    inlineDemoFallback: string;
    openDemo: string;
    viewImage: string;
    closeImage: string;
    previousImage: string;
    nextImage: string;
    imageCounterTemplate: string;
    statusLabels: Record<'planned' | 'active' | 'completed' | 'archived', string>;
  };
  blogIndex: {
    heading: string;
    metaDescription: string;
    description: string;
    recentHeading: string;
    recentEmpty: string;
    allHeading: string;
    allEmpty: string;
  };
  search: {
    heading: string;
    metaDescription: string;
  };
};

// In-memory dictionaries kept small so they can be treeshaken by Astro.
const dictionaries: Record<Locale, Dictionary> = {
  en: {
    site: {
      name: 'tobrojekt.dev',
      description: 'Projects hub and portfolio',
      languageLabel: 'Language',
      localeNames: {
        en: 'English',
        de: 'Deutsch',
      },
      toggleAria: 'Change language',
      themeToggle: 'Toggle color theme',
    },
    nav: {
      home: 'Home',
      projects: 'Projects',
      blogs: 'Blogs',
      search: 'Search',
    },
    footer: {
      rights: 'All rights reserved.',
    },
    links: {
      demo: 'Live demo',
      docs: 'Documentation',
      github: 'GitHub',
      source: 'Source code',
      related: 'Related link',
      other: 'External link',
    },
    homepage: {
      heroTitle: 'Hey, I am Tobias',
      heroIntro:
        `I enjoy developing software, especially when data and machine learning are involved. I love the challenge of understanding and mastering complex topics.\n\nOn this page, I collect my projects and experiments. Feel free to take a look around, it's (mostly) tidy.`,
      featuredProjectsHeading: 'Featured Projects',
      featuredProjectsEmpty: 'No featured projects yet.',
      featuredBlogsHeading: 'Featured Blogs',
      featuredBlogsEmpty: 'No featured blogs yet.',
    },
    projectsIndex: {
      heading: 'Projects',
      metaDescription: 'All public projects',
      description: 'Here you can browse all my public projects. Feel free to look around!',
      recentHeading: 'Recently Added',
      recentEmpty: 'No recent projects found.',
      allHeading: 'All projects',
      allEmpty: 'No projects found.',
    },
    projectDetail: {
      status: 'Status',
      started: 'Started',
      created: 'Created',
      completed: 'Completed',
      updated: 'Updated',
      inlineDemoFallback: 'If the demo fails to load in your browser, open it in a new tab:',
      openDemo: 'Open demo',
      viewImage: 'View image',
      closeImage: 'Close image preview',
      previousImage: 'Previous image',
      nextImage: 'Next image',
      imageCounterTemplate: 'Image %current% of %total%',
      statusLabels: {
        planned: 'Planned',
        active: 'Active',
        completed: 'Completed',
        archived: 'Archived',
      },
    },
    blogIndex: {
      heading: 'Blogs',
      metaDescription: 'My blogs all around programming',
      description: 'Here I share my blogs on various programming-related topics.\n\nYou might find something interesting.',
      recentHeading: 'Recently Added',
      recentEmpty: 'No recent blogs found.',
      allHeading: 'All Blogs',
      allEmpty: 'No blogs found.',
    },
    search: {
      heading: 'Search',
      metaDescription: 'Search projects and pages',
    },
  },
  de: {
    site: {
      name: 'tobrojekt.dev',
      description: 'Projektübersicht und Portfolio',
      languageLabel: 'Sprache',
      localeNames: {
        en: 'Englisch',
        de: 'Deutsch',
      },
      toggleAria: 'Sprache ändern',
      themeToggle: 'Farbschema umschalten',
    },
    nav: {
      home: 'Start',
      projects: 'Projekte',
      blogs: 'Blogs',
      search: 'Suche',
    },
    footer: {
      rights: 'Alle Rechte vorbehalten.',
    },
    links: {
      demo: 'Live-Demo',
      docs: 'Dokumentation',
      github: 'GitHub',
      source: 'Quellcode',
      related: 'Verwandter Link',
      other: 'Externer Link',
    },
    homepage: {
      heroTitle: 'Hey, ich bin Tobias',
      heroIntro:
        'Ich entwickle gerne Software, besonders wenn Daten und Machine Learning dabei eine Rolle spielen. Ich liebe die Herausforderung darin, komplexe Themen zu durchdringen und zu meistern.\n\nAuf dieser Seite sammle ich meine Projekte und Experimente. Schau dich gerne um, es ist (meistens) aufgeräumt.',
      featuredProjectsHeading: 'Hervorgehobene Projekte',
      featuredProjectsEmpty: 'Keine hervorgehobenen Projekte.',
      featuredBlogsHeading: 'Hervorgehobene Blogs',
      featuredBlogsEmpty: 'Keine hervorgehobenen Blogs.',
    },
    projectsIndex: {
      heading: 'Projekte',
      metaDescription: 'Alle öffentlichen Projekte',
      description: 'Hier kannst du alle meine öffentlichen Projekte finden. Schau dich gerne um!',
      recentHeading: 'Kürzlich hinzugefügt',
      recentEmpty: 'Keine kürzlich hinzugefügten Projekte gefunden.',
      allHeading: 'Alle Projekte',
      allEmpty: 'Keine Projekte gefunden.',
    },
    projectDetail: {
      status: 'Status',
      started: 'Begonnen',
      created: 'Erstellt',
      completed: 'Abgeschlossen',
      updated: 'Aktualisiert',
      inlineDemoFallback: 'Wenn die Demo in deinem Browser nicht geladen wird, öffne sie in einem neuen Tab:',
      openDemo: 'Demo öffnen',
      viewImage: 'Bild anzeigen',
      closeImage: 'Bildvorschau schließen',
      previousImage: 'Vorheriges Bild',
      nextImage: 'Nächstes Bild',
      imageCounterTemplate: 'Bild %current% von %total%',
      statusLabels: {
        planned: 'Geplant',
        active: 'Aktiv',
        completed: 'Abgeschlossen',
        archived: 'Archiviert',
      },
    },
    blogIndex: {
      heading: 'Blogs',
      metaDescription: 'Hier poste ich meine Blogs',
      description: 'Hier poste ich meine Blogs zu verschiedenen Themen rund ums Programmieren. Vielleicht findest du etwas, das dich interessiert. ',
      recentHeading: 'Kürzlich hinzugefügt',
      recentEmpty: 'Keine kürzlich hinzugefügten Blogs gefunden.',
      allHeading: 'Alle Blogs',
      allEmpty: 'Keine Blogs gefunden.',
    },
    search: {
      heading: 'Suche',
      metaDescription: 'Projekte und Seiten durchsuchen',
    },
  },
};

/**
 * Type guard for locales coming from user input (URL segments, storage, etc.).
 */
export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Return the matching dictionary or fall back to the default language.
 */
export function getDictionary(locale: string | undefined): Dictionary {
  if (locale && isLocale(locale)) {
    return dictionaries[locale];
  }
  return dictionaries[defaultLocale];
}

/**
 * Resolve a safe Locale value from external input.
 */
export function resolveLocale(locale: string | undefined): Locale {
  return isLocale(locale ?? '') ? (locale as Locale) : defaultLocale;
}

/**
 * Expand localized content down to a single value using an explicit locale,
 * falling back to the default language and finally the first available entry.
 */
export function resolveLocalizedValue<T>(value: LocalizedValue<T> | undefined, locale: Locale): T | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }
  if (typeof value !== 'object') {
    return value as T;
  }

  const localized = (value as Record<Locale, T | undefined>)[locale];
  if (localized !== undefined) {
    return localized;
  }

  const fallback = (value as Record<Locale, T | undefined>)[defaultLocale];
  if (fallback !== undefined) {
    return fallback;
  }

  const first = Object.values(value).find((entry) => entry !== undefined);
  return first;
}

/**
 * Remove any non-default locale prefix from a pathname while preserving root.
 */
export function stripLocaleFromPath(pathname: string): string {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  for (const locale of locales) {
    if (locale === defaultLocale) continue;
    const prefix = `/${locale}`;
    if (normalized === prefix) {
      return '/';
    }
    if (normalized.startsWith(`${prefix}/`)) {
      const stripped = normalized.slice(prefix.length);
      return stripped.length ? stripped : '/';
    }
  }
  return normalized || '/';
}

/**
 * Prefix a path with the locale unless it represents the default locale.
 */
export function localizePath(pathname: string, locale: Locale): string {
  const normalized = stripLocaleFromPath(pathname);
  if (locale === defaultLocale) {
    return normalized;
  }
  if (normalized === '/') {
    return `/${locale}`;
  }
  return `/${locale}${normalized}`;
}
