import express, { type Express, type Request, type Response } from "express";
import { members } from "./model/data";
import { addRole, moveMember, removeMember } from "./model/operations";

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
  "/members/:discord/move",
  (req: Request<{ discord: string }>, res: Response) => {
    const discord = req.params.discord;
    const { role, supervisor } = req.body;

    const updatedMember = moveMember(members, discord, role, supervisor);
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
  (req: Request<{ discord: string }>, res: Response) => {
    const discord = req.params.discord;
    const { role, supervisor } = req.body;

    const updatedMember = addRole(members, discord, role, supervisor);
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
  (req: Request<{ discord: string }>, res: Response) => {
    const discord = req.params.discord;
    const removedMember = removeMember(members, discord);

    if (removedMember) {
      res
        .status(200)
        .json({ message: `member ${discord} successfully deleted` });
    } else {
      res.status(400);
    }
  },
);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

export default app;
