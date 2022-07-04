<template>
  <Snippet :dev="developer" />
  <span class="text-sm text-gray-400 ml-4">Review requested: {{ moment(developer?.verify_req).fromNow() }}</span>
  <div class="p-4">
    <button class="btn btn-secondary mx-1" @click="verifyCandidate(true)">Verify</button>
    <button class="btn btn-default mx-1" @click="verifyCandidate(false)">Unverify</button>
    <button class="btn btn-secondary mx-1" @click="approveCandidate(true)">Approve</button>
    <button class="btn btn-default mx-1" @click="approveCandidate(false)">Disapprove</button>
    <button class="btn btn-primary mx-1" @click="completeReview()">Complete Review</button>
  </div>
</template>

<script setup lang="ts">
  import { onBeforeMount, ref } from 'vue'
  import moment from 'moment'
  import Snippet from '@/components/Snippet.vue'
  import useCandidate from '@/composables/useCandidate'
  import { useRoute } from 'vue-router'
  import { Candidate } from '@/types'
  import useAuthUser from '@/composables/useAuthUser'

  const route = useRoute()
  const { memberships } = useAuthUser()
  const { loadCandidateProfile, saveCandidate } = useCandidate()
  const developer = ref<Candidate | null>(null)

  onBeforeMount(async () => {
    developer.value = await loadCandidateProfile(Number.parseInt(route.params.id as string, 10))
  })

  const verifyCandidate = async (verify = true) => {
    developer.value!.verified = verify
    await saveCandidate(developer.value!, verify)
  }

  const approveCandidate = async (approve = true) => {
    developer.value!.approved = approve
    await saveCandidate(developer.value!, approve)
  }

  const completeReview = async () => {
    let newDev = await saveCandidate(developer.value!, developer.value!.verify_req === null ? true : false)
    developer.value!.verify_req = newDev.verify_req
  }
</script>

<style scoped></style>
