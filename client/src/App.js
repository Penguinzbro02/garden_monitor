import './App.css';
import { Sidebar } from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Log from './components/pages/Log';
import Calendar from './components/pages/Calendar';
import Weather from './components/pages/Weather';
import Statistics from './components/pages/Statistics';

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
        </Routes>
      </div>
    </div>
  );
}

export default App;
