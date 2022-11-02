<template>
  <h3>Notifications</h3>
  <div>
    <ul class="p-4">
      <li v-for="event in publicEvents">
        <div class="grid gap-2 grid-cols-12 grid-rows-1 text-sm sm:text-base" v-if="event.type !== 'VIEWED'">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              :class="props.last_check < event.created_at! ? 'text-secondary' : ''"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          <span class="ml-4 col-span-8">{{ event.note }}</span>
          <span class="ml-2 text-xxs text-gray-400 col-span-3">{{ moment(event.created_at).fromNow() }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import useEvents from '@/composables/useEvent'
  import moment from 'moment'
  import { onBeforeMount, ref } from 'vue'
  import { CDEvent } from '@/types'

  const publicEvents = ref<CDEvent[]>([])
  const props = defineProps(['user_id', 'mark_as_viewed', 'last_check'])

  const { getEventsForUser } = useEvents()

  onBeforeMount(async () => {
    console.log('getting events', props.user_id)
    publicEvents.value = await getEventsForUser(props.user_id)
  })
</script>

<style scoped></style>
