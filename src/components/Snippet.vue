<template>
  <div v-if="!dev"><h3>Loading...</h3></div>
  <div
    v-else
    class="flex justify-between px-4 py-4 bg-primary/5 border-2 border-slate-200 dark:border-slate-600 rounded-2xl mb-2"
  >
    <div class="flex flex-col justify-evenly">
      <div class="flex flex-row">
        <div class="flex flex-row items-center">
          <!-- ********* APPROVED **************** -->
          <span :class="isApproved(dev) ? 'text-yellow-400' : 'text-gray-300'" class="text-xs sm:text-sm mr-1">
            <i class="fa-solid fa-star fa-xl"></i>
          </span>
          <!-- ********* VERIFIED **************** -->
          <span :class="isVerified(dev) ? 'text-green-500' : 'text-gray-300'" class="text-xs sm:text-sm"
            ><i class="fa-solid fa-clipboard-check fa-xl"></i>
          </span>

          <span class="text-sm sm:text-lg mx-2">{{ dev.display_name }}</span>

          <a v-if="dev.link_1" :href="dev.link_1" class="threeLink mt-1 mr-1"
            ><i class="fa-solid fa-fire-flame-curved"></i
          ></a>
          <a v-if="dev.link_2" :href="dev.link_2" class="threeLink mt-1 mr-1"
            ><i class="fa-solid fa-fire-flame-curved"></i
          ></a>
          <a v-if="dev.link_3" :href="dev.link_3" class="threeLink mt-1"
            ><i class="fa-solid fa-fire-flame-curved"></i
          ></a>

          <router-link :to="{ name: 'review', params: { id: dev.id } }" class="hidden sm:block ml-2">
            <span v-if="isAdmin()" class="text-blue-200 text-xxs cursor-pointer mt-2" :title="verificationRequestDate"
              ><i class="fa-solid fa-gear"></i
            ></span>
          </router-link>
        </div>
      </div>
      <div class="flex flex-row justify-start text-xs md:text-sm px-1 py-1 items-center">
        <!-- ********* Experience **************** -->
        <span class="text-slate-700 dark:text-slate-500 sm:mt-1"> <i class="fa-solid fa-graduation-cap"></i></span
        ><span class="mr-2 text-xs text-slate-700 dark:text-slate-500 sm:mt-1 mx-1" title="Years of experience"
          >{{ dev.yoe }}yrs</span
        >
        <!-- ********* RATE **************** -->
        <span class="text-slate-700 dark:text-slate-500 sm:mt-1"> <i class="fa-solid fa-sack-dollar"></i></span
        ><span class="mr-2 text-xs text-slate-700 dark:text-slate-500 sm:mt-1 mx-1" title="Minimum rate"
          >{{ dev.rate / 1000 }}k</span
        >
        <!-- ********* TIMEZONE **************** -->
        <span class="text-slate-700 dark:text-slate-500 sm:mt-1 mr-1"> <i class="fa-solid fa-earth-americas"></i></span>
        <span class="text-xs text-slate-700 dark:text-slate-500 sm:mt-1 mr-2" title="Timezone">{{
          dev.timezone > 0 ? '+' + dev.timezone : dev.timezone
        }}</span>
        <!-- ********* CODE **************** -->
        <a :href="dev.gitsource" class="sm:mt-1 mr-2" v-if="dev.gitsource"
          ><span class="text-black sm:mt-1"><i class="fa-brands fa-git-square"></i></span
        ></a>
        <!-- ********* LINKEDIN **************** -->
        <a :href="dev.linkedin" class="sm:mt-1" v-if="dev.linkedin"
          ><span class="text-primary sm:mt-1"> <i class="fa-brands fa-linkedin text-linkedin"></i></span
        ></a>
      </div>
      <!-- ********* SKILLS **************** -->
      <div class="flex flex-wrap">
        <span
          v-for="cskill in dev.candidate_skills"
          class="px-2 py-1 text-xs rounded-full mr-1 my-1 cursor-pointer text-white bg-black border-2"
          :class="cskill.skills?.name"
          @click="$emit('skill-toggle', cskill.skills)"
        >
          {{ cskill.skills?.name }}
        </span>
      </div>
      <!-- ********* BLURB **************** -->
      <div class="flex flex-row justify-start text-xs md:text-sm px-1 mt-2 items-center">
        <i class="fa-solid fa-bullhorn mr-2"></i>{{ dev.blurb }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Candidate } from '@/types'
  import useAuthUser from '@/composables/useAuthUser'
  import useCandidate from '@/composables/useCandidate'
  import moment from 'moment'
  import { computed } from 'vue'

  const { isAdmin } = useAuthUser()
  const { isApproved, isVerified } = useCandidate()

  const props = defineProps<{
    dev: Candidate | null
  }>()

  const verificationRequestDate = computed(() => {
    if (!props.dev) return 'No Request'

    if (!props.dev.candidate_verification!.length) return 'No Request'

    return moment(props.dev.candidate_verification![0].verify_req).fromNow()
  })
</script>

<style scoped></style>
