import express, { Router, type Request, type Response } from "express";
import dotenv from "dotenv";

dotenv.config();
const router: Router = express.Router();

import { Resend } from "resend";
import EmailAuth from "../EmailAuth.tsx";
import type { EmailCode } from "@utils/model/LoginModels.ts";
const PASSCODE_2FA_LENGTH = 6;
const PASSCODE_VALID_DURATION = 300000; // 5 minutes in milliseconds

const activeEmailCodes: EmailCode[] = [];
const resend = new Resend(process.env.RESEND_API_KEY);

router.get(
  "/:email/:code",
  (req: Request<{ email: string; code: string }>, res: Response) => {
    const { email, code } = req.params;
    // activeEmailCodes.findIndex()
    console.log(email, code);
  },
);


// Creates new email verification
router.post(
  "/:email/send-code",
  (req: Request<{ email: string }>, res: Response) => {
    const email = req.params.email;

    // Generates cryptographically secure number
    const codeBuf = new Uint32Array(1);
    crypto.getRandomValues(codeBuf);
    const code = codeBuf[0].toString();

    const emailCode = code
      .substring(code.length - PASSCODE_2FA_LENGTH)
      .padStart(PASSCODE_2FA_LENGTH);

    activeEmailCodes.push({
      email,
      timestamp: new Date(),
      code: emailCode,
    });

    resend.emails.send({
      from: "no-reply@campuscoderscrew.com",
      to: email,
      subject: "Email Verification Code",
      react: EmailAuth({ code: emailCode }),
    });
  },
);

export default router;
