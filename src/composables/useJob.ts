import { Job } from '@/types'
import useSupabase from '@/composables/useSupabase'
import { subDays } from 'date-fns'
const JOB_EXPIRY_DAYS = 30

const { supabase } = useSupabase()

const getJobs = async (): Promise<Job[] | Error> => {
  let from = 'jobs'
  let thirtyDaysAgo = subDays(new Date(), JOB_EXPIRY_DAYS).toISOString()
  let { data: jobs, error } = await supabase
    .from(from)
    .select(
      `*,
      skills_link(
        skills(*)
      )
    `
    )
    .eq('active', true)
    .gte('created_at', thirtyDaysAgo)
    .order('approved', { ascending: false })
    .order('verified', { ascending: false })
    .order('link_3')
    .order('link_2')
    .order('link_1')

  if (error) throw error

  return jobs as Array<Job>
}

const loadJob = async (id: string): Promise<Job | Error> => {
  let { data, error } = await supabase
    .from('jobs')
    .select(
      `
        *,
        skills_link(
          skills(*)
        )
      `
    )
    .eq('id', id)

  if (error) throw error

  if (Array.isArray(data) && !data.length) throw 'Job not found'
  return data?.pop()
}

const saveJob = async (job: Job): Promise<Job | Error> => {
  const {
    company,
    title,
    website,
    jobspec,
    rate,
    timezone,
    yoe,
    user_id,
    approved,
    blurb,
    created_at,
    id,
    link_1,
    link_2,
    link_3,
    verified,
    active,
  } = job

  let { data, error } = await supabase.from('jobs').upsert([
    {
      company,
      title,
      website,
      jobspec,
      rate,
      timezone,
      yoe,
      user_id,
      approved,
      blurb,
      created_at,
      id,
      link_1,
      link_2,
      link_3,
      verified,
      active,
    },
  ])

  if (error) throw error

  return data?.pop()
}

export default function useJob() {
  return { getJobs, saveJob, loadJob }
}
