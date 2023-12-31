import { ref } from 'vue'
import type PageDialog from '@/components/page-dialog/page-dialog.vue'

type EditFnType = (data: any) => void

function usePageDialog(newCallback?: EditFnType, editCallback?: EditFnType) {
  const dialogRef = ref<InstanceType<typeof PageDialog>>()
  function handleNewClick() {
    dialogRef.value?.setDialogShow(true)
    if (newCallback) newCallback([])
  }
  function handlePatcClick(formInfo: any) {
    dialogRef.value?.setDialogShow(false, formInfo)
    if (editCallback) editCallback(formInfo)
  }

  return {
    dialogRef,
    handleNewClick,
    handlePatcClick
  }
}

export default usePageDialog
