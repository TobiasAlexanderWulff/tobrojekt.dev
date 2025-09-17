import { defineCollection, z } from 'astro:content';

const localizedString = z.union([
  z.string(),
  z.object({
    en: z.string(),
    de: z.string().optional(),
  }),
]);

const linkSchema = z.object({
  rel: z.enum(['source', 'demo', 'docs', 'related', 'other']).optional().default('other'),
  label: z.string().optional(),
  url: z.string().url(),
  icon: z.string().optional(), // Optional override/icon path or URL
});

const imageSchema = z.object({
  src: z.string(),
  alt: z.string(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
});

const mediaSchema = z
  .object({
    social_card: imageSchema.optional(),
    images: z.array(imageSchema).default([]).optional(),
  })
  .optional();

const datesSchema = z
  .object({
    created: z.string().optional(),
    updated: z.string().optional(),
    started: z.string().optional(),
    completed: z.string().optional(),
  })
  .optional();

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    title: localizedString,
    summary: localizedString,
    description: localizedString.optional(),
    status: z.enum(['planned', 'active', 'completed', 'archived']).default('active').optional(),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]).optional(),
    roles: z.array(z.string()).default([]).optional(),
    skills: z.array(z.string()).default([]).optional(),
    links: z.array(linkSchema).default([]),
    media: mediaSchema,
    dates: datesSchema,
    metrics: z
      .object({
        stars: z.number().nonnegative().optional(),
        downloads: z.number().nonnegative().optional(),
        users: z.number().nonnegative().optional(),
      })
      .partial()
      .optional(),
    featured: z.boolean().default(false).optional(),
    priority: z.number().int().nonnegative().optional(),
    visibility: z.enum(['public', 'private']).default('public').optional(),
    external: z
      .object({
        github: z
          .object({
            repo: z.string(), // e.g., "owner/repo"
            branch: z.string().default('main').optional(),
          })
          .optional(),
      })
      .optional(),
  }),
});

const tags = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    label: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { projects, tags };
