/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PACKAGE_NAME?: string;
  readonly VITE_PACKAGE_VERSION?: string;
  readonly VITE_JSON_URL?: string;
  // Optional Sentry / release tagging variables
  readonly VITE_SENTRY_DSN_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
