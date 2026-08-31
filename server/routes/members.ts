import express, { Router, type Request, type Response } from "express";
import dotenv from "dotenv";

import { members } from "../../utils/model/data";
import {
  addRole,
  moveMember,
  removeMember,
} from "../../utils/model/operations";

dotenv.config();
const router: Router = express.Router();

// GET all members
router.get("/", (req: Request, res: Response) => {
  res.json(members);
});

// POST add a new member
router.post("/", (req: Request, res: Response) => {
  const member = req.body;
  members.push(member);
  res.status(201).json(member);
});

// PUT move member to a new role (archives current role to history)
router.put("/:email/move", (req: Request<{ email: string }>, res: Response) => {
  const email = req.params.email;
  const { role, supervisor } = req.body;

  const updatedMember = moveMember(members, email, role, supervisor);
  if (updatedMember) {
    res.status(200).json(updatedMember);
  } else {
    res.status(400);
  }
});

// PUT add a role to a member without removing existing role
router.put(
  "/:id/add-role",
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
router.delete("/:id", (req: Request<{ email: string }>, res: Response) => {
  const email = req.params.email;
  const removedMember = removeMember(members, email);

  if (removedMember) {
    res.status(200).json({ message: `member ${email} successfully deleted` });
  } else {
    res.status(400);
  }
});

export default router;
