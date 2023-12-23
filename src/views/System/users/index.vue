<template>
  <QueryFilter ref="queryFilter" @loadData="handleData"></QueryFilter>
  <PageCard class="table-page-card">
    <div class="table-actions">
      <el-button type="primary" :icon="Plus" @click="handleCreate">添加</el-button>
    </div>
    <div class="table-box">
      <el-table :data="state.tableData" style="width: 100%; margin-bottom: 20px" border v-loading="loading" show-overflow-tooltip>
        <el-table-column type="selection" width="50" />
        <el-table-column prop="code" label="工号" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="reallyName" label="真实姓名" />
        <el-table-column prop="roles" label="角色">
          <template #default="scope">
            {{ scope.row.roles.map(item => item.name).join(',') }}
          </template>
        </el-table-column>
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="phone" label="电话" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="status" label="启用/禁用" width="100px" align="center">
          <template #default="scope">
            <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="2" size="small" @change="handleStatusChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280px">
          <template #default="scope">
            <el-button type="primary" text @click="handleEdit(scope.row)" size="small">编辑</el-button>
            <el-button type="danger" text @click="handleDelete(scope.row)" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-box">
      <el-pagination v-model:current-page="pagination.currentPage" background layout="total, sizes, prev, pager, next"
        :total="state.total" v-model:page-size="pagination.pageSize" @size-change="changeSize"
        @current-change="changePage" />
    </div>
  </PageCard>
  <create-user ref="drawer" @loadData="handleData" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import QueryFilter from './queryFilter.vue';
import { getUserList, deleteUser, updateStatus } from '@/services/user';
import { Plus } from '@element-plus/icons-vue';
import CreateUser from './createUser.vue';
import { ElMessage } from 'element-plus';
import { useBaseTable } from '@/hooks/useBaseTable';

const queryFilter = ref();
const drawer = ref();
const { pagination, changePage, changeSize, loading, state, handleData } = useBaseTable(getUserList, queryFilter)

const handleCreate = (row) => {
  if (!drawer.value) return false;
  const params = {
    parentId: row ? row.uuid : null,
  }
  drawer.value.openDrawer(params);
};

const handleDelete = row => {
  deleteUser(row.uuid).then(res => {
    if (res.code === 200) {
      ElMessage.success('删除成功');
      handleData();
    }
  })
};

const handleEdit = row => {
  if (!drawer.value) return false;
  drawer.value.openDrawer(row);
};

const handleStatusChange = row => {
  updateStatus(row.uuid, row.status).then(res => {
    if (res.success) {
      ElMessage.success('操作成功');
      handleData();
    }
  })
};

onMounted(() => {
  handleData();
});
</script>

<style lang="scss" scoped>
</style>
