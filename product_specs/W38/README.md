# W38 — Sprint Overview

**Week of:** 2026-09-14
**Phase:** Phase 1 (frontend + logic only — no backend, no database)
**Created:** 2026-09-14
**Updated:** 2026-09-14

---

## What we are building this week

Three features, each broken into ~1-hour specs. Every spec is a standalone
assignment: it tells you *what* to change and *how to approach it*, but you write
the code. If a spec tells you exactly what to type, that is a bug in the spec —
tell Brennen.

| Feature | Specs | Summary |
|---|---|---|
| **W38.1 — Organization view-model** | 1.1, 1.2, 1.3 | Stop hand-building fake teams in `members.tsx`. Derive the org tree from the real `members` array and hold it in React state so it can change. |
| **W38.2 — Member hover card** | 2.1, 2.2, 2.3, 2.4 | Hover a member → popover showing their role timeline and their other current positions. Straight from the business spec. |
| **W38.3 — Drag & drop member between teams** | 3.1, 3.2, 3.3, 3.4 | Phase 1 CONTROLLER requirement: drag a member from one team to another, within and across departments. |
| **W38.4 — Delete member with typed confirmation** | 4.1, 4.2, 4.3 | "Member data cannot be deleted without typing out a DELETE verification." |

Features **not** specced this week are tracked in
[`../features_TODO.md`](../features_TODO.md).

---

## Dependency graph

Specs with no dependencies can be picked up immediately. Chained specs
(`W38.1.1 → W38.1.2`) must be done in order — do not start a spec whose
dependency is still `TODO`.

```
START HERE (no dependencies, 5 specs can run in parallel on day 1)
│
├── W38.1.1 ──► W38.1.2 ──► W38.1.3 ──┬──► W38.3.3 ──► W38.3.4
│                                     │        ▲
├── W38.2.1 ──► W38.2.2 ──► W38.2.3 ──┼──► W38.2.4
│                                     │
├── W38.3.1 ────────────────────────► │
├── W38.3.2 ────────────────────────► │
│                                     │
└── W38.4.1 ────────────────────────► └──► W38.4.2 ──► W38.4.3
```

**Available on day 1:** W38.1.1, W38.2.1, W38.3.1, W38.3.2, W38.4.1

---

## Spec index

| Spec | Title | Status | Assigned | FE | BE | DevOps | Depends on |
|---|---|---|---|:--:|:--:|:--:|---|
| W38.1.1 | Give `Department` its teams and clusters | TODO | TBD | 2 | 1 | 1 | — |
| W38.1.2 | Build the organization tree from flat member data | TODO | TBD | 2 | 2 | 1 | W38.1.1 |
| W38.1.3 | Lift the organization into React state | TODO | TBD | 3 | 1 | 1 | W38.1.2 |
| W38.2.1 | Position-history helper functions | TODO | TBD | 2 | 1 | 1 | — |
| W38.2.2 | `MemberHoverCard` presentational component | TODO | TBD | 2 | 1 | 1 | W38.2.1 |
| W38.2.3 | Wire the hover card into the spreadsheet | TODO | TBD | 3 | 1 | 1 | W38.2.2 |
| W38.2.4 | Hover card polish: keyboard, clipping, empty states | TODO | TBD | 3 | 1 | 1 | W38.2.3 |
| W38.3.1 | `moveMemberToTeam` controller function | TODO | TBD | 2 | 2 | 1 | — |
| W38.3.2 | Make member cells draggable | TODO | TBD | 3 | 1 | 1 | — |
| W38.3.3 | Make teams drop targets and commit the move | TODO | TBD | 4 | 1 | 1 | W38.1.3, W38.3.1, W38.3.2 |
| W38.3.4 | Cross-department moves and invalid-drop guards | TODO | TBD | 3 | 2 | 1 | W38.3.3 |
| W38.4.1 | `ConfirmDeleteModal` component | TODO | TBD | 2 | 1 | 1 | — |
| W38.4.2 | Wire delete into the spreadsheet | TODO | TBD | 3 | 1 | 1 | W38.1.3, W38.4.1 |
| W38.4.3 | Clean up dangling references on delete | TODO | TBD | 2 | 3 | 1 | W38.4.2 |

**Total:** 14 specs ≈ 14 developer-hours.

---

## Proficiency scale

Each spec is scored 1–4 on Front End, Back End and DevOps. The score is the
level at which the spec is comfortable, **not** a gate — a 2 attempting a 3 with
a pair is exactly how you become a 3.

| Score | Meaning |
|:--:|---|
| **1** | Complete newbie. Has not written code in this area before. |
| **2** | Associate. Can follow a pattern that already exists in the repo. |
| **3** | Intermediate. Can design a small component or function from a description. |
| **4** | Senior. Can reason about state ownership, edge cases and browser APIs unaided. |

---

## Working agreements

1. **One branch per spec.** Name it `w38/<spec-id>-<short-name>`, e.g.
   `w38/2-2-member-hover-card`.
2. **One PR per spec**, titled with the spec ID. Link the spec file in the PR
   description.
3. **Update the spec file** in your PR: set `Status` to `In Progress` when you
   start and `Completed` when the PR merges, and bump the `Updated` date.
4. **Pairing:** if you pair, put both names in `Assigned Developers` and note who
   drove.
5. **Do not refactor outside your spec's "Files you will touch" list.** If you
   think something else needs fixing, add it to `features_TODO.md` instead.
6. **`npm run build` must pass** before you open a PR. TypeScript errors are not
   "just warnings" here.

## Running the project

```bash
npm install
npm run dev      # Vite dev server
npm run build    # must pass before every PR
```

Everything in Phase 1 reads from `utils/model/data.ts`. There is no backend in
play this week — `server/index.ts` exists but is not wired to the frontend yet.
