import type { Membership, Position } from "@utils/model/types";

let emailIndex = 0; // Internal counter to keep emails distinct
let supervisorIndex = 0;

const makeMember = (overrides?: Partial<Membership>): Membership => {
  return {
    ...{
      name: "test member",
      positionHistory: [
        makePosition(),
        makePosition(),
        makePosition({ endDate: new Date() }),
      ],
      emails: [`test_member${emailIndex++}@gmail.com`],
    },
    ...overrides,
  };
};

const makePosition = (overrides?: Partial<Position>): Position => {
  return {
    ...{
      role: "Accountant",
      startDate: new Date(),
      supervisor: [
        `supervisor${supervisorIndex}`,
        `supervisor${supervisorIndex++}@gmail.com`,
      ],
    },
    ...overrides,
  };
};

export { makeMember, makePosition };
