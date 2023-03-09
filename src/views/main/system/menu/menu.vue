<template>
  <div class="menu">
    <page-content :content-config="contentConfig" />
  </div>
</template>

<script setup lang="ts" name="menu">
import contentConfig from './config/content.config'
import PageContent from '@/components/page-content/page-content.vue'
</script>

<style scoped>
.menu {
}
</style>
