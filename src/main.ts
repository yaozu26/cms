import { createApp } from 'vue'
import 'element-plus/theme-chalk/el-message.css'

import 'normalize.css'
import './assets/css/index.less'

import App from './App.vue'
import router from './router'
import store from './store'
import registerIcons from './global/register-icon'

const app = createApp(App)

// 全局引入ElementPlusIcon图标
registerIcons(app)
app.use(store)
app.use(router)
app.mount('#app')
