import { beforeEach, describe, expect, test } from "vitest";
import { currentPositions, type Membership } from "@utils/model/types.ts";
import { makeMember, makePosition } from "@utils/model/testing/fixtures";
import {
  addRole,
  getCycles,
  moveMember,
  moveMemberToTeam,
  removeMemberDeep,
  updateMember,
} from "@utils/model/operations";
import { isEqual } from "lodash";

describe("`moveMemberToTeam` works as expected", () => {
  let members: Membership[] = [];
  let member: Membership;

  beforeEach(() => {
    members = Array.from({ length: 5 }, (_, i) => makeMember());
    member = members[0];
  });

  test("Old position has an `endDate`", () => {
    const oldPosition = member.positionHistory[0]; // Object reference; should update
    const newPosition = makePosition();
    expect(
      moveMemberToTeam(
        members,
        member.emails[0],
        oldPosition.role,
        newPosition.role,
        newPosition.supervisor,
      ),
    ).not.toBeNull();

    // Checks if the old positions is ended
    expect(oldPosition).toHaveProperty("endDate");
  });

  test("New position has correct role/supervisor", () => {
    const oldPosition = member.positionHistory[0]; // Object reference; should update
    const newPosition = makePosition();
    expect(
      moveMemberToTeam(
        members,
        member.emails[0],
        oldPosition.role,
        newPosition.role,
        newPosition.supervisor,
      ),
    ).not.toBeNull();

    // Checks if the new position is added
    expect(member.positionHistory).toContainEqual(newPosition);
  });

  test("`positionHistory` gets longer by one", () => {
    const numOldPositions = member.positionHistory.length;

    const oldRole = member.positionHistory[0].role;
    const newPosition = makePosition();
    expect(
      moveMemberToTeam(
        members,
        member.emails[0],
        oldRole,
        newPosition.role,
        newPosition.supervisor,
      ),
    ).not.toBeNull();

    // Checks if the number of positions in history has incremented
    expect(member.positionHistory).toHaveLength(numOldPositions + 1);
  });

  test("Other positions in `currentPositions` is untouched", () => {
    const numOldPositions = member.positionHistory.length;

    const oldPosition = currentPositions(member)[0];
    const newPosition = makePosition();

    expect(
      moveMemberToTeam(
        members,
        member.emails[0],
        oldPosition.role,
        newPosition.role,
        newPosition.supervisor,
      ),
    ).not.toBeNull();

    // Current positions other than the one replaced
    // Includes the new position
    const otherPositions = currentPositions(member).filter(
      (role) => role !== oldPosition,
    );

    // Checks if the number of other positions is preserved
    expect(otherPositions).toHaveLength(numOldPositions - 1);

    // Checks if the other current positions remain unmodified
    for (const position of otherPositions) {
      expect(position).not.toHaveProperty("endDate");
    }
  });

  test("`null` is returned on invalid inputs", () => {
    const oldPosition = member.positionHistory[0];
    const newPosition = makePosition();
    // Checks for non-existant emails
    expect(
      moveMemberToTeam(
        members,
        "NON_EXISTENT_EMAIL",
        oldPosition.role,
        newPosition.role,
        newPosition.supervisor,
      ),
    ).toBeNull();

    // Checks for non-existant roles
    expect(
      moveMemberToTeam(
        members,
        member.emails[0],
        "Vice President",
        newPosition.role,
        newPosition.supervisor,
      ),
    ).toBeNull();
  });
});

describe("`moveMember` works as expected", () => {
  let members: Membership[] = [];
  let member: Membership;

  beforeEach(() => {
    members = Array.from({ length: 5 }, (_, i) => makeMember());
    member = members[0];
  });

  test("All previous positions are ended", () => {
    const prevHistNum = member.positionHistory.length;
    const newPosition = makePosition();
    newPosition.supervisor &&
      expect(
        moveMember(
          members,
          member.emails[0],
          newPosition.role,
          newPosition.supervisor,
        ),
      ).not.toBeNull();

    // Checks if the number of other positions is preserved
    expect(member.positionHistory.length).toBe(prevHistNum + 1);

    // Checks if all other positions have ended
    for (const position of member.positionHistory) {
      if (isEqual(position, newPosition)) {
        expect(position).toMatchObject(newPosition);
      } else {
        expect(position).toHaveProperty("endDate");
      }
    }
  });

  test("New position has correct role/supervisor", () => {
    const newPosition = makePosition();
    newPosition.supervisor &&
      expect(
        moveMember(
          members,
          member.emails[0],
          newPosition.role,
          newPosition.supervisor,
        ),
      ).not.toBeNull();

    const currPositions = currentPositions(member);

    // Checks if the new position is added correctly
    expect(currPositions).toHaveLength(1);
    expect(currPositions[0]).toEqual(newPosition);
  });

  test("`null` is returned on invalid inputs", () => {
    const newPosition = makePosition();

    expect(
      newPosition.supervisor &&
        moveMember(
          members,
          "NON_EXISTENT_EMAIL",
          newPosition.role,
          newPosition.supervisor,
        ),
    ).toBeNull();
  });
});

