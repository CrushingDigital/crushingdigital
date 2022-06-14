<template>
  <div
    id="homeSplash"
    class="container md:mx-auto max-w-2xl border-0 flex flex-col justify-start"
  >
    <div class="main">
      <h1 class="text-5xl my-20 text-center text-zinc-700">coming soon...</h1>
      <div v-if="user">
        <!--user_metadata is the key supabase nests all arbitrary meta data under-->
        <div>Hello {{ user.user_metadata.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useAuthUser from "../composables/useAuthUser";
const { user } = useAuthUser();
</script>

<style scoped></style>
