import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'
import { router } from '@/router'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
}
const useLoginStore = defineStore('login', {
  state: (): ILoginState => {
    return {
      token: localCache.getCache(LOGIN_TOKEN) ?? '',
      userInfo: localCache.getCache('userInfo') ?? {},
      userMenus: localCache.getCache('userMenus') ?? []
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
      // 1.动态获取所有的路由对象，放到数组中
      // * 路由对象都在独立的文件中
      // * 从文件中将所有路由对象先读取数组中
      const localRoutes: RouteRecordRaw[] = []
      // 1.1 读取router/main所有的ts文件
      const files: Record<string, any> = import.meta.glob('../../router/main/**/*.ts', {
        eager: true
      })
      for (const key in files) {
        const module = files[key]
        localRoutes.push(module.default)
      }

      // 2.根据菜单去匹配正确的路由
      // * router.addRoute( 'main ' , xxX)

      // 5页面跳转（main页面）
      router.push('/main')
    }
  }
})

export default useLoginStore
