<script lang="ts" setup>
import LoginPanel from './c-cpns/LoginPanel.vue'
</script>

<template>
  <div class="login">
    <LoginPanel />
  </div>
</template>

<style lang="less" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  background-image: url(@/assets/img/login-bg.svg);
}
</style>
