<template>
  <div class="text-center mb-4">
    <h1>
      Your <span class="italic text-secondary">real</span> career starts here!
    </h1>
  </div>
  <form>
    <div class="flex flex-col justify-center">
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">What is your name?</span>
        </label>
        <input
          type="text"
          class="input input-bordered input-ghost bg-gray-100"
          v-model="candidate.display_name"
          name="displayName"
          id="displayName"
          placeholder="Jane Doe"
        />
      </div>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">About you</span>
        </label>
        <input
          type="text"
          class="input input-bordered input-ghost bg-gray-100"
          v-model="candidate.blurb"
          name="blurb"
          id="blurb"
          placeholder="Front end developer specialising in React"
        />
      </div>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Experience</span>
        </label>
        <label class="input-group">
          <span>Years</span>
          <input
            v-model="candidate.yoe"
            placeholder="0"
            type="number"
            max="50"
            min="0"
            name="yoe"
            id="yoe"
            class="input input-bordered input-ghost bg-gray-100"
          />
        </label>
      </div>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Monthly rate</span>
        </label>
        <label class="input-group">
          <span>USD</span>
          <input
            v-model="candidate.rate"
            class="input input-bordered input-ghost bg-gray-100"
            type="number"
            placeholder="4000"
            max="45000"
            min="0"
            name="rate"
            id="rate"
          />
        </label>
      </div>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Timezone</span>
        </label>
        <label class="input-group">
          <span>UTC</span>
          <input
            v-model="candidate.timezone"
            type="number"
            max="12"
            min="-12"
            name="timezone"
            id="timezone"
            class="input input-bordered input-ghost bg-gray-100"
          />
        </label>
      </div>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Code samples</span>
        </label>
        <input
          type="text"
          class="input input-bordered input-ghost bg-gray-100"
          v-model="candidate.gitsource"
          name="gitsource"
          id="gitsource"
          placeholder="GitHub (or similar) profile?"
        />
      </div>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">LinkedIn Profile</span>
        </label>
        <input
          type="text"
          class="input input-bordered input-ghost bg-gray-100"
          v-model="candidate.linkedin"
          name="linkedin"
          id="linkedin"
          placeholder="https://www.linkedin.com/in/davidproberts/"
        />
      </div>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Link #1</span>
        </label>
        <input
          type="text"
          v-model="candidate.link_1"
          name="link1"
          id="link1"
          placeholder="Evidence your abilities with your chosen tech stack"
          class="input input-bordered input-ghost bg-gray-100"
          @blur="checkLinkUrl"
        />
      </div>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Link #2</span>
        </label>
        <input
          type="text"
          v-model="candidate.link_2"
          name="link2"
          id="link2"
          placeholder="Evidence your abilities with your chosen tech stack"
          class="input input-bordered input-ghost bg-gray-100"
          @blur="checkLinkUrl"
        />
      </div>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Link #3</span>
        </label>
        <input
          type="text"
          v-model="candidate.link_3"
          name="link3"
          id="link3"
          placeholder="Evidence your abilities with your chosen tech stack"
          class="input input-bordered input-ghost bg-gray-100"
          @blur="checkLinkUrl"
        />
      </div>
    </div>
  </form>
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
    <button class="btn rounded-full" type="submit" @click.prevent="save">
      Save
    </button>
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
