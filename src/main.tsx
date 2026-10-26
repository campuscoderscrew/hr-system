import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import "./app.css";

// import Crew from './src/pages/Crew';

import Members from "./pages/members.js";
import LoginScreen from "./pages/login.js";
import ChangePasswordScreen from "./pages/changePassword.js";
import EmailAuth from "../server/EmailAuth.js";
import { UserAuthContext, UserAuthProvider } from "./hooks/UserAuthContext.js";

export default function App() {
  const { loginStatus, setLoginStatus } = useContext(UserAuthContext);

  return (
    <UserAuthProvider>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route
          path="/members"
          element={
            loginStatus !== undefined ? <Members /> : <Navigate to={"/login"} />
          }
        />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/change-password" element={<ChangePasswordScreen />} />
        <Route path="/email-test" element={<EmailAuth code={"123123"} />} />
      </Routes>
    </UserAuthProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
