import { createClient } from '@supabase/supabase-js'
import { Candidate, Skill } from '@/types'
import useAuthUser from '@/composables/useAuthUser'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

supabase.auth.onAuthStateChange(async (event, session) => {
  const { user, getUserMemberships } = useAuthUser()
  user.value = session?.user || null

  getUserMemberships()
})

const getSkills = async (): Promise<Skill[]> => {
  let { data: skills, error } = await supabase
    .from('skills')
    .select('*')
    .eq('active', true)
    .order('name', { ascending: true })

  if (error) throw error

  return skills as Array<Skill>
}

const deleteSkillsForCandidate = async (candidateId: number) => {
  const { data, error } = await supabase.from('candidate_skills').delete().eq('candidate_id', candidateId)

  if (error) throw error

  return data
}

const addSkillsForCandidate = async (candidate: Candidate, skills: Skill[]) => {
  await deleteSkillsForCandidate(candidate.id!)
  let insertSkills = skills.map((skill) => {
    return { candidate_id: candidate.id, skill_id: skill.id }
  })
  let { data, error } = await supabase.from('candidate_skills').insert(insertSkills)

  if (error) throw error

  return data
}

export default function useSupabase() {
  return { supabase, getSkills, addSkillsForCandidate }
}
