import { createApp } from 'vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/reset.css';
import '@/assets/css/style.css';
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
