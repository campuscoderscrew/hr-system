// TODO: Change all prop types to reflect types defined in
// `~/src/modal/types.ts`

import type { ClassValue } from "clsx";
import type {
  Department,
  Membership,
  OperationsSector,
  Role,
  Team,
} from "~/model/types";
import { proficiencyToString, availabilityToString } from "~/model/types";
import { cn } from "~/utils";

const EMPTY = "—";

const COLUMNS = [
  { key: "role", header: "Role" },
  { key: "name", header: "Name" },
  { key: "discord", header: "Discord" },
  { key: "proficiency", header: "Proficiency" },
  { key: "availability", header: "Availability" },
  { key: "github", header: "GitHub" },
  { key: "email", header: "Email" },
  { key: "desiredRole", header: "Desired Role" },
  { key: "supervisor", header: "Supervisor" },
  { key: "startDate", header: "Start Date" },
] as const;

type ColumnKey = (typeof COLUMNS)[number]["key"];

type MemberRow = Record<ColumnKey, string>;

const text = (value?: string): string => (value && value.trim() ? value : EMPTY);

// UTC: local formatting shifts these date-only values back a day.
const formatDate = (date?: Date): string => {
  if (!date) return EMPTY;
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime())
    ? EMPTY
    : parsed.toLocaleDateString(undefined, { timeZone: "UTC" });
};

const toMemberRow = (member: Membership, team: Team): MemberRow => {
  const roleUnderLead = member.currentRoles.find(
    (entry) => entry.supervisor === team.teamLead.name,
  );
  const currentRole = roleUnderLead ?? member.currentRoles[0];

  return {
    role: text(roleUnderLead?.role ?? member.role),
    name: text(member.name),
    discord: text(member.discord),
    proficiency: member.proficiency
      ? proficiencyToString(member.proficiency)
      : EMPTY,
    availability: member.availability
      ? availabilityToString(member.availability)
      : EMPTY,
    github: text(member.github),
    email: text(member.email),
    desiredRole: text(member.desiredRole),
    supervisor: text(currentRole?.supervisor),
    startDate: formatDate(currentRole?.startDate),
  };
};

const TeamLayout = (props: { className?: ClassValue[]; team: Team }) => {
  const { className, team } = props;

  return (
    <div
      className={cn(
        "bg-neutral-50 rounded-lg shadow-md overflow-hidden",
        className,
      )}
    >
      <div className="bg-rose-100 px-4 py-2 font-semibold">{team.name}</div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-neutral-200">
              {COLUMNS.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className="border border-neutral-300 px-4 py-2 font-semibold whitespace-nowrap"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {team.members.map((member: Membership, index: number) => {
              const row = toMemberRow(member, team);

              return (
                <tr
                  key={`member-${index}-${member.name}`}
                  className="odd:bg-white even:bg-neutral-100"
                >
                  {COLUMNS.map((column) => (
                    <td
                      key={column.key}
                      className="border border-neutral-300 px-4 py-2 whitespace-nowrap"
                    >
                      {row[column.key]}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const DepartmentLayout = (props: {
  className?: ClassValue[];
  department: Department | any;
}) => {
  const { className, department } = props;
  return (
    <div
      className={cn(
        "p-4 flex flex-col gap-2 bg-yellow-300 rounded-xl",
        className,
      )}
    >
      <span className="text-lg font-semibold">{department.name}</span>

      {department.teams.map((team: Team, index: number) => (
        <TeamLayout key={`team-${index}-${team.name}`} team={team} />
      ))}
    </div>
  );
};

const OperationsSectorLayout = (props: {
  className?: ClassValue[];
  sector: OperationsSector | any;
}) => {
  const { className, sector } = props;
  return (
    <div
      className={cn("p-4 flex flex-col gap-2 bg-black rounded-xl", className)}
    >
      <span className="text-neutral-50 text-lg font-semibold">
        {sector.name}
      </span>

      {sector.departments.map((department: Department, index: number) => (
        <DepartmentLayout
          key={`department-${index}-${department.name}`}
          department={department}
        />
      ))}
    </div>
  );
};

export { TeamLayout, DepartmentLayout, OperationsSectorLayout };
