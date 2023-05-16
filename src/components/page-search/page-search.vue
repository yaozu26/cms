<template>
  <div class="search" v-if="isQueryPermission">
    <!-- 搜索关键字的表单 -->
    <el-form :model="searchForm" ref="formRef" label-width="80px" size="large">
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formList" :key="item.name">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <!-- input输入框类型 -->
              <el-input
                v-if="item.type === 'input'"
                :placeholder="item.placeholder"
                v-model="searchForm[item.prop]"
              />

              <!-- select选择器类型 -->
              <el-select
                v-else-if="item.type === 'select'"
                :placeholder="item.placeholder"
                v-model="searchForm.enable"
                style="width: 100%"
              >
                <template v-for="iten in item.options" :key="iten.value">
                  <el-option :label="iten.label" :value="iten.value" />
                </template>
              </el-select>

              <!-- date-picker时间选择器类型 -->
              <el-date-picker
                v-else-if="item.type === 'date-picker'"
                v-model="searchForm[item.prop]"
                type="daterange"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>

    <!-- 重置和搜索的按钮 -->
    <div class="btns">
      <el-button :icon="Refresh" @click="handleResetClick">重置</el-button>
      <el-button type="primary" :icon="Search" @click="handleQueryClick">搜索</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { Refresh, Search } from '@element-plus/icons-vue'
import usePermission from '@/hooks/usePermission'
import type { ElForm } from 'element-plus/lib/components/index.js'

// 定义自定义事件/接受的属性
interface IProps {
  searchConfig: {
    pageName: string
    formList: any[]
  }
}
const emit = defineEmits(['queryClick', 'resetClcik'])
const props = defineProps<IProps>()

// 1、获取查询的权限
const isQueryPermission = usePermission(`${props.searchConfig.pageName}:query`)

const formRef = ref<InstanceType<typeof ElForm>>()

// 定义表单的初始值
const initialForm: any = {}
for (const item of props.searchConfig.formList) {
  initialForm[item.prop] = ''
}
const searchForm = reactive(initialForm)

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
