/// <reference types="unplugin-vue-router/client" />

declare interface Window {
  // extend the window
}

// Add Vite import.meta.glob type declaration if missing
interface ImportMeta {
  glob: <T = unknown>(
    globPath: string,
    options?: { eager?: boolean }
  ) => Record<string, T>
  env: ImportMetaEnv
}

interface ImportMetaEnv {
  readonly BASE_URL: string
  readonly DEV: boolean
  readonly PROD: boolean
  readonly SSR: boolean
  readonly MODE: string
  // Add any other environment variables here
}
