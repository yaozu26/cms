<template>
  <el-card class="box-card">
    <template #header>
      <div class="head">
        <div class="title">{{ itemData.title }}</div>
        <el-icon><Warning /></el-icon>
      </div>
      <div class="center" ref="count1Ref">
        {{ itemData.number1 }}
      </div>
    </template>
    <div class="bottom">
      <div class="sub-title">{{ itemData.subtitle }}</div>
      <div class="num" ref="count2Ref">{{ itemData.number2 }}</div>
    </div>
  </el-card>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { CountUp } from 'countup.js'

interface IProps {
  itemData: any
}
const props = defineProps<IProps>()

// 创建CountUp的实例对象
const countOption = {
  prefix: props.itemData.amount === 'saleroom' ? '￥' : ''
}
const count1Ref = ref<HTMLElement>()
const count2Ref = ref<HTMLElement>()
onMounted(() => {
  const countup1 = new CountUp(count1Ref.value!, props.itemData.number1, countOption)
  const countup2 = new CountUp(count2Ref.value!, props.itemData.number2, countOption)
  countup1.start()
  countup2.start()
})
</script>

<style lang="less" scoped>
.box-card {
  .head {
    display: flex;
    justify-content: space-between;
    color: #777;
    font-size: 14px;
  }
  .center {
    font-size: 28px;
    margin-top: 10px;
  }
  .bottom {
    display: flex;
  }
}
</style>
