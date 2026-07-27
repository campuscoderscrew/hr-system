import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

// import Crew from './src/pages/Crew';

import About from './pages/about.js';
import LoginScreen from './pages/login.js';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<About />} />
      <Route path="about" element={<About />} />
      <Route path="login" element={<LoginScreen />} />
    </Routes>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);