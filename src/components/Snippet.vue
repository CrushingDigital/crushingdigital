<template>
  <div v-if="!dev"><h3>Loading...</h3></div>
  <div v-else class="flex justify-between p-4 bg-slate-50 rounded-2xl mb-1">
    <div class="flex flex-col justify-evenly">
      <div class="flex flex-col sm:flex-row justify-between">
        <div class="flex flex-row align-start">
          <!-- ********* APPROVED **************** -->
          <span :class="dev.approved ? 'text-yellow-400' : 'text-gray-300'" class="text-xs sm:text-sm"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              class="h4 w-4 sm:h-6 sm:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              /></svg
          ></span>
          <!-- ********* VERIFIED **************** -->
          <span :class="dev.verified ? 'text-green-500' : 'text-gray-300'" class="text-xs sm:text-sm"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              class="h4 w-4 sm:h-6 sm:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              /></svg
          ></span>

          <span class="text-xs sm:text-lg mr-2 leading-relaxed">{{ dev.display_name }}</span>
          <router-link :to="{ name: 'review', params: { id: dev.id } }" class="hidden sm:block">
            <span v-if="memberships.includes('admin')" class="text-blue-200 text-xxs cursor-pointer mt-2"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 sm:mt-1 mx-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg
            ></span>
          </router-link>

          <!-- ********* Experience **************** -->
          <span class="text-slate-700 sm:mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path
                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
              />
            </svg> </span
          ><span class="mr-2 text-xs text-slate-700 sm:mt-1">{{ dev.yoe }}yrs</span>
          <!-- ********* RATE **************** -->
          <span class="text-yellow-700 sm:mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg> </span
          ><span class="mr-2 text-xs text-yellow-700 sm:mt-1">{{ dev.rate / 1000 }}k</span>
          <!-- ********* TIMEZONE **************** -->
          <span class="text-green-600 text-xxs sm:mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              /></svg
          ></span>
          <span class="text-xs text-green-600 sm:mt-1">{{ dev.timezone }}</span>
        </div>
      </div>
      <!-- ********* BLURB **************** -->
      <div class="text-xs md:text-sm px-1 py-2">
        {{ dev.blurb }}
      </div>
      <!-- ********* SKILLS **************** -->
      <div class="col-start-2 pt-1">
        <span
          v-for="cskill in dev.candidate_skills"
          class="px-2 py-1 text-xs rounded-full mr-1"
          :class="cskill.skills?.name"
        >
          {{ cskill.skills?.name }}
        </span>
      </div>
    </div>
    <!-- ********* 3 LINKS **************** -->
    <div class="flex flex-col justify-start align-bottom text-center">
      <a v-if="dev.link_1" :href="dev.link_1" class="threeLink"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 sm:h-6 sm:w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          /></svg
      ></a>
      <a v-if="dev.link_2" :href="dev.link_2" class="threeLink"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 sm:h-6 sm:w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          /></svg
      ></a>
      <a v-if="dev.link_3" :href="dev.link_3" class="threeLink"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 sm:h-6 sm:w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          /></svg
      ></a>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Candidate } from '@/types'
  import useAuthUser from '@/composables/useAuthUser'

  const { memberships } = useAuthUser()

  defineProps<{
    dev: Candidate | null
  }>()
</script>

<style scoped></style>