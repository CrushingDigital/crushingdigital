<template>
  <div v-if="candidates.length">
    <ul class="mt-8">
      <li v-for="dev in candidates">
        <div class="grid grid-cols-12 mb-4">
          <div class="flex flex-col justify-center invisible sm:visible">
            <span class="material-symbols-outlined text-5xl">
              account_circle
            </span>
          </div>
          <div class="col-span-8 flex flex-col justify-evenly">
            <div class="flex flex-col sm:flex-row justify-between">
              <div class="flex flex-row align-start">
                <span class="text-sm sm:text-base"
                  >{{ dev.firstname }} {{ dev.lastname }}</span
                >
                <span
                  v-if="dev.verified"
                  class="material-symbols-outlined text-green-500 text-sm"
                  >priority</span
                >
                <span
                  v-if="dev.approved"
                  class="material-symbols-outlined text-yellow-400 text-sm"
                  >star</span
                >
              </div>
              <div
                class="flex flex-row justify-start sm:justify-end py-2 sm:py-0"
              >
                <span class="material-symbols-outlined text-slate-700">
                  hourglass_bottom </span
                ><span class="mr-2 text-xs text-slate-700"
                  >{{ dev.yoe }}yrs</span
                >
                <span class="material-symbols-outlined text-yellow-700">
                  paid </span
                ><span class="mr-2 text-xs text-yellow-700"
                  >{{ dev.rate / 1000 }}k</span
                >
                <span class="material-symbols-outlined text-blue-600">
                  public </span
                ><span class="mr-2 text-xs text-blue-600">{{
                  dev.timezone
                }}</span>
              </div>
            </div>
            <div class="text-sm">
              {{ dev.blurb }}
            </div>
            <div class="col-start-2">
              <span
                v-for="skill in dev.skills"
                class="px-2 py-1 text-xs rounded-full mr-1"
                :class="skill"
              >
                {{ skill }}
              </span>
            </div>
          </div>
          <div
            class="col-span-3 border-0 flex flex-col sm:flex-row justify-center sm:justify-end align-middle"
          >
            <div class="material-symbols-outlined text-5xl text-center">
              crop_square
            </div>
            <div class="material-symbols-outlined text-5xl text-center">
              crop_square
            </div>
            <div class="material-symbols-outlined text-5xl text-center">
              crop_square
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div class="text-center" v-else>
    <h3>Fetching the talent...</h3>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getCandidates } from "../firebase";

const candidates = ref([]);
onMounted(async () => {
  candidates.value = await getCandidates();
});
</script>

<style lang="css" scoped>
.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 48;
}
</style>
