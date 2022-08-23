<template>
  <div id="sharing" class="sm:mt-4 flex flex-col sm:flex-row justify-start sm:justify-center items-center">
    <span class="mr-2 threeLink text-center sm:text-left"
      >We could really use your help. Tell someone about us &raquo</span
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
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const socials = ref([
    { network: 'linkedin', name: 'LinkedIn', icon: 'fab fah fa-lg fa-linkedin', color: '#007bb5' },
    { network: 'twitter', name: 'Twitter', icon: 'fab fah fa-lg fa-twitter', color: '#1da1f2' },
    { network: 'whatsapp', name: 'Whatsapp', icon: 'fab fah fa-lg fa-whatsapp', color: '#25d366' },
  ])

  const sharing = ref({
    url: 'https://crushing.digital',
    title: "I'm getting my developer profile verified for FREE. You should too!",
    description: 'Become a verified or approved developer. Get the job you deserve!',
    hashtags: 'coding,programming,jobs',
    twitterUser: 'crushingdigital',
  })
</script>

<style scoped></style>
