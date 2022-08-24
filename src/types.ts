interface Candidate {
  id?: number
  created_at?: string
  blurb: string
  display_name: string
  gitsource?: string
  linkedin?: string
  rate: number
  skills_link?: Array<SkillsLink>
  timezone: number
  yoe: number
  verified?: boolean
  approved?: boolean
  user_id: string
  link_1?: string
  link_2?: string
  link_3?: string
  verify_req: number | null
  active?: boolean
  email: string | undefined
  allow_emails: boolean
  delete_me: boolean
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
  approved?: boolean
  user_id: string
  link_1?: string
  link_2?: string
  link_3?: string
  active?: boolean
  delete_me: boolean
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

export type { Candidate, Skill, Job, SkillsLink, CDEvent }
