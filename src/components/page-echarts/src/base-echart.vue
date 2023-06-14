<template>
  <div class="base-echart">
    <div class="echart" ref="echartRef"></div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, watchEffect } from 'vue'
import * as echarts from 'echarts'
import ChinaJSON from '../data/china.json'
import type { EChartsOption } from 'echarts'

// 注册地图
echarts.registerMap('china', ChinaJSON as any)

interface IProps {
  option: EChartsOption
}

const props = defineProps<IProps>()

const echartRef = ref<HTMLElement>()
onMounted(() => {
  // 1、初始化echart实例
  const echartInstance = echarts.init(echartRef.value!, 'light', {
    renderer: 'canvas'
  })

  // 2、监听option变化，重新执行
  watchEffect(() => echartInstance.setOption(props.option))

  // 3、监听window缩放
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })
})
</script>

<style lang="less" scoped>
.echart {
  height: 300px;
}
</style>
