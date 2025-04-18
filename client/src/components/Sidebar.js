import { Link } from 'react-router-dom';
import './Sidebar.css';
import { SidebarData } from './SidebarData'

export const Sidebar = () => {
    return (
        <div className="Sidebar">
            <ul className="SidebarList">
                {SidebarData.map((val, key) => {
                    return (
                        <li key={key} className="row">
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