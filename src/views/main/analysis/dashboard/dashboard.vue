<template>
  <div class="dashboard">
    <!-- 1、顶部数据统计 -->
    <el-row :gutter="10">
      <template v-for="item in goodsAmountData" :key="item.amount">
        <el-col :md="12" :lg="6" :xl="6">
          <CardItem :itemData="item" />
        </el-col>
      </template>
    </el-row>

    <!-- 2、中间部分图表 -->
    <el-row :gutter="10">
      <el-col :span="7">
        <echart-card title="分类商品数量(饼图)">
          <pie-echart :pieData="showGoodsCategoryCountData" />
        </echart-card>
      </el-col>
      <el-col :span="10">
        <echart-card title="不同城市商品销量">
          <map-echart :mapData="addressGoodsSale" />
        </echart-card>
      </el-col>
      <el-col :span="7">
        <echart-card title="分类商品数量(玫瑰图)">
          <rose-echart :roseData="showGoodsCategoryCountData" />
        </echart-card>
      </el-col>
    </el-row>

    <!-- 3、底部图表 -->
    <el-row :gutter="10">
      <el-col :span="12">
        <echart-card title="分类商品的销量">
          <line-echart
            :labels="showGoodsCategorySaleData.labels"
            :values="showGoodsCategorySaleData.values"
          />
        </echart-card>
      </el-col>
      <el-col :span="12">
        <echart-card title="分类商品的收藏">
          <bar-echart
            :labels="showGoodsCategoryFavorData.labels"
            :values="showGoodsCategoryFavorData.values"
          />
        </echart-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import CardItem from './c-cpns/card-item.vue'
import EchartCard from './c-cpns/echart-card.vue'
import { PieEchart, RoseEchart, LineEchart, BarEchart, MapEchart } from '@/components/page-echarts'
import useAnalysisStore from '@/store/main/analysis'

// 发送数据的请求
const analysisStore = useAnalysisStore()
analysisStore.fetchAnalysisDataAction()

// 从store获取数据
const {
  goodsAmountData,
  goodsCategoryCountData,
  goodsCategorySaleData,
  goodsCategoryFavorData,
  goodsAddressSaleData
} = storeToRefs(analysisStore)

const showGoodsCategoryCountData = computed(() => {
  return goodsCategoryCountData.value.map((item) => ({
    name: item.name,
    value: item.goodsCount
  }))
})

const showGoodsCategorySaleData = computed(() => {
  const labels = goodsCategorySaleData.value.map((item) => item.name)
  const values = goodsCategorySaleData.value.map((item) => item.goodsCount)
  return { labels, values }
})

const showGoodsCategoryFavorData = computed(() => {
  const labels = goodsCategoryFavorData.value.map((item) => item.name)
  const values = goodsCategoryFavorData.value.map((item) => item.goodsFavor)
  return { labels, values }
})

const addressGoodsSale = computed(() => {
  return goodsAddressSaleData.value.map((item) => {
    return { name: item.address, value: item.count }
  })
})
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 10px;
}
</style>
