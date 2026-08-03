import type { Membership } from "./types";


export const members: Membership[] = [
  {
    name: "John Doe",
    discord: "discord_username",
    email: "john_doe@gmail.com",
    role: "Developer" as const,
    currentRoles: [{ role: "Developer" as const, startDate: new Date("1970-01-01"), supervisor: "Jane Smith" }],
  },
  {
    name: "Jane Smith",
    discord: "discord_username",
    email: "jane_smith@gmail.com",
    role: "Team Lead" as const,
    currentRoles: [{ role: "Team Lead" as const, startDate: new Date("1970-01-01"), supervisor: "John Doe" }],
  }
];
