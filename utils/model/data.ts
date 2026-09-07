import type { Membership } from "./types";

export const members: Membership[] = [
  {
    name: "John Doe",
    positionHistory: [
      {
        role: "Developer",
        startDate: new Date("1970-01-01"),
        supervisor: ["Jane Smith", "jane_smith@gmail.com"],
        availability: { kind: "hoursUnknown", status: "ACTIVE" },
        proficiency: {
          frontEnd: "X",
          backEnd: "X",
          design: "X",
          versionControl: "X",
          devOps: "X",
        },
        operationsSector: "Development Operations",
        department: "Development",
        team: "Cookiecutter",
      },
    ],
    discord: "discord_username",
    email: "john_doe@gmail.com",
    role: "Developer" as const,
    currentRoles: [{ role: "Developer" as const, startDate: new Date("1970-01-01"), supervisor: "Jane Smith" }],
  },

  {
    name: "Jane Smith",
    positionHistory: [
      {
        role: "Team Lead",
        startDate: new Date("1970-01-01"),
        supervisor: ["John Doe", "john_doe@gmail.com"],
        availability: { kind: "hoursUnknown", status: "ACTIVE" },
        proficiency: {
          frontEnd: "X",
          backEnd: "X",
          design: "X",
          versionControl: "X",
          devOps: "X",
        },
      },
    ],
    discord: "discord_username",
    email: "jane_smith@gmail.com",
    role: "Team Lead" as const,
    currentRoles: [{ role: "Team Lead" as const, startDate: new Date("1970-01-01"), supervisor: "John Doe" }],
  }
];
