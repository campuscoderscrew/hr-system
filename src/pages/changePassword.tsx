import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";

import NavBar from "~/components/navbar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { cn } from "~/utils";
import CodeInput from "~/components/CodeInput";

const emails = [{ email: "admin@gmail.com", username: "admin" }];

const users = [
  { username: "admin", password: "password123", userType: "ADMIN" },
  { username: "user1", password: "secret", userType: "MEMBER" },
  { username: "6", password: "7", userType: "ADMIN" },
];

export default function ChangePasswordScreen() {
  const [formProgress, setFormProgress] = useState(0);

  // 2FA password sent to user's email when resetting password
  const PASSCODE_2FA_LENGTH = 6;
  const [passcode2Fa, setPasscode2Fa] = useState("");
  const handlePasscode2FaChange = (passcode: string) => {
    setPasscode2Fa(passcode);
    if (passcode.length === PASSCODE_2FA_LENGTH) {
      setTimeout(() => setFormProgress(2), 1000);
    }
  };

  const navigate = useNavigate();
  const handleSendCode = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.currentTarget));

    // const emailRecord = emails.find(({ email }) => email === formData.email);
    // if (emailRecord === undefined) return;

    console.log(formData);
    // Does not verify if the email is associated with an username for security
    setFormProgress(1);
  };

  const formClassName = cn(
    "flex flex-col gap-6 transition-[height] duration-300",
    // Direct `div` children
    "[&>div]:flex [&>div]:flex-col [&>div]:gap-2",
    // All `label` descendents
    "[&_label]:block [&_label]:text-sm [&_label]:font-medium [&_label]:text-slate-700",
    // All `input` descendents
    "[&_input]:w-full [&_input]:px-4 [&_input]:py-3",
  );

  const submitButtonClassName = cn(
    "px-4 py-3 w-full rounded-2xl bg-slate-900",
    "text-sm font-semibold text-white",
    "transition-colors duration-300 hover:bg-slate-700",
  );

  const BackToLoginButton = () => (
    <button
      className={cn(
        "self-center flex items-center gap-2 text-sm text-slate-500 ",
        "transition-colors hover:text-slate-700",
      )}
      onClick={() => navigate("/login")}
    >
      <FontAwesomeIcon className="size-3" icon={faArrowLeft} />
      Back to login
    </button>
  );

  return (
    <div>
      <NavBar />
      <div className="min-h-screen px-4 py-12 grid place-items-center">
        <div
          className={cn(
            "max-w-md w-full p-8",
            "flex flex-col gap-8",
            "bg-white rounded-3xl shadow-xl",
          )}
        >
          {formProgress === 0 && (
            <>
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-semibold text-slate-900">
                  Forgot Password?
                </h1>
                <p className="text-sm text-slate-500 text-balanced">
                  No worries. Enter your email address and username and we'll
                  email you a code to reset your password.
                </p>
              </div>

              <form className={formClassName} onSubmit={handleSendCode}>
                <div>
                  <label htmlFor="username-input">Username</label>
                  <input
                    className="input"
                    id="username-input"
                    name="username"
                    type="text"
                    placeholder="Enter username"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email-input">Email</label>
                  <input
                    className="input"
                    id="email-input"
                    name="email"
                    type="text"
                    placeholder="Enter email"
                    required
                  />
                </div>

                <button className={submitButtonClassName} type="submit">
                  Send Code
                </button>
              </form>

              <BackToLoginButton />
            </>
          )}

          {formProgress === 1 && (
            <>
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-semibold text-slate-900">
                  Check your Email
                </h1>
                <p className="text-sm text-slate-500 text-balanced">
                  We have sent a passcode to your email for resetting your
                  password.
                </p>
              </div>

              <CodeInput
                numDigits={PASSCODE_2FA_LENGTH}
                setPasscode={handlePasscode2FaChange}
              />

              <button className={submitButtonClassName} type="submit">
                Verify Code
              </button>

              <p className="text-sm text-slate-500">
                Didn't receive code? Check your spam mail or{" "}
                <a
                  className="!text-ocean-light underline decoration-ocean-light cursor-pointer"
                  onClick={() => setFormProgress(0)}
                >
                  try another email address
                </a>
                .{passcode2Fa}
              </p>
            </>
          )}

          {formProgress === 2 && (
            <>
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-semibold text-slate-900">
                  Create new password
                </h1>
                <p className="text-sm text-slate-500 text-balanced">
                  Your new password must be different from your old one.
                </p>
              </div>

              <form
                className={formClassName}
                onSubmit={(event) => {
                  event.preventDefault();
                }}
              >
                <div>
                  <label htmlFor="new-password-input">New Password</label>
                  <input
                    className="input"
                    id="new-password-input"
                    name="newPassword"
                    type="password"
                    placeholder="Enter new password"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="confirm-password-input">
                    Confirm Password
                  </label>
                  <input
                    className="input"
                    id="confirm-password-input"
                    name="confirmPassword"
                    type="password"
                    placeholder="Re-enter new password"
                    required
                  />
                </div>

                <button className={submitButtonClassName} type="submit">
                  Reset Password
                </button>
              </form>

              <BackToLoginButton />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
