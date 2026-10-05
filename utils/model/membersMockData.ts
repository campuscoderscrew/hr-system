// import type { Member, Role } from "./types"
// // this is placeholder data for dev and demonstration, not real data.
// export const membersData: Member[] = [
//     {
//         id: "ccc-00X",
//         name: "Lebron James",
//         email: "lebron@gmail.com",
//         discord: "lebronjames",
//         github: "lebronjames23",
//         availability: "1-5",
//         proficiency: "4-3-2-1",
//         status: "active",
//         joinDate: new Date("2026-07-01"),
//         department: "development_operations",
//         currentRoles: [
//             { title: "Developer", startDate: new Date("2026-07-01") }
//         ],
//         team: "Whale",
//         cluster: "Caribbean",
//         roleHistory: [],
//         createdAt: new Date("2026-07-01"),
//         updatedAt: new Date("2026-07-01")
//     },
//     // mock data for more cases needed
//     // multiple roles
//     // role history (changed roles)
//     // inactive
//     // on break
//     // not in disc
//     // no team or cluster (business member)
//     // board member


//     //inactive + multiple current roles
//     {
//         id: "ccc-002",
//         name: "Stephen Curry",
//         email: "curry@gmail.com",
//         discord: "stephcurry30",
//         github: "curry30",
//         availability: "6-10",
//         proficiency: "5-4-3-2",
//         status: "inactive",
//         joinDate: new Date("2025-08-01"),
//         department: "development_operations",
//         currentRoles: [
//             { title: "Developer", startDate: new Date("2025-08-01") },
//             { title: "Primary Lead", startDate: new Date("2026-01-01") }
//         ],
//         team: "Shortfin",
//         cluster: "Bering",
//         roleHistory: [],
//         createdAt: new Date("2025-08-01"),
//         updatedAt: new Date("2026-01-01")
//     },

//     //break+ role history + not on discord
//     {
//         id: "ccc-003",
//         name: "John Doe",
//         email: "Jd@gmail.com",
//         discord: "",
//         github: "jd35",
//         availability: "6-10",
//         proficiency: "5-5-4-3",
//         status: "break",
//         joinDate: new Date("2024-08-05"),
//         department: "development_operations",
//         currentRoles: [
//             { title: "Sr. Developer", startDate: new Date("2025-11-01") }
//         ],
//         team: "Lemon",
//         cluster: "Bering",
//         roleHistory: [
//             {
//                 title: "Developer",
//                 startDate: new Date("2024-08-05"),
//                 endDate: new Date("2025-11-01")
//             }
//         ],
//         createdAt: new Date("2024-08-05"),
//         updatedAt: new Date("2025-11-01")
//     },

//     // board member + roel history + no team/cluster
//     {
//         id: "ccc-004",
//         name: "Shaquille ONeal",
//         email: "shaq@gmail.com",
//         discord: "shaqoneal34",
//         github: null,
//         availability: "11-15",
//         proficiency: null,
//         status: "active",
//         joinDate: new Date("2023-01-01"),
//         department: "executive_board",
//         currentRoles: [
//             { title: "President", startDate: new Date("2024-01-01") }
//         ],
//         team: null,
//         cluster: null,
//         roleHistory: [
//             {
//                 title: "Vice President of Development Operations",
//                 startDate: new Date("2023-01-01"),
//                 endDate: new Date("2024-01-01")
//             }
//         ],
//         createdAt: new Date("2023-01-01"),
//         updatedAt: new Date("2024-01-01")
//     }

// ]