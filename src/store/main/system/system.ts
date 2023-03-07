import { defineStore } from 'pinia'
import type { ISystemState } from './type'
import { deleteUserById, postUsersListData } from '@/service/main/system/system'

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
    },
    async deleteUserByIdAction(id: number) {
      // 1.删除数据操作
      const deleteResult = await deleteUserById(id)
      window.console.log('删除成功', deleteResult)
      // 2.重新请求新的数据
      this.postUsersListAction({ offset: 0, size: 10 })
    }
  }
})

export default useSystemStore
