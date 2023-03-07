<template>
  <div class="user">
    <user-search @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <user-content ref="contentRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UserSearch from './c-cpns/user-search.vue'
import UserContent from './c-cpns/user-content.vue'
const contentRef = ref<InstanceType<typeof UserContent>>()
function handleQueryClick(formData: any) {
  contentRef.value?.fetchUsersListData(formData)
}
function handleResetClick() {
  contentRef.value?.fetchUsersListData()
}
</script>

<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
