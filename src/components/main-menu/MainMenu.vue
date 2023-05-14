<script lang="ts" setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import useLoginStore from '@/store/login/login'
import router from '@/router'
import { mapPathToMenu } from '@/utils/mapMenu'

defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

const loginStore = useLoginStore()
const { userMenus } = storeToRefs(loginStore)

// 实现路由跳转
const handleItemClick = (item: any) => {
  router.push(item.url)
}

// 根据路径匹配菜单
const route = useRoute()
const defaultActive = computed(() => {
  return mapPathToMenu(route.path, userMenus.value).id + ''
})
</script>

<template>
  <div class="menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="" />
      <h2 v-show="!isFold" class="title">后台管理系统</h2>
    </div>
    <div class="menu-list">
      <el-menu
        unique-opened
        :collapse="isFold"
        :collapse-transition="false"
        :default-active="defaultActive"
        background-color="#001529"
        text-color="#b7bdc3"
      >
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <component :is="item.icon.split('-icon-')[1]" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>

            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item :index="subItem.id + ''" @click="handleItemClick(subItem)">
                {{ subItem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<style lang="less" scoped>
.menu {
  height: 100%;
  background-color: #001529;
  .logo {
    display: flex;
    align-items: center;
    height: 28px;
    padding: 12px 10px 8px;
    .img {
      height: 100%;
      margin-left: 6px;
    }
    .title {
      padding-left: 10px;
      font-size: 16px;
      color: #fff;
      white-space: nowrap;
    }
  }
  .menu-list {
    // 修改组件样式
    .el-menu {
      border: 0;
    }
    .el-menu-item {
      padding-left: 50px;
      background-color: #0c2135;
      &:hover {
        color: #fff;
      }
    }
    .el-menu-item.is-active {
      color: #fff;
      background-color: #0a60bd;
    }
  }
}
</style>
