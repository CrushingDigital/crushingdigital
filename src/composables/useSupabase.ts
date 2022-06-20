import { createClient } from '@supabase/supabase-js'
import { Candidate, CandidateValues, Skill } from '../types';
import useAuthUser from './useAuthUser';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)


supabase.auth.onAuthStateChange((event, session) => {
  const { user } = useAuthUser();
  user.value = session?.user || null;
});

const getCandidates = async (): Promise<Candidate[]> => {
  let { data: candidates, error } = await supabase
    .from('candidates')
    .select('*')
    .order('id', { ascending: false })

  if (error) throw error

  return candidates as Array<Candidate>;
}

const addCandidate = async (candidateId: Number|undefined, displayName: string, blurb: string, gitSource: string, linkedin: string, rate: number, timezone: number, yoe: number) => {
  const { user } = useAuthUser();

  let vals:CandidateValues = { id: candidateId, display_name: displayName, blurb, gitsource: gitSource, linkedin, rate, timezone, yoe, user_id: user.value?.id }
  if(!candidateId) delete vals.id

  let { data, error } = await supabase
    .from("candidates")
    .upsert([vals]);

  if(error) throw error;

  return data?.pop()
}  

const getSkills = async (): Promise<Skill[]> => {
  let { data: skills, error } = await supabase
    .from('skills')
    .select('*')
    .eq('active', true)
    .order('name', { ascending: true })

  if (error) throw error

  return skills as Array<Skill>;
}

const deleteSkillsForCandidate = async (candidateId: number) => {
  const { data, error } = await supabase
  .from('candidate_skills')
  .delete()
  .eq('candidate_id', candidateId)

  if(error) throw error

  return data;
}

const addSkillsForCandidate = async (candidateId: number, skillIds: number[]) => {  
  const delRes = await deleteSkillsForCandidate(candidateId)
  let insertSkills = skillIds.map(skill => {
    return { candidate_id: candidateId, skill_id: skill }
  });
  let { data, error } = await supabase
  .from("candidate_skills")
  .insert(insertSkills);

  if(error) throw error;

  return data;

}

const loadProfile = async () => {
  const { user } = useAuthUser();
  let { data, error } = await supabase
  .from("candidates")
  .select(`
    *,
    candidate_skills(skill_id)
  `)
  .eq('user_id', user.value?.id)

  if(error) throw error

  return data?.pop()

}

export default function useSupabase() {
    return { supabase, getCandidates, addCandidate, getSkills, addSkillsForCandidate, loadProfile };
}