describe("`addRole` works as expected", () => {
  let members: Membership[] = [];
  let member: Membership;

  beforeEach(() => {
    members = Array.from({ length: 5 }, (_, i) => makeMember());
    member = members[0];
  });

  test("New position has correct role/supervisor", () => {
    const prevHistNum = member.positionHistory.length;

    const newPosition = makePosition();
    newPosition.supervisor &&
      expect(
        addRole(
          members,
          member.emails[0],
          newPosition.role,
          newPosition.supervisor,
        ),
      ).not.toBeNull();

    // Checks if the new position is added correctly
    expect(member.positionHistory).toHaveLength(prevHistNum + 1);
    expect(currentPositions(member)).toContainEqual(newPosition);
  });

  test("`null` is returned on invalid inputs", () => {
    const newPosition = makePosition();

    expect(
      newPosition.supervisor &&
        addRole(
          members,
          "NON_EXISTENT_EMAIL",
          newPosition.role,
          newPosition.supervisor,
        ),
    ).toBeNull();
  });
});

describe("`removeMemberDeep` works as expected", () => {
  const sharedSupervisor = makeMember({
    name: "SHARED_SUPERVISOR",
    emails: ["shared_supervisor@gmail.com"],
  });
  let members: Membership[] = [sharedSupervisor];

  beforeEach(() => {
    // Creates 10 positions which the supervisor leads
    members.push(
      ...Array.from({ length: 5 }, (_, i) =>
        makeMember({
          positionHistory: [
            makePosition({
              supervisor: ["SHARED_SUPERVISOR", "shared_supervisor@gmail.com"],
            }),
            makePosition({
              supervisor: ["SHARED_SUPERVISOR", "shared_supervisor@gmail.com"],
            }),
            makePosition(),
          ],
        }),
      ),
    );
  });

  test("Removing a supervisor also removes all references", () => {
    const { removed, clearedReferences, affectedMembers } = removeMemberDeep(
      members,
      "shared_supervisor@gmail.com",
    );

    expect(removed).toEqual(sharedSupervisor);
    expect(clearedReferences).toBe(10);
    expect(affectedMembers).toBe(5);
  });

  test("Removing a non-existant member does nothing", () => {
    const { removed, clearedReferences, affectedMembers } = removeMemberDeep(
      members,
      "NON_EXISTENT_EMAIL",
    );

    expect(removed).toBeNull();
    expect(clearedReferences).toBe(0);
    expect(affectedMembers).toBe(0);
  });
});

describe("`updateMember` works as expected", () => {
  let sharedSupervisor: Membership;
  let members: Membership[] = [];

  beforeEach(() => {
    sharedSupervisor = makeMember({
      name: "SHARED_SUPERVISOR",
      emails: ["shared_supervisor@gmail.com"],
    });
    members = [sharedSupervisor];

    // Creates 10 positions which the supervisor leads
    members.push(
      ...Array.from({ length: 5 }, (_, i) =>
        makeMember({
          positionHistory: [
            makePosition({
              supervisor: ["SHARED_SUPERVISOR", "shared_supervisor@gmail.com"],
            }),
            makePosition({
              supervisor: ["SHARED_SUPERVISOR", "shared_supervisor@gmail.com"],
            }),
            makePosition(),
          ],
        }),
      ),
    );
  });

  //``updateMember` does not prevent an empty `emails` from being pass
  // Bug causes all supervisor references to the updated member to be `undefined`
  test.todo("Prevents setting a member with empty emails", () => {
    const updateStatus = updateMember(members, "shared_supervisor@gmail.com", {
      name: "NEW_SHARED_SUPERVISOR",
      emails: [],
    });

    expect(updateStatus?.updated.emails).not.toHaveLength(0);
  });

  test("Updating supervisor does not break references", () => {
    const update = {
      name: "NEW_SHARED_SUPERVISOR",
      emails: ["new_shared_supervisor@gmail.com"],
    };
    const updateStatus = updateMember(
      members,
      "shared_supervisor@gmail.com",
      update,
    );

    expect(updateStatus?.updated).toMatchObject(update);
    // 2 supervisor references in 5 members
    expect(updateStatus?.updatedReferences).toBe(10);
  });

  test("Removing a non-existant member does nothing", () => {
    console.log(sharedSupervisor);
    const updateStatus = updateMember(members, "NON_EXISTENT_EMAIL", {
      name: "NEW_SHARED_SUPERVISOR",
      emails: [],
    });
    console.log(sharedSupervisor);

    expect(updateStatus).toBeNull();
    expect(sharedSupervisor).toHaveProperty("name", "SHARED_SUPERVISOR");
    expect(sharedSupervisor).toHaveProperty("emails", [
      "shared_supervisor@gmail.com",
    ]);
  });
});

