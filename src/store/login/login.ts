import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'
import { router } from '@/router/router'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
}
const useLoginStore = defineStore('login', {
  state: (): ILoginState => {
    return {
      token: localCache.getCache(LOGIN_TOKEN) ?? '',
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
      // 2进行本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 3获取登录用户的详细信息（role信息）
      const userInfoRes = await getUserInfoById(id)
      this.userInfo = userInfoRes.data

      // 4根据角色请求用户权限(菜单menus)
      const userMenusRes = await getUserMenusByRoleId(this.userInfo.role.id)
      this.userMenus = userMenusRes.data

      // 5页面跳转（main页面）
      router.push('/main')
    }
  }
})

export default useLoginStore
