import { createApp } from 'vue'
import { router } from './router'
import 'normalize.css'
import './assets/css/index.less'
import App from './App.vue'
import icons from './global/register-icons'
import store from './store'

const app = createApp(App)
app.use(icons)
app.use(store)
app.use(router)
app.mount('#app')
