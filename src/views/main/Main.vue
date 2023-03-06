<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header height="50px">Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
  <!-- <h2>main</h2>
  <button @click="handleExitClick">退出登录</button> -->
</template>

<script setup lang="ts">
// import { useRouter } from 'vue-router'
// import { LOGIN_TOKEN } from '@/global/constants'
// import { localCache } from '@/utils/cache'

// const router = useRouter()
// function handleExitClick() {
//   // 1删除token
//   localCache.removeCache(LOGIN_TOKEN)
//   // 2跳回到login页面
//   router.push('/login')
// }
</script>

<style lang="less" scoped>
.main {
  color: red;
  height: 100%;
}

.main-content {
  height: 100%;

  .el-aside {
    background-color: peru;
  }

  .el-header {
    background-color: skyblue;
  }

  .el-main {
    background-color: slateblue;
  }
}
</style>
