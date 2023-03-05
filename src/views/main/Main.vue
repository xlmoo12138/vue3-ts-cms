<template>
  <div class="main">
    <h2>main</h2>
    <button @click="handleExitClick">退出登录</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'

const router = useRouter()
function handleExitClick() {
  // 1删除token
  localCache.removeCache(LOGIN_TOKEN)
  // 2跳回到login页面
  router.push('/login')
}
</script>

<style lang="less" scoped>
.main {
  color: red;
}
</style>
