import React from 'react'; // ✅ REQUIRED for JSX
import './App.css';
import { Sidebar } from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Log from './components/pages/Log';
import Calendar from './components/pages/Calendar';
import Weather from './components/pages/Weather';
import Statistics from './components/pages/Statistics';
import SearchForPlants from './components/pages/SearchForPlants';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="Container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
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
