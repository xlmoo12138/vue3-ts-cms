<template>
  <div class="modal">
    <el-dialog v-model="dialogVisible" title="新建用户" width="30%" center>
      <span>
        哈行昂昂
      </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dialogVisible = ref(false)

// 定义设置dialogVisible的方法
function setDialogVisible() {
  // 这里可以做一层拦截
  dialogVisible.value = true
}

// 暴露属性和方法
defineExpose({
  setDialogVisible
})
</script>

<style lang="less" scoped>
.modal {
  color: red;
}
</style>
