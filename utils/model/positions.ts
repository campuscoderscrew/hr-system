import equal from "fast-deep-equal";
import { formatRole, type Membership, type Position } from "./types.ts";

export function pastPositions(member: Membership): Position[] {
  return member.positionHistory
    .filter((position) => position.endDate != null)
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
}

export function otherCurrentPositions(
  member: Membership,
  excluding?: Position,
): Position[] {
  return member.positionHistory.filter(
    (position) =>
      position.endDate === undefined &&
      (excluding == null || !equal(position, excluding)),
  );
}

export function formatPositionPeriod(position: Position): string {
  const dateFormat = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const startDateString = dateFormat.format(position.startDate);
  const endDateString = position.endDate
    ? dateFormat.format(position.endDate)
    : "Present";

  return `${startDateString} – ${endDateString}`;
}

export function roleTimeline(
  member: Membership,
): { label: string; period: string; isCurrent: boolean }[] {
  return member.positionHistory
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
    .map((position) => ({
      label: formatRole(position.role, position.experienceLevel),
      period: formatPositionPeriod(position),
      isCurrent: position.endDate == null,
    }));
}