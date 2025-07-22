import React, { useState } from 'react';
import './Sidebar.css';
import { FaLongArrowAltRight, FaSignOutAlt, FaTachometerAlt, FaRegBuilding, FaMapMarkedAlt, FaUsers, FaTools, FaGavel, FaCogs, FaRecycle } from 'react-icons/fa';
import { ImTruck } from "react-icons/im";
import { MdAssignment } from 'react-icons/md';
import { BiCategoryAlt, BiMaleFemale } from 'react-icons/bi';
import { TbReportSearch } from "react-icons/tb";
import { IoIosNotifications } from "react-icons/io";
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import TopNavbar from './TopNavbar';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false); // ✅ for small screens

  const isSidebarOpen = (isOpen || isHovered || isMobileOpen);

  const navigate = useNavigate();
  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleMobileSidebar = () => setIsMobileOpen(prev => !prev);

  const icons = {
    "Dashboard": <FaTachometerAlt size={18} />,
    "Manage Department": <FaRegBuilding size={18} />,
    "Manage Location": <FaMapMarkedAlt size={18} />,
    "User Management": <FaUsers size={18} />,
    "Manage Complaint": <BiCategoryAlt size={18} />,
    "Manage Resource/Tool/Vehicle": <FaTools size={18} />,
    "Task Management": <MdAssignment size={18} />,
    "Management Enforcement Case": <FaGavel size={18} />,
    "Toilet": <BiMaleFemale size={18} />,
    "Manage Mcc Centers": <FaRecycle size={18} />,
    "Manage Vehicle Trip Log": <ImTruck size={18} />,
    "Settings": <FaCogs size={18} />,
    "Reports": <TbReportSearch size={18} />,
    "Notification": <IoIosNotifications size={18} />
  };

  const accordionData = [
    {
      title: "Manage Department",
      options: [{ options: "Sub Department List", to: "/Manage_Department/Department_List" },
      { options: "Add Department", to: "/Manage_Department/Add_Department" }]
    },
    {
      title: "Manage Location",
      options: [
        { options: "Manage State", to: "/Manage_Location/Manage_State" },
        { options: "Manage District", to: "/Manage_Location/Manage_District" },
        { options: "Manage City", to: '/Manage_Location/Manage_City' },
        { options: "Add Area & Ward", to: '/Manage_Location/Manage_Add_Area_&_Ward' }]
    },
    {
      title: "User Management",
      options: [
        { options: "Add Users", to: '/User_Management/Add_Users' },
        { options: "Users List", to: '/User_Management/Users_List' }]
    },
    {
      title: "Manage Complaint",
      options: [
        { options: "Add Complaint Category", to: '/Manage_Complaint/Add_Complaint_Category' },
        { options: "Complaint Category", to: '/Manage_Complaint/Complaint_List' }]
    },
    {
      title: "Manage Resource/Tool/Vehicle",
      options: [
        { options: "Resources/Tool/Vehicle", to: '/Manage_Resource/Resource' },
        { options: "Add Resources", to: '/Manage_Resource/Add_Resource' }]
    },
    {
      title: "Task Management",
      options: [
        { options: "New Task List", to: '/Task_Management/New_Task' },
        { options: "Assign Task List", to: '/Task_Management/Assign_Task' },
        { options: "Solved Task List", to: '/Task_Management/Solved_Task' },
        { options: "All Task", to: '/Task_Management/All_Task' }]
    },
    {
      title: "Management Enforcement Case",
      options: [{ options: "Enforcement Case", to: '/Management_Enforcement/Enforcement_Case' }]
    },
    {
      title: "Toilet",
      options: [
        { options: "Toilet List", to: '/Toilet/Toilet_List' },
        { options: "Add Toilet", to: '/Toilet/Add_Toilet' },
        { options: "View Feedback", to: '/Toilet/Feedback' }]
    },
    {
      title: "Manage Mcc Centers",
      options: [
        { options: "Mcc Center List", to: '/Manage_Mcc_Centers/Mcc_Center_List' },
        { options: "Add Mcc Center", to: '/Manage_Mcc_Centers/Add_Mcc_Center' }]
    },
    {
      title: "Manage Vehicle Trip Log",
      options: [
        { options: "View Vehicle Trip Log", to: '/Manage_Vehicle_Trip/View_Vehicle_Trip_Log' },
        { options: "Add Trip Log", to: '/Manage_Vehicle_Trip/Add_Vehicle_Trip_Log' }]
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <div className="d-flex position-relative">
      {/* Sidebar */}
      <div
        className={`custom-offcanvas bg-black text-white px-2 py-3 d-flex flex-column
          ${isSidebarOpen ? 'open' : 'collapsed'} 
          ${isMobileOpen ? 'open position-absolute z-3' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Logo */}
        <div className="offcanvas-header border-bottom border-secondary mb-2 pb-3">
          <div className="d-flex align-items-center">
            <img className="rounded-3 logobox" src="./logo.jpeg" alt="Logo" />
            <div className="ms-3 sidebar-text">
              <h3 className="text-white mb-0"><b>Safai</b></h3>
              <h6 className="text-white logotitle">Mitra</h6>
            </div>
          </div>
        </div>

        {/* Sidebar Links */}
        <div className="offcanvas-body flex-grow-1 overflow-y-auto overflow-x-hidden sidebar-scroll">
          <ul className="d-flex dash justify-content-start align-items-center ps-3 mt-2 col-11">
            <NavLink to="/" className={({ isActive }) => `dashb text-decoration-none ${isActive ? "text-white" : ""}`} style={{ color: '#a5a5a5' }}>
              {icons["Dashboard"]}
              <span className="ms-2 sidebar-text"><b>Dashboard</b></span>
            </NavLink>
          </ul>

          <p className="text-secondary ms-2 mt-3 mb-1 ps-2 sidebar-text" style={{ fontSize: "12px" }}>
            <b>PAGES</b>
          </p>

          <div className="accordion bg-transparent border-0 overflow-hidden w-100" id="sidebarAccordion">
            {accordionData.map((item, index) => (
              <div key={index} className="accordion-item bg-transparent border-0">
                <h2 className="accordion-header">
                  <button className="accordion-button mt-2 bg-transparent collapsed shadow-none border-0 py-2" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`}>
                    {icons[item.title]}
                    <span className="ms-2 sidebar-text"><b>{item.title}</b></span>
                  </button>
                </h2>
                <div id={`collapse${index}`} className="accordion-collapse collapse" data-bs-parent="#sidebarAccordion">
                  <div className="accordion-body bg-transparent sidebar-text ps-4" style={{ marginTop: "-10px", marginBottom: "-25px" }}>
                    <ul className="custom-ul">
                      {item.options.map((opt, i) => (
                        <li key={i} className="mb-3 text-start">
                          <NavLink to={opt.to} className={({ isActive }) => `navlink-item text-decoration-none ${isActive ? 'text-white active-link' : 'text-secondary'}`} state={{ from: item.title, label: opt.options }}>
                            {opt.options}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="ms-3 dash mb-5 d-flex flex-column">
            <NavLink to="/Notification_Panel" className="dashb text-decoration-none" style={{ color: '#a5a5a5' }}>
              {icons["Notification"]}<span className="ms-2 sidebar-text"><b>Notification Panel</b></span>
            </NavLink>
            <NavLink to="/Reports_&_Downloads" className="dashb text-decoration-none" style={{ color: '#a5a5a5' }}>
              {icons["Reports"]}<span className="ms-2 sidebar-text"><b>Reports & Downloads</b></span>
            </NavLink>
            <NavLink to="/Setting" className="dashb text-decoration-none" style={{ color: '#a5a5a5' }}>
              {icons["Settings"]}<span className="ms-2 sidebar-text"><b>Settings</b></span>
            </NavLink>
          </div>
        </div>

        <div className="mt-auto mb-2 text-center">
          <button className="btn btn-outline-secondary col-11" onClick={handleLogout}>
            <FaSignOutAlt /><span className="ms-2 sidebar-text"><b>Logout</b></span>
          </button>
        </div>
      </div>

      {/* Sidebar Toggle (for large screen) */}
      <div className="toggle-btn-container">
        <button className="toggle-btn btn btn-sm btn-light btn-outline-secondary mt-3" onClick={toggleSidebar}>
          <FaLongArrowAltRight className={`bi mb-1 ${isSidebarOpen ? 'rotate-icon' : ''}`} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1">
        <TopNavbar toggleSidebar={toggleMobileSidebar} />
        <Outlet />
      </div>
    </div>
  );
}

export default Sidebar;
