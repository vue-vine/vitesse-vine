import type { RouteRecordRaw } from 'vue-router'

interface LayoutModule {
  default: Component & {
    name?: string
    __name?: string
  }
}

interface PageModule {
  default: Component
  layoutName?: string
}

async function setupLayouts(routes: RouteRecordRaw[]) {
  const layouts = import.meta.glob<LayoutModule>('../layouts/*.vine.ts', { eager: true })

  if (!layouts || Object.keys(layouts).length === 0) {
    return routes
  }

  const layoutMap = new Map<string, Component>()
  Object.entries(layouts).forEach(([path, module]) => {
    const layoutName = path.match(/\/(\w+)\.vine\.ts$/)?.[1] || 'default'
    layoutMap.set(layoutName, module.default)
  })

  const processRoutes = async (routes: RouteRecordRaw[]): Promise<RouteRecordRaw[]> => {
    const processedRoutes = await Promise.all(routes.map(async (route) => {
      const newRoute = { ...route }

      if (route.children && route.children.length > 0) {
        newRoute.children = await processRoutes(route.children)
        return newRoute
      }

      let layoutName = 'default'

      if (route.component) {
        try {
          const isMarkdownRoute = route.component?.toString().includes('.md') || route.meta?.isMarkdown === true

          if (!isMarkdownRoute) {
            let pageModule: PageModule | null = null

            if (typeof route.component === 'function') {
              const resolvedComponent = await (route.component as () => Promise<PageModule>)()
              pageModule = resolvedComponent
            }
            else {
              pageModule = route.component as PageModule
            }

            if (pageModule && pageModule.layoutName) {
              layoutName = pageModule.layoutName
            }
          }
        }
        catch (error) {
          console.warn(`Failed to load component for route ${route.path}:`, error)
        }
      }

      if (!layoutMap.has(layoutName)) {
        console.warn(`Layout "${layoutName}" not found for route ${route.path}, using default layout`)
        layoutName = 'default'
      }

      const layoutComponent = layoutMap.get(layoutName)
      if (layoutComponent) {
        newRoute.meta = {
          ...newRoute.meta,
          layout: layoutName,
        }
      }

      return newRoute
    }))

    return processedRoutes
  }

  const processedRoutes = await processRoutes(routes)
  return processedRoutes
}

export default setupLayouts
