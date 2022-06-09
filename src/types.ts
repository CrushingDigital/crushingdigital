interface Candidate {
    id: string;
    added_dts: string;
    blurb: string;
    firstname: string;
    github: string;
    lastname: string;
    linkedin: string;
    links: Array<string>;
    rate: number;
    skills: Array<string>;
    timezone: string;
    yoe: number;
}

export type { Candidate }