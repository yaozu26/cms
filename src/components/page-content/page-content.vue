<template>
  <div class="content">
    <!-- 头部区域 -->
    <div class="header">
      <h2 class="title">{{ contentConfig.header.title }}</h2>
      <el-button v-if="isNewPermission" type="primary" @click="handleNewBtnClick">{{
        contentConfig.header.btnTitle
      }}</el-button>
    </div>

    <!-- 表格区域 -->
    <el-table :data="pageEntireData" style="width: 100%" border row-key="id">
      <template v-for="item in contentConfig.tableList" :key="item.prop">
        <!-- 选择框 -->
        <el-table-column
          v-if="item.type === 'selection'"
          align="center"
          type="selection"
          :width="item.width"
        />

        <!-- 序号 -->
        <el-table-column
          v-else-if="item.type === 'index'"
          align="center"
          type="index"
          :label="item.label"
          :width="item.width"
        />

        <!-- 状态 -->
        <el-table-column
          v-else-if="item.type === 'status'"
          align="center"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        >
          <template #default="{ row }">
            <el-button :type="row.enable === 1 ? 'primary' : 'danger'" plain>
              {{ row.enable === 1 ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>

        <!-- 创建时间/更新时间 -->
        <el-table-column
          v-else-if="item.type === 'timer'"
          align="center"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        >
          <template #default="scope">
            {{ formatUTC(scope.row[item.props]) }}
          </template>
        </el-table-column>

        <!-- 自定义插槽 -->
        <el-table-column
          v-else-if="item.type === 'custom'"
          align="center"
          :label="item.label"
          :width="item.width"
        >
          <template #default="scope">
            <slot :name="item.slotName"></slot>
          </template>
        </el-table-column>

        <!-- 操作 -->
        <el-table-column
          v-else-if="item.type === 'handle'"
          align="center"
          :label="item.label"
          :width="item.width"
        >
          <template #default="{ row }">
            <el-button
              v-if="isUpdatePermission"
              size="small"
              text
              type="primary"
              icon="edit"
              @click="handlePatchBtnClick(row)"
            >
              编辑
            </el-button>
            <el-button
              v-if="isDelPermission"
              size="small"
              text
              type="danger"
              icon="delete"
              @click="handleDeleteBtnClick(row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>

        <!-- 其它 -->
        <el-table-column
          v-else
          align="center"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        />
      </template>
    </el-table>

    <!-- 底部区域 -->
    <div class="footer">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @size-change="fetchPageListData"
        @current-change="fetchPageListData"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/format'
import useSystemStore from '@/store/main/system'
import usePermission from '@/hooks/usePermission'

// 定义自定义事件/获取的属性
interface IProps {
  contentConfig: {
    pageName: string
    header: {
      title: string
      btnTitle: string
    }
    tableList: any[]
  }
}
const emit = defineEmits(['newClick', 'patchClick'])
const props = defineProps<IProps>()

// 1、获取增删查改对应的权限
const isNewPermission = usePermission(`${props.contentConfig.pageName}:create`)
const isDelPermission = usePermission(`${props.contentConfig.pageName}:delete`)
const isQueryPermission = usePermission(`${props.contentConfig.pageName}:query`)
const isUpdatePermission = usePermission(`${props.contentConfig.pageName}:update`)

// 2、发起action，请求pagelist数据
const systemStore = useSystemStore()
systemStore.pageEntireDataAction(props.contentConfig.pageName, {})
const { pageEntireData, pageTotalCount } = storeToRefs(systemStore)

// 创建数据(增)
const handleNewBtnClick = () => {
  emit('newClick')
}

// 删除数据(删)
const handleDeleteBtnClick = (id: number) => {
  systemStore.pageDeleteDataAction(props.contentConfig.pageName, id)
}

// 修改数据(改)
const handlePatchBtnClick = (formInfo: any) => {
  emit('patchClick', formInfo)
}

// 页码相关逻辑
const currentPage = ref(1)
const pageSize = ref(10)
fetchPageListData()

// 发送网络请求(查)
function fetchPageListData(queryInfo: any = {}) {
  if (!isQueryPermission) return

  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  systemStore.pageEntireDataAction(props.contentConfig.pageName, { offset, size, ...queryInfo })
}

// 暴露属性
defineExpose({
  fetchPageListData
})
</script>

<style lang="less" scoped>
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .title {
      font-size: 30px;
    }
  }
  .footer {
    display: flex;
    justify-content: flex-end;
    margin: 20px 20px 0 0;
  }
}
</style>
