import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { cn } from "@src/utils";
import { UserAuthContext } from "@src/hooks/UserAuthContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn, faSignOut } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  const { currentUser, logout } = useContext(UserAuthContext);
  const navigate = useNavigate();

  const btnClassName = cn(
    "-my-1 px-2 py-1 flex items-center gap-2 rounded-md",
    "transition-colors hover:bg-slate-800",
  );

  const LoginButton = (
    <button className={btnClassName} onClick={() => navigate("/login")}>
      <FontAwesomeIcon className="size-4" icon={faSignIn} />
      Login
    </button>
  );

  const UserBadge = (
    <div className="flex gap-4">
      <div
        className="flex max-xs:flex-col items-center
          gap-2 [&_span]:flex [&_span]:items-center"
      >
        <span
          // TODO W45.6
          // Instead of `bg-slate-800`, change the badge color to match roles
          className={cn(
            "-my-1 px-3 py-1",
            "bg-slate-800 rounded-full text-sm text-center",
          )}
        >
          {currentUser?.usertype}MEMBER
        </span>
        <span className="text-ellipsis">{currentUser?.username}asdfasdf</span>
      </div>

      <div className="my-auto">
        <button
          className={btnClassName}
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          <FontAwesomeIcon className="size-4" icon={faSignOut} />
          <span className="max-xs:hidden ">Log out</span>
        </button>
      </div>
    </div>
  );

  return (
    <nav className="px-4 xs:px-6 py-3 xs:py-4 bg-slate-900 text-white max-sm:text-sm">
      <div className="flex gap-4 md:gap-8 items-center">
        <Link className="text-xl font-bold" to={currentUser ? "/members" : "/"}>
          CCC
        </Link>

        {true && (
          <div className="flex gap-2">
            <Link className={btnClassName} to="/members">
              Members
            </Link>
          </div>
        )}

        <div className="grow-1 *:justify-self-end">
          {currentUser ? UserBadge : UserBadge}
        </div>
      </div>
    </nav>
  );
}
