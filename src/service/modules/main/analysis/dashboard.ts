import hyRequest from '@/service'

// 商品数据统计数据
export function getGoodsAmountData() {
  return hyRequest.get({
    url: '/goods/amount/list'
  })
}
