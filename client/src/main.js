import '../src/assets/css/style-prefix.css'
import '../src/assets/css/bootstrap-login-form.min.css'
import vue3GoogleLogin from 'vue3-google-login'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { markRaw } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

pinia.use(({ store }) => {
    store.$router = markRaw(router)
  })

app.use(pinia)
app.use(router)
app.use(Toast)
app.use(vue3GoogleLogin, {
  clientId: '546474791898-60v692bftrdoncb33onlaaa2aba1kg0t.apps.googleusercontent.com'
})

app.mount('#app')
