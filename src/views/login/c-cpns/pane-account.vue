<template>
  <div class="pane-account">
    <el-form
      ref="formRef"
      :model="account"
      :rules="accountRules"
      label-width="60px"
      size="large"
      status-icon
    >
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import useLoginStore from '@/store/login/login'
import type { IAccount } from '@/types'

// 1.定义account的数据
const account = reactive<IAccount>({
  name: '',
  password: ''
})

// 2.定义校验规则
const accountRules: FormRules = {
  name: [
    { required: true, message: '必须输入帐号信息', trigger: 'blur' },
    { pattern: /^[a-z0-9]{6,20}$/, message: '必须是6~20个字母或数字', trigger: 'change' }
  ],
  password: [
    { required: true, message: '必须输入密码~', trigger: 'blur' },
    { pattern: /^[a-z0-9]{3,}$/, message: '密码必须在3位以上', trigger: 'change' }
  ]
}

// 3.执行帐号登录的逻辑
const formRef = ref<FormInstance>()
const loginStore = useLoginStore()
function loginAction() {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 1.获取用户输入的帐号和密码
      const name = account.name
      const password = account.password
      // 2.向服务器发送网络请求（携带账号和密码）
      loginStore.loginAccountAction({ name, password })
    } else {
      ElMessage.error('帐号或者密码输入的规则错误~')
    }
  })
}
defineExpose({
  loginAction
})
</script>

<style lang="less" scoped>
.pane-account {
  color: red;
}
</style>
