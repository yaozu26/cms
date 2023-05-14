<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import useLoginStore from '@/store/login/login'
import { localCached } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constant'
import router from '@/router'

const loginStore = useLoginStore()
const { userInfo } = storeToRefs(loginStore)

// 退出登录
const handleExitLoginClick = () => {
  // 1、清除token
  localCached.removeCache(LOGIN_TOKEN)

  // 2、跳转到login界面
  router.push('/login')
}
</script>

<template>
  <div class="info">
    <el-icon><Message /></el-icon>
    <el-icon>
      <div class="dot"></div>
      <ChatDotRound />
    </el-icon>
    <el-icon><Search /></el-icon>
    <el-dropdown>
      <div class="user-info">
        <el-avatar
          :size="30"
          src="https://upload.jianshu.io/users/upload_avatars/1102036/c3628b478f06.jpeg"
        />
        <span class="name">{{ userInfo.name }}</span>
      </div>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleExitLoginClick">
            <el-icon><CircleClose /></el-icon>
            <span>退出系统</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <el-icon><InfoFilled /></el-icon>
            <span>个人信息</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-icon><Unlock /></el-icon>
            <span>修改密码</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="less" scoped>
.info {
  display: flex;
  align-items: center;
  .dot {
    position: absolute;
    right: -3px;
    top: -3px;
    width: 4px;
    height: 4px;
    background-color: red;
    border-radius: 50%;
    overflow: hidden;
  }
  .user-info {
    display: flex;
    align-items: center;
    margin-left: 10px;
    cursor: pointer;
    .name {
      padding-left: 8px;
    }
  }
  // 修改UI组件样式
  .el-icon {
    margin: 0 10px;
  }
}
</style>
