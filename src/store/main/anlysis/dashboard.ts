import { defineStore } from 'pinia'
import {
  getGoodsAmountData,
  getGoodsCategoryCountData
} from '@/service/modules/main/analysis/dashboard'

interface IState {
  goodsAmountData: any[]
  goodsCategoryCountData: any[]
}

const useDashboardStore = defineStore('dashboard', {
  state: (): IState => ({
    goodsAmountData: [],
    goodsCategoryCountData: []
  }),
  actions: {
    // 获取商品数据统计数据
    async goodsAmountDataAction() {
      const res = await getGoodsAmountData()
      this.goodsAmountData = res.data
    },

    // 获取每个分类商品的个数
    async goodsCategoryCountAction() {
      const res = await getGoodsCategoryCountData()
      console.log(res)
      this.goodsCategoryCountData = res.data
    }
  }
})

export default useDashboardStore
