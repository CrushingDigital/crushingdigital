<template>
  <Snippet :dev="developer" />
  <span class="text-sm text-gray-400 ml-4"
    >Review requested:
    {{ developer_verification ? moment(developer_verification!.verify_req).fromNow() : 'Not requested' }}</span
  >
  <div class="py-4">
    <button class="btn btn-xs btn-secondary mx-1" @click="verify(true)">Verify</button>
    <button class="btn btn-xs btn-default mx-1" @click="verify(false)">Unverify</button>
    <button class="btn btn-xs btn-default mx-1" @click="addComment()">Comment</button>
    <button class="btn btn-xs btn-secondary mx-1" @click="approve(true)">Approve</button>
    <button class="btn btn-xs btn-default mx-1" @click="approve(false)">Disapprove</button>
    <button class="btn btn-xs btn-primary mx-1" @click="completeReview()">Complete Review</button>
    <button class="btn btn-xs btn-primary mx-1" @click="notifyFeedbackWaiting()">Feedback Awaits!</button>
  </div>
  <div class="py-4">
    <h3>LinkedIn</h3>
    <button
      class="btn btn-xs btn-default mx-1"
      @click="
        addComment(
          'LinkedIn: Your headline is vague. List the stack and tell recruiters and employers that they are in the right place!'
        )
      "
    >
      Vague Headline
    </button>
    <button
      class="btn btn-xs btn-default mx-1"
      @click="
        addComment(
          'LinkedIn: About section is not direct enough. Confirm what they read in the headline and tell them what you are looking for 👀'
        )
      "
    >
      Vague About
    </button>
    <button
      class="btn btn-xs btn-default mx-1"
      @click="
        addComment(
          'LinkedIn: Once recruiters and employers know you are right for the job, they want to know when you started using the tech, whether you\'re still using it and how frequently you have been using it. List the tech on each experience.'
        )
      "
    >
      Experience:Tech
    </button>
    <button
      class="btn btn-xs btn-default mx-1"
      @click="
        addComment(
          'LinkedIn: List the tech first (for scanning reasons) but then include 3-5 bullet points about your experience. What did you build? What did you learn? What was the business benefit?'
        )
      "
    >
      Experience:Bullets
    </button>
    <button
      class="btn btn-xs btn-default mx-1"
      @click="
        addComment(
          'LinkedIn: If you don\'t have experience or want too add more to it, consider documenting your journey. A short post (literally a paragraph) with screenshots, code snippets etc) to show what you\'re working on or learning is a powerful thing! 💪'
        )
      "
    >
      Document Journey
    </button>
    <h3 class="mt-4">GitHub</h3>
    <button
      class="btn btn-xs btn-default mx-1"
      @click="addComment('GitHub: Add a personal description and make it match your LinkedIn headline 🔗')"
    >
      Headline
    </button>
    <button
      class="btn btn-xs btn-default mx-1"
      @click="
        addComment(
          'GitHub: 📌 your best repos and make sure they are using the tech you want to be found for. Confirm that this is what you do! ☑️'
        )
      "
    >
      Pinned Repos
    </button>
    <button
      class="btn btn-xs btn-default mx-1"
      @click="
        addComment(
          'GitHub: When I view the repo list for accounts and I don\'t see the tech they say they do near the top of the list (most recent commits), I worry! Is this what they really want? A recruiter might interview someone else first 🤷'
        )
      "
    >
      Recent Repos
    </button>
    <button
      class="btn btn-xs btn-default mx-1"
      @click="
        addComment(
          'GitHub: Lots of shallow repos (few commits) is a classic sign of a junior or someone in tutorial hell. One, larger project (which could house all your tutorials 🤔) is a better sign.'
        )
      "
    >
      Tutorial Hell
    </button>
    <h3 class="mt-4">Profile</h3>
    <button
      class="btn btn-xs btn-default mx-1"
      @click="
        addComment(
          'Profile: No links? This is how you sell yourself here and they don\'t have to be links to new things. Blog posts, screenshots, code snippets or a prtfolio site? What have you got? Also, more links means a better rank on the platform! 🤫'
        )
      "
    >
      No Links
    </button>
    <button
      class="btn btn-xs btn-default mx-1"
      @click="
        addComment(
          'Profile: Have you got any more links? More links means a better ranking, remember. Your faviourite personal repo or a project perhaps?'
        )
      "
    >
      More Links
    </button>
  </div>
  <div class="flex flex-col">
    <select class="select select-bordered w-full max-w-xs mb-4 dark:bg-slate-600 dark:text-slate-300" v-model="reason">
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
      class="textarea textarea-bordered dark:bg-slate-600 dark:text-slate-300"
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
  import useAuthUser from '@/composables/useAuthUser'
  import { useRouter, useRoute } from 'vue-router'
  import { FilterCandidate, CandidateVerification, CandidateApproval } from '@/types'
  import { useToast } from 'vue-toastification'
  import useEvents from '@/composables/useEvent'
  import Events from '@/components/Events.vue'
  import axios from 'axios'

  const router = useRouter()
  const { isAdmin } = useAuthUser()
  const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT
  const { addEvent } = useEvents()
  const toast = useToast()
  const route = useRoute()
  const { loadCandidateProfile, verifyCandidate, approveCandidate, markReviewComplete } = useCandidate()
  const developer = ref<FilterCandidate | null>(null)
  const developer_verification = ref<CandidateVerification>({ candidate_id: null, verified: false, verify_req: null })
  const developer_approval = ref<CandidateApproval>({ candidate_id: null, approved: false })
  const reason = ref('')
  const explanation = ref('')
  let lastUpdate = ref(moment())

  onBeforeMount(async () => {
    if (!isAdmin()) router.push({ name: 'home' })
    let loadedProfile = await loadCandidateProfile(Number.parseInt(route.params.id as string))
    if (loadedProfile instanceof Error) return false

    developer.value = loadedProfile
    // if (developer.value.candidate_verification?.length) {
    //   developer_verification.value = developer.value.candidate_verification![0] as CandidateVerification
    // } else {
    //   developer_verification.value!.candidate_id = developer.value.id
    // }
    // if (developer.value.candidate_approval?.length)
    //   developer_approval.value = developer.value.candidate_approval![0] as CandidateApproval
    // else {
    //   developer_approval.value!.candidate_id = developer.value.id
    // }
  })

  const addComment = async (note: string = '') => {
    try {
      if (!note.length && !explanation.value.length) {
        toast.error('Empty message. Ignored')
      } else {
        note = 'ℹ️ ' + (note.length ? note : explanation.value)
        await addEvent('COMMENT', 'Comment Added', note, developer.value!.user_id)
        explanation.value = ''
        lastUpdate.value = moment()
      }
    } catch (err) {
      toast.error('Permission denied')
    }
  }

  const verify = async (verify = true) => {
    const initVal = developer.value!.verified
    try {
      await verifyCandidate(developer.value!.id, verify, moment().toISOString())

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

  const approve = async (approve = true) => {
    const initVal = !!developer.value?.approved
    try {
      developer_approval.value!.approved = approve
      await approveCandidate(developer.value!.id, approve)
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
    let newDevVerification = await markReviewComplete(developer.value!.id)
    if (newDevVerification instanceof Error) return false

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
