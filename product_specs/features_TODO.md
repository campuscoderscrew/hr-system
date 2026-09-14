# Features TODO — no spec written yet

**Created:** 2026-09-14
**Updated:** 2026-09-14
**Maintainer:** Brennen L.

Everything here is a known, wanted piece of the HR System that does **not** have a
spec yet. When a feature gets picked up for a sprint, it moves out of this file
and into `product_specs/W<week>/`.

Add to this file rather than fixing something outside your spec's scope. A line
here is how work gets remembered.

**Legend**
`Phase` — which build phase it belongs to (1 frontend · 2 backend · 3 database · 4 deployment)
`Size` — rough number of 1-hour specs it would take
`Difficulty` — Front End / Back End / DevOps, on our 1–4 scale

---

## Phase 1 — Frontend

### Login and authentication

| Feature | Size | FE | BE | DevOps |
|---|:--:|:--:|:--:|:--:|
| Wire `LoginScreen` to `LoginModel` | 1 | 2 | 1 | 1 |

`src/pages/login.tsx` hardcodes a local `users` array with three fake accounts.
`utils/model/LoginModels.ts` defines the real `Login` / `LoginModel` types and is
imported by nobody. The screen should read from the model.

| Feature | Size | FE | BE | DevOps |
|---|:--:|:--:|:--:|:--:|
| Registration flow | 2 | 2 | 1 | 1 |

Phase 1 spec, LoginScreen item 7: a registration button where a member picks a
username, password and user type (`ADMIN` / `MEMBER` / `GUEST`). Needs duplicate-
username handling and some password rules.

| Feature | Size | FE | BE | DevOps |
|---|:--:|:--:|:--:|:--:|
| Session state and route guards | 2 | 3 | 1 | 1 |

Right now `/members` is reachable by typing the URL — login is decoration. Needs
a logged-in user held in context, a redirect for unauthenticated visitors, and a
log-out control in the navbar. `src/components/navbar.tsx` currently has a single
hardcoded Login link and nothing else.

| Feature | Size | FE | BE | DevOps |
|---|:--:|:--:|:--:|:--:|
| Permissions by user type | 2 | 3 | 2 | 1 |

Delete, move and role-edit should be HR/admin only; a `MEMBER` sees read-only;
a `GUEST` sees less again. Blocked on session state above.

| Feature | Size | FE | BE | DevOps |
|---|:--:|:--:|:--:|:--:|
| Google authentication — **research only** | 1 | 2 | 2 | 2 |

Phase 1 spec, LoginScreen item 8. Deliverable is a written recommendation, not
code: which library, what it costs us, whether it works with a `@umd.edu` domain
restriction, and what it implies for Phase 2.

### Model and data quality

| Feature | Size | FE | BE | DevOps |
|---|:--:|:--:|:--:|:--:|
| Proficiency refactor by department | 3 | 3 | 3 | 1 |

From the W33 notes and still open. `Proficiency` today only models development
skills. Split it:

- `DevelopmentProficiency` — frontEnd, backEnd, design, versionControl, devOps
- `FinanceProficiency` — accounting, fundamentalAnalysis, technicalAnalysis
- `HRProficiency` — spreadsheet, communication, confidence
- `ProductProficiency` — coldCalling, frontEnd, backEnd, design
- `EventsProficiency` — eventPlanning

Rendering rule: a member with roles in two departments shows only the proficiency
relevant to the department whose row is being rendered. Also: proficiency should
be **required**, defaulting to all `X`. Touches every member in `data.ts`, so it
needs a migration script rather than hand-editing 167KB of seed data.

| Feature | Size | FE | BE | DevOps |
|---|:--:|:--:|:--:|:--:|
| Replace `SupervisorRef` with id-based references | 2 | 2 | 3 | 1 |

`types.ts` has a standing TODO about this. `SupervisorRef` is a denormalised
`[name, email]` copy, so renaming a member silently breaks every position
pointing at them. W38.4.3 patches the delete path; this is the actual fix.

| Feature | Size | FE | BE | DevOps |
|---|:--:|:--:|:--:|:--:|
| Make `desiredRoles` required | 1 | 2 | 1 | 1 |

W33 note: HR has this for every member, so it should not be optional. Needs a
data pass over `data.ts`.

| Feature | Size | FE | BE | DevOps |
|---|:--:|:--:|:--:|:--:|
| Clean up duplicated union members | 1 | 1 | 1 | 1 |

`types.ts` has `"Events"` listed twice in `DepartmentNames` and
`"Graphic Design"` twice in `TeamNames`. Harmless today, confusing forever. Also
worth auditing the unions against the real Crew Formations sheet while in there.

