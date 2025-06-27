import type { ViteSSGContext } from 'vite-ssg'
import type { UserModule } from './types'
import { ViteSSG } from 'vite-ssg'
import { routes } from 'vue-router/auto-routes'

import App from './App.vine'
import setupLayouts from './modules/layouts'

// Import styles
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

/**
 * Install all user modules under `modules/`
 */
function installModules(ctx: ViteSSGContext) {
  const modules = import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true })

  Object.values(modules).forEach((module) => {
    module.install?.(ctx)
  })
}

/**
 * Setup application with router and layouts
 */
async function setupApp() {
  const router = await setupLayouts(routes)

  return ViteSSG(
    App,
    {
      routes: router,
      base: import.meta.env.BASE_URL,
    },
    installModules,
  )
}

/**
 * Create and configure the SSG app
 * https://github.com/antfu/vite-ssg
 */
export const createApp = await setupApp()
