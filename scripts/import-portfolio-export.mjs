#!/usr/bin/env node
/**
 * Import projects from portfolio-export/<slug>/project.json
 * and generate MDX files under src/content/projects/<slug>.mdx.
 * Copies media to public/projects/<slug>/ and rewrites paths.
 *
 * Usage:
 *   node scripts/import-portfolio-export.mjs            # import all
 *   node scripts/import-portfolio-export.mjs --slug foo # import one
 *   node scripts/import-portfolio-export.mjs --force    # overwrite existing MDX
 */
import { promises as fs } from 'fs';
import path from 'path';

const repoRoot = process.cwd();
const exportRoot = path.join(repoRoot, 'portfolio-export');
const contentRoot = path.join(repoRoot, 'src', 'content', 'projects');
const publicRoot = path.join(repoRoot, 'public', 'projects');

const args = new Map();
for (let i = 2; i < process.argv.length; i++) {
  const a = process.argv[i];
  if (a === '--force') args.set('force', true);
  else if (a === '--slug') args.set('slug', process.argv[++i]);
}

function toYaml(value, indent = 0) {
  const pad = '  '.repeat(indent);
  if (value === null || value === undefined) return 'null';
  if (typeof value === 'string') {
    // Quote strings that contain special characters
    if (/[:\-\[\]{}#&,>*!|>'"%@`]/.test(value) || value.trim() !== value) {
      return JSON.stringify(value);
    }
    return value;
  }
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    return '\n' + value.map((v) => pad + '- ' + toYaml(v, indent + 1)).join('\n');
  }
  if (typeof value === 'object') {
    const entries = Object.entries(value).filter(([, v]) => v !== undefined);
    if (entries.length === 0) return '{}';
    return '\n' + entries.map(([k, v]) => pad + `${k}: ` + toYaml(v, indent + 1)).join('\n');
  }
  return JSON.stringify(value);
}

function mapLinks(linksObj) {
  if (!linksObj || typeof linksObj !== 'object') return [];
  const arr = [];
  const mapping = ['source', 'demo', 'docs'];
  for (const key of mapping) {
    if (linksObj[key]) arr.push({ rel: key, url: linksObj[key] });
  }
  if (Array.isArray(linksObj.related)) {
    for (const r of linksObj.related) {
      if (r && r.url) arr.push({ rel: 'related', url: r.url, label: r.label });
    }
  }
  return arr;
}

async function copyMedia(slug, media) {
  if (!media) return { social_card: undefined, images: [] };
  const destDir = path.join(publicRoot, slug);
  await fs.mkdir(destDir, { recursive: true });

  const rewrite = async (entry) => {
    if (!entry || !entry.src) return undefined;
    const srcPath = path.join(exportRoot, slug, entry.src);
    const filename = path.basename(entry.src);
    const destPath = path.join(destDir, filename);
    try {
      await fs.copyFile(srcPath, destPath);
    } catch (err) {
      console.warn(`[warn] Media not copied (missing?): ${srcPath}`);
    }
    return { ...entry, src: `/projects/${slug}/${filename}` };
  };

  const social = media.cover ? await rewrite(media.cover) : undefined;
  const images = Array.isArray(media.images)
    ? (await Promise.all(media.images.map((img) => rewrite(img)))).filter(Boolean)
    : [];
  return { social_card: social, images };
}

function ghExternalFromId(id) {
  if (typeof id === 'string' && id.startsWith('gh:')) {
    const repo = id.slice(3);
    if (repo.includes('/')) return { github: { repo } };
  }
  return undefined;
}

function buildFrontmatter(data, mappedLinks, mediaOut) {
  // Order keys to match collection expectations and keep diffs tidy
  const fm = {
    id: data.id,
    title: data.title,
    summary: data.summary,
    status: data.status,
    tags: data.tags || [],
    categories: data.categories || [],
    roles: data.roles || [],
    skills: data.skills || [],
    links: mappedLinks,
    media: {
      ...(mediaOut.social_card ? { social_card: mediaOut.social_card } : {}),
      ...(mediaOut.images && mediaOut.images.length ? { images: mediaOut.images } : {}),
    },
    dates: data.dates,
    metrics: data.metrics && Object.keys(data.metrics).length ? data.metrics : undefined,
    featured: !!data.featured,
    priority: typeof data.priority === 'number' ? data.priority : undefined,
    visibility: data.visibility || 'public',
    external: ghExternalFromId(data.id),
  };

  // Remove undefined keys to keep YAML clean
  Object.keys(fm).forEach((k) => fm[k] === undefined && delete fm[k]);
  if (fm.media && !Object.keys(fm.media).length) delete fm.media;
  return fm;
}

async function importOne(slug, force = false) {
  const exportDir = path.join(exportRoot, slug);
  const jsonPath = path.join(exportDir, 'project.json');
  const mdxPath = path.join(contentRoot, `${slug}.mdx`);

  const buf = await fs.readFile(jsonPath, 'utf8').catch(() => null);
  if (!buf) {
    console.warn(`[skip] No project.json for slug: ${slug}`);
    return false;
  }
  const data = JSON.parse(buf);

  if (!data.id || !data.slug || !data.title || !data.summary || !data.visibility) {
    throw new Error(`Missing required fields in ${jsonPath}`);
  }

  if (data.slug !== slug) {
    console.warn(`[warn] Slug mismatch: folder=${slug} vs. json=${data.slug} — using folder`);
  }

  const links = mapLinks(data.links);
  const mediaOut = await copyMedia(slug, data.media);
  const frontmatter = buildFrontmatter(data, links, mediaOut);

  const body = (data.description && String(data.description).trim())
    ? String(data.description).trim() + '\n'
    : `${data.title} — imported via portfolio export.\n`;

  const yaml = '---\n' + toYaml(frontmatter).trimStart() + '\n---\n\n' + body;

  try {
    await fs.mkdir(contentRoot, { recursive: true });
    const exists = await fs
      .access(mdxPath)
      .then(() => true)
      .catch(() => false);
    if (exists && !force) {
      console.log(`[keep] ${path.relative(repoRoot, mdxPath)} exists. Use --force to overwrite.`);
      return false;
    }
    await fs.writeFile(mdxPath, yaml, 'utf8');
    console.log(`[ok] Wrote ${path.relative(repoRoot, mdxPath)}`);
    return true;
  } catch (err) {
    throw new Error(`Failed to write MDX for ${slug}: ${err.message}`);
  }
}

async function main() {
  // Ensure roots exist
  await fs.mkdir(exportRoot, { recursive: true });
  await fs.mkdir(publicRoot, { recursive: true });

  const force = !!args.get('force');
  const only = args.get('slug');

  if (only) {
    await importOne(only, force);
    return;
  }

  const entries = await fs.readdir(exportRoot, { withFileTypes: true });
  const slugs = entries.filter((e) => e.isDirectory()).map((e) => e.name);
  if (!slugs.length) {
    console.log(`[info] No exports found in ${path.relative(repoRoot, exportRoot)}.`);
    return;
  }
  for (const slug of slugs) {
    await importOne(slug, force);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

