import React from 'react'
import { useTheme } from '../../component/ThemeContext';
import { NavLink } from 'react-router-dom';

export default function DashboardEmp() {
  const { darkMode } = useTheme();
  return (
    <>
      <div className="container my-4" data-bs-theme={darkMode ? 'dark' : 'light'}>
        <div className="breadcrumbText">
          <h5>Dashboard</h5>
          <nav aria-label="breadcrumb" style={{fontSize:"13px"}}>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"> <NavLink to="/">Home</NavLink> </li>
              <li className="breadcrumb-item active" aria-current="page"> Dashboard </li>
            </ol>
          </nav>
        </div>


      </div>
    </>
  )
}
