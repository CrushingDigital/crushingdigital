<template>
  <div class="text-center mb-4">
    <h1>Your <span class="italic">real</span> career starts here!</h1>
  </div>
  <div id="form">
    <form class="w-full max-w-xl">
      <div class="sm:flex sm:items-center mb-6 justify-center align-middle">
        <div class="sm:w-1/3">
          <label
            class="block text-gray-500 font-bold sm:text-right mb-1 md:mb-0 pr-4"
            for="inline-full-name"
          >
            Display Name
          </label>
        </div>
        <div class="sm:w-2/3">
          <input
            v-model="displayName"
            type="text"
            name="displayName"
            id="displayName"
            placeholder="Jane Doe"
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          />
        </div>
      </div>
      <div class="sm:flex sm:items-center mb-6 justify-center align-middle">
        <div class="sm:w-1/3">
          <label
            class="block text-gray-500 font-bold sm:text-right mb-1 md:mb-0 pr-4"
            for="inline-full-name"
          >
            About you
          </label>
        </div>
        <div class="sm:w-2/3">
          <textarea
            v-model="blurb"
            name="blurb"
            id="blurb"
            placeholder="Front end developer specialising in React"
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          />
        </div>
      </div>
      <div class="sm:flex md:items-center mb-6">
        <div class="sm:w-1/3">
          <label
            class="block text-gray-500 font-bold sm:text-right mb-1 md:mb-0 pr-4"
            for="inline-full-name"
          >
            Experience<br /><span class="text-xs">(years)</span>
          </label>
        </div>
        <div class="sm:w-2/3">
          <input
            v-model="yoe"
            placeholder="0"
            type="number"
            max="50"
            min="0"
            name="yoe"
            id="yoe"
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          />
        </div>
      </div>
      <div class="sm:flex md:items-center mb-6">
        <div class="sm:w-1/3">
          <label
            class="block text-gray-500 font-bold sm:text-right mb-1 md:mb-0 pr-4"
            for="inline-full-name"
          >
            Monthly Rate<br /><span class="text-xs">($USD)</span>
          </label>
        </div>
        <div class="sm:w-2/3">
          <input
            v-model="rate"
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="number"
            placeholder="4000"
            max="45000"
            min="0"
            name="rate"
            id="rate"
          />
        </div>
      </div>
      <div class="sm:flex md:items-center mb-6">
        <div class="sm:w-1/3">
          <label
            class="block text-gray-500 font-bold sm:text-right mb-1 md:mb-0 pr-4"
            for="inline-full-name"
          >
            Timezone<br /><span class="text-xs">(e.g.utc-4)</span>
          </label>
        </div>
        <div class="sm:w-2/3">
          <input
            v-model="timezone"
            type="number"
            max="12"
            min="-12"
            name="timezone"
            id="timezone"
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          />
        </div>
      </div>

      <div class="sm:flex md:items-center mb-6">
        <div class="sm:w-1/3">
          <label
            class="block text-gray-500 font-bold sm:text-right mb-1 md:mb-0 pr-4"
            for="inline-full-name"
          >
            GitHub<br /><span class="text-xs">(or similar)</span>
          </label>
        </div>
        <div class="sm:w-2/3">
          <input
            type="text"
            v-model="gitSource"
            name="gitSource"
            id="gitSource"
            placeholder="https://github.com/davidproberts"
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 text-sm"
          />
        </div>
      </div>

      <div class="sm:flex md:items-center mb-6">
        <div class="sm:w-1/3">
          <label
            class="block text-gray-500 font-bold sm:text-right mb-1 md:mb-0 pr-4"
            for="inline-full-name"
          >
            LinkedIn
          </label>
        </div>
        <div class="sm:w-2/3">
          <input
            type="text"
            v-model="linkedin"
            name="linkedin"
            id="linkedin"
            placeholder="https://www.linkedin.com/in/davidproberts/"
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 text-sm"
          />
        </div>
      </div>
    </form>
  </div>
  <div class="flex justify-evenly my-8">
    <button
      @click="toggleSkill(skill.id)"
      v-for="skill in skills"
      class="p-2 rounded-full text-xs border-2"
      :class="skillSelection.includes(skill.id) ? skill.name : 'disabledSkill'"
    >
      {{ skill.name }}
    </button>
  </div>
  <div class="flex justify-center mt-8">
    <button class="button" type="submit" @click.prevent="save">Save</button>
  </div>
</template>

<script setup lang="ts">
import useSupabase from "../composables/useSupabase"
import { onBeforeMount, ref } from "vue"
import { Candidate, Skill, SkillItem } from "../types"

const candidateId = ref(undefined)
const displayName = ref("")
const gitSource = ref("")
const linkedin = ref("")
const rate = ref(0)
const timezone = ref(0)
const yoe = ref(0)
const blurb = ref("")

const { addCandidate, getSkills, addSkillsForCandidate, loadProfile } =
  useSupabase()
let skills = ref<Array<Skill>>([])
let skillSelection = ref<number[]>([])

onBeforeMount(async () => {
  const candidate = await loadProfile()
  if (candidate) {
    ;({
      id: candidateId.value,
      display_name: displayName.value,
      blurb: blurb.value,
      gitsource: gitSource.value,
      linkedin: linkedin.value,
      rate: rate.value,
      timezone: timezone.value,
      yoe: yoe.value,
    } = candidate)

    console.log(candidate, candidateId)
    // destructure the skills selection
    skillSelection.value = candidate.candidate_skills.map(
      (item: SkillItem) => item.skill_id
    )
  }

  skills.value = await getSkills()
})

const toggleSkill = (skillId: number) => {
  if (skillSelection.value.includes(skillId))
    skillSelection.value = skillSelection.value.filter(
      (skill) => skill != skillId
    )
  else skillSelection.value.push(skillId)
}

const save = async (e: Event) => {
  const target = e.target as HTMLButtonElement

  target.disabled = true
  target.innerText = "saving..."
  target.classList.toggle("disabledButton")
  target.classList.toggle("button")
  const candidate = await addCandidate(
    candidateId.value,
    displayName.value,
    blurb.value,
    gitSource.value,
    linkedin.value,
    rate.value,
    timezone.value,
    yoe.value
  )

  if (candidate) {
    candidateId.value = candidate.id
    candidate.skills = await addSkillsForCandidate(
      candidate.id,
      skillSelection.value
    )
  }

  target.innerText = "Save"
  target.classList.toggle("disabledButton")
  target.classList.toggle("button")
  target.disabled = false

  return candidate
}
</script>

<style scoped></style>
