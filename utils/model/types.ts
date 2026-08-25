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

// Roles are exhaustive 
// "Team Lead" encompasses the Primary Lead and Secondary Lead roles.
// Jr./Sr. variants are not roles
export type UserType = "ADMIN" | "MEMBER" | "GUEST";
export type Role =
  // Executive
  | "President"
  | "Vice President"
  | "Head"
  // Team leadership
  | "Primary Lead"
  | "Secondary Lead"
  | "Team Lead"
  // Development Operations
  | "Developer"
  | "Designer"
  | "QA Tester"
  | "Product Manager"
  // Internal Operations
  | "Accountant"
  | "Financial Analyst"
  | "Fundraiser"
  | "Resource Manager"
  | "Analyst"
  | "Auditor"
  | "Human Resources Specialist"
  // External Operations
  | "Marketer"
  | "Recruiter"
  | "Public Relations Specialist"
  // Other
  | "Advisor"
  | "M";


  // Experience Level
  export type ExperienceLevel = "Associate" | "Intermediate" | "Senior";

  export function experienceLevelToString(level: ExperienceLevel): string {
  if (level === "Associate") {
    return "Assoc.";
  } else if (level === "Intermediate") {
    // Intermediate 
    return "";
  } else {
    return "Sr.";
  }
}

export function formatRole(role: Role, level?: ExperienceLevel): string {
if (level === undefined) {
    return role;
}
const prefix = experienceLevelToString(level);

if (prefix === "") {
    return role;
  }

  return prefix + " " + role;
}


/**
 * Proficiency
 */

// One aspect's rating (ranges 1-5)
export type ProficiencyRating = number | "X";

// Front-End / Back-End / Design (Figma) / Version Control / Dev Ops
// The sheet's total is derived from these five, so it is computed rather than stored
export interface Proficiency {
    frontEnd: ProficiencyRating;
    backEnd: ProficiencyRating;
    design: ProficiencyRating;
    versionControl: ProficiencyRating;
    devOps: ProficiencyRating;
}

// Aspects in the sheet's column order
function proficiencyRatings(proficiency: Proficiency): (ProficiencyRating | undefined)[] {
    const { frontEnd, backEnd, design, versionControl, devOps } = proficiency; // Destructuring
    return [frontEnd, backEnd, design, versionControl, devOps];
}

// "X" (not rated) and unset aspects both count as 0
export function proficiencyTotal(proficiency: Proficiency): number {
    return proficiencyRatings(proficiency).reduce<number>(
        (sum, rating) => sum + (typeof rating === "number" ? rating : 0), 0
    );
}

export function proficiencyToString(proficiency: Proficiency): string {
    const ratings = proficiencyRatings(proficiency).map((rating) => rating ?? "X");
    return `${ratings.join("-")} (${proficiencyTotal(proficiency)})`;
}

/**
 * Availability
 */

// Non-numeric availability states
export type AvailabilityStatus = "ACTIVE" | "INACTIVE" | "BREAK" | "UNKNOWN";

// Availability in hours
export type Availability =
| { kind: "range"; min: number; max: number, status: AvailabilityStatus } // e.g. 6-10
| { kind: "atLeast"; min: number, status: AvailabilityStatus } // e.g. 20+
| { kind: "lessThan"; max: number, status: AvailabilityStatus } // e.g. <1
| { kind: "hoursUnknown"; status: AvailabilityStatus} // When availability is unknown but status is

export function availabilityToString(availability: Availability): string {
    switch (availability.kind) {
        case "range":
            return `${availability.min}-${availability.max}`;
        case "atLeast":
            return `${availability.min}+`;
        case "lessThan":
            return `<${availability.max}`;
        case "hoursUnknown":
            return "-"
    }
}

/**
 * Membership
 */

export interface Membership {
    id?: string; // Optional for now
    name: string;
    discord: string;
    email: string;
    github: string;
    proficiency: Proficiency;
    availability: Availability;
    role: Role;
    currentRoles: { role: Role; startDate: Date, supervisor?: string }[]; // Roles held by member, with start dates
    roleHistory?: { role: Role; startDate: Date, endDate: Date | "Current" }[]; // Optional for now
    desiredRole?: Role; // Role written in parentheses in sheet
    joinDate: Date;
    createdAt: Date;
    updatedAt: Date;
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
    kind: "development" | "non-development";
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