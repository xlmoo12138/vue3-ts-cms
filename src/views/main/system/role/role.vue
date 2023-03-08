<template>
  <div class="role">
    <page-search :search-config="searchConfig" />
  </div>
</template>

<script setup lang="ts">
import searchConfig from './config/search.config'
import PageSearch from '@/components/page-search/page-search.vue'
</script>

<style lang="less" scoped>
.role {
}
</style>
