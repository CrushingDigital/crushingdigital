<template>
  <div
    class="py-8 container px-4 mx-auto max-w-3xl border-0 flex flex-col sm:flex-row justify-between"
  >
    <div class="text-center sm:text-left mb-4 sm:mb-0">
      <h2
        class="text-3xl cursor-pointer"
        @click="$router.push({ name: 'Home' })"
      >
        Crushing<span class="text-cdblue">Digital</span>
      </h2>
    </div>
    <div class="flex justify-center text-center py-2 sm:py-0">
      <!-- <router-link
        to="/"
        class="nav-link bg-cdpink px-3 py-2 rounded-full text-base"
        >Developers</router-link
      > -->
      <router-link
        to="/about"
        class="text-cdpink bg-white border-2 border-cdpink hover:bg-cdpink hover:text-white no-underline px-3 py-2 rounded-full mx-1 sm:mx-2 text-base"
      >
        About
      </router-link>
      <!-- <router-link
        to="/jobs"
        class="nav-link bg-cdpink px-3 py-2 rounded-full mx-1 sm:mx-2 text-base"
        >Jobs
      </router-link> -->
      <div v-if="user" class="flex justify-center">
        <router-link
          to="/profile"
          class="text-cdpink bg-white border-2 border-cdpink hover:bg-cdpink hover:text-white no-underline px-3 py-2 rounded-full mx-1 sm:mx-2 text-base"
          >My Profile</router-link
        >
        <a
          @click.prevent="signout"
          class="bg-cdpink text-white no-underline hover:bg-white hover:text-cdpink border-cdpink hover:cursor-pointer border-2 hover:border-cdpink px-3 py-2 rounded-full mx-1 sm:mx-2 text-base"
        >
          logout
        </a>
      </div>
      <a
        v-else
        @click.prevent="signInWithGithub"
        class="bg-cdpink text-white no-underline hover:bg-white hover:text-cdpink border-cdpink hover:cursor-pointer border-2 hover:border-cdpink px-3 py-2 rounded-full mx-1 sm:mx-2 text-base"
        >Sign In
      </a>
    </div>
  </div>
  <div class="container mx-auto max-w-2xl border-0 flex flex-col justify-start">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import useAuthUser from "./composables/useAuthUser";

const router = useRouter();

const { user, login, logout, isLoggedIn } = useAuthUser();

async function signInWithGithub() {
  await login("github");
}

async function signout() {
  await logout();
  router.push({ name: "Home" });
}
</script>

<style scoped></style>
