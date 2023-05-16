<template>
  <div class="menu">
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
import PageContent from '@/components/page-content/page-content.vue'
import PageDialog from '@/components/page-dialog/page-dialog.vue'
import contentConfig from './config/content'
import dialogConfig from './config/dialog'
import { computed } from 'vue'
import usePageDialog from '@/hooks/usePageDialog'
import useSystemStore from '@/store/main/system'

// 对dialogConfig配置的操作
const systemStore = useSystemStore()
const dialogConfigRef = computed(() => {
  const parentList: any[] = systemStore.pageEntireData.map((item) => {
    return { label: item.name, id: item.id }
  })
  const typeList: any[] = systemStore.pageEntireData.map((item) => {
    return { label: item.name, id: item.type + 1 }
  })

  dialogConfig.formList.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options = []
      item.options.push(...parentList)
    } else if (item.prop === 'type') {
      item.options = []
      item.options.push(...typeList)
    }
  })
  return dialogConfig
})

// 对page-dialog组件的操作
const { dialogRef, handleNewClick, handlePatcClick } = usePageDialog()
</script>
