import type { Membership, Role } from "./types";

/**
 * Determines all cyclic supervisor relationships in linear time using Tarjan's
 * Strongly Connected Components Algorithm
 * @param members List of members to check for cycles
 * @returns A list of member indicies that create a cycle
 */
function getCycles(members: Membership[]): number[][] {
  // Maps member email to indices
  const memberEmailToIdx = new Map<string, number>();
  members.forEach((member, i) =>
    member.emails.forEach((email) => {
      memberEmailToIdx.set(email, i);
    }),
  );

  // Graph is close to a tree and will be sparse
  const graph = new Map<number, number[]>();
  members.forEach((member, i) => {
    // Converts all edges into adjacency lists; non-existent emails are ignored
    const edges = member.currentRoles.reduce<number[]>(
      (accum, { supervisor }) => {
        const index = memberEmailToIdx.get(supervisor);
        if (index !== undefined) accum.push(index);
        return accum;
      },
      [],
    );

    graph.set(i, edges);
  });

  return tarjan(graph).filter((path) => path.length > 1);
}

/**
 * Runs Tarjan's Strongly Connected Components (SCC) Algorithm to partition a graph into SCCs.
 * @param graph A hashmap mapping vertices to a list of edges
 * @returns A list of SCCs
 */
function tarjan(graph: Map<number, number[]>): number[][] {
  let index = 0;
  const stack: number[] = [];

  const order = Array(graph.size).fill(-1); // Visit order of node `i`
  const lowest = Array(graph.size).fill(-1); // Minimum number of vertcies reachable from `i`

  // Whether vertex `i` has been visited, though it may not be processed yet
  const visited = Array(graph.size).fill(false);

  // Whether vertex `i` has been processed in the depth-first search
  const processed = Array(graph.size).fill(false);

  // Strongly connect commponents
  const sccs: number[][] = [];

  function strongConnect(vertex: number) {
    order[vertex] = lowest[vertex] = index;
    index++;
    visited[vertex] = true;
    stack.push(vertex);

    const neighbors = graph.get(vertex) ?? [];
    for (const neighbor of neighbors) {
      if (!visited[neighbor]) {
        strongConnect(neighbor);
        lowest[vertex] = Math.min(lowest[vertex], lowest[neighbor]);
      } else if (!processed[neighbor]) {
        lowest[vertex] = Math.min(lowest[vertex], order[neighbor]);
      }
    }

    processed[vertex] = true;
    if (lowest[vertex] === order[vertex]) {
      // Retrieves all vertices of a strongly connected component
      const scc: number[] = [];
      let sccVertex = stack.pop();

      while (sccVertex !== vertex && sccVertex != undefined) {
        scc.push(sccVertex);
        sccVertex = stack.pop();
      }

      sccVertex != undefined && scc.push(sccVertex);
      sccs.push(scc);
    }
  }

  // Tarjan's Algorithm main loop
  for (let vertex = 0; vertex < graph.size; vertex++) {
    if (visited[vertex]) continue;
    strongConnect(vertex);
  }

  return sccs;
}

/**
 * Adds a new member to the system. `member` should be fully constructed before passing in.
 * @param members List of members in the model
 * @param member The member to add
 * @returns The new added member
 */
function addMember(members: Membership[], member: Membership): Membership {
  members.push(member);
  return member;
}

/**
 * Moves a member from their current role to a new role, clearing all previous
 * roles.
 * @param members List of members in the model
 * @param email The email of the member
 * @param newRole The new role to move the member to
 * @param supervisor The supervisor overseeing the new role
 * @returns The member associated with the `email` if they exist and was moved to the role; `null` otherwise
 */
function moveMember(
  members: Membership[],
  email: string,
  newRole: Role,
  supervisor: string,
): Membership | null {
  const member = members.find((member) => member.emails.includes(email));
  if (!member) return null;

  member.currentRoles = [{ role: newRole, startDate: new Date(), supervisor }];
  return member;
}

/**
 * Adds a new role to a member without removing all existing roles.
 * @param members List of members in the model
 * @param email The email username of the member
 * @param newRole The new role to move the member to
 * @param supervisor The supervisor overseeing the new role
 * @returns The member associated with the `email` if they exist and was added the role; `null` otherwise
 */
function addRole(
  members: Membership[],
  email: string,
  newRole: Role,
  supervisor: string,
): Membership | null {
  const member = members.find((member) => member.emails.includes(email));
  if (!member) return null;

  member.currentRoles.push({
    role: newRole,
    startDate: new Date(),
    supervisor,
  });

  return member;
}

/**
 * Removes a member from the model
 * @param members List of members in the model
 * @param email The email of the member
 * @returns The member associated with the `email` if they exist and was deleted; `null` otherwise
 */
function removeMember(members: Membership[], email: string): Membership | null {
  const memberIndex = members.findIndex((member) =>
    member.emails.includes(email),
  );

  if (memberIndex === -1) return null;

  const member = members.splice(memberIndex, 1)[0];
  return member;
}

export { getCycles, addMember, moveMember, addRole, removeMember };