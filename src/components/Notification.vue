<template>
  <router-link to="/notifications" v-if="hasNewNotifications">
    <i class="fa-solid fa-bell"></i>
  </router-link>
  <router-link to="/notifications" v-else>
    <i class="fa-regular fa-bell text-slate-200"></i>
  </router-link>
</template>

<script setup lang="ts">
  import useAuthUser from '@/composables/useAuthUser'
  import { computed, onBeforeMount } from 'vue'
  import useEvents from '@/composables/useEvent'
  import { CDEvent } from '@/types'
  import { useNotificationStore } from '@/stores/useNotificationStore'
  import { storeToRefs } from 'pinia'

  const storeNotifications = useNotificationStore()
  const { lastCheck } = storeToRefs(storeNotifications)
  const { personalEvents, loadingEvents, getEventsForUser } = useEvents()
  const { user } = useAuthUser()

  onBeforeMount(() => {
    storeNotifications.getLastCheck
    if (user.value) {
      getEventsForUser(user.value.id)
    }
  })

  const newNotifications = (notification: CDEvent) => {
    if (!notification.created_at) return false
    else {
      return new Date(notification!.created_at) > new Date(lastCheck.value!)
    }
  }

  const hasNewNotifications = computed(() => {
    if (!user.value || !personalEvents.value || loadingEvents.value) return false

    let hasNew = !!personalEvents.value?.filter(newNotifications).length

    return hasNew
  })
</script>

<style scoped></style>
