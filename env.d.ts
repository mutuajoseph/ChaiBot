/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CHAIBOT_API_ENDPOINT: string
  readonly VITE_CHAIBOT_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
