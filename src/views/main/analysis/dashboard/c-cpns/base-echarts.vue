<template>
  <div class="echarts">
    <el-row :gutter="20">
      <el-col class="col" :span="8">
        <EchartsPie />
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import EchartsPie from '@/components/echarts-pie/echarts-pie.vue'
</script>

<style lang="less" scoped>
.echarts {
  margin-top: 20px;
}
</style>
