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
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
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
                <el-radio label="male">男</el-radio>
                <el-radio label="female">女</el-radio>
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

            </el-form-item>
          </el-col>
          <el-col :span="24">
            <div class="table-box" style="margin-left: 60px">
              <el-table :data="state.tableData" style="width: 100%; margin-bottom: 20px" border ref="tableRef">
                <el-table-column label="角色名称" prop="name"></el-table-column>
                <el-table-column label="角色编码" prop="code"></el-table-column>
                <el-table-column label="操作" width="80px" align="center">
                  <template #default="scope">
                    <el-checkbox v-model="scope.row.isChecked" size="small" />
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="pagination-box">
              <el-pagination v-model:current-page="pagination.currentPage" background
                layout="total, sizes, prev, pager, next" :total="state.total" v-model:page-size="pagination.pageSize" />
            </div>
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
import { getRoleList } from '@/services/role';
import { ElMessage } from 'element-plus';
import { cloneDeep } from 'lodash'

const drawer = ref(false);
const formRef = ref()
const tableRef= ref()
const form = ref({
  username: '',
  password: '',
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
  password: [
    {
      required: true,
      message: '请输入密码',
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
  params.user.uuid = form.value.uuid
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
        user: {
          username: form.value.username,
          password: form.value.password,
          reallyName: form.value.reallyName,
          avatar: form.value.avatar,
          gender: form.value.gender,
          email: form.value.email,
          phone: form.value.phone,
          address: form.value.address,
          status: form.value.status,
        },
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

const pagination = reactive({
  page: 1,
  pageSize: 10,
})

const state = reactive({
  tableData: [],
  total: 0,
})

// 获取所有角色
const getRoles = () => {
  const params = {
    page: pagination.page,
    pageSize: pagination.pageSize,
    condition: {
      status: 1,
    },
  }
  getRoleList(params).then(res => {
    if (res.success) {
      const selectArr = form.value.roleIds || [];
      state.tableData = res.data.content.map(ele => {
        ele.isChecked = selectArr.includes(ele.uuid);
        return ele;
      });
      state.total = res.data.total;
    }
  })
}

const resetForm = () => {
  form.value = {
    username: '',
    password: '',
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
@/services/role@/services/user