<template>
  <div class="collapse" v-if="candidates.length">
    <div class="flex justify-start items-center align-middle my-2">
      <label for="my-modal-4" class="btn modal-button btn-circle btn-secondary btn-xs sm:btn-sm my-auto">
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
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
      </label>
      <input
        v-model="searchVal"
        type="text"
        placeholder="Search by name..."
        class="input input-bordered w-50 max-w-xs ml-4"
      />
    </div>
    <ul>
      <li v-for="dev in filteredCandidates">
        <Snippet :dev="dev" />
      </li>
    </ul>
  </div>
  <div class="text-center" v-else>
    <h3>Nothing to see here!</h3>
  </div>

  <input type="checkbox" id="my-modal-4" class="modal-toggle" />
  <label for="my-modal-4" class="modal cursor-pointer">
    <label class="modal-box relative" for="">
      <h3 class="mb-4">Apply filters</h3>
      <form class="text-center">
        <label class="input-group input-group-xs">
          <span>UTC</span>
          <input
            v-model="startTz"
            type="number"
            max="12"
            min="-12"
            name="timezone-start"
            id="timezone-start"
            placeholder="Starting timezone"
            class="input input-bordered input-xs w-14"
          />
          <input
            v-model="endTz"
            type="number"
            max="12"
            min="-12"
            name="timezone-end"
            id="timezone-end"
            placeholder="Ending timezone"
            class="input input-bordered input-xs w-14"
          />
        </label>
        <label class="input-group input-group-xs mt-2">
          <span>USD</span>
          <input
            v-model="lowRate"
            type="number"
            max="24000"
            min="1000"
            name="high-rate"
            id="high-rate"
            placeholder="Upper boundary"
            class="input input-bordered input-xs w-14"
          />
          <input
            v-model="highRate"
            type="number"
            max="30000"
            min="1000"
            name="low-rate"
            id="low-rate"
            placeholder="Lower boundary"
            class="input input-bordered input-xs w-14"
          />
        </label>
        <label class="input-group input-group-xs mt-2">
          <span>Years</span>
          <input
            v-model="reqExp"
            type="number"
            max="45"
            min="0"
            name="req-experience"
            id="req-experience"
            placeholder="Required experience"
            class="input input-bordered input-xs w-14"
          />
        </label>
        <div class="form-control">
          <label class="cursor-pointer label">
            <span class="label-text">Verified?</span>
            <input v-model="verified" type="checkbox" class="checkbox checkbox-secondary" />
          </label>
          <label class="cursor-pointer label">
            <span class="label-text">Approved?</span>
            <input v-model="approved" type="checkbox" class="checkbox checkbox-secondary" />
          </label>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Choose your required stack</span>
          </label>
          <select multiple class="select select-bordered select-sm w-full font-normal" v-model="filterSkills">
            <option v-for="skill in skills" :value="skill.id">
              {{ skill.name }}
            </option>
          </select>
        </div>
      </form>
    </label>
  </label>
</template>

<script setup lang="ts">
  import { computed, onBeforeMount, ref } from 'vue'
  import useCandidate from '@/composables/useCandidate'
  import useSkill from '@/composables/useSkill'
  import { Candidate, Skill } from '@/types'
  import useAuthUser from '@/composables/useAuthUser'
  import Snippet from '@/components/Snippet.vue'

  const { user, memberships, getUserMemberships } = useAuthUser()
  const { getCandidates } = useCandidate()
  const { getSkills, getCandidateSkillIds } = useSkill()

  const startTz = ref<number>(-12)
  const endTz = ref<number>(12)
  const lowRate = ref<number>(1000)
  const highRate = ref<number>(25000)
  const reqExp = ref<number>(3)
  const approved = ref<boolean>(false)
  const verified = ref<boolean>(false)
  const searchVal = ref<string>('')

  const skills = ref<Array<Skill>>([])
  const filterSkills = ref([])
  const candidates = ref<Array<Candidate>>([])

  onBeforeMount(async () => {
    if (user.value && !memberships.value.length) {
      let membershipCount = await getUserMemberships()
      if (!membershipCount) throw new Error('Invalid membership credentials')
    }

    candidates.value = await getCandidates()
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
      else if (searchVal.value && searchVal.value.length >= 3 && !dev.display_name.includes(searchVal.value))
        return false

      const cskills = getCandidateSkillIds(dev)
      const unmatched = filterSkills.value.filter((fskill) => !cskills.includes(fskill))

      if (unmatched.length) return false

      return true
    })
  })
</script>

<style lang="css" scoped></style>
