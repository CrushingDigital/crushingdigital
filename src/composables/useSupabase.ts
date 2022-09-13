import { AuthChangeEvent, createClient, Session } from '@supabase/supabase-js'
import { ref } from 'vue'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const lastEvent = ref<AuthChangeEvent | null>(null)
const currentSession = ref<Session | null>(null)

supabase.auth.onAuthStateChange(async (event, session) => {
  lastEvent.value = event
  currentSession.value = session
})

export default function useSupabase() {
  return { supabase, lastEvent, currentSession }
}
