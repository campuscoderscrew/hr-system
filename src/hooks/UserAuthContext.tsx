import type { Login } from "@utils/model/LoginModels";
import { createContext, useContext, useState } from "react";
import type { Dispatch, ReactElement, SetStateAction } from "react";

const UserAuthContext = createContext<{
  loginStatus: Login | undefined;
  setLoginStatus: Dispatch<SetStateAction<Login | undefined>>;
}>({
  loginStatus: undefined,
  setLoginStatus: () => {},
});

const UserAuthProvider = ({ children }: { children: ReactElement }) => {
  const [loginStatus, setLoginStatus] = useState<Login>();

  return (
    <UserAuthContext.Provider value={{ loginStatus, setLoginStatus }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export { UserAuthContext, UserAuthProvider };
