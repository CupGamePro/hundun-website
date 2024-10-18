<template>
  <el-dialog v-model="drawer" :show-close="false" @close="closeDrawer" title="分配权限">
    <div>
      <div class="first-level-auth" v-for="item in treeData">
        <el-checkbox v-model="item.isChecked" :label="item.name" @change="handleCheckboxChange(item)"
          :indeterminate="item.indeterminate" :style="checkStyle(item)" />
        <div class="second-level-auth" v-for="secondItem in item.children">
          <el-checkbox v-model="secondItem.isChecked" :label="secondItem.name"
            @change="handleCheckboxChange(secondItem)" :indeterminate="secondItem.indeterminate"
            :style="checkStyle(secondItem)" />
          <div class="third-level-auth" v-if="secondItem.children.length > 0">
            <div v-for="thirdItem in secondItem.children" style="margin-right: 20px">
              <el-checkbox v-model="thirdItem.isChecked" :label="thirdItem.name"
                @change="handleCheckboxChange(thirdItem)" :indeterminate="thirdItem.indeterminate"
                :style="checkStyle(thirdItem)" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <div style="display: flex; justify-content: center;">
        <el-button type="primary" @click="submit(formRef)">保 存</el-button>
        <el-button @click="closeDrawer">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, defineExpose, defineEmits } from 'vue';
import { powerAuth, getAuthTree } from '@/services/role';
import { ElMessage } from 'element-plus';
import { cloneDeep } from 'lodash'
import { flattenTree } from './flatTree.js';
import { computed } from 'vue';

const drawer = ref(false);
const currentRow = ref(null)
const treeData = ref([])
const auth = reactive({
  auths: null,
  authList: []
})

const { auths, authList } = toRefs(auth)
const emit = defineEmits(['loadData'])

const checkStyle = computed(() => (item) => {
  return item.indeterminate || item.isChecked ? 'color: #409EFF' : ''
})

const updateCheckboxState = (checkbox, parentCheckbox) => {
  if (checkbox.children && checkbox.children.length > 0) {
    checkbox.children.forEach(child => {
      child.isChecked = checkbox.isChecked;
      if (child.children && child.children.length > 0) {
        child.children.forEach(grandchild => {
          grandchild.isChecked = checkbox.isChecked;
        })
      }
    });
  }
  if (parentCheckbox) {
    updateParentState(parentCheckbox)
    if (parentCheckbox.parentId) {
      const parent = treeData.value.find(item => item.uuid === parentCheckbox.parentId);
      updateParentState(parent)
    }
  }
};

// 触发自给更新父集操作
const updateParentState = (parent) => {
  const allChecked = parent.children.every(child => child.isChecked);
  const allUnchecked = parent.children.filter(child => !child.isChecked);
  const allIndeterminate = parent.children.filter(child => child.indeterminate);
  parent.isChecked = !!allChecked;
  parent.indeterminate = (allIndeterminate.length > 0) || ((allUnchecked.length < parent.children.length) && allUnchecked.length > 0);
}

// 监听复选框变化  
const handleCheckboxChange = (checkbox) => {
  let parent = null
  if (checkbox.parentId) {
    parent = auths[checkbox.parentId]
  }
  updateCheckboxState(checkbox, parent);
};

// 初始化复选框时设置parent属性  
const setCheckboxParents = (checkboxes) => {
  checkboxes.forEach(checkbox => {
    checkbox.isChecked = false;
    checkbox.indeterminate = false;
    auths[checkbox.uuid] = checkbox;
    if (authList.includes(checkbox.uuid)) {
      checkbox.isChecked = true;
      checkbox.indeterminate = false;
      handleCheckboxChange(checkbox)
    }
    if (checkbox.children) {
      setCheckboxParents(checkbox.children, checkboxes);
    }
  });
};

const loadAuthTree = async () => {
  const res = await getAuthTree();
  if (res.success) {
    treeData.value = res.data || [];
  }
};

const getAuths = () => {
  getAuthByRole().then(res => {
    if (res.success) {
      authList = res.data || [];
      setCheckboxParents(treeData.value);
    }
  })
}

const submit = () => {
  const flatArr = flattenTree(treeData.value) || [];
  console.log(flatArr.filter(item => item.isChecked || item.indeterminate));
  const params = flatArr.filter(item => item.isChecked || item.indeterminate).map(item => item.uuid);
  powerAuth(params).then(res => {
    if (res.success) {
      emit('loadData');
      closeDrawer();
      ElMessage.success('保存成功');
    } else {
      ElMessage.error(res.message);
    }
  })
}

const openDrawer = (row) => {
  currentRow.value = cloneDeep(row);
  drawer.value = true;
  loadAuthTree();
  getAuths();
}

const closeDrawer = () => {
  drawer.value = false;
}

defineExpose({
  openDrawer,
})
</script>

<style lang="scss" scoped>
.second-level-auth {
  margin-left: 20px;
}

.third-level-auth {
  display: flex;
  margin-left: 20px;
}
</style>