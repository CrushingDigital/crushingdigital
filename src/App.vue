<template>
  <div class="navbar container mx-auto max-w-5xl">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </label>
        <ul id="menu" tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 w-52">
          <li class="py-1" @click="closeMenu">
            <router-link to="/profile/basic" class="text-secondary">&raquo; Get started &laquo;</router-link>
          </li>
          <li class="py-1" @click="closeMenu">
            <router-link to="/developers">Home</router-link>
          </li>
          <li class="py-1">
            <router-link to="/about" @click="closeMenu">About</router-link>
          </li>
          <li class="py-1">
            <router-link to="/faq" @click="closeMenu">FAQ's</router-link>
          </li>
          <li class="py-1" v-if="user" @click="closeMenu">
            <router-link to="/profile/basic">Personal Info</router-link>
          </li>
          <li class="py-1" v-if="user" @click="closeMenu">
            <router-link to="/profile/tech">Your Tech Stack</router-link>
          </li>
          <li class="py-1" v-if="user" @click="closeMenu">
            <button class="btn btn-secondary" @click="requestReview">Request Review</button>
          </li>
        </ul>
      </div>
      <a class="btn btn-ghost normal-case px-0">
        <h2 class="text-lg sm:text-2xl cursor-pointer mr-1" @click="$router.push({ name: 'Home' })">
          Crushing<span class="text-primary">Digital</span>
        </h2>
      </a>
      <i class="fa-solid fa-person-digging text-gray-300 mt-2" title="v0.1 - The only way is up!"></i>
    </div>
    <div class="navbar-end">
      <!-- NOTIFICATIONS -->
      <div class="flex justify-end align-bottom" v-if="user">
        <router-link to="/notifications">
          <i class="fa-regular fa-bell"></i>
        </router-link>
        <!-- LOGOUT -->
        <a @click.prevent="signout" class="text-normal ml-2">
          <i class="fa-solid fa-arrow-right-from-bracket"></i>
        </a>
      </div>
      <div class="flex justify-end" v-else>
        <span class="text-xxs mr-1">Sign in:</span>
        <a @click.prevent="signInWith('github')" class="text-black mr-1"> <i class="fa-brands fa-github fa-lg"></i></a>
        <a @click.prevent="signInWith('linkedin')" class="text-linkedin"><i class="fa-brands fa-linkedin fa-lg"></i></a>
      </div>
    </div>
  </div>

  <div class="container mx-auto max-w-3xl px-4 sm:p-0 border-0 flex flex-col justify-start mt-1">
    <router-view></router-view>
  </div>

  <div class="container mx-auto max-w-3xl px-4 sm:p-0 border-0 flex flex-col mt-8 text-gray-400" id="footer">
    <div class="flex sm:justify-end justify-center">
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
    <div class="flex sm:justify-end justify-center mt-4">
      <span class="text-gray-300">&#169; Copyright 2022 - Crushing Digital Ltd.</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import useAuthUser from '@/composables/useAuthUser'
  import useCandidate from './composables/useCandidate'
  import useEvents from '@/composables/useEvent'
  import { onBeforeMount, ref } from 'vue'
  import { Provider } from '@supabase/supabase-js'
  import { Candidate } from './types'
  import { useToast } from 'vue-toastification'

  const { getEvents } = useEvents()
  const router = useRouter()
  const toast = useToast()
  const { user, login, logout } = useAuthUser()

  onBeforeMount(() => {
    getEvents()
  })

  async function signInWith(provider: Provider) {
    await login(provider)

    // User is automatically redirected to homepage by Supabase
  }

  async function signout() {
    await logout()
    router.push({ name: 'Home' })
  }

  const closeMenu = () => {
    ;(document.activeElement as HTMLElement).blur()
  }

  const requestReview = async () => {
    let candidate = ref()
    const { loadProfile, saveCandidate } = useCandidate()
    if (user.value) candidate.value = await loadProfile(user.value.id)

    candidate.value.verify_req = new Date().toISOString().toLocaleString()
    const res = await saveCandidate(candidate.value)

    if (res instanceof Error) toast.error('Review request failed')
    else toast.success('Review requested')
  }
</script>

<style scoped></style>
