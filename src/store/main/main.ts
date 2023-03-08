import { defineStore } from 'pinia'
import { getEntireDepartments, getEntireRoles } from '@/service/main/main'

interface IMainState {
  entireRoles: any[]
  entireDepartments: any[]
}
const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: []
  }),
  actions: {
    async fetchEntireDataAction() {
      const rolesRes = await getEntireRoles()
      const departmentsRes = await getEntireDepartments()

      // 保存数据
      this.entireRoles = rolesRes.data.list
      this.entireDepartments = departmentsRes.data.list
    }
  }
})

export default useMainStore
