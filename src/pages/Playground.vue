<template>
  <div class="h-full w-full flex flex-col justify-center items-center">
    <!-- <button class="btn btn-primary" @click="getCandidates()">Click Me</button> -->
    <i class="fa-solid fa-star text-[300px] my-20 text-yellow-400"></i>
    <i class="fa-solid fa-clipboard-check text-[300px] my-20 text-green-500"></i>
    <i class="fa-solid fa-fire-flame-curved text-[300px] my-20 text-secondary"></i>
    <i class="fa-solid fa-bug text-[300px] my-20 text-red-700"></i>
  </div>
</template>

<script setup lang="ts">
  import { Candidate } from '@/types'
  import useSupabase from '@/composables/useSupabase'

  const { supabase } = useSupabase()

  const getCandidates = async (): Promise<Candidate[] | Error> => {
    let { data: candidates, error } = await supabase
      .from('candidates')
      .select(
        `*,
      candidate_skills(
        skills(*)
      ),
      candidate_verification(*)
    `
      )
      .order('approved', { ascending: false })
      .order('verified', { ascending: false })
      .order('link_3')
      .order('link_2')
      .order('link_1')

    if (error) throw error

    return candidates as Array<Candidate>
  }
</script>

<style scoped></style>
