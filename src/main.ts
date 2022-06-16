import { createApp } from 'vue'
import { createRouter, createWebHistory, RouterOptions } from 'vue-router';
import App from './App.vue'
import useAuthUser from './composables/useAuthUser';
import './index.css'

import Home from './components/Home.vue'
import About from './components/About.vue'
import Jobs from './components/Jobs.vue'
import DevList from './components/DeveloperList.vue'
import CandidateRegister from './components/candidate/Register.vue'

const { isLoggedIn } = useAuthUser();

const routes = [
  { path: '/', component: Home, name: "Home" },
  { path: '/about', component: About },
  { path: '/developers', component: DevList },
  { path: '/jobs', component: Jobs, meta: { requiresAuth: true } },
  { path: '/candidate/register', component: CandidateRegister },
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