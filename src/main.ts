import { createApp } from 'vue'
import { router } from './router/router'
import 'normalize.css'
import './assets/css/index.less'
import App from './App.vue'
import { pinia } from './store'
import registerIcons from './global/register-icons'

const app = createApp(App)
app.use(registerIcons)
app.use(router)
app.use(pinia)
app.mount('#app')
