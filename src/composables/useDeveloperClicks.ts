import useSupabase from '@/composables/useSupabase'
import useAuthUser from '@/composables/useAuthUser'
import { ClickData } from '@/types'

const { user } = useAuthUser()
const { supabase } = useSupabase()

const addDeveloperClick = async (candidateId: number, linkType: string): Promise<ClickData[] | null> => {
  let clickData: ClickData = {
    candidate_id: candidateId,
    link_type: linkType,
  }

  if (user.value) clickData.who_clicked = user.value.id

  let { data, error } = await supabase.from('developer_clicks').insert([clickData])

  if (error) {
    throw error
  }

  if (data == null) throw Error('Failed to insert developer click')

  return data
}

export default function useDeveloperClicks() {
  return {
    addDeveloperClick,
  }
}
