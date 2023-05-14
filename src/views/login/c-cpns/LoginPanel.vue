<script lang="ts" setup>
import PanelAccount from './PanelAccount.vue'
import PanelPhone from './PanelPhone.vue'
import { ref, watch } from 'vue'
import { localCached } from '@/utils/cache'

const activeName = ref('account')
const isRemPwd = ref<boolean>(localCached.getCache('isRemPwd') ?? false)
watch(isRemPwd, (newValue) => {
  if (newValue) {
    localCached.setCache('isRemPwd', newValue)
  } else {
    localCached.removeCache('isRemPwd')
  }
})

const accountRef = ref<InstanceType<typeof PanelAccount>>()

// 登录逻辑
const handleLoginBtnClick = () => {
  if (activeName.value === 'account') {
    accountRef.value?.loginAction(isRemPwd.value)
  } else {
  }
}
</script>

<template>
  <div class="login-panel">
    <!-- 顶部标题 -->
    <h1 class="title">后台管理系统</h1>

    <!-- 中间的登录方式 -->
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activeName">
        <el-tab-pane name="account">
          <template #label>
            <span>
              <el-icon><UserFilled /></el-icon>
              <span class="text">帐号登录</span>
            </span>
          </template>
          <PanelAccount ref="accountRef" />
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <span>
              <el-icon><Iphone /></el-icon>
              <span class="text">手机登录</span>
            </span>
          </template>
          <PanelPhone />
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 底部区域 -->
    <div class="control">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      <el-link type="primary" :underline="false">忘记密码</el-link>
    </div>
    <!-- 登录按钮 -->
    <el-button class="login-btn" type="primary" size="large" @click="handleLoginBtnClick()"
      >立即登录</el-button
    >
  </div>
</template>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  .title {
    text-align: center;
    margin-bottom: 15px;
  }
  .control {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-top: 12px;
  }
  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