describe.only("`getCycles` works as expected", () => {
  test("No supervisors at all → no cycles", () => {
    const members = Array.from({ length: 5 }, (_, i) =>
      makeMember({
        positionHistory: [makePosition({ supervisor: undefined })],
      }),
    );

    expect(getCycles(members)).toHaveLength(0);
  });

  test("A → B → C → no cycles", () => {
    const A = makeMember({ positionHistory: [] });
    const B = makeMember({
      positionHistory: [makePosition({ supervisor: [A.name, A.emails[0]] })],
    });
    const C = makeMember({
      positionHistory: [makePosition({ supervisor: [B.name, B.emails[0]] })],
    });

    // Checks if there are no cycles
    const members = [A, B, C];
    expect(getCycles(members)).toHaveLength(0);
  });

  test("A ↔ B → one group containing both", () => {
    const A = makeMember({ positionHistory: [] });
    const B = makeMember({
      positionHistory: [makePosition({ supervisor: [A.name, A.emails[0]] })],
    });
    A.positionHistory = [makePosition({ supervisor: [B.name, B.emails[0]] })];

    // Checks if there is 1 cycle
    const members = [A, B];
    const cycles = getCycles(members);
    expect(cycles).toHaveLength(1);

    // Checks if the cycle contain the correct indices
    const ABcycle = cycles[0];
    expect(ABcycle).toContain(0);
    expect(ABcycle).toContain(1);
  });

  test("Two separate loops → two groups", () => {
    const A = makeMember({ positionHistory: [] });
    const B = makeMember({
      positionHistory: [makePosition({ supervisor: [A.name, A.emails[0]] })],
    });
    A.positionHistory = [makePosition({ supervisor: [B.name, B.emails[0]] })];

    const C = makeMember({ positionHistory: [] });
    const D = makeMember({
      positionHistory: [makePosition({ supervisor: [C.name, C.emails[0]] })],
    });
    C.positionHistory = [makePosition({ supervisor: [D.name, D.emails[0]] })];

    // Checks if there are 2 distinct cycles
    const members = [A, B, C, D];
    const cycles = getCycles(members);
    expect(cycles).toHaveLength(2);

    // Checks if the cycles contain the correct indices
    const ABcycle = cycles[0];
    expect(ABcycle).toContain(0);
    expect(ABcycle).toContain(1);

    const CDcycle = cycles[1];
    expect(CDcycle).toContain(2);
    expect(CDcycle).toContain(3);
  });

  // self-supervising members are not properly marked
  test.todo("Member supervising themself returns themself", () => {
    const A = makeMember({ positionHistory: [] });
    A.positionHistory = [makePosition({ supervisor: [A.name, A.emails[0]] })];

    const cycles = getCycles([A]);
    expect(cycles).toHaveLength(1);
    expect(cycles).toEqual([[0]]);
  });

  test("Ended positions do not count", () => {
    const A = makeMember({ positionHistory: [] });
    const B = makeMember({
      positionHistory: [makePosition({ supervisor: [A.name, A.emails[0]] })],
    });
    A.positionHistory = [
      makePosition({ supervisor: [B.name, B.emails[0]], endDate: new Date() }),
    ];

    // Checks if there are no cycles
    const members = [A, B];
    expect(getCycles(members)).toHaveLength(0);
  });
});
