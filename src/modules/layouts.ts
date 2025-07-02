import type { RouteRecordRaw } from 'vue-router'

interface LayoutModule {
  default: Component & {
    name?: string
    __name?: string
  }
}

interface PageModule {
  default: Component & {
    __route?: {
      meta?: {
        layout?: string
      }
    }
  }
  layoutName?: string
}

function setupLayouts(routes: RouteRecordRaw[]) {
  const layouts = import.meta.glob<LayoutModule>('../layouts/*.vine.ts', { eager: true })

  if (!layouts || Object.keys(layouts).length === 0) {
    return routes
  }

  const layoutMap = new Map<string, Component>()
  Object.entries(layouts).forEach(([path, module]) => {
    const layoutName = path.match(/\/(\w+)\.vine\.ts$/)?.[1] || 'default'
    layoutMap.set(layoutName, module.default)
  })

  const processRoutes = (routes: RouteRecordRaw[]): RouteRecordRaw[] => {
    const processedRoutes = routes.map((route) => {
      const newRoute = { ...route }

      if (route.children && route.children.length > 0) {
        newRoute.children = processRoutes(route.children)
        return newRoute
      }

      let layoutName = 'default'

      if (route.component) {
        try {
          const isMarkdownRoute = route.component?.toString().includes('.md') || route.meta?.isMarkdown === true

          if (!isMarkdownRoute) {
            let pageModule: PageModule | null = null

            // Check if component is already resolved or is a function that needs calling
            if (typeof route.component === 'function') {
              // Try to call the function to see if it returns a component or Promise
              try {
                const result = (route.component as any)()
                // If it returns a Promise, it's likely a dynamic import - skip async processing
                if (result && typeof result.then === 'function') {
                  console.warn(`Route ${route.path} has dynamic import component, skipping layout detection`)
                  pageModule = null
                }
                else {
                  pageModule = result as PageModule
                }
              }
              catch {
                // If calling fails, treat it as a component constructor
                pageModule = route.component as unknown as PageModule
              }
            }
            else {
              pageModule = route.component as PageModule
            }

            // Check for different layout configuration methods
            if (pageModule) {
              // Method 1: layoutName export
              if (pageModule.layoutName) {
                layoutName = pageModule.layoutName
              }
              // Method 2: __route.meta.layout from component
              else if (pageModule.default?.__route?.meta?.layout) {
                layoutName = pageModule.default.__route.meta.layout
              }
            }

            // Method 3: route meta layout
            if (route.meta?.layout && typeof route.meta.layout === 'string') {
              layoutName = route.meta.layout
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
        // Wrap the component with the layout
        const originalComponent = newRoute.component
        newRoute.component = layoutComponent

        // Create a new route structure to include the page component as a child
        if (originalComponent) {
          newRoute.children = [
            {
              path: '',
              component: originalComponent,
              meta: newRoute.meta,
            },
          ]
        }
      }

      return newRoute
    })

    return processedRoutes
  }

  const processedRoutes = processRoutes(routes)
  return processedRoutes
}

export default setupLayouts
