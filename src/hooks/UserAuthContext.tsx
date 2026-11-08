import { createContext, useContext, useState } from "react";
import type { Dispatch, ReactElement, SetStateAction } from "react";

import type { CurrentUser } from "@utils/model/LoginModels";

const UserAuthContext = createContext<{
  currentUser: CurrentUser | null;
  login: (user: CurrentUser) => void;
  logout: () => void;
}>({
  currentUser: null,
  login: () => {},
  logout: () => {},
});

const UserAuthProvider = ({ children }: { children: ReactElement }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const login = (user: CurrentUser) => {
    if (user === null || currentUser !== null) return;
    
    setCurrentUser(user);
    // For now, refreshing will clear all states instead of saving the login
    // as a session
    // window.sessionStorage.setItem("currentUser", JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <UserAuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export { UserAuthContext, UserAuthProvider };
