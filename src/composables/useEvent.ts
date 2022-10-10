import useSupabase from '@/composables/useSupabase'
import useAuthUser from '@/composables/useAuthUser'
import { CDEvent } from '@/types'
import { ref, watch } from 'vue'

const { user } = useAuthUser()
const { supabase } = useSupabase()
const events = ref<CDEvent[] | null>([])
const personalEvents = ref<CDEvent[] | null>([])
let loadingEvents = ref<boolean>(false)

watch(user, () => {
  if (user.value) getEventsForUser(user.value.id)
})

const addEvent = async (eventType: string, eventDescr: string, note: string | null, user_id: string) => {
  let { data, error } = await supabase.from('events').insert([
    {
      author_id: user.value!.id,
      type: eventType,
      descr: eventDescr,
      note,
      user_id,
    },
  ])

  if (error) {
    throw error
  }

  return data
}

const getEvents = async (): Promise<CDEvent[]> => {
  let { data, error } = await supabase.from('events').select('*').order('created_at', { ascending: false })

  if (error) throw error

  events.value = data
  return data as Array<CDEvent>
}

const getEventsForUser = async (user_id: string): Promise<CDEvent[]> => {
  if (loadingEvents.value) return []

  console.log(user_id)
  if (user_id == undefined) {
    personalEvents.value = []
    return personalEvents.value
  }

  loadingEvents.value = true

  let { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('user_id', user_id)
    .order('created_at', { ascending: false })

  if (error) throw error

  loadingEvents.value = false
  personalEvents.value = data
  return data as Array<CDEvent>
}

export default function useEvents() {
  return { addEvent, getEvents, getEventsForUser, events, personalEvents, loadingEvents }
}
