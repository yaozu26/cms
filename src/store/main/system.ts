import { defineStore } from 'pinia'
import {
  postPageEntireData,
  postPageAddData,
  deletePageData,
  patchPageEditData
} from '@/service/modules/main/system'

interface ISystem {
  pageEntireData: any[]
  pageTotalCount: number
  departmentEntireData: any[]
  roleEntireData: any[]
  menuEntireDara: any[]
  currentPage: number
}
const useSystemStore = defineStore('system', {
  state: (): ISystem => ({
    pageEntireData: [],
    pageTotalCount: 0,
    departmentEntireData: [],
    roleEntireData: [],
    menuEntireDara: [],
    currentPage: 1
  }),
  actions: {
    // 获取部门列表/角色列表数据
    async departmentRoleEntireDataAction() {
      const res1 = await postPageEntireData('department', {})
      const res2 = await postPageEntireData('role', {})
      this.departmentEntireData = res1.data.list
      this.roleEntireData = res2.data.list
    },

    // 获取菜单列表数据
    async menuEntireDataAction() {
      const res = await postPageEntireData('menu', {})
      this.menuEntireDara = res.data.list
    },

    // 获取数据
    async pageEntireDataAction(pageName: string, queryInfo: object = {}) {
      const res = await postPageEntireData(pageName, queryInfo)
      this.pageEntireData = res.data.list
      this.pageTotalCount = res.data.totalCount ? res.data.totalCount : res.data.list.length
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

export default useSystemStore
