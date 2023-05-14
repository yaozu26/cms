<template>
  <div class="dialog">
    <el-dialog
      v-model="isShowDialog"
      :title="isNew ? dialogConfig.header.newTitle : dialogConfig.header.editTitle"
      width="30%"
      center
      @close="handleCancelBtnClick"
    >
      <el-form :model="formData" ref="formRef" label-width="100px">
        <template v-for="item in dialogConfig.formList" :key="item.id">
          <el-form-item :label="item.label" :prop="item.prop">
            <!-- input输入框类型 -->
            <el-input
              v-if="item.type === 'input'"
              v-model="formData[item.prop]"
              :placeholder="item.placeholder"
            />

            <!-- select选择器类型 -->
            <el-select
              v-else-if="item.type === 'select'"
              v-model="formData[item.prop]"
              :placeholder="item.placeholder"
              style="width: 100%"
            >
              <el-option
                v-for="iten in item.options"
                :key="iten.id"
                :label="iten.laebl"
                :value="iten.label"
              />
            </el-select>
          </el-form-item>
        </template>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCancelBtnClick">取消</el-button>
          <el-button type="primary" @click="handleConfirmBtnClick"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import useMainStore from '@/store/main/main'
import type { ElForm } from 'element-plus/lib/components/index.js'
import type { IDialogConfig } from './type'

const formRef = ref<InstanceType<typeof ElForm>>()
const isShowDialog = ref(false)
const isNew = ref(true)
const editDataId = ref(0)
const mainStore = useMainStore()

// 获取的属性
interface IProps {
  dialogConfig: IDialogConfig
}
const props = defineProps<IProps>()

// 定义表单的初始值
const initialForm: any = {}
for (const item of props.dialogConfig.formList) {
  initialForm[item.prop] = ''
}
const formData = reactive(initialForm)

// 显示对话框
const setDialogShow = (isNewBool: boolean, userInfo: any = {}) => {
  isShowDialog.value = true
  if (!isNewBool) {
    isNew.value = isNewBool
    for (const key in formData) {
      formData[key] = userInfo[key]
    }
    editDataId.value = userInfo.id
  } else {
    isNew.value = true
  }
}

// 新建用户和编辑用户事件
const handleConfirmBtnClick = () => {
  if (!isNew.value && editDataId) {
    mainStore.pageEditDataAction(props.dialogConfig.pageName, editDataId.value, formData)
  } else {
    console.log(formData)
    mainStore.pageAddDataAction(props.dialogConfig.pageName, formData)
  }

  // 清空表单数据
  formRef.value?.resetFields()
  isShowDialog.value = false
}

// 取消新建用户事件
const handleCancelBtnClick = () => {
  formRef.value.resetFields()
  isShowDialog.value = false
}

// 暴漏属性
defineExpose({
  setDialogShow
})
</script>
