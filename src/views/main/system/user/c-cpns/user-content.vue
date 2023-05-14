<script lang="ts" setup>
import useSystemStore from '@/store/main/system'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/format'

const systemStore = useSystemStore()
const { userlist, userTotalCount } = storeToRefs(systemStore)

// 定义自定义事件
const emit = defineEmits(['newClick', 'patchClick'])

// 页码相关逻辑
const currentPage = ref(1)
const pageSize = ref(10)
fetchUserlistData()

// pageSize改变触发事件
const handlePageSizeChange = () => {
  fetchUserlistData()
}

// currentPage改变触发事件
const handleCruuentPageChange = () => {
  fetchUserlistData()
}

// 发送网络请求
function fetchUserlistData(queryInfo: any = {}) {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  systemStore.userlistAction({ offset, size, ...queryInfo })
}

// 删除用户数据
const handleDeleteBtnClick = (id: number) => {
  systemStore.deleteUserByIdAction(id)
  fetchUserlistData()
}

// 修改用户数据
const handlePatchBtnClick = (userInfo: any) => {
  emit('patchClick', userInfo)
}

// 创建用户数据
const handleNewBtnClick = () => {
  emit('newClick')
}

// 暴露属性
defineExpose({
  fetchUserlistData
})
</script>

<template>
  <div class="content">
    <div class="header">
      <h2 class="title">用户列表</h2>
      <el-button type="primary" @click="handleNewBtnClick">新建用户</el-button>
    </div>

    <el-table :data="userlist" style="width: 100%" border>
      <el-table-column align="center" type="selection" width="55" />
      <el-table-column align="center" type="index" width="55" />
      <el-table-column align="center" prop="name" label="用户名" />
      <el-table-column align="center" prop="realname" label="真实姓名" />
      <el-table-column align="center" prop="cellphone" label="手机号码" />
      <el-table-column align="center" prop="enable" label="状态" width="85">
        <template #default="{ row }">
          <el-button :type="row.enable === 1 ? 'primary' : 'danger'" plain>
            {{ row.enable === 1 ? '启用' : '禁用' }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="createAt" label="创建时间" width="180">
        <template #default="scope">
          {{ formatUTC(scope.row.createAt) }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="updateAt" label="更新时间" width="180">
        <template #default="scope">
          {{ formatUTC(scope.row.updateAt) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template #default="{ row }">
          <el-button size="small" text type="primary" icon="edit" @click="handlePatchBtnClick(row)">
            编辑
          </el-button>
          <el-button
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
    </el-table>

    <div class="footer">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="userTotalCount"
        @size-change="handlePageSizeChange"
        @current-change="handleCruuentPageChange"
      />
    </div>
  </div>
</template>

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
