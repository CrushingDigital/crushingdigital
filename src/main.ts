import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue'
import './index.css'

import Home from './components/Home.vue'
import About from './components/About.vue'
import Jobs from './components/Jobs.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/jobs', component: Jobs },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')
