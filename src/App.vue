<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
</script>

<template>
  <div
    class="py-8 container px-4 mx-auto max-w-2xl border-0 flex flex-col sm:flex-row justify-between"
  >
    <div class="text-center sm:text-left mb-4 sm:mb-0">
      <h2 class="text-3xl">Crushing<span class="text-cdblue">Digital</span></h2>
    </div>
    <div class="flex flex-col justify-center text-center py-2 sm:py-0">
      <div>
        <router-link
          to="/"
          class="nav-link bg-cdpink px-3 py-2 rounded-full text-base"
          >Developers</router-link
        >
        <router-link
          to="/about"
          class="nav-link bg-cdpink px-3 py-2 rounded-full mx-1 sm:mx-2 text-base"
          >About
        </router-link>
        <!-- <router-link
          to="/jobs"
          class="nav-link bg-cdpink px-3 py-2 rounded-full mx-1 sm:mx-2 text-base"
          >Jobs
        </router-link> -->
        <a
          href="#"
          class="auth bg-cdpink px-3 py-2 rounded-full mx-1 sm:mx-2 text-base"
          >Login</a
        >
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>

<style scoped></style>
