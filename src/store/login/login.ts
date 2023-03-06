import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'
import { router } from '@/router'
import { mapMenusToRoutes } from '@/utils/map-menus'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
}
const useLoginStore = defineStore('login', {
  state: (): ILoginState => {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1账号登录，获取token等信息
      const loginRes = await accountLoginRequest(account)
      const id = loginRes.data.id
      this.token = loginRes.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 2获取登录用户的详细信息（role信息，需要授权）
      const userInfoRes = await getUserInfoById(id)
      const userInfo = userInfoRes.data
      this.userInfo = userInfo

      // 3根据角色请求用户权限(菜单menus)
      const userMenusRes = await getUserMenusByRoleId(this.userInfo.role.id)
      const userMenus = userMenusRes.data
      this.userMenus = userMenus

      // 4进行本地缓存
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus', userMenus)

      // 重要:动态的添加路由
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach(route => router.addRoute('main', route))
      // 5页面跳转（main页面）
      router.push('/main')
    },
    loadLocalCacheAction() {
      // 1.用户进行刷新默认加载数据
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        // 2 动态加载路由
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach(route => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
