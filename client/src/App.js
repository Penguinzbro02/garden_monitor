import React from 'react'; // ✅ REQUIRED for JSX
import { useEffect, useState } from 'react';
import './App.css';
import { Sidebar } from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Logout from "./components/pages/Logout";
import Log from './components/pages/Log';
import Calendar from './components/pages/Calendar';
import Weather from './components/pages/Weather';
import Statistics from './components/pages/Statistics';
import SearchForPlants from './components/pages/SearchForPlants';

function App() {

  const [user, setUser] = useState(null); // Global user state

  const handleLogin = (userData) => {
    setUser(userData); // Save user data
  };

  const handleLogout = () => {
    setUser(null); // Clear user data
  };

  // var accessToken = gapi.auth.getToken().access_token;

  return (
    <div className="App">
      <Sidebar />
      <div className="Container">
        <Routes>
          <Route path="/" element={<Home user={user} onLogin={handleLogin} onLogout={handleLogout} />} />
          <Route path="/Login" element={<Login onLogin={handleLogin} />} />
          <Route path="/Logout" element={<Logout onLogout={handleLogout} />} />
          <Route path="/Log" element={<Log />} />
          <Route path="/Calendar" element={<Calendar />} />
          <Route path="/Weather" element={<Weather />} />
          <Route path="/Statistics" element={<Statistics />} />
          <Route path="/SearchForPlants" element={<SearchForPlants />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
