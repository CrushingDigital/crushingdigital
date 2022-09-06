import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import useAuthUser from './composables/useAuthUser'
import './index.css'

import Toast, { PluginOptions } from 'vue-toastification'
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css'
import VueSocialSharing from 'vue-social-sharing'

import Home from '@/pages/Home.vue'
import About from '@/components/About.vue'
import Jobs from '@/pages/Jobs.vue'
import JobAddEdit from '@/pages/JobAddEdit.vue'
import JobAddTech from '@/pages/JobTech.vue'
import Developers from '@/pages/Developers.vue'
import Basic from '@/pages/profile/Basic.vue'
import Tech from '@/pages/profile/Tech.vue'
import Review from '@/pages/Review.vue'
import Notifications from '@/pages/Notifications.vue'
import Playground from '@/pages/Playground.vue'
import RecruiterSignup from '@/pages/RecruiterSignup.vue'
import Faq from '@/pages/Faq.vue'

const NotFound = () => import('./components/NotFound.vue')
const { isLoggedIn } = useAuthUser()

const routes = [
  { path: '/', component: Developers, name: 'Home' },
  { path: '/', component: Jobs, name: 'Jobs' },
  { path: '/about', component: About },
  { path: '/recruiters', component: RecruiterSignup, name: 'recruiters' },
  { path: '/developers', redirect: '/' },
  { path: '/jobs', component: Jobs, name: 'jobs' },
  { path: '/job/new', component: JobAddEdit, name: 'job-new' },
  { path: '/job/:id/edit', component: JobAddEdit, name: 'job-edit', props: true },
  { path: '/job/:id/tech', component: JobAddTech, name: 'job-tech', props: true },
  { path: '/notifications', component: Notifications, name: 'notifications' },
  { path: '/profile/', redirect: { name: 'basic' } },
  { path: '/profile/basic', component: Basic, name: 'basic' },
  { path: '/profile/tech', component: Tech, name: 'tech' },
  { path: '/review/:id', component: Review, name: 'review' },
  { path: '/faq', component: Faq, name: 'faq' },
  { path: '/playground', component: Playground, name: 'playground' },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
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
app.use(VueSocialSharing)

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
