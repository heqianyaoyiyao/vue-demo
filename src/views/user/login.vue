<template>
  <div class="login-container">
    <div class="login-form">
      <el-form :model="form" class="form" label-width="80" ref="formRef" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" />
        </el-form-item>
        <div class="button">
          <el-button @click="loginHandler(formRef)" type="primary">登录</el-button>
          <el-button @click="resetPasswordHandler(formRef)">重置密码</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { login, getResetPasswordToken } from '@/service/api/user'
  import { useRouter } from 'vue-router'
  import { userStore } from '@/stores/modules/user'

  const rules = {
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
    ]
  }

  const form = reactive({
    username: 'admin',
    password: 'admin'
  })

  const router = useRouter()
  const formRef:any = ref(null)
  const loginHandler = async(formEl: any) => {
    if (!formEl) return
    await formEl.validate(async (valid: any, fields: any) => {
      if (valid) {
        const { code, data } = await login({
          ...form
        })
        if (code === 200) {
          ElMessage.success('登录成功')
          userStore().setAccessToken(data.token)
          userStore().setUserInfo(data.user)
          router.push({
            path: '/index'
          })
        }
      }
    })
  }

  const resetPasswordHandler = async(formEl: any) => {
    if (!formEl) return
    await formEl.validateField(['username'], async (valid: any) => {
      if (valid) {
        const { code, data } = await getResetPasswordToken({
          username: form.username
        })
        if (code === 200) {
          router.push({
            path: `/resetPassword/${data}`
          })
        }
      }
    })
  }

  onMounted(() => {
    userStore().setAccessToken('')
    userStore().setUserInfo({})
  })
</script>

<style scoped lang="scss">
  .login-container {
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;

    .login-form {
      width: 400px;

      .button {
        display: flex;
        justify-content: center;
      }
    }
  }
</style>