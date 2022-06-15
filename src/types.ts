interface Candidate {
    id: string;
    created_at: string;
    blurb: string;
    display_name: string;
    gitsource: string;
    linkedin: string;
    links: Array<string>;
    rate: number;
    skills: Array<string>;
    timezone: string;
    yoe: number;
    verified: boolean;
    approved: boolean;
}

export type { Candidate }