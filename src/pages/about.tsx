import React from "react";

import NavBar from "~/components/navbar";
import { TeamLayout } from "./SpreadsheetLayout";

export default function About() {
  const team = {
    name: "Team Lemon",
    members: new Array(4).fill({
      role: "project lead",
      name: "Jane Doe",
      discord: "janeDoe",
      totalProficiency: 9,
      availability: 10,
      github: "janeDoe",
      email: "jane@doe.com",
    }),
    teamLead: {},
  };

  return (
    <div className="">
      <NavBar />
      About Boilerplate
      <div className="h-screen grid place-items-center ">
        <TeamLayout team={team} />
      </div>
    </div>
  );
}
