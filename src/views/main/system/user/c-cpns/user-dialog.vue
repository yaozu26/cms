<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system'
import type { ElForm } from 'element-plus/lib/components/index.js'

const formRef = ref<InstanceType<typeof ElForm>>()
const formData = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})
const isShowDialog = ref(false)
const isNew = ref(true)
const editDataId = ref(0)
const mainStore = useMainStore()
const systemStore = useSystemStore()
mainStore.entireRolesAction()
mainStore.entireDepartmentAction()
const { entireRole, entireDepartment } = storeToRefs(mainStore)

// 显示对话框
const setDialogShow = (isNewBool: boolean = true, userInfo: any = {}) => {
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

// 取消新建用户事件
const handleCancelBtnClick = () => {
  isShowDialog.value = false
  formRef.value?.resetFields()
}

// 新建用户和编辑用户事件
const handleConfirmBtnClick = () => {
  if (!isNew.value && editDataId) {
    systemStore.patchUserlistAction(editDataId.value, formData)
  } else {
    systemStore.createUserlistAction(formData)
  }
  // 清空表单数据
  formRef.value?.resetFields()
  isShowDialog.value = false
}

// 暴漏属性
defineExpose({
  setDialogShow
})
</script>

<template>
  <div class="dialog">
    <el-dialog
      v-model="isShowDialog"
      :title="isNew ? '新建用户' : '编辑用户'"
      width="30%"
      center
      @close="handleCancelBtnClick"
    >
      <el-form :model="formData" ref="formRef" label-width="100px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="formData.name" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="formData.realname" placeholder="请输入真实姓名" />
        </el-form-item>
        <el-form-item v-if="isNew" label="密码" prop="password">
          <el-input
            v-model="formData.password"
            placeholder="请输入密码"
            type="password"
            show-password
          />
        </el-form-item>
        <el-form-item label="手机号码" prop="cellphone">
          <el-input v-model="formData.cellphone" placeholder="请输入手机号码" />
        </el-form-item>
        <el-form-item label="选择角色" prop="roleId">
          <el-select v-model="formData.roleId" placeholder="请选择角色" style="width: 100%">
            <el-option
              v-for="item in entireRole"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="选择部门" prop="departmentId">
          <el-select v-model="formData.departmentId" placeholder="请选择部门" style="width: 100%">
            <el-option
              v-for="item in entireDepartment"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
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

<style lang="less" scoped></style>
