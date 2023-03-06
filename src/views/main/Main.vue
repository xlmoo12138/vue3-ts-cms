<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside width="210px">
        <main-menu />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <main-header />
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import MainMenu from '@/components/main-menu/main-menu.vue'
import MainHeader from '@/components/main-header/main-header.vue'
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
