<template>
  <div class="reset-password-container">
    <div class="conatiner">
      <el-form :model="form" class="form" label-width="80" ref="formRef" :rules="rules">
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="form.newPassword" type="password" />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" type="password" />
        </el-form-item>
        <div class="button">
          <el-button @click="resetPasswordHandler(formRef)" type="primary">重置密码</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRoute,useRouter } from "vue-router"
  import { resetPassword } from '@/service/api/user'

  const form = reactive({
    newPassword: '',
    confirmPassword: ''
  })
  const checkPassword = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error('请再次输入密码'))
    } else if (value !== form.newPassword) {
      return callback(new Error('密码不一致'))
    } else {
      callback()
    }
  }
  const rules = {
    newPassword: [
      { required: true, message: '请输入密码', trigger: 'blur' },
    ],
    confirmPassword: [
      { required: true, validator: checkPassword, trigger: 'change' }
    ],
  }

  const route = useRoute()
  const router = useRouter()

  const token = route.params.token
  const formRef = ref(null)
  const resetPasswordHandler = async(formEl: any) => {
    if (!formEl) return
    await formEl.validate(async (valid: any, fields: any) => {
      if(valid) {
        const { code, data } = await resetPassword({
          resetToken: token,
          newPassword: form.newPassword
        })
        if (code === 200) {
          ElMessage.success('重置密码成功')
          router.push({
            path: '/login'
          })
        }
      }
    })
  }

</script>

<style scoped lang="scss">
  .reset-password-container {
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;

    .conatiner {
      width: 400px;

      .button {
        display: flex;
        justify-content: center;
      }
    }
  }
</style>