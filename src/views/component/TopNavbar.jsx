import React from 'react';
import { useTheme } from './ThemeContext';
import './TopNavbar.css';
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import { BiSearchAlt2, BiMessageDetail } from "react-icons/bi";
import { PiNotificationBold } from "react-icons/pi";

export default function TopNavbar({ toggleSidebar }) {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className={`container-fluid position-sticky top-0 ${darkMode ? 'dark-mode' : 'bg-light text-dark'} shadow`} style={{zIndex:"5"}}>
      <div className="row">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid d-flex justify-content-between align-items-center px-2">

            {/* Sidebar Toggle Button - Always on Left */}
            <button
              className="btn border-0 me-2 d-lg-none"
              onClick={toggleSidebar} 
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Optional title or logo for center */}
            {/* <span className="navbar-brand d-lg-none">
              <img src="/logo.jpeg" alt="Logo" style={{ width: "4rem" }} />
            </span> */}

            {/* Right side icons and logo */}
            <div className="d-flex align-items-center gap-3 ms-auto">
              <a className="nav-link" href="#"><BiSearchAlt2 size={23} /></a>
              <a className="nav-link" href="#"><BiMessageDetail size={23} /></a>
              <a className="nav-link" href="#"><PiNotificationBold size={23} /></a>
              <button className="btn nav-link border-0" onClick={toggleDarkMode}>
                {darkMode ? <IoMdMoon size={23} /> : <IoMdSunny size={23} />}
              </button>
              <img src="/logo.jpeg" alt="Logo" style={{ width: "6rem" }} />
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
