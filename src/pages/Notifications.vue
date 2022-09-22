<template>
  <div
    id="sharing"
    class="sm:mt-4 flex flex-col sm:flex-row justify-start sm:justify-center items-center"
    v-if="(candidate.candidate_approval?.length && candidate.candidate_approval![0].approved) || 
        (candidate.candidate_verification?.length && candidate.candidate_verification![0].verified)"
  >
    <span
      class="mr-2 threeLink text-center sm:text-left"
      v-if="(candidate.candidate_approval?.length && candidate.candidate_approval![0].approved)"
      >{{ sharing.approvedMessage }}</span
    >
    <span
      class="mr-2 threeLink text-center sm:text-left"
      v-else-if="(candidate.candidate_verification?.length && candidate.candidate_verification![0].verified)"
      >{{ sharing.verifiedMessage }}</span
    >
    <div class="flex flex-row sm:justify-start justify-center">
      <ShareNetwork
        class="mx-1"
        v-for="social in socials"
        :network="social.network"
        :key="social.network"
        :style="{ backgroundColor: social.color }"
        :url="sharing.url"
        :title="sharing.title"
        :description="sharing.description"
        :hashtags="sharing.hashtags"
        :twitterUser="sharing.twitterUser"
      >
        <i :class="social.icon"></i>
      </ShareNetwork>
    </div>
  </div>

  <div id="notifications" class="mt-4" v-if="user?.id">
    <Events :userId="currentUserId()" />
  </div>
</template>

<script setup lang="ts">
  import useAuthUser from '@/composables/useAuthUser'
  import Events from '@/components/Events.vue'
  import { onBeforeMount, ref } from 'vue'
  import useCandidate from '@/composables/useCandidate'
  import { Candidate } from '@/types'

  const { loadProfile } = useCandidate()
  const { user, currentUserId } = useAuthUser()
  const candidate = ref<Candidate>({ user_id: user.value?.id, email: user.value?.email } as Candidate)

  const sharing = ref({
    url: 'https://crushing.digital',
    title: "I'm getting my developer profile verified for FREE. You should too!",
    description: 'Become a verified or approved developer. Get the job you deserve!',
    hashtags: 'coding,programming,jobs',
    twitterUser: 'crushingdigital',
    verifiedMessage: "Yay! You're now verified. That's gotta be worth announcing?",
    approvedMessage: "Boom! You're approved. Why not tell everyone the good news?",
  })

  const socials = ref([
    { network: 'linkedin', name: 'LinkedIn', icon: 'fab fah fa-lg fa-linkedin', color: '#007bb5' },
    { network: 'twitter', name: 'Twitter', icon: 'fab fah fa-lg fa-twitter', color: '#1da1f2' },
    { network: 'whatsapp', name: 'Whatsapp', icon: 'fab fah fa-lg fa-whatsapp', color: '#25d366' },
  ])

  onBeforeMount(async () => {
    let loadedProfile

    try {
      loadedProfile = await loadProfile(user.value!.id)

      if (loadedProfile) {
        candidate.value = loadedProfile as Candidate

        if (candidate.value.candidate_approval?.length && candidate.value.candidate_approval![0].approved) {
          sharing.value.title =
            "Proud to announce that I am now an Approved developer. You should get approved too. It's FREE!"
        } else if (
          candidate.value.candidate_verification?.length &&
          candidate.value.candidate_verification![0].verified
        ) {
          sharing.value.title =
            "Proud to announce that I am now a Verified developer. You should get verified too. It's FREE!"
        }
      }
    } catch (error) {
      console.error(error)
    }
  })
</script>

<style scoped></style>
