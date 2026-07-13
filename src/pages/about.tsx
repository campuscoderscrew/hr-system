import React from "react";

import NavBar from "~/components/navbar";
import { DepartmentLayout, OperationsSectorLayout } from "./SpreadsheetLayout";
import type { Department, Member, OperationSector, Team } from "~/model/types";

export default function About() {
  const member: Member = {
    name: "John Doe",
    discord: "discord_username",

    email: "john_doe@gmail.com",
    academicStanding: "freshman",

    availability: "1-5",
    proficiency: "3-3-3-3-3 (15)",
    status: "active",

    currentRoles: [
      {
        title: "Developer",
        startDate: new Date("1970-01-01")
      },
    ],
  };

  const team: Team = {
    name: "Team Lemon",
    members: [{ ...member, github: "github_username" }, member, member],
    teamLead: member,
  };

  const department: Department = {
    name: "Development Department",
    teams: [team, team, team],
    teamLeads: [member, member, member],
    head: member,
  };

  const sector: OperationSector = {
    name: "Development Opereations",
    departments: [department, department],
    departmentHeads: [member, member],
    vicePresident: member,
  };

  return (
    <div className="">
      <NavBar />
      About Boilerplate
      <div className="h-screen grid place-items-center ">
        <OperationsSectorLayout sector={sector} />
      </div>
    </div>
  );
}
