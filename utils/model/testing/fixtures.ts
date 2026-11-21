import type { Membership, Position } from "@utils/model/types";

let emailIndex = 0; // Internal counter to keep emails distinct
const makeMember = (overrides?: Partial<Membership>): Membership => {
  return {
    ...{
      name: "test member",
      positionHistory: [makePosition()],
      emails: [`test_member${emailIndex++}@gmail.com`],
    },
    ...overrides,
  };
};

const makePosition = (overrides?: Partial<Position>): Position => {
  return {
    ...{
      role: "M",
      startDate: new Date(),
    },
    ...overrides,
  };
};

export { makeMember, makePosition };
