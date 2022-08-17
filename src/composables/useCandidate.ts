import { Candidate } from '@/types'
import useSupabase from '@/composables/useSupabase'
import useAuthUser from '@/composables/useAuthUser'

const { supabase } = useSupabase()
const { user, memberships } = useAuthUser()

const getCandidates = async (): Promise<Candidate[] | Error> => {
  let from = 'candidates_basic'
  if (memberships.value.includes('recruiter_pro') || memberships.value.includes('recruiter_lite')) {
    from = 'candidates_pro'
  } else if (memberships.value.includes('admin')) {
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
    approved,
    blurb,
    created_at,
    id,
    link_1,
    link_2,
    link_3,
    verified,
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
      email,
      allow_emails,
      delete_me,
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
    .from('candidates')
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
