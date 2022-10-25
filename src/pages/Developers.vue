<template>
  <div class="flex sm:justify-center items-center flex-col sm:flex-row">
    <router-link :to="{ name: 'jobs' }">
      <span class="btn btn-sm rounded-full sm:mx-2 my-2 sm:my-0">Want to see 😎 jobs?</span>
    </router-link>
    <router-link :to="{ name: 'job-new' }" v-if="isLoggedIn()">
      <span class="btn btn-sm btn-primary rounded-full">Post a job for FREE!</span>
    </router-link>
  </div>
  <FiltersInline
    listItems="Developers"
    :noDevs="filters.totalRecords.value"
    v-model:searchText="filters.searchText.value"
    v-model:approved="filters.approved.value"
    v-model:verified="filters.verified.value"
    v-model:verify_req="filters.verify_req.value"
    v-model:startTz="filters.startTz.value"
    v-model:endTz="filters.endTz.value"
    v-model:lowRate="filters.lowRate.value"
    v-model:highRate="filters.highRate.value"
    v-model:reqExp="filters.reqExp.value"
    v-model:active="filters.active.value"
  />
  <div class="collapse mt-4" v-if="candidates.length">
    <div v-if="candidates.length">
      <ul>
        <li v-for="dev in candidates">
          <Snippet :dev="dev" @skill-toggle="toggleSkill" />
        </li>
      </ul>
      <div class="btn-group flex justify-center mt-4">
        <button
          class="btn btn-sm btn-outline dark:text-slate-400 border-slate-200 dark:border-slate-600"
          :class="isCurrent(selectedPage)"
          v-for="selectedPage in pageCount"
          @click="page = selectedPage"
        >
          {{ selectedPage }}
        </button>
      </div>
    </div>
    <div v-else class="mt-12 mb-4 flex justify-center">
      <h3>😢 No developers found 🤷 Try adjusting your filters!</h3>
    </div>
  </div>
  <div class="text-center" v-else>
    <h3>Nothing to see here!</h3>
  </div>

  <FiltersModal
    :skills="skills"
    v-model:filter-skills="filters.filterSkills.value"
    @skill-toggle="toggleSkill"
    v-model:startTz="filters.startTz.value"
    v-model:endTz="filters.endTz.value"
    v-model:lowRate="filters.lowRate.value"
    v-model:highRate="filters.highRate.value"
    v-model:reqExp="filters.reqExp.value"
    v-model:searchVal="filters.searchText.value"
  />

  <Share />
</template>

<script setup lang="ts">
  import { computed, onBeforeMount, ref, watch } from 'vue'
  import useCandidate from '@/composables/useCandidate'
  import useSkill from '@/composables/useSkill'
  import { useToast } from 'vue-toastification'
  import { FilterCandidate, Filter, Skill } from '@/types'
  import useAuthUser from '@/composables/useAuthUser'
  import Snippet from '@/components/Snippet.vue'
  import Share from '@/components/Share.vue'
  import FiltersModal from '@/components/FiltersModal.vue'
  import FiltersInline from '@/components/FiltersInline.vue'

  const PAGESIZE = import.meta.env.VITE_DEV_PAGE_SIZE
  const toast = useToast()
  const { hasMembership, isLoggedIn, user } = useAuthUser()
  const { getFilteredCandidates } = useCandidate()
  const { getSkills } = useSkill()
  const candidates = ref<FilterCandidate[]>([])

  const page = ref(1)
  const refreshRequired = ref(false)
  const skills = ref<Skill[]>([])

  const filters: Filter = {
    startTz: ref(-12),
    endTz: ref(12),
    lowRate: ref(1000),
    highRate: ref(25000),
    reqExp: ref(0),
    approved: ref(false),
    verified: ref(false),
    searchText: ref(''),
    verify_req: ref(false),
    active: ref(false),
    pageSize: ref(PAGESIZE),
    totalRecords: ref(0),
    filterSkills: ref<Skill[]>([]),
  }

  watch(refreshRequired, async () => {
    if (refreshRequired.value) loadCandidates()

    refreshRequired.value = false
  })

  watch(page, () => {
    refreshRequired.value = true
  })

  watch(filters.searchText, (newVal, oldVal) => {
    if ((newVal.length != oldVal.length && newVal.length >= 3) || newVal.length == 0) {
      page.value = 0
      refreshRequired.value = true
    }
  })

  watch(
    [
      filters.active,
      filters.approved,
      filters.verified,
      filters.verify_req,
      filters.endTz,
      filters.startTz,
      filters.lowRate,
      filters.highRate,
      filters.reqExp,
      filters.filterSkills.value,
    ],
    () => {
      page.value = 0
      refreshRequired.value = true
    }
  )

  onBeforeMount(async () => {
    let isMember = await hasMembership()
    if (isLoggedIn() && !isMember) {
      toast.error('Invalid membership credentials')
      throw new Error('Invalid membership credentials')
    }

    loadCandidates()

    skills.value = await getSkills()
  })

  const loadCandidates = async () => {
    let { data, count } = await getFilteredCandidates(filters, page.value)
    if (data instanceof Error) return false

    candidates.value = data
    filters.totalRecords.value = count == null ? 0 : count
  }

  const toggleSkill = (skill: Skill) => {
    let pos = filters.filterSkills.value.findIndex((item: Skill) => item.id == skill.id)
    if (pos == -1) {
      filters.filterSkills.value.push(skill)
    } else {
      filters.filterSkills.value.splice(pos, 1)
    }
  }

  const isCurrent = (currPage: number) => {
    return {
      'btn-active': page.value == currPage,
    }
  }

  const pageCount = computed(() => Math.ceil(filters.totalRecords.value / filters.pageSize.value))
</script>

<style lang="css" scoped></style>
