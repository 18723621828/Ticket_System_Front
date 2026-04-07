import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

// 引入Mock API配置
import './../mock/api'

const app = createApp(App)
app.use(router)
app.use(Antd)
app.mount('#app')
