<template>
  <Snippet :dev="developer" />
  <span class="text-sm text-gray-400 ml-4">Review requested: {{ moment(developer?.verify_req).fromNow() }}</span>
  <div class="py-4">
    <button class="btn btn-xs btn-secondary mx-1" @click="verifyCandidate(true)">Verify</button>
    <button class="btn btn-xs btn-default mx-1" @click="verifyCandidate(false)">Unverify</button>
    <button class="btn btn-xs btn-secondary mx-1" @click="approveCandidate(true)">Approve</button>
    <button class="btn btn-xs btn-default mx-1" @click="approveCandidate(false)">Disapprove</button>
    <button class="btn btn-xs btn-primary mx-1" @click="completeReview()">Complete Review</button>
  </div>
  <div class="flex flex-col">
    <select class="select select-bordered w-full max-w-xs mb-4" v-model="reason">
      <option disabled selected>Reason</option>
      <option>Verify: Bad LinkedIn</option>
      <option>Verify: Bad GitHub</option>
      <option>Verify: Link #1</option>
      <option>Verify: Link #2</option>
      <option>Verify: Link #3</option>
      <option>Approve: Language</option>
      <option>Approve: Insufficient evidence</option>
      <option>Approve: Focus</option>
      <option>Approve: Personality</option>
    </select>

    <textarea
      v-model="explanation"
      class="textarea textarea-bordered"
      placeholder="Explain your decision..."
    ></textarea>
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
  import { useToast } from 'vue-toastification'
  import useEvents from '@/composables/useEvent'

  const { addEvent } = useEvents()
  const toast = useToast()
  const route = useRoute()
  const { memberships } = useAuthUser()
  const { loadCandidateProfile, saveCandidate } = useCandidate()
  const developer = ref<Candidate | null>(null)
  const reason = ref('')
  const explanation = ref('')

  onBeforeMount(async () => {
    developer.value = await loadCandidateProfile(Number.parseInt(route.params.id as string, 10))
  })

  const verifyCandidate = async (verify = true) => {
    const initVal = developer.value!.verified
    try {
      developer.value!.verified = verify
      await saveCandidate(developer.value!, false)
      toast.success('Verified flag updated')
      let descr = verify ? 'Profile verified' : reason.value
      let note = verify ? 'Verified' : 'Verification declined: ' + explanation.value
      addEvent(verify ? 'CANDIDATE.VERIFIED' : 'CANDIDATE:UNVERIFIED', descr, note, developer.value!.user_id)
    } catch (err) {
      developer.value!.verified = initVal
      toast.error('Permission denied')
    }
  }

  const approveCandidate = async (approve = true) => {
    const initVal = developer.value!.approved
    try {
      developer.value!.approved = approve
      await saveCandidate(developer.value!, false)
      toast.success('Approved flag updated')
      let descr = approve ? 'Profile approved' : reason.value
      let note = approve ? 'Approved' : 'Approval declined: ' + explanation.value
      addEvent(approve ? 'CANDIDATE.APPROVED' : 'CANDIDATE:DISAPPROVED', descr, note, developer.value!.user_id)
    } catch (err) {
      developer.value!.approved = initVal
      toast.error('Permission denied')
    }
  }

  const completeReview = async () => {
    let newDev = await saveCandidate(developer.value!, developer.value!.verify_req === null ? true : false)
    developer.value!.verify_req = newDev.verify_req
  }
</script>

<style scoped></style>
