<template>
  <Snippet :dev="developer" />
  <span class="text-sm text-gray-400 ml-4"
    >Review requested:
    {{ developer_verification ? moment(developer_verification!.verify_req).fromNow() : 'Not requested' }}</span
  >
  <div class="py-4">
    <button class="btn btn-xs btn-secondary mx-1" @click="verifyCandidate(true)">Verify</button>
    <button class="btn btn-xs btn-default mx-1" @click="verifyCandidate(false)">Unverify</button>
    <button class="btn btn-xs btn-default mx-1" @click="addComment()">Comment</button>
    <button class="btn btn-xs btn-secondary mx-1" @click="approveCandidate(true)">Approve</button>
    <button class="btn btn-xs btn-default mx-1" @click="approveCandidate(false)">Disapprove</button>
    <button class="btn btn-xs btn-primary mx-1" @click="completeReview()">Complete Review</button>
    <button class="btn btn-xs btn-primary mx-1" @click="notifyFeedbackWaiting()">Feedback Awaits!</button>
  </div>
  <div class="flex flex-col">
    <select class="select select-bordered w-full max-w-xs mb-4" v-model="reason">
      <option disabled selected>Reason</option>
      <option>General Comment</option>
      <option>Profile</option>
      <option>LinkedIn</option>
      <option>GitHub</option>
      <option>Link #1</option>
      <option>Link #2</option>
      <option>Link #3</option>
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
  import { Candidate, CandidateVerification, CandidateApproval } from '@/types'
  import { useToast } from 'vue-toastification'
  import useEvents from '@/composables/useEvent'
  import Events from '@/components/Events.vue'
  import axios from 'axios'

  const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT
  const { addEvent } = useEvents()
  const toast = useToast()
  const route = useRoute()
  const { loadCandidateProfile, saveCandidateVerification, saveCandidateApproval, isApproved, isVerified } =
    useCandidate()
  const developer = ref<Candidate>({} as Candidate)
  const developer_verification = ref<CandidateVerification>({ candidate_id: null, verified: false, verify_req: null })
  const developer_approval = ref<CandidateApproval>({ candidate_id: null, approved: false })
  const reason = ref('')
  const explanation = ref('')
  let lastUpdate = ref(moment())

  onBeforeMount(async () => {
    let loadedProfile = await loadCandidateProfile(Number.parseInt(route.params.id as string))
    if (loadedProfile instanceof Error) return false

    developer.value = loadedProfile
    if (developer.value.candidate_verification?.length) {
      developer_verification.value = developer.value.candidate_verification![0] as CandidateVerification
    } else {
      developer_verification.value!.candidate_id = developer.value.id
    }
    if (developer.value.candidate_approval?.length)
      developer_approval.value = developer.value.candidate_approval![0] as CandidateApproval
    else {
      developer_approval.value!.candidate_id = developer.value.id
    }
  })

  const addComment = async () => {
    try {
      let note = ''
      note = 'ℹ️ ' + explanation.value

      await addEvent('COMMENT', 'Comment Added', note, developer.value!.user_id)

      explanation.value = ''

      lastUpdate.value = moment()
    } catch (err) {
      toast.error('Permission denied')
    }
  }

  const verifyCandidate = async (verify = true) => {
    const initVal = isVerified(developer.value!)
    try {
      developer_verification.value!.verified = verify
      developer_verification.value!.candidate_id = developer.value!.id
      await saveCandidateVerification(developer_verification.value!, false)

      let toastMsg = verify ? 'Profile verified' : 'Verification removed'
      toast.success(toastMsg)

      let note = ''
      if (reason.value == 'General Comment') {
        note = 'ℹ️ ' + explanation.value
      } else {
        note = verify ? '👍 Profile verified' : '👎 ' + reason.value + ': ' + explanation.value
      }

      let descr = verify ? 'Profile verified' : reason.value
      await addEvent(verify ? 'CANDIDATE.VERIFIED' : 'CANDIDATE:UNVERIFIED', descr, note, developer.value!.user_id)

      if (verify) {
        sendVerificationEmail().catch(() => {
          developer_verification.value!.verified = initVal
          toast.error('Verification failure')
        })
      } else {
        explanation.value = ''
      }

      lastUpdate.value = moment()
    } catch (err) {
      toast.error('Permission denied')
    }
  }

  const approveCandidate = async (approve = true) => {
    const initVal = isApproved(developer.value!)
    try {
      developer_approval.value!.approved = approve
      await saveCandidateApproval(developer_approval.value!)
      let toastMsg = approve ? 'Profile approved' : 'Approval removed'
      toast.success(toastMsg)
      let descr = approve ? 'Profile approved' : reason.value
      let note = approve ? 'Approved' : 'Approval declined: ' + explanation.value
      await addEvent(approve ? 'CANDIDATE.APPROVED' : 'CANDIDATE:DISAPPROVED', descr, note, developer.value!.user_id)

      if (approve) {
        sendApprovalEmail().catch(() => {
          developer_approval.value!.approved = initVal
          toast.error('Approval failure')
        })
      } else {
        explanation.value = ''
      }

      lastUpdate.value = moment()
    } catch (err) {
      developer_approval.value!.approved = initVal
      toast.error('Permission denied')
    }
  }

  const completeReview = async () => {
    let newDevVerification = await saveCandidateVerification({ candidate_id: developer.value!.id, verify_req: null })
    if (newDevVerification instanceof Error) return false
    developer_verification.value!.verify_req = newDevVerification.verify_req
    lastUpdate.value = moment()
    toast.success('Review complete')
  }

  const notifyFeedbackWaiting = async () => {
    if (developer.value?.allow_emails) {
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
    } else {
      toast.success('Email skipped due to account preferences')
    }
  }

  const sendVerificationEmail = async () => {
    if (developer.value?.allow_emails && ENVIRONMENT == 'Prd') {
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
    } else {
      toast.success('Email skipped due to account preferences')
    }
  }

  const sendApprovalEmail = async () => {
    if (developer.value?.allow_emails && ENVIRONMENT == 'Prd') {
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
    } else {
      toast.success('Email skipped due to account preferences')
    }
  }
</script>

<style scoped></style>
