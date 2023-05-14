<script lang="ts" setup>
import MainMenu from '@/components/main-menu/MainMenu.vue'
import MainHeader from '@/components/main-header/MainHeader.vue'
import { ref } from 'vue'

// 监听子组件的自定义事件
const Fold = ref(false)
const foldChangeHandle = (isFold: boolean) => {
  Fold.value = isFold
}
</script>

<template>
  <div class="main">
    <el-container>
      <el-aside :width="Fold ? '60px' : '210px'">
        <MainMenu :isFold="Fold" />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <MainHeader @fold-change="foldChangeHandle" />
        </el-header>
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
.main {
  .el-container {
    height: 100vh;
    .el-aside {
      background-color: #001529;
      transition: width 300ms ease;
      //IE 10+
      -ms-overflow-style: none;
      //Firefox
      overflow: -moz-scrollbars-none;
      &::-webkit-scrollbar {
        width: 0 !important;
      }
    }
    .el-main {
      background-color: #f0f2f5;
    }
  }
}
</style>
