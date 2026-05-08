/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_COVEO_ORGANIZATION_ID: string;
  readonly VITE_COVEO_ACCESS_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
