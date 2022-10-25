import { ref } from 'vue'
import type { Ref } from 'vue'

interface Candidate {
  id: number
  created_at?: string
  blurb: string
  display_name: string
  gitsource?: string
  linkedin?: string
  rate: number
  candidate_skills?: Array<SkillsLink>
  candidate_verification?: Array<CandidateVerification>
  candidate_approval?: Array<CandidateApproval>
  timezone: number
  yoe: number
  user_id: string
  link_1?: string
  link_2?: string
  link_3?: string
  active?: boolean
  email: string | undefined
  allow_emails: boolean
  delete_me: boolean
}

interface FilterCandidate {
  id: number
  created_at?: string
  blurb: string
  display_name: string
  gitsource?: string
  linkedin?: string
  rate: number
  timezone: number
  yoe: number
  user_id: string
  link_1?: string
  link_2?: string
  link_3?: string
  active?: boolean
  email: string | undefined
  allow_emails: boolean
  delete_me: boolean

  skill_id: number
  skill_name: string
  skill_created_at: string
  skill_active: boolean
  skills: Array<Skill>
  verified: boolean
  verify_req: string
  approved: boolean
}

interface SearchFilter {
  req_exp: number
  start_tz: number
  end_tz: number
  low_rate: number
  high_rate: number
  is_approved?: boolean
  is_verified?: boolean
  req_verify?: boolean
  ids?: number[] | undefined
  is_active?: boolean
  search_text?: string
}

interface CandidateVerification {
  candidate_id: number | null
  verified?: boolean
  verify_req: string | null
}

interface CandidateApproval {
  candidate_id: number | null
  approved?: boolean
}

interface Skill {
  id: number
  created_at?: string
  name: string
  active: boolean
}

interface SkillsLink {
  skills?: Skill
}

interface Job {
  id?: number
  created_at?: string
  company: string
  title: string
  blurb: string
  website?: string
  jobspec?: string
  rate: number
  skills_link?: Array<SkillsLink>
  timezone: number
  yoe: number
  verified?: boolean
  verify_req: boolean
  approved?: boolean
  user_id: string
  link_1?: string
  link_2?: string
  link_3?: string
  active?: boolean
}

interface CDEvent {
  id: number
  created_at?: string
  type: string
  descr: string
  author_id: string
  candidate_id: number
  note: string
}

interface ClickData {
  id?: number
  created_at?: string
  link_type: string
  candidate_id: number
  who_clicked?: string
}

interface Filter {
  startTz: Ref<number>
  endTz: Ref<number>
  lowRate: Ref<number>
  highRate: Ref<number>
  reqExp: Ref<number>
  approved: Ref<boolean>
  verified: Ref<boolean>
  verify_req: Ref<boolean>
  active: Ref<boolean>
  searchText: Ref<string>
  pageSize: Ref<number>
  totalRecords: Ref<number>
  filterSkills: Ref<Skill[]>
}

export type {
  Candidate,
  Skill,
  Job,
  SkillsLink,
  CDEvent,
  CandidateVerification,
  CandidateApproval,
  ClickData,
  Filter,
  FilterCandidate,
  SearchFilter,
}
