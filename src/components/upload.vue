<template>
  <div class="upload-container">
    <el-upload v-model:file-list="files" class="upload-demo"
      :action="action" :multiple="isMultiple" :on-preview="handlePreview"
      :on-remove="handleRemove" :before-remove="beforeRemove" :limit="limit"
      :on-exceed="handleExceed" :on-success="uploadSuccess" :headers="headers" :accept="accept">
      <el-button type="primary">Click to upload</el-button>
      <!-- <template #tip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500KB.
        </div> 
      </template> -->
    </el-upload>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import { ElMessage, ElMessageBox } from 'element-plus'

import type { UploadProps } from 'element-plus'
import { userStoreHook } from "@/stores/modules/user";

const props = defineProps({
  action: {
    type: String,
    default: ''
  },
  fileList: {
    type: Array<any>,
    default: () => []
  },
  isMultiple: {
    type: Boolean,
    default: false
  },
  limit: {
    type: Number,
    default: 1
  },
  accept: {
    type: String,
    default: "pnh, jpg, jpeg, gif"
  }
})

const headers = {
  authorization: userStoreHook().access_token || ''
}

const files = computed(() => {
  return props.fileList
})

const emits = defineEmits(['uploadSuccess'])

const uploadSuccess = (response: any) => {
  const { data, code, message } = response
  if (code === 200) {
    emits('uploadSuccess', data)
  }else {
    ElMessage.error(message)
  }
}

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${files.length + uploadFiles.length
    } totally`
  )
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `Cancel the transfer of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  )
}
</script>

<style scoped lang="scss"></style>