export const environment = 'production';
export const releasePkgInfo = `${import.meta.env.VITE_PACKAGE_NAME}@${
  import.meta.env.VITE_PACKAGE_VERSION
}`;

const normalizeJoin = (base: string, path: string) => {
  if (!base) return path;
  // If path is absolute URL, return as-is
  if (/^(https?:)?\/\//.test(path)) return path;
  // Ensure base ends with a single slash
  if (!base.endsWith('/')) base = base + '/';
  // Remove leading ./ or / from path
  path = path.replace(/^\.\//, '').replace(/^\//, '');
  return base + path;
};

// Decide how to source data:
// - Default: use a static JSON feed (VITE_JSON_URL or ./assets/meetings.json)
// - Only use Google Sheets when VITE_USE_GOOGLE_SHEET === 'true' and VITE_GOOGLE_SHEET is provided
const provided = import.meta.env.VITE_JSON_URL;
const base = import.meta.env.BASE_URL || '/';

const jsonFallback = './assets/meetings.json';

const computeJsonUrl = (p?: string) => {
  if (!p) p = jsonFallback;
  if (/^(https?:)?\/\//.test(p)) return p;
  return normalizeJoin(base, p);
};

const useGoogle =
  (import.meta.env.VITE_USE_GOOGLE_SHEET || '').toLowerCase() === 'true' &&
  Boolean(import.meta.env.VITE_GOOGLE_SHEET) &&
  Boolean(import.meta.env.VITE_GOOGLE_API_KEY);

const googleJsonUrl = () => {
  const sheet = import.meta.env.VITE_GOOGLE_SHEET as string;
  const key = import.meta.env.VITE_GOOGLE_API_KEY as string;
  if (!sheet || !key) return null;
  const id = sheet.split('/')[5];
  if (!id) return null;
  return `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/A:ZZ?key=${key}`;
};

export const dataUrl = (() => {
  if (useGoogle) {
    const g = googleJsonUrl();
    if (g) return g;
    // fall through to JSON if sheet parsing failed
  }

  if (provided) return computeJsonUrl(provided);

  return computeJsonUrl();
})();

export const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

export const meetingsPerPage = 10;

export const videoServices: { [key: string]: string[] } = {
  BlueJeans: ['bluejeans.com'],
  'Free Conference': ['freeconference.com'],
  FreeConferenceCall: ['freeconferencecall.com'],
  'Google Meet': ['meet.google.com'],
  GoToMeeting: ['gotomeet.me', 'gotomeeting.com'],
  Skype: ['skype.com'],
  WebEx: ['webex.com'],
  Zoho: ['zoho.com'],
  Zoom: ['zoom.com', 'zoom.us']
};
