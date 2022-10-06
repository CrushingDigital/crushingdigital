<template>
  <div>
    <input type="checkbox" id="tz-modal" class="modal-toggle" />
    <label for="tz-modal" class="modal cursor-pointer">
      <label class="modal-box relative dark:bg-slate-700" for="tz-modal">
        <h3 class="mb-4">Timezone (UTC)</h3>
        <form class="text-center flex flex-col justify-start">
          <label for="timezone-start" class="flower">From</label>
          <input
            type="range"
            min="-12"
            max="12"
            :value="startTz"
            @input="$emit('update:startTz', ($event.target as HTMLInputElement).value)"
            class="range range-primary dark:bg-slate-600"
            step="2"
            name="timezone-start"
            id="timezone-start"
          />
          <div class="w-full flex justify-between text-xxs px-2 mb-2">
            <span v-for="zone in timezones">{{ zone }}</span>
          </div>
          <label for="timezone-end" class="flower">To</label>
          <input
            type="range"
            min="-12"
            max="12"
            :value="endTz"
            @input="$emit('update:endTz', ($event.target as HTMLInputElement).value)"
            class="range range-secondary dark:bg-slate-600"
            step="2"
            name="timezone-end"
            id="timezone-end"
          />
          <div class="w-full flex justify-between text-xxs px-2">
            <span v-for="zone in timezones">{{ zone }}</span>
          </div>
        </form>
      </label>
    </label>

    <input type="checkbox" id="exp-modal" class="modal-toggle" />
    <label for="exp-modal" class="modal cursor-pointer">
      <label class="modal-box relative dark:bg-slate-700" for="exp-modal">
        <h3 class="mb-4">Experience filter</h3>
        <form class="text-center">
          <input
            type="range"
            min="0"
            max="10"
            :value="reqExp"
            @input="$emit('update:reqExp', ($event.target as HTMLInputElement).value)"
            class="range range-secondary dark:bg-slate-600"
            step="1"
            name="req-experience"
            id="req-experience"
          />
          <div class="w-full flex justify-between text-xxs px-2">
            <span v-for="exp in experience">{{ exp }}</span>
          </div>
        </form>
      </label>
    </label>

    <input type="checkbox" id="rate-modal" class="modal-toggle" />
    <label for="rate-modal" class="modal cursor-pointer">
      <label class="modal-box relative dark:bg-slate-700" for="rate-modal">
        <h3 class="mb-4">Rate (per month in USD)</h3>
        <form class="text-center flex flex-col justify-start">
          <label for="timezone-start" class="flower">Lower</label>
          <input
            type="range"
            min="1000"
            max="24000"
            :value="lowRate"
            @input="$emit('update:lowRate', ($event.target as HTMLInputElement).value)"
            class="range range-primary dark:bg-slate-600"
            step="1000"
            name="low-rate"
            id="low-rate"
          />
          <div class="w-full flex justify-between text-xxs px-2 mb-2">
            <span v-for="rate in rates">{{ rate }}</span>
          </div>
          <label for="timezone-end" class="flower">Upper</label>
          <input
            type="range"
            min="2000"
            max="24000"
            :value="highRate"
            @input="$emit('update:highRate', ($event.target as HTMLInputElement).value)"
            class="range range-secondary dark:bg-slate-600"
            step="1000"
            name="high-rate"
            id="high-rate"
          />
          <div class="w-full flex justify-between text-xxs px-2">
            <span v-for="rate in rates">{{ rate }}</span>
          </div>
        </form>
      </label>
    </label>

    <input type="checkbox" id="skills-modal" class="modal-toggle" />
    <label for="skills-modal" class="modal cursor-pointer">
      <label class="modal-box relative dark:bg-slate-700" for="skills-modal">
        <h3 class="mb-4">Skills Filters</h3>
        <div class="flex flex-row justify-center my-4 flex-wrap mx-auto">
          <span
            v-for="skill in skills"
            @click.prevent="$emit('skill-toggle', skill)"
            class="p-2 rounded-full text-sm border-2 m-4 cursor-pointer"
            :class="filterSkills.findIndex((item: Skill) => item.id == skill.id) == -1 ? 'disabledSkill' : skill.name.replace(/ /g, '')"
          >
            {{ skill.name }}
          </span>
        </div>
      </label>
    </label>
  </div>
</template>

<script setup lang="ts">
  import { Skill } from '@/types'
  import { ref } from 'vue'

  defineProps(['startTz', 'endTz', 'lowRate', 'highRate', 'reqExp', 'skills', 'filterSkills'])

  const timezones = ref(['-12', '|', '|', '|', '|', '|', '0', '|', '|', '|', '|', '|', '12'])
  const experience = ref([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '10+'])
  const rates = ref([
    '1k',
    '|',
    '|',
    '|',
    '5k',
    '|',
    '|',
    '|',
    '|',
    '10k',
    '|',
    '|',
    '|',
    '|',
    '15k',
    '|',
    '|',
    '|',
    '|',
    '20k',
    '|',
    '|',
    '|',
    '24k',
  ])
</script>

<style scoped></style>
