import type { RouteRecordRaw } from 'vue-router'

export let firstMenu: any = null
export function mapMenuToRoutes(userMenus: any[]) {
  // 读取文件的所有路由对象
  const localRoutes: RouteRecordRaw[] = []
  const files: Record<string, any> = import.meta.glob('@/router/main/**/*.ts', { eager: true })
  for (const key in files) {
    localRoutes.push(files[key].default)
  }

  // 匹配正确的路由
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        // 给顶层菜单增加重定向功能
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({
            path: menu.url,
            redirect: route.path
          })
        }

        // 添加二级菜单
        routes.push(route)
      }

      // 记录第一个被匹配到的路由
      if (!firstMenu && route) firstMenu = submenu
    }
  }

  return routes
}

/**
 * 根据路径去匹配菜单
 * @param path 需要匹配的路径
 * @param userMenus 所有的菜单
 */
export function mapPathToMenu(path: string, userMenus: any) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu
      }
    }
  }
}

/**
 * 根据路径去匹配面包屑
 */
interface ICrumbs {
  name: string
  path: string
}
export function mapPathToCrumbs(path: string, userMenus: any) {
  const crumbs: ICrumbs[] = []

  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        crumbs.push({ name: menu.name, path: menu.url })
        crumbs.push({ name: submenu.name, path: submenu.url })
        return crumbs
      }
    }
  }
}

// 根据菜单映射id的列表
export function mapMenuToIds(menulist: any[]) {
  const ids: number[] = []

  function recurseGetIds(menu: any[]) {
    for (const item of menu) {
      if (item.children) {
        recurseGetIds(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }
  recurseGetIds(menulist)

  return ids
}

/**
 * 从菜单映射到按钮的权限
 * @param
 */
export function mapMenuToPerssions(menulist: any[]) {
  const permissions: any[] = []

  function recurseGetPerssions(menu: any[]) {
    for (const item of menu) {
      if (item.type === 3) {
        permissions.push(item.permission)
      } else {
        recurseGetPerssions(item.children ?? [])
      }
    }
  }
  recurseGetPerssions(menulist)

  return permissions
}
