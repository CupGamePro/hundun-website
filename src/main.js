import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './stores'
import './styles/index.scss'
import ELICON from './plugins/ElIcon'
import "./permission";
import "./utils/patch.js";

const app = createApp(App)

ELICON(app)
app.use(router)
app.use(store)

app.mount('#app')
