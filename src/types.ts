interface Candidate {
    id?: Number;
    created_at: string;
    blurb: string;
    display_name: string;
    gitsource: string;
    linkedin: string;
    links: Array<string>;
    rate: number;
    skills: Array<string>;
    timezone: number;
    yoe: number;
    verified: boolean;
    approved: boolean;
    user_id: string|undefined
}

interface CandidateValues {
    id?: Number;
    blurb: string;
    display_name: string;
    gitsource: string;
    linkedin: string;
    rate: number;
    timezone: number;
    yoe: number;
    user_id?: string
}

interface Skill {
    id: number;
    created_at: string;
    name: string;
    active: boolean;
}

interface SkillItem {
    skill_id: number
}

export type { Candidate, CandidateValues, Skill, SkillItem }