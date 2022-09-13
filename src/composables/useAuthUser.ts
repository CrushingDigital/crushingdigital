import { Provider, User } from '@supabase/supabase-js'
import useSupabase from '@/composables/useSupabase'
import { ref, watch } from 'vue'

const { supabase, currentSession } = useSupabase()
const user = ref<User | null>(null)
const memberships = ref<string[]>([])

watch(currentSession, async () => {
  user.value = currentSession.value?.user || null
  getUserMemberships()
})

const login = async (provider: Provider) => {
  const redirectUrl = import.meta.env.VITE_AUTH_REDIRECT_URL
  const { error } = await supabase.auth.signIn({ provider }, redirectUrl ? { redirectTo: redirectUrl } : undefined)
  if (error) throw error
}

const logout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

const isLoggedIn = (): boolean => {
  return !!user.value
}

const getUserMemberships = async (): Promise<number> => {
  if (!user.value) {
    memberships.value = []
    return 0
  }
  const { data, error } = await supabase.from('memberships').select('*, roles(name)').match({ user_id: user.value!.id })
  if (error) throw error

  memberships.value = data.map((mship) => mship.roles.name)
  return memberships.value.length
}

export default function useAuthUser() {
  return {
    user,
    memberships,
    login,
    logout,
    isLoggedIn,
    getUserMemberships,
  }
}
