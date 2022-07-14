<template>
  <div class="collapse" v-if="candidates.length">
    <div class="flex justify-start items-center align-middle my-2">
      <span class="mr-2 flower">Filters:</span>
      <label for="tz-modal" class="modal-button my-auto cursor-pointer mr-2">
        <i class="fa-solid fa-earth-americas"></i>
      </label>
      <label for="skills-modal" class="modal-button my-auto cursor-pointer mr-2">
        <i class="fa-solid fa-tags"></i>
      </label>
      <label for="rate-modal" class="modal-button my-auto cursor-pointer mr-2">
        <i class="fa-solid fa-sack-dollar"></i>
      </label>
      <label for="exp-modal" class="modal-button my-auto cursor-pointer mr-2">
        <i class="fa-solid fa-graduation-cap"></i>
      </label>
      <label
        class="modal-button my-auto cursor-pointer mr-2"
        @click="toggleApproved"
        :class="approved ? 'text-yellow-400' : 'text-gray-300'"
      >
        <i class="fa-solid fa-star"></i>
      </label>
      <label
        class="modal-button my-auto cursor-pointer mr-2"
        @click="toggleVerified"
        :class="verified ? 'text-green-500' : 'text-gray-300'"
      >
        <i class="fa-solid fa-clipboard-check"></i>
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

  <input type="checkbox" id="tz-modal" class="modal-toggle" />
  <label for="tz-modal" class="modal cursor-pointer">
    <label class="modal-box relative" for="">
      <h3 class="mb-4">Timezone (UTC)</h3>
      <form class="text-center flex justify-start">
        <label class="input-group input-group-xs">
          <span>From</span>
          <input
            v-model="startTz"
            type="number"
            max="12"
            min="-12"
            name="timezone-start"
            id="timezone-start"
            placeholder="Starting timezone"
            class="input input-bordered input-lg w-32"
          />
        </label>
        <label class="input-group input-group-xs">
          <span>To</span>
          <input
            v-model="endTz"
            type="number"
            max="12"
            min="-12"
            name="timezone-end"
            id="timezone-end"
            placeholder="Ending timezone"
            class="input input-bordered input-lg w-32"
          />
        </label>
      </form>
    </label>
  </label>

  <input type="checkbox" id="exp-modal" class="modal-toggle" />
  <label for="exp-modal" class="modal cursor-pointer">
    <label class="modal-box relative">
      <h3 class="mb-4">Experience filter</h3>
      <form class="text-center">
        <label class="input-group input-group-lg mt-2 flex justify-start">
          <span>Years</span>
          <input
            v-model="reqExp"
            type="number"
            max="45"
            min="0"
            name="req-experience"
            id="req-experience"
            placeholder="Required experience"
            class="input input-bordered input-lg w-32"
          />
        </label>
      </form>
    </label>
  </label>

  <input type="checkbox" id="rate-modal" class="modal-toggle" />
  <label for="rate-modal" class="modal cursor-pointer">
    <label class="modal-box relative" for="">
      <h3 class="mb-4">Rate (per month in USD)</h3>
      <form class="text-center flex justify-start">
        <label class="input-group input-group-xs mt-2">
          <span>Lower</span>
          <input
            v-model="lowRate"
            type="number"
            max="24000"
            min="1000"
            step="100"
            name="high-rate"
            id="high-rate"
            placeholder="Upper boundary"
            class="input input-bordered input-lg w-32"
          />
        </label>
        <label class="input-group input-group-xs mt-2">
          <span>Upper</span>
          <input
            v-model="highRate"
            type="number"
            max="30000"
            min="1000"
            step="100"
            name="low-rate"
            id="low-rate"
            placeholder="Lower boundary"
            class="input input-bordered input-lg w-32"
          />
        </label>
      </form>
    </label>
  </label>

  <input type="checkbox" id="skills-modal" class="modal-toggle" />
  <label for="skills-modal" class="modal cursor-pointer">
    <label class="modal-box relative" for="">
      <h3 class="mb-4">Skills Filters</h3>
      <div class="flex flex-row justify-center my-4 flex-wrap mx-auto">
        <span
          @click="toggleSkill(skill)"
          v-for="skill in skills"
          class="p-2 rounded-full text-sm border-2 m-4 cursor-pointer"
          :class="filterSkills.findIndex((item) => item.id == skill.id) == -1 ? 'disabledSkill' : skill.name"
        >
          {{ skill.name }}
        </span>
      </div>
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
  const filterSkills = ref<Skill[]>([])
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

  const toggleSkill = (skill: Skill) => {
    let pos = filterSkills.value?.findIndex((item) => item.id == skill.id)
    if (pos == -1) {
      filterSkills.value.push(skill)
    } else {
      filterSkills.value.splice(pos, 1)
    }
  }

  const toggleVerified = (evt: Event) => {
    verified.value = !verified.value
  }

  const toggleApproved = () => {
    approved.value = !approved.value
  }

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
      else if (!dev.active) return false

      const cskills = getCandidateSkillIds(dev)
      const unmatched = filterSkills.value.filter((fskill) => !cskills.includes(fskill.id))

      if (unmatched.length) return false

      return true
    })
  })
</script>

<style lang="css" scoped></style>
