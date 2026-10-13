import {
  currentPositions,
  isTeamLead,
  type Cluster,
  type Department,
  type DepartmentNames,
  type Membership,
  type OperationsSector,
  type Position,
  type SectorNames,
  type Team,
} from "./types.ts";
import { members } from "./data.ts";

export function buildOrganization(members: Membership[]): OperationsSector[] {
  // Maps indices of operation sectors, departments, and clusters for faster lookup
  const sectorMap = new Map(); // Maps sector names to (i, departments)
  const sectors: OperationsSector[] = [];

  /**
   * Gets an operation sector by its name
   * If the sector does not exist, create a new one
   * @param sectorName The position containing the name of the operation sector
   * @returns The operation sector corresponding with the position
   */
  function addOperationSector(position: Position): OperationsSector | null {
    const sectorName = position.operationsSector;

    if (sectorName == null) return null;
    if (sectorMap.has(sectorName)) return sectors[sectorMap.get(sectorName).i];

    // Creates new operation sector
    sectorMap.set(sectorName, {
      i: sectorMap.size,
      departmentMap: new Map(), // Maps department names to { i, clusters }
    });

    let newSector: OperationsSector;
    sectors.push(
      (newSector = {
        name: sectorName,
        leadership: [],
        departments: [],
      }),
    );

    return newSector;
  }

  /**
   * Gets a department by its name
   * If the department does not exist, create a new one
   * @param position The position containing the name of department
   * @returns The department corresponding with the position
   */
  function addDepartment(position: Position): Department | null {
    const { operationsSector: sectorName, department: departmentName } =
      position;

    // Checks if the sector exists
    if (
      sectorName == null ||
      departmentName == null ||
      !sectorMap.has(sectorName)
    )
      return null;

    // Checks if the department already exists and return it
    const { i, departmentMap } = sectorMap.get(sectorName);
    const sector = sectors[i];
    if (departmentMap.has(departmentName))
      return sector.departments[departmentMap.get(departmentName).i];

    // Creates new department
    departmentMap.set(departmentName, {
      i: departmentMap.size,
      clusterMap: new Map(), // Maps cluster names to { i, teams }
      teamMap: new Map(), // Maps team names to { i }
    });

    let newDepartment: Department;
    sector.departments.push(
      (newDepartment = {
        name: departmentName,
        members: [],
      }),
    );

    return newDepartment;
  }

  /**
   * Gets a department team by its name
   * If the department team  does not exist, create a new one
   * @param position The position containing the name of department team
   * @returns The department team  corresponding with the position
   */
  function addDepartmentTeam(position: Position): Team | null {
    const {
      operationsSector: sectorName,
      department: departmentName,
      team: teamName,
    } = position;

    // Checks if the sector exists
    if (
      sectorName == null ||
      departmentName == null ||
      teamName == null ||
      !sectorMap.has(sectorName)
    )
      return null;

    // Checks if the department exists
    const { i, departmentMap } = sectorMap.get(sectorName);
    if (!departmentMap.has(departmentName)) return null;

    // Checks if the department team already exists and returns it
    const { i: j, teamMap } = departmentMap.get(departmentName);
    const memberDepartment = sectors[i].departments[j];
    if (teamMap.has(teamName) && memberDepartment.teams != null)
      return memberDepartment.teams[teamMap.get(teamName).i];

    // Creates new department team
    teamMap.set(teamName, { i: teamMap.size });
    memberDepartment.teams ??= [];
    const newTeamKind =
      departmentName === "Development" ? "development" : "non-development";

    let newTeam: Team;
    memberDepartment.teams.push(
      (newTeam = {
        name: teamName,
        kind: newTeamKind,
        members: [],
      }),
    );

    return newTeam;
  }

  /**
   * Gets a cluster by its name
   * If the cluster does not exist, create a new one
   * @param position The position containing the name of cluster
   * @returns The cluster corresponding with the position
   */
  function addCluster(position: Position): Cluster | null {
    const {
      operationsSector: sectorName,
      department: departmentName,
      cluster: clusterName,
    } = position;

    // Checks if the sector exists
    if (
      sectorName == null ||
      departmentName == null ||
      clusterName == null ||
      !sectorMap.has(sectorName)
    )
      return null;

    // Checks if the department exists
    const { i, departmentMap } = sectorMap.get(sectorName);
    if (!departmentMap.has(departmentName)) return null;

    // Checks if the cluster already exists and returns it
    const { i: j, clusterMap } = departmentMap.get(departmentName);
    const memberDepartment = sectors[i].departments[j];
    if (clusterMap.has(clusterName) && memberDepartment.clusters != null)
      return memberDepartment.clusters[clusterMap.get(clusterName).i];

    // Creates new cluster
    clusterMap.set(clusterName, { i: clusterMap.size, teamMap: new Map() });
    memberDepartment.clusters ??= [];

    let newCluster: Cluster;
    memberDepartment.clusters.push(
      (newCluster = {
        name: clusterName,
        status: "active",
        teams: [],
      }),
    );

    return newCluster;
  }

  /**
   * Gets a cluster team by its name
   * If the cluster team does not exist, create a new one
   * @param position The position containing the name of cluster team
   * @returns The cluster team corresponding with the position
   */
  function addClusterTeam(position: Position): Team | null {
    const {
      operationsSector: sectorName,
      department: departmentName,
      cluster: clusterName,
      team: teamName,
    } = position;
    // Checks if the sector exists
    if (
      sectorName == null ||
      departmentName == null ||
      clusterName == null ||
      teamName == null ||
      !sectorMap.has(sectorName)
    )
      return null;

    // Checks if the department exists
    const { i, departmentMap } = sectorMap.get(sectorName);
    if (!departmentMap.has(departmentName)) return null;

    // Checks if the cluster exists
    const { i: j, clusterMap } = departmentMap.get(departmentName);
    if (
      !clusterMap.has(clusterName) ||
      sectors[i].departments[j].clusters == null
    )
      return null;

    // Checks if the team already exists
    const { i: k, teamMap } = clusterMap.get(clusterName);
    const memberCluster = sectors[i].departments[j].clusters[k];
    if (teamMap.has(teamName))
      return memberCluster.teams[teamMap.get(teamName).i];

    // Creates new team
    teamMap.set(teamName, { i: teamMap.size });
    const newTeamKind =
      departmentName === "Development" ? "development" : "non-development";

    let newTeam: Team;
    memberCluster.teams.push(
      (newTeam = {
        name: teamName,
        kind: newTeamKind,
        members: [],
      }),
    );

    return newTeam;
  }

  let invalidSectors = 0;
  let invalidDepartments = 0;

  // Builds organization tree indices
  for (const member of members) {
    const memberCurrentPositions = currentPositions(member);
    for (const position of memberCurrentPositions) {
      const {
        operationsSector: sector,
        department,
        team,
        cluster,
        role,
      } = position;

      const memberSector = addOperationSector(position);
      if (memberSector == null) {
        invalidSectors += 1;
        break;
      }

      const memberDepartment = addDepartment(position);
      if (memberDepartment == null) {
        invalidDepartments += 1;
        break;
      }

      // Creates clusters/teams
      if (team == null) {
        memberDepartment?.members.push(member);
      }
      // Team present, but not cluster
      else if (team != null && cluster == null) {
        const memberTeam = addDepartmentTeam(position);
        memberTeam?.members.push(member);
        if (memberTeam != null && isTeamLead(position.role))
          memberTeam.teamLead ??= member;
      }

      // Explicitly checks for when team and cluster are present
      else if (team != null && cluster != null) {
        addCluster(position);
        const memberTeam = addClusterTeam(position);
        memberTeam?.members.push(member);
        if (memberTeam != null && isTeamLead(position.role))
          memberTeam.teamLead ??= member;
      }
    }
  }

  // Logs invalid sectors/departments for bookkeeping
  console.log(
    `Invalid sectors: (${invalidSectors}). Invalid departments: (${invalidDepartments})`,
  );
  return sectors;
}
