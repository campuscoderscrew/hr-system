import type { Membership, Role } from "./types";

/**
 * Adds a new member to the system. `member` should be fully constructed before passing in.
 * @param members List of members in the model
 * @param member The member to add
 * @returns The new added member
 */
function addMember(members: Membership[], member: Membership): Membership {
  members.push(member);
  return member;
}

/**
 * Moves a member from their current role to a new role, clearing all previous
 * roles.
 * @param members List of members in the model
 * @param email The email of the member
 * @param newRole The new role to move the member to
 * @param supervisor The supervisor overseeing the new role
 * @returns The member associated with the `email` if they exist and was moved to the role; `null` otherwise
 */
function moveMember(
  members: Membership[],
  email: string,
  newRole: Role,
  supervisor: string,
): Membership | null {
  const member = members.find((member) => member.emails.includes(email));
  if (!member) return null;

  member.currentRoles = [{ role: newRole, startDate: new Date(), supervisor }];
  return member;
}

/**
 * Adds a new role to a member without removing all existing roles.
 * @param members List of members in the model
 * @param email The email username of the member
 * @param newRole The new role to move the member to
 * @param supervisor The supervisor overseeing the new role
 * @returns The member associated with the `email` if they exist and was added the role; `null` otherwise
 */
function addRole(
  members: Membership[],
  email: string,
  newRole: Role,
  supervisor: string,
): Membership | null {
  const member = members.find((member) => member.emails.includes(email));
  if (!member) return null;

  member.currentRoles.push({
    role: newRole,
    startDate: new Date(),
    supervisor,
  });

  return member;
}

/**
 * Removes a member from the model
 * @param members List of members in the model
 * @param email The email of the member
 * @returns The member associated with the `email` if they exist and was deleted; `null` otherwise
 */
function removeMember(members: Membership[], email: string): Membership | null {
  const memberIndex = members.findIndex((member) =>
    member.emails.includes(email),
  );
  
  if (memberIndex === -1) return null;

  const member = members.splice(memberIndex, 1)[0];
  return member;
}

export { addMember, moveMember, addRole, removeMember };
