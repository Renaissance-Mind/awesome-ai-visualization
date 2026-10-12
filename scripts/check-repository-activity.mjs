import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const read = path => readFileSync(resolve(root, path), 'utf8');
const locales = JSON.parse(read('data/repository-activity/locales.json'));
const monthly = JSON.parse(read('data/repository-activity/category-monthly.json'));
const summary = JSON.parse(read('data/repository-activity/category-summary.json'));
const base = 'https://awesome-ai-visualization.renaissancemind.ai/activity';
assert.equal(Object.keys(locales).length, 8);
for (const [locale, copy] of Object.entries(locales)) {
  const folder = 'public/activity/' + locale + '/';
  const page = read(folder + 'index.html');
  const readme = read(copy.readme);
  assert(page.includes('<html lang="' + locale + '">'));
  assert.equal((readme.match(/<!-- repository-activity:start -->/g) || []).length, 1);
  assert.equal((readme.match(/<!-- repository-activity:end -->/g) || []).length, 1);
  const payload = JSON.parse(page.match(/<script id="activity-data" type="application\/json">([\s\S]*?)<\/script>/)[1]);
  assert.equal(payload.locale, locale);
  assert.deepEqual(payload.monthly, monthly);
  assert.deepEqual(payload.categories.map(c => c.id), summary.categories.map(c => c.id));
  assert.deepEqual(payload.categories.map(c => c.label), copy.categories);
  assert.equal(payload.categories.length, 12);
  assert(!page.includes('window.openai'));
  assert(!/__([A-Z_]+)__/.test(page));
  for (const [file, anchor] of [['commits.svg', 'commits'], ['repos-created.svg', 'repos-created']]) {
    const svg = read(folder + file);
    assert(svg.includes('<svg ') && svg.includes('xmlns="http://www.w3.org/2000/svg"'));
    assert(!/<(?:script|foreignObject|image)\b/.test(svg));
    assert(!svg.includes('var(--'), 'Exported SVG colors must be self-contained.');
    assert(svg.includes('<path '), 'Figures must contain vector geometry.');
    assert(readme.includes('(public/activity/' + locale + '/' + file + ')](' + base + '/' + locale + '/#' + anchor + ')'));
    assert(page.includes('href="' + file + '"'));
    assert(page.includes('id="' + anchor + '"'));
  }
  for (const lang of Object.keys(locales)) assert(page.includes('value="' + lang + '"'));
}
for (const file of ['activity.css', 'activity.js', 'vendor/d3.v7.min.js', 'vendor/LICENSE', 'category-monthly.csv']) {
  assert(existsSync(resolve(root, 'public/activity', file)));
}
assert.equal(read('public/activity/activity.js'), read('scripts/templates/repository-activity-page.js'));
assert.equal(read('public/activity/activity.css'), read('scripts/templates/repository-activity-page.css'));
assert.equal(read('public/activity/category-monthly.csv'), read('data/repository-activity/category-monthly.csv'));
assert.equal(monthly.reduce((sum, row) => sum + Object.values(row.commits).reduce((a, b) => a + b, 0), 0), 307064);
assert.equal(monthly.reduce((sum, row) => sum + Object.values(row.repos_created).reduce((a, b) => a + b, 0), 0), 805);
console.log('Activity publication checks passed: 8 locales, 16 vector SVGs, linked README anchors, identical counts, standalone local assets and complete language navigation.');
