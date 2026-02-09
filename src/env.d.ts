/// <reference types="astro/client" />

declare global {
  interface Window {
    PagefindUI?: new (options: { element: string; showSubResults?: boolean }) => unknown;
  }
}

export {};
