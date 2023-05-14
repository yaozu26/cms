import { createPinia } from 'pinia'
import type { App } from 'vue'
import useLoginStore from './login/login'

const pinia = createPinia()

function registerStore(app: App) {
  // 注册 pinia
  app.use(pinia)

  // 加载本地数据
  const loginStore = useLoginStore()
  loginStore.loadLocalCachedAction()
}

export default registerStore
