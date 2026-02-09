import { z } from 'astro/zod';
import rawSiteConfig from '../../config/site.json';

const socialLinkSchema = z.object({
  platform: z.string(),
  url: z.string().url(),
});

const navItemSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const siteConfigSchema = z.object({
  siteName: z.string(),
  tagline: z.string().optional(),
  description: z.string().optional(),
  owner: z.object({
    name: z.string(),
    url: z.string().url().optional(),
    social: z.array(socialLinkSchema).default([]).optional(),
  }),
  primaryNavigation: z.array(navItemSchema).default([]).optional(),
  socialLinks: z.array(socialLinkSchema).default([]).optional(),
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;
export type SiteNavItem = z.infer<typeof navItemSchema>;

export const siteConfig: SiteConfig = siteConfigSchema.parse(rawSiteConfig);

export function getPrimaryNavigation(): SiteNavItem[] {
  return Array.isArray(siteConfig.primaryNavigation) ? siteConfig.primaryNavigation : [];
}
