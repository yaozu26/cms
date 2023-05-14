<template>
  <div class="department">
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
import { ref, computed } from 'vue'
import useMainStore from '@/store/main/main'

const dialogRef = ref()
const contentRef = ref()

// 对dialogConfig配置的操作
const dialogConfigRef = computed(() => {
  const mainStore = useMainStore()
  const departments: any[] = mainStore.pageEntireData.map((item) => {
    return { label: item.name, id: item.id }
  })
  dialogConfig.formList.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options?.push(...departments)
    }
  })
  return dialogConfig
})

// 对page-dialog组件的操作
const handleNewClick = () => {
  dialogRef.value.setDialogShow(true)
}
const handlePatcClick = (formInfo: any) => {
  dialogRef.value.setDialogShow(false, formInfo)
}

// 对page-content组件的操作
const handleQueryClick = (queryInfo: any) => {
  contentRef.value.fetchPageListData(queryInfo)
}
const handleResetClick = () => {
  contentRef.value.fetchPageListData()
}
</script>

<style lang="less" scoped></style>
