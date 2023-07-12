<template>
  <QueryFilter ref="queryFilter" @loadData="handleData"></QueryFilter>
  <PageCard style="height: calc(100vh - 200px)">
    <div class="table-actions">
      <el-button type="primary" :icon="Plus" @click="handleCreate">新 建</el-button>
    </div>
    <div class="table-box">
      <el-table
        :data="state.tableData"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        v-loading="loading"
        default-expand-all
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column prop="name" label="菜单名称" />
        <el-table-column prop="code" label="编码" />
        <el-table-column prop="type" label="类型" />
        <el-table-column prop="describe" label="菜单描述" />
        <el-table-column prop="status" label="状态" >
          <template #default="scope">
            <el-tag
              :type="scope.row.status === '禁用' ? 'danger' : 'success'"
              disable-transitions
            >{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="180px">
          <template #default="scope">
            <el-button type="success" text @click="handleEdit(scope.row)" size="small">编辑</el-button>
            <el-button type="danger" text @click="handleDelete(scope.row)" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-scrollbar>
      <div class="pagination-box">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          background
          layout="total, sizes, prev, pager, next"
          :total="state.total"
          v-model:page-size="pagination.pageSize"
        ></el-pagination>
      </div>
    </el-scrollbar>
  </PageCard>
  <create-menu ref="menuDrawer" @loadData="handleData" />
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import QueryFilter from './queryFilter.vue';
import { getMenuList, deleteMenu } from '@/services/menuService';
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
  size: 10,
})

const handleData = () => {
  loading.value = true;
  // const payload = queryFilter.value.filterData;
  getMenuList(pagination).then(res => {
    if (res.code && res.code === 200) {
      state.tableData = res.data.content;
      state.total = res.data.totalCount;
    }
    loading.value = false;
  })
  loading.value = false;
};

const handleCreate = () => {
  if (!menuDrawer.value) return false;
  menuDrawer.value.openDrawer();
};

const handleDelete = row => {
  deleteMenu(row.id).then(res => {
    if (res.code === 200) {
      ElMessage.success('删除成功');
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
