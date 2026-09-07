import React from "react";

import NavBar from "~/components/navbar";
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
import { members } from "../../utils/model/data";
import { currentPositions } from "../../utils/model/types";

export default function Members() {
  const team: Team = {
    name: "Team Lemon",
    kind: "development",
    availabilityRule: { comparator: ">=", hours: 6 },
    proficiency: { kind: "average", value: 9 },
    maxDevelopers: 4,
    techStack: ["React", "TypeScript", "FastAPI"],
    website: "teamlemon.com",
    members: members,
    teamLead: members.find((member) =>
      currentPositions(member).some(
        (position) => position.role === "Team Lead",
      ),
    )!,
  };

  const nonDevTeam: Team = {
    name: "Team NonDev",
    kind: "non-development",
    members: members,
    teamLead: members.find((member) =>
      currentPositions(member).some(
        (position) => position.role === "Team Lead",
      ),
    )!,
  };

  const department = {
    name: "Development Department",
    abbreviation: "Dev",
    members: members,
    teams: [team, nonDevTeam, team],
  } as Department;

  const sector = {
    name: "Development Operations",
    departments: [department, department],
    leadership: members,
  } as OperationsSector;

  return (
    <div className="">
      <NavBar />
      <div className="h-screen grid place-items-center ">
        <OperationsSectorLayout sector={sector} />
      </div>
    </div>
  );
}
