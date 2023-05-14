import hyRequest from '../../'

// 用户列表数据的网络请求
export function postUserListData(queryInfo: any) {
  return hyRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}

// 删除用户数据的网络请求
export function deleteUserData(id: number) {
  return hyRequest.delete({
    url: `/users/${id}`
  })
}

// 创建用户的网络请求
export function createUserData(userInfo: any) {
  return hyRequest.post({
    url: '/users',
    data: userInfo
  })
}

// 修改用户的网络请求
export function patchUserData(id: number, userInfo: any) {
  return hyRequest.patch({
    url: `/users/${id}`,
    data: userInfo
  })
}
