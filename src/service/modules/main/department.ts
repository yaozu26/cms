import hyRequest from '../../'

// 部门列表数据的网络请求
export function postDepartmentListData(queryInfo: any) {
  return hyRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}

// 删除部门数据的网络请求
export function deleteDepartmentData(id: number) {
  return hyRequest.delete({
    url: `/users/${id}`
  })
}

// 创建部门的网络请求
export function createDepartmentData(userInfo: any) {
  return hyRequest.post({
    url: '/users',
    data: userInfo
  })
}

// 修改部门的网络请求
export function patchDepartmentData(id: number, userInfo: any) {
  return hyRequest.patch({
    url: `/users/${id}`,
    data: userInfo
  })
}
