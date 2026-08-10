import React from "react";

import NavBar from "~/components/navbar";
import { DepartmentLayout, OperationsSectorLayout } from "../components/SpreadsheetLayout";
import type { Department, Membership, OperationsSector, Team } from "~/model/types";
import { members } from "~/model/data";

export default function Members() {
  const team: Team = {
    name: "Team Lemon",
    members: members,
    teamLead: members.find((member) => member.role === "Team Lead")!,
  };

  const department = {
    name: "Development Department",
    abbreviation: "Dev",
    members: members,
    teams: [team, team, team],
  } as Department;

  const sector = {
    name: "Development Operations",
    departments: [department, department],
    leadership: members,
  } as OperationsSector;

  return (
    <div className="">
      <NavBar />
      <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">
        <OperationsSectorLayout sector={sector} />
      </div>
    </div>
  );
}
