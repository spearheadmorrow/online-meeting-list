#!/usr/bin/env node
// Print the resolved data URL using the same rules as src/helpers/config.ts
const base = process.env.VITE_BASE || process.env.BASE || '/';

const normalizeJoin = (b, p) => {
  if (!b) return p;
  if (/^(https?:)?\/\//.test(p)) return p;
  if (!b.endsWith('/')) b = b + '/';
  p = (p || '').replace(/^\.\//, '').replace(/^\//, '');
  return b + p;
};

const jsonFallback = './assets/meetings.json';

const computeJsonUrl = p => {
  if (!p) p = jsonFallback;
  if (/^(https?:)?\/\//.test(p)) return p;
  return normalizeJoin(base, p);
};

const useGoogle =
  (process.env.VITE_USE_GOOGLE_SHEET || '').toLowerCase() === 'true' &&
  Boolean(process.env.VITE_GOOGLE_SHEET) &&
  Boolean(process.env.VITE_GOOGLE_API_KEY);

const googleUrl = () => {
  const sheet = process.env.VITE_GOOGLE_SHEET || '';
  const key = process.env.VITE_GOOGLE_API_KEY || '';
  if (!sheet || !key) return null;
  const parts = sheet.split('/');
  const id = parts[5] || null;
  if (!id) return null;
  return `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/A:ZZ?key=${key}`;
};

const resolved = (() => {
  if (useGoogle) {
    const g = googleUrl();
    if (g) return g;
  }
  if (process.env.VITE_JSON_URL)
    return computeJsonUrl(process.env.VITE_JSON_URL);
  return computeJsonUrl();
})();

console.log(
  'VITE_USE_GOOGLE_SHEET=',
  process.env.VITE_USE_GOOGLE_SHEET || 'unset'
);
console.log('VITE_JSON_URL=', process.env.VITE_JSON_URL || 'unset');
console.log(
  'VITE_GOOGLE_SHEET=',
  process.env.VITE_GOOGLE_SHEET ? '[redacted]' : 'unset'
);
console.log(
  'VITE_GOOGLE_API_KEY=',
  process.env.VITE_GOOGLE_API_KEY ? '[redacted]' : 'unset'
);
console.log('BASE=', base);
console.log('Resolved dataUrl:', resolved);
process.exit(0);
