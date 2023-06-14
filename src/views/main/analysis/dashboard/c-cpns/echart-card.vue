<template>
  <div class="echart-card">
    <el-card>
      <template #header>
        <div class="card-header">{{ title }}</div>
      </template>
      <div class="content">
        <slot>卡片的默认内容</slot>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
interface IProps {
  title: string
}

defineProps<IProps>()
</script>

<style lang="less" scoped></style>
