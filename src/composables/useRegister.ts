import useSupabase from '@/composables/useSupabase'
import useAuthUser from '@/composables/useAuthUser'
import { addDays } from 'date-fns'

const { supabase } = useSupabase()
const { getUserMemberships } = useAuthUser()
const RECRUITER_PRO = 2
const RECRUITER_LITE = 4

const getExpiryDate = () => {
  return addDays(new Date(), 30)
}

const registerLite = async (userId: string): Promise<number> => {
  const expiry = getExpiryDate()

  let { error } = await supabase.from('memberships').upsert([
    {
      user_id: userId,
      role_id: RECRUITER_LITE,
      expiry,
    },
  ])

  if (error) throw error

  return getUserMemberships()
}

const registerPro = async (userId: string): Promise<number> => {
  const expiry = getExpiryDate()

  let { error } = await supabase.from('memberships').upsert([
    {
      user_id: userId,
      role_id: RECRUITER_PRO,
      expiry,
    },
  ])

  if (error) throw error

  return getUserMemberships()
}

export default function useRegister() {
  return { registerLite, registerPro }
}
