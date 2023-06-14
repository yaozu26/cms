import { defineStore } from 'pinia'
import {
  getGoodsAmountData,
  getGoodsCategoryCountData,
  getGoodsCategorySaleData,
  getGoodsCategoryFavorData,
  getGoodsAddressSaleData
} from '@/service/modules/main/analysis'

interface IState {
  goodsAmountData: any[]
  goodsCategoryCountData: any[]
  goodsCategorySaleData: any[]
  goodsCategoryFavorData: any[]
  goodsAddressSaleData: any[]
}

const useAnalysisStore = defineStore('analysis', {
  state: (): IState => ({
    goodsAmountData: [],
    goodsCategoryCountData: [],
    goodsCategorySaleData: [],
    goodsCategoryFavorData: [],
    goodsAddressSaleData: []
  }),
  actions: {
    fetchAnalysisDataAction() {
      getGoodsAmountData().then((res) => {
        this.goodsAmountData = res.data
      })
      getGoodsCategoryCountData().then((res) => {
        this.goodsCategoryCountData = res.data
      })
      getGoodsCategorySaleData().then((res) => {
        this.goodsCategorySaleData = res.data
      })
      getGoodsCategoryFavorData().then((res) => {
        this.goodsCategoryFavorData = res.data
      })
      getGoodsAddressSaleData().then((res) => {
        this.goodsAddressSaleData = res.data
      })
    }
  }
})

export default useAnalysisStore
