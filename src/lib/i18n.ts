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
  };
  nav: {
    home: string;
    projects: string;
    tags: string;
    search: string;
  };
  footer: {
    rights: string;
  };
  homepage: {
    heroTitle: string;
    heroIntro: string;
    featuredHeading: string;
    featuredEmpty: string;
    recentHeading: string;
    recentEmpty: string;
  };
  projectsIndex: {
    heading: string;
    metaDescription: string;
  };
  projectDetail: {
    status: string;
    started: string;
    created: string;
    completed: string;
    updated: string;
    inlineDemoFallback: string;
    openDemo: string;
    statusLabels: Record<'planned' | 'active' | 'completed' | 'archived', string>;
  };
  tagsIndex: {
    heading: string;
    metaDescription: string;
    detailTitle: (label: string) => string;
    detailMetaTitle: (label: string) => string;
    detailMetaDescription: (label: string) => string;
    empty: string;
  };
  search: {
    heading: string;
    metaDescription: string;
  };
};

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
    },
    nav: {
      home: 'Home',
      projects: 'Projects',
      tags: 'Tags',
      search: 'Search',
    },
    footer: {
      rights: 'All rights reserved.',
    },
    homepage: {
      heroTitle: 'Hello, I’m Tobias',
      heroIntro:
        'This is my evolving home for projects. Featured work appears below; explore the full list on the Projects page.',
      featuredHeading: 'Featured Projects',
      featuredEmpty: 'No featured projects yet.',
      recentHeading: 'Recently Added',
      recentEmpty: 'No recent projects yet.',
    },
    projectsIndex: {
      heading: 'Projects',
      metaDescription: 'All public projects',
    },
    projectDetail: {
      status: 'Status',
      started: 'Started',
      created: 'Created',
      completed: 'Completed',
      updated: 'Updated',
      inlineDemoFallback: 'If the demo fails to load in your browser, open it in a new tab:',
      openDemo: 'Open demo',
      statusLabels: {
        planned: 'Planned',
        active: 'Active',
        completed: 'Completed',
        archived: 'Archived',
      },
    },
    tagsIndex: {
      heading: 'Tags',
      metaDescription: 'Browse projects by tag',
      detailTitle: (label: string) => `Tag: ${label}`,
      detailMetaTitle: (label: string) => `${label} – Tags`,
      detailMetaDescription: (label: string) => `Projects tagged ${label}`,
      empty: 'No projects with this tag yet.',
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
    },
    nav: {
      home: 'Start',
      projects: 'Projekte',
      tags: 'Tags',
      search: 'Suche',
    },
    footer: {
      rights: 'Alle Rechte vorbehalten.',
    },
    homepage: {
      heroTitle: 'Hallo, ich bin Tobias',
      heroIntro:
        'Dies ist mein stetig wachsendes Zuhause für Projekte. Hervorgehobene Arbeiten findest du unten; die vollständige Liste steht auf der Projekte-Seite.',
      featuredHeading: 'Ausgewählte Projekte',
      featuredEmpty: 'Noch keine ausgewählten Projekte.',
      recentHeading: 'Kürzlich hinzugefügt',
      recentEmpty: 'Noch keine neuen Projekte.',
    },
    projectsIndex: {
      heading: 'Projekte',
      metaDescription: 'Alle öffentlichen Projekte',
    },
    projectDetail: {
      status: 'Status',
      started: 'Begonnen',
      created: 'Erstellt',
      completed: 'Abgeschlossen',
      updated: 'Aktualisiert',
      inlineDemoFallback: 'Wenn die Demo in deinem Browser nicht geladen wird, öffne sie in einem neuen Tab:',
      openDemo: 'Demo öffnen',
      statusLabels: {
        planned: 'Geplant',
        active: 'Aktiv',
        completed: 'Abgeschlossen',
        archived: 'Archiviert',
      },
    },
    tagsIndex: {
      heading: 'Tags',
      metaDescription: 'Projekte nach Tags durchsuchen',
      detailTitle: (label: string) => `Schlagwort: ${label}`,
      detailMetaTitle: (label: string) => `${label} – Tags`,
      detailMetaDescription: (label: string) => `Projekte mit dem Schlagwort ${label}`,
      empty: 'Noch keine Projekte mit diesem Schlagwort.',
    },
    search: {
      heading: 'Suche',
      metaDescription: 'Projekte und Seiten durchsuchen',
    },
  },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDictionary(locale: string | undefined): Dictionary {
  if (locale && isLocale(locale)) {
    return dictionaries[locale];
  }
  return dictionaries[defaultLocale];
}

export function resolveLocale(locale: string | undefined): Locale {
  return isLocale(locale ?? '') ? (locale as Locale) : defaultLocale;
}

export function resolveLocalizedValue<T>(value: LocalizedValue<T> | undefined, locale: Locale): T | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }
  if (typeof value !== 'object') {
    return value as T;
  }

  const localized = value[locale];
  if (localized !== undefined) {
    return localized;
  }

  const fallback = value[defaultLocale];
  if (fallback !== undefined) {
    return fallback;
  }

  const first = Object.values(value).find((entry) => entry !== undefined);
  return first;
}

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
