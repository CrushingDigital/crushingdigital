import { Candidate } from '@/types'
import useSupabase from '@/composables/useSupabase'
import useAuthUser from '@/composables/useAuthUser'

const { supabase } = useSupabase()
const { user, memberships } = useAuthUser()

const getCandidates = async (): Promise<Candidate[] | Error> => {
  let from = 'candidates_basic'
  if (
    memberships.value.includes('recruiter_pro') ||
    memberships.value.includes('recruiter_lite') ||
    memberships.value.includes('admin')
  )
    from = 'candidates_pro'

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
  // .order('id', { ascending: false })

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
    approved,
    blurb,
    created_at,
    id,
    link_1,
    link_2,
    link_3,
    verified,
    active,
  } = candidate

  console.log(link_1, link_2, link_3)

  let { data, error } = await supabase.from('candidates').upsert([
    {
      display_name,
      gitsource,
      linkedin,
      rate,
      timezone,
      yoe,
      user_id,
      approved,
      blurb,
      created_at,
      id,
      link_1,
      link_2,
      link_3,
      verified,
      verify_req,
      active,
    },
  ])

  if (error) throw error

  return data?.pop()
}

const loadProfile = async (user_id: string): Promise<Candidate | Error> => {
  let { data, error } = await supabase
    .from('candidates_basic')
    .select(
      `
      *,
      candidate_skills(
        skills(*)
      )
    `
    )
    .eq('user_id', user_id)

  if (error) throw error

  if (Array.isArray(data) && !data.length) throw 'Candidate profile not found'
  return data?.pop()
}

const loadCandidateProfile = async (id: number): Promise<Candidate | Error> => {
  let { data, error } = await supabase
    .from('candidates_basic')
    .select(
      `
        *,
        candidate_skills(
          skills(*)
        )
      `
    )
    .eq('id', id)

  if (error) throw error

  return data?.pop()
}

export default function useCandidate() {
  return { getCandidates, saveCandidate, loadProfile, loadCandidateProfile }
}
