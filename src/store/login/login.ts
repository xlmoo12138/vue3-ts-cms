import { defineStore } from 'pinia'
import { accountLoginRequest } from '@/service/login/login'
import type { IAccount } from '@/types'

const useLoginStore = defineStore('login', {
  state: () => {
    return {
      id: '',
      name: '',
      token: ''
    }
  },
  actions: {
    async loginAccountAction(account: IAccount) {
      const loginRes = await accountLoginRequest(account)
      this.id = loginRes.data.id
      this.name = loginRes.data.name
      this.token = loginRes.data.token
    }
  }
})

export default useLoginStore
