<template>
  <div class="flex justify-center mb-4">
    <h1>Define <span class="italic text-secondary">your</span> tech stack!</h1>
  </div>
  <div class="flex flex-row justify-center my-8 flex-wrap max-w-md mx-auto">
    <span
      @click="toggleSkill(skill)"
      v-for="skill in skills"
      class="p-2 rounded-full text-sm border-2 m-4 cursor-pointer"
      :class="
        selectedSkills.findIndex((item) => item.id == skill.id) == -1
          ? 'disabledSkill'
          : skill.name
      "
    >
      {{ skill.name }}
    </span>
  </div>
  <div class="flex justify-center mt-8">
    <button class="btn rounded-full mx-1" type="submit" @click.prevent="goBack">
      Back
    </button>
    <button class="btn rounded-full mx-1" type="submit" @click.prevent="save">
      Save
    </button>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue"
import { useRouter } from "vue-router"

import useAuthUser from "../../composables/useAuthUser"
import useCandidate from "../../composables/useCandidate"
import useSkill from "../../composables/useSkill"

import { Skill, Candidate } from "../../types"

const router = useRouter()
const { user } = useAuthUser()
const candidate = ref<Candidate>({} as Candidate)

const { loadProfile } = useCandidate()
const { getSkills, saveSkillsForCandidate } = useSkill()
const skills = ref<Array<Skill>>([])
const selectedSkills = ref<Skill[]>([])

onBeforeMount(async () => {
  ;[candidate.value, skills.value] = await Promise.all([
    loadProfile(user.value!.id),
    getSkills(),
  ])

  unpackSkills()
})

const goBack = () => {
  router.go(-1)
}

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

  if (candidate) {
    await saveSkillsForCandidate(candidate.value, selectedSkills.value)
  }

  target.innerText = "Save"
  target.classList.toggle("disabledButton")
  target.classList.toggle("button")
  target.disabled = false

  return candidate
}
</script>

<style scoped></style>