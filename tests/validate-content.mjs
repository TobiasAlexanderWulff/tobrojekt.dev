import { promises as fs } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const failures = [];

function fail(message) {
  failures.push(message);
}

function isIsoDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

async function readJson(filePath) {
  const raw = await fs.readFile(filePath, 'utf8');
  return JSON.parse(raw);
}

async function validateSiteConfig() {
  const filePath = path.join(root, 'config', 'site.json');
  const data = await readJson(filePath);
  if (!data.siteName || typeof data.siteName !== 'string') {
    fail('config/site.json: siteName must be a non-empty string');
  }
  if (!data.owner || typeof data.owner?.name !== 'string' || data.owner.name.length === 0) {
    fail('config/site.json: owner.name must be a non-empty string');
  }
  if (data.primaryNavigation && !Array.isArray(data.primaryNavigation)) {
    fail('config/site.json: primaryNavigation must be an array when defined');
  }
}

async function validateRedirects() {
  const filePath = path.join(root, 'config', 'redirects.json');
  const data = await readJson(filePath);
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    fail('config/redirects.json: redirects root must be an object');
    return;
  }
  for (const [from, to] of Object.entries(data)) {
    if (typeof to !== 'string') {
      fail(`config/redirects.json: redirect target for ${from} must be a string`);
    }
  }
}

async function validateTags() {
  const tagsDir = path.join(root, 'src', 'content', 'tags');
  const files = await fs.readdir(tagsDir);
  for (const file of files.filter((name) => name.endsWith('.json'))) {
    const filePath = path.join(tagsDir, file);
    const data = await readJson(filePath);
    if (!data.id || typeof data.id !== 'string') {
      fail(`${filePath}: id must be a string`);
    }
    if (!data.label || typeof data.label !== 'string') {
      fail(`${filePath}: label must be a string`);
    }
    if ('descritpion' in data) {
      fail(`${filePath}: typo key "descritpion" found, use "description"`);
    }
    if ('description' in data && typeof data.description !== 'string') {
      fail(`${filePath}: description must be a string`);
    }
  }
}

async function validateContentDates() {
  const contentDir = path.join(root, 'src', 'content');
  const collections = ['projects', 'blogs'];
  for (const collection of collections) {
    const dir = path.join(contentDir, collection);
    const files = await fs.readdir(dir);
    for (const file of files.filter((name) => name.endsWith('.mdx'))) {
      const filePath = path.join(dir, file);
      const raw = await fs.readFile(filePath, 'utf8');
      const [, frontmatter = ''] = raw.split('---');
      const matches = frontmatter.matchAll(/\b(created|updated|started|completed):\s*['"]?([^'"\n]+)['"]?/g);
      for (const match of matches) {
        const field = match[1];
        const value = match[2].trim();
        if (!isIsoDate(value)) {
          fail(`${filePath}: ${field} must use YYYY-MM-DD format (found "${value}")`);
        }
      }
    }
  }
}

async function main() {
  await validateSiteConfig();
  await validateRedirects();
  await validateTags();
  await validateContentDates();

  if (failures.length > 0) {
    console.error('Validation failed:');
    for (const message of failures) {
      console.error(`- ${message}`);
    }
    process.exit(1);
  }

  console.log('Validation passed.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
