import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import useAuthUser from './composables/useAuthUser'
import './index.css'

import Toast, { PluginOptions } from 'vue-toastification'
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css'

import Home from '@/pages/Home.vue'
import About from '@/components/About.vue'
import Jobs from '@/components/Jobs.vue'
import DevList from '@/pages/Developers.vue'
import Basic from '@/pages/profile/Basic.vue'
import Tech from '@/pages/profile/Tech.vue'
import Review from '@/pages/Review.vue'
import Notifications from '@/pages/Notifications.vue'

const NotFound = () => import('./components/NotFound.vue')
const { isLoggedIn } = useAuthUser()

const routes = [
  { path: '/', component: Home, name: 'Home' },
  { path: '/about', component: About },
  { path: '/developers', component: DevList },
  { path: '/jobs', component: Jobs, meta: { requiresAuth: true } },
  { path: '/notifications', component: Notifications, name: 'notifications' },
  { path: '/profile/', redirect: { name: 'basic' } },
  { path: '/profile/basic', component: Basic, name: 'basic' },
  { path: '/profile/tech', component: Tech, name: 'tech' },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  { path: '/review/:id', component: Review, name: 'review' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const { isLoggedIn } = useAuthUser()
  if (!isLoggedIn() && to.meta.requiresAuth) {
    return { name: 'Home' }
  }
})

const app = createApp(App)
app.use(router)

const options: PluginOptions = {
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: 'button',
  icon: true,
  rtl: false,
}
app.use(Toast, options)

app.mount('#app')
