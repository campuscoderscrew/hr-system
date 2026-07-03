export type MemberStatus =
    | "active"
    | "inactive"
    | "break"
    | "not_in_discord"
    | "undergoing_processing"

export type Role =
    // Exec
    | "President"
    | "Vice President of Development Operations"
    | "Vice President of Internal Operations"
    | "Vice President of External Operations"

    // Dev Operations
    | "Development Department Head"
    | "Primary Lead"
    | "Secondary Lead"
    | "Jr. Developer"
    | "Developer"
    | "Sr. Developer"
    | "Jr. Designer"
    | "Designer"
    | "Sr. Designer"
    | "Quality Assurance Department Head"
    | "Jr. QA Tester"
    | "QA Tester"
    | "Sr. QA Tester"
    | "Product Department Head"
    | "Jr. Product Manager"
    | "Product Manager"
    | "Sr. Product Manager"

    // Internal Operations
    | "Finance Department Head"
    | "Accounting Team Lead"
    | "Jr. Accountant"
    | "Accountant"
    | "Sr. Accountant"
    | "Investment Team Lead"
    | "Jr. Financial Analyst"
    | "Financial Analyst"
    | "Sr. Financial Analyst"
    | "Jr. Fundraiser"
    | "Fundraiser"
    | "Sr. Fundraiser"
    | "Resource Management Department Head"
    | "Jr. Resource Manager"
    | "Resource Manager"
    | "Sr. Resource Manager"
    | "Analytics Department Head"
    | "Jr. Analyst"
    | "Analyst"
    | "Sr. Analyst"
    | "Auditing Department Head"
    | "Jr. Auditor"
    | "Auditor"
    | "Sr. Auditor"
    | "Human Resources Department Head"
    | "Jr. HR Specialist"
    | "HR Specialist"
    | "Sr. HR Specialist"
    | "Events Head"

    // External Operations
    | "Marketing Department Head"
    | "Jr. Marketer"
    | "Marketer"
    | "Sr. Marketer"
    | "Recruitment Department Head"
    | "Jr. Recruiter"
    | "Recruiter"
    | "Sr. Recruiter"
    | "Public Relations Head"
    | "Jr. PR Specialist"
    | "PR Specialist"
    | "Sr. PR Specialist"
    | "Graphic Design Head"
    | "Graphic Design Team Lead"
    | "Jr. Graphic Designer"
    | "Graphic Designer"
    | "Sr. Graphic Designer"

export type RoleEntry = {
    title: Role
    startDate: Date
    endDate: Date
}

export type CurrentRole = {
    title: Role
    startDate: Date
}

export type Department =
    | "advisory_board"
    | "executive_board"
    | "minor_board"
    | "development_operations"
    | "internal_operations"
    | "external_operations"

export type Cluster =
    | "Caribbean"
    | "Bering"
    | "Caspian"
    | "Mediterranean"

export type Team =
    // Caribbean Cluster
    | "Angel"
    | "Whale"
    | "Shortfin"
    | "Blue"
    // Bering Cluster
    | "Leopard"
    | "Mako"
    | "Hammerhead"
    | "Lemon"
    | "Cookiecutter"
    | "Zebra"
    | "Nurse"
    | "Silky"

export type Member = {
    id: string
    name: string
    email: string
    discord: string
    github: string | null
    availability: string
    proficiency: string | null
    status: MemberStatus
    joinDate: Date
    department: Department
    currentRoles: CurrentRole[]
    team: Team | null
    cluster: Cluster | null
    roleHistory: RoleEntry[]
    createdAt: Date
    updatedAt: Date
}