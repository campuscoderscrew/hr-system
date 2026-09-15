import express, { type Express, type Request, type Response } from "express";
import session from "express-session";
import { members } from "../utils/model/data";
import { addRole, moveMember, removeMember } from "../utils/model/operations";
import { verifyCredentials, requireAuth } from "../utils/auth";

const app: Express = express();
const PORT = 3000;
``
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

// POST add a new member (Protected)
app.post("/members", requireAuth, (req: Request, res: Response) => {
  const member = req.body;
  members.push(member);
  res.status(201).json(member);
});

// PUT move member to a new role (archives current role to history) (Protected)
app.put(
  "/members/:email/move",
  requireAuth,
  (req: Request<{ email: string }>, res: Response) => {
    const email = req.params.email;
    const { role, supervisor } = req.body;

    const updatedMember = moveMember(members, email, role, supervisor);
    if (updatedMember) {
      res.status(200).json(updatedMember);
    } else {
      res.status(400);
    }
  },
);

// PUT add a role to a member without removing existing role (Protected)
app.put(
  "/members/:id/add-role",
  requireAuth,
  (req: Request<{ email: string }>, res: Response) => {
    const email = req.params.email;
    const { role, supervisor } = req.body;

    const updatedMember = addRole(members, email, role, supervisor);
    if (updatedMember) {
      res.status(200).json(updatedMember);
    } else {
      res.status(400);
    }
  },
);

// DELETE a member (Protected)
app.delete(
  "/members/:id",
  requireAuth,
  (req: Request<{ email: string }>, res: Response) => {
    const email = req.params.email;
    const removedMember = removeMember(members, email);

    if (removedMember) {
      res
        .status(200)
        .json({ message: `member ${email} successfully deleted` });
    } else {
      res.status(400);
    }
  },
);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

export default app;
