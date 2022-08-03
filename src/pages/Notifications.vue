<template>
  <div id="notifications" class="mt-4" v-if="user?.id">
    <Events :userId="user?.id" />
  </div>
</template>

<script setup lang="ts">
  import useEvents from '@/composables/useEvent'
  import useAuthUser from '@/composables/useAuthUser'
  import { onBeforeMount } from 'vue'
  import Events from '@/components/Events.vue'

  const { user } = useAuthUser()
  const { events, getEvents } = useEvents()

  onBeforeMount(async () => {
    events.value = await getEvents()
  })
</script>

<style scoped></style>
