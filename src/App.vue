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
      <a class="btn btn-ghost normal-case">
        <h2 class="text-base sm:text-2xl cursor-pointer" @click="$router.push({ name: 'Home' })">
          Crushing<span class="text-primary">Digital</span>
        </h2>
      </a>
    </div>
    <div class="navbar-end">
      <a
        v-if="user"
        @click.prevent="signout"
        class="btn md:btn-md btn-sm btn-secondary rounded-full no-underline capitalize font-normal"
      >
        logout
      </a>
      <a
        v-else
        @click.prevent="signInWithGithub"
        class="btn md:btn-md btn-sm btn-secondary rounded-full no-underline capitalize font-normal"
        >Sign In
      </a>
    </div>
  </div>

  <div class="container mx-auto max-w-5xl border-0 flex flex-col justify-start mt-2">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import useAuthUser from '@/composables/useAuthUser'

  const router = useRouter()

  const { user, login, logout } = useAuthUser()

  async function signInWithGithub() {
    await login('github')

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
