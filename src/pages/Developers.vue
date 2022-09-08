<template>
  <Share />

  <div class="collapse mt-4" v-if="candidates.length">
    <FiltersInline
      listItems="Developers"
      :noDevs="filteredCandidates.length"
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

    <ul v-if="filteredCandidates.length">
      <li v-for="dev in filteredCandidates">
        <Snippet :dev="dev" @skill-toggle="toggleSkill" />
      </li>
    </ul>
    <div v-else class="mt-12 mb-4 flex justify-center">
      <h3>😢 No developers found 🤷 Try adjusting your filters!</h3>
    </div>
  </div>
  <div class="text-center" v-else>
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
  import useCandidate from '@/composables/useCandidate'
  import useSkill from '@/composables/useSkill'
  import { Candidate, Skill } from '@/types'
  import useAuthUser from '@/composables/useAuthUser'
  import Snippet from '@/components/Snippet.vue'
  import Share from '@/components/Share.vue'
  import FiltersModal from '@/components/FiltersModal.vue'
  import FiltersInline from '@/components/FiltersInline.vue'

  const { user, memberships, getUserMemberships } = useAuthUser()
  const { getCandidates } = useCandidate()
  const { getSkills, getCandidateSkillIds } = useSkill()

  const startTz = ref<number>(-12)
  const endTz = ref<number>(12)
  const lowRate = ref<number>(1000)
  const highRate = ref<number>(25000)
  const reqExp = ref<number>(0)
  const approved = ref<boolean>(false)
  const verified = ref<boolean>(false)
  const searchVal = ref<string>('')
  const verify_req = ref<boolean>(false)
  const active = ref<boolean>(false)
  const filterSkills = ref<Skill[]>([])
  const skills = ref<Array<Skill>>([])
  const candidates = ref<Array<Candidate>>([])

  onBeforeMount(async () => {
    if (user.value && !memberships.value.length) {
      let membershipCount = await getUserMemberships()
      if (!membershipCount) throw new Error('Invalid membership credentials')
    }

    let loadedCandidates = await getCandidates()
    if (loadedCandidates instanceof Error) return false

    candidates.value = loadedCandidates
    skills.value = await getSkills()
  })

  const filteredCandidates = computed(() => {
    return candidates.value.filter((dev) => {
      if (dev.timezone < startTz.value) return false
      else if (dev.timezone > endTz.value) return false
      else if (dev.rate < lowRate.value) return false
      else if (dev.rate > highRate.value) return false
      else if (dev.yoe < reqExp.value) return false
      else if (approved.value && !dev.approved) return false
      else if (verified.value && !dev.verified) return false
      else if (verify_req.value && !dev.verify_req) return false
      else if (active.value && !dev.active) return false
      else if (
        searchVal.value &&
        searchVal.value.length >= 3 &&
        !dev.display_name.toLowerCase().includes(searchVal.value.toLowerCase())
      )
        return false

      const cskills = getCandidateSkillIds(dev)
      const unmatched = filterSkills.value.filter((fskill) => !cskills.includes(fskill.id))

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
