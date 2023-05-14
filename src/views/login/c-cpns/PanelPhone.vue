<script lang="ts" setup>
import { reactive } from 'vue'
import type { FormRules } from 'element-plus/lib/components/index.js'

const account = reactive({
  phoneNum: '',
  verifyCode: ''
})

// 定义校验规则
const phoneRules: FormRules = {
  phoneNum: [
    { required: true, message: '必须输入你的手机号', trigger: 'blur' },
    { pattern: /^\d{11}$/, message: '请输入正确的格式', trigger: 'blur' }
  ],
  verifyCode: [
    { required: true, message: '请输入你的验证码', trigger: 'blur' },
    { pattern: /^\d{6}$/, message: '请输入正确的格式', trigger: 'blur' }
  ]
}
</script>

<template>
  <div class="panel-phone">
    <el-form
      label-width="65px"
      size="large"
      status-icon
      ref="formRef"
      :rules="phoneRules"
      :model="account"
    >
      <el-form-item label="手机号" prop="phoneNum">
        <el-input v-model="account.phoneNum" />
      </el-form-item>
      <el-form-item label="验证码" prop="verifyCode">
        <div class="verify-code">
          <el-input v-model="account.verifyCode" />
          <el-button class="text" type="primary">发送验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
.panel-phone {
  .verify-code {
    display: flex;
    .text {
      width: 100px;
      margin-left: 20px;
    }
  }
}
</style>
