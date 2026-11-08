import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { UserAuthContext } from "@src/hooks/UserAuthContext";

export default function NavBar() {
  const { loginStatus, setLoginStatus } = useContext(UserAuthContext);
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-900 text-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold">CCC</div>

        <div className="flex space-x-6">
          {loginStatus ? (
            <button
              onClick={() => {
                setLoginStatus(undefined);
                navigate("login");
              }}
            >
              Log out
            </button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
