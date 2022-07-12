<template>
  <div class="navbar bg-base-100 container mx-auto max-w-5xl">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </label>
        <ul id="menu" tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 w-52">
          <li class="py-1">
            <router-link to="/about" @click="closeMenu">About</router-link>
          </li>
          <li class="py-1" v-if="user" @click="closeMenu">
            <router-link to="/profile/basic">Personal Info</router-link>
          </li>
          <li class="py-1" v-if="user" @click="closeMenu">
            <router-link to="/profile/tech">Your Tech Stack</router-link>
          </li>
          <li class="py-1" v-if="user" @click="closeMenu">
            <router-link to="/developers">Developers</router-link>
          </li>
        </ul>
      </div>
      <a class="btn btn-ghost normal-case px-0">
        <h2 class="text-lg sm:text-2xl cursor-pointer" @click="$router.push({ name: 'Home' })">
          Crushing<span class="text-primary">Digital</span>
        </h2>
      </a>
    </div>
    <div class="navbar-end">
      <!-- NOTIFICATIONS -->
      <div class="flex justify-end align-bottom" v-if="user">
        <router-link to="/notifications">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 mx-1 sm:mx-3 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </router-link>
        <!-- LOGOUT -->
        <a @click.prevent="signout" class="text-normal">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </a>
      </div>
      <div class="flex justify-end text-2xl" v-else>
        <span class="text-xxs mr-1">Sign in:</span>
        <a @click.prevent="signInWith('github')" class="text-black mr-1"> <i class="fa-brands fa-github"></i></a>
        <a @click.prevent="signInWith('linkedin')" class="text-linkedin"><i class="fa-brands fa-linkedin"></i></a>
      </div>
    </div>
  </div>

  <div class="container mx-auto max-w-3xl px-4 sm:p-0 border-0 flex flex-col justify-start mt-1">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import useAuthUser from '@/composables/useAuthUser'
  import useEvents from '@/composables/useEvent'
  import { onBeforeMount } from 'vue'
  import { Provider } from '@supabase/supabase-js'

  const { events, getEvents } = useEvents()
  const router = useRouter()

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
</script>

<style scoped></style>
