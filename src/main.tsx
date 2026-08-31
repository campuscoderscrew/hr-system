import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import './app.css';

// import Crew from './src/pages/Crew';

import Members from './pages/members.js';
import LoginScreen from './pages/login.js';
import ChangePasswordScreen from './pages/changePassword.js';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="members" element={<Members />} />
      <Route path="login" element={<LoginScreen />} />
      <Route path="change-password" element={<ChangePasswordScreen />} />
    </Routes>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);