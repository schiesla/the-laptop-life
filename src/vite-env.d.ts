/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_UNDER_CONSTRUCTION?: string;
  readonly VITE_ENABLE_NEWSLETTER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
