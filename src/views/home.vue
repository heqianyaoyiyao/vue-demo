<template>
  <div class="home-container">Home</div>
  <div class="upload-file">
    <UploadFile :action="uploadUrl" @uploadSuccess="uploadSuccess" />
    <div>
      <img :src="picUrl" alt="">
    </div>
  </div>
</template>

<script setup lang="ts">
  import { checkToken } from "@/service/api/user"
  import UploadFile from "@/components/upload.vue"

  const check = async() => {
    const data = await checkToken()
  }
  check()

  const { VITE_BASE_URL, VITE_LOCAT_ADDRESS } = import.meta.env
  console.log(import.meta.env)
  const uploadUrl = VITE_BASE_URL + '/api/file/upload'
  const picUrl = ref('')
  const uploadSuccess = (result: any) => {
    console.log(result)
    picUrl.value = VITE_LOCAT_ADDRESS + result.path
  }
</script>

<style scoped lang="scss">
  
</style>