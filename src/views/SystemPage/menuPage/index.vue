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
        <el-table-column prop="name" label="菜单名称" />
        <el-table-column prop="code" label="编码" />
        <el-table-column prop="typeName" label="类型" />
        <el-table-column prop="path" label="组件路径" />
        <el-table-column prop="sort" label="排序" />
        <el-table-column prop="level" label="层级" />
        <el-table-column prop="status" label="启用/禁用">
          <template #default="scope">
            <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="2" size="small" @change="handleStatusChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="280px">
          <template #default="scope">
            <el-button v-if="scope.row.type === 1" type="info" text @click="handleCreate(scope.row)" size="small">添加</el-button>
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
  <create-menu ref="menuDrawer" @loadData="handleData" />
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import QueryFilter from './queryFilter.vue';
import { getMenuList, deleteMenu, updateStatus } from '@/services/menuService';
import { Plus } from '@element-plus/icons-vue';
import CreateMenu from './createMenu.vue';
import { ElMessage } from 'element-plus';

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
  const params = {
    page: pagination.page,
    pageSize: pagination.pageSize,
    ...queryFilter.value,
  }
  getMenuList(params).then(res => {
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
  deleteMenu(row.uuid).then(res => {
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
