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
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import CardItem from './c-cpns/card-item.vue'
import useDashboardStore from '@/store/main/anlysis/dashboard'

const dashboardStore = useDashboardStore()
dashboardStore.goodsAmountDataAction()
const { goodsAmountData } = storeToRefs(dashboardStore)
</script>
