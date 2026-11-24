# TODO List

## Bugs
- The function `updateMember` in `utils/model/operations.ts` allows setting a member's email to an empty array, 
preventing any future references to that member.
- The function `getCycles` in `utils/model/operations.ts` does not report self-references.
In Tarjan's Algorithm, strongly-connected commponents (SCC) of length 1 are considered cycles, even if it is not self-referencing.<br>
Instead of directly filtering out SCCs of length 1, use `reduce` to retain the self-referenced nodes.
    > [!WARNING] Do not remove the `filter` without replacement--Tarjan's algorithm marks members with no supervisors as SCCs of length 1.