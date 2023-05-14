import hyRequest from '..'
import type { IAccount } from '@/types'

export const accountLoginRequest = (account: IAccount) => {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}

export const getUserInfoRequest = (id: number) => {
  return hyRequest.get({
    url: `/users/${id}`
  })
}

export const getUserMenuByRoleId = (id: number) => {
  return hyRequest.get({
    url: `/role/${id}/menu`
  })
}
