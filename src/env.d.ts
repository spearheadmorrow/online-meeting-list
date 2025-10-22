/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PACKAGE_NAME?: string;
  readonly VITE_PACKAGE_VERSION?: string;
  readonly VITE_SENTRY_DSN_URL?: string;
  readonly VITE_GOOGLE_SHEET?: string;
  readonly VITE_JSON_URL?: string;
  readonly VITE_GOOGLE_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
