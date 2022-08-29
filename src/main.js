import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './stores'
import './styles/index.scss'
import ELICON from './plugins/ElIcon'

const app = createApp(App)

ELICON(app)

app.use(store)
app.use(router)

app.mount('#app')
