import { defineStore } from 'pinia'
import { accountLoginRequest } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'
import { router } from '@/router/router'

const useLoginStore = defineStore('login', {
  state: () => {
    return {
      id: '',
      name: '',
      token: localCache.getCache(LOGIN_TOKEN) ?? ''
    }
  },
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1账号登录，获取token等信息
      const loginRes = await accountLoginRequest(account)
      this.id = loginRes.data.id
      this.name = loginRes.data.name
      this.token = loginRes.data.token
      // 2进行本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 3页面跳转（main页面）
      router.push('/main')
    }
  }
})

export default useLoginStore
