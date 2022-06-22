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
            v-model="candidate.display_name"
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
            v-model="candidate.blurb"
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
            v-model="candidate.yoe"
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
            v-model="candidate.rate"
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
            v-model="candidate.timezone"
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
            v-model="candidate.gitsource"
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
            v-model="candidate.linkedin"
            name="linkedin"
            id="linkedin"
            placeholder="https://www.linkedin.com/in/davidproberts/"
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
            Link #1
          </label>
        </div>
        <div class="sm:w-2/3 flex flex-row align-middle">
          <input
            type="text"
            v-model="candidate.link_1"
            name="link1"
            id="link1"
            placeholder="Evidence your abilities with the below skills"
            class="cdText"
            @blur="checkLinkUrl"
          />
        </div>
      </div>

      <div class="sm:flex md:items-center mb-6">
        <div class="sm:w-1/3">
          <label
            class="block text-gray-500 font-bold sm:text-right mb-1 md:mb-0 pr-4"
            for="inline-full-name"
          >
            Link #2
          </label>
        </div>
        <div class="sm:w-2/3">
          <input
            type="text"
            v-model="candidate.link_2"
            name="link2"
            id="link2"
            placeholder="Evidence your abilities with the below skills"
            class="cdText"
            @blur="checkLinkUrl"
          />
        </div>
      </div>

      <div class="sm:flex md:items-center mb-6">
        <div class="sm:w-1/3">
          <label
            class="block text-gray-500 font-bold sm:text-right mb-1 md:mb-0 pr-4"
            for="inline-full-name"
          >
            Link #3
          </label>
        </div>
        <div class="sm:w-2/3">
          <input
            type="text"
            v-model="candidate.link_3"
            name="link3"
            id="link3"
            placeholder="Evidence your abilities with the below skills"
            class="cdText"
            @blur="checkLinkUrl"
          />
        </div>
      </div>
    </form>
  </div>
  <div class="flex justify-evenly my-8">
    <button
      @click="toggleSkill(skill)"
      v-for="skill in skills"
      class="p-2 rounded-full text-xs border-2"
      :class="
        selectedSkills.findIndex((item) => item.id == skill.id) == -1
          ? 'disabledSkill'
          : skill.name
      "
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
import { Skill, Candidate } from "../types"

const candidate = ref<Candidate>({} as Candidate)

const { addCandidate, getSkills, addSkillsForCandidate, loadProfile } =
  useSupabase()
const skills = ref<Array<Skill>>([])
const selectedSkills = ref<Skill[]>([])

onBeforeMount(async () => {
  ;[candidate.value, skills.value] = await Promise.all([
    loadProfile(),
    getSkills(),
  ])

  unpackSkills()
})

const unpackSkills = () => {
  selectedSkills.value = candidate.value.candidate_skills!.map(
    (cskills) => cskills.skills as Skill
  )
}

const toggleSkill = (skill: Skill) => {
  let pos = selectedSkills.value?.findIndex((item) => item.id == skill.id)
  if (pos == -1) {
    selectedSkills.value.push(skill)
  } else {
    selectedSkills.value.splice(pos, 1)
  }
}

const save = async (e: Event) => {
  const target = e.target as HTMLButtonElement

  target.disabled = true
  target.innerText = "saving..."
  target.classList.toggle("disabledButton")
  target.classList.toggle("button")

  candidate.value = await addCandidate(candidate.value)

  if (candidate) {
    let tmp = await addSkillsForCandidate(candidate.value, selectedSkills.value)
  }

  target.innerText = "Save"
  target.classList.toggle("disabledButton")
  target.classList.toggle("button")
  target.disabled = false

  return candidate
}

const checkLinkUrl = async (e: Event) => {
  const target = e.target as HTMLButtonElement

  if (target.value.length) target.classList.remove("undefinedText")
  else target.classList.add("undefinedText")

  if (isValidUrl(target.value)) {
    target.classList.remove("invalidText")
    target.classList.add("validText")
  } else {
    target.classList.add("invalidText")
    target.classList.remove("validText")
  }
}

const isValidUrl = (_string: string) => {
  const matchPattern = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/
  return matchPattern.test(_string)
}
</script>

<style scoped></style>
