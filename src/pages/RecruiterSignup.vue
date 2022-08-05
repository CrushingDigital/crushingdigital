<template>
  <div>
    <h3>Recruiters Signup</h3>

    <div class="rounded-lg bg-accent px-8 py-4 mt-4">
      <h3 class="text-black">Important:</h3>
      <p class="text-sm">
        We're not quite ready for release just yet, but we want you to have a look around and get a feel for how this
        will work. You're feedback is greatly appreciated. With this in mind, the service is FREE at this time. This is
        subject to change and we will keep you informed of any changes before they happen.
      </p>
    </div>
    <div class="options mt-8">
      <div class="border-2 rounded-lg p-8 flex flex-col justify-start my-8">
        <h3 class="text-secondary">Lite</h3>
        <p>
          This gived you access to our <i class="fa-solid fa-clipboard-check text-green-500"></i> verified developers.
          Those developers whose profiles we have assessed and verified their profile indicates a good level of ability
          with the skills listed therein.
        </p>
        <div class="flex flex-row justify-end">
          <button class="btn btn-primary btn-sm" @click="clickLite" v-if="!memberships.includes('recruiter_lite')">
            Recruiter Lite &raquo
          </button>
          <i class="fa-solid fa-circle-check text-green-500" v-else></i>
        </div>
      </div>
      <div class="border-2 rounded-lg p-8 flex flex-col justify-start">
        <h3 class="text-secondary">Pro</h3>
        <p>
          This gives you <b>full</b> access to our <i class="fa-solid fa-clipboard-check text-green-500"></i> verified
          and <i class="fa-solid fa-star text-yellow-400"></i> approved developers. We have assessed their profiles and
          put them through our technical vetting process. These developers come recommended!
        </p>
        <div class="flex flex-row justify-end">
          <button class="btn btn-primary btn-sm" @click="clickPro" v-if="!memberships.includes('recruiter_pro')">
            Recruiter Pro &raquo
          </button>
          <i class="fa-solid fa-circle-check text-green-500" v-else></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import useAuthUser from '@/composables/useAuthUser'
  import { onBeforeMount } from 'vue'
  const { memberships, getUserMemberships, registerLite, registerPro } = useAuthUser()

  onBeforeMount(async () => {
    await getUserMemberships()
  })

  const clickLite = async () => {
    let res = await registerLite()

    if (res) {
      getUserMemberships()
    }
  }

  const clickPro = async () => {
    let res = await registerPro()

    if (res) {
      getUserMemberships()
    }
  }
</script>

<style scoped></style>
