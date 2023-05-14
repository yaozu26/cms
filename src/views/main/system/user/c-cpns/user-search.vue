<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { Refresh, Search } from '@element-plus/icons-vue'
import type { ElForm } from 'element-plus/lib/components/index.js'

const formRef = ref<InstanceType<typeof ElForm>>()

// 定义自定义事件
const emit = defineEmits(['queryClick', 'resetClcik'])

// 定义表单的初始值
const searchForm = reactive<any>({
  name: '',
  realname: '',
  cellphone: '',
  enable: '',
  createAt: ''
})

// 重置操作
const handleResetClick = () => {
  formRef.value?.resetFields()
  emit('resetClcik')
}

// 查询操作
const handleQueryClick = () => {
  emit('queryClick', searchForm)
}
</script>

<template>
  <div class="search">
    <!-- 搜索关键字的表单 -->
    <el-form :model="searchForm" ref="formRef" label-width="80px" size="large">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input placeholder="请输入查询的字符串" v-model="searchForm.name" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input placeholder="请输入真实姓名" v-model="searchForm.realname" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话号码" prop="cellphone">
            <el-input placeholder="请输入电话号码" v-model="searchForm.cellphone" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select
              placeholder="请选择查询的状态"
              v-model="searchForm.enable"
              style="width: 100%"
            >
              <el-option label="启用" value="1" />
              <el-option label="禁用" value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              v-model="searchForm.createAt"
              type="daterange"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 重置和搜索的按钮 -->
    <div class="btns">
      <el-button :icon="Refresh" @click="handleResetClick">重置</el-button>
      <el-button type="primary" :icon="Search" @click="handleQueryClick">搜索</el-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.search {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  .btns {
    display: flex;
    justify-content: flex-end;
    padding-right: 20px;
  }
}

// 修改UI组件样式
.el-form {
  margin-top: 12px;
}
</style>
