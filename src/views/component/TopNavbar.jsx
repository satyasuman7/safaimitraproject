import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './TopNavbar.css';
import { useTheme } from './ThemeContext';

//ICONS
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import { BiSearchAlt2, BiMessageDetail } from "react-icons/bi";
import { PiNotificationBold } from "react-icons/pi";

export default function TopNavbar() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <>
      <div className={`container-fluid ${darkMode ? 'dark-mode' : 'bg-light text-dark'}`}>
        <div className="row">
          <nav className="navbar navbar-expand-lg">
            <div className="container-fluid p-2">

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <div className="navbar-nav me-auto mb-2 mb-lg-0 d-flex gap-3">
                  <li className="nav-item">
                    <a className="nav-link" href="#"><b>Help</b></a>
                  </li>
                </div>

                <ul className="navbar-nav me-1 mb-2 mb-lg-0 d-flex gap-3">
                  <li className="nav-item">
                    <a className="nav-link" href="#"><BiSearchAlt2 size={23} /></a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#"><BiMessageDetail size={23} /></a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#"><PiNotificationBold size={23} /></a>
                  </li>

                  {/* Dark mode toggle button */}
                  <li className="nav-item">
                    <button className="nav-link btn border-0" onClick={toggleDarkMode}>
                      <b>{darkMode ? <IoMdMoon size={23} /> : <IoMdSunny size={23} />} </b>
                    </button>
                  </li>

                  <li className="nav-item">
                    <img src="/logo.jpeg" alt="" style={{ width: "6rem" }} />
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
