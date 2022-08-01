<template>
  <div class="collapse" v-if="candidates.length">
    <div class="flex justify-start flex-col sm:flex-row items-start sm:items-center my-2">
      <div>
        <span class="mr-2 flower">Filters:</span>
        <label for="tz-modal" class="modal-button my-auto cursor-pointer mr-2">
          <i class="fa-solid fa-earth-americas" title="Timezone"></i>
        </label>
        <label for="skills-modal" class="modal-button my-auto cursor-pointer mr-2">
          <i class="fa-solid fa-tags" title="Skills"></i>
        </label>
        <label for="rate-modal" class="modal-button my-auto cursor-pointer mr-2">
          <i class="fa-solid fa-sack-dollar" title="Rate"></i>
        </label>
        <label for="exp-modal" class="modal-button my-auto cursor-pointer mr-2">
          <i class="fa-solid fa-graduation-cap" title="Experience"></i>
        </label>
        <label
          title="Approved"
          class="modal-button my-auto cursor-pointer mr-2"
          @click="toggleApproved"
          :class="approved ? 'text-yellow-400' : 'text-gray-300'"
        >
          <i class="fa-solid fa-star"></i>
        </label>
        <label
          title="Verified"
          class="modal-button my-auto cursor-pointer mr-2"
          @click="toggleVerified"
          :class="verified ? 'text-green-500' : 'text-gray-300'"
        >
          <i class="fa-solid fa-clipboard-check"></i>
        </label>
        <label
          title="Review"
          class="modal-button my-auto cursor-pointer mr-2"
          @click="toggleReview"
          :class="verify_req ? 'text-blue-400' : 'text-gray-300'"
          v-if="memberships.includes('admin')"
        >
          <i class="fa-solid fa-eye"></i>
        </label>
      </div>

      <input
        v-model="searchVal"
        type="text"
        placeholder="Search by name..."
        class="input input-bordered w-72 sm:ml-4"
      />
    </div>
    <ul v-if="filteredCandidates.length">
      <li v-for="dev in filteredCandidates">
        <Snippet :dev="dev" @skill-toggle="toggleSkill" />
      </li>
    </ul>
    <div v-else class="mt-12">
      <h3>
        Want to see more developers? Find <router-link to="notifications">verified and approved developers</router-link>
      </h3>
    </div>
  </div>
  <div class="text-center" v-else>
    <h3>Nothing to see here!</h3>
  </div>

  <input type="checkbox" id="tz-modal" class="modal-toggle" />
  <label for="tz-modal" class="modal cursor-pointer">
    <label class="modal-box relative" for="tz-modal">
      <h3 class="mb-4">Timezone (UTC)</h3>
      <form class="text-center flex flex-col justify-start">
        <label for="timezone-start" class="flower">From</label>
        <input
          type="range"
          min="-12"
          max="12"
          v-model="startTz"
          class="range range-primary"
          step="2"
          name="timezone-start"
          id="timezone-start"
        />
        <div class="w-full flex justify-between text-xxs px-2 mb-2">
          <span>-12</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>0</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>12</span>
        </div>
        <label for="timezone-end" class="flower">To</label>
        <input
          type="range"
          min="-12"
          max="12"
          v-model="endTz"
          class="range range-secondary"
          step="2"
          name="timezone-end"
          id="timezone-end"
        />
        <div class="w-full flex justify-between text-xxs px-2">
          <span>-12</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>0</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>12</span>
        </div>
      </form>
    </label>
  </label>

  <input type="checkbox" id="exp-modal" class="modal-toggle" />
  <label for="exp-modal" class="modal cursor-pointer">
    <label class="modal-box relative" for="exp-modal">
      <h3 class="mb-4">Experience filter</h3>
      <form class="text-center">
        <input
          type="range"
          min="0"
          max="10"
          v-model="reqExp"
          class="range range-secondary"
          step="1"
          name="req-experience"
          id="req-experience"
        />
        <div class="w-full flex justify-between text-xxs px-2">
          <span>0</span>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
          <span>8</span>
          <span>9</span>
          <span>10+</span>
        </div>
      </form>
    </label>
  </label>

  <input type="checkbox" id="rate-modal" class="modal-toggle" />
  <label for="rate-modal" class="modal cursor-pointer">
    <label class="modal-box relative" for="rate-modal">
      <h3 class="mb-4">Rate (per month in USD)</h3>
      <form class="text-center flex flex-col justify-start">
        <label for="timezone-start" class="flower">Lower</label>
        <input
          type="range"
          min="1000"
          max="24000"
          v-model="lowRate"
          class="range range-primary"
          step="1000"
          name="low-rate"
          id="low-rate"
        />
        <div class="w-full flex justify-between text-xxs px-2 mb-2">
          <span>1k</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>5k</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>10k</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>15k</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>20k</span>
          <span>|</span>
          <span>|</span>
        </div>
        <label for="timezone-end" class="flower">Upper</label>
        <input
          type="range"
          min="2000"
          max="24000"
          v-model="highRate"
          class="range range-secondary"
          step="1000"
          name="high-rate"
          id="high-rate"
        />
        <div class="w-full flex justify-between text-xxs px-2">
          <span>1k</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>5k</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>10k</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>15k</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>20k</span>
          <span>|</span>
          <span>|</span>
        </div>
      </form>
    </label>
  </label>

  <input type="checkbox" id="skills-modal" class="modal-toggle" />
  <label for="skills-modal" class="modal cursor-pointer">
    <label class="modal-box relative" for="skills-modal">
      <h3 class="mb-4">Skills Filters</h3>
      <div class="flex flex-row justify-center my-4 flex-wrap mx-auto">
        <span
          @click.prevent="toggleSkill(skill)"
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
  const verify_req = ref<boolean>(false)

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

  const toggleReview = (evt: Event) => {
    verify_req.value = !verify_req.value
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
      else if (verify_req.value && !dev.verify_req) return false
      else if (
        searchVal.value &&
        searchVal.value.length >= 3 &&
        !dev.display_name.toLowerCase().includes(searchVal.value)
      )
        return false

      const cskills = getCandidateSkillIds(dev)
      const unmatched = filterSkills.value.filter((fskill) => !cskills.includes(fskill.id))

      if (unmatched.length) return false

      return true
    })
  })
</script>

<style lang="css" scoped></style>
