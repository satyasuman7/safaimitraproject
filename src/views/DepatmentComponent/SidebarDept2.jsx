import React, { useState, useEffect, useRef } from 'react';
import './SidebarDept2.css';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import TopnavbarDept from './TopnavbarDept.jsx';
import { useTheme } from '../component/ThemeContext.jsx';

//ICONS
import { FaLongArrowAltRight, FaBuilding, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';
import { IoTicketSharp } from "react-icons/io5";
import Footer from '../component/Footer.jsx';

const icons = {
  "Dashboard": <FaTachometerAlt size={18} />,
  "Ticket": <IoTicketSharp size={18} />,
  "Department": <FaBuilding size={18} />,
};

const menuItems = [
  {
    title: "Ticket",
    options: [
      { options: "New Ticket List", to: "/ticket/newticketlist" },
      { options: "Accepted Ticket List", to: "/ticket/acceptedticketlist" },
      { options: "Assigned Ticket List", to: "/ticket/aasignedticketlist" },
      { options: "Denied Ticket List", to: "/ticket/deniedticketlist" },
    ],
  },
  {
    title: "Department",
    options: [{ options: "Department Worker", to: "/dept/departworker" }],
  },
];

export default function SidebarDept() {
  const { darkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 992);
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  const isSidebarOpen = isOpen || isHovered;

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleMobileSidebar = () => setIsMobileOpen(prev => !prev);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.clear();
    navigate('/login');
  };

  useEffect(() => {
    const handleResize = () => {
      const nowDesktop = window.innerWidth >= 992;
      setIsDesktop(nowDesktop);
      if (nowDesktop) setIsMobileOpen(false);
    };

    const handleClickOutside = (event) => {
      if (
        isMobileOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest('.navbar-toggler-icon') &&
        !event.target.closest('.btn.border-0.me-2.d-lg-none')
      ) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileOpen]);

  return (
    <div data-bs-theme={darkMode ? 'dark' : 'light'}>
      <div className="d-flex position-relative">
        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={[
            'custom-offcanvas bg-black text-white py-3 flex-column d-lg-flex',
            isMobileOpen ? 'open position-fixed' : '',
            !isMobileOpen && !isDesktop ? 'collapsed d-none' : '',
            isDesktop && isOpen ? 'open' : '',
            isDesktop && !isOpen ? 'collapsed' : '',
          ].join(' ')}
        >
          {/* Header */}
          <div className="offcanvas-header border-bottom border-secondary mb-2 pb-3">
            <div className="d-flex flex-column align-items-center">
              <div className="d-flex">
                <img className="rounded-3 logobox" src="../../../logo.jpeg" alt="Logo" />
                <div className="ms-3 pt-2 sidebar-text">
                  <h3 className="text-white mb-0 fw-bold">Safai</h3>
                  <h6 className="text-white logotitle">Mitra</h6>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Links */}
          <div className="offcanvas-body flex-grow-1 hide-scrollbar">
            <div className="accordion plc-acc bg-transparent border-0 overflow-hidden" id="sidebarAccordion">
              {/* Dashboard */}
              <ul className="d-flex dash justify-content-start align-items-center ms-1 ps-2 mt-2 col-11">
                <NavLink to="/dept" className={({ isActive }) => `dashb text-decoration-none ${isActive ? 'text-white' : ''}`} style={{ color: '#a5a5a5' }}>
                  {icons["Dashboard"]}
                  <span className="ms-2 sidebar-text"> Dashboard </span>
                </NavLink>
              </ul>

              {/* Menu Items */}
              {menuItems.map((item, index) => (
                <div key={index} className="accordion-item bg-transparent border-0">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button mt-2 bg-transparent collapsed shadow-none border-0 py-2"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index}`}
                      aria-expanded="false"
                      aria-controls={`collapse${index}`}
                      style={{ fontSize: "14px" }}
                    >
                      {icons[item.title]} <span className="ms-2 sidebar-text">{item.title}</span>
                    </button>
                  </h2>
                  <div
                    id={`collapse${index}`}
                    className="accordion-collapse collapse"
                    data-bs-parent="#sidebarAccordion"
                  >
                    <div className="accordion-body bg-transparent ps-4" style={{ marginTop: "-10px", marginBottom: "-25px" }}>
                      <ul className="custom-ul">
                        {item.options.map((opt, i) => (
                          <li key={i} className="mb-3 text-start">
                            <NavLink
                              to={opt.to}
                              className={({ isActive }) => `navlink-item text-decoration-none d-flex align-items-center ${isActive ? 'text-white active-link' : 'text-secondary'}`}
                              state={{ from: item.title, label: opt.options }}
                              onClick={() => !isDesktop && setIsMobileOpen(false)}
                            >
                              <span className="sidebar-text">{opt.options}</span>
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Logout */}
          <div className="mt-auto mb-2 text-center">
            <button className="btn btn-outline-secondary col-11" onClick={handleLogout}>
              <FaSignOutAlt />
              <span className="ms-2 sidebar-text">Logout</span>
            </button>
          </div>
        </div>

        {/* Desktop Toggle Button */}
        {isDesktop && (
          <div className="toggle-btn-container">
            <button
              className={`toggle-btn btn-outline-secondary sidebar-toggle-button btn btn-light translate-middle-y d-none d-lg-block ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}
              onClick={toggleSidebar}
            >
              <FaLongArrowAltRight className={`bi text-black mb-1 ${isOpen ? 'rotate-icon' : ''}`} />
            </button>
          </div>
        )}

        {/* Main Content */}
        <div className={`main-content-wrapper flex-grow-1 ${isDesktop ? (isOpen ? 'main-content-margin' : 'main-content-collapsed') : 'main-content-no-margin'}`}>
          <TopnavbarDept toggleSidebar={toggleMobileSidebar} />
          <Outlet />
          <Footer />
        </div>

        {/* Mobile Overlay */}
        {isMobileOpen && <div className="sidebar-overlay d-lg-none" onClick={() => setIsMobileOpen(false)}></div>}
      </div>
    </div>
  );
}
