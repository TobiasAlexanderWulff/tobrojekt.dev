/**
 * Theme helpers shared between layout bootstrap script and UI toggle.
 */
export const THEME_STORAGE_KEY = 'preferred-theme';
export type Theme = 'light' | 'dark';
export const themes: Theme[] = ['light', 'dark'];

export function isTheme(value: string | null | undefined): value is Theme {
  return value === 'light' || value === 'dark';
}
