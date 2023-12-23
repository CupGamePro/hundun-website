<template>
  <el-dialog v-model="drawer" :show-close="false" @close="closeDrawer">
    <template #header>
      <h4>{{ title }}</h4>
    </template>
    <template #default>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="角色名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入角色名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="角色编码" prop="code">
              <el-input v-model="form.code" placeholder="请输入角色编码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="描述" prop="description">
              <el-input v-model="form.description" placeholder="请输入描述" type="textarea" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="状态" prop="status">
              <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>

    <template #footer>
      <div style="display: flex; justify-content: center;">
        <el-button type="primary" @click="submitForm(formRef)">保 存</el-button>
        <el-button @click="closeDrawer">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, defineExpose, defineEmits } from 'vue';
import { createRole, updateRole } from '@/services/role';
import { ElMessage } from 'element-plus';
import { cloneDeep } from 'lodash'

const drawer = ref(false);
const formRef = ref()
const form = ref({
  name: '',
  code: '',
  description: '',
  status: 1,
});

const rules = reactive({
  name: [
    {
      required: true,
      message: '请输入角色名称',
      trigger: 'blur',
    },
  ],
  code: [
    {
      required: true,
      message: '请输入角色编码',
      trigger: 'blur',
    },
  ],
  status: [
    {
      required: true,
      message: '请选择状态',
      trigger: 'blur',
    },
  ],
})
const title = ref('添加')

const emit = defineEmits(['loadData'])

const handleCreate = (params) => {
  createRole(params).then(res => {
    if (res.code && res.code === 200) {
      emit('loadData');
      closeDrawer();
      ElMessage.success('保存成功');
    } else {
      ElMessage.error(res.message);
    }
  })
}

const handleEdit = (params) => {
  params.uuid = form.value.uuid
  updateRole(params).then(res => {
    if (res.code && res.code === 200) {
      emit('loadData');
      closeDrawer();
      ElMessage.success('保存成功');
    } else {
      ElMessage.error(res.message);
    }
  })
}

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      const params = {
        name: form.value.name,
        code: form.value.code,
        description: form.value.description,
        status: form.value.status,
      }
      if (form.value.uuid) {
        handleEdit(params);
      } else {
        handleCreate(params);
      }
    } else {
      return false
    }
  })
}

const resetForm = () => {
  form.value = {
    name: '',
    code: '',
    description: '',
    status: 1,
  }
}


const openDrawer = (row) => {
  if (row) {
    const value = cloneDeep(row);
    if (row.uuid) {
      title.value = '编辑';
      form.value = value;
    }

  } else {
    resetForm();
  }
  drawer.value = true;
}

const closeDrawer = () => {
  drawer.value = false;
  resetForm();
}

defineExpose({
  openDrawer,
})
</script>
@/services/role