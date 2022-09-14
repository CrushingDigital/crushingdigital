<template>
  <div class="flex justify-center items-center my-4">
    <i class="fa-solid fa-circle-arrow-down mr-4 text-primary"></i>
    <h3>Get the <span class="text-secondary">basics</span> right</h3>
    <i class="fa-solid fa-circle-arrow-down ml-4 text-primary"></i>
  </div>

  <form>
    <div class="flex flex-col justify-center container mx-auto">
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
          <span class="label-text">About you</span><span class="text-gray-400 text-xs">(limit: 100 chars)</span>
        </label>
        <input
          type="text"
          class="input input-bordered input-ghost bg-gray-100"
          v-model="candidate.blurb"
          name="blurb"
          id="blurb"
          maxlength="100"
          placeholder="Front end developer specialising in React"
        />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Experience</span
          ><span class="text-gray-400 text-xs">({{ candidate.yoe }} years)</span>
        </label>
        <input
          type="range"
          min="0"
          max="10"
          v-model="candidate.yoe"
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
          <span class="label-text">Monthly rate</span
          ><span class="text-gray-400 text-xs">(min: ${{ candidate.rate }} pm)</span>
        </label>
        <input
          type="range"
          min="1000"
          max="20000"
          v-model="candidate.rate"
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
      <div class="form-control">
        <label class="label">
          <span class="label-text">Timezone (UTC)</span
          ><span class="text-gray-400 text-xs"
            >(Location: UTC{{ candidate.timezone >= 0 ? '+' + candidate.timezone : candidate.timezone }})</span
          >
        </label>
        <input
          type="range"
          min="-12"
          max="12"
          v-model="candidate.timezone"
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
          <span class="label-text">Coding Profile</span><span class="text-gray-400 text-xs">(GitHub or similar)</span>
        </label>
        <input
          type="text"
          class="input input-bordered input-ghost bg-gray-100"
          v-model="candidate.gitsource"
          name="gitsource"
          id="gitsource"
          placeholder="e.g. GitHub (or similar) profile?"
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
          placeholder="e.g. https://www.linkedin.com/in/davidproberts/"
        />
      </div>
      <div class="form-control w-full sm:w-1/2">
        <label class="label cursor-pointer">
          <span class="label-text">Display on site?</span>
          <input type="checkbox" class="toggle toggle-secondary" v-model="candidate.active" />
        </label>
      </div>
      <div class="form-control w-full sm:w-1/2">
        <label class="label cursor-pointer">
          <span class="label-text">Receive profile review notifications via email?</span>
          <input type="checkbox" class="toggle toggle-secondary" v-model="candidate.allow_emails" />
        </label>
      </div>
      <div class="form-control w-full sm:w-1/2">
        <label class="label cursor-pointer">
          <span class="label-text">Delete my account (usually takes 48hrs)</span>
          <input type="checkbox" class="toggle toggle-secondary" v-model="candidate.delete_me" />
        </label>
      </div>
      <div class="flex justify-center items-center my-8">
        <i class="fa-solid fa-circle-arrow-down mr-4 text-primary"></i>
        <h3>Now <span class="text-secondary">sell</span> yourself!</h3>
        <i class="fa-solid fa-circle-arrow-down ml-4 text-primary"></i>
      </div>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Link #1</span><span class="text-gray-400 text-xs">(e.g. portfolio)</span>
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
          <span class="label-text">Link #2</span
          ><span class="text-gray-400 text-xs">(e.g. a short video about you?)</span>
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
          <span class="label-text">Link #3</span><span class="text-gray-400 text-xs">(e.g. blog?)</span>
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
  <div class="flex justify-center mt-8">
    <button class="btn rounded-full" type="submit" @click.prevent="save">Save & continue</button>
  </div>
</template>

<script setup lang="ts">
  import useAuthUser from '@/composables/useAuthUser'
  import useCandidate from '@/composables/useCandidate'
  import { onBeforeMount, ref } from 'vue'
  import { Candidate } from '@/types'
  import { useRouter } from 'vue-router'
  import useEvents from '@/composables/useEvent'
  import { checkLinkUrl, linkFix } from '@/helpers'

  const { events, getEvents } = useEvents()
  const router = useRouter()
  const { user } = useAuthUser()
  const candidate = ref<Candidate>({ user_id: user.value?.id, email: user.value?.email } as Candidate)

  const { saveCandidate, loadProfile } = useCandidate()

  onBeforeMount(async () => {
    let loadedProfile

    try {
      loadedProfile = await loadProfile(user.value!.id)
      candidate.value = loadedProfile as Candidate
    } catch (error) {
      // Do something
    }
  })

  const save = async (e: Event) => {
    const target = e.target as HTMLButtonElement

    target.disabled = true
    target.innerText = 'saving...'
    target.classList.toggle('disabledButton')
    target.classList.toggle('button')

    if (!candidate.value.email) candidate.value.email = user.value?.email

    candidate.value.gitsource = linkFix(candidate.value.gitsource)
    candidate.value.linkedin = linkFix(candidate.value.linkedin)
    candidate.value.link_1 = linkFix(candidate.value.link_1)
    candidate.value.link_2 = linkFix(candidate.value.link_2)
    candidate.value.link_3 = linkFix(candidate.value.link_3)

    let savedProfile = await saveCandidate(candidate.value, !candidate.value.delete_me)
    if (savedProfile instanceof Error) return false

    candidate.value = savedProfile

    target.innerText = 'Save'
    target.classList.toggle('disabledButton')
    target.classList.toggle('button')
    target.disabled = false

    router.push('/profile/tech')

    return candidate
  }
</script>

<style scoped></style>
