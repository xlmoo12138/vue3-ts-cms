import { createRouter, createWebHashHistory } from 'vue-router'
import { firstMenu } from './../utils/map-menus'
import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('../views/login/Login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/NotFound.vue')
    }
  ]
})

// 导航守卫
router.beforeEach((to) => {
  // 只有登录成功（token），才能真正进入main页面
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }
  // 如果是进入到main页面
  if (to.path === '/main') {
    return firstMenu?.url
  }
})
