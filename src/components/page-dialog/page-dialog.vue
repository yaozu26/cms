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
              <template v-for="iten in item.options" :key="iten.id">
                <el-option :label="iten.label" :value="iten.id" />
              </template>
            </el-select>

            <!-- 自定义插槽 -->
            <template v-else-if="item.type === 'custom'">
              <slot :name="item.slotName"></slot>
            </template>
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
import useSystemStore from '@/store/main/system'
import type { ElForm } from 'element-plus/lib/components/index.js'
import type { IDialogConfig } from './type'

const formRef = ref<InstanceType<typeof ElForm>>()
const isShowDialog = ref(false)
const isNew = ref(true)
const editDataId = ref(0)
const systemStore = useSystemStore()

// 获取的属性
interface IProps {
  dialogConfig: IDialogConfig
  otherInfo?: any
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
  isNew.value = isNewBool
  editDataId.value = userInfo.id
  for (const key in formData) {
    if (isNewBool) {
      formData[key] = ''
    } else {
      formData[key] = userInfo[key]
    }
  }
}

// 新建/编辑事件
const handleConfirmBtnClick = () => {
  isShowDialog.value = false
  let infoData = { ...formData }
  if (props.otherInfo) {
    infoData = { ...infoData, menuList: props.otherInfo }
  }

  if (!isNew.value && editDataId) {
    systemStore.pageEditDataAction(props.dialogConfig.pageName, editDataId.value, infoData)
  } else {
    systemStore.pageAddDataAction(props.dialogConfig.pageName, infoData)
  }
}

// 取消新建事件
const handleCancelBtnClick = () => {
  for (const key in formData) {
    formData[key] = ''
  }
  isShowDialog.value = false
}

// 暴漏属性
defineExpose({
  setDialogShow
})
</script>
