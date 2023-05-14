<script lang="ts" setup>
import UserSearch from './c-cpns/user-search.vue'
import UserContent from './c-cpns/user-content.vue'
import UserDialog from './c-cpns/user-dialog.vue'
import { ref } from 'vue'

const contentRef = ref<InstanceType<typeof UserContent>>()
const dialogRef = ref<InstanceType<typeof UserDialog>>()

// 对content组件的操作
const handleQueryClick = (queryInfo: any) => {
  contentRef.value?.fetchUserlistData(queryInfo)
}
const handleResetClick = () => {
  contentRef.value?.fetchUserlistData()
}

// 对dialog组件的操作
const handleNewClick = () => {
  dialogRef.value?.setDialogShow()
}
const handlePatchClick = (userInfo: any) => {
  dialogRef.value?.setDialogShow(false, userInfo)
}
</script>

<template>
  <div class="user">
    <UserSearch @query-click="handleQueryClick" @reset-clcik="handleResetClick" />
    <UserContent ref="contentRef" @new-click="handleNewClick" @patch-click="handlePatchClick" />
    <UserDialog ref="dialogRef" />
  </div>
</template>

<style lang="less" scoped></style>
