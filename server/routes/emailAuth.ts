import express, { Router, type Request, type Response } from "express";
import dotenv from "dotenv";

import { members } from "../../utils/model/data.ts";
import {
  addRole,
  moveMember,
  removeMember,
} from "../../utils/model/operations.ts";

dotenv.config();
const router: Router = express.Router();

export default router;
