import React from 'react'; // REQUIRED for JSX
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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Sidebar state

  const handleSidebarToggle = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  // After successful login, the app receives an access token from Google
  const handleLogin = (userData) => {
    console.log("User logged in:", userData);
    setUser(userData); // Save user data
  };

  const handleLogout = () => {
    setUser(null); // Clear user data
  };

  const logoutBtnStyle = {
    position: 'fixed',
    top: 20,
    right: 30,
    zIndex: 200,
    background: '#fff',
    color: '#222',
    border: '1px solid #7fa6b6',
    borderRadius: '6px',
    padding: '8px 16px',
    fontFamily: 'Architects Daughter, cursive',
    fontSize: '1.1em',
    cursor: 'pointer',
    fontWeight: 600
  };

  const userNameStyle = {
    position: "fixed",
    top: 20,
    right: 150,
    zIndex: 200,
    fontFamily: "Architects Daughter, cursive",
    fontSize: "1.1em",
    color: "#222",
    fontWeight: 600,
  };

  // var accessToken = gapi.auth.getToken().access_token;
  //  Define the components displayed on every page 
  return (

    <div className="App">
      <Sidebar onSidebarToggle={handleSidebarToggle} />
      <div>
        {user ? (
          <>
            <Logout onLogout={handleLogout} buttonStyle={logoutBtnStyle} />

          </>
        ) : (
          <Login onLogin={handleLogin} buttonStyle={logoutBtnStyle} />
        )}

      </div>
      {user && (
        <div style={userNameStyle}>
          Hello {user.name}
        </div>
      )}
      <div className="Container">
        <Routes>
          <Route path="/" element={<Home user={user} onLogin={handleLogin} onLogout={handleLogout} />} />
          <Route path="/Login" element={<Login onLogin={handleLogin} />} />
          <Route path="/Logout" element={<Logout onLogout={handleLogout} />} />
          <Route path="/Log" element={<Log />} />
          <Route path="/Calendar" element={<Calendar user={user} accessToken={user?.accessToken} isSidebarCollapsed={isSidebarCollapsed} />} />
          <Route path="/Weather" element={<Weather />} />
          <Route path="/Statistics" element={<Statistics />} />
          <Route path="/SearchForPlants" element={<SearchForPlants />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
