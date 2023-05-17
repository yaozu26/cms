<template>
  <div class="goods-card">
    <div class="header">
      <div class="title">{{ itemData.title }}</div>
      <el-icon><Warning /></el-icon>
    </div>
    <div class="num">
      <span v-if="itemData.amount === 'saleroom'">￥</span>
      <span ref="count1Ref">{{ itemData.number1 }}</span>
    </div>
    <div class="bottom">
      <span>{{ itemData.title }}</span>
      <span v-if="itemData.amount === 'saleroom'">￥</span>
      <span ref="count2Ref">{{ itemData.number2 }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { CountUp } from 'countup.js'

interface IProps {
  itemData: any
}
const props = defineProps<IProps>()

// 数据递增的动画
const count1Ref = ref()
const count2Ref = ref()
onMounted(() => {
  const countup1 = new CountUp(count1Ref.value, props.itemData.number1, {})
  const countup2 = new CountUp(count2Ref.value, props.itemData.number2, {})
  countup1.start()
  countup2.start()
})
</script>

<style lang="less" scoped>
.goods-card {
  background-color: #fff;
  padding: 20px 20px 10px;
  border-radius: 4px;
  .header {
    display: flex;
    justify-content: space-between;
    color: #666;
    .title {
      font-size: 14px;
    }
  }
  .num {
    padding: 10px 0;
    font-size: 20px;
    border-bottom: 1px solid #99999930;
  }
  .bottom {
    margin-top: 10px;
    color: #444;
    font-size: 10px;
  }
}
</style>
