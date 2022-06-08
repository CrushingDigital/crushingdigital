<template>
  <div>
    <ul class="mt-8">
      <li v-for="dev in candidates">
        <div class="grid grid-cols-12 mb-4">
          <div class="flex flex-col justify-center invisible sm:visible">
            <span class="material-symbols-outlined text-5xl">
              account_circle
            </span>
          </div>
          <div class="col-span-8 flex flex-col justify-between">
            <div class="flex flex-col sm:flex-row justify-between">
              <div>
                <span class="text-sm sm:text-base">{{ dev.name }}</span>
              </div>
              <div class="flex flex-row justify-start">
                <span class="material-symbols-outlined"> hourglass_bottom </span
                ><span class="mr-2 text-xs">{{ dev.yoe }}yrs</span>
                <span class="material-symbols-outlined"> paid </span
                ><span class="mr-2 text-xs">{{ dev.rate / 1000 }}k</span>
                <span class="material-symbols-outlined"> public </span
                ><span class="mr-2 text-xs">{{ dev.utc }}</span>
              </div>
            </div>
            <div class="text-sm">
              {{ dev.blurb }}
            </div>
          </div>
          <div
            class="col-span-3 border-0 flex flex-col sm:flex-row justify-start sm:justify-end align-middle"
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
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
const candidates = ref([
  {
    name: "Kent D. Cods",
    blurb:
      "Consequat dolor reprehenderit mollit tempor commodo incididunt laboris velit officia ea eu ea.",
    links: [
      "https://sarahdrasnerdesign.com/",
      "https://twitter.com/sarah_edo",
      "https://codepen.io/sdras/",
    ],
    yoe: 15,
    utc: -5,
    rate: 8000,
    skills: ["React", "Javascript", "Typescript"],
  },
  {
    name: "Robert Davids",
    blurb:
      "Sunt qui dolore ea velit proident enim enim labore aliqua est occaecat officia esse.",
    links: [
      "https://crushing.digital",
      "https://www.linkedin.com/in/davidproberts/",
      "https://www.tiktok.com/@crushingdigital",
    ],
    yoe: 5,
    utc: 0,
    rate: 7500,
    skills: ["PHP", "Vue", "Node"],
  },
  {
    name: "Evan Notyou",
    blurb:
      "Eu voluptate veniam sint quis magna cillum nulla pariatur aute minim ullamco culpa velit quis.",
    links: [
      "https://vuejs.org/",
      "https://www.linkedin.com/in/davidproberts/",
      "https://www.tiktok.com/@crushingdigital",
    ],
    yoe: 12,
    utc: -7,
    rate: 15000,
    skills: ["Vue", "Javascript", "Typescript"],
  },
  {
    name: "Alan Lumen",
    blurb: "Ad incididunt occaecat Lorem officia ea.",
    links: [
      "https://google.co.uk",
      "https://dailytao.org/",
      "https://www.amazon.co.uk/Way-Zen-Alan-W-Watts/",
    ],
    yoe: 22,
    utc: -7,
    rate: 12500,
    skills: ["Go", "Angular", "AWS"],
  },
]);
</script>

<style lang="css" scoped>
.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 48;
}
</style>
