# W45 — Sprint Overview

**Week of:** 2026-11-02
**Phase:** Phase 1 → Phase 2 transition (the frontend starts talking to the server)
**Created:** 2026-11-02
**Updated:** 2026-11-02
**Written by:** Brennen L.

---

## Read this first: `main` does not build

The W38.1 (org view-model), W38.3 (drag & drop) and W38.4 (delete) merges
collided. On `origin/main` today:

- `src/pages/members.tsx` declares `appMembers` state twice, and still has the
  old hand-built `team` / `nonDevTeam` / `department` / `sector` block that
  references types it no longer imports.
- `src/components/SpreadsheetLayout.tsx` has a duplicated props block in
  `TeamLayout` and a draggable `<div>` nested inside another draggable `<div>`.
- `server/index.ts` calls `cors()` without importing it, so `npm run server`
  crashes on start.

**W45.0** fixes the frontend half and blocks every other frontend PR. **W45.3.1**
fixes the server half. Until W45.0 merges, branch from `main` and expect to
rebase.

---

## Assignments

Each developer owns one feature this week. Scores are
Front End – Back End – Design – Version Control – DevOps.

| Feature | Owner | Proficiency | Specs | Why this person |
|---|---|---|---|---|
| **W45.0 — Repair the broken merge on `main`** | Maya K. | 3-3-4-4-X (14) | 0 | Strongest version control on the team, and her W45.6 work lives in the same file. |
| **W45.1 — Frontend reads members from the server** | Chunlin J. | 3-2-1-3-3 (12) | 1.1–1.3 | Continues W43 "Move model ownership to the server". Only developer with DevOps 3, which the dev proxy needs. |
| **W45.2 — Permissions by user type** | Kevin Z. | 3-3-3-3 (12) | 2.1–2.3 | Continues W43 work on `feature/user-permissions`. |
| **W45.3 — Server hardening** | Manan R. | 2-2-1-3-X (8) | 3.1–3.2 | Follow-up to his merged REST surface (PR #10). Back end at the right level, no front end. |
| **W45.4 — Test runner and model tests** | Jenny D. | 3-3-1-2 (9) | 4.1–4.3 | Highest-leverage item in `features_TODO.md`. Pure functions, balanced FE/BE. |
| **W45.5 — Search, filter and sort members** | Shahbaz S. | 3-3-2-3-X (11) | 5.1–5.2 | A pure function first, then a UI. Solid FE and BE. |
| **W45.6 — Match the Crew Formations layout** | Maya K. | 3-3-4-4-X (14) | 6.1–6.3 | Design 4. 11–15 hrs/week gives her room for W45.0 as well. |

**Total:** 17 specs ≈ 17 developer-hours. Maya has 4 specs, everyone else has
2–3.

> **Sheet note:** W43 "Complete the REST surface" (Manan) is still marked
> **TO DO** on the sprint sheet, but it merged as PR #10 (`b68a76a`). Mark it
> **DONE**.

---

## Dependency graph

```
START HERE (dependency-free, 6 specs can start on day 1)
│
├── W45.0 (Maya) ── repair main ─────────────────┬──► W45.1.3, W45.2.3, W45.5.2, W45.6.2, W45.6.3
│                                                │
├── W45.3.1 (Manan) ── server cleanup + /api ────┼──► W45.1.2 ──► W45.1.3
│        └──► W45.3.2                            │
│                                                │
├── W45.1.1 (Chunlin) ── date revival helper ────┴──► W45.1.3
│
├── W45.2.1 (Kevin) ──► W45.2.2
│        └──────────────► W45.2.3  (also needs W45.0)
│
├── W45.4.1 (Jenny) ──► W45.4.2 ──► W45.4.3
│
├── W45.5.1 (Shahbaz) ──► W45.5.2  (also needs W45.0)
│
└── W45.6.1 (Maya) ──► W45.6.2, W45.6.3  (also need W45.0)
```

**Available on day 1:** W45.0, W45.1.1, W45.2.1, W45.3.1, W45.4.1, W45.5.1, W45.6.1

### Files more than one person will touch: coordinate

| File | Specs | Rule |
|---|---|---|
| `src/components/SpreadsheetLayout.tsx` | 0, 2.3, 6.2, 6.3 | W45.0 merges first. 2.3 only adds conditionals around existing elements. 6.2/6.3 restyle. Small PRs, rebase often. |
| `src/pages/members.tsx` | 0, 1.3, 2.3, 5.2 | 1.3 changes where data comes from. 5.2 adds a filter layer *between* state and `buildOrganization`. Whoever merges second rebases. |
| `server/index.ts` | 2.1, 3.1, 3.2 | 3.1 (the `/api` prefix) merges before anyone else edits routes. |

---

## Spec index

| Spec | Title | Owner | FE | BE | DevOps | Depends on |
|---|---|---|:--:|:--:|:--:|---|
| W45.0 | Repair the W38 merge on `main` | Maya K. | 3 | 1 | 1 | — |
| W45.1.1 | Revive `Date`s in members that arrive as JSON | Chunlin J. | 1 | 2 | 1 | — |
| W45.1.2 | Vite dev proxy and one-command dev | Chunlin J. | 1 | 2 | 3 | W45.3.1 |
| W45.1.3 | Members page loads from `GET /api/members` | Chunlin J. | 3 | 2 | 1 | W45.0, W45.1.1, W45.1.2 |
| W45.2.1 | Make the login context actually hold the user | Kevin Z. | 3 | 2 | 1 | — |
| W45.2.2 | Navbar: current user and log out | Kevin Z. | 2 | 1 | 1 | W45.2.1 |
| W45.2.3 | `can()` permission helper and UI gating | Kevin Z. | 3 | 2 | 1 | W45.0, W45.2.1 |
| W45.3.1 | Server cleanup and the `/api` prefix | Manan R. | 1 | 2 | 2 | — |
| W45.3.2 | Validate `POST /api/members` | Manan R. | 1 | 3 | 1 | W45.3.1 |
| W45.4.1 | Install Vitest and a member fixture builder | Jenny D. | 1 | 2 | 2 | — |
| W45.4.2 | Tests for the operations functions | Jenny D. | 1 | 2 | 1 | W45.4.1 |
| W45.4.3 | Tests for `getCycles` and `buildOrganization` | Jenny D. | 1 | 3 | 1 | W45.4.2 |
| W45.5.1 | `filterMembers` / `sortMembers` pure functions | Shahbaz S. | 1 | 2 | 1 | — |
| W45.5.2 | Search and filter bar on the members page | Shahbaz S. | 3 | 1 | 1 | W45.0, W45.5.1 |
| W45.6.1 | Formations design audit and colour tokens | Maya K. | 2 | 1 | 1 | — |
| W45.6.2 | Restyle the team block to match the sheet | Maya K. | 3 | 1 | 1 | W45.0, W45.6.1 |
| W45.6.3 | Sector/department headers and the colour key | Maya K. | 3 | 1 | 1 | W45.0, W45.6.1 |

---

## Proficiency scale

Each spec is scored 1–4 on Front End, Back End and DevOps. The score is the
level at which the spec feels comfortable. It is **not** a gate.

| Score | Meaning |
|:--:|---|
| **1** | Complete newbie. Has not written code in this area before. |
| **2** | Associate. Can follow a pattern that already exists in the repo. |
| **3** | Intermediate. Can design a small component or function from a description. |
| **4** | Senior. Can reason about state ownership, edge cases and browser APIs unaided. |

---

## Working agreements

1. **Pull first.** Several local clones are many commits behind `origin/main`.
   Run `git pull` before you branch.
2. **One branch per spec**, named `w45/<spec-id>-<short-name>`, e.g.
   `w45/2-1-auth-context`. Kevin can keep `feature/user-permissions` for 2.1
   if he rebases it onto `main` first.
3. **One PR per spec**, titled with the spec ID, with the spec file linked.
4. **Update the spec file in your PR**: `Status` → `In Progress` / `Completed`,
   and bump `Updated`.
5. **Stay inside "Files you will touch."** Put anything else in
   `features_TODO.md`.
6. **`npm run build` must pass** before you open a PR. Once W45.4.1 merges,
   **`npm test` must pass too.**

## Running the project

```bash
npm install
npm run dev       # Vite (frontend)
npm run server    # Express on :3000 (after W45.1.2: one command runs both)
npm run build     # must pass before every PR
```
