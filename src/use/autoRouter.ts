import { getSession } from '@/utils/storage'

const modules = import.meta.globEager('../views/**/*.vue')
interface Router {
  path: string
  name: string
  component: object
  order: number
}

export function getRoutes() {
  const layoutChildrens: Router[] = []
  const routeModuleList: Router[] = []
  const permissions: any = JSON.parse(JSON.parse(getSession('permissions')))
  let results: any = []
  if (permissions) {
    results = JSON.parse(permissions.MENU).map((item: any) => item.map.RES_KEY)
  }
  Object.keys(modules).forEach((key) => {
    const name = key.split('/').slice(-1)[0].split('.')[0]
    if (results.includes(name)) {
      const mod = modules[key].default || {}
      const item = {
        path: mod.path || `/${name}`,
        name: mod.title,
        component: mod,
        order: mod.order
      }
      typeof mod.order === 'number' && layoutChildrens.push(item)
      routeModuleList.push(item)
    }
  })
  layoutChildrens.sort((a, b) => a.order - b.order)
  return {
    layoutChildrens,
    routeModuleList
  }
}
