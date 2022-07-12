interface Candidate {
  id?: number
  created_at?: string
  blurb: string
  display_name: string
  gitsource?: string
  linkedin?: string
  rate: number
  candidate_skills?: Array<CandidateSkill>
  timezone: number
  yoe: number
  verified?: boolean
  approved?: boolean
  user_id: string
  link_1: string
  link_2: string
  link_3: string
  verify_req: number | null
  active?: boolean
}

interface Skill {
  id: number
  created_at?: string
  name: string
  active: boolean
}

interface CandidateSkill {
  skills?: Skill
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

export type { Candidate, Skill, CandidateSkill, CDEvent }
