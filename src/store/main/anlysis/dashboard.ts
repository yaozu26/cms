import { defineStore } from 'pinia'
import { getGoodsAmountData } from '@/service/modules/main/analysis/dashboard'

interface IState {
  goodsAmountData: any[]
}

const useDashboardStore = defineStore('dashboard', {
  state: (): IState => ({
    goodsAmountData: []
  }),
  actions: {
    // 获取商品数据统计数据
    async goodsAmmountDataAction() {
      const res = await getGoodsAmountData()
      this.goodsAmountData = res.data
    }
  }
})

export default useDashboardStore
