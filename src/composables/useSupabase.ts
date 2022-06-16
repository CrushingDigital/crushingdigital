import { createClient } from '@supabase/supabase-js'
import { Candidate, Skill } from '../types';
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

  if (error) throw error

  return candidates as Array<Candidate>;
}

const addCandidate = async (displayName: string, blurb: string, gitSource: string, linkedin: string, rate: Number, timezone: Number, yoe: Number) => {
  const { user } = useAuthUser();
  const { data, error } = await supabase
    .from("candidates")
    .insert([{ display_name: displayName, blurb, gitsource: gitSource, linkedin, rate, timezone, yoe, user_id: user.value?.id }]);

  if(error) throw error;

  return data
}  

const getSkills = async (): Promise<Skill[]> => {
  let { data: skills, error } = await supabase
    .from('skills')
    .select('*')
    .eq('active', true)

  if (error) throw error

  return skills as Array<Skill>;
}

export default function useSupabase() {
    return { supabase, getCandidates, addCandidate, getSkills };
}