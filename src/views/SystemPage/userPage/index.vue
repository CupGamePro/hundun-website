<template>
  <QueryFilter ref="queryFilter" @loadData="handleData"></QueryFilter>
  <PageCard style="height: calc(100vh - 200px)">
    <div class="table-actions">
      <el-button type="primary" :icon="Plus" @click="handleCreate">添加</el-button>
    </div>
    <div class="table-box">
      <el-table :data="state.tableData" style="width: 100%; margin-bottom: 20px" row-key="uuid" v-loading="loading"
        default-expand-all :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column prop="code" label="工号" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="reallyName" label="真实姓名" />
        <el-table-column prop="genderName" label="性别" />
        <el-table-column prop="avatar" label="头像" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="phone" label="电话" />
        <el-table-column prop="address" label="地址" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="status" label="启用/禁用">
          <template #default="scope">
            <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="2" size="small" @change="handleStatusChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="280px">
          <template #default="scope">
            <el-button type="success" text @click="handleEdit(scope.row)" size="small">编辑</el-button>
            <el-button type="danger" text @click="handleDelete(scope.row)" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-box">
      <el-pagination v-model:current-page="pagination.currentPage" background layout="total, sizes, prev, pager, next"
        :total="state.total" v-model:page-size="pagination.pageSize" />
    </div>
  </PageCard>
  <create-user ref="menuDrawer" @loadData="handleData" />
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import QueryFilter from './queryFilter.vue';
import { getUserList, deleteUser, updateStatus } from '@/services/userService';
import { Plus } from '@element-plus/icons-vue';
import CreateUser from './createUser.vue';
import { ElMessage } from 'element-plus';
import lodash from 'lodash';

const queryFilter = ref();
const menuDrawer = ref();
const loading = ref(false);

const state = reactive({
  tableData: [],
  total: 0,
})

const pagination = reactive({
  page: 1,
  pageSize: 10,
})

const handleData = () => {
  loading.value = true;
  const condition = queryFilter.value.formItem;
  const params = {
    page: pagination.page,
    pageSize: pagination.pageSize,
    condition: {
      ...lodash.pickBy(condition, value => value !== '')
    },
  }
  getUserList(params).then(res => {
    if (res.code && res.code === 200) {
      state.tableData = res.data.content;
      state.total = res.data.total;
    }
    loading.value = false;
  })
  loading.value = false;
};

const handleCreate = (row) => {
  if (!menuDrawer.value) return false;
  const params = {
    parentId: row ? row.uuid : null,
  }
  menuDrawer.value.openDrawer(params);
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
  if (!menuDrawer.value) return false;
  menuDrawer.value.openDrawer(row);
};

const handleStatusChange = row => {
  console.log(row.status);
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
.pagination-box {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  width: 100%;
}

.table-actions {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
}
</style>
