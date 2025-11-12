import React from 'react';
import { useTheme } from '../component/ThemeContext.jsx';
import './TopnavbarDept.css';
import { Link } from 'react-router-dom';

//ICONS
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import { BiSearchAlt2, BiMessageDetail } from "react-icons/bi";
import { PiNotificationBold } from "react-icons/pi";

export default function TopNavbar({ toggleSidebar }) {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className={`container-fluid position-sticky top-0 ${darkMode ? 'dark-mode' : 'bg-light text-dark'} shadow`} style={{ zIndex: "5" }}>
      <div className="row navbar navbar-expand-lg">
        <div className="container-fluid d-flex justify-content-between align-items-center flex-nowrap">

          {/* Sidebar Toggle Button - Always on Left */}
          <button className="btn border-0 me-auto d-lg-none" onClick={toggleSidebar}>
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Right side icons and logo */}
          <ul className="d-flex align-items-center gap-3 ms-auto list-unstyled mb-0">
            <li><Link className="nav-link" to="#"><BiSearchAlt2 size={23} /></Link></li>
            <li><Link className="nav-link" to="#"><BiMessageDetail size={23} /></Link></li>
            <li><Link className="nav-link" to="#"><PiNotificationBold size={23} /></Link></li>
            <li onClick={toggleDarkMode} style={{ cursor: "pointer" }}>
              {darkMode ? <IoMdMoon size={23} /> : <IoMdSunny size={23} />}
            </li>
            <li><img src="/logo.jpeg" alt="Logo" className="navbar-logo" /></li>
          </ul>

        </div>
      </div>
    </div>
  );
}