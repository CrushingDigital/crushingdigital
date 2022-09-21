import { Candidate, CandidateVerification } from '@/types'
import useSupabase from '@/composables/useSupabase'
import useAuthUser from '@/composables/useAuthUser'
import { ref, watch } from 'vue'

const candidate = ref<Candidate | null>(null)
const { supabase } = useSupabase()
const { isRecruiterLite, isRecruiterPro, isAdmin, user } = useAuthUser()

watch(user, async () => {
  let res = await isCandidate()

  return res
})

const isCandidate = async (): Promise<boolean> => {
  let loadedProfile

  if (!user.value) return false

  try {
    loadedProfile = await loadProfile(user.value?.id)
    candidate.value = loadedProfile as Candidate
    return true
  } catch (error) {
    return false
  }
}

const getCandidates = async (): Promise<Candidate[] | Error> => {
  let from = 'candidates_basic'
  if (isRecruiterLite() || isRecruiterPro()) {
    from = 'candidates_pro'
  } else if (isAdmin()) {
    from = 'candidates_admin'
  }

  let { data: candidates, error } = await supabase
    .from(from)
    .select(
      `*,
      candidate_skills(
        skills(*)
      )
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

const saveCandidate = async (candidate: Candidate, requestVerify: boolean = true): Promise<Candidate | Error> => {
  const verify_req = requestVerify ? new Date().toISOString().toLocaleString() : null
  const {
    display_name,
    gitsource,
    linkedin,
    rate,
    timezone,
    yoe,
    user_id,
    blurb,
    created_at,
    id,
    link_1,
    link_2,
    link_3,
    active,
    email,
    allow_emails,
    delete_me,
  } = candidate

  let { data, error } = await supabase.from('candidates').upsert([
    {
      display_name,
      gitsource,
      linkedin,
      rate,
      timezone,
      yoe,
      user_id,
      blurb,
      created_at,
      id,
      link_1,
      link_2,
      link_3,
      active,
      email,
      allow_emails,
      delete_me,
    },
  ])

  if (error) throw error

  return data?.pop()
}

const saveCandidateVerification = async (
  candidate_verification: CandidateVerification,
  requestVerify: boolean = true
): Promise<CandidateVerification | Error> => {
  const { candidate_id, verified, verify_req } = candidate_verification
  let { data, error } = await supabase.from('candidate_verification').upsert([
    {
      candidate_id,
      verified,
      verify_req,
    },
  ])

  if (error) throw error

  return data?.pop()
}

const loadProfile = async (user_id: string): Promise<Candidate | Error> => {
  let { data, error } = await supabase
    .from('candidates')
    .select(
      `
      *,
      candidate_skills(
        skills(*)
      ),
      candidate_verification(*)
    `
    )
    .eq('user_id', user_id)

  if (error) throw error

  if (Array.isArray(data) && !data.length) throw 'Candidate profile not found'
  return data?.pop() as Candidate
}

const loadCandidateProfile = async (id: number): Promise<Candidate | Error> => {
  let { data, error } = await supabase
    .from('candidates')
    .select(
      `
        *,
        candidate_skills(
          skills(*)
        ),
        candidate_verification(*)
      `
    )
    .eq('id', id)

  if (error) throw error

  return data?.pop()
}

export default function useCandidate() {
  return {
    getCandidates,
    saveCandidate,
    saveCandidateVerification,
    loadProfile,
    loadCandidateProfile,
    isCandidate,
    candidate,
  }
}
