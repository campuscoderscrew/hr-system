import type { CurrentUser } from "@utils/model/LoginModels";
import { Navigate } from "react-router-dom";

type Props = {
  user: CurrentUser | null;
  children: React.ReactNode;
};

const RequireLogin = ({ user, children }: Props) => {
  if (!user) return <Navigate to="/" replace />;
  

  return children;
};

export default RequireLogin;