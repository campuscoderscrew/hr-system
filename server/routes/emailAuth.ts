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

router.post("/check-code", (req: Request, res: Response) => {
  const email = req.body.email;
  const code = req.body.code;

  // Checks for non-expired codes
  let matchingCodes: EmailCode[] = [];
  const currentDate = new Date();

  for (let i = 0; i < activeEmailCodes.length; i++) {
    const emailCode = activeEmailCodes[i];
    const timeDiff = currentDate.getTime() - emailCode.timestamp.getTime();

    // Code is expired; remove it
    if (timeDiff > PASSCODE_VALID_DURATION) {
      activeEmailCodes.splice(i, 1);
      i--;
    } else if (emailCode.email === email && emailCode.code === code) {
      matchingCodes = activeEmailCodes.splice(i, 1);
      break;
    }
  }


  res.status(200).json({ isCodeCorrect: matchingCodes.length > 0 });
});

// Creates new email verification
router.post(
  "/send-code/:email",
  (req: Request<{ email: string }>, res: Response) => {
    const email = req.params.email;

    // Generates cryptographically secure number
    const codeBuf = new Uint32Array(1);
    crypto.getRandomValues(codeBuf);
    const code = codeBuf[0].toString();

    const emailCode = code
      .substring(code.length - PASSCODE_2FA_LENGTH)
      .padStart(PASSCODE_2FA_LENGTH);
    console.log(`/send-code ${emailCode}`);

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

    res.status(200).json({ sent: true });
  },
);

export default router;
