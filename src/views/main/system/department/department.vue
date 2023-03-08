<template>
  <div class="department">
    <page-search :search-config="searchConfig" @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <page-content
      ref="contentRef"
      :content-config="contentConfig"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    >
      <template #leader="scope">ha--{{ scope.row[scope.prop] }}</template>
      <template #parent="scope">ha--{{ scope.row[scope.prop] }}</template>
    </page-content>
    <page-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import { ref } from 'vue'
import PageModal from './c-cpns/page-modal.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import PageContent from '@/components/page-content/page-content.vue'
import PageSearch from '@/components/page-search/page-search.vue'

const contentRef = ref<InstanceType<typeof PageContent>>()
function handleQueryClick(queryInfo: any) {
  contentRef.value?.fetchPageListData(queryInfo)
}
function handleResetClick() {
  contentRef.value?.fetchPageListData()
}

const modalRef = ref<InstanceType<typeof PageModal>>()
// 点击content， modal的操作
function handleNewClick() {
  modalRef.value?.setModalVisible(true)
}
function handleEditClick(itemData: any) {
  modalRef.value?.setModalVisible(false, itemData)
}
</script>

<style scoped>
</style>
