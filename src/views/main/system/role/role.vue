<template>
  <div class="role">
    <page-search :search-config="searchConfig" @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <page-content ref="contentRef" :content-config="contentConfig" @new-click="handleNewClick" @edit-click="handleEditClick" />
    <page-modal ref="modalRef" :modal-config="modalConfig">
      <template #menuList>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
        />
      </template>
    </page-modal>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-modal/page-modal.vue'
import usePageContent from '@/hooks/usePageCotent'
import usePageModal from '@/hooks/usePageModal'
import useMainStore from '@/store/main/main'

// 逻辑关系
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()

const { modalRef, handleNewClick, handleEditClick } = usePageModal()

// 获取完整菜单
const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)
</script>

<style lang="less" scoped>
</style>
