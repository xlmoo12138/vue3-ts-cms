import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoById } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'
import { router } from '@/router/router'

const useLoginStore = defineStore('login', {
  state: () => {
    return {
      token: localCache.getCache(LOGIN_TOKEN) ?? '',
      userInfo: {}
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
      window.console.log(this.userInfo)

      // 4页面跳转（main页面）
      router.push('/main')
    }
  }
})

export default useLoginStore
