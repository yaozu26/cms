<template>
  <div class="role">
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
    <PageDialog :dialog-config="dialogConfig" :other-info="otherInfo" ref="dialogRef">
      <template #menulist>
        <el-tree
          ref="treeRef"
          :data="menuEntireDara"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckClick"
        />
      </template>
    </PageDialog>
  </div>
</template>
<script lang="ts" setup>
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageDialog from '@/components/page-dialog/page-dialog.vue'
import searchConfig from './config/search'
import contentConfig from './config/content'
import dialogConfig from './config/dialog'
import { ref, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system'
import usePageContent from '@/hooks/usePageContent'
import usePageDialog from '@/hooks/usePageDialog'
import { mapMenuToIds } from '@/utils/mapMenu'

// 对组件的操作
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { dialogRef, handleNewClick, handlePatcClick } = usePageDialog(handleEditCallback)

// menulist插槽的逻辑
const systemStore = useSystemStore()
systemStore.menuEntireDataAction()
const { menuEntireDara } = storeToRefs(systemStore)
const otherInfo = ref()

// 选择权限的逻辑
const handleCheckClick = (data: any, { checkedKeys, halfCheckedKeys }: any) => {
  const menulist = { ...checkedKeys, ...halfCheckedKeys }
  otherInfo.value = { menulist: menulist }
}

// 自定义插槽编辑回显的逻辑
const treeRef = ref()
function handleEditCallback(formData: any) {
  nextTick(() => {
    const ids = mapMenuToIds(formData.menuList)
    treeRef.value?.setCheckedKeys(ids)
  })
}
</script>

<style lang="less" scoped></style>
