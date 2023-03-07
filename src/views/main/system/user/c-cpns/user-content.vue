<template>
  <div class="user-content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary">新建用户</el-button>
    </div>
    <div class="table">
      <ul>
        <li v-for="item in usersList" :key="item.id">{{ item.name }}</li>
      </ul>
    </div>
    <div class="pagination">分页</div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/system'
// 1发起action，请求userList的数据
const systemStore = useSystemStore()
systemStore.postUsersListAction()

// 2.获取userList的数据并展示
const { usersList } = storeToRefs(systemStore)
</script>

<style lang="less" scoped>
.user-content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 10px;

    .title {
      font-size: 22px;
    }
  }
}
</style>
