import { createApp } from 'vue'
import { createRouter, createWebHistory, RouterOptions } from 'vue-router';
import App from './App.vue'
import useAuthUser from './composables/useAuthUser';
import './index.css'

import Home from './components/Home.vue'
import About from './components/About.vue'
import Jobs from './components/Jobs.vue'

const { isLoggedIn } = useAuthUser();

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/jobs', component: Jobs, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {

const { isLoggedIn } = useAuthUser();
if (!isLoggedIn() && to.meta.requiresAuth) {
  return { name: "Home" };
}
});

const app = createApp(App)
app.use(router)
app.mount('#app')