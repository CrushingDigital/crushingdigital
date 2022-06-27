import { Candidate } from '../types'
import useSupabase from './useSupabase'

const { supabase } = useSupabase()

const getCandidates = async (): Promise<Candidate[]> => {
  let { data: candidates, error } = await supabase
    .from('candidates')
    .select(`
      *,
      candidate_skills(
        skills(*)
      )
    `)
    .order('id', { ascending: false })

  if (error) throw error

  return candidates as Array<Candidate>;
}

const saveCandidate = async (candidate: Candidate) => {

  const { display_name, gitsource, linkedin, rate, timezone, yoe, user_id, approved, blurb, created_at, id, link_1, link_2, link_3, verified } = candidate
  let { data, error } = await supabase
    .from("candidates")
    .upsert([{ display_name, gitsource, linkedin, rate, timezone, yoe, user_id, approved, blurb, created_at, id, link_1, link_2, link_3, verified }]);

  if(error) throw error;

  return data?.pop()
}  

const loadProfile = async (user_id: string) => {
  let { data, error } = await supabase
  .from("candidates")
  .select(`
    *,
    candidate_skills(
      skills(*)
    )
  `)
  .eq('user_id', user_id)

  if(error) throw error

  return data?.pop()

}

export default function useCandidate() {
    return { getCandidates, saveCandidate, loadProfile };
}