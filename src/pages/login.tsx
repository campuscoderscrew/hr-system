import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "~/components/navbar";
import { cn } from "~/utils";

const users = [
  { username: "admin", password: "password123", userType: "ADMIN" },
  { username: "user1", password: "secret", userType: "MEMBER" },
  { username: "6", password: "7", userType: "ADMIN" },
];

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePasswordReset = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate("/change-password");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = users.find((item) => item.username === username.trim());
    if (user && user.password === password) {
      setError("");
      navigate("/members");
      return;
    }

    setError("Username or password is incorrect.");
  };

  return (
    <div>
      <NavBar />
      <div
        className={cn(
          "min-h-screen px-4 py-12",
          "flex items-center justify-center",
        )}
      >
        <div
          className={cn(
            "max-w-md w-full p-8",
            "flex flex-col gap-8",
            "bg-white/20 rounded-3xl shadow-xl",
          )}
        >
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-semibold text-slate-900">
              Log in to HR System
            </h1>
            <p className="text-sm text-slate-500 text-pretty">
              Enter your credentials to access the spreadsheet dashboard.
            </p>
          </div>

          <form
            className={cn(
              "flex flex-col gap-6 transition-[height] duration-300",
              // Direct `div` children
              "[&>div]:flex [&>div]:flex-col [&>div]:gap-2",
              // All `label` descendents
              "[&_label]:block [&_label]:text-sm [&_label]:font-medium [&_label]:text-slate-700",
              // All `input` descendents
              "[&_input]:w-full [&_input]:px-4 [&_input]:py-3",
            )}
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="username">Username</label>
              <input
                className="input"
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                className="input"
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
                required
              />

              <button
                className="self-start text-sm text-slate-500"
                value="button"
                onClick={handlePasswordReset}
              >
                Forgot password?
              </button>
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

            <button
              className={cn(
                "px-4 py-3 w-full rounded-2xl bg-slate-900",
                "text-sm font-semibold text-white",
                "transition-colors hover:bg-slate-700",
              )}
              type="submit"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
