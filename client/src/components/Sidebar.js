import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import { SidebarData } from './SidebarData';

export const Sidebar = () => {
    const currRoute = useLocation();

    return (
        <div className="Sidebar">
            <ul className="SidebarList">
                {/* For each sidebar object, check if the current route and sidebar link matches */}
                {SidebarData.map((val, key) => {
                    const isActive = currRoute.pathname === val.link;
                    return (
                        // add the active class to change color of the selected menu item
                        <li key={key} className={`row ${isActive ? 'active' : ''}`}>
                            <Link to={val.link} className="row">
                                {val.title}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};