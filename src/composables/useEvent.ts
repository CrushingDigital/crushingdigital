import useSupabase from '@/composables/useSupabase'
import useAuthUser from '@/composables/useAuthUser'
import { CDEvent } from '@/types'
import { ref } from 'vue'

const { user } = useAuthUser()
const { supabase } = useSupabase()
const events = ref<CDEvent[] | null>([])

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

export default function useEvents() {
  return { addEvent, getEvents, events }
}