| Feature | Size | FE | BE | DevOps |
|---|:--:|:--:|:--:|:--:|
| Delete `utils/model/membersMockData.ts` | 1 | 1 | 1 | 1 |

It exports `membersData: Member[]`, typed against a `Member` type that no longer
exists in `types.ts`. It is dead code that fails type-checking on its own terms
and is superseded by `data.ts`. Confirm nothing imports it, then remove it.

| Feature | Size | FE | BE | DevOps |
|---|:--:|:--:|:--:|:--:|
| Reconcile `CCC_members_schema.json` with the model | 1 | 1 | 2 | 1 |

The JSON schema at the repo root describes a flat member with `manager`,
`direct_reports` and a `team` enum of `COMMITTEES / DEVELOPMENT / BOTH`. None of
that matches `types.ts`. Either update it or delete it — a schema nobody
validates against is worse than none.

### Rendering and UI

| Feature | Size | FE | BE | DevOps |
|---|:--:|:--:|:--:|:--:|
| Render the boards | 2 | 3 | 1 | 1 |

`Organization` has `boards: Board[]` with flat (Advisory, Minor) and operations
(Executive) variants. Nothing renders them. The Crew Formations sheet puts the
Executive Board at the top.

| Feature | Size | FE | BE | DevOps |
|---|:--:|:--:|:--:|:--:|
| Add member / add role UI | 2 | 3 | 2 | 1 |

`operations.ts` exports `addMember` and `addRole` with no way to call them from
the app. Needs a form, an exhaustive role dropdown driven by the `Role` union,
and validation.

| Feature | Size | FE | BE | DevOps |
|---|:--:|:--:|:--:|:--:|
| Search, filter and sort members | 2 | 3 | 1 | 1 |

By name, role, team, availability status, proficiency. The HR Committee's most
common question is "who is free and knows React" and today that is answered by
scrolling.

| Feature | Size | FE | BE | DevOps |
|---|:--:|:--:|:--:|:--:|
| Circular-relationship report | 1 | 2 | 2 | 1 |

