export const environment = 'production';
export const releasePkgInfo = `${import.meta.env.VITE_PACKAGE_NAME}@${
  import.meta.env.VITE_PACKAGE_VERSION
}`;

const sheetUrl = import.meta.env.VITE_GOOGLE_SHEET
  ? import.meta.env.VITE_GOOGLE_SHEET
  : 'https://docs.google.com/spreadsheets/d/1wER2LP3dT_6_LEQ8fSY1rv2bGzIZ2aaMBi_0Bt1aN3I/edit#gid=0';

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

const defaultJsonUrl = `https://sheets.googleapis.com/v4/spreadsheets/${
  sheetUrl.split('/')[5]
}/values/A:ZZ?key=${import.meta.env.VITE_GOOGLE_API_KEY}`;

export const dataUrl = (() => {
  const provided = import.meta.env.VITE_JSON_URL;
  if (provided) {
    // If provided is absolute (starts with /), treat it as relative to base
    // If provided is a full URL (http/https) return as-is
    if (/^(https?:)?\/\//.test(provided)) return provided;
    // Use Vite's BASE_URL (import.meta.env.BASE_URL) which is '/' or the configured base
    const base = import.meta.env.BASE_URL || '/';
    return normalizeJoin(base, provided);
  }
  return defaultJsonUrl;
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
