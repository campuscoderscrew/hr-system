import type { Member, Role } from "./types"
// this is placeholder data for dev and demonstration, not real data.
export const membersData: Member[] = [
    {
        id: "ccc-00X",
        name: "Lebron James",
        email: "lebron@gmail.com",
        discord: "lebronjames",
        github: "lebronjames23",
        availability: "1-5",
        proficiency: "4-3-2-1",
        status: "active",
        joinDate: new Date("2026-07-01"),
        department: "development_operations",
        currentRoles: [
            { title: "Developer", startDate: new Date("2026-07-01") }
        ],
        team: "Whale",
        cluster: "Caribbean",
        roleHistory: [],
        createdAt: new Date("2026-07-01"),
        updatedAt: new Date("2026-07-01")
    }
    // mock data for more cases needed
    // multiple roles
    // role history (changed roles)
    // inactive
    // on break
    // not in disc
    // no team or cluster (business member)
    // board member
]