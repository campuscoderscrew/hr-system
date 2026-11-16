import { ROLES, type Membership } from "../utils/model/types";

// A presence check only: it does not confirm a string is a valid `Role`.
// POST /members is fully checked by `validateNewMember`; the PUT routes in
// index.ts still rely on this alone until they get the same validation (TODO)
export const isNonEmptyString = (value: unknown): boolean =>
  typeof value === "string" && value.trim() !== "";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parseDate(value: unknown): Date | null {
  if (typeof value !== "string") return null;
  const date = new Date(value);
  return isNaN(date.getTime()) ? null : date;
}

export function validateNewMember(body: unknown): string[] {
    if (typeof body !== "object" || body === null || Array.isArray(body)) {
        return ["Request body must be a JSON object."];
    }
    
    const fields = Object.keys(body);
    if (fields.length === 0) return ["Request body has no fields."];

    const validation: string[] = [];

    const { name, emails, positionHistory, discord, github, desiredRoles, joinDate, createdAt, updatedAt } =
        body as Record<string, unknown>;

    // name check
    if (!isNonEmptyString(name)) {
        validation.push("name must be a non-empty string.");
    }

    // emails check
    if (!Array.isArray(emails) || emails.length === 0) {
        validation.push("emails must be a non-empty array.");
    } else {
        emails.forEach((email, i) => {
            if (typeof email !== "string" || !EMAIL_PATTERN.test(email)) {
                validation.push(`emails[${i}] ${JSON.stringify(email)} is not a valid email.`);
            }
        });
    }

    // positionHistory check
    if (!Array.isArray(positionHistory)) {
        validation.push("positionHistory must be an array.");
    } else {
        positionHistory.forEach((position, i) => {
            const index = `positionHistory[${i}]`;
            if (typeof position !== "object" || position === null || Array.isArray(position)) {
                validation.push(`${index} must be an object.`);
                return; // nothing else to check on this entry
            }

            if (!(ROLES as readonly string[]).includes(position.role)) {
                validation.push(`${index}.role ${JSON.stringify(position.role)} is not a known role.`);
            }

            const start = parseDate(position.startDate);
            if (!start) {
                validation.push(`${index}.startDate ${JSON.stringify(position.startDate)} is not a valid date.`);
            }

            if (position.endDate !== undefined) {
                const end = parseDate(position.endDate);
                if (!end) {
                    validation.push(`${index}.endDate ${JSON.stringify(position.endDate)} is not a valid date.`);
                } else if (start && end < start) {
                    validation.push(`${index}.endDate is before its startDate.`);
                }
            }
        });
    }

    // Optional discord check
    if (discord !== undefined && typeof discord !== "string") {
        validation.push("discord must be a string.");
    }

    // Optional github check
    if (github !== undefined && typeof github !== "string") {
        validation.push("github must be a string.");
    }

    // Optional desiredRoles check
    if (desiredRoles !== undefined) {
        if (!Array.isArray(desiredRoles)) {
            validation.push("desiredRoles must be an array.");
        } else {
            desiredRoles.forEach((desiredRole, i) => {
                if (!(ROLES as readonly string[]).includes(desiredRole)) {
                    validation.push(`desiredRoles[${i}] ${JSON.stringify(desiredRole)} is not a valid role.`);
                }
            });
        }
    }

    // Optional member-level dates, checked so reviveNewMember never produces an Invalid Date
    const optionalDates: [string, unknown][] = [["joinDate", joinDate], ["createdAt", createdAt], ["updatedAt", updatedAt]];
    for (const [field, value] of optionalDates) {
        if (value !== undefined && !parseDate(value)) {
            validation.push(`${field} ${JSON.stringify(value)} is not a valid date.`);
        }
    }

    return validation;
}

/**
 * Turns a body that passed `validateNewMember` into a `Membership` with real
 * `Date` objects. JSON has no date type, so every date arrives as a string.
 *
 * Stand-in for `reviveMember` from W45.1.1, which has not landed yet. Once it
 * does, replace this with that so dates are revived in one place.
 */
export function reviveNewMember(body: unknown): Membership {
    // Safe only because validateNewMember already checked the shape; until the
    // lines below run, the date fields still hold strings, not Dates.
    const raw = body as Membership;
    const toDate = (value: Date | string | undefined) =>
        value === undefined ? undefined : new Date(value);

    const member: Membership = {
        ...raw,
        positionHistory: raw.positionHistory.map((position) => {
            const revived = { ...position, startDate: new Date(position.startDate) };
            if (position.endDate !== undefined) revived.endDate = new Date(position.endDate);
            return revived;
        }),
    };

    // Set only the dates the client sent, so absent ones stay absent rather than `undefined`
    if (raw.joinDate !== undefined) member.joinDate = toDate(raw.joinDate);
    if (raw.createdAt !== undefined) member.createdAt = toDate(raw.createdAt);
    if (raw.updatedAt !== undefined) member.updatedAt = toDate(raw.updatedAt);

    return member;
}
