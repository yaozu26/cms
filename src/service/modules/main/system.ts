import hyRequest from '../../'

// 获取页面列表数据
export function postPageEntireData(pageName: string, queryInfo: object) {
  return hyRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo
  })
}

// 增加页面列表数据
export function postPageAddData(pageName: string, queryInfo: object) {
  return hyRequest.post({
    url: `/${pageName}`,
    data: queryInfo
  })
}

// 删除页面列表数据
export function deletePageData(pageName: string, id: number) {
  return hyRequest.delete({
    url: `/${pageName}/${id}`
  })
}

// 修改页面列表数据
export function patchPageEditData(pageName: string, id: number, infoData: object) {
  return hyRequest.patch({
    url: `/${pageName}/${id}`,
    data: infoData
  })
}
