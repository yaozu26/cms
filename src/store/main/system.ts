import { defineStore } from 'pinia'
import {
  postUserListData,
  deleteUserData,
  createUserData,
  patchUserData
} from '@/service/modules/main/system'

interface ISystem {
  userlist: any[]
  userTotalCount: number
}
const useSystemStore = defineStore('system', {
  state: (): ISystem => ({
    userlist: [],
    userTotalCount: 0
  }),
  actions: {
    async userlistAction(queryInfo: any) {
      const userlist = await postUserListData(queryInfo)
      this.userlist = userlist.data.list
      this.userTotalCount = userlist.data.totalCount
    },
    async deleteUserByIdAction(id: number) {
      deleteUserData(id)
    },
    async createUserlistAction(userInfo: any) {
      const result = await createUserData(userInfo)
      this.userlistAction({
        offset: 0,
        size: 10
      })
    },
    async patchUserlistAction(id: number, userInfo: any) {
      const patchResult = await patchUserData(id, userInfo)
      this.userlistAction({
        offset: 0,
        size: 10
      })
    }
  }
})

export default useSystemStore
