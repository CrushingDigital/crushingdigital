<template>
  <div class="flex justify-start flex-col sm:flex-row items-start sm:items-center my-2">
    <div>
      <span class="mr-2 flower">Filters:</span>
      <label for="tz-modal" class="modal-button my-auto cursor-pointer mr-2">
        <i class="fa-solid fa-earth-americas" title="Timezone"></i>
      </label>
      <label for="skills-modal" class="modal-button my-auto cursor-pointer mr-2">
        <i class="fa-solid fa-tags" title="Skills"></i>
      </label>
      <label for="rate-modal" class="modal-button my-auto cursor-pointer mr-2">
        <i class="fa-solid fa-sack-dollar" title="Rate"></i>
      </label>
      <label for="exp-modal" class="modal-button my-auto cursor-pointer mr-2">
        <i class="fa-solid fa-graduation-cap" title="Experience"></i>
      </label>
      <label
        title="Approved"
        class="modal-button my-auto cursor-pointer mr-2"
        @click="$emit('update:approved', !approved)"
        :class="approved ? 'text-yellow-400' : 'text-gray-300'"
      >
        <i class="fa-solid fa-star"></i>
      </label>
      <label
        title="Verified"
        class="modal-button my-auto cursor-pointer mr-2"
        @click="$emit('update:verified', !verified)"
        :class="verified ? 'text-green-500' : 'text-gray-300'"
      >
        <i class="fa-solid fa-clipboard-check"></i>
      </label>
      <label
        title="Review"
        class="modal-button my-auto cursor-pointer mr-2"
        @click="$emit('update:verify_req', !verify_req)"
        :class="verify_req ? 'text-blue-400' : 'text-gray-300'"
        v-if="isAdmin()"
      >
        <i class="fa-solid fa-eye"></i>
      </label>
      <label
        title="Active"
        class="modal-button my-auto cursor-pointer mr-2"
        @click="$emit('update:active', !active)"
        :class="active ? 'text-red-400' : 'text-gray-300'"
        v-if="isAdmin()"
      >
        <i class="fa-solid fa-person-running"></i>
      </label>
    </div>

    <input
      type="text"
      :value="searchText"
      @input="$emit('update:searchText', ($event.target as HTMLInputElement).value)"
      placeholder="Search by name..."
      class="input input-bordered w-72 sm:ml-4"
    />

    <span class="flower ml-2">#{{ noDevs }} {{ listItems }}</span>
  </div>
</template>

<script setup lang="ts">
  import useAuthUser from '@/composables/useAuthUser'

  defineProps(['active', 'approved', 'verified', 'verify_req', 'noDevs', 'searchText', 'listItems'])
  defineEmits(['update:searchText', 'update:active', 'update:verify_req', 'update:approved', 'update:verified'])

  const { isAdmin } = useAuthUser()
</script>

<style scoped></style>
