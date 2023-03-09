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
    <page-modal ref="modalRef" :modal-config="modalConfigRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import { computed } from 'vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import PageModal from '@/components/page-modal/page-modal.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageSearch from '@/components/page-search/page-search.vue'
import useMainStore from '@/store/main/main'
import usePageContent from '@/hooks/usePageCotent'
import usePageModal from '@/hooks/usePageModal'

// 对modalConfig进行操作
const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  const departments = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })
  modalConfig.formItems.forEach((item: any) => {
    if (item.prop === 'parentId') {
      item.options.push(...departments)
    }
  })

  return modalConfig
})
// setup相同逻辑的抽取：hooks
// 点击search， content的操作
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()

// 点击content， modal的操作
const { modalRef, handleNewClick, handleEditClick } = usePageModal()
</script>

<style scoped>
</style>
