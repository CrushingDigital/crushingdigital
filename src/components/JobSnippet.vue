<template>
  <div v-if="!job"><h3>Loading...</h3></div>
  <div
    v-else
    class="flex justify-between items-center px-4 py-4 bg-primary/5 border-2 border-slate-200 dark:border-slate-600 rounded-2xl mb-2"
    :class="{ 'dark:border-red-600': !isHot }"
  >
    <div class="flex flex-col justify-evenly w-full">
      <div class="flex flex-row items-center justify-between">
        <div class="flex flex-row items-center">
          <span :class="job.approved ? 'text-yellow-400' : 'text-gray-300'" class="text-xs sm:text-sm mr-1">
            <i class="fa-solid fa-star fa-xl" title="Approved?"></i
          ></span>
          <span :class="job.verified ? 'text-green-500' : 'text-gray-300'" class="text-xs sm:text-sm"
            ><i class="fa-solid fa-clipboard-check fa-xl" title="Verified Profile?"></i>
          </span>

          <span
            class="text-sm sm:text-lg ml-2 hover:cursor-pointer cursor-pointer"
            @click="viewJob(job!.jobspec)"
            title="Apply here"
            >{{ job.title }}</span
          >
          <div class="hidden md:flex items-center">
            <span class="text-xs mx-2 text-slate-600 dark:text-slate-300 flower mt-1">@ {{ job.company }}</span>

            <a v-if="job.link_1" :href="job.link_1" class="threeLink mt-1 mr-1"
              ><i class="fa-solid fa-fire-flame-curved"></i
            ></a>
            <a v-if="job.link_2" :href="job.link_2" class="threeLink mt-1 mr-1"
              ><i class="fa-solid fa-fire-flame-curved"></i
            ></a>
            <a v-if="job.link_3" :href="job.link_3" class="threeLink mt-1"
              ><i class="fa-solid fa-fire-flame-curved"></i
            ></a>

            <router-link :to="{ name: 'job-edit', params: { id: job.id } }" class="hidden sm:block ml-2">
              <span
                v-if="memberships.includes('admin') || user?.id == job.user_id"
                class="text-slate-400 cursor-pointer mt-2"
                title="Edit Job"
                ><i class="fas fa-edit"></i
              ></span>
            </router-link>
          </div>
        </div>
        <div class="flex-row align-middle items-center hidden md:inline-flex justify-self-end">
          <button class="btn btn-xs md:btn-sm btn-secondary rounded-full" @click.prevent="viewJob(job!.jobspec)">
            Apply
          </button>
        </div>
      </div>
      <div class="flex flex-row justify-start text-xs md:text-sm px-1 py-1 md:py-0 items-center">
        <div class="flex flex-row items-center md:hidden mr-2">
          <span class="text-xs md:mx-2 mr-2 text-slate-600 dark:text-slate-300 flower mt-1">@ {{ job.company }}</span>

          <a v-if="job.link_1" :href="job.link_1" class="threeLink mr-1 mt-1"
            ><i class="fa-solid fa-fire-flame-curved"></i
          ></a>
          <a v-if="job.link_2" :href="job.link_2" class="threeLink mr-1 mt-1"
            ><i class="fa-solid fa-fire-flame-curved"></i
          ></a>
          <a v-if="job.link_3" :href="job.link_3" class="threeLink mt-1"
            ><i class="fa-solid fa-fire-flame-curved"></i
          ></a>

          <router-link :to="{ name: 'job-edit', params: { id: job.id } }" class="hidden sm:block ml-2">
            <span
              v-if="memberships.includes('admin') || user?.id == job.user_id"
              class="text-slate-400 cursor-pointer mt-2"
              title="Edit Job"
              ><i class="fas fa-edit"></i
            ></span>
          </router-link>
        </div>
        <!-- ********* Experience **************** -->
        <span class="text-slate-700 dark:text-slate-300"> <i class="fa-solid fa-graduation-cap"></i></span
        ><span class="mr-2 text-xs text-slate-700 dark:text-slate-300 mx-1" title="Years of experience"
          >{{ job.yoe }}yrs</span
        >
        <!-- ********* RATE **************** -->
        <span class="text-slate-700 dark:text-slate-300"> <i class="fa-solid fa-sack-dollar"></i></span
        ><span class="mr-2 text-xs text-slate-700 dark:text-slate-300 mx-1" title="Minimum rate"
          >{{ job.rate / 1000 }}k</span
        >
        <!-- ********* TIMEZONE **************** -->
        <span class="text-slate-700 dark:text-slate-300 mr-1"> <i class="fa-solid fa-earth-americas"></i></span>
        <span class="text-xs text-slate-700 dark:text-slate-300 mr-2" title="Timezone">{{
          job.timezone > 0 ? '+' + job.timezone : job.timezone
        }}</span>
        <!-- ********* WEBSITE **************** -->
        <a :href="job.website" class="sm:mt-1 mr-2" title="Company website" v-if="job.website"
          ><span class="text-primary sm:mt-1"><i class="fa-solid fa-laptop-code"></i></span
        ></a>
        <!-- ********* JOBSPEC **************** -->
        <!-- <a :href="job.jobspec" class="sm:mt-1" title="Job Specification" v-if="job.jobspec"
          ><span class="text-slate-400 dark:text-slate-300 sm:mt-1"><i class="fa-brands fa-readme"></i></span>
        </a> -->
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
  import useAuthUser from '@/composables/useAuthUser'
  import { subDays } from 'date-fns'
  import { ref } from 'vue'

  const { memberships, user } = useAuthUser()
  const isHot = ref(false)
  const props = defineProps<{
    job: Job | null
  }>()

  const sevenDaysAgo = subDays(new Date(), 7)
  isHot.value = props.job?.created_at != undefined ? new Date(props.job?.created_at) > sevenDaysAgo : false

  const viewJob = (url: string | undefined) => {
    if (url) window.open(url, '_blank')
  }
</script>

<style scoped></style>
