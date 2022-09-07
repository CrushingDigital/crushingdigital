<template>
  <div class="text-center my-4">
    <h1>Define the tech stack!</h1>
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
  <div class="flex justify-center mt-8" v-if="id">
    <button class="btn rounded-full mx-1" type="submit" @click.prevent="goBack">Back</button>
    <button class="btn rounded-full mx-1" type="submit" @click.prevent="save">Save</button>
  </div>
  <div v-else class="text-center">
    <h3>Sorry, you need to <router-link to="job_new">create a job</router-link> first</h3>
  </div>
</template>

<script setup lang="ts">
  import { onBeforeMount, ref } from 'vue'
  import { useRouter } from 'vue-router'

  import useAuthUser from '@/composables/useAuthUser'
  import useJob from '@/composables/useJob'
  import useSkill from '@/composables/useSkill'

  import { Skill, Job } from '@/types'

  const props = defineProps(['id'])
  const router = useRouter()
  const { user } = useAuthUser()
  const job = ref<Job>({} as Job)

  const { loadJob } = useJob()
  const { getSkills, saveSkillsForJob, unpackJobSkills } = useSkill()
  const skills = ref<Array<Skill>>([])
  const selectedSkills = ref<Skill[]>([])

  onBeforeMount(async () => {
    let loadedJob
    ;[loadedJob, skills.value] = await Promise.all([loadJob(props.id), getSkills()])

    if (loadedJob == undefined || loadedJob instanceof Error) return false

    job.value = loadedJob
    selectedSkills.value = unpackJobSkills(job.value)
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

    if (job.value) {
      await saveSkillsForJob(job.value, selectedSkills.value)
    }

    target.innerText = 'Save'
    target.classList.toggle('disabledButton')
    target.classList.toggle('button')
    target.disabled = false

    router.push({ name: 'jobs' })

    return job
  }
</script>

<style scoped></style>
