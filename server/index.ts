import express, {
  type Express,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import session from "express-session";
import { members } from "../utils/model/data";
import {
  addRole,
  moveMember,
  moveMemberToTeam,
  removeMemberDeep,
  updateMember,
  type MemberEdits,
} from "../utils/model/operations";
import { currentPositions, type Membership } from "../utils/model/types";
import { verifyCredentials, requireAuth } from "../utils/auth";

const app: Express = express();
const PORT = 3000;

app.use(express.json());

// Initialize express-session middleware
app.use(
  session({
    secret: "my-super-secret-key", // Temporarily hard-coded
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS
  })
);

/**
 * Helpers
 *
 * Every error response is `{ error: string }`, matching `requireAuth`.
 * Express 5 leaves `req.body` undefined when a request has no body, so routes
 * read `req.body ?? {}` rather than destructuring it directly.
 */

// The member owning `email`, matched against any of their emails
function findMember(email: string): Membership | undefined {
  return members.find((member) => member.emails.includes(email));
}

// The first of `emails` already used by a member other than `except`, if any
function takenEmail(emails: string[], except?: Membership): string | undefined {
  return emails.find((email) =>
    members.some((member) => member !== except && member.emails.includes(email)),
  );
}

// Fields PUT /members/:email may change; see `updateMember` in operations.ts
const EDITABLE_FIELDS = ["name", "emails", "discord", "github", "desiredRoles"];

// A presence check only: it does not confirm a string is a valid `Role`, which
// is left to the server-side validation TODO
const isNonEmptyString = (value: unknown): boolean =>
  typeof value === "string" && value.trim() !== "";

/**
 * Checks a member-edit body holds only editable fields of the right shape.
 * Full request validation is its own TODO; this guards only what `updateMember` relies on.
 * @returns An error message for the client, or `null` if the body is usable
 */
function memberEditError(body: unknown): string | null {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return "Request body must be a JSON object.";
  }

  const fields = Object.keys(body);
  if (fields.length === 0) return "Request body has no fields to update.";

  const uneditable = fields.filter((field) => !EDITABLE_FIELDS.includes(field));
  if (uneditable.length > 0) {
    return (
      `Cannot edit ${uneditable.join(", ")}. Editable fields are ${EDITABLE_FIELDS.join(", ")}; ` +
      "positions change through /move, /move-team and /add-role."
    );
  }

  const { name, emails, discord, github, desiredRoles } = body as Record<string, unknown>;
  if (name !== undefined && !isNonEmptyString(name)) {
    return "name must be a non-empty string.";
  }
  if (
    emails !== undefined &&
    !(Array.isArray(emails) && emails.length > 0 && emails.every(isNonEmptyString))
  ) {
    return "emails must be a non-empty array of strings.";
  }
  if (discord !== undefined && typeof discord !== "string") {
    return "discord must be a string.";
  }
  if (github !== undefined && typeof github !== "string") {
    return "github must be a string.";
  }
  if (
    desiredRoles !== undefined &&
    !(Array.isArray(desiredRoles) && desiredRoles.every((role) => typeof role === "string"))
  ) {
    return "desiredRoles must be an array of strings.";
  }
  return null;
}

/**
 * Routes
 */

// POST login route to authenticate users
app.post("/login", (req: Request, res: Response) => {
  const credentials = req.body;

  if (verifyCredentials(credentials)) {
    // Save user data to the session to keep them logged in
    req.session.user = {
      username: credentials.Username,
      userType: credentials.UserType,
    };
    res.status(200).json({ message: "Login successful!" });
  } else {
    res.status(401).json({ error: "Invalid credentials." });
  }
});

// POST logout route to end the session
app.post("/logout", (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Failed to log out." });
    res.status(200).json({ message: "Successfully logged out." });
  });
});

// GET all members (Public - no authentication required)
app.get("/members", (req: Request, res: Response) => {
  res.json(members);
});

// GET one member by any of their emails (Public - no authentication required)
app.get("/members/:email", (req: Request<{ email: string }>, res: Response) => {
  const email = req.params.email;
  const member = findMember(email);

  if (member) {
    res.status(200).json(member);
  } else {
    res.status(404).json({ error: `No member has the email ${email}.` });
  }
});

// POST add a new member (Protected)
app.post("/members", requireAuth, (req: Request, res: Response) => {
  const member = req.body;

  // Emails are how every other route finds a member, so a new one needs one,
  // and none of them may already belong to someone else
  if (
    !Array.isArray(member?.emails) ||
    member.emails.length === 0 ||
    !member.emails.every(isNonEmptyString)
  ) {
    res.status(400).json({ error: "A new member needs a non-empty emails array of strings." });
    return;
  }
  const taken = takenEmail(member.emails);
  if (taken) {
    res.status(409).json({ error: `${taken} already belongs to another member.` });
    return;
  }

  members.push(member);
  res.status(201).json(member);
});

