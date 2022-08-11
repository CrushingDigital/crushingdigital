<template>
  <Snippet :dev="developer" />
  <span class="text-sm text-gray-400 ml-4">Review requested: {{ moment(developer?.verify_req).fromNow() }}</span>
  <div class="py-4">
    <button class="btn btn-xs btn-secondary mx-1" @click="verifyCandidate(true)">Verify</button>
    <button class="btn btn-xs btn-default mx-1" @click="verifyCandidate(false)">Unverify</button>
    <button class="btn btn-xs btn-secondary mx-1" @click="approveCandidate(true)">Approve</button>
    <button class="btn btn-xs btn-default mx-1" @click="approveCandidate(false)">Disapprove</button>
    <button class="btn btn-xs btn-primary mx-1" @click="completeReview()">Complete Review</button>
    <button class="btn btn-xs btn-primary mx-1" @click="notifyFeedbackWaiting()">Feedback Awaits!</button>
  </div>
  <div class="flex flex-col">
    <select class="select select-bordered w-full max-w-xs mb-4" v-model="reason">
      <option disabled selected>Reason</option>
      <option>Verify: Bad Profile</option>
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
  <div id="notifications" class="mt-4" v-if="developer">
    <Events :userId="developer?.user_id" :lastUpdate="lastUpdate" :key="lastUpdate.format('x')" />
  </div>
</template>

<script setup lang="ts">
  import { onBeforeMount, ref } from 'vue'
  import moment from 'moment'
  import Snippet from '@/components/Snippet.vue'
  import useCandidate from '@/composables/useCandidate'
  import { useRoute } from 'vue-router'
  import { Candidate } from '@/types'
  import { useToast } from 'vue-toastification'
  import useEvents from '@/composables/useEvent'
  import Events from '@/components/Events.vue'
  import axios from 'axios'

  const { addEvent } = useEvents()
  const toast = useToast()
  const route = useRoute()
  const { loadCandidateProfile, saveCandidate } = useCandidate()
  const developer = ref<Candidate | null>(null)
  const reason = ref('')
  const explanation = ref('')
  let lastUpdate = ref(moment())

  onBeforeMount(async () => {
    let loadedProfile = await loadCandidateProfile(Number.parseInt(route.params.id as string))
    if (loadedProfile instanceof Error) return false
    developer.value = loadedProfile
  })

  const verifyCandidate = async (verify = true) => {
    const initVal = developer.value!.verified
    try {
      developer.value!.verified = verify
      await saveCandidate(developer.value!, false)

      let toastMsg = verify ? 'Profile verified' : 'Verification removed'
      toast.success(toastMsg)

      let descr = verify ? 'Profile verified' : reason.value
      let note = verify ? 'Verified' : 'Verification declined: ' + explanation.value
      await addEvent(verify ? 'CANDIDATE.VERIFIED' : 'CANDIDATE:UNVERIFIED', descr, note, developer.value!.user_id)

      if (verify) {
        sendVerificationEmail().catch(() => {
          developer.value!.verified = initVal
          toast.error('Verification failure')
        })
      }

      lastUpdate.value = moment()
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
      let toastMsg = approve ? 'Profile approved' : 'Approval removed'
      toast.success(toastMsg)
      let descr = approve ? 'Profile approved' : reason.value
      let note = approve ? 'Approved' : 'Approval declined: ' + explanation.value
      await addEvent(approve ? 'CANDIDATE.APPROVED' : 'CANDIDATE:DISAPPROVED', descr, note, developer.value!.user_id)

      if (approve) {
        sendApprovalEmail().catch(() => {
          developer.value!.approved = initVal
          toast.error('Approval failure')
        })
      }

      lastUpdate.value = moment()
    } catch (err) {
      developer.value!.approved = initVal
      toast.error('Permission denied')
    }
  }

  const completeReview = async () => {
    let newDev = await saveCandidate(developer.value!, developer.value!.verify_req === null ? true : false)
    if (newDev instanceof Error) return false
    developer.value!.verify_req = newDev.verify_req
    lastUpdate.value = moment()
    toast.success('Review complete')
  }

  const notifyFeedbackWaiting = async () => {
    toast.success('Feedback waiting - sent')
    axios
      .get('https://crushing.digital/.netlify/functions/email', {
        params: { email: developer.value?.email, template_id: 'd-224be0601d244b58b298bb27ae4d6c00' },
      })
      .then(function (response) {
        addEvent(
          'EMAIL.FEEDDBACK',
          'You have feedback',
          'Feedback email sent to ' + developer.value!.email,
          developer.value!.user_id
        )
      })
      .catch(function (error) {
        addEvent(
          'EMAIL.FEEDBACK',
          'Feedback Email - Failed',
          'Failed to send feedback email to ' + developer.value!.email,
          developer.value!.user_id
        )
      })
  }

  const sendVerificationEmail = async () => {
    axios
      .get('https://crushing.digital/.netlify/functions/email', {
        params: { email: developer.value?.email, template_id: 'd-0b60cc57ba334337bcc2f3ba579b0f5b' },
      })
      .then(function (response) {
        addEvent(
          'EMAIL.VERIFICATION',
          'Verification Email',
          'Verification email sent to ' + developer.value!.email,
          developer.value!.user_id
        )
      })
      .catch(function (error) {
        addEvent(
          'EMAIL.VERIFICATION',
          'Verification Email - Failed',
          'Failed to send verification email to ' + developer.value!.email,
          developer.value!.user_id
        )
      })
  }

  const sendApprovalEmail = async () => {
    axios
      .get('https://crushing.digital/.netlify/functions/email', {
        params: { email: developer.value?.email, template_id: 'd-82a72ed6af364bafac2740bd00f6eb59' },
      })
      .then(function (response) {
        addEvent(
          'EMAIL.APPROVAL',
          'Approval Email',
          'Approval email sent to ' + developer.value!.email,
          developer.value!.user_id
        )
      })
      .catch(function (error) {
        addEvent(
          'EMAIL.APPROVAL',
          'Approval Email - Failed',
          'Failed to send approval email to ' + developer.value!.email,
          developer.value!.user_id
        )
      })
  }
</script>

<style scoped></style>
