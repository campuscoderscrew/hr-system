import type { UserType } from "./types";

export type Action = "view" | "viewContact" | "move" | "delete" | "edit";
type PermissionKey = `${UserType}:${Action}`;

const PERMISSIONS_TABLE = new Map<PermissionKey, boolean>([
  // ADMIN
  ["ADMIN:view", true],
  ["ADMIN:viewContact", true],
  ["ADMIN:move", true],
  ["ADMIN:delete", true],
  ["ADMIN:edit", true],
  // HR
  ["HR:view", true],
  ["HR:viewContact", true],
  ["HR:move", true],
  ["HR:delete", true],
  ["HR:edit", true],
  // MEMBER
  ["MEMBER:view", true],
  ["MEMBER:viewContact", true],
  ["MEMBER:move", false],
  ["MEMBER:delete", false],
  ["MEMBER:edit", false],
  // GUEST
  ["GUEST:view", true],
  ["GUEST:viewContact", false],
  ["GUEST:move", false],
  ["GUEST:delete", false],
  ["GUEST:edit", false],
]);

export function can(userType: UserType | undefined, action: Action): boolean {
  if (userType === undefined) return false;

  return PERMISSIONS_TABLE.get(`${userType}:${action}`) ?? false;
}
