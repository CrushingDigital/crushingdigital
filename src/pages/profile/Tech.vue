<template>
  <div class="text-center my-4">
    <h1>Define <span class="italic text-secondary">your</span> tech stack!</h1>
  </div>
  <div class="text-center mb-4">
    <span class="text-sm text-gray-400">Remember: Less is more! Define yourself.</span>
  </div>
  <div class="flex flex-row justify-center my-4 flex-wrap mx-auto">
    <span
      @click="toggleSkill(skill)"
      v-for="skill in skills"
      class="p-2 rounded-full text-sm border-2 m-4 cursor-pointer"
      :class="selectedSkills.findIndex((item) => item.id == skill.id) == -1 ? 'disabledSkill' : skill.name"
    >
      {{ skill.name }}
    </span>
  </div>
  <div class="flex justify-center mt-8" v-if="candidate.id">
    <button class="btn rounded-full mx-1" type="submit" @click.prevent="goBack">Back</button>
    <button class="btn rounded-full mx-1" type="submit" @click.prevent="save">Save</button>
  </div>
  <div v-else class="text-center">
    <h3>Sorry, you need to <router-link to="basic">create your profile</router-link> first</h3>
  </div>
</template>

<script setup lang="ts">
  import { onBeforeMount, ref } from 'vue'
  import { useRouter } from 'vue-router'

  import useAuthUser from '@/composables/useAuthUser'
  import useCandidate from '@/composables/useCandidate'
  import useSkill from '@/composables/useSkill'

  import { Skill, Candidate } from '@/types'

  const router = useRouter()
  const { user } = useAuthUser()
  const candidate = ref<Candidate>({} as Candidate)

  const { loadProfile } = useCandidate()
  const { getSkills, saveSkillsForCandidate, unpackSkills } = useSkill()
  const skills = ref<Array<Skill>>([])
  const selectedSkills = ref<Skill[]>([])

  onBeforeMount(async () => {
    let loadedProfile
    ;[loadedProfile, skills.value] = await Promise.all([loadProfile(user.value!.id), getSkills()])

    if (loadedProfile == undefined || loadedProfile instanceof Error) return false

    candidate.value = loadedProfile
    selectedSkills.value = unpackSkills(candidate.value)
  })

  const goBack = () => {
    router.go(-1)
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
    target.innerText = 'saving...'
    target.classList.toggle('disabledButton')
    target.classList.toggle('button')

    if (candidate.value) {
      await saveSkillsForCandidate(candidate.value, selectedSkills.value)
    }

    target.innerText = 'Save'
    target.classList.toggle('disabledButton')
    target.classList.toggle('button')
    target.disabled = false

    return candidate
  }
</script>

<style scoped></style>
