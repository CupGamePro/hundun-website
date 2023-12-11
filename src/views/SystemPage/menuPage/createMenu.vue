<template>
  <el-drawer v-model="menuDrawer" :show-close="false" @close="closeDrawer">
    <template #header>
      <h4>新建</h4>
    </template>
    <template #default>
      <el-form ref="menuFormRef" :model="menuForm" :rules="rules" label-width="100px">
        <el-form-item label="类别" prop="type">
          <el-radio-group v-model="menuForm.type">
            <el-radio :label="1">目录</el-radio>
            <el-radio :label="2">菜单</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="父级" prop="parentId">
          <el-select v-model="menuForm.parentId" placeholder="请选择父级目录" style="width: 100%" @change="changeParent">
            <el-option :label="item.name" :value="item.uuid" v-for="item in catalogOptions" :key="item.uuid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="menuForm.name" placeholder="请输入目录名称"></el-input>
        </el-form-item>
        <el-form-item label="编码" prop="code">
          <el-input v-model="menuForm.code" placeholder="请输入目录编码">
            <template #prepend>CP - </template>
          </el-input>
        </el-form-item>
        <el-form-item label="组件路径" prop="path" v-if="menuForm.type === 2">
          <el-input v-model="menuForm.path" placeholder="请输入组件路径"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input v-model="menuForm.icon" placeholder="请输入Icon名称"></el-input>
        </el-form-item>
        <el-form-item label="序号" prop="sort">
          <el-input-number v-model="menuForm.sort"></el-input-number>
        </el-form-item>
        <el-form-item label="描述" prop="describe">
          <el-input v-model="menuForm.describe" placeholder="请输入描述" type="textarea" maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch v-model="menuForm.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
    </template>

    <template #footer>
      <div style="display: flex; justify-content: flex-start;">
        <el-button type="primary" @click="submitForm(menuFormRef)">保 存</el-button>
        <el-button @click="closeDrawer">取 消</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup>
import { ref, reactive, defineExpose, defineEmits } from 'vue';
import { createMenu, getCatalogs, updateMenu } from '@/services/menuService';
import { ElMessage } from 'element-plus';
import { cloneDeep } from 'lodash'

const menuDrawer = ref(false);
const menuFormRef = ref()
const menuForm = ref({
  type: 1,
  parentId: '',
  code: '',
  name: '',
  sort: 0,
  level: 1,
  icon: '',
  describe: '',
  status: 1,
  path: '',
});

const catalogOptions = ref([]);

const rules = reactive({
  type: [
    {
      required: true,
      message: '请选择类型',
      trigger: 'change',
    },
  ],
  code: [
    {
      required: true,
      message: '请输入编码',
      trigger: 'blur',
    },
  ],
  name: [
    {
      required: true,
      message: '请输入名称',
      trigger: 'blur',
    },
  ],
})

const emit = defineEmits(['loadData'])

const handleCreate = (params) => {
  createMenu(params).then(res => {
    if (res.code && res.code === 200) {
      emit('loadData');
      closeDrawer();
      ElMessage.success('保存成功');
    } else {
      console.log(res);
      ElMessage.error(res.message);
    }
  })
}

const handleEdit = (params) => {
  params.uuid = menuForm.value.uuid
  updateMenu(params).then(res => {
    if (res.code && res.code === 200) {
      emit('loadData');
      closeDrawer();
      ElMessage.success('保存成功');
    } else {
      console.log(res);
      ElMessage.error(res.message);
    }
  })
}

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      const params = {
        type: menuForm.value.type,
        parentId: menuForm.value.parentId,
        name: menuForm.value.name,
        sort: menuForm.value.sort,
        level: menuForm.value.level,
        icon: menuForm.value.icon,
        describe: menuForm.value.describe,
        status: menuForm.value.status,
        path: menuForm.value.path,
        code: `CP-${menuForm.value.code}`,
      }
      if (menuForm.value.uuid) {
        handleEdit(params);
      } else {
        handleCreate(params);
      }
    } else {
      console.log('error submit!')
      return false
    }
  })
}

// 获取所有目录
const handleCatalogs = () => {
  getCatalogs().then(res => {
    if (res.code && res.code === 200) {
      catalogOptions.value = res.data;
    }
  })
}
handleCatalogs()

// 改变父级
const changeParent = () => {
  const parent = catalogOptions.value.find(item => item.uuid === menuForm.value.parentId);
  menuForm.value.level = parent.level + 1;
}

const resetForm = () => {
  menuForm.value = {
    type: 1,
    parentId: '',
    code: '',
    name: '',
    sort: 0,
    level: 1,
    icon: '',
    describe: '',
    status: 1,
    path: '',
  }
}


const openDrawer = (row) => {
  if (row) {
    const value = cloneDeep(row);
    if (row.uuid) {
      value.code = value.code.replace('CP-', '');
      menuForm.value = value;
    } else {
      menuForm.value.parentId = row.parentId;
    }
    
  } else {
    resetForm();
  }
  menuDrawer.value = true;
}

const closeDrawer = () => {
  menuDrawer.value = false;
  resetForm();
}

defineExpose({
  openDrawer,
})
</script>
