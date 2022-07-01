import { Candidate } from '@/types'
import useSupabase from '@/composables/useSupabase'
import useAuthUser from './useAuthUser'

const { supabase } = useSupabase()
const { user, memberships } = useAuthUser()

const getCandidates = async (): Promise<Candidate[]> => {
  let from = 'candidates_limited'
  console.log(memberships.value)
  if (memberships.value.includes('recruiter_pro') || memberships.value.includes('admin')) from = 'candidates'

  console.log(from)
  let { data: candidates, error } = await supabase
    .from(from)
    .select(
      `*,
      candidate_skills(
        skills(*)
      )
    `
    )
    .order('id', { ascending: false })

  if (error) throw error

  return candidates as Array<Candidate>
}

const saveCandidate = async (candidate: Candidate) => {
  const verify_req = new Date().toISOString().toLocaleString()
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
    },
  ])

  if (error) throw error

  return data?.pop()
}

const loadProfile = async (user_id: string) => {
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

  return data?.pop()
}

export default function useCandidate() {
  return { getCandidates, saveCandidate, loadProfile }
}
