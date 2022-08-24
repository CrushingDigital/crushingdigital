<template>
  <div v-if="!job"><h3>Loading...</h3></div>
  <div v-else class="flex justify-between px-4 py-2 bg-primary/5 rounded-2xl mb-1">
    <div class="flex flex-col justify-evenly">
      <div class="flex flex-row">
        <div class="flex flex-row items-center">
          <span :class="job.approved ? 'text-yellow-400' : 'text-gray-300'" class="text-xs sm:text-sm mr-1">
            <i class="fa-solid fa-star fa-xl"></i
          ></span>
          <span :class="job.verified ? 'text-green-500' : 'text-gray-300'" class="text-xs sm:text-sm"
            ><i class="fa-solid fa-clipboard-check fa-xl"></i>
          </span>

          <span class="text-sm sm:text-lg mx-2">{{ job.title }}</span>

          <a v-if="job.link_1" :href="job.link_1" class="threeLink mt-1 mr-1"
            ><i class="fa-solid fa-fire-flame-curved"></i
          ></a>
          <a v-if="job.link_2" :href="job.link_2" class="threeLink mt-1 mr-1"
            ><i class="fa-solid fa-fire-flame-curved"></i
          ></a>
          <a v-if="job.link_3" :href="job.link_3" class="threeLink mt-1"
            ><i class="fa-solid fa-fire-flame-curved"></i
          ></a>
        </div>
      </div>
      <div class="flex flex-row justify-start text-xs md:text-sm px-1 py-1 items-center">
        <!-- ********* Experience **************** -->
        <span class="text-slate-700 sm:mt-1"> <i class="fa-solid fa-graduation-cap"></i></span
        ><span class="mr-2 text-xs text-slate-700 sm:mt-1 mx-1">{{ job.yoe }}yrs</span>
        <!-- ********* RATE **************** -->
        <span class="text-slate-700 sm:mt-1"> <i class="fa-solid fa-sack-dollar"></i></span
        ><span class="mr-2 text-xs text-slate-700 sm:mt-1 mx-1">{{ job.rate / 1000 }}k</span>
        <!-- ********* TIMEZONE **************** -->
        <span class="text-slate-700 sm:mt-1 mr-1"> <i class="fa-solid fa-earth-americas"></i></span>
        <span class="text-xs text-slate-700 sm:mt-1 mr-2">{{
          job.timezone > 0 ? '+' + job.timezone : job.timezone
        }}</span>
        <!-- ********* CODE **************** -->
        <a :href="job.website" class="sm:mt-1 mr-2" v-if="job.website"
          ><span class="text-black sm:mt-1"><i class="fa-solid fa-location-dot"></i></span
        ></a>
        <!-- ********* LINKEDIN **************** -->
        <a :href="job.jobspec" class="sm:mt-1" v-if="job.jobspec"
          ><span class="text-primary sm:mt-1"><i class="fa-solid fa-location-dot"></i></span
        ></a>
      </div>
      <!-- ********* SKILLS **************** -->
      <div class="flex flex-wrap">
        <span
          v-for="link in job.skills_link"
          class="px-2 py-1 text-xs rounded-full mr-1 my-1 cursor-pointer text-white bg-black border-2"
          :class="link.skills?.name"
          @click="$emit('skill-toggle', link.skills)"
        >
          {{ link.skills?.name }}
        </span>
      </div>
      <!-- ********* BLURB **************** -->
      <div class="flex flex-row justify-start text-xs md:text-sm px-1 mt-2 items-center">
        <i class="fa-solid fa-bullhorn mr-2"></i>{{ job.blurb }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Job } from '@/types'

  defineProps<{
    job: Job | null
  }>()
</script>

<style scoped></style>
