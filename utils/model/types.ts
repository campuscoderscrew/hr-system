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
  | "Secretary"
  | "Treasurer"
  // Team leadership
  | "Primary Lead"
  | "Secondary Lead"
  | "Team Lead"
  // Development Operations
  | "Developer"
  | "Designer"
  | "QA Analyst"
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
  const { frontEnd, backEnd, design, versionControl, devOps, totalSum } =
    proficiency;
  const ratings = [frontEnd, backEnd, design, versionControl, devOps, totalSum];
  return (
    frontEnd +
    "-" +
    backEnd +
    "-" +
    design +
    "-" +
    versionControl +
    "-" +
    devOps +
    " (" +
    totalSum +
    ")"
  );
}

/**
 * Availability
 */

// Non-numeric availability states
export type AvailabilityStatus = "ACTIVE" | "INACTIVE" | "BREAK" | "UNKNOWN";

// Availability in hours
export type Availability =
  | { kind: "range"; min: number; max: number; status: AvailabilityStatus } // e.g. 6-10
  | { kind: "atLeast"; min: number; status: AvailabilityStatus } // e.g. 20+
  | { kind: "lessThan"; max: number; status: AvailabilityStatus } // e.g. <1
  | { kind: "hoursUnknown"; status: AvailabilityStatus }; // When availability is unknown but status is

export function availabilityToString(availability: Availability): string {
  switch (availability.kind) {
    case "range":
      return `${availability.min}-${availability.max}`;
    case "atLeast":
      return `${availability.min}+`;
    case "lessThan":
      return `<${availability.max}`;
    case "hoursUnknown":
      return "-";
  }
}

/**
 * Membership
 */

/**
 * Organization names
 */

export type SectorNames =
  "Development Operations" | "Internal Operations" | "External Operations";

export type DepartmentNames =
  // Development Operations
  | "Development"
  | "Quality Assurance"
  | "Product"
  // Internal Operations
  | "Finance"
  | "Resource Management"
  | "Analytics"
  | "Auditing"
  | "Human Resources"
  | "Events"
  // External Operations
  | "Marketing"
  | "Recruitment"
  | "Public Relations"
  | "Graphic Design";

export type TeamNames =
  // Development department
  | "Zebra"
  | "Hammerhead"
  | "Lemon"
  | "Tiger"
  | "Cookiecutter"
  | "Shortfin"
  | "Blue"
  | "Whale"
  | "Leopard"
  | "Angel"
  | "Silky"
  // Finance department
  | "Accounting"
  | "Investment"
  // Graphic Design department
  | "Graphic Design";

/**
 * Position
 */
// Identifies the supervising member: their name, then their primary email.
//
// TODO: this is a denormalized copy, not a reference. Nothing links it back to
// the supervising Membership, so if that member's name or primary email changes,
// every Position pointing at them silently goes stale.
//
// Until that is fixed, any rename or email change must sweep every member's
// positionHistory and update the matching supervisor entries. Longer term,
// store the supervisor's member id here and resolve name/email at read time.
export type SupervisorRef = [name: string, email: string];

// A position held by a member over some period, and where it sits in the org.
// endDate is absent while the position is currently held.
export interface Position {
  role: Role;
  experienceLevel?: ExperienceLevel;
  startDate: Date;
  endDate?: Date;
  supervisor?: SupervisorRef;
  availability?: Availability;
  proficiency?: Profiency;
  operationsSector?: SectorNames;
  department?: DepartmentNames;
  team?: TeamNames;
  cluster?: string;
}

// Positions a member currently holds (those with no endDate).
export function currentPositions(member: Membership): Position[] {
  return member.positionHistory.filter((p) => p.endDate === undefined);
}

export interface Membership {
  id?: string;
  name: string;
  desiredRoles?: Role[]; // Roles written in parentheses in sheet
  positionHistory: Position[]; // Every position held; current ones have no endDate
  discord?: string;
  emails: string[];
  github?: string;
  joinDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
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
  | { kind: "flat"; name: string; members: Membership[] }
  | { kind: "operations"; name: string; operations: OperationsSector[] };

/**
 * Root
 */

export interface Organization {
  boards: Board[];
  clusters: Cluster[];
}
