<template>
  <QueryFilter ref="queryFilter" @loadData="handleData"></QueryFilter>
  <PageCard class="table-page-card">
    <div class="table-actions">
      <el-button type="primary" :icon="Plus" @click="handleCreate">添加</el-button>
    </div>
    <div class="table-box">
      <el-table :data="state.tableData" style="width: 100%; margin-bottom: 20px" row-key="uuid" border v-loading="loading"
        default-expand-all :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" show-overflow-tooltip>
        <el-table-column type="selection" width="50" />
        <el-table-column prop="name" label="菜单名称" />
        <el-table-column prop="code" label="编码" />
        <el-table-column prop="typeName" label="类型" />
        <el-table-column prop="path" label="路由" />
        <el-table-column prop="component" label="组件路径" />
        <el-table-column prop="sort" label="序号" />
        <el-table-column prop="level" label="层级" />
        <el-table-column prop="status" label="启用/禁用" width="100px" align="center">
          <template #default="scope">
            <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="2" size="small"
              @change="handleStatusChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280px">
          <template #default="scope">
            <el-button v-if="scope.row.type === 1" type="primary" text @click="handleCreate(scope.row)"
              size="small">添加</el-button>
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
  <create-menu ref="menuDrawer" @loadData="handleData" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import QueryFilter from './queryFilter.vue';
import { getMenuList, deleteMenu, updateStatus } from '@/services/menu';
import { Plus } from '@element-plus/icons-vue';
import CreateMenu from './createMenu.vue';
import { ElMessage } from 'element-plus';
import { useBaseTable } from '@/hooks/useBaseTable';

const queryFilter = ref();

const menuDrawer = ref();
const { pagination, changePage, changeSize, loading, state, handleData } = useBaseTable(getMenuList, queryFilter)


const handleCreate = (row) => {
  if (!menuDrawer.value) return false;
  const params = {
    parentId: row ? row.uuid : null,
    level: row? row.level + 1 : 1,
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