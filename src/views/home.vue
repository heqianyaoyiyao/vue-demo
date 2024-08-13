<template>
  <div class="home-container">Home</div>
</template>

<script setup lang="ts">
  import { checkToken } from "@/service/api/user"

  const check = async() => {
    const data = await checkToken()
  }
  
  check()
</script>

<style scoped lang="scss">
  
</style>