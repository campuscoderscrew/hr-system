import { beforeEach, describe, expect, test } from "vitest";
import {
  currentPositions,
  type Membership,
  type Position,
} from "@utils/model/types.ts";
import { buildOrganization } from "@utils/model/organization.ts";
import { makeMember, makePosition } from "@utils/model/testing/fixtures.ts";

describe("`buildOrganization` works as expected", () => {
  test("Member lands in the current position", () => {
    const currPosition: Partial<Position> = {
      operationsSector: "Development Operations",
      department: "Development",
    };

    const members: Membership[] = [
      makeMember({
        positionHistory: [makePosition(currPosition)],
      }),
    ];

    const orgTree = buildOrganization(members);
    expect(orgTree).toHaveLength(1);
    expect(orgTree[0].name).toBe(currPosition.operationsSector);

    expect(orgTree[0].departments).toHaveLength(1);
    expect(orgTree[0].departments[0].name).toBe(currPosition.department);
  });

  test("Member with multiple teams appears in both teams", () => {
    const team1: Partial<Position> = {
      operationsSector: "Development Operations",
      department: "Development",
      cluster: "Caribbean Cluster",
      team: "Angel",
    };
    const team2: Partial<Position> = {
      operationsSector: "Development Operations",
      department: "Development",
      cluster: "Bering Cluster",
      team: "Leopard",
    };

    const members: Membership[] = [
      makeMember({
        positionHistory: [makePosition(team1), makePosition(team2)],
      }),
    ];

    const orgTree = buildOrganization(members);

    // Checks if the operation sector is correctly created
    expect(orgTree).toHaveLength(1);
    expect(orgTree[0].name).toBe(team1.operationsSector);

    // Checks if the department is correctly created
    expect(orgTree[0].departments).toHaveLength(1);
    expect(orgTree[0].departments[0].name).toBe(team1.department);

    // Checks if the clusters are correctly created
    const department = orgTree[0].departments[0];
    expect(department.clusters).toHaveLength(2);

    const cluster1 = department.clusters?.[0];
    const cluster2 = department.clusters?.[1];
    expect(cluster1?.name).toBe(team1.cluster);
    expect(cluster2?.name).toBe(team2.cluster);

    // Checks if the member is present in both teams
    expect(cluster1?.teams[0].name).toBe(team1.team);
    expect(cluster1?.teams[0].members).toContainEqual(members[0]);

    expect(cluster2?.teams[0].name).toBe(team2.team);
    expect(cluster2?.teams[0].members).toContainEqual(members[0]);
  });

  test("Ended positions are not counted", () => {
    const currPosition: Partial<Position> = {
      operationsSector: "Development Operations",
      department: "Development",
    };
    const prevPosition: Partial<Position> = {
      operationsSector: "External Operations",
      department: "Marketing",
      endDate: new Date(),
    };

    const members: Membership[] = Array.from({ length: 5 }, (_, i) =>
      makeMember({
        positionHistory: [
          makePosition(currPosition),
          makePosition(prevPosition),
        ],
      }),
    );

    const orgTree = buildOrganization(members);
    expect(orgTree).toHaveLength(1);
    expect(orgTree[0].name).toBe(currPosition.operationsSector);

    expect(orgTree[0].departments).toHaveLength(1);
    expect(orgTree[0].departments[0].name).toBe(currPosition.department);
  });

  test("Empty input gives empty result", () => {
    const orgTree = buildOrganization([]);
    expect(orgTree).toHaveLength(0);
  });
});
