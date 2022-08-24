import { Candidate, Skill, Job, SkillsLink } from '@/types'
import useSupabase from '@/composables/useSupabase'

const { supabase } = useSupabase()

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

const loadSkillsForCandidate = async (candidate: Candidate, skills: Skill[]) => {
  let { data, error } = await supabase
    .from('skills')
    .select(
      `
      *,
      candidate_skills(skill_id)
    `
    )
    .eq('candidate_id', candidate.id)

  if (error) throw error

  return data
}

const saveSkillsForCandidate = async (candidate: Candidate, skills: Skill[]) => {
  if (!candidate) throw 'Candidate profile required before saving skills'

  await deleteSkillsForCandidate(candidate.id!)
  let insertSkills = skills.map((skill) => {
    return { candidate_id: candidate.id, skill_id: skill.id }
  })
  let { data, error } = await supabase.from('candidate_skills').insert(insertSkills)

  if (error) throw error

  return data
}

const getSkillIds = (item: Candidate | Job) => {
  return item.skills_link!.map((skills: SkillsLink) => skills.skills?.id)
}

const unpackSkills = (candidate: Candidate) => {
  if (!candidate) throw 'Cannot unpack skills for undefined candidate'
  return candidate.skills_link!.map((cskills) => cskills.skills as Skill)
}

export default function useSkill() {
  return { getSkills, saveSkillsForCandidate, loadSkillsForCandidate, unpackSkills, getSkillIds }
}
