import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useNotificationStore = defineStore('notification', () => {
  const lastCheck = ref<string | null>(null)

  const setLastCheck = () => {
    let when = new Date()
    lastCheck.value = when.toISOString()
    localStorage.setItem('checkedNotifications', when.toISOString())
  }

  const getLastCheck = computed(() => {
    let when = localStorage.getItem('checkedNotifications')
    if (!when) lastCheck.value = Date.now().toString()
    else lastCheck.value = when
  })

  return { lastCheck, setLastCheck, getLastCheck }
})
