<template>
  <el-dialog v-model="drawer" :show-close="false" @close="closeDrawer">
    <template #header>
      <h4>{{ title }}</h4>
    </template>
    <template #default>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名" prop="reallyName">
              <el-input v-model="form.reallyName" placeholder="请输入姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="gender">
              <el-radio-group v-model="form.gender">
                <el-radio value="male">男</el-radio>
                <el-radio value="female">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" placeholder="请输邮箱"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入电话号码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="地址" prop="address">
              <el-input v-model="form.address" placeholder="请输入地址" type="textarea" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="角色" prop="roleIds">
              <el-select v-model="form.roleIds" placeholder="请选择" style="width: 100%" multiple filterable>
                <el-option
                  v-for="item in roleOptions"
                  :key="item.uuid"
                  :label="item.name"
                  :value="item.uuid"
                />
              </el-select>
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
import { createUser, updateUser } from '@/services/user';
import { findAllByNoPage } from '@/services/role';
import { ElMessage } from 'element-plus';
import { cloneDeep } from 'lodash'

const drawer = ref(false);
const formRef = ref()
const form = ref({
  username: '',
  reallyName: '',
  avatar: '',
  gender: 'male',
  email: '',
  phone: '',
  status: 1,
  address: '',
  roleIds: []
});

const rules = reactive({
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur',
    },
  ],
  reallyName: [
    {
      required: true,
      message: '请输入姓名',
      trigger: 'blur',
    },
  ],
  gender: [
    {
      required: true,
      message: '请选择性别',
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
  email: [
    {
      required: true,
      message: '请输入邮箱',
      trigger: 'blur',
    },
  ],
  phone: [
    {
      required: true,
      message: '请输入电话号码',
      trigger: 'blur',
    },
  ],
})

const title = ref('添加')
const emit = defineEmits(['loadData'])

const handleCreate = (params) => {
  createUser(params).then(res => {
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
  updateUser(params).then(res => {
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
      const roleIds = state.tableData.filter(ele => ele.isChecked).map(ele => ele.uuid);
      const params = {
        username: form.value.username,
        reallyName: form.value.reallyName,
        avatar: form.value.avatar,
        gender: form.value.gender,
        email: form.value.email,
        phone: form.value.phone,
        address: form.value.address,
        status: form.value.status,
        roleIds,
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

const roleOptions = ref([])

// 获取所有角色
const getRoles = () => {
  findAllByNoPage().then(res => {
    if (res.success) {
      roleOptions.value = res.data
    }
  })
}

const resetForm = () => {
  form.value = {
    username: '',
    reallyName: '',
    avatar: '',
    gender: 'male',
    email: '',
    phone: '',
    status: 1,
    roleIds: []
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
  getRoles()
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