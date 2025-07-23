import React, { useState, useEffect, useRef } from 'react';
import './SidebarEmp.css';
import {
  FaLongArrowAltRight, FaSignOutAlt, FaUser, FaRoad, FaTrash, FaBroom,
  FaBuilding, FaExclamationTriangle, FaShoppingBag, FaMoneyBillAlt
} from 'react-icons/fa';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import TopNavbar from '../component/TopNavbar';
import Footer from '../component/Footer';

const icons = {
  'My Attendence': <FaUser className="me-3" />,
  'Roads Clean Report': <FaRoad className="me-3" />,
  'Report Party Waste': <FaTrash className="me-3" />,
  'Conservancy Lane Report': <FaBroom className="me-3" />,
  'Commercial Cleaning Report': <FaBuilding className="me-3" />,
  'Report CND Waste': <FaExclamationTriangle className="me-3" />,
  'Garbage Spotted': <FaTrash className="me-3" />,
  'Bag Sale': <FaShoppingBag className="me-3" />,
  'Sale': <FaMoneyBillAlt className="me-3" />,
};

const SidebarEmp = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 992);
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const isNowDesktop = window.innerWidth >= 992;
      setIsDesktop(isNowDesktop);
      if (isNowDesktop) setIsMobileOpen(false);
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
    <>
      <div>
        {/* Toggle Button - Only for large screens */}
        {isDesktop && (
          <button
            className="sidebar-toggle-button btn btn-light translate-middle-y d-none d-lg-block"
            style={{ left: isOpen ? '320px' : '70px', top: '2rem' }}
            onClick={toggleSidebar}
          >
            <FaLongArrowAltRight className={`bi ${isOpen ? 'rotate-icon' : ''}`} />
          </button>
        )}

        <div className="d-flex position-relative">
          {/* Sidebar */}
          <div
            ref={sidebarRef}
            className={`custom-offcanvas bg-black text-white py-3 flex-column
            ${isMobileOpen ? 'open position-absolute' : ''}
            ${!isMobileOpen && !isDesktop ? 'collapsed d-none' : ''}
            ${isDesktop && isOpen ? 'open' : ''}
            ${isDesktop && !isOpen ? 'collapsed' : ''}
            d-lg-flex
          `}
          >
            {/* Header */}
            <div className="offcanvas-header border-bottom border-secondary mb-2 pb-3">
              <div className="text-danger d-flex">
                <h3 className="mb-0">Welcome User</h3>
              </div>
            </div>

            {/* Sidebar Links */}
            <div className="offcanvas-body flex-grow-1 overflow-y-auto overflow-x-hidden sidebar-scroll">
              {[
                { label: 'My Attendence', to: '/myattendence' },
                { label: 'Roads Clean Report', to: '/roadscleanreport' },
                { label: 'Report Party Waste', to: '/reportpartywaste' },
                { label: 'Conservancy Lane Report', to: '/conservancylanereport' },
                { label: 'Commercial Cleaning Report', to: '/commercialcleaningreport' },
                { label: 'Report CND Waste', to: '/reportcndwaste' },
                { label: 'Garbage Spotted', to: '/garbagespotted' },
                { label: 'Bag Sale', to: '/bagsale' },
                { label: 'Sale', to: '/sale' },
              ].map(({ label, to }) => (
                <div key={label} className="d-flex dash justify-content-statt align-items-center ps-3 my-4">
                  <NavLink
                    to={to}
                    className={({ isActive }) => `dashb text-decoration-none ${isActive ? 'text-white' : ''}`}
                    style={{ color: '#a5a5a5' }}
                    onClick={() => {
                      if (!isDesktop) setIsMobileOpen(false);
                    }}
                  >
                    {icons[label]}
                    <span className="ms-4 sidebar-text fw-bold">{label}</span>
                  </NavLink>
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
          <div className={`main-content-wrapper flex-grow-1
          ${isDesktop ? (isOpen ? 'main-content-margin' : 'main-content-collapsed') : 'main-content-no-margin'}
        `}>
            <TopNavbar toggleSidebar={toggleMobileSidebar} />
            <Outlet />
            <Footer />
          </div>

          {/* Mobile Overlay */}
          {isMobileOpen && (
            <div className="sidebar-overlay d-block d-lg-none" onClick={() => setIsMobileOpen(false)}></div>
          )}
        </div>
      </div>
    </>
  );
};

export default SidebarEmp;