// Models the CCC Crew Formations [CREW-R] spreadsheet
//
// Organization
// ├─ Board                (Advisory / Executive / Minor)
// │  └─ OperationsSector  (Executive board only: Internal / External / Development)
// │       └─ Department   (Analytics, HR, Finance, QA, ...)
// └─ Cluster              (Caribbean, Bering, ... — the developer membership)
//    └─ Team              (Angel, Whale, Shortfin, ...)
//
// Clusters/Teams are separate from the board hierarchy

/**
 * Roles
 */

// Role codes from the sheet's KEY:
// PL = Primary (Team) Lead, SL = Secondary (Team) Lead, TL = Team Lead,
// H = Head, M = Member.
export type Role =
| "PL"
| "SL"
| "TL"
| "H"
| "M"
| "Head"
| "Developer"
| "Jr. Developer"
| "Advisor"
| (string & {}) // Allows one-off titles (e.g. "Internal VP", "Jr. Analyst")

/**
 * Proficiency
 */

// One aspect's rating (ranges 1-4)
export type ProfiencyRating = number | "X";

// Front-End / Back-End / Design (Figma) / Version Control / Dev Ops
export interface Profiency {
    frontEnd?: ProfiencyRating;
    backEnd?: ProfiencyRating;
    design?: ProfiencyRating;
    versionControl?: ProfiencyRating;
    devOps?: ProfiencyRating;
    totalSum?: number;
}

export function proficiencyToString(proficiency: Profiency): string {
    const { frontEnd, backEnd, design, versionControl, devOps, totalSum } = proficiency;
    const ratings = [frontEnd, backEnd, design, versionControl, devOps, totalSum];
    return frontEnd + "-" + backEnd + "-" + design + "-" + versionControl + "-" + devOps + " (" + totalSum + ")";
}

/**
 * Availability
 */

// Non-numeric availability states
export type AvailabilityStatus = "INACTIVE" | "BREAK" | "UNKNOWN";

// Availability in hours
export type Availability =
| { kind: "range"; min: number; max: number} // e.g. 6-10
| { kind: "atLeast"; min: number} // e.g. 20+
| { kind: "lessThan"; max: number} // e.g. <1
| { kind: "status"; status: AvailabilityStatus}; // -, INACTIVE, BREAK

export function availabilityToString(availability: Availability): string {
    switch (availability.kind) {
        case "range":
            return `${availability.min}-${availability.max}`;
        case "atLeast":
            return `${availability.min}+`;
        case "lessThan":
            return `<${availability.max}`;
        case "status":
            return availability.status;
    }
}

/**
 * Membership
 */

export interface Membership {
    role: Role;
    name: string;
    desiredRole?: Role; // Role written in parentheses in sheet
    currentRoles: { role: Role; startDate: Date, supervisor: string }[]; // Roles held by member, with start dates
    discord?: string;
    email?: string;
    github?: string;
    proficiency?: Profiency;
    availability?: Availability;
}

/**
 * Teams / Clusters
 */

// Team proficiency statistic
export interface TeamProficiencyStat {
    kind: "average" | "median" | "combined";
    value?: number;
}

// Team availability requirement
export interface AvailabilityRule {
    comparator: ">=" | "<=";
    hours: number;
}

// Team build (teams exist under cluster)
export interface Team {
    name: string;
    availabilityRule?: AvailabilityRule;
    proficiency?: TeamProficiencyStat;
    maxDevelopers?: number;
    techStack?: string[];
    website?: string;
    members: Membership[];
    teamLead: Membership;
}

// Cluster build (contains multiple teams)
export interface Cluster {
  /** Cluster name without the "Development Teams:" prefix, e.g. "Caribbean". */
  name: string;
  status: "active" | "inactive" | "empty";
  teams: Team[];
}

/**
 * Departments / Operations Sectors
 */

export interface Department {
    name: string;
    abbreviation?: string; // Short form where sheet uses one
    members: Membership[];
}

export interface OperationsSector {
    name: string;
    leadership: Membership[];
    departments: Department[];
}

/**
 * Boards
 */

// Flat boards (Advisory, Minor) only list members
// Executive members structured into Operations sectors
export type Board =
| {kind: "flat"; name: string; members: Membership[]}
| {kind: "operations"; name: string; operations: OperationsSector[]}

/**
 * Root
 */

export interface Organization {
    boards: Board[];
    clusters: Cluster[];
}