import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import './Sidebar.css';
import {SidebarData} from './SidebarData';

export const Sidebar = ({onSidebarToggle}) => {
    const [collapsed, setCollapsed] = useState(false);
    const [open, setOpen] = useState(false);
    const currRoute = useLocation();

    const handleCollapse = () => {
        setCollapsed((prev) => !prev);
        onSidebarToggle(!collapsed); // Notify parent about the sidebar state
    };
    const handleOpen = () => setOpen((prev) => !prev);

    return (
        <>
            <button className="SidebarHamburger" onClick={handleCollapse} aria-label="Toggle sidebar">
                <span className="hamburger-bar"></span>
                <span className="hamburger-bar"></span>
                <span className="hamburger-bar"></span>
            </button>
            <div className={`Sidebar${collapsed ? ' collapsed' : ''}${open ? ' open' : ''}`}>
                <div className="SidebarHeader">Navigation</div>
                <ul className="SidebarList">
                    {!collapsed && SidebarData.map((val, key) => {
                        const isActive = currRoute.pathname === val.link;
                        return (
                            <li key={key} className={`row${isActive ? ' active' : ''}`}>
                                <Link to={val.link} className="row-link" tabIndex={collapsed ? -1 : 0}
                                      style={{pointerEvents: collapsed ? 'none' : 'auto'}}>
                                    {val.title}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
};