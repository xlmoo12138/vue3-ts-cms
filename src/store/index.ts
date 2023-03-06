import { createPinia } from 'pinia'
import type { App } from 'vue'
import useLoginStore from './login/login'

const pinia = createPinia()
function registerStore(app: App) {
  // 1.use pina
  app.use(pinia)
  // 2.加载本地的数据
  const localStore = useLoginStore()
  localStore.loadLocalCacheAction()
}

export default registerStore
