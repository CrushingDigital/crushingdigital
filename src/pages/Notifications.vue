<template>
  <div id="notifications" class="mt-4" v-if="user?.id">
    <Events :userId="user?.id" />
  </div>
</template>

<script setup lang="ts">
  import useAuthUser from '@/composables/useAuthUser'
  import Events from '@/components/Events.vue'

  const { user } = useAuthUser()
</script>

<style scoped></style>