// PUT edit a member's profile fields (Protected)
app.put(
  "/members/:email",
  requireAuth,
  (req: Request<{ email: string }>, res: Response) => {
    const email = req.params.email;
    const member = findMember(email);
    if (!member) {
      res.status(404).json({ error: `No member has the email ${email}.` });
      return;
    }

    const error = memberEditError(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    const edits: MemberEdits = req.body;
    const taken = edits.emails && takenEmail(edits.emails, member);
    if (taken) {
      res.status(409).json({ error: `${taken} already belongs to another member.` });
      return;
    }

    const result = updateMember(members, email, edits);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: `No member has the email ${email}.` });
    }
  },
);

// PUT move member to a new role (archives current roles to history) (Protected)
app.put(
  "/members/:email/move",
  requireAuth,
  (req: Request<{ email: string }>, res: Response) => {
    const email = req.params.email;
    const { role, supervisor } = req.body ?? {};
    if (!isNonEmptyString(role)) {
      res.status(400).json({ error: "role is required." });
      return;
    }

    const updatedMember = moveMember(members, email, role, supervisor);
    if (updatedMember) {
      res.status(200).json(updatedMember);
    } else {
      res.status(404).json({ error: `No member has the email ${email}.` });
    }
  },
);

// PUT move member to a new role (archives SPECIFIED current role to history) (Protected)
app.put(
  "/members/:email/move-team",
  requireAuth,
  (req: Request<{ email: string }>, res: Response) => {
    const email = req.params.email;
    // `newRole` matches the body the frontend's handleMoveTeamAPI sends
    const { oldRole, newRole, supervisor } = req.body ?? {};
    if (!isNonEmptyString(oldRole) || !isNonEmptyString(newRole)) {
      res.status(400).json({ error: "oldRole and newRole are required." });
      return;
    }

    // moveMemberToTeam returns null both for an unknown member and for a role
    // they do not hold, so check each here to tell the client which it was
    const member = findMember(email);
    if (!member) {
      res.status(404).json({ error: `No member has the email ${email}.` });
      return;
    }
    if (!currentPositions(member).some((position) => position.role === oldRole)) {
      res.status(409).json({ error: `${member.name} does not currently hold the role ${oldRole}.` });
      return;
    }

    const updatedMember = moveMemberToTeam(members, email, oldRole, newRole, supervisor);
    if (updatedMember) {
      res.status(200).json(updatedMember);
    } else {
      res.status(409).json({ error: `${member.name} could not be moved out of ${oldRole}.` });
    }
  },
);

// PUT add a role to a member without removing existing role (Protected)
app.put(
  "/members/:email/add-role",
  requireAuth,
  (req: Request<{ email: string }>, res: Response) => {
    const email = req.params.email;
    const { role, supervisor } = req.body ?? {};
    if (!isNonEmptyString(role)) {
      res.status(400).json({ error: "role is required." });
      return;
    }

    const updatedMember = addRole(members, email, role, supervisor);
    if (updatedMember) {
      res.status(200).json(updatedMember);
    } else {
      res.status(404).json({ error: `No member has the email ${email}.` });
    }
  },
);

// DELETE a member and clear current supervisor references to them (Protected)
app.delete(
  "/members/:email",
  requireAuth,
  (req: Request<{ email: string }>, res: Response) => {
    const email = req.params.email;
    // removeMemberDeep, not removeMember, so no one is left reporting to a deleted member
    const { removed, clearedReferences, affectedMembers } = removeMemberDeep(members, email);

    if (removed) {
      res.status(200).json({
        message: `member ${email} successfully deleted`,
        clearedReferences,
        affectedMembers,
      });
    } else {
      res.status(404).json({ error: `No member has the email ${email}.` });
    }
  },
);

/**
 * Fallbacks, registered after every route so they only see what nothing else handled
 */

// Unknown path or method
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: `No route for ${req.method} ${req.path}.` });
});

// Errors thrown by middleware or routes, e.g. express.json() rejecting a
// malformed body. Express only treats a handler as an error handler when it
// declares all four parameters, so `next` must stay even though it is unused.
app.use(
  (
    err: Error & { status?: number; expose?: boolean; type?: string },
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    if (err.type === "entity.parse.failed") {
      res.status(400).json({ error: "Request body is not valid JSON." });
      return;
    }

    // Only client errors are flagged `expose`; never leak a server error's message
    const status = err.status ?? 500;
    if (status >= 500) console.error(err);
    res.status(status).json({ error: err.expose ? err.message : "Internal server error." });
  },
);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

export default app;
