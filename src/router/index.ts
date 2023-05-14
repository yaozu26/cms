import { createRouter, createWebHashHistory } from 'vue-router'
import { LOGIN_TOKEN } from '@/global/constant'
import { localCached } from '@/utils/cache'
import { firstMenu } from '@/utils/mapMenu'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/Login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/views/main/Main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('@/views/not-found/NotFound.vue')
    }
  ]
})

// 导航守卫
router.beforeEach((to) => {
  const token = localCached.getCache(LOGIN_TOKEN)
  if (to.path === '/main' && !token) {
    return '/login'
  }

  if (to.path === '/main') {
    return firstMenu.url
  }
})

export default router
