import { Candidate, CandidateVerification, CandidateApproval, Filter, FilterCandidate, SearchFilter } from '@/types'
import useSupabase from '@/composables/useSupabase'
import useAuthUser from '@/composables/useAuthUser'
import { ref, watch } from 'vue'
const PAGESIZE = import.meta.env.VITE_DEV_PAGE_SIZE

const candidate = ref<Candidate | null>(null)
const { supabase } = useSupabase()
const { user } = useAuthUser()

watch(user, async () => {
  if (user.value) {
    try {
      let loadedProfile = await loadProfile(user.value!.id)
      candidate.value = loadedProfile as Candidate
    } catch (error) {
      //   console.error(error)
    }
  }

  return false
})

const isCandidate = (): boolean => {
  return !!candidate.value
}

const isVerified = (developer: Candidate | null) => {
  if (!developer) return false

  if (!developer.candidate_verification?.length) return false

  return developer.candidate_verification![0].verified
}

const isApproved = (developer: Candidate | null) => {
  if (!developer) return false

  if (!developer.candidate_approval?.length) return false

  return developer.candidate_approval![0].approved
}

const getFilteredCandidates = async (
  filters: Filter,
  page: number
): Promise<{ data: FilterCandidate[] | Error; count: number | null }> => {
  let {
    startTz,
    endTz,
    lowRate,
    highRate,
    reqExp,
    approved,
    verified,
    verify_req,
    incInactive,
    searchText,
    filterSkills,
    pageSize,
  } = filters

  let selectedSkills = filterSkills.value.map((skill) => skill.id)

  let params: SearchFilter = {
    end_tz: endTz.value,
    req_exp: reqExp.value,
    start_tz: startTz.value,
    low_rate: lowRate.value,
    high_rate: highRate.value,
    is_verified: false,
    is_approved: false,
    req_verify: false,
    inc_inactive: false,
    search_text: searchText.value,
    ids: [],
  }

  if (approved.value) params.is_approved = true
  if (verified.value) params.is_verified = true
  if (verify_req.value) params.req_verify = true
  if (incInactive.value) params.inc_inactive = true

  if (selectedSkills.length) {
    params.ids = selectedSkills
  }

  let query = supabase.rpc('skill_filtered_candidates', params)
  let { data, error } = await query
  let filteredCandidates: FilterCandidate[] = distillCandidateSkills(data as FilterCandidate[])

  let count = filteredCandidates.length

  let offset = page <= 1 ? 0 : (page - 1) * pageSize.value

  data = filteredCandidates.slice(offset, offset + PAGESIZE) as Candidate[]

  if (error) throw error

  return { data, count }
}

const distillCandidateSkills = (devs: FilterCandidate[]): FilterCandidate[] => {
  let filteredCandidates: FilterCandidate[] = []

  devs?.forEach((row: FilterCandidate) => {
    let found = filteredCandidates.find((elem) => elem.id == row.id)

    if (found === undefined) {
      found = row
      found.skills = []
      filteredCandidates.push(row)
    }

    if (row.skill_id)
      found.skills.push({
        id: row.skill_id,
        name: row.skill_name,
        created_at: row.skill_created_at,
        active: row.skill_active,
        alias: row.skill_alias,
      })
  })

  return filteredCandidates
}

const saveCandidate = async (candidate: Candidate, requestVerify: boolean = true): Promise<Candidate | Error> => {
  const {
    display_name,
    gitsource,
    linkedin,
    rate,
    timezone,
    yoe,
    user_id,
    blurb,
    created_at,
    id,
    link_1,
    link_2,
    link_3,
    active,
    email,
    allow_emails,
    delete_me,
  } = candidate

  let { data, error } = await supabase.from('candidates').upsert([
    {
      display_name,
      gitsource,
      linkedin,
      rate,
      timezone,
      yoe,
      user_id,
      blurb,
      created_at,
      id,
      link_1,
      link_2,
      link_3,
      active,
      email,
      allow_emails,
      delete_me,
    },
  ])

  if (error) throw error

  return data?.pop()
}

const markReviewComplete = async (candidate_id: number): Promise<CandidateVerification | Error> => {
  let { data, error } = await supabase.from('candidate_verification').upsert([
    {
      candidate_id,
      verify_req: null,
    },
  ])

  if (error) throw error

  return data?.pop()
}

const verifyCandidate = async (
  candidate_id: number,
  verify_req: string,
  verified: boolean | null = null
): Promise<CandidateVerification | Error> => {
  let verificationRecord: CandidateVerification = {
    candidate_id,
    verify_req,
  }
  if (verified != null) verificationRecord.verified = verified

  let { data, error } = await supabase.from('candidate_verification').upsert([verificationRecord])

  if (error) throw error

  return data?.pop()
}

const approveCandidate = async (candidate_id: number, approved: boolean): Promise<CandidateApproval | Error> => {
  let { data, error } = await supabase.from('candidate_approval').upsert([
    {
      candidate_id,
      approved,
    },
  ])

  if (error) throw error

  return data?.pop()
}

const loadProfile = async (user_id: string): Promise<Candidate | Error> => {
  let { data, error } = await supabase
    .from('candidates')
    .select(
      `
      *,
      candidate_skills(
        skills(*)
      ),
      candidate_verification(*),
      candidate_approval(*)
    `
    )
    .eq('user_id', user_id)

  if (error) throw error

  if (Array.isArray(data) && !data.length) throw 'Candidate profile not found'
  return data?.pop() as Candidate
}

const loadCandidateProfile = async (id: number): Promise<FilterCandidate | Error> => {
  let { data, error } = await supabase.rpc('load_candidate_profile', { cid: id })
  if (error) throw error

  let profiles = distillCandidateSkills(data as FilterCandidate[])

  if (!profiles.length) throw Error('Error loading profile')

  return profiles.pop()!
}

export default function useCandidate() {
  return {
    getFilteredCandidates,
    saveCandidate,
    verifyCandidate,
    approveCandidate,
    loadProfile,
    loadCandidateProfile,
    isCandidate,
    candidate,
    markReviewComplete,
    isVerified,
    isApproved,
  }
}
