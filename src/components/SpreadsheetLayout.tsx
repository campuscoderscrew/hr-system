// TODO: Change all prop types to reflect types defined in
// `~/src/modal/types.ts`

import type { ClassValue } from "clsx";
import type {
  Department,
  Membership,
  OperationsSector,
  Role,
  Team,
} from "../../utils/model/types";
import {
  proficiencyToString,
  availabilityToString,
  currentPositions,
} from "../../utils/model/types";
import { cn } from "../utils";
import { moveMemberToTeam } from "../../utils/model/operations";
import { hasSubscribers } from "diagnostics_channel";

const TeamLayout = (props: {
  className?: ClassValue[];
  team: Team;
  departmentName: string;
  members: Membership[];
  setMembers: (members: Membership[]) => void;
  handleMoveTeamAPI: (email: string, oldRole: string, newRole: string, supervisor?: [string, string]) => Promise<void>;
}) => {
  const { className, team, departmentName, members, setMembers } = props;

  return (
    <div
      className={cn(
        "flex flex-col divide-y",
        "bg-neutral-50 rounded-lg shadow-md overflow-hidden",
        "[&_span]:px-4 [&_span]:py-2 [&_span]:-mx-[2px]",
        className,
      )}

      /* Drag and drop handlers */
      onDragOver={(e) => e.preventDefault()} // Required to allow dropping
      onDrop={(e) => {
        e.preventDefault();
        const payloadStr = e.dataTransfer.getData("application/json");
        if (!payloadStr) return;
        
        const payload = JSON.parse(payloadStr);

        // 1. Guard against duplicate positions (already on the team)
        const isAlreadyOnTeam = team.members.some(m => m.emails.includes(payload.email));
        if (isAlreadyOnTeam) {
          alert("This member is already on the destination team.");
          return;
        }

        // 2. Guard against board members joining development teams
        const isBoardMember = payload.oldRole === "President" || payload.oldRole === "Vice President";
        if (isBoardMember && departmentName === "Development") {
          alert("Board-level roles cannot be transferred to a development team.");
          return;
        }

        // 3. Guard against moving a team lead (decided to block to prevent orphan teams)
        // Assuming you pass `isTeamLead` in the drag payload, or look it up here
        if (payload.isTeamLead) {
          alert("Cannot move a team lead. Reassign the team lead position first.");
          return;
        }

        console.log("Incoming transfer request:", payload, "to team:", team.name);
        
        // 4. Find the actual member and position objects from your global state
        const member = members.find(m => m.emails.includes(payload.email));
        if (!member) return;

        const positions = currentPositions(member);
        const fromPosition = positions.find(p => p.role === payload.oldRole);
        if (!fromPosition) return;

        // 5. Construct the destination object
        const destination = {
          department: departmentName,
          team: team.name,
        };

        // 6. Fix scope for newSupervisor
        const newSupervisor = team.teamLead 
          ? [team.teamLead.name, team.teamLead.emails[0]] as [string, string]
          : undefined;

        // 7. Copy the array so React knows to re-render, then apply the mutation
        const nextMembers = [...members];
        moveMemberToTeam(
          nextMembers,
          payload.email,
          payload.oldRole,
          payload.oldRole,
          newSupervisor
        );

        // 8. Push the new array into React state
        setMembers(nextMembers);
      }}
    >
      {/* Table header */}
      <span className="bg-purple-100">{team.name}</span>

      {/* Development-team stats — only shown for development teams */}
      {team.kind === "development" && (
        <div className="flex gap-[2px] divide-x bg-purple-50">
          {team.availabilityRule && (
            <span>
              Availability: {team.availabilityRule.comparator}{" "}
              {team.availabilityRule.hours}
            </span>
          )}
          {team.proficiency && (
            <span>
              {team.proficiency.kind.charAt(0).toUpperCase() +
                team.proficiency.kind.slice(1)}{" "}
              Team Proficiency: {team.proficiency.value}
            </span>
          )}
          <span>Max developers: {team.maxDevelopers ?? "-"}</span>
          <span>Tech Stack: {team.techStack?.join(", ") ?? "-"}</span>
          <span>Website: {team.website ?? "-"}</span>
        </div>
      )}

      <div className="flex gap-[2px] divide-x">
        {team.members.map((member: Membership, index: number) => {
          // Assumes roles and supervisors are of same length with corresponding entries
          const positions = currentPositions(member);
          const supervisorIdx = positions.findIndex(
            (position) => position.supervisor?.[0] === team.teamLead.name,
          );
          const currentPosition = positions[supervisorIdx];
          const currentRole = currentPosition?.role;

          return (
            <div
              key={`member-${member.emails[0]}-${index}`}
              // Added cursor styles for drag UX
              className="flex flex-col divide-y cursor-grab active:cursor-grabbing"
              // Makes the member card draggable and pack the payload
              draggable={true}
              onDragStart={(e) => {
                const isTeamLead = member.name === team.teamLead?.name;
                e.dataTransfer.setData(
                  "application/json",
                  JSON.stringify({
                    email: member.emails[0],
                    oldRole: currentRole,
                    sourceDepartment: departmentName,
                    isTeamLead: isTeamLead,
                  })
                );
              }}
            >
              <span>{currentRole}</span>
              <span>{member.name}</span>
              <span>{member.discord}</span>
              {currentPosition?.proficiency && (
                <span>
                  proficiency:{" "}
                  {proficiencyToString(currentPosition.proficiency)}
                </span>
              )}
              {currentPosition?.availability && (
                <span>
                  availability:{" "}
                  {availabilityToString(currentPosition.availability)}
                </span>
              )}
              {member.github && <span>{member.github}</span>}
              <span>{member.emails.join(", ")}</span>
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
  members: Membership[];
  setMembers: (members: Membership[]) => void;
  handleMoveTeamAPI: (email: string, oldRole: string, newRole: string, supervisor?: [string, string]) => Promise<void>;
}) => {
  const { className, department, members, setMembers, handleMoveTeamAPI } = props;
  
  return (
    <div
      className={cn("p-4 flex flex-col gap-2 bg-red-100 rounded-xl", className)}
    >
      <span className="text-lg font-semibold">{department.name}</span>

      {department.teams.map((team: Team, index: number) => (
        <TeamLayout 
          key={`team-${index}-${team.name}`} 
          team={team} 
          departmentName={department.name} 
          members={members}
          setMembers={setMembers}
          handleMoveTeamAPI={handleMoveTeamAPI}
        />
      ))}
    </div>
  );
};

const OperationsSectorLayout = (props: {
  className?: ClassValue[];
  sector: OperationsSector | any;
  members: Membership[];
  setMembers: (members: Membership[]) => void;
  handleMoveTeamAPI: (email: string, oldRole: string, newRole: string, supervisor?: [string, string]) => Promise<void>;
}) => {
  const { className, sector, members, setMembers, handleMoveTeamAPI } = props;
  return (
    <div
      className={cn(
        "p-4 flex flex-col gap-2 bg-yellow-300 rounded-xl",
        className,
      )}
    >
      <span className="text-lg font-semibold">{sector.name}</span>

      {sector.departments.map((department: Department, index: number) => (
        <DepartmentLayout
          key={`department-${index}-${department.name}`}
          department={department}
          members={members}
          setMembers={setMembers}
          handleMoveTeamAPI={handleMoveTeamAPI}
        />
      ))}
    </div>
  );
};

export { TeamLayout, DepartmentLayout, OperationsSectorLayout };
