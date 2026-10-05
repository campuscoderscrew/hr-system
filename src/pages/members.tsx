import React, { useState } from "react";

import NavBar from "@src/components/navbar";
import {
  DepartmentLayout,
  OperationsSectorLayout,
} from "../components/SpreadsheetLayout";
import type {
  Department,
  Membership,
  OperationsSector,
  Team,
} from "../../utils/model/types";
import { members as initialMembers } from "../../utils/model/data";
import { currentPositions } from "../../utils/model/types";

export default function Members() {
  const [appMembers, setAppMembers] = useState<Membership[]>(initialMembers);

  const team: Team = {
    name: "Team Lemon",
    kind: "development",
    availabilityRule: { comparator: ">=", hours: 6 },
    proficiency: { kind: "average", value: 9 },
    maxDevelopers: 4,
    techStack: ["React", "TypeScript", "FastAPI"],
    website: "teamlemon.com",
    members: appMembers,
    teamLead: appMembers.find((member) =>
      currentPositions(member).some(
        (position) => position.role === "Team Lead",
      ),
    )!,
  };

  const nonDevTeam: Team = {
    name: "Team NonDev",
    kind: "non-development",
    members: appMembers,
    teamLead: appMembers.find((member) =>
      currentPositions(member).some(
        (position) => position.role === "Team Lead",
      ),
    )!,
  };

  const department = {
    name: "Development Department",
    abbreviation: "Dev",
    members: appMembers,
    teams: [team, nonDevTeam, team],
  } as Department;

  const sector = {
    name: "Development Operations",
    departments: [department, department],
    leadership: appMembers,
  } as OperationsSector;

  const handleMoveTeamAPI = async (
    email: string, 
    oldRole: string, 
    newRole: string, 
    supervisor?: [string, string]
  ) => {
    try {
      const response = await fetch(`/members/${email}/move-team`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldRole, newRole, supervisor })
      });
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("Database updated successfully");
    } catch (error) {
      console.error("Failed to update member in the database", error);
      alert("Failed to save transfer to the database.");
    }
  };

  return (
    <div className="">
      <NavBar />
      <div className="h-screen grid place-items-center ">
        <OperationsSectorLayout 
          sector={sector} 
          members={appMembers}
          setMembers={setAppMembers}
          handleMoveTeamAPI={handleMoveTeamAPI}
        />
      </div>
    </div>
  );
}