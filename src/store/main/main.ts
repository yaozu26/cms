import { defineStore } from 'pinia'
import { postEntireRoles, postEntireDepartment } from '@/service/modules/main/main'
import {
  postPageEntireData,
  postPageAddData,
  deletePageData,
  patchPageEditData
} from '@/service/modules/main/main'

interface IState {
  entireRole: any[]
  entireDepartment: any[]
  pageEntireData: any[]
  pageTotalCount: number
}

const useMainStore = defineStore('main', {
  state: (): IState => ({
    entireRole: [],
    entireDepartment: [],
    pageEntireData: [],
    pageTotalCount: 0
  }),
  actions: {
    async entireRolesAction() {
      const rolesResult = await postEntireRoles()
      this.entireRole = rolesResult.data.list
    },
    async entireDepartmentAction(queryInfo: any = {}) {
      const departmentResult = await postEntireDepartment(queryInfo)
      this.entireDepartment = departmentResult.data.list
    },

    // 获取数据
    async pageEntireDataAction(pageName: string, queryInfo: object = {}) {
      const res = await postPageEntireData(pageName, queryInfo)
      this.pageEntireData = res.data.list
      this.pageTotalCount = res.data.totalCount
    },

    // 增加数据
    async pageAddDataAction(pageName: string, queryInfo: object = {}) {
      await postPageAddData(pageName, queryInfo)
      this.pageEntireDataAction(pageName)
    },

    // 删除数据
    async pageDeleteDataAction(pageName: string, id: number) {
      await deletePageData(pageName, id)
      this.pageEntireDataAction(pageName)
    },

    // 修改数据
    async pageEditDataAction(pageName: string, id: number, infoData: object) {
      await patchPageEditData(pageName, id, infoData)
      this.pageEntireDataAction(pageName)
    }
  }
})

export default useMainStore
