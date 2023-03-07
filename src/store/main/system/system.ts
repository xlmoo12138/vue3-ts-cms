import { defineStore } from 'pinia'
import type { ISystemState } from './type'
import { postUsersListData } from '@/service/main/system/system'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0
  }),
  actions: {
    async postUsersListAction(queryInfo: any) {
      const usersListRes = await postUsersListData(queryInfo)
      const { totalCount, list } = usersListRes.data
      this.usersTotalCount = totalCount
      this.usersList = list
    }
  }
})

export default useSystemStore
