<template>
  <TreeTableLayout>
    <template v-slot:tree >
      <el-tree ref="treeRef" :data="treeData" :props="treeProps" :default-expand-all="true" node-key="uuid" :current-node-key="currentNodeKey" highlight-current @node-click="handleNodeClick"></el-tree>
    </template>
    <template v-slot:filter >
      <QueryFilter ref="queryFilter" @loadData="handleData"></QueryFilter>
    </template>
    <template v-slot:table>
      <div class="table-actions">
        <el-button type="primary" icon="Plus" @click="handleCreate">添加</el-button>
      </div>
      <div class="table-box">
        <el-table :data="state.tableData" style="width: 100%; margin-bottom: 20px" border v-loading="loading"
          show-overflow-tooltip>
          <el-table-column type="selection" width="50" />
          <el-table-column prop="name" label="权限名称" />
          <el-table-column prop="code" label="权限编码" />
          <el-table-column prop="createdBy" label="创建人" />
          <el-table-column prop="updateTime" label="更新时间" />
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
    </template>
  </TreeTableLayout>
  <create-auth ref="drawer" @loadData="handleData" :current="currentNode" />
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import QueryFilter from './queryFilter.vue';
import { getTreeList, getTableList, deleteAuth } from '@/services/auth'
import CreateAuth from './createAuth.vue';
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
const currentNodeKey = ref(null)
const currentNode = ref(null)

const handleCreate = () => {
  if (!drawer.value || !currentNode.value) {return false};
  drawer.value.openDrawer();
};

const handleTree = () => {
  getTreeList().then(res => {
    if (res.success) {
      const result = res.data || []
      treeData.value = result 
      nextTick(() => {
        if (result.length > 0) {
          handleNodeClick(result[0])
        }
      })
    }
  })
}

const handleNodeClick = (data) => {
  if (data.type === 2) {
    currentNodeKey.value = data.uuid
    currentNode.value = data
    queryFilter.value.menuUuid = data.uuid
    handleData()
  } else {
    currentNodeKey.value = null
    currentNode.value = null
    queryFilter.value.menuUuid = null
  }
}

const handleDelete = row => {
  deleteAuth(row.uuid).then(res => {
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

onMounted(() => {
  handleTree()
})
</script>

<style lang="scss" scoped>

</style>