<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <template v-for="item in goodsAmountData">
        <el-col :span="6">
          <GoodsCard :itemData="item" />
        </el-col>
      </template>
    </el-row>
    <BaseEcharts />
  </div>
</template>

<script lang="ts" setup>
import GoodsCard from './c-cpns/goods-card.vue'
import BaseEcharts from './c-cpns/base-echarts.vue'
import { storeToRefs } from 'pinia'
import useDashboardStore from '@/store/main/anlysis/dashboard'

const dashboardStore = useDashboardStore()
dashboardStore.goodsAmmountDataAction()
const { goodsAmountData } = storeToRefs(dashboardStore)
</script>
