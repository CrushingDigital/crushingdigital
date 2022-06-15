<template>
  <div
    class="py-8 container px-4 mx-auto max-w-3xl border-0 flex flex-col sm:flex-row justify-between"
  >
    <div class="text-center sm:text-left mb-4 sm:mb-0">
      <h2 class="text-3xl">Crushing<span class="text-cdblue">Digital</span></h2>
    </div>
    <div class="flex justify-center text-center py-2 sm:py-0">
      <router-link
        to="/"
        class="nav-link bg-cdpink px-3 py-2 rounded-full text-base"
        >Developers</router-link
      >
      <router-link
        to="/about"
        class="nav-link bg-cdpink px-3 py-2 rounded-full mx-1 sm:mx-2 text-base"
      >
        About
      </router-link>
      <router-link
        to="/jobs"
        class="nav-link bg-cdpink px-3 py-2 rounded-full mx-1 sm:mx-2 text-base"
        >Jobs
      </router-link>
      <div v-if="user" class="flex flex-col justify-center">
        <a
          @click.prevent="signout"
          class="nav-link bg-cdpink px-3 py-2 rounded-full mx-1 sm:mx-2 text-base"
        >
          logout
        </a>
      </div>
      <a
        v-else
        @click.prevent="signInWithGithub"
        class="nav-link bg-cdpink px-3 py-2 rounded-full mx-1 sm:mx-2 text-base"
        >Sign In
      </a>
    </div>
  </div>
  <div class="container mx-auto max-w-2xl border-0 flex flex-col justify-start">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import useAuthUser from "./composables/useAuthUser";

const { user, login, logout, isLoggedIn } = useAuthUser();

async function signInWithGithub() {
  await login("github");
}

async function signout() {
  await logout();
}
</script>

<style scoped></style>
