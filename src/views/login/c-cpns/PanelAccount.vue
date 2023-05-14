<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus/lib/components/index.js'
import type { FormRules, FormInstance } from 'element-plus/lib/components/index.js'
import type { IAccount } from '@/types'
import { localCached } from '@/utils/cache'
import useLoginStore from '@/store/login/login'

const loginStore = useLoginStore()

const CACHE_NAME = 'name'
const CACHE_PASSWORD = 'password'

const account = reactive<IAccount>({
  name: localCached.getCache(CACHE_NAME),
  password: localCached.getCache(CACHE_PASSWORD)
})

const formRef = ref<FormInstance>()

// 定义校验规则
const accountRules: FormRules = {
  name: [
    { required: true, message: '必须输入你的帐户名', trigger: 'blur' },
    { min: 3, max: 12, message: '请输入3到12字符长度的帐户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入你的密码', trigger: 'blur' },
    { min: 6, message: '密码至少是6位数以上', trigger: 'blur' }
  ]
}

// 帐号登录逻辑
const loginAction = (isRemPwd: boolean) => {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 1、登录
      const name = account.name
      const password = account.password
      loginStore.accountLoginAction({ name, password })

      // 2、将帐号密码存储到本地
      if (isRemPwd) {
        localCached.setCache(CACHE_NAME, name)
        localCached.setCache(CACHE_PASSWORD, password)
      } else {
        localCached.removeCache(CACHE_NAME)
        localCached.removeCache(CACHE_PASSWORD)
      }
    } else {
      ElMessage.error('Oops:请输入正确的帐号密码')
    }
  })
}

// 将属性暴漏出去
defineExpose({ loginAction })
</script>

<template>
  <div class="panel-account">
    <el-form
      :model="account"
      :rules="accountRules"
      label-width="60px"
      size="large"
      status-icon
      ref="formRef"
    >
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" type="password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped></style>
