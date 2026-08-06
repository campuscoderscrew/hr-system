import type { Membership } from "./types";


export const members: Membership[] = [
  {
    name: "John Doe",
    discord: "discord_username",
    email: "john_doe@gmail.com",
    availability: { kind: "hoursUnknown", status: "ACTIVE"},
    role: "Developer",
    currentRoles: [{ role: "Developer" as const, startDate: new Date("1970-01-01"), supervisor: "Jane Smith" }],
    joinDate: new Date("1970-01-01"),
    createdAt: new Date("1970-01-01"),
    updatedAt: new Date("1970-01-01")
  },

  {
    name: "Jane Smith",
    discord: "discord_username",
    email: "jane_smith@gmail.com",
    availability: { kind: "hoursUnknown", status: "ACTIVE"},
    role: "TL",
    currentRoles: [{ role: "TL" as const, startDate: new Date("1970-01-01"), supervisor: "John Doe" }],
    joinDate: new Date("1970-01-01"),
    createdAt: new Date("1970-01-01"),
    updatedAt: new Date("1970-01-01")
  },

  {
    id: "ccc-00X",
    name: "Lebron James",
    discord: "lebronjames",
    email: "lebron@gmail.com",
    github: "lebronjames23",
    proficiency: { frontEnd: 4, backEnd: 3, design: 2, versionControl: 1, devOps: "X" },
    availability: { kind: "range", min: 1, max: 5, status: "ACTIVE" },
    role: "Developer",
    currentRoles: [{ role: "Developer", startDate: new Date("2026-07-01") }],
    joinDate: new Date("2026-07-01"),
    createdAt: new Date("2026-07-01"),
    updatedAt: new Date("2026-07-01")
  },

  {
    id: "ccc-002",
    name: "Stephen Curry",
    discord: "stephcurry30",
    email: "curry@gmail.com",
    github: "curry30",
    proficiency: { frontEnd: 5, backEnd: 4, design: 3, versionControl: 2, devOps: "X" },
    availability: { kind: "range", min: 6, max: 10, status: "INACTIVE"},
    role: "PL",
    currentRoles: [
      { role: "Developer", startDate: new Date("2025-08-01") },
      { role: "PL", startDate: new Date("2026-01-01") }
    ],
    joinDate: new Date("2025-08-01"),
    createdAt: new Date("2025-08-01"),
    updatedAt: new Date("2026-01-01")
  },

  {
    id: "ccc-004",
    name: "Shaquille ONeal",
    discord: "shaqoneal34",
    email: "shaq@gmail.com",
    availability: { kind: "range", min: 11, max: 15, status: "ACTIVE"},
    role: "President",
    currentRoles: [{ role: "President", startDate: new Date("2024-01-01") }],
    roleHistory: [
      {
        role: "Vice President of Development Operations",
        startDate: new Date("2023-01-01"),
        endDate: new Date("2024-01-01")
      }
    ],
    joinDate: new Date("2023-01-01"),
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2024-01-01")
  },

  {
    id: "ccc-006",
    name: "Frodo Baggins",
    discord: "frodobaggins",
    email: "frodobaggins@umd.edu",
    github: "frodobaggins16",
    proficiency: { frontEnd: 2, backEnd: 1, design: 5, versionControl: 1, devOps: 2 },
    availability: { kind: "atLeast", min: 25, status: "ACTIVE" },
    role: "Jr. Analyst",
    currentRoles: [{ role: "Jr. Analyst", startDate: new Date("2026-02-23") }],
    joinDate: new Date("2025-07-17"),
    createdAt: new Date("2025-07-17"),
    updatedAt: new Date("2026-02-23")
  },

  {
    id: "ccc-007",
    name: "Hermione Granger",
    discord: "hermionegranger71",
    email: "hermionegranger@umd.edu",
    github: "hermionegranger56",
    proficiency: { frontEnd: 5, backEnd: 3, design: "X", versionControl: 3, devOps: 3 },
    availability: { kind: "range", min: 1, max: 5, status: "ACTIVE" },
    role: "H",
    currentRoles: [{ role: "H", startDate: new Date("2026-06-19"), supervisor: "Tony Stark" }],
    joinDate: new Date("2025-12-29"),
    createdAt: new Date("2025-12-29"),
    updatedAt: new Date("2026-06-19")
  },

  {
    id: "ccc-008",
    name: "Tony Stark",
    discord: "tonystark",
    email: "tony.stark@umd.edu",
    github: "tonystark37",
    proficiency: { frontEnd: 1, backEnd: 1, design: 2, versionControl: 2, devOps: 2 },
    availability: { kind: "range", min: 1, max: 5, status: "ACTIVE" },
    role: "Jr. Developer",
    currentRoles: [{ role: "Jr. Developer", startDate: new Date("2025-08-27"), supervisor: "Katniss Everdeen" }],
    joinDate: new Date("2024-11-12"),
    createdAt: new Date("2024-11-12"),
    updatedAt: new Date("2025-08-27")
  },

  {
    id: "ccc-009",
    name: "Ellen Ripley",
    discord: "ellenripley75",
    email: "ellen.ripley@outlook.com",
    availability: { kind: "range", min: 1, max: 5, status: "ACTIVE" },
    role: "Project Manager",
    currentRoles: [{ role: "Project Manager", startDate: new Date("2025-09-28"), supervisor: "Leia Organa" }],
    joinDate: new Date("2024-09-15"),
    createdAt: new Date("2024-09-15"),
    updatedAt: new Date("2025-09-28")
  },

  {
    id: "ccc-010",
    name: "Sherlock Holmes",
    discord: "sherlockholmes84",
    email: "sherlock.holmes@umd.edu",
    github: "sherlockholmes24",
    availability: { kind: "range", min: 1, max: 5, status: "BREAK" },
    role: "Secretary",
    currentRoles: [{ role: "Secretary", startDate: new Date("2025-04-27"), supervisor: "Clark Kent" }],
    joinDate: new Date("2024-06-21"),
    createdAt: new Date("2024-06-21"),
    updatedAt: new Date("2025-04-27")
  },

  {
    name: "Katniss Everdeen",
    discord: "katnisseverdeen",
    email: "katniss_everdeen@terpmail.umd.edu",
    github: "katnisseverdeen31",
    proficiency: { backEnd: 2, design: 4, versionControl: 5, devOps: 5 },
    availability: { kind: "range", min: 1, max: 5, status: "ACTIVE" },
    role: "Treasurer",
    currentRoles: [{ role: "Treasurer", startDate: new Date("2026-06-01"), supervisor: "Sherlock Holmes" }],
    roleHistory: [
      { role: "Head", startDate: new Date("2025-10-16"), endDate: new Date("2025-11-22") }
    ],
    joinDate: new Date("2025-07-25"),
    createdAt: new Date("2025-07-25"),
    updatedAt: new Date("2026-06-01")
  },

  {
    id: "ccc-011",
    name: "Luke Skywalker",
    discord: "lukeskywalker57",
    email: "lukeskywalker@gmail.com",
    github: "lukeskywalker",
    proficiency: { frontEnd: 2, backEnd: 2, design: 1, versionControl: 3, devOps: 3 },
    availability: { kind: "hoursUnknown", status: "ACTIVE" },
    role: "Jr. Developer",
    currentRoles: [{ role: "Jr. Developer", startDate: new Date("2024-05-13") }],
    joinDate: new Date("2023-09-16"),
    createdAt: new Date("2023-09-16"),
    updatedAt: new Date("2024-05-13")
  },

  {
    id: "ccc-012",
    name: "Leia Organa",
    discord: "leiaorgana34",
    email: "leia.organa@terpmail.umd.edu",
    github: "leiaorgana",
    availability: { kind: "range", min: 11, max: 15, status: "BREAK" },
    role: "H",
    currentRoles: [
      { role: "Secretary", startDate: new Date("2022-06-10") },
      { role: "H", startDate: new Date("2024-04-14"), supervisor: "Diana Prince" }
    ],
    desiredRole: "Head",
    joinDate: new Date("2022-02-20"),
    createdAt: new Date("2022-02-20"),
    updatedAt: new Date("2024-04-14")
  },

  {
    id: "ccc-013",
    name: "Bruce Wayne",
    discord: "brucewayne",
    email: "bruce_wayne@umd.edu",
    github: "brucewayne59",
    proficiency: { frontEnd: 3, backEnd: "X", versionControl: 5, devOps: 5 },
    availability: { kind: "range", min: 6, max: 10, status: "UNKNOWN" },
    role: "QA Engineer",
    currentRoles: [{ role: "QA Engineer", startDate: new Date("2024-01-29"), supervisor: "Walter White" }],
    joinDate: new Date("2022-05-11"),
    createdAt: new Date("2022-05-11"),
    updatedAt: new Date("2024-01-29")
  },

  {
    id: "ccc-014",
    name: "Diana Prince",
    discord: "dianaprince80",
    email: "diana.prince@gmail.com",
    github: "dianaprince",
    proficiency: { backEnd: "X", design: "X", versionControl: 4, devOps: "X" },
    availability: { kind: "range", min: 16, max: 20, status: "ACTIVE" },
    role: "Project Manager",
    currentRoles: [{ role: "Project Manager", startDate: new Date("2025-03-25"), supervisor: "Tony Stark" }],
    roleHistory: [
      { role: "Developer", startDate: new Date("2024-07-21"), endDate: new Date("2025-03-19") }
    ],
    joinDate: new Date("2024-04-21"),
    createdAt: new Date("2024-04-21"),
    updatedAt: new Date("2025-03-25")
  },

  {
    id: "ccc-015",
    name: "Peter Parker",
    discord: "peterparker",
    email: "peter.parker@gmail.com",
    github: "peterparker",
    availability: { kind: "range", min: 1, max: 5, status: "BREAK" },
    role: "M",
    currentRoles: [
      { role: "Project Manager", startDate: new Date("2026-06-09"), supervisor: "Peter Parker" },
      { role: "M", startDate: new Date("2026-07-13"), supervisor: "Bruce Wayne" }
    ],
    joinDate: new Date("2026-04-27"),
    createdAt: new Date("2026-04-27"),
    updatedAt: new Date("2026-07-13")
  },

  {
    id: "ccc-016",
    name: "Clark Kent",
    discord: "clarkkent30",
    email: "clark.kent@terpmail.umd.edu",
    github: "clarkkent",
    availability: { kind: "hoursUnknown", status: "ACTIVE" },
    role: "PL",
    currentRoles: [{ role: "PL", startDate: new Date("2026-03-10") }],
    roleHistory: [
      { role: "QA Engineer", startDate: new Date("2022-10-27"), endDate: "Current" }
    ],
    desiredRole: "PL",
    joinDate: new Date("2022-03-12"),
    createdAt: new Date("2022-03-12"),
    updatedAt: new Date("2026-03-10")
  },

  {
    id: "ccc-017",
    name: "Walter White",
    discord: "walterwhite81",
    email: "walter.white@terpmail.umd.edu",
    github: "walterwhite",
    proficiency: { frontEnd: 4, backEnd: 5, design: 2, devOps: 3 },
    availability: { kind: "range", min: 1, max: 5, status: "INACTIVE" },
    role: "Internal VP",
    currentRoles: [{ role: "Internal VP", startDate: new Date("2025-08-18") }],
    desiredRole: "PL",
    joinDate: new Date("2025-07-09"),
    createdAt: new Date("2025-07-09"),
    updatedAt: new Date("2025-08-18")
  },

  {
    id: "ccc-018",
    name: "Michael Scott",
    email: "michaelscott@gmail.com",
    proficiency: { frontEnd: 1, backEnd: 3, design: "X", versionControl: 5, devOps: 3 },
    availability: { kind: "range", min: 6, max: 10, status: "BREAK" },
    role: "Head",
    currentRoles: [{ role: "Head", startDate: new Date("2025-09-29"), supervisor: "Bruce Wayne" }],
    roleHistory: [
      { role: "H", startDate: new Date("2024-04-27"), endDate: new Date("2025-01-06") }
    ],
    joinDate: new Date("2022-12-08"),
    createdAt: new Date("2022-12-08"),
    updatedAt: new Date("2025-09-29")
  },

  {
    id: "ccc-019",
    name: "Dwight Schrute",
    discord: "dwightschrute53",
    email: "dwight.schrute@outlook.com",
    availability: { kind: "range", min: 6, max: 10, status: "ACTIVE" },
    role: "Developer",
    currentRoles: [{ role: "Developer", startDate: new Date("2025-09-11"), supervisor: "Tony Stark" }],
    joinDate: new Date("2022-10-08"),
    createdAt: new Date("2022-10-08"),
    updatedAt: new Date("2025-09-11")
  },

  {
    id: "ccc-020",
    name: "Leslie Knope",
    discord: "leslieknope61",
    email: "leslie.knope@outlook.com",
    proficiency: { frontEnd: 2, backEnd: 1, design: 5, versionControl: "X", devOps: "X" },
    availability: { kind: "hoursUnknown", status: "ACTIVE" },
    role: "Advisor",
    currentRoles: [{ role: "Advisor", startDate: new Date("2026-06-20"), supervisor: "Katniss Everdeen" }],
    roleHistory: [
      { role: "Internal VP", startDate: new Date("2026-02-17"), endDate: new Date("2026-03-18") },
      { role: "Jr. Analyst", startDate: new Date("2026-03-18"), endDate: new Date("2026-06-08") }
    ],
    joinDate: new Date("2025-12-11"),
    createdAt: new Date("2025-12-11"),
    updatedAt: new Date("2026-06-20")
  },

  {
    id: "ccc-021",
    name: "Ron Swanson",
    discord: "ronswanson48",
    email: "ron_swanson@umd.edu",
    github: "ronswanson52",
    availability: { kind: "atLeast", min: 30, status: "ACTIVE" },
    role: "External VP",
    currentRoles: [{ role: "External VP", startDate: new Date("2026-02-13") }],
    roleHistory: [
      { role: "Advisor", startDate: new Date("2025-07-28"), endDate: new Date("2025-12-22") }
    ],
    joinDate: new Date("2025-05-18"),
    createdAt: new Date("2025-05-18"),
    updatedAt: new Date("2026-02-13")
  },

  {
    id: "ccc-022",
    name: "Tyrion Lannister",
    discord: "tyrionlannister",
    email: "tyrionlannister@umd.edu",
    github: "tyrionlannister6",
    availability: { kind: "hoursUnknown", status: "ACTIVE" },
    role: "Jr. Developer",
    currentRoles: [
      { role: "Treasurer", startDate: new Date("2024-07-10"), supervisor: "Bruce Wayne" },
      { role: "Jr. Developer", startDate: new Date("2026-02-12"), supervisor: "Bruce Wayne" }
    ],
    joinDate: new Date("2024-01-20"),
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2026-02-12")
  },

  {
    name: "Arya Stark",
    discord: "aryastark",
    email: "arya_stark@outlook.com",
    proficiency: { frontEnd: "X", backEnd: 4, design: 3, versionControl: 4, devOps: 1 },
    availability: { kind: "range", min: 16, max: 20, status: "ACTIVE" },
    role: "Developer",
    currentRoles: [{ role: "Developer", startDate: new Date("2026-06-27"), supervisor: "Luke Skywalker" }],
    joinDate: new Date("2025-12-12"),
    createdAt: new Date("2025-12-12"),
    updatedAt: new Date("2026-06-27")
  },

  {
    id: "ccc-023",
    name: "Jon Snow",
    email: "jonsnow@outlook.com",
    github: "jonsnow",
    proficiency: { frontEnd: 2, backEnd: "X", design: 5, devOps: 4 },
    availability: { kind: "atLeast", min: 30, status: "ACTIVE" },
    role: "M",
    currentRoles: [{ role: "M", startDate: new Date("2024-08-23"), supervisor: "Michael Scott" }],
    roleHistory: [
      { role: "PL", startDate: new Date("2023-10-11"), endDate: "Current" }
    ],
    joinDate: new Date("2023-02-09"),
    createdAt: new Date("2023-02-09"),
    updatedAt: new Date("2024-08-23")
  },

  {
    id: "ccc-024",
    name: "Lara Croft",
    discord: "laracroft",
    email: "laracroft@umd.edu",
    github: "laracroft",
    availability: { kind: "atLeast", min: 30, status: "ACTIVE" },
    role: "Treasurer",
    currentRoles: [{ role: "Treasurer", startDate: new Date("2022-10-18") }],
    joinDate: new Date("2022-10-11"),
    createdAt: new Date("2022-10-11"),
    updatedAt: new Date("2022-10-18")
  },

  {
    id: "ccc-025",
    name: "Nathan Drake",
    discord: "nathandrake57",
    email: "nathan_drake@outlook.com",
    proficiency: { backEnd: 3, design: "X", versionControl: 5 },
    availability: { kind: "hoursUnknown", status: "ACTIVE" },
    role: "PL",
    currentRoles: [{ role: "PL", startDate: new Date("2026-06-27"), supervisor: "Katniss Everdeen" }],
    joinDate: new Date("2026-04-02"),
    createdAt: new Date("2026-04-02"),
    updatedAt: new Date("2026-06-27")
  },

  {
    id: "ccc-026",
    name: "Samus Aran",
    discord: "samusaran",
    email: "samusaran@outlook.com",
    proficiency: { frontEnd: 3, backEnd: 1, design: 4, versionControl: 2 },
    availability: { kind: "range", min: 16, max: 20, status: "BREAK" },
    role: "Treasurer",
    currentRoles: [{ role: "Treasurer", startDate: new Date("2024-07-18"), supervisor: "Luke Skywalker" }],
    joinDate: new Date("2023-04-29"),
    createdAt: new Date("2023-04-29"),
    updatedAt: new Date("2024-07-18")
  },

  {
    id: "ccc-027",
    name: "Cloud Strife",
    discord: "cloudstrife",
    email: "cloud_strife@outlook.com",
    proficiency: { backEnd: 5, design: 2, versionControl: "X", devOps: 2 },
    availability: { kind: "range", min: 6, max: 10, status: "ACTIVE" },
    role: "Secretary",
    currentRoles: [{ role: "Secretary", startDate: new Date("2026-03-15") }],
    roleHistory: [
      { role: "Advisor", startDate: new Date("2026-01-20"), endDate: new Date("2026-01-29") }
    ],
    joinDate: new Date("2026-01-18"),
    createdAt: new Date("2026-01-18"),
    updatedAt: new Date("2026-03-15")
  },

  {
    id: "ccc-028",
    name: "Tifa Lockhart",
    email: "tifa_lockhart@outlook.com",
    github: "tifalockhart",
    proficiency: { frontEnd: 2, design: 1, versionControl: 3, devOps: 3 },
    availability: { kind: "hoursUnknown", status: "BREAK" },
    role: "TL",
    currentRoles: [
      { role: "TL", startDate: new Date("2024-11-02"), supervisor: "Walter White" },
      { role: "Internal VP", startDate: new Date("2024-11-16"), supervisor: "Sherlock Holmes" },
      { role: "TL", startDate: new Date("2025-10-25"), supervisor: "Leia Organa" }
    ],
    desiredRole: "Internal VP",
    joinDate: new Date("2023-10-20"),
    createdAt: new Date("2023-10-20"),
    updatedAt: new Date("2025-10-25")
  },

  {
    name: "Aloy Nora",
    email: "aloynora@umd.edu",
    github: "aloynora",
    availability: { kind: "range", min: 11, max: 15, status: "ACTIVE" },
    role: "Internal VP",
    currentRoles: [{ role: "Internal VP", startDate: new Date("2026-02-23"), supervisor: "Sherlock Holmes" }],
    roleHistory: [
      { role: "H", startDate: new Date("2025-06-29"), endDate: new Date("2026-01-06") }
    ],
    joinDate: new Date("2024-12-14"),
    createdAt: new Date("2024-12-14"),
    updatedAt: new Date("2026-02-23")
  },

  {
    id: "ccc-029",
    name: "Geralt Rivia",
    discord: "geraltrivia45",
    email: "geralt.rivia@gmail.com",
    github: "geraltrivia15",
    availability: { kind: "range", min: 16, max: 20, status: "BREAK" },
    role: "Internal VP",
    currentRoles: [{ role: "Internal VP", startDate: new Date("2024-05-11") }],
    joinDate: new Date("2022-06-01"),
    createdAt: new Date("2022-06-01"),
    updatedAt: new Date("2024-05-11")
  },

  {
    name: "Ciri Cintra",
    email: "ciricintra@umd.edu",
    github: "ciricintra47",
    availability: { kind: "range", min: 11, max: 15, status: "ACTIVE" },
    role: "Treasurer",
    currentRoles: [
      { role: "External VP", startDate: new Date("2023-03-06"), supervisor: "Katniss Everdeen" },
      { role: "Treasurer", startDate: new Date("2025-12-25"), supervisor: "Bruce Wayne" }
    ],
    joinDate: new Date("2023-02-25"),
    createdAt: new Date("2023-02-25"),
    updatedAt: new Date("2025-12-25")
  },

  {
    name: "Ellie Williams",
    discord: "elliewilliams",
    email: "ellie_williams@terpmail.umd.edu",
    github: "elliewilliams",
    availability: { kind: "lessThan", max: 5, status: "ACTIVE" },
    role: "Jr. Developer",
    currentRoles: [{ role: "Jr. Developer", startDate: new Date("2025-12-31"), supervisor: "Peter Parker" }],
    desiredRole: "Internal VP",
    joinDate: new Date("2025-01-31"),
    createdAt: new Date("2025-01-31"),
    updatedAt: new Date("2025-12-31")
  },

  {
    name: "Joel Miller",
    discord: "joelmiller",
    email: "joel.miller@outlook.com",
    proficiency: { frontEnd: 3, design: 2, versionControl: 3 },
    availability: { kind: "hoursUnknown", status: "ACTIVE" },
    role: "Developer",
    currentRoles: [{ role: "Developer", startDate: new Date("2025-05-30"), supervisor: "Walter White" }],
    roleHistory: [
      { role: "Designer", startDate: new Date("2024-07-07"), endDate: new Date("2025-05-13") }
    ],
    joinDate: new Date("2024-03-24"),
    createdAt: new Date("2024-03-24"),
    updatedAt: new Date("2025-05-30")
  },

  {
    id: "ccc-030",
    name: "Gordon Freeman",
    discord: "gordonfreeman96",
    email: "gordonfreeman@umd.edu",
    github: "gordonfreeman",
    proficiency: { frontEnd: 2, backEnd: 5, design: 3, versionControl: 5, devOps: "X" },
    availability: { kind: "atLeast", min: 25, status: "ACTIVE" },
    role: "External VP",
    currentRoles: [{ role: "External VP", startDate: new Date("2026-04-30") }],
    roleHistory: [
      { role: "Jr. Analyst", startDate: new Date("2024-01-16"), endDate: new Date("2025-05-02") },
      { role: "PL", startDate: new Date("2025-05-02"), endDate: new Date("2025-07-08") }
    ],
    joinDate: new Date("2023-01-02"),
    createdAt: new Date("2023-01-02"),
    updatedAt: new Date("2026-04-30")
  },

  {
    id: "ccc-031",
    name: "Alyx Vance",
    discord: "alyxvance",
    email: "alyx_vance@gmail.com",
    github: "alyxvance8",
    proficiency: { backEnd: 5, design: 3, devOps: 4 },
    availability: { kind: "range", min: 1, max: 5, status: "ACTIVE" },
    role: "PL",
    currentRoles: [
      { role: "Project Manager", startDate: new Date("2025-03-30"), supervisor: "Clark Kent" },
      { role: "PL", startDate: new Date("2025-05-19") }
    ],
    joinDate: new Date("2023-06-27"),
    createdAt: new Date("2023-06-27"),
    updatedAt: new Date("2025-05-19")
  },

  {
    id: "ccc-032",
    name: "Marcus Fenix",
    discord: "marcusfenix",
    email: "marcus_fenix@outlook.com",
    github: "marcusfenix86",
    proficiency: { frontEnd: "X", backEnd: 4, design: 4, versionControl: "X", devOps: 3 },
    availability: { kind: "atLeast", min: 20, status: "ACTIVE" },
    role: "TL",
    currentRoles: [
      { role: "TL", startDate: new Date("2025-05-17") },
      { role: "TL", startDate: new Date("2026-02-18"), supervisor: "Bruce Wayne" }
    ],
    roleHistory: [
      { role: "External VP", startDate: new Date("2024-01-28"), endDate: "Current" }
    ],
    desiredRole: "PL",
    joinDate: new Date("2022-11-12"),
    createdAt: new Date("2022-11-12"),
    updatedAt: new Date("2026-02-18")
  },

  {
    name: "Kratos Sparta",
    email: "kratossparta@gmail.com",
    proficiency: { frontEnd: 1, design: 2, versionControl: 5, devOps: 2 },
    availability: { kind: "lessThan", max: 2, status: "INACTIVE" },
    role: "PL",
    currentRoles: [{ role: "PL", startDate: new Date("2026-07-15") }],
    roleHistory: [
      { role: "Developer", startDate: new Date("2024-09-07"), endDate: new Date("2025-08-30") },
      { role: "QA Engineer", startDate: new Date("2025-08-30"), endDate: new Date("2026-02-27") }
    ],
    joinDate: new Date("2023-05-15"),
    createdAt: new Date("2023-05-15"),
    updatedAt: new Date("2026-07-15")
  },

  {
    id: "ccc-033",
    name: "Atreus Sparta",
    email: "atreussparta@outlook.com",
    github: "atreussparta80",
    proficiency: { frontEnd: 3, backEnd: 4, design: 3, versionControl: 4, devOps: 3 },
    availability: { kind: "range", min: 1, max: 5, status: "BREAK" },
    role: "Secretary",
    currentRoles: [{ role: "Secretary", startDate: new Date("2026-04-17"), supervisor: "Frodo Baggins" }],
    roleHistory: [
      { role: "H", startDate: new Date("2023-04-13"), endDate: new Date("2023-07-07") },
      { role: "Treasurer", startDate: new Date("2023-07-07"), endDate: new Date("2024-03-27") }
    ],
    joinDate: new Date("2022-12-09"),
    createdAt: new Date("2022-12-09"),
    updatedAt: new Date("2026-04-17")
  },

  {
    id: "ccc-034",
    name: "Arthur Morgan",
    discord: "arthurmorgan57",
    email: "arthurmorgan@terpmail.umd.edu",
    github: "arthurmorgan",
    proficiency: { frontEnd: 3, backEnd: "X", versionControl: 3, devOps: 5 },
    availability: { kind: "hoursUnknown", status: "ACTIVE" },
    role: "Analyst",
    currentRoles: [{ role: "Analyst", startDate: new Date("2026-06-20"), supervisor: "Luke Skywalker" }],
    joinDate: new Date("2023-11-10"),
    createdAt: new Date("2023-11-10"),
    updatedAt: new Date("2026-06-20")
  },

  {
    id: "ccc-035",
    name: "John Marston",
    email: "johnmarston@terpmail.umd.edu",
    github: "johnmarston",
    proficiency: { frontEnd: 1, design: 5, versionControl: 3, devOps: 4 },
    availability: { kind: "atLeast", min: 25, status: "ACTIVE" },
    role: "Secretary",
    currentRoles: [{ role: "Secretary", startDate: new Date("2026-02-04") }],
    roleHistory: [
      { role: "Secretary", startDate: new Date("2024-11-16"), endDate: new Date("2025-07-16") }
    ],
    joinDate: new Date("2024-07-01"),
    createdAt: new Date("2024-07-01"),
    updatedAt: new Date("2026-02-04")
  },

  {
    id: "ccc-036",
    name: "Ezio Auditore",
    discord: "ezioauditore13",
    email: "ezio_auditore@gmail.com",
    availability: { kind: "range", min: 11, max: 15, status: "ACTIVE" },
    role: "External VP",
    currentRoles: [{ role: "External VP", startDate: new Date("2026-05-17"), supervisor: "Sherlock Holmes" }],
    roleHistory: [
      { role: "PL", startDate: new Date("2026-01-06"), endDate: new Date("2026-04-30") }
    ],
    joinDate: new Date("2025-04-04"),
    createdAt: new Date("2025-04-04"),
    updatedAt: new Date("2026-05-17")
  },

  {
    id: "ccc-037",
    name: "Bayek Siwa",
    discord: "bayeksiwa73",
    email: "bayek.siwa@terpmail.umd.edu",
    availability: { kind: "range", min: 16, max: 20, status: "ACTIVE" },
    role: "PL",
    currentRoles: [
      { role: "SL", startDate: new Date("2026-03-08"), supervisor: "Ellen Ripley" },
      { role: "PL", startDate: new Date("2026-06-11"), supervisor: "Diana Prince" }
    ],
    roleHistory: [
      { role: "M", startDate: new Date("2025-01-25"), endDate: new Date("2025-08-18") },
      { role: "Developer", startDate: new Date("2025-08-18"), endDate: new Date("2026-03-05") }
    ],
    joinDate: new Date("2022-11-18"),
    createdAt: new Date("2022-11-18"),
    updatedAt: new Date("2026-06-11")
  },

  {
    id: "ccc-038",
    name: "Kassandra Sparta",
    discord: "kassandrasparta",
    email: "kassandra_sparta@umd.edu",
    github: "kassandrasparta",
    proficiency: { frontEnd: 3, backEnd: 3, design: 2, versionControl: 2, devOps: 5 },
    availability: { kind: "hoursUnknown", status: "ACTIVE" },
    role: "Analyst",
    currentRoles: [{ role: "Analyst", startDate: new Date("2026-01-01") }],
    joinDate: new Date("2024-02-27"),
    createdAt: new Date("2024-02-27"),
    updatedAt: new Date("2026-01-01")
  },

  {
    id: "ccc-039",
    name: "Eivor Varin",
    discord: "eivorvarin",
    email: "eivorvarin@outlook.com",
    availability: { kind: "range", min: 1, max: 5, status: "BREAK" },
    role: "External VP",
    currentRoles: [
      { role: "Developer", startDate: new Date("2024-02-02"), supervisor: "Leia Organa" },
      { role: "External VP", startDate: new Date("2026-07-14") }
    ],
    desiredRole: "Head",
    joinDate: new Date("2023-09-06"),
    createdAt: new Date("2023-09-06"),
    updatedAt: new Date("2026-07-14")
  },

  {
    name: "Senua Orkney",
    discord: "senuaorkney87",
    email: "senua_orkney@outlook.com",
    github: "senuaorkney",
    proficiency: { frontEnd: 3, backEnd: 2, design: "X", versionControl: 3, devOps: 3 },
    availability: { kind: "hoursUnknown", status: "BREAK" },
    role: "Advisor",
    currentRoles: [{ role: "Advisor", startDate: new Date("2026-05-31") }],
    joinDate: new Date("2024-08-01"),
    createdAt: new Date("2024-08-01"),
    updatedAt: new Date("2026-05-31")
  },

  {
    name: "Jodie Holmes",
    discord: "jodieholmes83",
    email: "jodie.holmes@gmail.com",
    github: "jodieholmes",
    proficiency: { design: "X", versionControl: 3, devOps: "X" },
    availability: { kind: "lessThan", max: 1, status: "INACTIVE" },
    role: "Jr. Developer",
    currentRoles: [{ role: "Jr. Developer", startDate: new Date("2023-03-12") }],
    desiredRole: "Head",
    joinDate: new Date("2022-06-13"),
    createdAt: new Date("2022-06-13"),
    updatedAt: new Date("2023-03-12")
  },

  {
    name: "Rick Deckard",
    discord: "rickdeckard40",
    email: "rick.deckard@umd.edu",
    github: "rickdeckard1",
    availability: { kind: "hoursUnknown", status: "ACTIVE" },
    role: "Project Manager",
    currentRoles: [{ role: "Project Manager", startDate: new Date("2026-03-18"), supervisor: "Diana Prince" }],
    roleHistory: [
      { role: "Designer", startDate: new Date("2025-03-27"), endDate: new Date("2025-12-14") },
      { role: "Jr. Developer", startDate: new Date("2025-12-14"), endDate: new Date("2026-02-12") }
    ],
    joinDate: new Date("2024-08-11"),
    createdAt: new Date("2024-08-11"),
    updatedAt: new Date("2026-03-18")
  },

  {
    id: "ccc-040",
    name: "Sarah Connor",
    discord: "sarahconnor39",
    email: "sarahconnor@umd.edu",
    github: "sarahconnor",
    proficiency: { frontEnd: 2, backEnd: 2, design: "X", versionControl: 4, devOps: 4 },
    availability: { kind: "hoursUnknown", status: "ACTIVE" },
    role: "External VP",
    currentRoles: [{ role: "External VP", startDate: new Date("2023-08-01"), supervisor: "Diana Prince" }],
    joinDate: new Date("2022-01-26"),
    createdAt: new Date("2022-01-26"),
    updatedAt: new Date("2023-08-01")
  },

  {
    id: "ccc-041",
    name: "John Wick",
    discord: "johnwick25",
    email: "john_wick@gmail.com",
    github: "johnwick",
    availability: { kind: "hoursUnknown", status: "ACTIVE" },
    role: "Analyst",
    currentRoles: [
      { role: "Internal VP", startDate: new Date("2024-11-05"), supervisor: "Diana Prince" },
      { role: "Analyst", startDate: new Date("2026-07-21"), supervisor: "Walter White" }
    ],
    joinDate: new Date("2024-09-24"),
    createdAt: new Date("2024-09-24"),
    updatedAt: new Date("2026-07-21")
  },

  {
    id: "ccc-042",
    name: "Marty McFly",
    discord: "martymcfly",
    email: "marty_mcfly@outlook.com",
    github: "martymcfly67",
    proficiency: { backEnd: 4, design: 4, devOps: 2 },
    availability: { kind: "range", min: 16, max: 20, status: "ACTIVE" },
    role: "Analyst",
    currentRoles: [{ role: "Analyst", startDate: new Date("2026-02-12"), supervisor: "Frodo Baggins" }],
    roleHistory: [
      { role: "Developer", startDate: new Date("2025-12-13"), endDate: new Date("2025-12-16") }
    ],
    joinDate: new Date("2025-12-08"),
    createdAt: new Date("2025-12-08"),
    updatedAt: new Date("2026-02-12")
  },

  {
    id: "ccc-043",
    name: "Emmett Brown",
    discord: "emmettbrown",
    email: "emmett_brown@outlook.com",
    github: "emmettbrown99",
    proficiency: { frontEnd: 4, backEnd: 2, versionControl: 5, devOps: 2 },
    availability: { kind: "lessThan", max: 2, status: "ACTIVE" },
    role: "Advisor",
    currentRoles: [{ role: "Advisor", startDate: new Date("2026-05-25"), supervisor: "Frodo Baggins" }],
    roleHistory: [
      { role: "SL", startDate: new Date("2023-10-03"), endDate: new Date("2023-11-21") }
    ],
    joinDate: new Date("2023-07-03"),
    createdAt: new Date("2023-07-03"),
    updatedAt: new Date("2026-05-25")
  },

  {
    id: "ccc-044",
    name: "Indiana Jones",
    discord: "indianajones26",
    email: "indianajones@umd.edu",
    proficiency: { frontEnd: 3, design: "X", versionControl: 5, devOps: 1 },
    availability: { kind: "range", min: 16, max: 20, status: "INACTIVE" },
    role: "Developer",
    currentRoles: [{ role: "Developer", startDate: new Date("2026-07-15") }],
    roleHistory: [
      { role: "Sr. Developer", startDate: new Date("2025-09-09"), endDate: new Date("2025-09-20") },
      { role: "Developer", startDate: new Date("2025-09-20"), endDate: new Date("2025-11-18") }
    ],
    desiredRole: "TL",
    joinDate: new Date("2025-06-11"),
    createdAt: new Date("2025-06-11"),
    updatedAt: new Date("2026-07-15")
  },

  {
    id: "ccc-045",
    name: "Furiosa Jabassa",
    discord: "furiosajabassa",
    email: "furiosa_jabassa@terpmail.umd.edu",
    proficiency: { frontEnd: 1, backEnd: 2, versionControl: 5, devOps: 5 },
    availability: { kind: "hoursUnknown", status: "ACTIVE" },
    role: "External VP",
    currentRoles: [{ role: "External VP", startDate: new Date("2025-03-18"), supervisor: "Tony Stark" }],
    joinDate: new Date("2022-09-11"),
    createdAt: new Date("2022-09-11"),
    updatedAt: new Date("2025-03-18")
  },

  {
    id: "ccc-046",
    name: "Ada Lovelace",
    email: "adalovelace@outlook.com",
    availability: { kind: "range", min: 1, max: 5, status: "ACTIVE" },
    role: "Designer",
    currentRoles: [
      { role: "Jr. Analyst", startDate: new Date("2025-04-10"), supervisor: "Frodo Baggins" },
      { role: "Designer", startDate: new Date("2025-11-08"), supervisor: "Katniss Everdeen" }
    ],
    joinDate: new Date("2022-07-05"),
    createdAt: new Date("2022-07-05"),
    updatedAt: new Date("2025-11-08")
  },

  {
    id: "ccc-047",
    name: "Alan Turing",
    discord: "alanturing",
    email: "alanturing@gmail.com",
    github: "alanturing66",
    availability: { kind: "hoursUnknown", status: "INACTIVE" },
    role: "Head",
    currentRoles: [{ role: "Head", startDate: new Date("2024-10-02") }],
    desiredRole: "Sr. Developer",
    joinDate: new Date("2023-10-07"),
    createdAt: new Date("2023-10-07"),
    updatedAt: new Date("2024-10-02")
  },

  {
    id: "ccc-048",
    name: "Grace Hopper",
    discord: "gracehopper",
    email: "grace.hopper@terpmail.umd.edu",
    github: "gracehopper",
    availability: { kind: "lessThan", max: 5, status: "ACTIVE" },
    role: "Head",
    currentRoles: [{ role: "Head", startDate: new Date("2025-11-16"), supervisor: "Sherlock Holmes" }],
    roleHistory: [
      { role: "TL", startDate: new Date("2025-05-31"), endDate: new Date("2025-08-10") }
    ],
    joinDate: new Date("2025-05-01"),
    createdAt: new Date("2025-05-01"),
    updatedAt: new Date("2025-11-16")
  },

  {
    id: "ccc-049",
    name: "Katherine Johnson",
    discord: "katherinejohnson29",
    email: "katherinejohnson@terpmail.umd.edu",
    availability: { kind: "range", min: 16, max: 20, status: "ACTIVE" },
    role: "Secretary",
    currentRoles: [{ role: "Secretary", startDate: new Date("2025-06-24"), supervisor: "Ellen Ripley" }],
    roleHistory: [
      { role: "Jr. Analyst", startDate: new Date("2023-11-28"), endDate: new Date("2025-05-09") }
    ],
    joinDate: new Date("2023-09-06"),
    createdAt: new Date("2023-09-06"),
    updatedAt: new Date("2025-06-24")
  },

  {
    name: "Marie Curie",
    discord: "mariecurie",
    email: "marie_curie@umd.edu",
    github: "mariecurie",
    proficiency: { frontEnd: "X", backEnd: 5, design: 5, devOps: 2 },
    availability: { kind: "atLeast", min: 30, status: "ACTIVE" },
    role: "PL",
    currentRoles: [{ role: "PL", startDate: new Date("2025-04-24"), supervisor: "Peter Parker" }],
    joinDate: new Date("2024-03-03"),
    createdAt: new Date("2024-03-03"),
    updatedAt: new Date("2025-04-24")
  },

  {
    id: "ccc-050",
    name: "Rosalind Franklin",
    discord: "rosalindfranklin",
    email: "rosalindfranklin@outlook.com",
    availability: { kind: "range", min: 11, max: 15, status: "ACTIVE" },
    role: "External VP",
    currentRoles: [
      { role: "Designer", startDate: new Date("2025-07-28"), supervisor: "Diana Prince" },
      { role: "Project Manager", startDate: new Date("2025-09-17"), supervisor: "Tony Stark" },
      { role: "External VP", startDate: new Date("2025-10-21") }
    ],
    roleHistory: [
      { role: "Developer", startDate: new Date("2023-06-26"), endDate: new Date("2023-08-28") },
      { role: "Advisor", startDate: new Date("2023-08-28"), endDate: new Date("2025-06-18") }
    ],
    joinDate: new Date("2023-01-22"),
    createdAt: new Date("2023-01-22"),
    updatedAt: new Date("2025-10-21")
  },

  {
    id: "ccc-051",
    name: "Nikola Tesla",
    discord: "nikolatesla14",
    email: "nikola_tesla@outlook.com",
    github: "nikolatesla",
    proficiency: { design: 5, versionControl: "X", devOps: 5 },
    availability: { kind: "atLeast", min: 15, status: "ACTIVE" },
    role: "Developer",
    currentRoles: [{ role: "Developer", startDate: new Date("2026-05-10"), supervisor: "Michael Scott" }],
    roleHistory: [
      { role: "Developer", startDate: new Date("2025-09-19"), endDate: new Date("2026-05-08") }
    ],
    desiredRole: "PL",
    joinDate: new Date("2024-05-23"),
    createdAt: new Date("2024-05-23"),
    updatedAt: new Date("2026-05-10")
  },

  {
    id: "ccc-052",
    name: "Albert Einstein",
    discord: "alberteinstein",
    email: "albert.einstein@umd.edu",
    proficiency: { frontEnd: "X", backEnd: 4, design: 1, versionControl: 4, devOps: 4 },
    availability: { kind: "range", min: 16, max: 20, status: "ACTIVE" },
    role: "Advisor",
    currentRoles: [{ role: "Advisor", startDate: new Date("2025-06-03") }],
    joinDate: new Date("2025-02-01"),
    createdAt: new Date("2025-02-01"),
    updatedAt: new Date("2025-06-03")
  },

  {
    id: "ccc-053",
    name: "Isaac Newton",
    discord: "isaacnewton",
    email: "isaacnewton@outlook.com",
    github: "isaacnewton",
    proficiency: { backEnd: 2, design: 3, versionControl: 1, devOps: 5 },
    availability: { kind: "range", min: 6, max: 10, status: "ACTIVE" },
    role: "Analyst",
    currentRoles: [
      { role: "M", startDate: new Date("2025-10-23"), supervisor: "Bruce Wayne" },
      { role: "Analyst", startDate: new Date("2025-12-08"), supervisor: "Sherlock Holmes" }
    ],
    roleHistory: [
      { role: "Project Manager", startDate: new Date("2025-02-28"), endDate: "Current" }
    ],
    joinDate: new Date("2024-12-04"),
    createdAt: new Date("2024-12-04"),
    updatedAt: new Date("2025-12-08")
  },

  {
    id: "ccc-054",
    name: "Charles Darwin",
    discord: "charlesdarwin",
    email: "charlesdarwin@umd.edu",
    github: "charlesdarwin",
    proficiency: { frontEnd: 1, backEnd: 1, design: 2, versionControl: 1, devOps: "X" },
    availability: { kind: "range", min: 16, max: 20, status: "ACTIVE" },
    role: "External VP",
    currentRoles: [{ role: "External VP", startDate: new Date("2024-03-12") }],
    joinDate: new Date("2022-10-07"),
    createdAt: new Date("2022-10-07"),
    updatedAt: new Date("2024-03-12")
  },

  {
    id: "ccc-055",
    name: "Carl Sagan",
    discord: "carlsagan",
    email: "carl_sagan@outlook.com",
    github: "carlsagan47",
    availability: { kind: "hoursUnknown", status: "ACTIVE" },
    role: "Sr. Developer",
    currentRoles: [
      { role: "Project Manager", startDate: new Date("2025-04-05") },
      { role: "Sr. Developer", startDate: new Date("2026-04-08"), supervisor: "Luke Skywalker" }
    ],
    roleHistory: [
      { role: "Advisor", startDate: new Date("2024-04-25"), endDate: new Date("2024-07-06") }
    ],
    joinDate: new Date("2024-04-17"),
    createdAt: new Date("2024-04-17"),
    updatedAt: new Date("2026-04-08")
  },

  {
    id: "ccc-056",
    name: "Jane Goodall",
    discord: "janegoodall",
    email: "janegoodall@umd.edu",
    github: "janegoodall",
    availability: { kind: "range", min: 11, max: 15, status: "ACTIVE" },
    role: "Developer",
    currentRoles: [{ role: "Developer", startDate: new Date("2025-02-23"), supervisor: "Bruce Wayne" }],
    roleHistory: [
      { role: "Designer", startDate: new Date("2023-12-12"), endDate: new Date("2024-05-16") },
      { role: "Internal VP", startDate: new Date("2024-05-16"), endDate: new Date("2024-11-20") }
    ],
    joinDate: new Date("2022-07-30"),
    createdAt: new Date("2022-07-30"),
    updatedAt: new Date("2025-02-23")
  },

  {
    id: "ccc-057",
    name: "Stephen Hawking",
    email: "stephen.hawking@terpmail.umd.edu",
    proficiency: { frontEnd: "X", backEnd: 4, design: 1, versionControl: 5, devOps: 5 },
    availability: { kind: "range", min: 11, max: 15, status: "BREAK" },
    role: "Head",
    currentRoles: [
      { role: "Internal VP", startDate: new Date("2024-03-13"), supervisor: "Katniss Everdeen" },
      { role: "Head", startDate: new Date("2025-11-17") }
    ],
    desiredRole: "Project Manager",
    joinDate: new Date("2022-04-21"),
    createdAt: new Date("2022-04-21"),
    updatedAt: new Date("2025-11-17")
  },

  {
    id: "ccc-058",
    name: "Richard Feynman",
    email: "richardfeynman@terpmail.umd.edu",
    proficiency: { frontEnd: 3, backEnd: 5, design: 4, versionControl: "X", devOps: 1 },
    availability: { kind: "hoursUnknown", status: "ACTIVE" },
    role: "Secretary",
    currentRoles: [{ role: "Secretary", startDate: new Date("2026-01-20"), supervisor: "Katniss Everdeen" }],
    joinDate: new Date("2024-12-18"),
    createdAt: new Date("2024-12-18"),
    updatedAt: new Date("2026-01-20")
  },

  {
    id: "ccc-059",
    name: "Emmy Noether",
    email: "emmy.noether@outlook.com",
    proficiency: { frontEnd: 1, design: 5, versionControl: 4, devOps: 1 },
    availability: { kind: "range", min: 11, max: 15, status: "ACTIVE" },
    role: "Head",
    currentRoles: [{ role: "Head", startDate: new Date("2026-03-20"), supervisor: "Leia Organa" }],
    roleHistory: [
      { role: "SL", startDate: new Date("2025-06-19"), endDate: new Date("2025-10-12") }
    ],
    joinDate: new Date("2025-03-06"),
    createdAt: new Date("2025-03-06"),
    updatedAt: new Date("2026-03-20")
  },

  {
    id: "ccc-060",
    name: "Barbara McClintock",
    email: "barbara_mcclintock@terpmail.umd.edu",
    github: "barbaramcclintock",
    proficiency: { frontEnd: 1, backEnd: 4, design: 3, versionControl: 5, devOps: 1 },
    availability: { kind: "range", min: 16, max: 20, status: "ACTIVE" },
    role: "Jr. Analyst",
    currentRoles: [{ role: "Jr. Analyst", startDate: new Date("2024-10-15") }],
    joinDate: new Date("2022-12-31"),
    createdAt: new Date("2022-12-31"),
    updatedAt: new Date("2024-10-15")
  },

  {
    id: "ccc-061",
    name: "Dorothy Vaughan",
    discord: "dorothyvaughan79",
    email: "dorothy_vaughan@outlook.com",
    availability: { kind: "atLeast", min: 30, status: "UNKNOWN" },
    role: "Secretary",
    currentRoles: [{ role: "Secretary", startDate: new Date("2026-07-04") }],
    joinDate: new Date("2024-01-06"),
    createdAt: new Date("2024-01-06"),
    updatedAt: new Date("2026-07-04")
  },

  {
    id: "ccc-062",
    name: "Mary Jackson",
    email: "mary_jackson@umd.edu",
    github: "maryjackson",
    availability: { kind: "range", min: 16, max: 20, status: "INACTIVE" },
    role: "Head",
    currentRoles: [{ role: "Head", startDate: new Date("2026-06-09"), supervisor: "Bruce Wayne" }],
    joinDate: new Date("2025-10-04"),
    createdAt: new Date("2025-10-04"),
    updatedAt: new Date("2026-06-09")
  },

  {
    id: "ccc-063",
    name: "Margaret Hamilton",
    discord: "margarethamilton42",
    email: "margaret.hamilton@umd.edu",
    proficiency: { frontEnd: 5, design: 1, versionControl: 4, devOps: 4 },
    availability: { kind: "hoursUnknown", status: "ACTIVE" },
    role: "Developer",
    currentRoles: [
      { role: "TL", startDate: new Date("2026-05-28"), supervisor: "Walter White" },
      { role: "Developer", startDate: new Date("2026-07-22"), supervisor: "Sherlock Holmes" }
    ],
    roleHistory: [
      { role: "Jr. Developer", startDate: new Date("2026-02-09"), endDate: new Date("2026-04-06") },
      { role: "PL", startDate: new Date("2026-04-06"), endDate: new Date("2026-04-16") }
    ],
    desiredRole: "Advisor",
    joinDate: new Date("2025-11-18"),
    createdAt: new Date("2025-11-18"),
    updatedAt: new Date("2026-07-22")
  },

  {
    id: "ccc-064",
    name: "Radia Perlman",
    email: "radia.perlman@gmail.com",
    proficiency: { frontEnd: 5, backEnd: "X", design: 5, versionControl: 1, devOps: 1 },
    availability: { kind: "range", min: 11, max: 15, status: "ACTIVE" },
    role: "Designer",
    currentRoles: [{ role: "Designer", startDate: new Date("2025-11-09"), supervisor: "Clark Kent" }],
    desiredRole: "SL",
    joinDate: new Date("2025-09-12"),
    createdAt: new Date("2025-09-12"),
    updatedAt: new Date("2025-11-09")
  },

  {
    id: "ccc-065",
    name: "Barbara Liskov",
    discord: "barbaraliskov6",
    email: "barbaraliskov@terpmail.umd.edu",
    github: "barbaraliskov",
    availability: { kind: "range", min: 6, max: 10, status: "ACTIVE" },
    role: "Secretary",
    currentRoles: [{ role: "Secretary", startDate: new Date("2026-06-17") }],
    desiredRole: "Sr. Developer",
    joinDate: new Date("2026-03-15"),
    createdAt: new Date("2026-03-15"),
    updatedAt: new Date("2026-06-17")
  },

  {
    id: "ccc-066",
    name: "Frances Allen",
    discord: "francesallen",
    email: "frances.allen@umd.edu",
    proficiency: { frontEnd: 5, backEnd: 3, design: "X", versionControl: 4, devOps: 1 },
    availability: { kind: "atLeast", min: 25, status: "ACTIVE" },
    role: "Advisor",
    currentRoles: [
      { role: "External VP", startDate: new Date("2026-07-08"), supervisor: "Sherlock Holmes" },
      { role: "Advisor", startDate: new Date("2026-08-02"), supervisor: "Ellen Ripley" }
    ],
    roleHistory: [
      { role: "Analyst", startDate: new Date("2026-05-05"), endDate: new Date("2026-06-15") },
      { role: "TL", startDate: new Date("2026-06-15"), endDate: new Date("2026-06-24") }
    ],
    joinDate: new Date("2026-04-27"),
    createdAt: new Date("2026-04-27"),
    updatedAt: new Date("2026-08-02")
  },

  {
    name: "Shafi Goldwasser",
    discord: "shafigoldwasser",
    email: "shafi.goldwasser@outlook.com",
    availability: { kind: "range", min: 16, max: 20, status: "ACTIVE" },
    role: "Analyst",
    currentRoles: [{ role: "Analyst", startDate: new Date("2025-01-23"), supervisor: "Sherlock Holmes" }],
    joinDate: new Date("2024-12-12"),
    createdAt: new Date("2024-12-12"),
    updatedAt: new Date("2025-01-23")
  },

  {
    id: "ccc-067",
    name: "Donald Knuth",
    discord: "donaldknuth",
    email: "donald_knuth@umd.edu",
    github: "donaldknuth94",
    proficiency: { frontEnd: 2, backEnd: 5, design: 2, versionControl: 5 },
    availability: { kind: "range", min: 6, max: 10, status: "BREAK" },
    role: "Secretary",
    currentRoles: [{ role: "Secretary", startDate: new Date("2026-03-03"), supervisor: "Diana Prince" }],
    joinDate: new Date("2022-01-15"),
    createdAt: new Date("2022-01-15"),
    updatedAt: new Date("2026-03-03")
  },

  {
    id: "ccc-068",
    name: "Ken Thompson",
    discord: "kenthompson27",
    email: "kenthompson@gmail.com",
    proficiency: { frontEnd: 1, backEnd: 1, versionControl: 5, devOps: "X" },
    availability: { kind: "range", min: 16, max: 20, status: "ACTIVE" },
    role: "H",
    currentRoles: [{ role: "H", startDate: new Date("2024-05-28"), supervisor: "Hermione Granger" }],
    joinDate: new Date("2022-10-14"),
    createdAt: new Date("2022-10-14"),
    updatedAt: new Date("2024-05-28")
  },

  {
    id: "ccc-069",
    name: "Dennis Ritchie",
    discord: "dennisritchie",
    email: "dennis_ritchie@umd.edu",
    github: "dennisritchie",
    proficiency: { frontEnd: "X", backEnd: 2, design: 1, versionControl: 5, devOps: 5 },
    availability: { kind: "atLeast", min: 15, status: "ACTIVE" },
    role: "SL",
    currentRoles: [{ role: "SL", startDate: new Date("2026-06-08") }],
    joinDate: new Date("2025-09-27"),
    createdAt: new Date("2025-09-27"),
    updatedAt: new Date("2026-06-08")
  },

  {
    name: "Linus Torvalds",
    discord: "linustorvalds37",
    email: "linus.torvalds@terpmail.umd.edu",
    availability: { kind: "range", min: 6, max: 10, status: "INACTIVE" },
    role: "Internal VP",
    currentRoles: [
      { role: "SL", startDate: new Date("2026-06-05"), supervisor: "Peter Parker" },
      { role: "Internal VP", startDate: new Date("2026-07-16"), supervisor: "Katniss Everdeen" }
    ],
    roleHistory: [
      { role: "Sr. Developer", startDate: new Date("2026-01-18"), endDate: "Current" }
    ],
    joinDate: new Date("2025-09-05"),
    createdAt: new Date("2025-09-05"),
    updatedAt: new Date("2026-07-16")
  },

  {
    id: "ccc-070",
    name: "Vint Cerf",
    email: "vintcerf@outlook.com",
    github: "vintcerf",
    proficiency: { frontEnd: 5, backEnd: 3, design: "X", devOps: 1 },
    availability: { kind: "range", min: 11, max: 15, status: "ACTIVE" },
    role: "Head",
    currentRoles: [{ role: "Head", startDate: new Date("2026-02-04"), supervisor: "Walter White" }],
    roleHistory: [
      { role: "Analyst", startDate: new Date("2022-09-30"), endDate: new Date("2025-02-14") }
    ],
    desiredRole: "Internal VP",
    joinDate: new Date("2022-04-21"),
    createdAt: new Date("2022-04-21"),
    updatedAt: new Date("2026-02-04")
  },

  {
    id: "ccc-071",
    name: "Bob Kahn",
    discord: "bobkahn66",
    email: "bobkahn@umd.edu",
    github: "bobkahn",
    proficiency: { backEnd: "X", design: 4, versionControl: 5 },
    availability: { kind: "atLeast", min: 20, status: "UNKNOWN" },
    role: "Head",
    currentRoles: [{ role: "Head", startDate: new Date("2026-07-19") }],
    joinDate: new Date("2025-09-28"),
    createdAt: new Date("2025-09-28"),
    updatedAt: new Date("2026-07-19")
  },

  {
    name: "Guido van Rossum",
    email: "guidovanrossum@terpmail.umd.edu",
    proficiency: { frontEnd: 5, design: "X", versionControl: "X", devOps: 5 },
    availability: { kind: "range", min: 1, max: 5, status: "ACTIVE" },
    role: "M",
    currentRoles: [{ role: "M", startDate: new Date("2024-12-05") }],
    roleHistory: [
      { role: "Jr. Analyst", startDate: new Date("2023-05-21"), endDate: new Date("2024-05-13") }
    ],
    joinDate: new Date("2022-12-10"),
    createdAt: new Date("2022-12-10"),
    updatedAt: new Date("2024-12-05")
  },

  {
    id: "ccc-072",
    name: "Serena Williams",
    email: "serena.williams@outlook.com",
    github: "serenawilliams",
    proficiency: { backEnd: 4, design: 3, versionControl: 5, devOps: 2 },
    availability: { kind: "range", min: 1, max: 5, status: "ACTIVE" },
    role: "Analyst",
    currentRoles: [{ role: "Analyst", startDate: new Date("2025-03-24") }],
    desiredRole: "Head",
    joinDate: new Date("2024-08-12"),
    createdAt: new Date("2024-08-12"),
    updatedAt: new Date("2025-03-24")
  },

  {
    id: "ccc-073",
    name: "Roger Federer",
    discord: "rogerfederer75",
    email: "rogerfederer@outlook.com",
    github: "rogerfederer38",
    proficiency: { backEnd: 3, design: 3, versionControl: 5, devOps: 2 },
    availability: { kind: "atLeast", min: 20, status: "UNKNOWN" },
    role: "Developer",
    currentRoles: [{ role: "Developer", startDate: new Date("2024-04-10") }],
    joinDate: new Date("2023-10-16"),
    createdAt: new Date("2023-10-16"),
    updatedAt: new Date("2024-04-10")
  },

  {
    id: "ccc-074",
    name: "Simone Biles",
    discord: "simonebiles7",
    email: "simonebiles@outlook.com",
    github: "simonebiles61",
    proficiency: { frontEnd: 3, backEnd: "X", versionControl: 1, devOps: 1 },
    availability: { kind: "range", min: 1, max: 5, status: "ACTIVE" },
    role: "Internal VP",
    currentRoles: [{ role: "Internal VP", startDate: new Date("2024-11-12") }],
    joinDate: new Date("2024-05-12"),
    createdAt: new Date("2024-05-12"),
    updatedAt: new Date("2024-11-12")
  },

  {
    id: "ccc-075",
    name: "Usain Bolt",
    email: "usain.bolt@umd.edu",
    github: "usainbolt",
    availability: { kind: "range", min: 6, max: 10, status: "ACTIVE" },
    role: "H",
    currentRoles: [{ role: "H", startDate: new Date("2025-07-24"), supervisor: "Tony Stark" }],
    desiredRole: "TL",
    joinDate: new Date("2025-04-01"),
    createdAt: new Date("2025-04-01"),
    updatedAt: new Date("2025-07-24")
  },

  {
    id: "ccc-076",
    name: "Michael Jordan",
    discord: "michaeljordan",
    email: "michael.jordan@terpmail.umd.edu",
    github: "michaeljordan",
    proficiency: { frontEnd: 5, backEnd: "X", design: 3, versionControl: 3 },
    availability: { kind: "range", min: 1, max: 5, status: "ACTIVE" },
    role: "Project Manager",
    currentRoles: [{ role: "Project Manager", startDate: new Date("2025-11-29"), supervisor: "Hermione Granger" }],
    desiredRole: "Advisor",
    joinDate: new Date("2025-07-04"),
    createdAt: new Date("2025-07-04"),
    updatedAt: new Date("2025-11-29")
  },

  {
    id: "ccc-077",
    name: "Kobe Bryant",
    discord: "kobebryant",
    email: "kobebryant@outlook.com",
    github: "kobebryant",
    proficiency: { backEnd: "X", design: 1, devOps: 5 },
    availability: { kind: "range", min: 1, max: 5, status: "INACTIVE" },
    role: "Developer",
    currentRoles: [{ role: "Developer", startDate: new Date("2026-02-03") }],
    desiredRole: "Internal VP",
    joinDate: new Date("2022-11-04"),
    createdAt: new Date("2022-11-04"),
    updatedAt: new Date("2026-02-03")
  },

  {
    id: "ccc-078",
    name: "Lionel Messi",
    discord: "lionelmessi79",
    email: "lionel.messi@umd.edu",
    github: "lionelmessi",
    availability: { kind: "range", min: 16, max: 20, status: "ACTIVE" },
    role: "Designer",
    currentRoles: [{ role: "Designer", startDate: new Date("2026-08-03") }],
    roleHistory: [
      { role: "SL", startDate: new Date("2025-12-20"), endDate: new Date("2026-02-10") },
      { role: "Internal VP", startDate: new Date("2026-02-10"), endDate: new Date("2026-07-30") }
    ],
    joinDate: new Date("2025-11-02"),
    createdAt: new Date("2025-11-02"),
    updatedAt: new Date("2026-08-03")
  },

  {
    id: "ccc-079",
    name: "Cristiano Ronaldo",
    discord: "cristianoronaldo",
    email: "cristiano.ronaldo@terpmail.umd.edu",
    availability: { kind: "range", min: 1, max: 5, status: "ACTIVE" },
    role: "Jr. Analyst",
    currentRoles: [{ role: "Jr. Analyst", startDate: new Date("2026-08-04"), supervisor: "Jane Smith" }],
    joinDate: new Date("2024-03-12"),
    createdAt: new Date("2024-03-12"),
    updatedAt: new Date("2026-08-04")
  },

  {
    id: "ccc-080",
    name: "Megan Rapinoe",
    discord: "meganrapinoe",
    email: "megan.rapinoe@umd.edu",
    github: "meganrapinoe84",
    proficiency: { frontEnd: 5, backEnd: "X", design: 2, devOps: 5 },
    availability: { kind: "range", min: 11, max: 15, status: "ACTIVE" },
    role: "Jr. Developer",
    currentRoles: [{ role: "Jr. Developer", startDate: new Date("2025-11-13"), supervisor: "Michael Scott" }],
    desiredRole: "TL",
    joinDate: new Date("2025-02-10"),
    createdAt: new Date("2025-02-10"),
    updatedAt: new Date("2025-11-13")
  },

  {
    id: "ccc-081",
    name: "Alex Morgan",
    discord: "alexmorgan",
    email: "alex.morgan@terpmail.umd.edu",
    github: "alexmorgan",
    proficiency: { frontEnd: 4, backEnd: 5, design: 2, versionControl: 1, devOps: 2 },
    availability: { kind: "lessThan", max: 1, status: "INACTIVE" },
    role: "External VP",
    currentRoles: [
      { role: "QA Engineer", startDate: new Date("2026-02-05"), supervisor: "Sherlock Holmes" },
      { role: "Jr. Analyst", startDate: new Date("2026-05-07") },
      { role: "External VP", startDate: new Date("2026-07-24"), supervisor: "Hermione Granger" }
    ],
    joinDate: new Date("2025-11-21"),
    createdAt: new Date("2025-11-21"),
    updatedAt: new Date("2026-07-24")
  },

  {
    name: "Kevin Durant",
    discord: "kevindurant",
    email: "kevin.durant@outlook.com",
    proficiency: { frontEnd: 1, backEnd: 2, design: "X", devOps: 1 },
    availability: { kind: "atLeast", min: 25, status: "ACTIVE" },
    role: "Developer",
    currentRoles: [{ role: "Developer", startDate: new Date("2026-01-09"), supervisor: "Katniss Everdeen" }],
    joinDate: new Date("2025-03-18"),
    createdAt: new Date("2025-03-18"),
    updatedAt: new Date("2026-01-09")
  },

  {
    name: "Giannis Antetokounmpo",
    discord: "giannisantetokounmpo57",
    email: "giannisantetokounmpo@outlook.com",
    github: "giannisantetokounmpo",
    proficiency: { frontEnd: 4, design: 5, versionControl: 2, devOps: 2 },
    availability: { kind: "atLeast", min: 20, status: "ACTIVE" },
    role: "Sr. Developer",
    currentRoles: [
      { role: "Head", startDate: new Date("2024-04-07") },
      { role: "Sr. Developer", startDate: new Date("2025-04-10") }
    ],
    desiredRole: "TL",
    joinDate: new Date("2023-09-25"),
    createdAt: new Date("2023-09-25"),
    updatedAt: new Date("2025-04-10")
  },

  {
    id: "ccc-082",
    name: "Nikola Jokic",
    email: "nikola_jokic@terpmail.umd.edu",
    github: "nikolajokic54",
    availability: { kind: "atLeast", min: 20, status: "ACTIVE" },
    role: "Jr. Developer",
    currentRoles: [{ role: "Jr. Developer", startDate: new Date("2026-04-22"), supervisor: "Ellen Ripley" }],
    desiredRole: "Project Manager",
    joinDate: new Date("2024-02-23"),
    createdAt: new Date("2024-02-23"),
    updatedAt: new Date("2026-04-22")
  },

  {
    id: "ccc-083",
    name: "Luka Doncic",
    discord: "lukadoncic82",
    email: "luka.doncic@outlook.com",
    github: "lukadoncic76",
    proficiency: { frontEnd: 2, backEnd: 3, design: 5, versionControl: 4, devOps: 4 },
    availability: { kind: "lessThan", max: 5, status: "BREAK" },
    role: "PL",
    currentRoles: [
      { role: "Designer", startDate: new Date("2026-03-11") },
      { role: "PL", startDate: new Date("2026-05-30"), supervisor: "Sherlock Holmes" }
    ],
    desiredRole: "TL",
    joinDate: new Date("2026-01-16"),
    createdAt: new Date("2026-01-16"),
    updatedAt: new Date("2026-05-30")
  },

  {
    id: "ccc-084",
    name: "Jayson Tatum",
    discord: "jaysontatum61",
    email: "jaysontatum@outlook.com",
    availability: { kind: "lessThan", max: 1, status: "ACTIVE" },
    role: "H",
    currentRoles: [{ role: "H", startDate: new Date("2024-09-28"), supervisor: "Luke Skywalker" }],
    desiredRole: "Head",
    joinDate: new Date("2022-02-23"),
    createdAt: new Date("2022-02-23"),
    updatedAt: new Date("2024-09-28")
  },

  {
    id: "ccc-085",
    name: "Damian Lillard",
    email: "damianlillard@gmail.com",
    proficiency: { backEnd: 4, design: 2, versionControl: 1, devOps: "X" },
    availability: { kind: "range", min: 11, max: 15, status: "ACTIVE" },
    role: "Sr. Developer",
    currentRoles: [{ role: "Sr. Developer", startDate: new Date("2026-07-28"), supervisor: "Diana Prince" }],
    joinDate: new Date("2024-06-13"),
    createdAt: new Date("2024-06-13"),
    updatedAt: new Date("2026-07-28")
  },

  {
    id: "ccc-086",
    name: "Chris Paul",
    discord: "chrispaul",
    email: "chrispaul@gmail.com",
    github: "chrispaul",
    proficiency: { frontEnd: 4, backEnd: 2, versionControl: 1 },
    availability: { kind: "atLeast", min: 15, status: "BREAK" },
    role: "Advisor",
    currentRoles: [
      { role: "Developer", startDate: new Date("2026-05-25") },
      { role: "Advisor", startDate: new Date("2026-05-27") }
    ],
    roleHistory: [
      { role: "SL", startDate: new Date("2026-03-03"), endDate: new Date("2026-04-30") }
    ],
    joinDate: new Date("2026-01-29"),
    createdAt: new Date("2026-01-29"),
    updatedAt: new Date("2026-05-27")
  },

  {
    id: "ccc-087",
    name: "Dwyane Wade",
    email: "dwyane.wade@terpmail.umd.edu",
    proficiency: { frontEnd: 2, backEnd: "X", design: "X", versionControl: 2, devOps: 5 },
    availability: { kind: "lessThan", max: 2, status: "ACTIVE" },
    role: "Jr. Analyst",
    currentRoles: [{ role: "Jr. Analyst", startDate: new Date("2024-12-20"), supervisor: "Tony Stark" }],
    roleHistory: [
      { role: "Sr. Developer", startDate: new Date("2024-04-10"), endDate: new Date("2024-12-02") }
    ],
    joinDate: new Date("2024-01-26"),
    createdAt: new Date("2024-01-26"),
    updatedAt: new Date("2024-12-20")
  },

  {
    id: "ccc-088",
    name: "Kawhi Leonard",
    email: "kawhi.leonard@umd.edu",
    github: "kawhileonard",
    proficiency: { frontEnd: "X", backEnd: 2, design: 1, devOps: 3 },
    availability: { kind: "hoursUnknown", status: "ACTIVE" },
    role: "Analyst",
    currentRoles: [
      { role: "Developer", startDate: new Date("2026-04-19"), supervisor: "Jane Smith" },
      { role: "Analyst", startDate: new Date("2026-07-26") }
    ],
    joinDate: new Date("2026-02-27"),
    createdAt: new Date("2026-02-27"),
    updatedAt: new Date("2026-07-26")
  },

  {
    id: "ccc-089",
    name: "Anthony Davis",
    discord: "anthonydavis",
    email: "anthony_davis@terpmail.umd.edu",
    proficiency: { frontEnd: 5, backEnd: 2, design: 2, versionControl: 1 },
    availability: { kind: "range", min: 1, max: 5, status: "ACTIVE" },
    role: "Developer",
    currentRoles: [{ role: "Developer", startDate: new Date("2026-06-10"), supervisor: "Walter White" }],
    joinDate: new Date("2026-01-01"),
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-06-10")
  },

  {
    id: "ccc-090",
    name: "Marcus Cardoso",
    discord: "marcuscardoso59",
    email: "marcuscardoso@terpmail.umd.edu",
    github: "marcuscardoso",
    availability: { kind: "range", min: 6, max: 10, status: "ACTIVE" },
    role: "PL",
    currentRoles: [{ role: "PL", startDate: new Date("2026-02-01") }],
    desiredRole: "SL",
    joinDate: new Date("2025-05-11"),
    createdAt: new Date("2025-05-11"),
    updatedAt: new Date("2026-02-01")
  },

  {
    name: "Ibrahim Brandt",
    email: "ibrahimbrandt@gmail.com",
    github: "ibrahimbrandt",
    proficiency: { frontEnd: 4, backEnd: 3, versionControl: 2, devOps: 2 },
    availability: { kind: "range", min: 1, max: 5, status: "ACTIVE" },
    role: "Designer",
    currentRoles: [{ role: "Designer", startDate: new Date("2026-02-19"), supervisor: "Leia Organa" }],
    joinDate: new Date("2024-02-28"),
    createdAt: new Date("2024-02-28"),
    updatedAt: new Date("2026-02-19")
  },

  {
    id: "ccc-091",
    name: "Priya Vasquez",
    discord: "priyavasquez",
    email: "priya_vasquez@outlook.com",
    github: "priyavasquez",
    proficiency: { frontEnd: 3, backEnd: 4, design: 2, versionControl: 1, devOps: 4 },
    availability: { kind: "atLeast", min: 15, status: "ACTIVE" },
    role: "Sr. Developer",
    currentRoles: [{ role: "Sr. Developer", startDate: new Date("2025-04-17"), supervisor: "Leia Organa" }],
    joinDate: new Date("2024-11-14"),
    createdAt: new Date("2024-11-14"),
    updatedAt: new Date("2025-04-17")
  },

  {
    id: "ccc-092",
    name: "Kofi Ilic",
    discord: "kofiilic",
    email: "kofi_ilic@terpmail.umd.edu",
    github: "kofiilic",
    proficiency: { backEnd: "X", design: 1, versionControl: 3, devOps: "X" },
    availability: { kind: "atLeast", min: 30, status: "ACTIVE" },
    role: "Project Manager",
    currentRoles: [{ role: "Project Manager", startDate: new Date("2026-04-30") }],
    roleHistory: [
      { role: "Designer", startDate: new Date("2026-03-22"), endDate: new Date("2026-04-11") },
      { role: "SL", startDate: new Date("2026-04-11"), endDate: "Current" }
    ],
    joinDate: new Date("2026-02-13"),
    createdAt: new Date("2026-02-13"),
    updatedAt: new Date("2026-04-30")
  },

  {
    id: "ccc-093",
    name: "Tariq Moreau",
    discord: "tariqmoreau",
    email: "tariq_moreau@gmail.com",
    proficiency: { frontEnd: 3, backEnd: "X", design: "X", versionControl: 3, devOps: 2 },
    availability: { kind: "range", min: 16, max: 20, status: "INACTIVE" },
    role: "Jr. Analyst",
    currentRoles: [
      { role: "Sr. Developer", startDate: new Date("2024-02-07"), supervisor: "Tony Stark" },
      { role: "Treasurer", startDate: new Date("2024-05-21"), supervisor: "Clark Kent" },
      { role: "Jr. Analyst", startDate: new Date("2026-04-14"), supervisor: "Peter Parker" }
    ],
    roleHistory: [
      { role: "SL", startDate: new Date("2023-07-10"), endDate: new Date("2023-08-08") }
    ],
    joinDate: new Date("2022-11-29"),
    createdAt: new Date("2022-11-29"),
    updatedAt: new Date("2026-04-14")
  },

  {
    id: "ccc-094",
    name: "Chiara Diallo",
    email: "chiaradiallo@gmail.com",
    github: "chiaradiallo",
    proficiency: { frontEnd: 5, backEnd: 1, design: 1, versionControl: 4, devOps: 1 },
    availability: { kind: "hoursUnknown", status: "BREAK" },
    role: "H",
    currentRoles: [{ role: "H", startDate: new Date("2026-06-29"), supervisor: "Katniss Everdeen" }],
    roleHistory: [
      { role: "TL", startDate: new Date("2025-04-26"), endDate: new Date("2026-01-20") }
    ],
    joinDate: new Date("2024-11-25"),
    createdAt: new Date("2024-11-25"),
    updatedAt: new Date("2026-06-29")
  },

  {
    name: "Marcus Rahman",
    discord: "marcusrahman",
    email: "marcus.rahman@umd.edu",
    availability: { kind: "hoursUnknown", status: "ACTIVE" },
    role: "External VP",
    currentRoles: [{ role: "External VP", startDate: new Date("2026-01-26"), supervisor: "Luke Skywalker" }],
    joinDate: new Date("2023-10-28"),
    createdAt: new Date("2023-10-28"),
    updatedAt: new Date("2026-01-26")
  },

  {
    id: "ccc-095",
    name: "Hugo Delgado",
    discord: "hugodelgado",
    email: "hugo.delgado@gmail.com",
    github: "hugodelgado",
    availability: { kind: "range", min: 1, max: 5, status: "BREAK" },
    role: "Secretary",
    currentRoles: [{ role: "Secretary", startDate: new Date("2022-08-13"), supervisor: "Leia Organa" }],
    desiredRole: "Head",
    joinDate: new Date("2022-06-04"),
    createdAt: new Date("2022-06-04"),
    updatedAt: new Date("2022-08-13")
  },

  {
    id: "ccc-096",
    name: "Tomas Rahman",
    discord: "tomasrahman",
    email: "tomas_rahman@umd.edu",
    availability: { kind: "hoursUnknown", status: "ACTIVE" },
    role: "SL",
    currentRoles: [
      { role: "Jr. Analyst", startDate: new Date("2026-05-25") },
      { role: "SL", startDate: new Date("2026-06-19"), supervisor: "Clark Kent" }
    ],
    joinDate: new Date("2026-02-08"),
    createdAt: new Date("2026-02-08"),
    updatedAt: new Date("2026-06-19")
  },

  {
    id: "ccc-097",
    name: "Freya Kahale",
    email: "freya_kahale@umd.edu",
    github: "freyakahale",
    proficiency: { frontEnd: "X", backEnd: 5, versionControl: 2 },
    availability: { kind: "atLeast", min: 30, status: "INACTIVE" },
    role: "Jr. Analyst",
    currentRoles: [{ role: "Jr. Analyst", startDate: new Date("2023-12-16") }],
    desiredRole: "Sr. Developer",
    joinDate: new Date("2022-12-01"),
    createdAt: new Date("2022-12-01"),
    updatedAt: new Date("2023-12-16")
  },

  {
    id: "ccc-098",
    name: "Hana Silva",
    discord: "hanasilva",
    email: "hana.silva@outlook.com",
    proficiency: { frontEnd: 5, backEnd: 1, design: 4, versionControl: "X", devOps: "X" },
    availability: { kind: "range", min: 1, max: 5, status: "BREAK" },
    role: "Secretary",
    currentRoles: [
      { role: "H", startDate: new Date("2025-09-01"), supervisor: "Diana Prince" },
      { role: "Secretary", startDate: new Date("2026-07-04"), supervisor: "Leia Organa" }
    ],
    roleHistory: [
      { role: "Analyst", startDate: new Date("2023-03-17"), endDate: new Date("2025-01-22") }
    ],
    desiredRole: "Head",
    joinDate: new Date("2023-02-15"),
    createdAt: new Date("2023-02-15"),
    updatedAt: new Date("2026-07-04")
  },

  {
    id: "ccc-099",
    name: "Tariq Kelly",
    discord: "tariqkelly",
    email: "tariq_kelly@outlook.com",
    github: "tariqkelly",
    availability: { kind: "lessThan", max: 1, status: "ACTIVE" },
    role: "Developer",
    currentRoles: [
      { role: "Project Manager", startDate: new Date("2025-03-23") },
      { role: "Developer", startDate: new Date("2026-04-12") }
    ],
    roleHistory: [
      { role: "Jr. Analyst", startDate: new Date("2023-11-02"), endDate: new Date("2025-01-30") }
    ],
    joinDate: new Date("2023-08-23"),
    createdAt: new Date("2023-08-23"),
    updatedAt: new Date("2026-04-12")
  },

  {
    id: "ccc-100",
    name: "Oscar Karim",
    email: "oscarkarim@gmail.com",
    github: "oscarkarim",
    proficiency: { backEnd: 3, design: 4, versionControl: 1, devOps: 3 },
    availability: { kind: "hoursUnknown", status: "UNKNOWN" },
    role: "Internal VP",
    currentRoles: [{ role: "Internal VP", startDate: new Date("2025-04-04"), supervisor: "Bruce Wayne" }],
    desiredRole: "Advisor",
    joinDate: new Date("2024-06-27"),
    createdAt: new Date("2024-06-27"),
    updatedAt: new Date("2025-04-04")
  },

  {
    id: "ccc-101",
    name: "Chiara Novak",
    discord: "chiaranovak57",
    email: "chiara.novak@outlook.com",
    github: "chiaranovak",
    availability: { kind: "range", min: 6, max: 10, status: "ACTIVE" },
    role: "SL",
    currentRoles: [{ role: "SL", startDate: new Date("2025-12-02"), supervisor: "Michael Scott" }],
    joinDate: new Date("2025-08-10"),
    createdAt: new Date("2025-08-10"),
    updatedAt: new Date("2025-12-02")
  },

  {
    id: "ccc-102",
    name: "Imani Kelly",
    discord: "imanikelly",
    email: "imani.kelly@gmail.com",
    proficiency: { frontEnd: "X", backEnd: 3, design: 3, devOps: "X" },
    availability: { kind: "atLeast", min: 20, status: "ACTIVE" },
    role: "Designer",
    currentRoles: [{ role: "Designer", startDate: new Date("2023-05-05"), supervisor: "Walter White" }],
    roleHistory: [
      { role: "QA Engineer", startDate: new Date("2022-03-12"), endDate: new Date("2023-02-05") }
    ],
    joinDate: new Date("2022-02-26"),
    createdAt: new Date("2022-02-26"),
    updatedAt: new Date("2023-05-05")
  },

  {
    id: "ccc-103",
    name: "Kofi Bergman",
    discord: "kofibergman",
    email: "kofi.bergman@gmail.com",
    github: "kofibergman",
    proficiency: { frontEnd: 5, backEnd: 1, design: 2, versionControl: 5, devOps: 5 },
    availability: { kind: "range", min: 6, max: 10, status: "ACTIVE" },
    role: "Jr. Developer",
    currentRoles: [
      { role: "Jr. Developer", startDate: new Date("2026-04-02"), supervisor: "Diana Prince" },
      { role: "Secretary", startDate: new Date("2026-04-04"), supervisor: "Katniss Everdeen" },
      { role: "Jr. Developer", startDate: new Date("2026-07-03"), supervisor: "Tony Stark" }
    ],
    roleHistory: [
      { role: "Treasurer", startDate: new Date("2023-03-02"), endDate: new Date("2023-08-13") },
      { role: "H", startDate: new Date("2023-08-13"), endDate: "Current" }
    ],
    joinDate: new Date("2022-07-25"),
    createdAt: new Date("2022-07-25"),
    updatedAt: new Date("2026-07-03")
  },

  {
    id: "ccc-104",
    name: "Kenji Karim",
    discord: "kenjikarim",
    email: "kenjikarim@outlook.com",
    github: "kenjikarim",
    proficiency: { versionControl: "X", devOps: "X" },
    availability: { kind: "range", min: 11, max: 15, status: "BREAK" },
    role: "Analyst",
    currentRoles: [{ role: "Analyst", startDate: new Date("2025-02-23"), supervisor: "Peter Parker" }],
    roleHistory: [
      { role: "Designer", startDate: new Date("2024-05-19"), endDate: new Date("2024-09-21") }
    ],
    desiredRole: "Advisor",
    joinDate: new Date("2024-02-01"),
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2025-02-23")
  },

  {
    id: "ccc-105",
    name: "Lena Marchetti",
    discord: "lenamarchetti88",
    email: "lena.marchetti@umd.edu",
    github: "lenamarchetti69",
    proficiency: { backEnd: 2, design: 2, versionControl: 3, devOps: "X" },
    availability: { kind: "range", min: 6, max: 10, status: "ACTIVE" },
    role: "Analyst",
    currentRoles: [{ role: "Analyst", startDate: new Date("2025-02-20"), supervisor: "Frodo Baggins" }],
    desiredRole: "Sr. Developer",
    joinDate: new Date("2023-12-28"),
    createdAt: new Date("2023-12-28"),
    updatedAt: new Date("2025-02-20")
  },

  {
    id: "ccc-106",
    name: "Fatima Costa",
    discord: "fatimacosta7",
    email: "fatima_costa@outlook.com",
    proficiency: { backEnd: 1, design: 5, versionControl: 4, devOps: 5 },
    availability: { kind: "atLeast", min: 15, status: "ACTIVE" },
    role: "External VP",
    currentRoles: [{ role: "External VP", startDate: new Date("2026-07-12"), supervisor: "Sherlock Holmes" }],
    roleHistory: [
      { role: "H", startDate: new Date("2025-10-03"), endDate: new Date("2026-02-16") }
    ],
    desiredRole: "SL",
    joinDate: new Date("2025-03-21"),
    createdAt: new Date("2025-03-21"),
    updatedAt: new Date("2026-07-12")
  },

  {
    name: "Dimitri Lindqvist",
    discord: "dimitrilindqvist",
    email: "dimitri_lindqvist@outlook.com",
    availability: { kind: "lessThan", max: 2, status: "ACTIVE" },
    role: "Secretary",
    currentRoles: [{ role: "Secretary", startDate: new Date("2026-04-14"), supervisor: "Katniss Everdeen" }],
    roleHistory: [
      { role: "Analyst", startDate: new Date("2024-07-23"), endDate: new Date("2026-03-21") }
    ],
    joinDate: new Date("2022-04-15"),
    createdAt: new Date("2022-04-15"),
    updatedAt: new Date("2026-04-14")
  },

  {
    id: "ccc-107",
    name: "Noor Moretti",
    discord: "noormoretti28",
    email: "noormoretti@terpmail.umd.edu",
    github: "noormoretti",
    availability: { kind: "lessThan", max: 5, status: "BREAK" },
    role: "Sr. Developer",
    currentRoles: [{ role: "Sr. Developer", startDate: new Date("2026-03-21"), supervisor: "Katniss Everdeen" }],
    roleHistory: [
      { role: "Sr. Developer", startDate: new Date("2024-11-23"), endDate: new Date("2025-06-26") },
      { role: "Sr. Developer", startDate: new Date("2025-06-26"), endDate: new Date("2025-07-02") }
    ],
    joinDate: new Date("2024-07-23"),
    createdAt: new Date("2024-07-23"),
    updatedAt: new Date("2026-03-21")
  },

  {
    id: "ccc-108",
    name: "Chiara Kahale",
    discord: "chiarakahale77",
    email: "chiara.kahale@umd.edu",
    github: "chiarakahale",
    proficiency: { frontEnd: 2, versionControl: "X", devOps: "X" },
    availability: { kind: "lessThan", max: 2, status: "ACTIVE" },
    role: "Analyst",
    currentRoles: [{ role: "Analyst", startDate: new Date("2025-06-06"), supervisor: "Luke Skywalker" }],
    joinDate: new Date("2022-11-02"),
    createdAt: new Date("2022-11-02"),
    updatedAt: new Date("2025-06-06")
  },

  {
    id: "ccc-109",
    name: "Sven Silva",
    discord: "svensilva28",
    email: "svensilva@outlook.com",
    github: "svensilva",
    availability: { kind: "range", min: 1, max: 5, status: "BREAK" },
    role: "Designer",
    currentRoles: [{ role: "Designer", startDate: new Date("2026-06-23"), supervisor: "Jane Smith" }],
    roleHistory: [
      { role: "Jr. Developer", startDate: new Date("2026-04-18"), endDate: new Date("2026-05-01") }
    ],
    joinDate: new Date("2026-04-15"),
    createdAt: new Date("2026-04-15"),
    updatedAt: new Date("2026-06-23")
  },

  {
    id: "ccc-110",
    name: "Diego MacLeod",
    discord: "diegomacleod76",
    email: "diegomacleod@outlook.com",
    github: "diegomacleod4",
    proficiency: { frontEnd: 1, backEnd: 1, design: 1, versionControl: 2, devOps: 4 },
    availability: { kind: "hoursUnknown", status: "ACTIVE" },
    role: "Jr. Developer",
    currentRoles: [
      { role: "Developer", startDate: new Date("2023-03-17"), supervisor: "Luke Skywalker" },
      { role: "Jr. Developer", startDate: new Date("2023-04-12"), supervisor: "Diana Prince" }
    ],
    joinDate: new Date("2023-02-09"),
    createdAt: new Date("2023-02-09"),
    updatedAt: new Date("2023-04-12")
  },

  {
    id: "ccc-111",
    name: "Hugo Kahale",
    discord: "hugokahale",
    email: "hugo_kahale@gmail.com",
    github: "hugokahale",
    proficiency: { frontEnd: 4, backEnd: "X", design: 5, versionControl: 4, devOps: 1 },
    availability: { kind: "hoursUnknown", status: "ACTIVE" },
    role: "Internal VP",
    currentRoles: [{ role: "Internal VP", startDate: new Date("2026-07-07") }],
    joinDate: new Date("2023-12-13"),
    createdAt: new Date("2023-12-13"),
    updatedAt: new Date("2026-07-07")
  },

  {
    id: "ccc-112",
    name: "Ines Haddad",
    discord: "ineshaddad91",
    email: "ines_haddad@umd.edu",
    github: "ineshaddad",
    availability: { kind: "atLeast", min: 30, status: "BREAK" },
    role: "H",
    currentRoles: [{ role: "H", startDate: new Date("2024-11-15"), supervisor: "Luke Skywalker" }],
    joinDate: new Date("2022-03-16"),
    createdAt: new Date("2022-03-16"),
    updatedAt: new Date("2024-11-15")
  },

  {
    id: "ccc-113",
    name: "Tomas Kelly",
    discord: "tomaskelly66",
    email: "tomas.kelly@terpmail.umd.edu",
    github: "tomaskelly",
    proficiency: { frontEnd: 5, backEnd: 4, design: 2, versionControl: "X", devOps: "X" },
    availability: { kind: "range", min: 6, max: 10, status: "ACTIVE" },
    role: "H",
    currentRoles: [{ role: "H", startDate: new Date("2024-12-12"), supervisor: "Ellen Ripley" }],
    roleHistory: [
      { role: "Designer", startDate: new Date("2023-05-31"), endDate: new Date("2024-04-07") }
    ],
    joinDate: new Date("2022-09-12"),
    createdAt: new Date("2022-09-12"),
    updatedAt: new Date("2024-12-12")
  },

  {
    id: "ccc-114",
    name: "Hana Tanaka",
    discord: "hanatanaka",
    email: "hana_tanaka@outlook.com",
    proficiency: { frontEnd: 2, backEnd: "X", design: "X", versionControl: 2, devOps: 3 },
    availability: { kind: "lessThan", max: 2, status: "ACTIVE" },
    role: "External VP",
    currentRoles: [
      { role: "Project Manager", startDate: new Date("2023-12-11") },
      { role: "External VP", startDate: new Date("2025-11-18") }
    ],
    desiredRole: "Advisor",
    joinDate: new Date("2023-07-16"),
    createdAt: new Date("2023-07-16"),
    updatedAt: new Date("2025-11-18")
  },

  {
    id: "ccc-115",
    name: "Jamal Deshmukh",
    discord: "jamaldeshmukh26",
    email: "jamaldeshmukh@outlook.com",
    github: "jamaldeshmukh",
    availability: { kind: "hoursUnknown", status: "ACTIVE" },
    role: "Developer",
    currentRoles: [{ role: "Developer", startDate: new Date("2026-07-31"), supervisor: "Leia Organa" }],
    roleHistory: [
      { role: "Project Manager", startDate: new Date("2025-06-26"), endDate: new Date("2026-03-19") },
      { role: "M", startDate: new Date("2026-03-19"), endDate: new Date("2026-07-26") }
    ],
    desiredRole: "TL",
    joinDate: new Date("2025-03-03"),
    createdAt: new Date("2025-03-03"),
    updatedAt: new Date("2026-07-31")
  },

  {
    id: "ccc-116",
    name: "Jamal MacLeod",
    email: "jamal.macleod@outlook.com",
    availability: { kind: "range", min: 16, max: 20, status: "ACTIVE" },
    role: "Internal VP",
    currentRoles: [{ role: "Internal VP", startDate: new Date("2025-01-26"), supervisor: "Frodo Baggins" }],
    joinDate: new Date("2024-01-17"),
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2025-01-26")
  },

  {
    id: "ccc-117",
    name: "Priya Njoroge",
    discord: "priyanjoroge33",
    email: "priya_njoroge@gmail.com",
    github: "priyanjoroge22",
    availability: { kind: "hoursUnknown", status: "ACTIVE" },
    role: "Designer",
    currentRoles: [{ role: "Designer", startDate: new Date("2026-04-01") }],
    joinDate: new Date("2026-01-04"),
    createdAt: new Date("2026-01-04"),
    updatedAt: new Date("2026-04-01")
  },

  {
    id: "ccc-118",
    name: "Noor Rojas",
    discord: "noorrojas",
    email: "noorrojas@outlook.com",
    github: "noorrojas",
    proficiency: { frontEnd: 2, backEnd: 4, design: 3, devOps: 1 },
    availability: { kind: "range", min: 6, max: 10, status: "ACTIVE" },
    role: "M",
    currentRoles: [{ role: "M", startDate: new Date("2025-06-02") }],
    joinDate: new Date("2024-07-13"),
    createdAt: new Date("2024-07-13"),
    updatedAt: new Date("2025-06-02")
  },

  {
    id: "ccc-119",
    name: "Mei Delgado",
    discord: "meidelgado",
    email: "meidelgado@outlook.com",
    proficiency: { frontEnd: 1, backEnd: 5, design: 4, versionControl: 1, devOps: 5 },
    availability: { kind: "hoursUnknown", status: "ACTIVE" },
    role: "SL",
    currentRoles: [{ role: "SL", startDate: new Date("2024-12-07"), supervisor: "Frodo Baggins" }],
    joinDate: new Date("2023-08-09"),
    createdAt: new Date("2023-08-09"),
    updatedAt: new Date("2024-12-07")
  },

  {
    name: "Niamh Costa",
    discord: "niamhcosta3",
    email: "niamhcosta@gmail.com",
    proficiency: { frontEnd: 4, backEnd: "X", versionControl: 3, devOps: "X" },
    availability: { kind: "range", min: 11, max: 15, status: "ACTIVE" },
    role: "Analyst",
    currentRoles: [
      { role: "Analyst", startDate: new Date("2024-12-19"), supervisor: "Sherlock Holmes" },
      { role: "Analyst", startDate: new Date("2025-05-14"), supervisor: "Leia Organa" }
    ],
    desiredRole: "Sr. Developer",
    joinDate: new Date("2022-03-19"),
    createdAt: new Date("2022-03-19"),
    updatedAt: new Date("2025-05-14")
  },

  {
    id: "ccc-120",
    name: "Amara Alvarez",
    discord: "amaraalvarez91",
    email: "amara.alvarez@outlook.com",
    github: "amaraalvarez7",
    proficiency: { frontEnd: 4, backEnd: 3, design: 4, versionControl: 4, devOps: 4 },
    availability: { kind: "atLeast", min: 30, status: "UNKNOWN" },
    role: "Sr. Developer",
    currentRoles: [{ role: "Sr. Developer", startDate: new Date("2026-07-13"), supervisor: "Jane Smith" }],
    joinDate: new Date("2024-11-10"),
    createdAt: new Date("2024-11-10"),
    updatedAt: new Date("2026-07-13")
  },

  {
    id: "ccc-121",
    name: "Sofia Vasquez",
    discord: "sofiavasquez",
    email: "sofia_vasquez@umd.edu",
    github: "sofiavasquez",
    proficiency: { frontEnd: "X", backEnd: "X", design: "X", versionControl: 4 },
    availability: { kind: "range", min: 11, max: 15, status: "ACTIVE" },
    role: "Head",
    currentRoles: [{ role: "Head", startDate: new Date("2025-09-04"), supervisor: "Hermione Granger" }],
    desiredRole: "PL",
    joinDate: new Date("2025-06-23"),
    createdAt: new Date("2025-06-23"),
    updatedAt: new Date("2025-09-04")
  },

  {
    name: "Tomas Vasquez",
    email: "tomasvasquez@gmail.com",
    github: "tomasvasquez85",
    proficiency: { backEnd: 4, design: 2, versionControl: "X", devOps: 2 },
    availability: { kind: "range", min: 1, max: 5, status: "ACTIVE" },
    role: "H",
    currentRoles: [{ role: "H", startDate: new Date("2025-06-01"), supervisor: "Diana Prince" }],
    joinDate: new Date("2023-07-11"),
    createdAt: new Date("2023-07-11"),
    updatedAt: new Date("2025-06-01")
  },

  {
    id: "ccc-122",
    name: "Leilani Ferreira",
    email: "leilaniferreira@gmail.com",
    github: "leilaniferreira",
    availability: { kind: "hoursUnknown", status: "ACTIVE" },
    role: "QA Engineer",
    currentRoles: [
      { role: "PL", startDate: new Date("2025-10-08"), supervisor: "Leia Organa" },
      { role: "QA Engineer", startDate: new Date("2026-06-09"), supervisor: "Diana Prince" }
    ],
    desiredRole: "Sr. Developer",
    joinDate: new Date("2025-08-23"),
    createdAt: new Date("2025-08-23"),
    updatedAt: new Date("2026-06-09")
  },

  {
    id: "ccc-123",
    name: "Lucas Bergman",
    discord: "lucasbergman94",
    email: "lucas.bergman@umd.edu",
    github: "lucasbergman",
    proficiency: { frontEnd: 1, backEnd: 2, design: 4, versionControl: 5, devOps: 5 },
    availability: { kind: "range", min: 16, max: 20, status: "INACTIVE" },
    role: "External VP",
    currentRoles: [{ role: "External VP", startDate: new Date("2025-02-19"), supervisor: "Leia Organa" }],
    roleHistory: [
      { role: "TL", startDate: new Date("2023-10-19"), endDate: new Date("2024-02-10") }
    ],
    joinDate: new Date("2022-05-14"),
    createdAt: new Date("2022-05-14"),
    updatedAt: new Date("2025-02-19")
  },

  {
    name: "Diego Sharma",
    discord: "diegosharma",
    email: "diego.sharma@terpmail.umd.edu",
    github: "diegosharma84",
    availability: { kind: "atLeast", min: 15, status: "INACTIVE" },
    role: "Jr. Analyst",
    currentRoles: [
      { role: "Head", startDate: new Date("2022-02-13"), supervisor: "Peter Parker" },
      { role: "Jr. Analyst", startDate: new Date("2022-08-23"), supervisor: "Ellen Ripley" }
    ],
    joinDate: new Date("2022-01-19"),
    createdAt: new Date("2022-01-19"),
    updatedAt: new Date("2022-08-23")
  },

  {
    name: "Lucas Novak",
    email: "lucas.novak@outlook.com",
    proficiency: { frontEnd: 3, backEnd: 2, devOps: "X" },
    availability: { kind: "atLeast", min: 20, status: "ACTIVE" },
    role: "Secretary",
    currentRoles: [
      { role: "Advisor", startDate: new Date("2026-02-16"), supervisor: "Clark Kent" },
      { role: "Developer", startDate: new Date("2026-03-09") },
      { role: "Secretary", startDate: new Date("2026-05-25") }
    ],
    roleHistory: [
      { role: "QA Engineer", startDate: new Date("2025-08-28"), endDate: new Date("2026-01-09") }
    ],
    desiredRole: "Project Manager",
    joinDate: new Date("2025-05-09"),
    createdAt: new Date("2025-05-09"),
    updatedAt: new Date("2026-05-25")
  },

  {
    id: "ccc-124",
    name: "Camila Whitfield",
    discord: "camilawhitfield",
    email: "camila.whitfield@gmail.com",
    github: "camilawhitfield",
    proficiency: { frontEnd: 1, backEnd: 5, design: 1, devOps: 3 },
    availability: { kind: "hoursUnknown", status: "ACTIVE" },
    role: "Jr. Analyst",
    currentRoles: [
      { role: "Jr. Analyst", startDate: new Date("2025-10-02"), supervisor: "Diana Prince" },
      { role: "Developer", startDate: new Date("2025-11-10"), supervisor: "Hermione Granger" },
      { role: "Jr. Analyst", startDate: new Date("2026-03-03"), supervisor: "Leia Organa" }
    ],
    joinDate: new Date("2025-02-26"),
    createdAt: new Date("2025-02-26"),
    updatedAt: new Date("2026-03-03")
  },

  {
    id: "ccc-125",
    name: "Leilani Whitfield",
    email: "leilani_whitfield@terpmail.umd.edu",
    proficiency: { frontEnd: "X", backEnd: 1, design: 5, devOps: 2 },
    availability: { kind: "range", min: 11, max: 15, status: "ACTIVE" },
    role: "Advisor",
    currentRoles: [{ role: "Advisor", startDate: new Date("2025-10-05"), supervisor: "Walter White" }],
    joinDate: new Date("2025-01-18"),
    createdAt: new Date("2025-01-18"),
    updatedAt: new Date("2025-10-05")
  },

  {
    id: "ccc-126",
    name: "Noor Sharma",
    discord: "noorsharma91",
    email: "noorsharma@terpmail.umd.edu",
    proficiency: { backEnd: 4 },
    availability: { kind: "hoursUnknown", status: "INACTIVE" },
    role: "Secretary",
    currentRoles: [{ role: "Secretary", startDate: new Date("2026-06-27"), supervisor: "Sherlock Holmes" }],
    roleHistory: [
      { role: "Jr. Developer", startDate: new Date("2025-05-13"), endDate: new Date("2026-05-09") },
      { role: "TL", startDate: new Date("2026-05-09"), endDate: new Date("2026-06-01") }
    ],
    joinDate: new Date("2023-03-01"),
    createdAt: new Date("2023-03-01"),
    updatedAt: new Date("2026-06-27")
  },

  {
    id: "ccc-127",
    name: "Ewan Njoroge",
    discord: "ewannjoroge53",
    email: "ewan_njoroge@outlook.com",
    availability: { kind: "lessThan", max: 5, status: "BREAK" },
    role: "Jr. Analyst",
    currentRoles: [
      { role: "Analyst", startDate: new Date("2025-04-09"), supervisor: "Clark Kent" },
      { role: "Jr. Analyst", startDate: new Date("2025-07-25"), supervisor: "Diana Prince" }
    ],
    joinDate: new Date("2024-08-08"),
    createdAt: new Date("2024-08-08"),
    updatedAt: new Date("2025-07-25")
  },

  {
    id: "ccc-128",
    name: "Felix Moreau",
    discord: "felixmoreau",
    email: "felix_moreau@umd.edu",
    github: "felixmoreau",
    proficiency: { frontEnd: 1, backEnd: 5, design: 1, versionControl: 4, devOps: 5 },
    availability: { kind: "range", min: 11, max: 15, status: "ACTIVE" },
    role: "SL",
    currentRoles: [{ role: "SL", startDate: new Date("2025-09-20"), supervisor: "Frodo Baggins" }],
    desiredRole: "Sr. Developer",
    joinDate: new Date("2025-02-02"),
    createdAt: new Date("2025-02-02"),
    updatedAt: new Date("2025-09-20")
  },

  {
    name: "Jamal Volkov",
    discord: "jamalvolkov57",
    email: "jamal.volkov@terpmail.umd.edu",
    availability: { kind: "range", min: 6, max: 10, status: "ACTIVE" },
    role: "Analyst",
    currentRoles: [{ role: "Analyst", startDate: new Date("2026-04-28") }],
    roleHistory: [
      { role: "H", startDate: new Date("2025-08-26"), endDate: new Date("2025-09-26") },
      { role: "Designer", startDate: new Date("2025-09-26"), endDate: new Date("2026-04-22") }
    ],
    joinDate: new Date("2025-01-18"),
    createdAt: new Date("2025-01-18"),
    updatedAt: new Date("2026-04-28")
  },

  {
    id: "ccc-129",
    name: "Priya Deshmukh",
    discord: "priyadeshmukh",
    email: "priya_deshmukh@terpmail.umd.edu",
    availability: { kind: "hoursUnknown", status: "INACTIVE" },
    role: "M",
    currentRoles: [{ role: "M", startDate: new Date("2025-12-22"), supervisor: "Walter White" }],
    roleHistory: [
      { role: "Developer", startDate: new Date("2022-01-23"), endDate: new Date("2025-12-15") }
    ],
    desiredRole: "SL",
    joinDate: new Date("2022-01-03"),
    createdAt: new Date("2022-01-03"),
    updatedAt: new Date("2025-12-22")
  },

  {
    id: "ccc-130",
    name: "Kofi Kelly",
    discord: "kofikelly45",
    email: "kofi_kelly@umd.edu",
    github: "kofikelly",
    proficiency: { backEnd: 2 },
    availability: { kind: "atLeast", min: 20, status: "ACTIVE" },
    role: "Treasurer",
    currentRoles: [{ role: "Treasurer", startDate: new Date("2026-07-24") }],
    roleHistory: [
      { role: "H", startDate: new Date("2024-03-04"), endDate: new Date("2024-04-01") },
      { role: "Developer", startDate: new Date("2024-04-01"), endDate: new Date("2026-04-04") }
    ],
    joinDate: new Date("2022-10-04"),
    createdAt: new Date("2022-10-04"),
    updatedAt: new Date("2026-07-24")
  },

  {
    id: "ccc-131",
    name: "Ewan Chen",
    email: "ewan.chen@umd.edu",
    availability: { kind: "range", min: 11, max: 15, status: "ACTIVE" },
    role: "Internal VP",
    currentRoles: [
      { role: "M", startDate: new Date("2024-11-19"), supervisor: "Ellen Ripley" },
      { role: "Internal VP", startDate: new Date("2025-08-08"), supervisor: "Hermione Granger" }
    ],
    desiredRole: "Advisor",
    joinDate: new Date("2022-09-10"),
    createdAt: new Date("2022-09-10"),
    updatedAt: new Date("2025-08-08")
  }
];
