<script setup lang="ts">

defineProps<{ msg: string }>()

</script>

<template>
  <div id="homeSplash" class="container md:mx-auto max-w-2xl border-0 flex flex-col justify-start">

    <div class="main">
      <div class="flex justify-center mb-5">
        <img class="rounded-full" alt="Profile picture" src="../assets/me.jpeg" />
      </div>
  
      <h1 class="text-5xl mb-10 text-center text-zinc-700">David Roberts</h1>
        <p class="text-justify mb-5 bg-slate-50 p-5 rounded-2xl">
          My name is <span class="text-sky-500">David Roberts</span>. I have been in the software development industry for over <span class="text-sky-500">22</span> years.
          I have held various roles as a developer, from junior through to team lead and head of department.
          In recent years I have been involved with recruiting developers for some of the worlds leading brands.
        </p>
        <p class="text-justify mb-5 bg-slate-50 p-5 rounded-2xl">
          I want to show you <span class="text-sky-500">how the recruitment game really works</span>. Why I say that the <span class="italic text-sky-500">"best developers rarely get the job"</span> and
          how you can make simple changes to land a LOT more interviews and job offers.
        </p>
    </div>
  </div>

</template>

<style scoped>

</style>
