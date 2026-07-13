// TODO: Change all prop types to reflect types defined in
// `~/src/modal/types.ts`

import type { ClassValue } from "clsx";
import type {
  Department,
  Member,
  OperationSector,
  Role,
  Team,
} from "~/model/types";
import { cn } from "~/utils";

const TeamLayout = (props: { className?: ClassValue[]; team: Team | any }) => {
  const { className, team } = props;

  return (
    <div
      className={cn(
        "flex flex-col divide-y",
        "bg-neutral-50 rounded-lg shadow-md overflow-hidden",
        "[&_span]:px-4 [&_span]:py-2 [&_span]:-mx-[2px]",
        className,
      )}
    >
      {/* Table header */}
      <span className="bg-rose-100">{team.name}</span>

      <div className="flex gap-[2px] divide-x">
        {team.members.map((member: Member, index: number) => {
          // Assumes roles and supervisors are of same length with corresponding entries
          const supervisorIdx = member.supervisors.indexOf(team.teamLead);
          const currentRole = member.currentRoles[supervisorIdx].role;

          return (
            <div className="flex flex-col divide-y">
              <span>{currentRole}</span>
              <span>{member.name}</span>
              <span>{member.discord}</span>
              {member.proficiency && <span>{member.proficiency}</span>}
              <span>{member.availability}</span>
              {member.github && <span>{member.github}</span>}
              <span>{member.email}</span>
            </div>
          );
        })}
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
  sector: OperationSector | any;
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
