import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'


import { createApp } from "vue";
import App from "@/App.vue"
import { vuetify } from '@/plugins/vuetify'
import router from '@/router'
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(createPinia())
app.use(vuetify)
app.use(router)
app.mount("#app");
