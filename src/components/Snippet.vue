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
          <span :class="dev.approved ? 'text-yellow-400' : 'text-gray-300'" class="text-xs sm:text-sm mr-1">
            <i class="fa-solid fa-star fa-xl"></i>
          </span>
          <!-- ********* VERIFIED **************** -->
          <span :class="dev.verified ? 'text-green-500' : 'text-gray-300'" class="text-xs sm:text-sm"
            ><i class="fa-solid fa-clipboard-check fa-xl"></i>
          </span>

          <span class="text-sm sm:text-lg mx-2">{{ dev.display_name }}</span>

          <a v-if="dev.link_1" @click.prevent="clickHandler('link_1', dev?.link_1!, dev!)" class="threeLink mt-1 mr-1"
            ><i class="fa-solid fa-fire-flame-curved"></i
          ></a>
          <a v-if="dev.link_2" @click.prevent="clickHandler('link_2', dev?.link_2!, dev!)" class="threeLink mt-1 mr-1"
            ><i class="fa-solid fa-fire-flame-curved"></i
          ></a>
          <a v-if="dev.link_3" @click.prevent="clickHandler('link_3', dev?.link_3!, dev!)" class="threeLink mt-1"
            ><i class="fa-solid fa-fire-flame-curved"></i
          ></a>

          <router-link
            :to="{ name: 'review', params: { id: dev.id } }"
            class="hidden sm:block ml-2 no-underline"
            v-if="isAdmin()"
          >
            <span class="text-blue-200 text-xs cursor-pointer mt-2"><i class="fa-solid fa-gear mr-2"></i></span
            ><span class="text-xs text-blue-200">{{ verificationRequestDate }}</span>
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
        <a @click.prevent="clickHandler('gitsource', dev?.gitsource!, dev!)" class="sm:mt-1 mr-2" v-if="dev.gitsource"
          ><span class="text-black sm:mt-1"><i class="fa-brands fa-git-square"></i></span
        ></a>
        <!-- ********* LINKEDIN **************** -->
        <a @click.prevent="clickHandler('linkedin', dev?.linkedin!, dev!)" class="sm:mt-1" v-if="dev.linkedin"
          ><span class="text-primary sm:mt-1"> <i class="fa-brands fa-linkedin text-linkedin"></i></span
        ></a>
      </div>
      <!-- ********* SKILLS **************** -->
      <div class="flex flex-wrap">
        <span
          v-for="cskill in dev.skills"
          class="px-2 py-1 text-xs rounded-full mr-1 my-1 cursor-pointer text-white bg-black border-2"
          :class="getSkillIdentifier(cskill)"
          @click="$emit('skill-toggle', cskill)"
        >
          {{ cskill.name }}
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
  import { FilterCandidate, Skill } from '@/types'
  import useSkill from '@/composables/useSkill'
  import useAuthUser from '@/composables/useAuthUser'
  import useCandidate from '@/composables/useCandidate'
  import useDeveloperClicks from '@/composables/useDeveloperClicks'
  import moment from 'moment'
  import { computed, ref } from 'vue'

  const { getSkillIdentifier } = useSkill()
  const { addDeveloperClick } = useDeveloperClicks()
  const { isAdmin } = useAuthUser()

  const props = defineProps<{
    dev: FilterCandidate | null
  }>()

  const verificationRequestDate = computed(() => {
    if (!props.dev) return ''

    if (!props.dev!.verify_req!) return ''

    return moment(props.dev!.verify_req).fromNow()
  })

  const clickHandler = async (link_type: string, url: string, dev: FilterCandidate) => {
    addDeveloperClick(dev!.id, link_type)
    window.open(url, '_blank')
  }
</script>

<style scoped></style>
