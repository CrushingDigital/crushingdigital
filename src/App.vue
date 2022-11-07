<template>
  <div class="navbar container mx-auto max-w-5xl">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3 sm:h-5 sm:w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </label>
        <ul
          id="menu"
          tabindex="0"
          class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 dark:bg-slate-700 w-52"
        >
          <li class="py-1" @click="closeMenu" v-if="!isCandidate() && isLoggedIn()">
            <router-link
              to="/profile/basic"
              class="p-4 bg-secondary text-white no-underline hover:text-white hover:bg-primary"
              >Get started</router-link
            >
          </li>
          <li class="py-1" v-if="isLoggedIn()" @click="closeMenu">
            <router-link :to="{ name: 'basic' }">My Profile</router-link>
          </li>
          <li class="py-1" v-if="isLoggedIn()" @click="closeMenu">
            <router-link :to="{ name: 'tech' }">My Tech Stack</router-link>
          </li>
          <li class="py-1" v-if="isLoggedIn()" @click="closeMenu">
            <router-link :to="{ name: 'notifications' }">My Feedback</router-link>
          </li>
          <li class="py-1" @click="closeMenu">
            <router-link :to="{ name: 'home' }">Developers</router-link>
          </li>
          <li class="py-1" @click="closeMenu">
            <router-link :to="{ name: 'jobs' }">Jobs</router-link>
          </li>
          <li class="py-1" v-if="isLoggedIn() && isCandidate()" @click="closeMenu">
            <button
              class="bg-green-500 p-4 text-white no-underline"
              @click="requestReview"
              title="Request a review of your profile"
            >
              Profile Verification<i class="fa-solid fa-clipboard-check text-white"></i>
            </button>
          </li>
          <li class="py-1" v-if="isVerified(candidate) && !isApproved(candidate)" @click="closeMenu">
            <button
              class="bg-yellow-400 p-4 text-black no-underline"
              @click="requestApproval"
              title="Schedule a profile approval chat"
            >
              Profile Approval<i class="fa-solid fa-star text-black"></i>
            </button>
          </li>
        </ul>
      </div>
      <a class="btn btn-ghost normal-case px-0">
        <h2 class="text-base md:text-2xl cursor-pointer mr-1" @click="$router.push({ name: 'home' })">
          Crushing<span class="text-primary">Digital</span>
        </h2>
      </a>
      <i class="fa-solid fa-person-digging text-gray-300 mt-2 text-sm" title="v0.3 - Jobs listed!"></i>
    </div>
    <div class="navbar-end">
      <!-- NOTIFICATIONS -->
      <div class="flex justify-end items-center align-bottom">
        <button @click="toggleDark()" v-if="isDark">
          <i class="fa-solid fa-sun mr-2"></i>
        </button>
        <button @click="toggleDark()" v-else>
          <i class="fa-solid fa-moon mr-2"></i>
        </button>
      </div>
      <div class="flex justify-end items-center align-bottom" v-if="isLoggedIn()">
        <Notification />
        <!-- LOGOUT -->
        <a @click.prevent="signout" class="text-normal ml-2">
          <i class="fa-solid fa-arrow-right-from-bracket"></i>
        </a>
      </div>
      <div class="flex justify-end" v-else>
        <span class="text-xxs mr-1">Sign in:</span>
        <a @click.prevent="signInWith('github')" class="text-black mr-1 dark:text-slate-300">
          <i class="fa-brands fa-github fa-lg"></i
        ></a>
        <a @click.prevent="signInWith('linkedin')" class="text-linkedin"><i class="fa-brands fa-linkedin fa-lg"></i></a>
      </div>
    </div>
  </div>

  <div class="container mx-auto max-w-3xl px-4 sm:p-0 border-0 flex flex-col justify-start mt-1 dark:bg-slate-800">
    <router-view></router-view>
  </div>

  <div class="container mx-auto max-w-3xl px-4 sm:p-0 border-0 flex flex-col mt-8 text-gray-400 text-sm" id="footer">
    <div class="flex justify-center">
      <a href="https://www.linkedin.com/company/crushingdigital/"
        ><i class="fa-brands fa-xl fa-linkedin mx-4 text-gray-300 hover:text-gray-400"></i
      ></a>
      <a href="https://www.tiktok.com/@crushingdigital"
        ><i class="fa-brands fa-xl fa-tiktok mx-4 text-gray-300 hover:text-gray-400"></i
      ></a>
      <a href="https://twitter.com/crushingdigital"
        ><i class="fa-brands fa-xl fa-twitter mx-4 text-gray-300 hover:text-gray-400"></i
      ></a>
      <a href="https://www.instagram.com/crushingdigital/"
        ><i class="fa-brands fa-xl fa-instagram mx-4 text-gray-300 hover:text-gray-400"></i
      ></a>
    </div>
    <div class="flex justify-center mt-4">
      <router-link :to="{ name: 'about' }" class="mx-2">About</router-link>
      <router-link :to="{ name: 'faq' }" class="mx-2">FAQ's</router-link>
    </div>
    <div class="flex justify-center mt-4">
      <span class="text-gray-300">&#169; Copyright 2022 - Crushing Digital Ltd.</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Notification from '@/components/Notification.vue'
  import { useRouter } from 'vue-router'
  import useAuthUser from '@/composables/useAuthUser'
  import useCandidate from '@/composables/useCandidate'
  import { ref, onBeforeMount, watch } from 'vue'
  import { Provider } from '@supabase/supabase-js'
  import { useToast } from 'vue-toastification'

  const router = useRouter()
  const toast = useToast()
  const { user, login, logout, isLoggedIn } = useAuthUser()
  const { loadProfile, verifyCandidate, isApproved, isVerified, isCandidate, candidate } = useCandidate()
  const isDark = ref(false)

  onBeforeMount(async () => {
    console.log(isDark.value)
    isDark.value = localStorage.theme == 'dark' ? true : false
  })

  watch(isDark, () => {
    localStorage.setItem('theme', isDark.value ? 'dark' : 'cmyk')
    document.body.classList.toggle('dark')
  })

  async function signInWith(provider: Provider) {
    await login(provider)

    // User is automatically redirected to homepage by Supabase
  }

  async function signout() {
    await logout()
    router.push({ name: 'home' })
  }

  const toggleDark = () => {
    isDark.value = !isDark.value
  }

  const closeMenu = () => {
    ;(document.activeElement as HTMLElement).blur()
  }

  const requestReview = async () => {
    let candidate = ref()
    if (user.value) candidate.value = await loadProfile(user.value.id)

    let verifyTS = new Date().toISOString().toLocaleString()
    const res = await verifyCandidate(candidate.value.id, verifyTS)

    if (res instanceof Error) toast.error('Review request failed')
    else toast.success('Review requested')
  }

  const requestApproval = () => {
    window.open('https://calendly.com/crushingdigital/profile-review', '_blank')
  }
</script>

<style scoped></style>
