<template>
  <form>
    <div class="flex flex-col justify-center container mx-auto">
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Company</span>
        </label>
        <input
          type="text"
          class="input input-bordered input-ghost bg-gray-100"
          v-model="job.company"
          name="displayName"
          id="displayName"
          placeholder="e.g. Acme Inc."
        />
      </div>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Job Title</span>
        </label>
        <input
          type="text"
          class="input input-bordered input-ghost bg-gray-100"
          v-model="job.title"
          name="displayName"
          id="displayName"
          placeholder="e.g. Front End (Vue.js) Developer"
        />
      </div>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Brief description (140 chars)</span>
        </label>
        <input
          type="text"
          class="input input-bordered input-ghost bg-gray-100"
          v-model="job.blurb"
          @input="checkInputLength(job)"
          maxlength="140"
          name="displayName"
          id="displayName"
          placeholder="Working in a team of ~5 developers on a new portal to manage crypto currency wallets. Strong UI/UX required."
        />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Experience Required</span
          ><span class="text-gray-400 text-xs">({{ job.yoe }} years)</span>
        </label>
        <input
          type="range"
          min="0"
          max="10"
          v-model="job.yoe"
          class="range range-primary"
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
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Min. Monthly rate</span
          ><span class="text-gray-400 text-xs">(min: ${{ job.rate }} pm)</span>
        </label>
        <input
          type="range"
          min="1000"
          max="20000"
          v-model="job.rate"
          class="range range-secondary"
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
        </div>
      </div>
    </div>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Timezone (UTC)</span
        ><span class="text-gray-400 text-xs"
          >(Location: UTC{{ job.timezone >= 0 ? '+' + job.timezone : job.timezone }})</span
        >
      </label>
      <input
        type="range"
        min="-12"
        max="12"
        v-model="job.timezone"
        class="range range-accent"
        step="1"
        name="timezone-start"
        id="timezone-start"
      />
      <div class="w-full flex justify-between text-xxs px-2 mb-2">
        <span>-12</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>-8</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>-4</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>0</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>4</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>8</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>12</span>
      </div>
    </div>
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">Company Website</span>
      </label>
      <input
        type="text"
        class="input input-bordered input-ghost bg-gray-100"
        v-model="job.website"
        name="gitsource"
        id="gitsource"
        placeholder="e.g. https://crushing.digital"
      />
    </div>
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">Job Spec and where to apply?</span>
      </label>
      <input
        type="text"
        class="input input-bordered input-ghost bg-gray-100"
        v-model="job.jobspec"
        name="linkedin"
        id="linkedin"
        placeholder="e.g. Web link or Google Doc"
      />
    </div>
    <div class="form-control w-full sm:w-1/2">
      <label class="label cursor-pointer">
        <span class="label-text">Display on site?</span>
        <input type="checkbox" class="toggle toggle-secondary" v-model="job.active" />
      </label>
    </div>
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">Link #1</span
        ><span class="text-gray-400 text-xs">(e.g. Introduce the company and it's culture)</span>
      </label>
      <input
        type="text"
        v-model="job.link_1"
        name="link1"
        id="link1"
        placeholder="Evidence your abilities with your chosen tech stack"
        class="input input-bordered input-ghost bg-gray-100"
        @blur="checkLinkUrl"
      />
    </div>
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">Link #2</span
        ><span class="text-gray-400 text-xs">(e.g. A short video about the project)</span>
      </label>
      <input
        type="text"
        v-model="job.link_2"
        name="link2"
        id="link2"
        placeholder="Evidence your abilities with your chosen tech stack"
        class="input input-bordered input-ghost bg-gray-100"
        @blur="checkLinkUrl"
      />
    </div>
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">Link #3</span
        ><span class="text-gray-400 text-xs">(e.g. Team structure or benefits?)</span>
      </label>
      <input
        type="text"
        v-model="job.link_3"
        name="link3"
        id="link3"
        placeholder="Evidence your abilities with your chosen tech stack"
        class="input input-bordered input-ghost bg-gray-100"
        @blur="checkLinkUrl"
      />
    </div>
    <div class="flex justify-center mt-8">
      <button class="btn rounded-full" type="submit" @click.prevent="save">Save</button>
    </div>
  </form>
</template>

<script setup lang="ts">
  import { Job } from '@/types'
  import { onBeforeMount, ref } from 'vue'
  import { checkLinkUrl } from '@/helpers'
  import { useRouter } from 'vue-router'
  import { linkFix } from '@/helpers'
  import useAuthUser from '@/composables/useAuthUser'
  import useJob from '@/composables/useJob'

  const MAX_LENGTH_IN_CHARS = 140
  const props = defineProps(['id'])

  const router = useRouter()
  const { saveJob, loadJob } = useJob()
  const { user } = useAuthUser()
  const job = ref<Job>({ user_id: user.value?.id } as Job)

  onBeforeMount(async () => {
    if (props.id) {
      let loadedJob = await loadJob(props.id)
      if (loadedJob instanceof Error) return false

      job.value = loadedJob
    }
  })

  const save = async (e: Event) => {
    const target = e.target as HTMLButtonElement

    target.disabled = true
    target.innerText = 'saving...'
    target.classList.toggle('disabledButton')
    target.classList.toggle('button')

    job.value.website = linkFix(job.value.website)
    job.value.jobspec = linkFix(job.value.jobspec)
    job.value.link_1 = linkFix(job.value.link_1)
    job.value.link_2 = linkFix(job.value.link_2)
    job.value.link_3 = linkFix(job.value.link_3)

    let savedJob = await saveJob(job.value)
    if (savedJob instanceof Error) return false
    job.value = savedJob

    target.innerText = 'Save'
    target.classList.toggle('disabledButton')
    target.classList.toggle('button')
    target.disabled = false

    router.push(`/job/${job.value.id}/tech`)

    return job
  }

  const checkInputLength = (job: Job) => {
    if (job.blurb.length >= MAX_LENGTH_IN_CHARS) {
      job.blurb = job.blurb.substring(0, MAX_LENGTH_IN_CHARS)
    }
  }
</script>

<style scoped></style>
