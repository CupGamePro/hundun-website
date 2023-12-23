<template>
  <TreeTableLayout>
    <template v-slot:tree >
      <el-tree ref="tree" :data="treeData" :props="treeProps" :default-expand-all="true" node-key="uuid"></el-tree>
    </template>
    <template v-slot:filter >
      <QueryFilter ref="queryFilter" @loadData="handleData"></QueryFilter>
    </template>
    <template v-slot:table>
      <div class="table-actions">
        <el-button type="primary" :icon="Plus" @click="handleCreate">添加</el-button>
      </div>
      <div class="table-box">
        <el-table :data="state.tableData" style="width: 100%; margin-bottom: 20px" border v-loading="loading"
          show-overflow-tooltip>
          <el-table-column type="selection" width="50" />
          <el-table-column prop="name" label="角色名称" />
          <el-table-column prop="code" label="角色编号" />
          <el-table-column prop="description" label="描述" />
          <el-table-column prop="createBy" label="创建人" />
          <el-table-column prop="updateTime" label="更新时间" />
          <el-table-column prop="status" label="启用/禁用" width="100px" align="center">
            <template #default="scope">
              <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="2" size="small"
                @change="handleStatusChange(scope.row)"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="280px">
            <template #default="scope">
              <el-button type="primary" text @click="handleEdit(scope.row)" size="small">分配权限</el-button>
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
    </template>
  </TreeTableLayout>
  <create-role ref="drawer" @loadData="handleData" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { deleteRole } from '@/services/role';
import QueryFilter from './queryFilter.vue';
import { getTreeList, getTableList } from '@/services/auth'
import { Plus } from '@element-plus/icons-vue';
import CreateRole from './createAuth.vue';
import { ElMessage } from 'element-plus';
import { useBaseTable } from '@/hooks/useBaseTable';

const queryFilter = ref();
const drawer = ref();
const { pagination, changePage, changeSize, loading, state, handleData } = useBaseTable(getTableList, queryFilter)
const treeData = ref([])
const treeProps = {
  children: 'children',
  value: 'uuid',
  label: 'name',
  defaultExpandAll: true,
}

const handleCreate = () => {
  if (!drawer.value) return false;
  drawer.value.openDrawer();
};

const handleTree = () => {
  getTreeList().then(res => {
    if (res.success) {
      treeData.value = res.data
    }
  })
}
handleTree()

const handleDelete = row => {
  deleteRole(row.uuid).then(res => {
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

</style>