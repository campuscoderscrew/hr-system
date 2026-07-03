import type { Member, Role } from "./types"
// adds a new member to the system
// member object should be fully constructed before passing in
export function addMember(members: Member[], member: Member): void {
    members.push(member)
}

// moves a member from their curr role to a new role
// archiving the old one in roleHistory with tdy as enddate
export function moveMember(members: Member[], id: string, newRole: Role): void {
    const member = members.find(m => m.id === id)
    if (!member) { return }
    member.currentRoles.forEach(role => {
        member.roleHistory.push({ ...role, endDate: new Date() })
    })
    member.currentRoles = [{ title: newRole, startDate: new Date() }]
    member.updatedAt = new Date()
}

// adds a new role to a member without removing their existing role
export function addRole(members: Member[], id: string, newRole: Role): void {
    // not finished
}

// removes a member from the system entirely
export function removeMember(members: Member[], id: string): void {
    // not finished
}