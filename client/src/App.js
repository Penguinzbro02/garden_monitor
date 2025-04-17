import './App.css';
import { Navbar } from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Log from './components/pages/Log';
import Calendar from './components/pages/Calendar';
import Weather from './components/pages/Weather';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Log" element={<Log />} />
        <Route path="/Calendar" element={<Calendar />} />
        <Route path="/Weather" element={<Weather />} />
      </Routes>
    </div>
  );
}

export default App;
