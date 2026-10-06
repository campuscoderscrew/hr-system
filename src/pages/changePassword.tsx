import { useEffect, useRef, useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { debounce } from "lodash";

import NavBar from "@src/components/navbar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { cn } from "@src/utils";
import CodeInput from "@src/components/CodeInput";

type UserAuth = {
  username: string;
  email: string;
};

const emails = [{ email: "admin@gmail.com", username: "admin" }];

const users = [
  { username: "admin", password: "password123", userType: "ADMIN" },
  { username: "user1", password: "secret", userType: "MEMBER" },
  { username: "6", password: "7", userType: "ADMIN" },
];

export default function ChangePasswordScreen() {
  const [formProgress, setFormProgress] = useState(0); // Page of the form
  const [userAuthForm, setUserAuthForm] = useState<UserAuth | undefined>(); // User credentials

  // 2FA password sent to user's email when resetting password
  const PASSCODE_2FA_LENGTH = 6;
  const [passcode2Fa, setPasscode2Fa] = useState("");

  /**
   * Checks if the code matches with the email; blocks for 3 seconds to prevent spamming
   * @param email The email to check with the server
   * @param code The code sent to the email for verification
   */
  const debounceCheckCode = useRef(
    debounce(async (email, passcode) => {
      const response = await fetch(
        `http://localhost:3000/email-auth/check-code`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, code: passcode }),
        },
      );
      if (!response.ok) return;
      const isCodeCorrect = (await response.json()).isCodeCorrect;
      if (isCodeCorrect) moveToFormPage(3)
    }, 3000),
  ).current;
  useEffect(() => {
    return () => {
      debounceCheckCode.cancel();
    };
  }, [debounceCheckCode]);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  /**
   * Moves to a form page and clears any errors
   * @param i The index of the form page
   */
  const moveToFormPage = (i: number) => {
    setFormProgress(i);
    setError("");
  };

  // Page 1 navigation
  const handleSendCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.currentTarget));

    const emailRecord = emails.find(
      ({ username, email }) =>
        username === formData.username && email === formData.email,
    );
    if (emailRecord === undefined) {
      setError("Username or email is not correct.");
      return;
    }
    setUserAuthForm({
      username: String(formData.username),
      email: String(formData.email),
    });

    // Asks for a verification code
    const response = await fetch(
      `http://localhost:3000/email-auth/send-code/${formData.email}`,
      {
        method: "POST",
      },
    );
    if (!response.ok) return;

    // Does not verify if the email is associated with an username for security
    moveToFormPage(1);
  };

  // Page 2 navigation
  const handlePasscode2FaChange = async (passcode: string) => {
    setPasscode2Fa(passcode);

    if (passcode.length !== PASSCODE_2FA_LENGTH) return;

    // Checks verification code
    debounceCheckCode(userAuthForm?.email, passcode); // Pings server every 3 seconds to prevent spamming
  };

  // Classnames
  const formClassName = cn(
    "flex flex-col gap-6 transition-[height] duration-300",
    // Direct `div` children
    "[&>div]:flex [&>div]:flex-col [&>div]:gap-2",
    // All `label` descendents
    "[&_label]:text-slate-700 [&_label]:text-sm [&_label]:font-medium [&_label]:text-left ",
    // All `input` descendents
    "[&_input]:w-full [&_input]:px-4 [&_input]:py-3",
  );

  const submitButtonClassName = cn(
    "px-4 py-3 w-full rounded-2xl bg-slate-900",
    "text-sm font-semibold text-white",
    "transition-colors duration-300 hover:bg-slate-700",
  );

  // Subcomponents
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
            "bg-white rounded-3xl shadow-xl text-center ",
          )}
        >
          {formProgress === 0 && (
            <>
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold text-slate-900">
                  Forgot Password?
                </h1>
                <p className="text-sm text-slate-500 text-balanced">
                  No worries. Enter your email address and username, and we'll
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

                {error && (
                  <div
                    className={cn(
                      "px-4 py-3 bg-red-50 rounded-2xl border border-red-200",
                      "text-sm text-red-700",
                    )}
                  >
                    {error}
                  </div>
                )}

                <button className={submitButtonClassName} type="submit">
                  Send Code
                </button>
              </form>

              <BackToLoginButton />
            </>
          )}

          {formProgress === 1 && (
            <>
              <div className="space-y-2">
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

              <p className="text-sm text-slate-500">
                Didn't receive code? Check your spam mail or{" "}
                <a
                  className="!text-ocean-light underline decoration-ocean-light cursor-pointer"
                  onClick={() => moveToFormPage(0)}
                >
                  try another email address
                </a>
                .
              </p>
            </>
          )}

          {formProgress === 2 && (
            <>
              <div className="space-y-2">
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

          {formProgress === 3 && (
            <>
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold text-slate-900">
                  Success!
                </h1>
                <p className="text-sm text-slate-500 text-balanced">
                  Your verification code was correct.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
