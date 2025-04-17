import { Link } from 'react-router-dom';
import './Navbar.css';

export const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/Login">Login</Link></li>
                <li><Link to="/Log">Log</Link></li>
                <li><Link to="/Calendar">Calendar</Link></li>
                <li><Link to="/Weather">Weather</Link></li>
                <li><Link to="/Statistics">Statistics</Link></li>
            </ul>
        </nav>
    );
};