import express, { type Express, type Request, type Response } from "express";
import { members } from "../utils/model/data";
import { addRole, moveMember, removeMember } from "../utils/model/operations";

const app: Express = express();
const PORT = 3000;

app.use(express.json());

// GET all members
app.get("/members", (req: Request, res: Response) => {
  res.json(members);
});

// POST add a new member
app.post("/members", (req: Request, res: Response) => {
  const member = req.body;
  members.push(member);
  res.status(201).json(member);
});

// PUT move member to a new role (archives current role to history)
app.put(
  "/members/:email/move",
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

// PUT add a role to a member without removing existing role
app.put(
  "/members/:id/add-role",
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

// DELETE a member
app.delete(
  "/members/:id",
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
