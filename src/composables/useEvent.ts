import useSupabase from '@/composables/useSupabase'
import useAuthUser from '@/composables/useAuthUser'
import { CDEvent } from '@/types'
import { ref } from 'vue'

const { user } = useAuthUser()
const { supabase } = useSupabase()
const events = ref<CDEvent[] | null>([])
const personalEvents = ref<CDEvent[] | null>([])
let loadingEvents = ref<boolean>(false)

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

const getEventsForUser = async (user_id: string): Promise<CDEvent[]> => {
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

  if (user_id == user.value?.id) {
    personalEvents.value = data
  }

  events.value = data as Array<CDEvent>
  return data as Array<CDEvent>
}

export default function useEvents() {
  return { addEvent, getEventsForUser, events, personalEvents, loadingEvents }
}
