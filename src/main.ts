import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vant/lib/index.css';
import Vant from 'vant';
import NextPage from './components/NextPage.vue';

const app = createApp(App)

app.use(router)
app.use(Vant)
app.component('NextPage', NextPage)
app.mount('#app')