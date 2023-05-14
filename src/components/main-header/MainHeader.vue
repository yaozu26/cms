<script lang="ts" setup>
import HeaderInfo from './c-cpns/HeaderInfo.vue'
import HeaderCrumbs from './c-cpns/HeaderCrumbs.vue'
import { ref } from 'vue'

const emit = defineEmits(['foldChange'])

// 图标点击折叠功能
const isCollapse = ref(false)
const handleIconClick = () => {
  isCollapse.value = !isCollapse.value

  // 发射一个自定义的事件
  emit('foldChange', isCollapse.value)
}
</script>

<template>
  <div class="header">
    <div class="icon" @click="handleIconClick">
      <el-icon size="24px">
        <component :is="isCollapse ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
    <div class="content">
      <HeaderCrumbs />
      <HeaderInfo />
    </div>
  </div>
</template>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  height: 100%;
  .icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 18px;
  }
}
</style>
