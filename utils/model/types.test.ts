import { expect, test } from "vitest";
import { currentPositions } from "@utils/model/types";
import { makeMember, makePosition } from "./testing/fixtures";

test("`currentPositions` returns only current position", () => {
  const member = makeMember({
    positionHistory: [makePosition({ endDate: new Date() }), makePosition()],
  });

  expect(currentPositions(member)).toHaveLength(1);
});
