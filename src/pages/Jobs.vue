<template>
  <Share />

  <div class="flex justify-center my-4">
    <router-link to="/job/new" class="btn btn-accent"> Post a job for FREE!</router-link>
  </div>
  <div class="collapse mt-4" v-if="jobs.length">
    <FiltersInline
      listItems="Jobs"
      :noDevs="filteredJobs.length"
      :memberships="memberships"
      v-model:searchText="searchVal"
      v-model:approved="approved"
      v-model:verified="verified"
      v-model:verify_req="verify_req"
      v-model:startTz="startTz"
      v-model:endTz="endTz"
      v-model:lowRate="lowRate"
      v-model:highRate="highRate"
      v-model:reqExp="reqExp"
      v-model:active="active"
    />
    <ul v-if="filteredJobs.length">
      <li v-for="job in filteredJobs">
        <JobSnippet :job="job" @skill-toggle="toggleSkill" />
      </li>
    </ul>
    <div v-else class="mt-12 mb-4 flex justify-center">
      <h3>😢 No jobs found 🤷 Try adjusting your filters!</h3>
    </div>
  </div>
  <div class="text-center mt-4" v-else>
    <h3>Nothing to see here!</h3>
  </div>

  <FiltersModal
    v-model:skills="skills"
    :filter-skills="filterSkills"
    @skill-toggle="toggleSkill"
    v-model:startTz="startTz"
    v-model:endTz="endTz"
    v-model:lowRate="lowRate"
    v-model:highRate="highRate"
    v-model:reqExp="reqExp"
    v-model:searchVal="searchVal"
  />
</template>

<script setup lang="ts">
  import { computed, onBeforeMount, ref } from 'vue'
  import useAuthUser from '@/composables/useAuthUser'
  import useSkill from '@/composables/useSkill'
  import useJob from '@/composables/useJob'
  import { Job, Skill } from '@/types'
  import JobSnippet from '@/components/JobSnippet.vue'
  import FiltersInline from '@/components/FiltersInline.vue'
  import FiltersModal from '@/components/FiltersModal.vue'
  import Share from '@/components/Share.vue'

  const { getJobs } = useJob()
  const { user, memberships, getUserMemberships } = useAuthUser()
  const { getSkills, getJobSkillIds } = useSkill()

  const startTz = ref<number>(-12)
  const endTz = ref<number>(12)
  const lowRate = ref<number>(1000)
  const highRate = ref<number>(25000)
  const reqExp = ref<number>(0)
  const approved = ref<boolean>(false)
  const verified = ref<boolean>(false)
  const verify_req = ref<boolean>(false)
  const searchVal = ref<string>('')
  const active = ref<boolean>(false)
  const filterSkills = ref<Skill[]>([])
  const skills = ref<Array<Skill>>([])
  const jobs = ref<Array<Job>>([])

  onBeforeMount(async () => {
    if (user.value && !memberships.value.length) {
      let membershipCount = await getUserMemberships()
      if (!membershipCount) throw new Error('Invalid membership credentials')
    }

    let loadedJobs = await getJobs()
    if (loadedJobs instanceof Error) return false

    jobs.value = loadedJobs
    skills.value = await getSkills()

    skills.value = await getSkills()
  })

  const filteredJobs = computed(() => {
    return jobs.value.filter((job) => {
      if (job.timezone < startTz.value) return false
      else if (job.timezone > endTz.value) return false
      else if (job.rate < lowRate.value) return false
      else if (job.rate > highRate.value) return false
      else if (job.yoe < reqExp.value) return false
      else if (approved.value && !job.approved) return false
      else if (verified.value && !job.verified) return false
      else if (verify_req.value && !job.verify_req) return false
      else if (active.value && !job.active) return false
      else if (
        searchVal.value &&
        searchVal.value.length > 2 &&
        !job.title.toLowerCase().includes(searchVal.value.toLowerCase())
      )
        return false

      const jobSkills = getJobSkillIds(job)
      const unmatched = filterSkills.value.filter((fskill) => !jobSkills.includes(fskill.id))

      if (unmatched.length) return false

      return true
    })
  })

  const toggleSkill = (skill: Skill) => {
    let pos = filterSkills.value?.findIndex((item: Skill) => item.id == skill.id)
    if (pos == -1) {
      filterSkills.value.push(skill)
    } else {
      filterSkills.value.splice(pos, 1)
    }
  }
</script>

<style lang="css" scoped></style>