`getCycles` (Tarjan's SCC) is implemented and tested by nobody and surfaced
nowhere. A small admin page listing members in a reporting cycle would make it
useful and would catch data-entry mistakes.

| Feature | Size | FE | BE | DevOps |
|---|:--:|:--:|:--:|:--:|
| Match the Crew Formations visual layout | 2 | 3 | 1 | 1 |

The business spec says the product "should have the same design and layout as our
current Crew Formations spreadsheet". Current styling is placeholder — yellow
sectors, red departments, purple team headers. Needs a real pass against the
sheet, including the colour key.

| Feature | Size | FE | BE | DevOps |
|---|:--:|:--:|:--:|:--:|
| Keyboard-accessible member moves | 2 | 3 | 1 | 1 |

W38.3 uses native HTML5 drag and drop, which is mouse-only. A "Move to team…"
menu item reaching the same `moveMemberToTeam` function would make the feature
usable without a mouse.

| Feature | Size | FE | BE | DevOps |
|---|:--:|:--:|:--:|:--:|
| Undo for destructive actions | 2 | 3 | 2 | 1 |

Moves and deletes are irreversible. Worth doing before this tool holds real data.

| Feature | Size | FE | BE | DevOps |
|---|:--:|:--:|:--:|:--:|
| Responsive / narrow-viewport layout | 2 | 3 | 1 | 1 |

The spreadsheet is a wide nested flex layout with no horizontal scroll handling
and no small-screen story.

---

## Phase 2 — Backend

| Feature | Size | FE | BE | DevOps |
|---|:--:|:--:|:--:|:--:|
| Move model ownership to the server | 3 | 2 | 3 | 2 |

Today `src/pages/members.tsx` and `server/index.ts` both import `data.ts`
directly. The frontend must stop importing the model and talk over HTTP instead.

| Feature | Size | FE | BE | DevOps |
|---|:--:|:--:|:--:|:--:|
| Complete the REST surface | 3 | 1 | 3 | 1 |

`server/index.ts` is a stub with real bugs to fix on the way: the `add-role` and
`delete` routes are typed `Request<{ email: string }>` but registered at
`/members/:id`, so `req.params.email` is always `undefined` and both routes are
dead. Error branches call `res.status(400)` without `.send()` or `.json()`,
leaving the request hanging until it times out. Needs those params fixed, a `PUT`
for member edits, proper status codes, and JSON error bodies.

| Feature | Size | FE | BE | DevOps |
|---|:--:|:--:|:--:|:--:|
| API client layer on the frontend | 2 | 3 | 2 | 1 |

One module wrapping `fetch`, with loading and error states, so components never
call `fetch` directly.

| Feature | Size | FE | BE | DevOps |
|---|:--:|:--:|:--:|:--:|
| CORS and dev proxy | 1 | 1 | 2 | 2 |

Vite on one port, Express on 3000. Configure it once properly rather than each
developer working around it.

| Feature | Size | FE | BE | DevOps |
|---|:--:|:--:|:--:|:--:|
| Server-side validation | 2 | 1 | 3 | 1 |

The `POST /members` route pushes `req.body` into the array unvalidated. Anything
at all can become a member.

| Feature | Size | FE | BE | DevOps |
|---|:--:|:--:|:--:|:--:|
| Real authentication (sessions or JWT) | 3 | 2 | 3 | 2 |

Depends on the Google auth research above.

---

## Phase 3 — Database

| Feature | Size | FE | BE | DevOps |
|---|:--:|:--:|:--:|:--:|
| Choose and provision a cloud database | 1 | 1 | 2 | 3 |
| Schema design from the TypeScript model | 2 | 1 | 3 | 2 |
| Seed script converting `data.ts` | 1 | 1 | 2 | 2 |
| Repository layer replacing in-memory arrays | 3 | 1 | 3 | 2 |
| Migrations | 2 | 1 | 2 | 3 |

The flat-array-with-position-history shape maps to relational tables reasonably
cleanly — members, positions, teams — but `positionHistory` as an append-only log
is a design decision worth writing down before anyone writes DDL.

---

## Phase 4 — Deployment

| Feature | Size | FE | BE | DevOps |
|---|:--:|:--:|:--:|:--:|
| Finish the Dockerfile | 1 | 1 | 2 | 3 |
| CI: build + typecheck + lint on every PR | 1 | 1 | 1 | 3 |
| Review the `deploy.yml` in `Claude outputs/` | 1 | 1 | 1 | 3 |
| Environment configuration | 1 | 1 | 2 | 3 |
| Pick a host and deploy | 2 | 1 | 2 | 4 |

There is a `Dockerfile` and a `.dockerignore` in the repo, an unreviewed
`deploy.yml` sitting in the `Claude outputs` folder, and a `deploy` script in
`package.json` pointing at `gh-pages` — which will not work once there is a
backend. Worth reconciling before Phase 4 starts properly.

---

## Cross-cutting / engineering practice

| Feature | Size | FE | BE | DevOps |
|---|:--:|:--:|:--:|:--:|
| Set up a test runner | 2 | 2 | 2 | 2 |

**This is the highest-leverage item in this file.** `package.json` has no `test`
script. Model code — `getCycles`, `moveMemberToTeam`, `buildOrganization`,
`removeMemberDeep` — is pure and trivially testable, and every spec this week
says "verify by hand with a `console.log`" because we have nothing better.
Vitest plus the existing Vite config is close to zero configuration.

| Feature | Size | FE | BE | DevOps |
|---|:--:|:--:|:--:|:--:|
| Fix the lint setup | 1 | 2 | 1 | 2 |

`package.json` has `"lint": "eslint ."` but no ESLint config and no ESLint
dependency. The script cannot run.

| Feature | Size | FE | BE | DevOps |
|---|:--:|:--:|:--:|:--:|
| Commit the build output out of the repo | 1 | 1 | 1 | 2 |

`dist/` and `.vite/` are in the working tree. Check `.gitignore`.

| Feature | Size | FE | BE | DevOps |
|---|:--:|:--:|:--:|:--:|
| Onboarding README | 1 | 2 | 2 | 2 |

The current `README.md` is the React boilerplate's. New members need the
architecture (MVC, the phase plan), how to run it, and where the model lives.

---

## Product features from the business spec, not yet started

| Feature | Phase | Size | FE | BE | DevOps |
|---|:--:|:--:|:--:|:--:|:--:|
| Weekly emails to INACTIVE members | 2+ | 3 | 2 | 3 | 3 |

"INACTIVE members are sent weekly emails asking them to either go to the BREAK
team or leave the organization." Needs a backend, a scheduler and an email
provider — cannot be done in Phase 1.

| Feature | Phase | Size | FE | BE | DevOps |
|---|:--:|:--:|:--:|:--:|:--:|
| Link application forms to the Formations document | 2+ | 4 | 2 | 4 | 3 |

The headline goal in the business summary: a member fills out a Google Form and
the HR Committee spends a week processing it by hand. Automating the
Form → member-record path is the thing that actually saves the committee time.
Needs Google Forms/Sheets API access and a backend.

| Feature | Phase | Size | FE | BE | DevOps |
|---|:--:|:--:|:--:|:--:|:--:|
| Member movement audit log | 2+ | 2 | 2 | 3 | 1 |

Who moved whom, when, and why. `positionHistory` records the *what* but not the
*who did it*.
