import { Provider } from '@supabase/supabase-js'
import useSupabase from '@/composables/useSupabase'
import moment from 'moment'
import { ref } from 'vue'
import { User } from '@supabase/supabase-js'
const user = ref<User | null>(null)
const memberships = ref<string[]>([])
const RECRUITER_PRO = 2
const RECRUITER_LITE = 4

export default function useAuthUser() {
  const { supabase } = useSupabase()

  const login = async (provider: Provider) => {
    const redirectUrl = import.meta.env.VITE_AUTH_REDIRECT_URL
    const { error } = await supabase.auth.signIn({ provider }, redirectUrl ? { redirectTo: redirectUrl } : undefined)
    if (error) throw error
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error

    getUserMemberships()
  }

  const isLoggedIn = (): boolean => {
    return !!user.value
  }

  const getUserMemberships = async (): Promise<number> => {
    if (!user.value) {
      memberships.value = []
      return 0
    }
    const { data, error } = await supabase
      .from('memberships')
      .select('*, roles(name)')
      .match({ user_id: user.value!.id })
    if (error) throw error

    memberships.value = data.map((mship) => mship.roles.name)
    return memberships.value.length
  }

  const registerLite = async () => {
    if (!user.value) throw Error('Unable to register (lite) at this time')

    const expiry = moment().add(30, 'days')

    let { data, error } = await supabase.from('memberships').upsert([
      {
        user_id: user!.value.id,
        role_id: RECRUITER_LITE,
        expiry,
      },
    ])

    if (error) throw error

    return data
  }

  const registerPro = async () => {
    if (!user.value) throw Error('Unable to register (pro) at this time')

    const expiry = moment().add(30, 'days')

    let { data, error } = await supabase.from('memberships').upsert([
      {
        user_id: user!.value.id,
        role_id: RECRUITER_PRO,
        expiry,
      },
    ])

    if (error) throw error

    console.log('returning', data)
    return data
  }

  return {
    user,
    memberships,
    login,
    logout,
    isLoggedIn,
    getUserMemberships,
    registerLite,
    registerPro,
  }
}
