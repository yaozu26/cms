<template>
  <div class="user">
    <PageSearch
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-clcik="handleResetClick"
    />
    <PageContent
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewClick"
      @patch-click="handlePatcClick"
    />
    <PageDialog :dialog-config="dialogConfigRef" ref="dialogRef" />
  </div>
</template>
<script lang="ts" setup>
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageDialog from '@/components/page-dialog/page-dialog.vue'
import searchConfig from './config/search'
import contentConfig from './config/content'
import dialogConfig from './config/dialog'
import { computed } from 'vue'
import useSystemStore from '@/store/main/system'
import usePageContent from '@/hooks/usePageContent'
import usePageDialog from '@/hooks/usePageDialog'

// 对dialogConfig配置的操作
const dialogConfigRef = computed(() => {
  const systemStore = useSystemStore()
  systemStore.departmentRoleEntireDataAction()

  const departments: any[] = systemStore.departmentEntireData.map((item) => {
    return { label: item.name, id: item.id }
  })
  const roles: any[] = systemStore.roleEntireData.map((item) => {
    return { label: item.name, id: item.id }
  })

  dialogConfig.formList.forEach((item) => {
    if (item.prop === 'departmentId') {
      item.options = []
      item.options?.push(...departments)
    } else if (item.prop === 'roleId') {
      item.options = []
      item.options?.push(...roles)
    }
  })
  return dialogConfig
})

//对组件的逻辑
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { dialogRef, handleNewClick, handlePatcClick } = usePageDialog()
</script>

<style lang="less" scoped></style>
