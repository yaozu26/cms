import hyRequest from '@/service'

// 商品数据统计数据
export function getGoodsAmountData() {
  return hyRequest.get({
    url: '/goods/amount/list'
  })
}

// echarts图表数据
// 获取每个分类商品的个数
export function getGoodsCategoryCountData() {
  return hyRequest.get({
    url: '/goods/category/count'
  })
}

export function getGoodsCategorySaleData() {
  return hyRequest.get({
    url: '/goods/category/sale'
  })
}

export function getGoodsCategoryFavorData() {
  return hyRequest.get({
    url: '/goods/category/favor'
  })
}

export function getGoodsAddressSaleData() {
  return hyRequest.get({
    url: '/goods/address/sale'
  })
}
