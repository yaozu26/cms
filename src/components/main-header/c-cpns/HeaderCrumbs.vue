<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { mapPathToCrumbs } from '@/utils/mapMenu'
import useLoginStore from '@/store/login/login'

// 根据路径匹配面包屑
const route = useRoute()
const loginStore = useLoginStore()
const { userMenus } = storeToRefs(loginStore)
const crumbs = computed(() => {
  return mapPathToCrumbs(route.path, userMenus.value)
})
</script>

<template>
  <div class="crumbs">
    <el-breadcrumb separator="/">
      <template v-for="item in crumbs" :key="item.path">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<style lang="less" scoped></style>
