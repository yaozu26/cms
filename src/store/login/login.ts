import { defineStore } from 'pinia'
import {
  accountLoginRequest,
  getUserInfoRequest,
  getUserMenuByRoleId
} from '@/service/modules/login'
import { localCached } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constant'
import router from '@/router'
import { mapMenuToRoutes, mapMenuToPerssions } from '@/utils/mapMenu'
import type { IAccount } from '@/types'

interface IState {
  token: string
  userInfo: any
  userMenus: any[]
  permissions: any[]
}

const useLoginStore = defineStore('login', {
  state: (): IState => ({
    token: '',
    userInfo: {},
    userMenus: [],
    permissions: []
  }),
  actions: {
    async accountLoginAction(account: IAccount) {
      // 1、帐号登录，获取token等信息
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      this.token = loginResult.data.token

      //2、将token身份码保存到本地
      localCached.setCache(LOGIN_TOKEN, this.token)

      // 3、获取用户登录的详细信息
      const userInfo = await getUserInfoRequest(id)
      this.userInfo = userInfo.data
      localCached.setCache('userInfo', userInfo.data)

      // 4、根据角色获取用户权限
      const userMenu = await getUserMenuByRoleId(this.userInfo.role.id)
      this.userMenus = userMenu.data
      localCached.setCache('userMenus', userMenu.data)

      // 5、拿到按钮对应的权限
      const permissions = mapMenuToPerssions(this.userMenus)
      this.permissions = permissions

      // 6、动态添加路由
      const routes = mapMenuToRoutes(this.userMenus)
      routes.forEach((route) => router.addRoute('main', route))

      // 7、跳转到主页面
      router.push('/main')
    },

    // 刷新页面后从本地拿到数据
    loadLocalCachedAction() {
      const token = localCached.getCache(LOGIN_TOKEN)
      const userInfo = localCached.getCache('userInfo')
      const userMenus = localCached.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus
      }

      const permissions = mapMenuToPerssions(this.userMenus)
      this.permissions = permissions

      const routes = mapMenuToRoutes(userMenus)
      routes.forEach((route) => router.addRoute('main', route))
    }
  }
})

export default useLoginStore
