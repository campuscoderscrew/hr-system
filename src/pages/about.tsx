import React from "react";

import NavBar from "~/components/navbar";
import { DepartmentLayout, OperationsSectorLayout } from "./SpreadsheetLayout";
import type { Department, Membership, OperationsSector, Team } from "~/model/types";

export default function About() {
  const member = {
    name: "John Doe",
    discord: "discord_username",
    email: "john_doe@gmail.com",
    role: "Developer" as const,
    currentRoles: [{ role: "Developer" as const, startDate: new Date("1970-01-01"), supervisor: "Jane Smith" }],
    supervisors: [] as string[],
  } as Membership;

  const team: Team = {
    name: "Team Lemon",
    members: [{ ...member, github: "github_username" }, member, member],
    teamLead: member,
  };

  const department = {
    name: "Development Department",
    abbreviation: "Dev",
    members: [member, member, member],
    teams: [team, team, team],
  } as Department;

  const sector = {
    name: "Development Operations",
    departments: [department, department],
    leadership: [member, member],
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
