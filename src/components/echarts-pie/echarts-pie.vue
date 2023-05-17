<template>
  <div class="pie" ref="pieRef"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const pieRef = ref()
onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(pieRef.value)
  // 绘制图表
  // 2.指定图表的配置项和数据
  const option = {
    title: {
      text: 'ECharts 入门示例'
      // ...
    },
    tooltip: {},
    legend: {
      data: ['销量']
    },
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
  }

  myChart.setOption(option)
})
</script>

<style lang="less" scoped>
.pie {
  height: 500px;
  background-color: #fff;
  border-radius: 4px;
}
</style>
