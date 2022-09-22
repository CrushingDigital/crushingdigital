import { Candidate, CandidateVerification, CandidateApproval } from '@/types'
import useSupabase from '@/composables/useSupabase'
import useAuthUser from '@/composables/useAuthUser'
import { ref } from 'vue'

const candidate = ref<Candidate | null>(null)
const { supabase } = useSupabase()
const { user } = useAuthUser()

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

const isVerified = (developer: Candidate) => {
  if (!developer.candidate_verification?.length) return false

  return developer.candidate_verification![0].verified
}

const isApproved = (developer: Candidate) => {
  if (!developer.candidate_approval?.length) return false

  return developer.candidate_approval![0].approved
}

const getCandidates = async (): Promise<Candidate[] | Error> => {
  let { data: candidates, error } = await supabase
    .from('candidates')
    .select(
      `*,
      candidate_skills(
        skills(*)
      ),
      candidate_verification(*),
      candidate_approval(*)
    `
    )
    .order('approved', { foreignTable: 'candidate_approval', ascending: false })
    .order('verified', { foreignTable: 'candidate_verification', ascending: false })
    .order('link_3')
    .order('link_2')
    .order('link_1')

  if (error) throw error

  return candidates as Array<Candidate>
}

const saveCandidate = async (candidate: Candidate, requestVerify: boolean = true): Promise<Candidate | Error> => {
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

const saveCandidateApproval = async (candidate_approval: CandidateApproval): Promise<CandidateApproval | Error> => {
  const { candidate_id, approved } = candidate_approval
  let { data, error } = await supabase.from('candidate_approval').upsert([
    {
      candidate_id,
      approved,
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
      candidate_verification(*),
      candidate_approval(*)
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
        candidate_verification(*),
        candidate_approval(*)
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
    saveCandidateApproval,
    loadProfile,
    loadCandidateProfile,
    isCandidate,
    candidate,
    isApproved,
    isVerified,
  }
}
