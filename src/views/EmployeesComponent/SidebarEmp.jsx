import React, { useState, useEffect, useRef } from 'react';
import './SidebarEmp.css';

// ICONS
import { FaLongArrowAltRight, FaSignOutAlt, FaUser, FaRoad, FaBuilding, FaShoppingBag, FaMoneyBillAlt } from 'react-icons/fa';
import { GiAwareness } from "react-icons/gi";
import { AiFillDashboard } from "react-icons/ai";
import { LuPartyPopper, LuConstruction } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import { TbRoad } from "react-icons/tb";
import { ImBin2, ImTruck  } from "react-icons/im";

import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import TopNavbar from '../component/TopNavbar';
import Footer from '../component/Footer';
import { useTheme } from '../component/ThemeContext';

const icons = {
  'Dashboard': <AiFillDashboard className="me-3" />,
  'My Attendence': <FaUser className="me-3" />,
  'Roads Clean Report': <FaRoad className="me-3" />,
  'Report Party Waste': <LuPartyPopper className="me-3" />,
  'Leave Apply': <SlCalender className="me-3" />,
  'Awareness': <GiAwareness className="me-3" />,
  'Vehicle Reporting': <ImTruck className="me-3" />,
  // 'Conservancy Lane Report': <TbRoad className="me-3" />,
  // 'Commercial Cleaning Report': <FaBuilding className="me-3" />,
  'Report CND Waste': <LuConstruction className="me-3" />,
  'Garbage Spotted': <ImBin2 className="me-3" />,
  // 'Bag Sale': <FaShoppingBag className="me-3" />,
  'Mo Khata Sale': <FaMoneyBillAlt className="me-3" />,
};

const menuItems = [
  { label: 'Dashboard', to: '/' },
  { label: 'My Attendence', to: '/employee/attendence' },
  { label: 'Report Party Waste', to: '/employee/reportpartywaste' },
  { label: 'Leave Apply', to: '/employee/leaveapply/:id' },
  { label: 'Awareness', to: '/employee/awareness' },
  { label: 'Vehicle Reporting', to: '/employee/vehiclereport' },
  // { label: 'Conservancy Lane Report', to: '/employee/conservancylanereport' },
  // { label: 'Commercial Cleaning Report', to: '/employee/commercialcleaningreport' },
  { label: 'Report CND Waste', to: '/employee/cndwaste' },
  // { label: 'Bag Sale', to: '/employee/bagsale' },
  { label: 'Mo Khata Sale', to: '/employee/mokhatasale' },
  { label: 'Roads Clean Report', to: '/employee/roadcleanreport', disabled: true },
  { label: 'Garbage Spotted', to: '/employee/garbagespotted', disabled: true },
];

const SidebarEmp = () => {
  const { darkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 992);
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

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

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleMobileSidebar = () => setIsMobileOpen(prev => !prev);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <div data-bs-theme={darkMode ? 'dark' : 'light'}>
      {/* Desktop Toggle Button */}
      {isDesktop && (
        <button className={`sidebar-toggle-button btn btn-light d-none d-lg-block ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`} onClick={toggleSidebar}>
          <FaLongArrowAltRight className={isOpen ? 'rotate-icon' : ''} />
        </button>
      )}

      <div className="d-flex position-relative">
        {/* Sidebar */}
        <div ref={sidebarRef}
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
            <h3 className="mt-4 ms-2">Welcome User</h3>
          </div>

          {/* Sidebar Links */}
          <div className="offcanvas-body flex-grow-1 hide-scrollbar">
            {menuItems.map(({ label, to, disabled }) => (
              <div key={label} className="d-flex dash align-items-center ps-4 my-4">
                {disabled ? (
                  <div className="d-flex align-items-center sidebar-disabled">
                    {icons[label]}
                    <span className="ms-1 sidebar-text fw-bold">{label}</span>
                    <span className="badge bg-secondary ms-2">Soon</span>
                  </div>
                ) : (
                  <NavLink to={to} className={({ isActive }) => `dashb text-decoration-none ${isActive ? 'text-white' : ''}`} onClick={() => !isDesktop && setIsMobileOpen(false)}>
                    {icons[label]}
                    <span className="ms-1 sidebar-text fw-bold">{label}</span>
                  </NavLink>
                )}
              </div>
            ))}
          </div>

          {/* Logout */}
          <div className="mt-4 text-center">
            <button className="btn btn-outline-secondary" onClick={handleLogout}>
              <FaSignOutAlt />
              <span className="ms-2 sidebar-text">
                <b>Logout</b>
              </span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className={`main-content-wrapper flex-grow-1 ${isDesktop ? (isOpen ? 'main-content-margin' : 'main-content-collapsed') : 'main-content-no-margin'}`}>
          <TopNavbar toggleSidebar={toggleMobileSidebar} />
          <Outlet />
          <Footer />
        </div>

        {/* Mobile Overlay */}
        {isMobileOpen && <div className="sidebar-overlay d-block d-lg-none" onClick={() => setIsMobileOpen(false)}></div>}
      </div>
    </div>
  );
};

export default SidebarEmp;